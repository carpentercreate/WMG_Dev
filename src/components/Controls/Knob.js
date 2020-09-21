import * as React from "react";
import {useState} from "react";
import {motion} from "framer";
import {Center} from "../center";

export function E04UsingCurrentState2FM() {
	const [degrees, setDegrees] = useState(0);

	return (
		<Center>
			<motion.div
				style={{
					width: 150,
					height: 150,
					borderRadius: 30,
					backgroundColor: "#fff",
					color: "#999",
					fontSize: "40px",
					display: "flex",
					placeItems: "center",
					placeContent: "center",
					cursor: "ew-resize",
				}}
				animate={{rotate: degrees}}
				onPan={(event, info) => setDegrees(degrees + info.delta.x)}>
				{Math.round(degrees)}
			</motion.div>
		</Center>
	);
}
