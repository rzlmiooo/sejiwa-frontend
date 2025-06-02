const videos = [
  { id: 1, title: 'Video 1', thumbnail: 'https://via.placeholder.com/320x180' },
  { id: 2, title: 'Video 2', thumbnail: 'https://via.placeholder.com/320x180' },
  { id: 3, title: 'Video 3', thumbnail: 'https://via.placeholder.com/320x180' },
  { id: 4, title: 'Video 4', thumbnail: 'https://via.placeholder.com/320x180' },
  { id: 5, title: 'Video 5', thumbnail: 'https://via.placeholder.com/320x180' },
  { id: 6, title: 'Video 6', thumbnail: 'https://via.placeholder.com/320x180' },
];

export default function VideoScroller() {
  return (
    <div className="p-5">
      <h2 className="text-xl font-bold mb-4">Recommended for You</h2>
      <div className="flex space-x-4 overflow-x-auto">
        {videos.map((video) => (
          <div
            key={video.id}
            className="flex-shrink-0 w-64 aspect-video bg-gray-800 rounded-lg overflow-hidden"
          >
            <img
              src={video.thumbnail}
              alt={video.title}
              className="w-full h-full object-cover"
            />
          </div>
        ))}
      </div>
    </div>
  );
}
