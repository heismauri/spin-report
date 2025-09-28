import type { Albums, Artists, Streams, Tracks } from "@/types/statsFmResponses";

const formatDate = (date: Date) => {
  const month = date.toLocaleString("default", { month: "long" });
  return `${date.getDate()} ${month}`;
};

const statsCard = ({
  albums,
  artists,
  tracks,
  streams,
  weekRange
}: {
  albums: Albums;
  artists: Artists;
  tracks: Tracks;
  streams: Streams;
  weekRange: { from: Date; to: Date };
}) => {
  return (
    <div className="text-xl py-8">
      <h2 className="text-4xl font-bold">Your Spin Report</h2>
      <div className="text-right mb-4">
        {formatDate(weekRange.from)} - {formatDate(weekRange.to)}
      </div>
      <ul className="flex flex-row gap-2 mb-4">
        {artists.items.slice(0, 3).map(({ artist }, index) => (
          <li key={artist.id} className="basis-1/3">
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
          <div className="text-4xl leading-none">{Math.round(streams.items.playedMs.sum / 60000)}</div>
          <div>Minutes</div>
        </div>
        <div>
          <div className="text-4xl leading-none">{streams.items.playedMs.count}</div>
          <div>Streams</div>
        </div>
      </div>
      <div className="text-2xl font-bold">Top 5 tracks:</div>
      <ol className="list-decimal list-inside mb-4 leading-none">
        {tracks.items.slice(0, 5).map(({ track }) => (
          <li key={track.id}>{track.name}</li>
        ))}
      </ol>
      <div className="text-2xl font-bold">Top 5 artists:</div>
      <ol className="list-decimal list-inside mb-4 leading-none">
        {artists.items.slice(0, 5).map(({ artist }) => (
          <li key={artist.id}>{artist.name}</li>
        ))}
      </ol>
      <div className="text-2xl font-bold">Top 5 albums:</div>
      <ol className="list-decimal list-inside mb-4 leading-none">
        {albums.items.slice(0, 5).map(({ album }) => (
          <li key={album.id}>{album.name}</li>
        ))}
      </ol>
    </div>
  );
};

export default statsCard;
