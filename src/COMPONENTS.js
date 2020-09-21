/** @jsx jsx */
import * as React from "react";
import AddressInput from "./components/AddressInput";
import {ensuredForwardRef} from "react-use";

import {MdDragHandle} from "react-icons/md";
import * as I from "react-icons/fi";
import {motion, AnimatePresence, AnimateSharedLayout} from "framer-motion";
import {Page, Color, Stack, Frame, useSpring, useTransform} from "framer";
import {
	jsx,
	useThemeUI,
	Heading,
	Link,
	Flex,
	Text,
	Checkbox as ChckBx,
	Slider,
} from "theme-ui";
import {useToggle} from "react-use";

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

const {useState, useEffect} = React;
export {Loader} from "./components/Loader";
export function Button({name = "Do Something", children, data, cb}) {
	const ctx = useThemeUI();
	const {theme} = ctx;
	return (
		<motion.button
			layout
			style={{...theme.buttons.primary}}
			onTap={() => cb(data)}>
			<Text>{name}</Text>
		</motion.button>
	);
}
export const Input = ensuredForwardRef(({name, ...rest}, ref) => {
	const [selected, setSelected] = useState("");

	const getSelection = () =>
		ref.current.value.substring(
			ref.current.selectionStart,
			ref.current.selectionEnd
		);
	return (
		<div>
			{/*<button onClick={() => (ref)}>H</button>*/}
			<h6>{selected}</h6>
			<input
				ref={ref}
				onSelect={() => setSelected(getSelection())}
				className="Input"
				{...rest}
			/>
		</div>
	);
});
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
function onUpdate(latest) {
	console.log(latest.y);
}

export function Layout({
	children,
	bottomSheet,
	theme = {radii: {lg: "88px"}},
	...rest
}) {
	return (
		<Page
			gap={0}
			overflow="visible"
			top={0}
			bottom={0}
			left={0}
			right={0}
			onUpdate={onUpdate}
			contentHeight="auto"
			defaultEffect="pile"
			contentWidth="auto"
			direction="vertical"
			{...rest}>
			<Frame height="100vh" width="100vw" background="rgba(0,0,0,0)">
				{children}
			</Frame>
			<Frame
				height="100vh"
				radius="10% 10% 0px 0px"
				width="100vw"
				background="rgba(0,0,0,1)">
				{/* ICON BAR */}
				<Stack
					distribution="center"
					direction="horizontal"
					width="100%"
					height="48px"
					top={10}>
					<MdDragHandle color="rgba(255,255,255,.50" size={43} />
				</Stack>
				{bottomSheet}
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

export const Span = ({direction = "horizontal", children, ...rest}) => (
	<Flex
		sx={{
			flexDirection:
				direction === "horizontal" ? "row" : "vertical" ? "column" : "initial",
		}}
		{...rest}>
		{children}
	</Flex>
);
export const H1 = (props) => (
	<Heading variant="text.heading" {...props}>
		{props.children}
	</Heading>
);
export const H2 = (props) => (
	<Heading as="h2" layout {...props}>
		{props.children}
	</Heading>
);
export const H3 = (props) => (
	<Heading as="h3" {...props}>
		{props.children}
	</Heading>
);
export const H4 = (props) => (
	<Heading as="h4" layout {...props}>
		{props.children}
	</Heading>
);
export const H5 = (props) => (
	<Heading as="h5" layout {...props}>
		{props.children}
	</Heading>
);
export const H6 = (props) => (
	<Heading as="h6" layout {...props}>
		{props.children}
	</Heading>
);
export const P = (props) => (
	<Text layout {...props}>
		{props.children}
	</Text>
);
export const A = (props) => <Link {...props}>{props.children}</Link>;

export const Div = (props) => (
	<motion.div layout {...props}>
		{props.children}
	</motion.div>
);
export const Image = (props) => (
	<motion.img layout {...props}>
		{props.children}
	</motion.img>
);
export const Ul = (props) => (
	<motion.ul layout {...props}>
		{props.children}
	</motion.ul>
);
export const Li = (props) => (
	<motion.li layout {...props}>
		{props.children}
	</motion.li>
);
export const Form = (props) => (
	<motion.form layout {...props}>
		{props.children}
	</motion.form>
);
export const Label = (props) => <Label {...props}>{props.children}</Label>;
export const Select = (props) => <Select {...props}>{props.children}</Select>;
export const Range = (props) => <Slider {...props} />;
export const Radio = (props) => <Radio {...props}>{props.children}</Radio>;
export const CheckBox = (props) => <ChckBx {...props}>{props.children}</ChckBx>;

export {Page, AddressInput, Stack, AnimatePresence, Color, Frame, Icons};
