import { useEffect } from "react";

type Props = {
	videoEle: HTMLVideoElement;
	rightCtaEle: HTMLDivElement;
};

export default function useVideoEvent({ videoEle, rightCtaEle }: Props) {
	const handleVideoLoaded = () => {
		console.log("loaded");

		rightCtaEle.classList.remove("hidden");
	};

	const handleError = () => {
		console.log("error");
	};

	useEffect(() => {
		videoEle.addEventListener("loadeddata", handleVideoLoaded);
		videoEle.addEventListener("error", handleError);

		return () => {
			videoEle.removeEventListener("loadeddata", handleVideoLoaded);
			videoEle.removeEventListener("error", handleError);
		};
	}, []);
}
