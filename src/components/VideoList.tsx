import { useCallback, useEffect, useMemo, useRef } from "react";
import useGetSuggestUser from "../hooks/useGetSuggestUser";
import { useSuggestUserContext } from "../stores/VideoStore";
import VideoItem from "./VideoItem";
import useWheel from "../hooks/useWheel";

export default function VideoList() {
	const { users, page, isFetching, isLast } = useSuggestUserContext();

	const { getSuggestUser } = useGetSuggestUser();

	useWheel();

	const ranEffect = useRef(false);

	const intObserver = useRef<IntersectionObserver | null>(null);

	const lastElementRef = useCallback(
		(el: HTMLDivElement) => {
			if (isFetching) return;
			if (intObserver.current) intObserver.current.disconnect();

			intObserver.current = new IntersectionObserver((entries) => {
				if (entries[0].isIntersecting && !isLast) {
					getSuggestUser(page + 1);
				}
			});

			if (el) intObserver.current.observe(el);
		},
		[isFetching],
	);

	const content = useMemo(() => {
		return users.map((item, index) => {
			if (users.length === index + 1) {
				return (
					<VideoItem
						index={index + 1}
						key={index}
						ref={lastElementRef}
						user={item}
					/>
				);
			}
			return <VideoItem index={index + 1} key={index} user={item} />;
		});
	}, [users]);

	useEffect(() => {
		if (!ranEffect.current) {
			ranEffect.current = true;
			if (!users.length) getSuggestUser(1);
		}
	}, []);

	return (
		<div className="main-container">
			{isFetching && <p>Loading...</p>}

			{content}
		</div>
	);
}
