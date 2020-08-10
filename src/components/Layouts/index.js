import React from "react";
//import {useThemeUI} from "theme-ui";
import {MdDragHandle} from "react-icons/md";
import {Menu} from "../Menus";
import {Frame, Page} from "framer";
//import {motion} from "framer-motion";
import "./layouts.css";
export function HorizontalView({children, current, ...rest}) {
	return (
		<Page
			defaultEffect="pile"
			overflow="visible"
			currentPage={current}
			direction="horizontal"
			gap={0}
			{...rest}>
			{children}
		</Page>
	);
}
export function MainView({
	children,

	current,
	...rest
}) {
	return (
		<Page
			width="100vw"
			defaultEffect="pile"
			height="100vh"
			paddingBottom={100}
			currentPage={current}
			direction="vertical"
			gap={0}
			{...rest}>
			{children}
			<BottomView />
		</Page>
	);
}
function BottomView({children, size = "100%", ...rest}) {
	return (
		<Frame
			background="lightgray"
			style={{textAlign: "center"}}
			size={size}
			{...rest}>
			<div
				style={{padding: "12px", boxShadow: "0px 0px 3px 0px rgba(0,0,0,.3)"}}>
				<MdDragHandle size="39px" />
			</div>
			<Menu />
			<HorizontalView />
		</Frame>
	);
}
