import SongCardComment from "./components/Comment";
import SongList from "./components/SongList";
import CurrrentIndexProvider from "./stores/global/CurrentIndex";

function App() {
  return (
    <CurrrentIndexProvider>
      <div className="fixed inset-0">
        <SongList />

        <SongCardComment />
      </div>
    </CurrrentIndexProvider>
  );
}

export default App;
