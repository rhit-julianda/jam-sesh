import { Piano, KeyboardShortcuts, MidiNumbers } from 'react-piano';
import 'react-piano/dist/styles.css';
import DimensionsProvider from './DimensionsProvider';
import SoundfontProvider from './SoundfontProvider';

function Instrument({start, end, instrument, playable}) {
    const firstNote = MidiNumbers.fromNote(start);
    const lastNote = MidiNumbers.fromNote(end);
    const keyboardShortcuts = KeyboardShortcuts.create({
      firstNote: firstNote,
      lastNote: lastNote,
      keyboardConfig: KeyboardShortcuts.HOME_ROW,
    });
    const audioContext = new (window.AudioContext || window.webkitAudioContext)();
    const soundfontHostname = 'https://d1pzp51pvbm36p.cloudfront.net';
   
    return (
      <DimensionsProvider>
        {({ containerWidth, containerHeight }) => (
          <SoundfontProvider
            instrumentName={instrument}
            audioContext={audioContext}
            hostname={soundfontHostname}
            render={({ isLoading, playNote, stopNote }) => (
                <Piano
                  noteRange={{first: firstNote, last: lastNote}}
                  width={containerWidth}
                  playNote={playNote}
                  stopNote={stopNote}
                  disabled={!playable && !isLoading}
                  keyboardShortcuts={keyboardShortcuts}
                />
            )}
          />
        )}
      </DimensionsProvider>
    );
  }

  export default Instrument;