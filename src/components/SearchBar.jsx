import React, { useState } from 'react';

const SearchBar = () => {
  const [query, setQuery] = useState('');
  const [results, setResults] = useState([]);

  const handleSearch = async () => {
    try {
      const response = await fetch(`https://v1.nocodeapi.com/abhinav/spotify/PvGApxfVhJVEkKXq/search?q=${encodeURIComponent(query)}&type=track`);
      if (response.status === 429) {
        throw new Error('Rate limit exceeded');
      }
      const data = await response.json();
      setResults(data.tracks?.items || []);
    } catch (error) {
      console.error('Error fetching search results:', error);
    }
  };

  return (
    <div className="p-4">
      <input
        type="text"
        value={query}
        onChange={(e) => setQuery(e.target.value)}
        placeholder="Search for music..."
        className="p-2 border rounded"
      />
      <button onClick={handleSearch} className="bg-blue-500 p-2 rounded text-white">Search</button>
      <div className="mt-4">
        {results.map((track) => (
          <div key={track.id} className="flex items-center mb-4">
            <img src={track.album.images[0]?.url || 'https://via.placeholder.com/50'} alt={track.name} className="w-16 h-16 mr-4" />
            <div>
              <h3 className="text-lg font-semibold">{track.name}</h3>
              <p>{track.artists.map(artist => artist.name).join(', ')}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default SearchBar;
