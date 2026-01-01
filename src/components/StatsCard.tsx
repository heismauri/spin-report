import { TopStats } from "@/types/Stats";

const formatDate = (date: Date) => {
  const month = date.toLocaleString("default", { month: "long" });
  return `${date.getDate()} ${month}`;
};

const statsCard = ({
  albums,
  artists,
  tracks,
  streams,
  dateRange
}: TopStats) => {
  const artistsWithImages = artists.filter((artist) => artist.image);
  return (
    <div id="spin-report" className="text-xl py-24">
      <h2 className="text-4xl text-purple-500 font-bold leading-none">Your Spin Report</h2>
      <div className="text-sm opacity-40 leading-3">spinreport.heismauri.com</div>
      <div className="text-right mb-3">
        {formatDate(dateRange.from)} - {formatDate(dateRange.to)}
      </div>
      {artistsWithImages.length > 0 && (
        <ul className="flex flex-row gap-2 mb-3">
          {artistsWithImages.slice(0, 3).map((artist, index) => (
            <li key={index} className="basis-1/3">
              <img className="rounded-md aspect-square object-cover shadow-md" src={artist.image} alt={artist.name} />
            </li>
          ))}
        </ul>
      )}
      <div className="flex gap-8 text-center items-center justify-center mb-3">
        {streams.minutes && (
          <div>
            <div className="text-3xl leading-none">{Math.round(streams.minutes)}</div>
            <div className="text-sm">Minutes</div>
          </div>
        )}
        <div>
          <div className="text-3xl leading-none">{streams.count}</div>
          <div className="text-sm">Streams</div>
        </div>
        <div>
          <div className="text-3xl leading-none">{streams.tracks}</div>
          <div className="text-sm">Tracks</div>
        </div>
        <div>
          <div className="text-3xl leading-none">{streams.artists}</div>
          <div className="text-sm">Artists</div>
        </div>
      </div>
      <div className="font-bold text-purple-500">Top 5 tracks:</div>
      <ol className="list-decimal list-inside mb-3 leading-3.5">
        {tracks.slice(0, 5).map((track, index) => (
          <li key={index}>{track.name} <span className="text-sm text-gray-500">[{track.playcount} plays]</span></li>
        ))}
      </ol>
      <div className="font-bold text-purple-500">Top 5 artists:</div>
      <ol className="list-decimal list-inside mb-3 leading-3.5">
        {artists.slice(0, 5).map((artist, index) => (
          <li key={index}>{artist.name} <span className="text-sm text-gray-500">[{artist.playcount} plays]</span></li>
        ))}
      </ol>
      <div className="font-bold text-purple-500">Top 5 albums:</div>
      <ol className="list-decimal list-inside mb-3 leading-3.5">
        {albums.slice(0, 5).map((album, index) => (
          <li key={index}>{album.name} <span className="text-sm text-gray-500">[{album.playcount} plays]</span></li>
        ))}
      </ol>
    </div>
  );
};

export default statsCard;
