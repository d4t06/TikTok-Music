import { useEffect, useRef, useState } from "react";

export default function useWheel() {
	const [currentIndex, setCurrentIndex] = useState(0);

	const currentIndexRef = useRef(0);

	// important function
	const checkIsScrollFinish = (curIndex: number) => {
		const expectScroll = curIndex * window.innerHeight;
		const diff = Math.ceil(window.scrollY) - Math.ceil(expectScroll);

		console.log(window.scrollY, expectScroll, curIndex);

		return diff >= 0;
	};

	const handleWheel = (e: Event) => {
		const isScrollFinish = checkIsScrollFinish(currentIndexRef.current);

		if (isScrollFinish) {
			const needToScroll = (currentIndexRef.current + 1) * window.innerHeight;

			console.log(needToScroll);

			window.scrollTo({
				top: needToScroll,
				behavior: "smooth",
			});

			setCurrentIndex((prev) => prev + 1);
		}
	};

	useEffect(() => {
		document?.addEventListener("wheel", handleWheel);
		// document?.addEventListener("scroll", handleOnScroll);
		// document?.addEventListener("scrollend", handleOnScrollEnd);

		return () => {
			document?.removeEventListener("wheel", handleWheel);
			// document?.removeEventListener("scroll", handleOnScroll);
			// document?.removeEventListener("scrollend", handleOnScrollEnd);
		};
	}, []);

	useEffect(() => {
		currentIndexRef.current = currentIndex;
	}, [currentIndex]);
}
