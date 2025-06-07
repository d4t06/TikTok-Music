import {
	ChatBubbleBottomCenterIcon,
	HeartIcon,
	ShareIcon,
} from "@heroicons/react/24/outline";

export default function VideoItemCta() {
	return (
		<div
			className="flex flex-col
			space-y-4
			[&_button]:rounded-full
			[&_button]:p-3
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

			<div>
				<button>
					<ShareIcon className="w-6" />
				</button>
				<span>13</span>
			</div>
		</div>
	);
}
