import React from "react";
import {motion, AnimateSharedLayout} from "framer-motion";
//import * as I from "react-icons/fi";
import "./menus.css";

export function Menu({items = iconNames, style, ...rest}) {
	const [selected, setSelected] = React.useState();
	return (
		<>
			<p>SelectedItem: {selected}</p>
			<AnimateSharedLayout>
				{items.map((itemName) => (
					<motion.div
						key={itemName}
						style={style}
						isSelected={selected === itemName}
						onTap={() => setSelected(itemName)}>
						{itemName}
					</motion.div>
				))}
			</AnimateSharedLayout>
		</>
	);
}

//function SelectedContainer({
//	children,
//	isSelected,
//	style = {
//		background: "blue",
//		height: "100%",
//		width: "100%",
//		position: "absolute",
//	},
//	...rest
//}) {
//	return (
//		<>
//			{isSelected && (
//				<motion.div
//					style={style}
//					layoutId="icon-button-selected"
//					className="icon-button-selected"
//					initial={false}
//					{...rest}
//				/>
//			)}
//			<Menu />
//		</>
//	);
//}

//function Icon({name, ...rest}) {
//	const Comp = Icons[name];
//	return <Comp children={name} {...rest} />;
//}
const iconNames = ["Songs", "Products", "Reports", "Profile"];
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
//const spring = {type: "spring", mass: 4, stiffness: 600, damping: 66};
