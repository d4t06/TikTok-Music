import { forwardRef, useEffect, useRef, useState, type Ref } from "react";
import VideoItemCta from "./VideoItemCta";
import VideoControl from "./VideoControl";

type Props = {
	user: User;
	index: number;
};

function VideoItem({ user }: Props, ref: Ref<HTMLDivElement>) {
	const [_hasVideo, setHasVideo] = useState(false);

	const videoRef = useRef<HTMLVideoElement | null>(null);

	useEffect(() => {
		setHasVideo(true);
	}, []);

	return (
		<div
			className="flex h-screen items-end justify-center p-4 space-x-4"
			ref={ref}
		>
			<div className="relative text-white h-full rounded-xl overflow-hidden">
				<video
					ref={videoRef}
					className="h-full"
					src={user.popular_video.file_url}
				/>

				<div className="absolute bottom-0 left-0 w-full p-4">
					{videoRef.current && <VideoControl videoEle={videoRef.current} />}
				</div>
			</div>

			<VideoItemCta />
		</div>
	);
}

export default forwardRef(VideoItem);
