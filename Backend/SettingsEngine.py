
class SettingsEngine:

	def __init__(self, settings_path):
		self.HTTP_PORT = 80
		self.WEB_SOCKET_PORT = 123
		self.hash_len = 7

	def get_types(self):
		return {"acoustic_grand_piano", "violin"}
