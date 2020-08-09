import React from "react";
//import {useState} from "react";
import {motion, AnimateSharedLayout} from "framer-motion";
import * as I from "react-icons/fi";
import "./menu.css";

export default function Menu({selected = iconNames[0], isOpen, cb}) {
	return (
		<>
			<MenuContainer isOpen={isOpen}>
				<AnimateSharedLayout>
					<motion.ul layout>
						{iconNames.map((iconName) => (
							<IconButton
								key={iconName}
								iconName={iconName}
								isSelected={selected === iconName}
								onClick={() => cb(iconName)}
							/>
						))}
					</motion.ul>
				</AnimateSharedLayout>
			</MenuContainer>
		</>
	);
}
function MenuContainer({children, isOpen}) {
	return (
		<motion.div
			layout
			style={{
				position: "absolute",
				background: "#fff",
				overflow: "hidden",
				borderRadius: "24px 24px 0px 0px",
				zIndex: "99999",
				height: "85vh",
				top: isOpen ? "90vh" : "10vh",
			}}>
			{children}
		</motion.div>
	);
}
//function MenuIcon({isOpen, cb}) {
//	return (
//		<motion.div
//			layout
//			style={{textAlign: "center", padding: 12, fontSize: "28px"}}>
//			{isOpen ? <I.FiChevronsUp /> : <I.FiChevronsDown />}
//		</motion.div>
//	);
//}
function IconButton({iconName, isSelected, onClick}) {
	return (
		<motion.li
			layout
			className="icon-button"
			onClick={onClick}
			style={{color: "black"}}>
			{isSelected && (
				<motion.div
					layoutId="icon-button-selected"
					className="icon-button-selected"
					initial={false}
					transition={spring}
				/>
			)}
			<Icon
				style={{
					textAlign: "center",
					background: "rgba(0,0,0,0)",
					zIndex: "99",
				}}
				name={iconName}
				size="24px"
			/>
			{iconName}
		</motion.li>
	);
}

function Icon({name, ...rest}) {
	const Comp = Icons[name];
	return <Comp {...rest} />;
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

const spring = {
	type: "spring",
	stiffness: 500,
	damping: 30,
};
