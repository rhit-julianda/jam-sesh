import TitleBar from './TitleBar'
import PianoView from './PianoView';
import Session from './Session';
import './Styles/Home.css'

function Home() {
  return (
      <div>
      	<TitleBar />
      	<h1>Home</h1>
        <PianoView />
      </div>
  );
}

export default Home;
