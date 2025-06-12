import { useEffect, useRef, useState } from "react";
import { usePlayerContext } from "../stores/Player";
import { sleep } from "../utils/appHelper";
import { LYRIC } from "../contants/lyric";

export default function useGetSongLyric() {
	const { canPlay, setLyrics, shouldGetLyric } = usePlayerContext();

	const [isFetching, setIsFetching] = useState(false);

	const timerId = useRef<number>(0);

	const getLyric = async () => {
		try {
			setIsFetching(true);

			await sleep(500);

			setLyrics(JSON.parse(LYRIC.lyrics || "[]"));
		} catch (error) {
			console.log({ message: error });
		} finally {
			setIsFetching(false);
		}
	};

	//  api get lyric
	useEffect(() => {
		if (canPlay) {
			if (shouldGetLyric.current) {
				shouldGetLyric.current = false;
				timerId.current = setTimeout(() => {
					getLyric();
				}, 500);
			}
		}
	}, [canPlay]);

	return { isFetching };
}
