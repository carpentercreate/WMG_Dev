import React from "react";
import {useThemeUI} from "theme-ui";
import {MdDragHandle} from "react-icons/md";
import {Menu} from "../Menus";
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
	const ctx = useThemeUI();
	const {theme} = ctx;
	return (
		<Page
			background={theme.colors.background}
			defaultEffect="pile"
			width="100vw"
			height="100vh"
			top={0}
			overflow="visible"
			currentPage={current}
			direction="vertical"
			gap={0}>
			<MainPage colors={theme.colors}>{children}</MainPage>
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
function MainPage({children, colors, style, isMain, ...rest}) {
	return (
		<Frame
			background={colors.background}
			size="100%"
			//height={isMain ? "100%" : "88%"}
			{...rest}>
			{children}
		</Frame>
	);
}
