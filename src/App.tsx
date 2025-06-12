import SongList from "./components/SongList";
import CurrrentIndexProvider from "./stores/global/CurrentIndex";

function App() {
  return (
    <CurrrentIndexProvider>
      <SongList />
    </CurrrentIndexProvider>
  );
}

export default App;
