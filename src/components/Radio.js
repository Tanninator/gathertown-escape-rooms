import React from 'react';
import radio from '../images/radio/radio-with-code.png';
import morse from '../images/radio/morse.mp3'

class Radio extends React.Component {
  componentDidMount() {
    this.playAudio()
    this.interval = setInterval(() => this.playAudio(), 20000);
  }

  componentWillUnmount() {
    clearInterval(this.interval);
  }
  
  playAudio() {
    const audioEl = document.getElementsByClassName("audio-element")[0]
    audioEl.play()
  }

  render() {
    const bookshelfStyle = {
      backgroundColor: 'black',
      width: '100%',
      height: '100%'};

    return (
      <div style={bookshelfStyle}>
        <img src={radio} align="center" className="radio center" alt="radio" />
        <audio className="audio-element">
          <source src={morse}></source>
        </audio>
      </div>
    );
  }
}

export default Radio;
