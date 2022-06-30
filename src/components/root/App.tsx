import { AuthProvider } from "~/components/contexts/UserContext";
import Main from "~/components/root/Main";

export const App = () => {
	return (
		<AuthProvider>
			<Main />
		</AuthProvider>
	);
};
