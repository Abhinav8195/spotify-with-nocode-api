import React, { useState, useEffect } from 'react';
import Navbar from '../components/Navbar';
import DisplayCard from '../components/DisplayCard';
import Seekbar from '../components/Seekbar';
import { useParams } from 'react-router-dom';

const SearchResults = () => {
  const { q } = useParams();
  const [tracksData, setTracksData] = useState([]);
  const [currentTrack, setCurrentTrack] = useState(null);
  const [isPlaying, setIsPlaying] = useState(false);

  useEffect(() => {
    const fetchSearchResults = async () => {
      try {
        const response = await fetch(`https://v1.nocodeapi.com/abhinav/spotify/PvGApxfVhJVEkKXq/search?q=${encodeURIComponent(q)}&type=track`);
        const data = await response.json();
        console.log('Search Results Data:', data);
        setTracksData(data.tracks?.items || []);
      } catch (error) {
        console.error('Error fetching search results:', error);
      }
    };
  
    fetchSearchResults();
  }, [q]);

  const handlePlayTrack = (track) => {
    setCurrentTrack(track);
    setIsPlaying(true);
  };

  return (
    <>
      <Navbar />
      <DisplayCard title={`Search results for "${q}"`} tracks={tracksData} onPlay={handlePlayTrack} />
      <Seekbar track={currentTrack} isPlaying={isPlaying} onPlayPause={() => setIsPlaying(!isPlaying)} />
    </>
  );
};

export default SearchResults;
