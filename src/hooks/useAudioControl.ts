import { useEffect, useRef, useState, type RefObject } from "react";
import { getLinearBg } from "../utils/appHelper";
import { usePlayerContext } from "../stores/Player";

export type Status = "playing" | "paused" | "waiting" | "error";

type Props = {
  audioEle: HTMLAudioElement;
  progressLineRef?: RefObject<HTMLDivElement | null>;
};

export default function useAudioControl({ audioEle, progressLineRef }: Props) {
  const { status, setStatus, statusRef } = usePlayerContext();
  // const [status, setStatus] = useState<Status>("paused");

  // const statusRef = useRef<Status>(status);

  const play = () => {
    try {
      audioEle.play();
    } catch (error) {}
  };

  const pause = () => {
    audioEle?.pause();
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

  const handleError = () => {
    setStatus("error");
  };

  const updateProgress = (progress?: number) => {
    if (!audioEle) return;

    const _progress = +(
      progress || (audioEle.currentTime / audioEle.duration) * 100
    ).toFixed(1);

    if (progressLineRef?.current)
      progressLineRef.current.style.background = getLinearBg(
        "#cd1818",
        _progress,
      );
  };

  const handleTimeUpdate = () => {
    const currentTime = audioEle.currentTime;
    const ratio = currentTime / (audioEle.duration / 100);

    updateProgress(+ratio.toFixed(1));
  };

  const seek = (time: number) => {
    audioEle.currentTime = time;
    updateProgress();

    if (status !== "playing") play();
  };

  const forward = (second: number) => {
    audioEle.currentTime = audioEle.currentTime + second;
  };
  const backward = (second: number) => {
    audioEle.currentTime = audioEle.currentTime - second;
  };

  const handleSeek = (e: MouseEvent) => {
    const node = e.target as HTMLElement;

    if (progressLineRef?.current) {
      const clientRect = node.getBoundingClientRect();

      const length = e.clientX - clientRect.left;
      const lengthRatio = length / progressLineRef.current!.offsetWidth;
      const newSeekTime = Math.round(lengthRatio * audioEle.duration);

      updateProgress(newSeekTime);
      audioEle.currentTime = newSeekTime;
    }
  };

  const handleLoaded = () => {
    setStatus("paused");
  };

  // add events listener
  useEffect(() => {
    if (!audioEle) return;

    audioEle.addEventListener("pause", handlePaused);
    audioEle.addEventListener("loadeddata", handleLoaded);
    audioEle.addEventListener("playing", handlePlaying);
    audioEle.addEventListener("error", handleError);

    if (progressLineRef?.current) {
      audioEle.addEventListener("timeupdate", handleTimeUpdate);
      progressLineRef?.current.addEventListener("click", handleSeek);
    }

    return () => {
      audioEle.removeEventListener("loadeddata", handleLoaded);

      audioEle.removeEventListener("pause", handlePaused);
      audioEle.removeEventListener("playing", handlePlaying);
      audioEle.removeEventListener("error", handleError);

      if (progressLineRef?.current) {
        audioEle.removeEventListener("timeupdate", handleTimeUpdate);
        progressLineRef?.current.removeEventListener("click", handleSeek);
      }
    };
  }, [audioEle]);

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
