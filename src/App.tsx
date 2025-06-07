import VideoList from "./components/VideoList";
import SuggerUserProvider from "./stores/VideoStore";

function App() {
  return (
    <SuggerUserProvider>
      <VideoList />
    </SuggerUserProvider>
  );
}

export default App;
