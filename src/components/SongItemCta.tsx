import {
	ChatBubbleBottomCenterIcon,
	HeartIcon,
} from "@heroicons/react/24/outline";
import type { Ref } from "react";

type Props = {
	containerRef: Ref<HTMLDivElement>;
};

export default function SongItemCta({ containerRef }: Props) {
	return (
		<div
			ref={containerRef}
			className="flex flex-col
			space-y-4
			[&_button]:rounded-full
			[&_button]:p-2.5
			[&_button]:bg-black/10
			[&_div]:flex-col
			[&_div]:flex
			[&_span]:text-center
			[&_span]:font-medium
		 "
		>
			<div>
				<button>
					<HeartIcon className="w-6" />
				</button>
				<span>421</span>
			</div>
			<div>
				<button>
					<ChatBubbleBottomCenterIcon className="w-6" />
				</button>
				<span>41</span>
			</div>
		</div>
	);
}
