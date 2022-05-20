import sys

sys.path.append('./')
sys.path.append('./Network')
sys.path.append('./Domain')

from WebEngine import WebEngine
from SessionEngine import SessionEngine
from SettingsEngine import SettingsEngine

if __name__ == "__main__":
	settings_engine = SettingsEngine('./jam-sesh.conf')
	session_engine = SessionEngine(settings_engine)
	web_engine = WebEngine(session_engine)
	web_engine.serve()
