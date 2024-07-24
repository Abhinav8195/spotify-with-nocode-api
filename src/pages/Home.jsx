import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import Navbar from '../components/Navbar';
import DisplayCard from '../components/DisplayCard';
import Seekbar from '../components/Seekbar';
import { useAuth } from '../context/AuthContext';

const Home = () => {
  const { user } = useAuth();
  const { q } = useParams();
  const [albumsData, setAlbumsData] = useState([]);
  const [tracksData, setTracksData] = useState([]);
  const [currentTrack, setCurrentTrack] = useState(null);
  const [isPlaying, setIsPlaying] = useState(false);

  useEffect(() => {
    const fetchAlbumsData = async () => {
      try {
        const response = await fetch(`https://v1.nocodeapi.com/abhinav/spotify/PvGApxfVhJVEkKXq/browse/featured`);
        const data = await response.json();
        console.log('Home Albums Data:', data); // Log home albums data
        if (data.albums && data.albums.items) {
          setAlbumsData(data.albums.items);
        } else {
          console.error('Unexpected API response structure:', data);
        }
      } catch (error) {
        console.error('Error fetching albums data:', error);
      }
    };

    const fetchTracksData = async () => {
      try {
        const response = await fetch(`https://v1.nocodeapi.com/abhinav/spotify/PvGApxfVhJVEkKXq/search?q=${encodeURIComponent(q)}&type=track`);
        const data = await response.json();
        console.log('Search Tracks Data:', data); // Log search tracks data
        if (data.tracks && data.tracks.items) {
          setTracksData(data.tracks.items);
        } else {
          console.error('Unexpected API response structure:', data);
        }
      } catch (error) {
        console.error('Error fetching tracks data:', error);
      }
    };

    fetchAlbumsData();
    fetchTracksData();
  }, [q]);

  const handlePlayTrack = (track) => {
    setCurrentTrack(track);
    setIsPlaying(true);
  };

  return (
    <>
      <Navbar />
      <DisplayCard 
        title={`Special for ${user?.displayName || 'you'}`} 
        albums={tracksData} 
        type="albums"
        onPlay={handlePlayTrack} 
      />
      {/* <DisplayCard 
        title={'Popular albums'} 
        albums={albumsData} 
        type="albums"
        onPlay={handlePlayTrack} 
      />
      <DisplayCard 
        title={'Big Hits'} 
        albums={albumsData} 
        type="albums"
        onPlay={handlePlayTrack} 
      />
      <DisplayCard 
        title={`Search Results for "${q}"`} 
        tracks={tracksData} 
        type="tracks"
        onPlay={handlePlayTrack} 
      /> */}
      <Seekbar 
        track={currentTrack} 
        isPlaying={isPlaying} 
        onPlayPause={() => setIsPlaying(!isPlaying)} 
      />
    </>
  );
};

export default Home;
