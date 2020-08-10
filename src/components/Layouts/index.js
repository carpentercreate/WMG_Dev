import React from "react";

import {MdDragHandle} from "react-icons/md";

import {Frame, Page} from "framer";
import {motion} from "framer-motion";
import "./layouts.css";
export function HorizontalViews({children, ...rest}) {
	return (
		<motion.div layout className="HorizontalViews" {...rest}>
			hi
		</motion.div>
	);
}
export function MainViews({
	children,
	selected,
	cb,
	isOpen,
	current,
	toggle,
	...rest
}) {
	return (
		<Frame height="100vh" width="100vw" top={0} {...rest}>
			<Page
				defaultEffect="pile"
				size="100%"
				top={0}
				overflow="visible"
				wheelEnabled="true"
				paddingTop={150}
				currentPage={current}
				direction="vertical"
				gap={0}
				background="rgba(0,0,0,1)">
				<BottomView />
				<MainView>hi</MainView>
			</Page>
		</Frame>
	);
}
function BottomView() {
	return <MdDragHandle />;
}
function MainView({
	children,
	colors = {bg: "black", text: "white", primary: "red"},
	style,
	isMain,
	...rest
}) {
	return (
		<Frame
			style={{color: colors.text, textAlign: "center", ...style}}
			size="100%"
			//height={isMain ? "100%" : "88%"}
			background={isMain ? colors.bg : "#222"}
			{...rest}>
			{children}
		</Frame>
	);
}
