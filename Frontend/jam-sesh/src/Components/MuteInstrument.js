import { Piano, KeyboardShortcuts, MidiNumbers } from 'react-piano';
import 'react-piano/dist/styles.css';
import DimensionsProvider from './DimensionsProvider';

function MuteInstrument({start, end, instrument, playable, sendMessage}) {
    const firstNote = MidiNumbers.fromNote(start);
    const lastNote = MidiNumbers.fromNote(end);
    const keyboardShortcuts = KeyboardShortcuts.create({
      firstNote: firstNote,
      lastNote: lastNote,
      keyboardConfig: KeyboardShortcuts.HOME_ROW,
    });

    function sendNote(noteNum){
        sendMessage({command:"NOTE", play:true, note:noteNum});
    }

    function stopNote(noteNum){
        sendMessage({command:"NOTE", play:false, note:noteNum});
    }

    return (
      <DimensionsProvider>
        {({ containerWidth, containerHeight }) => (
                <Piano
                  noteRange={{first: firstNote, last: lastNote}}
                  width={containerWidth}
                  playNote={(midiNumber) => sendNote(midiNumber)}
                  stopNote={(midiNumber) => stopNote(midiNumber)}
                  disabled={false}
                  keyboardShortcuts={keyboardShortcuts}
                />
        )}
      </DimensionsProvider>
    );
  }

  export default MuteInstrument;
