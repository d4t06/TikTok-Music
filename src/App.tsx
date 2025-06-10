import SongList from "./components/SongList";
import SuggerUserProvider from "./stores/VideoStore";

function App() {
  return (
    <SuggerUserProvider>
      <SongList />
    </SuggerUserProvider>
  );
}

export default App;
