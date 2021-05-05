import { Navbar } from "../../components/Navbar";
import { Watchlist } from "../../components/Watchlist";

export function Playlist() {
  return (
    <div>
      <Navbar />
      <h1>Yeh Playlist hai</h1>
      <Watchlist />
    </div>
  );
}
