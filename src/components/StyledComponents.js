import * as React from "react";
import {motion, AnimatePresence} from "framer-motion";
import "../styles.css";
import ReactJson from "react-json-view";
import {ChromePicker} from "react-color";
//import _ from "lodash";
//const percentages = [0, 10, 25, 33, 40, 50, 60, 66, 75, 85, 90, 100];
const space = [0, 4, 8, 12, 16, 24, 48, 72, 80, 88, 96, 100];
const radii = [2, 4, 12, 16, 24, 36, 54, 72, 96, 100];
//const toPx = (v) => `${v}px`;
//const toVw = (v) => `${v}vw`;
//const toVh = (v) => `${v}vh`;
//const toPerc = (v) => `${v}%`;
//const toScale = (v) => v * 0.01;
const defaultFont =
	'system-ui, -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Ubuntu, "Helvetica Neue", Oxygen, Cantarell, sans-serif';

export function Box({
	direction = "y",
	align = "evenly",
	justify = "center",
	radius,
	bg,
	color,
	py,
	px,
	p,
	m,
	my,
	overflow = "hidden",
	mx,
	w,
	width,
	height,
	h,
	size,
	lineHeight,
	cursor = "initial",
	margin,
	shadow,
	border,
	font,
	display = "block",
	fontSize = "1em",
	children,
	flex = 1,
	background,
	alignSelf,
	justifySelf,
	style,
	...rest
}) {
	const a = {
		start: "flex-start",
		end: "flex-end",
		evenly: "space-evenly",
		around: "space-around",
		between: "space-between",
		center: "center",
	};
	const d = {
		y: "column",
		x: "row",
	};
	return (
		<motion.div
			layout
			style={{
				cursor: cursor,
				objectFit: "cover",
				objectPosition: "center",
				display: "flex",
				flexDirection: d[direction],
				justifyContent: a[justify],
				alignItems: a[align],
				background: bg || background,
				textAlign: "center",
				boxSizing: "border-box",
				lineHeight: lineHeight || "initial",
				margin: m || `${my}px ${mx}px` || margin,
				padding: space[p] || `${py}px ${px}px`,
				overflow: overflow,
				alignSelf: alignSelf,
				justifySelf: justifySelf,
				flex: flex,
				borderRadius:
					typeof radius === "number" && radius <= 10 ? radii[radius] : radius,
				width: w || width,
				height: h || height,
				border: border,
				boxShadow: shadow,
				fontFamily: font || defaultFont,
				fontSize: fontSize,
				...style,
			}}
			{...rest}>
			{children}
		</motion.div>
	);
}
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
