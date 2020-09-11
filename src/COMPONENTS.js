/** @jsx jsx */
//import * as React from "react";
import AddressInput from "./components/AddressInput";
import {motion, AnimatePresence, AnimateSharedLayout} from "framer-motion";
import {Page, Color, Stack, Frame} from "framer";
import {jsx, useThemeUI} from "theme-ui";
import {useToggle} from "react-use";
export {Loader} from "./components/Loader";
export function Button({name = "Do Something", children, data, cb}) {
	const ctx = useThemeUI();
	const {theme} = ctx;
	return (
		<Stack>
			<Frame style={{...theme.buttons.primary}} onTap={() => cb(data)}>
				<h4>{name}</h4> {children}
			</Frame>{" "}
		</Stack>
	);
}
export function Avatar({children}) {
	return (
		<Frame width="48px" height="48px" radius="100%">
			{children}
		</Frame>
	);
}

export function Item({title, content}) {
	const [isOpen, toggle] = useToggle(false);

	return (
		<motion.div layout onTap={() => toggle()}>
			<motion.h4 layout>{title}</motion.h4>
			<motion.p layout>{isOpen && content}</motion.p>
		</motion.div>
	);
}

export function List({
	items = [
		{name: "one", content: "jkx djklld jkld "},
		{name: "two", content: "jkdo djiod jod jod"},
	],
	selectedId,
	...rest
}) {
	return (
		<AnimateSharedLayout>
			<motion.ul layout>
				{items.map((item) => (
					<Item title={item.name} content={item.content} />
				))}
			</motion.ul>
		</AnimateSharedLayout>
	);
}

export function Layout({children, theme, ...rest}) {
	return (
		<Page
			gap={0}
			overflow="visible"
			top={0}
			bottom={0}
			left={0}
			right={0}
			contentHeight="auto"
			defaultEffect="pile"
			contentWidth="auto"
			direction="vertical">
			<Frame height="100vh" width="100vw" background="rgba(0,0,0,0)">
				{children}
			</Frame>
			<Frame height="90vh" width="100vw" background="rgba(0,0,0,1)">
				bottom
			</Frame>
		</Page>
	);
}

export function Center(props) {
	return (
		<div
			style={{
				width: "100%",
				height: "100%",
				display: "flex",
				placeItems: "center",
				placeContent: "center",
			}}>
			{props.children}
		</div>
	);
}
export {Page, AddressInput, Stack, AnimatePresence, Color, Frame};
