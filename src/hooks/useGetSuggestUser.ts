import { useSuggestUserContext } from "../stores/VideoStore";

export default function useGetSuggestUser() {
	const { setIsFetching, setUser, setPage } = useSuggestUserContext();

	type Response = {
		data: User[];
	};

	const getSuggestUser = async (page: number) => {
		try {
			setIsFetching(true);

			const res = await fetch(
				`https://tiktok.fullstack.edu.vn/api/users/suggested?page=${page}`,
			);

			if (res.ok) {
				const payload = (await res.json()) as Response;

				setUser((prev) => [...prev, ...payload.data]);
				setPage(page);

				setIsFetching(false);

			}
		} catch (error: any) {
		} finally {
			setIsFetching(false);
		}
	};

	return { getSuggestUser };
}
