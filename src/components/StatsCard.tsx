const formatDate = (date: Date) => {
  const month = date.toLocaleString("default", { month: "long" });
  return `${date.getDate()} ${month}`;
};

const statsCard = ({
  albums,
  artists,
  tracks,
  minutes,
  streams,
  dateRange
}: {
  albums: string[];
  artists: { name: string; image?: string }[];
  tracks: string[];
  minutes: number;
  streams: number;
  dateRange: { from: Date; to: Date };
}) => {
  const artistsWithImages = artists.filter((artist) => artist.image);
  return (
    <div id="spin-report" className="text-xl py-8">
      <h2 className="text-4xl font-bold">Your Spin Report</h2>
      <div className="text-right mb-4">
        {formatDate(dateRange.from)} - {formatDate(dateRange.to)}
      </div>
      <ul className="flex flex-row gap-2 mb-4">
        {artistsWithImages.slice(0, 3).map((artist, index) => (
            <li key={index} className="basis-1/3">
              <img
                className="border-2 border-gray-300 rounded-md aspect-square object-cover"
                src={artist.image}
                alt={artist.name}
              />
            </li>
          ))}
      </ul>
      <div className="flex gap-8 text-center items-center justify-center">
        <div>
          <div className="text-4xl leading-none">{Math.round(minutes)}</div>
          <div>Minutes</div>
        </div>
        <div>
          <div className="text-4xl leading-none">{streams}</div>
          <div>Streams</div>
        </div>
      </div>
      <div className="text-2xl font-bold">Top 5 tracks:</div>
      <ol className="list-decimal list-inside mb-4 leading-none">
        {tracks.slice(0, 5).map((track, index) => (
          <li key={index}>{track}</li>
        ))}
      </ol>
      <div className="text-2xl font-bold">Top 5 artists:</div>
      <ol className="list-decimal list-inside mb-4 leading-none">
        {artists.slice(0, 5).map((artist, index) => (
          <li key={index}>{artist.name}</li>
        ))}
      </ol>
      <div className="text-2xl font-bold">Top 5 albums:</div>
      <ol className="list-decimal list-inside mb-4 leading-none">
        {albums.slice(0, 5).map((album, index) => (
          <li key={index}>{album}</li>
        ))}
      </ol>
    </div>
  );
};

export default statsCard;
