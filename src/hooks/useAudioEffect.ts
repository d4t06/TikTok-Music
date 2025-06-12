import { useEffect } from "react";
import { usePlayerContext } from "../stores/Player";
import { uesCurrentIndexContext } from "../stores/global/CurrentIndex";
import { SONGS } from "../contants/songs";

type Props = {
  audioEle: HTMLAudioElement;
};

export default function uesAudioEffect({ audioEle }: Props) {
  const { setStatus, shouldPlayAfterLoaded, canPlay } = usePlayerContext();
  const { firstTimeSongLoaded, currentIndex } = uesCurrentIndexContext();

  const handleLoadStart = () => {
    setStatus("loading");
  };

  const handleLoaded = () => {
    // when the page first load
    if (firstTimeSongLoaded.current) {
      firstTimeSongLoaded.current = false;
      setStatus("paused");

      return;
    }

    // when song item just active
    if (shouldPlayAfterLoaded.current) {
      shouldPlayAfterLoaded.current = false;
      audioEle?.play();
    }
  };

  const handleError = () => {
    setStatus("error");
  };

  useEffect(() => {
    if (canPlay) {
      audioEle.src = SONGS[currentIndex].song_url;
    }
  }, [canPlay]);

  // add events listener
  useEffect(() => {
    audioEle.addEventListener("error", handleError);
    audioEle.addEventListener("loadstart", handleLoadStart);
    audioEle.addEventListener("loadedmetadata", handleLoaded);

    return () => {
      audioEle.removeEventListener("error", handleError);
      audioEle.removeEventListener("loadstart", handleLoadStart);
      audioEle.removeEventListener("loadedmetadata", handleLoaded);
    };
  }, []);
}
