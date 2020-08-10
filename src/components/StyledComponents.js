import * as React from "react";
import {motion, AnimatePresence} from "framer-motion";
import "../styles.css";
import ReactJson from "react-json-view";
import {ChromePicker} from "react-color";
//import _ from "lodash";

export function ColorPicker({showColor = true}) {
	const [color, setColor] = React.useState({
		hsl: {h: 200, s: 0.6, l: 0.5, a: 1},
	});
	return (
		<>
			<motion.div animate style={{width: "50vw"}}>
				{showColor && (
					<ChromePicker
						color={color.hsl}
						onChange={(color) => {
							setColor(color);
						}}
					/>
				)}
			</motion.div>
		</>
	);
}

export const FadeInOut = ({isVisible, children}) => (
	<AnimatePresence>
		{isVisible && (
			<motion.div
				key="modal"
				initial={{opacity: 0}}
				animate={{opacity: 1}}
				exit={{opacity: 0}}>
				{children}
			</motion.div>
		)}
	</AnimatePresence>
);
export function J({
	data,
	onEdit,
	collapsed = 2,
	onAdd,
	onDelete,
	style,
	...rest
}) {
	return (
		<ReactJson
			style={{
				padding: "20px",
				fontSize: ".8em",
				textAlign: "left",
				width: "100%",
				...style,
			}}
			onAdd={(v) => onAdd(v.updated_src)}
			onEdit={(v) => console.log(v.updated_src)}
			src={data}
			theme="eighties"
			sortKeys={true}
			onDelete={(v) => onDelete(v.updated_src)}
			defaultValue=""
			// onSelect={v => console.log({ [v.name]: v.new_value })}
			collapsed={collapsed}
			displayDataTypes={true}
			iconStyle="circle"
			displayObjectSize={false}
			enableClipboard={true}
			groupArraysAfterLength={5}
			{...rest}
		/>
	);
}
