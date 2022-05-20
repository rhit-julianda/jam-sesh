import json
from datetime import datetime
import math

import sys
sys.path.append('./Contracts/')
sys.path.append('./Domain/Models/')

from Note import Note
from Session import Session
from Instrument import Instrument
from User import User

KEYS = 32

class SessionEngine:

	def __init__(self, settings_engine):
		self.settings_engine = settings_engine
		self.sessions = {}

	def check_session_user(self, sessionID, userID, websocket):
		if sessionID not in self.sessions:
			return False
		if userID not in self.sessions[sessionID].users:
			return False
		return True

	def noteToJson(self, note):
		return f"{{\"command\":\"NOTE\",\"instrumentID\":\"{note.instrumentID}\", \"note\":{note.note}, \"play\":\"{note.play}\"}}"
	
	def sessionToJson(self, sessionID):
		if sessionID not in self.sessions:
			return False
		session = self.sessions[sessionID];
    	
		out = "{\"command\":\"SESSION_INFO\", \"instruments\": ["

		for instrument in session.instruments:
			out += f"{{\"instrumentID\": {instrument}, \"type\":\"{session.instruments[instrument].type}\", \"users\":["
			for user in session.instruments[instrument].users:
				out += f"\"{session.users[user].name}\","
			out = out[:-1]
			out += "]},"

		if len(session.instruments):
			out = out[:-1]

		out += "],"
		return out

	async def push_update(self, sessionID):
		if sessionID not in self.sessions:
			return False
		session = self.sessions[sessionID]
		message = self.sessionToJson(sessionID)
		for userID in session.users:
			user = session.users[userID]
			if user.instrument:
				n_users = len(session.instruments[user.instrument].users)
				index = session.instruments[user.instrument].users.index(userID)
				step = KEYS//n_users
				start = index*step
				end = start+step - 1
				if KEYS%n_users != 0:
					start += index
					end += index
					if index < KEYS%n_users:
						end += 1
				userMessage = message + f"\"instrumentID\":\"{user.instrument}\",\"start\":{start},\"end\":{end}}}"
			else:
				userMessage = message + "\"instrumentID\":-1}"
			await user.sock.send(userMessage)

	async def join_session(self, websocket, sessionID, userID):
		if sessionID not in self.sessions:
			self.sessions[sessionID] = Session()

		session = self.sessions[sessionID]
		if userID in session.users:
			await websocket.send("Error: try connecting again")
			return
		session.users[userID] = User(websocket, userID)
		user = session.users[userID]
		await self.push_update(sessionID)

	async def create_instrument(self, sessionID, userID, type, websocket):
		if not self.check_session_user(sessionID, userID, websocket):
			return
		if type not in self.settings_engine.get_types():
			await websocket.send("Error: bad type")
			return
		session = self.sessions[sessionID]
		user = session.users[userID]
		if user.instrument is not None:
			await self.leave_instrument(sessionID, userID, websocket)
		instrument = Instrument(type)
		instrumentID = abs(hash(datetime.now())//(10**self.settings_engine.hash_len))
		session.instruments[instrumentID] = instrument
		await self.join_instrument(sessionID, userID, instrumentID, websocket)

	async def join_instrument(self, sessionID, userID, instrumentID, websocket):
		if not self.check_session_user(sessionID, userID, websocket):
			return
		session = self.sessions[sessionID]
		user = session.users[userID]
		if user.instrument == instrumentID:
			return
		if instrumentID not in session.instruments:
			await websocket.send("Error: bad instrumentID")
			return
		if user.instrument != None:
			await self.leave_instrument(sessionID, userID, websocket)
		user.instrument = instrumentID
		session.instruments[instrumentID].users.append(userID)
		await self.push_update(sessionID)

	async def leave_session(self, sessionID, userID):
		if not self.check_session_user(sessionID, userID, None):
			return
		session = self.sessions[sessionID]
		user = session.users[userID]
		if user.instrument != None:
			instrumentID = user.instrument
			session.instruments[instrumentID].users.remove(userID)
			if len(session.instruments[instrumentID].users) == 0:
				session.instruments.pop(instrumentID)
		session.users.pop(userID)
		await self.push_update(sessionID)
		
	async def leave_instrument(self, sessionID, userID,  websocket):		
		if not self.check_session_user(sessionID, userID, websocket):
			return
		session = self.sessions[sessionID]
		user = session.users[userID]
		if user.instrument == None:
			return
		instrumentID = user.instrument
		if instrumentID not in session.instruments:
			await websocket.send("Error: bad instrumentID")
			return
		session.instruments[instrumentID].users.remove(userID)
		if len(session.instruments[instrumentID].users) == 0:
			session.instruments.pop(instrumentID)
		user.instrument = None
		await self.push_update(sessionID)

	async def play_note(self, sessionID, userID, note, play, websocket):
		if not self.check_session_user(sessionID, userID, websocket):
			return
		session = self.sessions[sessionID]
		user = session.users[userID]
		if user.instrument == None:
			return
		instrumentID = user.instrument
		if instrumentID not in session.instruments:
			await websocket.send("Error: bad instrumentID")
			return
		noteContract = Note(instrumentID, note, play)
		for user in self.sessions[sessionID].users:
			await self.sessions[sessionID].users[user].sock.send(self.noteToJson(noteContract))

	async def set_name(self, sessionID, userID, name, websocket):
		if not self.check_session_user(sessionID, userID, websocket):
			return
		session = self.sessions[sessionID]
		user = session.users[userID]
		user.name = name
		await self.push_update(sessionID)
