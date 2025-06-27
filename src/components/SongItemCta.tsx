import {
	ChatBubbleBottomCenterIcon,
	HeartIcon,
} from "@heroicons/react/24/outline";
import { uesCurrentIndexContext } from "../stores/global/CurrentIndex";

export default function SongItemCta() {

	const {setIsOpenComment} = uesCurrentIndexContext()

	return (
		<div
			className="flex 
			space-x-2
			[&_button]:rounded-full
			[&_button]:p-2.5
			[&_button]:bg-white/10
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
			</div>
			<div>
				<button onClick={() => setIsOpenComment(true)}>
					<ChatBubbleBottomCenterIcon className="w-6" />
				</button>
			</div>
		</div>
	);
}
