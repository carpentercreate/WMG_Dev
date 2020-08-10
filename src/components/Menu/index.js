import React from "react";
import {motion, AnimateSharedLayout} from "framer-motion";
import * as I from "react-icons/fi";
import "./menu.css";

export function Menu({
	cb,
	selected,
	height = "60px",
	theme = {
		colors: {text: "#f00", opaque: "rgba(255,255,255,.3)"},
		space: ["4px", "8px", "12px", "16px"],
	},

	...rest
}) {
	const {colors} = theme;

	return (
		<motion.div layout {...rest}>
			<AnimateSharedLayout>
				<motion.ul
					layout
					className="ul"
					style={{height: height, width: "100vw"}}>
					{iconNames.map((iconName) => (
						<MenuItem
							colors={colors}
							key={iconName}
							iconName={iconName}
							isSelected={selected === iconName}
							onClick={() => cb(iconName)}
						/>
					))}
				</motion.ul>
			</AnimateSharedLayout>
		</motion.div>
	);
}

function MenuItem({iconName, isSelected, colors, onClick}) {
	return (
		<motion.li
			transition={spring}
			style={{color: colors.text, height: "auto", padding: 12}}
			className="icon-button"
			onClick={onClick}>
			{isSelected && (
				<motion.div
					key="boo"
					transition={spring}
					style={{
						borderColor: colors.text,
						background: colors.opaque,
					}}
					layoutId="icon-button-selected"
					className="icon-button-selected"
					initial={false}
				/>
			)}
			<>
				<Icon
					colors={colors}
					className="icon"
					style={{
						textAlign: "center",
						background: "rgba(0,0,0,0)",
						zIndex: "99",
					}}
					name={iconName}
				/>
				<p style={{color: colors.text}}>{iconName}</p>
			</>
		</motion.li>
	);
}

function Icon({name, colors, ...rest}) {
	const Comp = Icons[name];
	return <Comp children={name} color={colors.text} {...rest} />;
}
const iconNames = ["Songs", "Products", "Reports", "Profile"];
const Icons = {
	Add: I.FiPlus,
	Edit: I.FiEdit,
	Delete: I.FiX,
	Mic: I.FiMic,
	View: I.FiEye,
	Hide: I.FiEyeOff,
	Left: I.FiChevronLeft,
	Right: I.FiChevronRight,
	Down: I.FiChevronDown,
	Up: I.FiChevronUp,
	Songs: I.FiMusic,
	Reports: I.FiBarChart,
	Products: I.FiDisc,
	Profile: I.FiUser,
};
const spring = {type: "spring", mass: 4, stiffness: 600, damping: 66};
