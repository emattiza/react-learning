import { Dialog } from "@headlessui/react";
import { lazy, Suspense, useState } from "react";
import {
	Outlet,
	RouteObject,
	useRoutes,
	BrowserRouter,
} from "react-router-dom";

const Loading = () => (
	<div className="hero min-h-screen">
		<div className="hero-content text-center">
			<p>Loading...</p>
		</div>
	</div>
);

const IndexScreen = lazy(() => import("~/components/screens/Index"));
const Page404Screen = lazy(() => import("~/components/screens/404"));

function Layout() {
	return (
		<div>
			<nav className="p-4 flex items-center justify-between"></nav>
			<Outlet />
		</div>
	);
}

export const Router = () => {
	return (
		<BrowserRouter>
			<InnerRouter />
		</BrowserRouter>
	);
};

const InnerRouter = () => {
	const routes: RouteObject[] = [
		{
			path: "/",
			element: <Layout />,
			children: [
				{
					index: true,
					element: <IndexScreen />,
				},
				{
					path: "*",
					element: <Page404Screen />,
				},
			],
		},
	];
	const element = useRoutes(routes);
	return (
		<div>
			<Suspense fallback={<Loading />}>{element}</Suspense>
		</div>
	);
};
