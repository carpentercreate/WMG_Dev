import React from "react";
import ReactDOM from "react-dom";
import {FirebaseAppProvider} from "reactfire";
import {firebaseConfig} from "./config";
import * as serviceWorker from "./serviceWorker";
import "./styles.css";
import App from "./App";

const rootElement = document.getElementById("root");
ReactDOM.render(
	<React.StrictMode>
		<FirebaseAppProvider firebaseConfig={firebaseConfig}>
			<App />
		</FirebaseAppProvider>
	</React.StrictMode>,
	rootElement
);
serviceWorker.register();
