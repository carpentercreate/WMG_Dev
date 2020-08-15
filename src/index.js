import React from "react";
import ReactDOM from "react-dom";
import {FirebaseAppProvider} from "reactfire";
import {firebaseConfig} from "./config";
import * as serviceWorker from "./serviceWorker";
import GoogleFontLoader from "react-google-font-loader";

import "./styles.css";
import App from "./App";

const rootElement = document.getElementById("root");
ReactDOM.render(
	<React.StrictMode>
		<FirebaseAppProvider firebaseConfig={firebaseConfig}>
			<GoogleFontLoader
				fonts={[
					{
						font: "Roboto",
						weights: [400, "400i"],
					},
					{
						font: "Roboto Mono",
						weights: [400, 700],
					},
				]}
				subsets={["cyrillic-ext", "greek"]}
			/>
			<App />
		</FirebaseAppProvider>
	</React.StrictMode>,
	rootElement
);
serviceWorker.register();
