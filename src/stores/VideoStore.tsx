import { createContext, useContext, useState, type ReactNode } from "react";

function useUser() {
	const [users, setUser] = useState<User[]>([]);
	const [page, setPage] = useState(1);

	const [isLast, setIsLast] = useState(false);
	const [isFetching, setIsFetching] = useState(true);

	return {
		users,
		setUser,
		page,
		setPage,
		isLast,
		setIsLast,
		isFetching,
		setIsFetching,
	};
}

type ContextType = ReturnType<typeof useUser>;

const context = createContext<ContextType | null>(null);

export default function SuggerUserProvider({
	children,
}: {
	children: ReactNode;
}) {
	return <context.Provider value={useUser()}>{children}</context.Provider>;
}

export function useSuggestUserContext() {
	const ct = useContext(context);
	if (!ct) throw new Error("SuggerUserProvider not provided");

	return ct;
}
