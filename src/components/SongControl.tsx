import { forwardRef, useImperativeHandle, useRef, type Ref } from "react";
import useAudioControl from "../hooks/useAudioControl";
import {
	ExclamationCircleIcon,
	PauseIcon,
	PlayIcon,
} from "@heroicons/react/20/solid";
import { usePlayerContext } from "../stores/Player";

export type SongControlRef = {
	pause: () => void;
	play: () => void;
	handlePlayPause: () => void;
};

type Props = {
	audioEle: HTMLAudioElement;
};

function SongControl({ audioEle }: Props, ref: Ref<SongControlRef>) {
	const { status } = usePlayerContext();

	const progressLineRef = useRef<HTMLDivElement>(null);

	const { pause, play, handlePlayPause } = useAudioControl({
		audioEle,
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
			<button onClick={handlePlayPause} className="[&_svg]:w-7">
				{renderIcon()}
			</button>
			<div className="h-2 flex items-center">
				<div
					ref={progressLineRef}
					style={{ backgroundColor: "rgba(255,255,255,.3)" }}
					className={`h-1 hover:h-full cusor mt-3 rounded-full w-full`}
				></div>
			</div>
		</>
	);
}

export default forwardRef(SongControl);
