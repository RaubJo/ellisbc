import { Router } from "@solidjs/router";
import { FileRoutes } from "@solidjs/start/router";
import { Suspense } from "solid-js";
import { MetaProvider, Title, Link } from "@solidjs/meta";
import "./app.css";

export default function App() {
	return (
		<MetaProvider>
			<Title>Ellis Baptist Church</Title>

			<Link rel="preconnect" href="https://fonts.googleapis.com" />
			<Link rel="preconnect" href="https://fonts.gstatic.com" crossorigin />
			<Link
				rel="stylesheet"
				href="https://fonts.googleapis.com/css2?family=Poppins&family=Nunito+Sans&display=swap"
			/>

			<Router
				root={props => (
					<Suspense>
						{props.children}
					</Suspense>
				)}
			>
				<FileRoutes />
			</Router>
		</MetaProvider>
	);
}
