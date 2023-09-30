import React, { useState } from "react";
import ReactAudioPlayer from "react-audio-player";

const AudioPlayer = ({ id }) => {
  const [isPlaying, setIsPlaying] = useState(false);

  const handlePlayClick = () => {
    setIsPlaying(!isPlaying);
  };

  const AudioUrl =
    "https://download.quranicaudio.com/quran/mishaari_raashid_al_3afaasee/001.mp3";

  return (
    <div>
      <button onClick={handlePlayClick}>{isPlaying ? "Pause" : "Play"}</button>
      <ReactAudioPlayer
        src={AudioUrl}
        autoPlay={false}
        controls
        volume={1.0}
        loop={false}
        onPause={() => setIsPlaying(false)}
        onEnded={() => setIsPlaying(false)}
      />
    </div>
  );
};

export default AudioPlayer;
