import { useEffect, useRef } from "react";

export default function useWheel() {
	// const [currentIndex, setCurrentIndex] = useState(0);

	const currentIndexRef = useRef(0);

	// important function
	const checkIsScrollFinish = () => {
		const expectScroll = currentIndexRef.current * window.innerHeight;
		const diff = Math.ceil(window.scrollY) - Math.ceil(expectScroll);

		return diff === 0;
	};

	const handleWheel = (e: WheelEvent) => {
		const isScrollFinish = checkIsScrollFinish();

		console.log("wheel");

		if (isScrollFinish) {
			let needToScroll = 0;

			// scroll down
			if (e.deltaY > 0) {
				needToScroll = (currentIndexRef.current + 1) * window.innerHeight;
				currentIndexRef.current += 1;

				// scroll up
			} else {
				if (currentIndexRef.current === 0) return;

				needToScroll = (currentIndexRef.current - 1) * window.innerHeight;
				currentIndexRef.current -= 1;
			}

			console.log(needToScroll);

			window.scrollTo({
				top: needToScroll,
				behavior: "smooth",
			});
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

	// useEffect(() => {// 	currentIndexRef.current = currentIndex;
	// }, [currentIndex]);
}
