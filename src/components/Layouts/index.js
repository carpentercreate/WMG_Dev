import React from "react";
//import {useThemeUI} from "theme-ui";
import {MdDragHandle} from "react-icons/md";
import {motion} from "framer-motion";
import {Frame as F, Stack as S, Page as P} from "framer"; //import {motion} from "framer-motion";
import "./layouts.css";
export function HorizontalView({children, current, ...rest}) {
	return (
		<P
			defaultEffect="pile"
			overflow="visible"
			currentPage={current}
			direction="horizontal"
			gap={0}
			{...rest}>
			{children}
		</P>
	);
}
export function MainView({
	children,

	current,
	...rest
}) {
	return (
		<P
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
		</P>
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
			<HorizontalView />
		</Frame>
	);
}
export function AppContainer({children, ...rest}) {
	return (
		<div {...rest} className="AppContainer">
			{children}
		</div>
	);
}
export function Row({children, ...rest}) {
	return (
		<div {...rest} className="Row">
			{children}
		</div>
	);
}
export function Col({children, ...rest}) {
	return (
		<div {...rest} className="Box">
			{children}
		</div>
	);
}
export function StackX({children, ...rest}) {
	return (
		<S
			backgroundColor="rgba(0,0,0,0)"
			direction="horizontal"
			{...rest}
			className="Stack">
			{children}
		</S>
	);
}
export function StackY({children, ...rest}) {
	return (
		<S backgroundColor="rgba(0,0,0,0)" {...rest}>
			{children}
		</S>
	);
}
export function Frame({children, ...rest}) {
	return <F {...rest}>{children}</F>;
}
F.defaultProps = {
	background: "rgba(0,0,0,0)",
};
export function SwipeX({children, ...rest}) {
	return (
		<P
			backgroundColor="rgba(0,0,0,.2)"
			direction="horizontal"
			defaultEffect="pile"
			{...rest}>
			{children}
		</P>
	);
}
export function SwipeY({children, ...rest}) {
	return (
		<P backgroundColor="rgba(0,0,0,0)" defaultEffect="pile">
			{children}
		</P>
	);
}
export function Title({children, ...rest}) {
	return <h1>{children}</h1>;
}
export function SubTitle({children, ...rest}) {
	return <h2>{children}</h2>;
}
export function Heading({children, ...rest}) {
	return <h3>{children}</h3>;
}
export function SubHeading({children, ...rest}) {
	return <h4>{children}</h4>;
}
export function Text({children, ...rest}) {
	return <p>{children}</p>;
}
export function BigValue({children, ...rest}) {
	return <div style={{fontSize: "8em"}}>{children}</div>;
}
export function HelpText({children, ...rest}) {
	return <h5>{children}</h5>;
}
export function ActionText({children, ...rest}) {
	return <h6>{children}</h6>;
}
export function Progress({value = 0, goal = 4000}) {
	return (
		<>
			<motion.div layout style={{width: "100%"}}>
				<Frame p={1} direction="x" justify="between">
					<p style={{color: "red"}}>
						Current: <br />${value}
					</p>
					<p style={{color: "red"}}>
						Goal: <br />${goal}
					</p>
				</Frame>
				<motion.div
					layout
					initial={false}
					animate={{
						background: "red",
						height: "70px",
						width: `${(100 / goal) * value}vw`,
					}}
				/>
			</motion.div>
		</>
	);
}
