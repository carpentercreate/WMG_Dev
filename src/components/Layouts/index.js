import React from "react";

import {MdDragHandle} from "react-icons/md";
import {Menu} from "../Menu";
import {Frame, Page} from "framer";
import {motion} from "framer-motion";
import "./layouts.css";
export function HorizontalView({children, current, ...rest}) {
	return (
		<Page
			defaultEffect="pile"
			size="100%"
			top={0}
			overflow="visible"
			wheelEnabled="true"
			paddingTop={150}
			currentPage={current}
			direction="horizontal"
			gap={0}>
			hi
		</Page>
	);
}
export function MainView({
	children,

	current,
}) {
	return (
		<Page
			defaultEffect="pile"
			width="100vw"
			height="100vh"
			top={0}
			overflow="visible"
			currentPage={current}
			direction="vertical"
			gap={0}>
			<MainPage>{children}</MainPage>
			<BottomView />
		</Page>
	);
}
function BottomView({isMain, colors = {bg: "gray"}, ...rest}) {
	return (
		<Frame
			size="100%"
			background="black"
			//height={isMain ? "100%" : "88%"}
			{...rest}>
			<Menu />
			<HorizontalView />
		</Frame>
	);
}
function MainPage({
	children,
	colors = {bg: "red", text: "white", primary: "red"},
	style,
	isMain,
	...rest
}) {
	return (
		<Frame
			size="100%"
			//height={isMain ? "100%" : "88%"}
			{...rest}>
			{children}
		</Frame>
	);
}
