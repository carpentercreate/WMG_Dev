import * as React from "react";
import {motion, AnimatePresence} from "framer-motion";
import "../styles.css";
import ReactJson from "react-json-view";
import {ChromePicker} from "react-color";
const defaultFont =
	'system-ui, -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Ubuntu, "Helvetica Neue", Oxygen, Cantarell, sans-serif';

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
//function Icon({name, ...rest}) {
//	const Comp = Icons[name];
//	return <Comp children={name} {...rest} />;
//}
//const Icons = {
//	Add: I.FiPlus,
//	Edit: I.FiEdit,
//	Delete: I.FiX,
//	Mic: I.FiMic,
//	View: I.FiEye,
//	Hide: I.FiEyeOff,
//	Left: I.FiChevronLeft,
//	Right: I.FiChevronRight,
//	Down: I.FiChevronDown,
//	Up: I.FiChevronUp,
//	Songs: I.FiMusic,
//	Reports: I.FiBarChart,
//	Products: I.FiDisc,
//	Profile: I.FiUser,
//};
