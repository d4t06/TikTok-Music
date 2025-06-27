import { ArrowPathIcon, XMarkIcon } from "@heroicons/react/24/outline";
import { uesCurrentIndexContext } from "../stores/global/CurrentIndex";
import useGetComment from "../hooks/useGetComment";

export default function SongCardComment() {
	const { isOpenComment, setIsOpenComment } = uesCurrentIndexContext();

	const { isFetching } = useGetComment();

	const activeClass = isOpenComment ? "lg:right-0 block" : "lg:right-[-100%] hidden lg:block";

	return (
		<>
			<div
				className={`${isOpenComment ? "fixed" : ""} lg:hidden bg-black/60 inset-0 z-[90]`}
			></div>

			<div
				className={`transition-[right] duration-[.3s] z-[99] bg-[#333] absolute rounded-xl left-1/2 top-1/2 translate-y-[-50%] translate-x-[-50%] lg:left-[unset] lg:top-[unset] lg:transform-none  lg:bg-transparent lg:h-full lg:min-h-[360px] w-[400px] p-4 top-0 ${activeClass}`}
			>
				<div
					className={` p-3 lg:h-full w-full rounded-xl flex flex-col text-white lg:text-black lg:border lg:border-black/20`}
				>
					<div className={`flex items-center justify-between`}>
						<div className="font-playwriteCU">Comments</div>

						<button
							onClick={() => setIsOpenComment(false)}
							className="p-1.5 hover:bg-black/20"
						>
							<XMarkIcon className="w-6" />
						</button>
					</div>

					<div className="flex-col flex-grow overflow-auto ">
						{isFetching && <ArrowPathIcon className="w-7 animate-spin" />}

						{!isFetching && (
							<>
								<p>Comment</p>
								<p>Comment</p>
								<p>Comment</p>
								<p>Comment</p>
							</>
						)}
					</div>
				</div>
			</div>
		</>
	);
}
