import { useEffect, useRef, useState, type RefObject } from "react";
import { getLinearBg } from "../utils/appHelper";

export type Status = "playing" | "paused" | "waiting" | "error";

type Props = {
  videoEle: HTMLVideoElement
  progressLineRef?: RefObject<HTMLDivElement | null>;
};

export default function useVideoControl({ videoEle, progressLineRef }: Props) {
  const [status, setStatus] = useState<Status>("paused");

  const statusRef = useRef<Status>(status);

  const play = () => {
    try {
      videoEle.play();
    } catch (error) {}
  };

  const pause = () => {
    videoEle?.pause();
    handlePaused();
  };

  const handlePlayPause = () => {
    status === "playing" ? pause() : status === "paused" && play();
  };

  const handlePlaying = () => {
    setStatus("playing");
  };

  const handlePaused = () => {
    setStatus("paused");
  };

  const updateProgress = (progress?: number) => {
    if (!videoEle) return;

    const _progress = +(
      progress || (videoEle.currentTime / videoEle.duration) * 100
    ).toFixed(1);

    if (progressLineRef?.current)
      progressLineRef.current.style.background = getLinearBg(
        "#cd1818",
        _progress,
      );
  };

  const handleTimeUpdate = () => {
    const currentTime = videoEle.currentTime;
    const ratio = currentTime / (videoEle.duration / 100);

    updateProgress(+ratio.toFixed(1));
  };

  const handleError = () => {
    setStatus("error");
  };

  const seek = (time: number) => {
    videoEle.currentTime = time;
    updateProgress();

    if (status !== "playing") play();
  };

  const forward = (second: number) => {
    videoEle.currentTime = videoEle.currentTime + second;
  };
  const backward = (second: number) => {
    videoEle.currentTime = videoEle.currentTime - second;
  };

  // add events listener
  useEffect(() => {
    if (!videoEle) return;

    videoEle.addEventListener("error", handleError);
    videoEle.addEventListener("pause", handlePaused);
    videoEle.addEventListener("playing", handlePlaying);

    if (progressLineRef?.current)
      videoEle.addEventListener("timeupdate", handleTimeUpdate);

    return () => {
      videoEle.removeEventListener("error", handleError);
      videoEle.removeEventListener("pause", handlePaused);
      videoEle.removeEventListener("playing", handlePlaying);
      if (progressLineRef?.current)
        videoEle.removeEventListener("timeupdate", handleTimeUpdate);
    };
  }, [videoEle]);

  useEffect(() => {
    statusRef.current = status;
  }, [status]);

  return {
    play,
    pause,
    seek,
    handlePlayPause,
    status,
    forward,
    backward,
    statusRef,
  };
}
