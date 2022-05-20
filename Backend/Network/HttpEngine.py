import threading
import http.server
import socketserver

import sys
sys.path.append('./')

class HttpEngine:

	def __init__(self, settings_engine, join_session_handler):
		self.settings_engine = settings_engine
		self.join_session_handler = join_session_handler

	def listen(self):
		with socketserver.TCPServer(("", self.settings_engine.HTTP_PORT), self.join_session_handler) as httpd:
			httpd.serve_forever()
