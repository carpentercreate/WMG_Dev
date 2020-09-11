import React from "react";
import ReactDOM from "react-dom";
import {FirebaseApp} from "./FIREBASE";
import * as serviceWorker from "./serviceWorker";
import "./styles.css";
import App from "./App";
import {Loader} from "./components/Loader";
const rootElement = document.getElementById("root");
ReactDOM.render(
	<React.StrictMode>
		<FirebaseApp fallback={<Loader />}>
			<App />
		</FirebaseApp>
	</React.StrictMode>,
	rootElement
);
serviceWorker.register();
