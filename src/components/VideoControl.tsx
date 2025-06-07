import { forwardRef, useImperativeHandle, useRef, type Ref } from "react";
import useVideoControl from "../hooks/useVideoControl";
import {
	ExclamationCircleIcon,
	PauseIcon,
	PlayIcon,
} from "@heroicons/react/20/solid";

export type VideoControlRef = {
	pause: () => void;
	play: () => void;
	handlePlayPause: () => void;
};

type Props = {
	videoEle: HTMLVideoElement;
};

function VideoControl({ videoEle }: Props, ref: Ref<VideoControlRef>) {
	const progressLineRef = useRef<HTMLDivElement>(null);

	const { pause, play, handlePlayPause, status } = useVideoControl({
		videoEle,
		progressLineRef,
	});

	useImperativeHandle(ref, () => ({
		pause,
		play,
		handlePlayPause,
	}));

	const renderIcon = () => {
		switch (status) {
			case "playing":
				return <PauseIcon />;
			case "paused":
				return <PlayIcon />;
			case "error":
				return <ExclamationCircleIcon />;
		}
	};

	return (
		<>
			<button className="[&_svg]:w-7">{renderIcon()}</button>
			<div
				ref={progressLineRef}
				style={{ backgroundColor: "rgba(255,255,255,.3)" }}
				className={`h-1 mt-3 rounded-full mt-3 w-full`}
			></div>
		</>
	);
}

export default forwardRef(VideoControl);
