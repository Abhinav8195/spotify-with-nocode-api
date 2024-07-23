import React from 'react';

const DisplayCard = ({ title, albums, tracks, onPlay }) => {
  const items = albums || tracks;

  return (
    <div className="bg-black/90">
      <div className="mx-auto max-w-2xl px-4 py-16 sm:px-6 sm:py-24 lg:max-w-7xl lg:px-8">
        <h2 className="text-2xl font-bold tracking-tight text-white">{title}</h2>
        <div className="mt-6 grid grid-cols-2 gap-x-4 gap-y-8 sm:grid-cols-3 lg:grid-cols-4 xl:grid-cols-6">
          {items && items.map((item) => (
            <div key={item.id} className="group relative cursor-pointer" onClick={() => onPlay(item)}>
              <div className="aspect-h-1 aspect-w-1 w-full overflow-hidden rounded-lg bg-gray-200 group-hover:opacity-75">
                <img
                  alt={item.name}
                  src={(item.album && item.album.images && item.album.images[0] && item.album.images[0].url) || 'https://via.placeholder.com/150'}
                  className="h-full w-full object-cover object-center transition-transform duration-300 ease-in-out group-hover:scale-105"
                />
              </div>
              <div className="mt-2 flex justify-between items-center">
                <div>
                  <h3 className="text-sm font-medium text-white truncate">
                    {item.name || 'Unknown Title'}
                  </h3>
                  <p className="mt-1 text-xs text-gray-400">
                    {item.artists && item.artists.length > 0 ? item.artists.map(artist => artist.name).join(', ') : 'Unknown Artist'}
                  </p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default DisplayCard;
