import { ArrowPathIcon } from "@heroicons/react/24/outline";
import useGetSongLyric from "../hooks/useGetSongLyric";
import useLyric from "../hooks/useSongLyric";
import { usePlayerContext } from "../stores/Player";
import { useEffect, useRef } from "react";

type Props = {
	audioEle: HTMLAudioElement;
};

export default function SongLyric({ audioEle }: Props) {
	const { lyrics, canPlay } = usePlayerContext();
	const { isFetching } = useGetSongLyric();

	const mainLyricRef = useRef<HTMLParagraphElement | null>(null);
	const subLyricRef = useRef<HTMLParagraphElement | null>(null);

	const { currentIndex } = useLyric({
		audioEle,
		lyrics,
		isActive: canPlay,
	});

	const renderItem = () => {
		return (
			<>
				<p
					key={currentIndex}
					className="transition-transform origin-bottom-left duration-[.4s] translate-y-[50px]"
					ref={mainLyricRef}
				>
					{lyrics[currentIndex].text}
				</p>
				{lyrics[currentIndex + 1] && (
					<p key={currentIndex + 'asda'} ref={subLyricRef} className="mt-3 transition-transform duration-[.4s] opacity-[.4] translate-y-[-10px]">
						{lyrics[currentIndex + 1].text}
					</p>
				)}
			</>
		);
	};

	const classes = {
		container:
			"no-scrollbar [&_p]:w-[70%] [&_p]:select-none [&_p]:font-[700] aspect-[5/3] pt-4	",
	};

	useEffect(() => {
		setTimeout(() => {
			if (mainLyricRef.current)
				Object.assign(mainLyricRef.current.style, {
					transform: "scale(1.3) translateY(0px)",
				});

			if (subLyricRef.current)
				Object.assign(subLyricRef.current.style, {
					transform: "translateY(0px)",
				});
		}, 0);
	}, [currentIndex, lyrics]);

	return (
		<div className={`${classes.container}`}>
			{isFetching && (
				<div className="relative w-full h-full">
					<ArrowPathIcon className="w-7 animate-spin" />
				</div>
			)}

			{!isFetching && <>{lyrics.length ? renderItem() : <div>...</div>}</>}
		</div>
	);
}
