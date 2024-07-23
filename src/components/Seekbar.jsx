import React, { useState, useEffect, useRef } from 'react';
import { FaVolumeUp, FaPlay, FaPause, FaStepBackward, FaStepForward, FaHeart } from 'react-icons/fa';

const Seekbar = ({ track, isPlaying, onPlayPause }) => {
  const [currentTime, setCurrentTime] = useState(0);
  const [duration, setDuration] = useState(0);
  const [volume, setVolume] = useState(1);
  const audioRef = useRef(null);

  useEffect(() => {
    const audio = audioRef.current;

    if (audio) {
      const handleLoadedMetadata = () => {
        setDuration(audio.duration);
      };

      const handleTimeUpdate = () => {
        setCurrentTime(audio.currentTime);
      };

      audio.addEventListener('loadedmetadata', handleLoadedMetadata);
      audio.addEventListener('timeupdate', handleTimeUpdate);

      return () => {
        audio.removeEventListener('loadedmetadata', handleLoadedMetadata);
        audio.removeEventListener('timeupdate', handleTimeUpdate);
      };
    }
  }, [track]);

  useEffect(() => {
    const audio = audioRef.current;
    if (audio) {
      isPlaying ? audio.play() : audio.pause();
    }
  }, [isPlaying]);

  const handlePlayPause = () => {
    onPlayPause();
  };

  const handleSeek = (e) => {
    const audio = audioRef.current;
    if (audio) {
      audio.currentTime = e.target.value;
      setCurrentTime(e.target.value);
    }
  };

  const handleVolumeChange = (e) => {
    const audio = audioRef.current;
    if (audio) {
      audio.volume = e.target.value;
      setVolume(e.target.value);
    }
  };

  const handleNext = () => {
    // Logic for next track
  };

  const handlePrev = () => {
    // Logic for previous track
  };

  const handleAudioError = () => {
    console.error('Error loading audio source');
  };

  return (
    <div className="fixed bottom-0 w-full bg-black p-2 flex flex-col md:flex-row items-center justify-between text-white">
      <div className="flex items-center mb-2 md:mb-0">
        <img src={track?.album?.images?.[0]?.url || 'https://via.placeholder.com/50'} alt="Album Art" className="w-10 h-10 mr-2 md:mr-4" />
        <div>
          <h4 className="text-xs md:text-sm font-semibold">{track ? track.name : 'Song Title'}</h4>
          <p className="text-xs text-gray-400">{track ? track.artists?.[0]?.name : 'Artist Name'}</p>
        </div>
      </div>

      <div className="flex flex-col items-center mx-2 md:mx-4 flex-1 w-full md:w-1/3">
        <div className="flex items-center space-x-2 md:space-x-4 mb-1 md:mb-2">
          <FaStepBackward className="w-4 h-4 md:w-6 md:h-6 cursor-pointer" onClick={handlePrev} />
          {isPlaying ? (
            <FaPause className="w-6 h-6 md:w-8 md:h-8 cursor-pointer" onClick={handlePlayPause} />
          ) : (
            <FaPlay className="w-6 h-6 md:w-8 md:h-8 cursor-pointer" onClick={handlePlayPause} />
          )}
          <FaStepForward className="w-4 h-4 md:w-6 md:h-6 cursor-pointer" onClick={handleNext} />
        </div>
        <div className="w-full flex items-center space-x-2 md:space-x-4">
          <span className="text-xs">{Math.floor(currentTime / 60)}:{String(Math.floor(currentTime % 60)).padStart(2, '0')}</span>
          <input type="range" min="0" max={duration} value={currentTime} onChange={handleSeek} className="w-full" />
          <span className="text-xs">{Math.floor(duration / 60)}:{String(Math.floor(duration % 60)).padStart(2, '0')}</span>
        </div>
      </div>

      <div className="flex items-center space-x-2 md:space-x-4">
        <FaHeart className="w-4 h-4 md:w-6 md:h-6 cursor-pointer" />
        <div className="flex items-center space-x-2">
          <FaVolumeUp className="w-4 h-4 md:w-6 md:h-6" />
          <input type="range" min="0" max="1" step="0.01" value={volume} onChange={handleVolumeChange} className="w-16 md:w-24" />
        </div>
      </div>

      <audio ref={audioRef} src={track?.preview_url || ''} onError={handleAudioError} />
    </div>
  );
};

export default Seekbar;
