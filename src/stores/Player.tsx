import {
	createContext,
	useContext,
	useRef,
	useState,
	type ReactNode,
} from "react";

type Status = "playing" | "paused" | "waiting" | "error" | "loading-data";

function usePlayer() {
	const [status, setStatus] = useState<Status>("loading-data");

	const statusRef = useRef<Status>("loading-data");

	return {
		status,
		setStatus,
		statusRef,
	};
}

type ContextType = ReturnType<typeof usePlayer>;

const context = createContext<ContextType | null>(null);

export default function PlayerProvider({ children }: { children: ReactNode }) {
	return <context.Provider value={usePlayer()}>{children}</context.Provider>;
}

export function usePlayerContext() {
	const ct = useContext(context);
	if (!ct) throw new Error("PlayerProvider not provided");

	return ct;
}
