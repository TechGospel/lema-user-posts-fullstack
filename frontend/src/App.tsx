import React from "react";
import "./App.css";
import { Route, Routes } from "react-router-dom";
import { QueryClient, QueryClientProvider } from "react-query";
import Users from "./components/users";
import { Posts } from "./components/posts";
import { Toaster } from "sonner";

const queryClient = new QueryClient({
	defaultOptions: {
		queries: {
			retry: 3,
			staleTime: 5 * 60 * 1000,
			cacheTime: 10 * 60 * 1000,
			refetchOnWindowFocus: false,
		},
	},
});

function App() {
	return (
		<QueryClientProvider client={queryClient}>
			<Toaster
				position="top-right"
				duration={3000}
				richColors
				closeButton
			/>
			<Routes>
				<Route path="/" element={<Users />} />
				<Route path="/posts/:userId" element={<Posts />} />
			</Routes>
		</QueryClientProvider>
	);
}

export default App;
