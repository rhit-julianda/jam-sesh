import asyncio
import websockets
import json
from datetime import datetime

import sys
sys.path.append('./')

class WebEngine:

	def __init__(self, session_engine):
		self.session_engine = session_engine

	async def handle(self, websocket, path):
		pathSplit = path.split('/')

		if len(pathSplit) != 2:
			await websocket.send("Error: bad path")
			return

		sessionID = pathSplit[-1]
		userID = hash(datetime.now())//(10**7)
		
		await self.session_engine.join_session(websocket, sessionID, userID)
		async for message in websocket:
			try:
				mess = json.loads(message)
			except:
				continue
			print(mess)
			if "command" not in mess:
				await websocket.send("Error: No command")
				continue

			command = mess["command"]
			
			if command == "CREATE":
				if "type" not in mess:
					await websocket.send("Error: No type given")
					continue
				await self.session_engine.create_instrument(sessionID, userID, mess["type"], websocket)
			elif command == "JOIN":
				if "instrumentID" not in mess:
					await websocket.send("Error: No instrument given")
					continue
				await self.session_engine.join_instrument(sessionID, userID, mess["instrumentID"], websocket)
			elif command == "LEAVE":
				await self.session_engine.leave_instrument(sessionID, userID, websocket)
			elif command == "NOTE":
				if "note" not in mess:
					await websocket.send("Error: No note")
					continue
				if "play" not in mess:
					await websocket.send("Error: No play boolean")
					continue
				await self.session_engine.play_note(sessionID, userID, mess["note"], mess["play"], websocket)
			elif command == "NAME":
				if "name" not in mess:
					await websocket.send("Error: No name given")
					continue
				await self.session_engine.set_name(sessionID, userID, mess["name"], websocket)
			else:
				await websocket.send("Error: Bad command")

		await self.session_engine.leave_session(sessionID, userID)
			

	async def serve_helper(self):
		async with websockets.serve(self.handle, "localhost", 8765):
			await asyncio.Future()

	def serve(self):
		asyncio.run(self.serve_helper())
