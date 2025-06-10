import { useEffect, useRef } from "react";

export default function useWheel2() {
	// const [currentIndex, setCurrentIndex] = useState(0);

	const currentIndexRef = useRef(0);

	// important function
	// const checkIsScrollFinish = () => {
	// 	const expectScroll = currentIndexRef.current * window.innerHeight;
	// 	const diff = Math.ceil(window.scrollY) - Math.ceil(expectScroll);

	// 	return diff === 0;
	// };

	const handleOnScrollEnd = () => {
		console.log("scrollend");
	};

	const handleWheel = (e: WheelEvent) => {
		// const isScrollFinish = checkIsScrollFinish();

		// scroll down
		if (e.deltaY > 0) {
			currentIndexRef.current += 1;

			// scroll up
		} else {
			if (currentIndexRef.current === 0) return;
			currentIndexRef.current -= 1;
		}

		const targetItem = document.querySelector(
			`.video-item[data-index='${currentIndexRef.current}']`,
		);

		if (targetItem) {
			targetItem.scrollIntoView({
				behavior: "smooth",
				block: "center",
			});
		}
	};

	useEffect(() => {
		document?.addEventListener("wheel", handleWheel);
		// document?.addEventListener("scroll", handleOnScroll);
		document?.addEventListener("scrollend", handleOnScrollEnd);

		return () => {
			document?.removeEventListener("wheel", handleWheel);
			// document?.removeEventListener("scroll", handleOnScroll);
			document?.removeEventListener("scrollend", handleOnScrollEnd);
		};
	}, []);

	// useEffect(() => {// 	currentIndexRef.current = currentIndex;
	// }, [currentIndex]);
}
