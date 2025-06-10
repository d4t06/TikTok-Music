import { forwardRef, useRef, type Ref } from "react";
import SongItemCta from "./SongItemCta";
import SongControl, { type SongControlRef } from "./SongControl";
import PlayerProvider, { usePlayerContext } from "../stores/Player";
import { Blurhash } from "react-blurhash";

type Props = {
	song: Song;
	index: number;
};

function Content({ song, index }: Props) {
	const audioRef = useRef<HTMLAudioElement | null>(null);
	const ctaRef = useRef<HTMLDivElement | null>(null);

	const controlRef = useRef<SongControlRef>(null);
	return (
		<>
			<div className="relative flex items-center justify-center text-white h-full aspect-[3/5] rounded-xl overflow-hidden">
				{/*background*/}
				<div className="absolute z-[-1] inset-0">
					{song.blurhash_encode && (
						<Blurhash
							hash={song.blurhash_encode}
							height={"100%"}
							width={"100%"}
						/>
					)}
				</div>

				<div className="h-2/5 aspect-[1/1] overflow-hidden rounded-md">
					<img src={song.image_url} />
				</div>

				<div className="absolute bottom-0 left-0 w-full p-4">
					{audioRef.current && (
						<SongControl ref={controlRef} audioEle={audioRef.current} />
					)}
				</div>
			</div>

			<SongItemCta containerRef={ctaRef} />

			<audio ref={audioRef} src={song.song_url} className="hidden" />
		</>
	);
}

function Wrapper(props: Props, ref: Ref<HTMLDivElement>) {
	// const [_hasVideo, setHasVideo] = useState(false);

	// useEffect(() => {
	// 	setHasVideo(true);
	// }, []);

	return (
		<>
			<div
				data-index={props.index}
				className="video-item flex h-screen items-end justify-center p-4 space-x-4"
				ref={ref}
			>
				<PlayerProvider>
					<Content {...props} />
				</PlayerProvider>
			</div>
		</>
	);
}

export default forwardRef(Wrapper);
