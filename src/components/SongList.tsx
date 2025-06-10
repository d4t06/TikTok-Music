import { useCallback, useMemo, useRef } from "react";
import SongItem from "./SongItem";
// import useWheel from "../hooks/useWheel";
// import useWheel2 from "../hooks/useWheel2";
// import SongItemSkeleton from "./SongItemSkeleton";
import { SONGS } from "../contants/songs";

export default function VideoList() {
	// const { getSuggestUser } = useGetSuggestUser();

	// useWheel2();

	// const ranEffect = useRef(false);

	const intObserver = useRef<IntersectionObserver | null>(null);

	const lastElementRef = useCallback((el: HTMLDivElement) => {
		if (intObserver.current) intObserver.current.disconnect();

		intObserver.current = new IntersectionObserver((entries) => {
			if (entries[0].isIntersecting) {
				// getSuggestUser(page + 1);
			}
		});

		if (el) intObserver.current.observe(el);
	}, []);

	const content = useMemo(() => {
		return SONGS.map((item, index) => {
			if (SONGS.length === index + 1) {
				return (
					<SongItem
						index={index + 1}
						key={index}
						ref={lastElementRef}
						song={item}
					/>
				);
			}
			return <SongItem index={index + 1} key={index} song={item} />;
		});
	}, []);

	// const skeletons = useMemo(
	// 	() => [...Array(5).keys()].map((i) => <SongItemSkeleton key={i} />),
	// 	[],
	// );

	// useEffect(() => {
	// 	if (!ranEffect.current) {
	// 		ranEffect.current = true;
	// 		if (!users.length) getSuggestUser(1);
	// 	}
	// }, []);

	return (
		<div className="main-container">
			{content}
			{/*{isFetching && skeletons}*/}
		</div>
	);
}
