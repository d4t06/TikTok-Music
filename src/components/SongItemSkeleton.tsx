export default function SongItemSkeleton() {
	return (
		<div className="flex h-screen justify-center items-end p-4 rounded-xl">
			<div className="rounded-xl h-full aspect-[3/5] bg-black/10"></div>

			<div className="h-[250px] w-[48px] rounded-xl bg-black/10 ml-4"></div>
		</div>
	);
}
