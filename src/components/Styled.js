import * as React from "./node_modules/react";
import {
	motion,
	AnimatePresence,
	AnimateSharedLayout,
} from "./node_modules/framer-motion";
import "../styles.css";
import ReactJson from "./node_modules/react-json-view";
import * as I from "./node_modules/react-icons/fi";
import {ChromePicker} from "./node_modules/react-color";
import {MdDragHandle, MdQuestionAnswer} from "./node_modules/react-icons/md";
import {
	Frame as F,
	Stack as S,
	Page as P,
	Scroll as Sc,
} from "./node_modules/framer";
import {
	useForm,
	useFieldArray,
	Controller,
} from "./node_modules/react-hook-form";
import {Label, Input} from "./node_modules/@rebass/forms";
const variants = {
	enter: {
		opacity: 1,
	},
	exit: {
		opacity: 0,
	},
	initial: {
		opacity: 0,
	},
};
export const Field = (props) => {
	return <Input as={motion.input} layout {...props} />;
};
export function ArrayField() {
	const {register, control, handleSubmit, reset, trigger, setError} = useForm({
		// defaultValues: {}; you can populate the fields by this attribute
	});
	const {fields, append, prepend, remove, swap, move, insert} = useFieldArray({
		control,
		name: "test",
	});
	return (
		<form onSubmit={handleSubmit((data) => console.log(data))}>
			{fields.map((item, index) => (
				<div
					variants={variants}
					initial="initial"
					animate="enter"
					exit="exit"
					key={item.id}>
					<input
						name={`test[${index}].firstName`}
						ref={register()}
						defaultValue={item.firstName} // make sure to set up defaultValue
					/>

					<Controller
						as={Input}
						width={[1 / 2, 1 / 3, 1 / 4, 1]}
						name={`test[${index}].lastName`}
						control={control}
						defaultValue={item.lastName} // make sure to set up defaultValue
					/>

					<button type="button" onClick={() => remove(index)}>
						Delete
					</button>
				</div>
			))}
			<button
				type="button"
				onClick={() =>
					append({firstName: "appendBill", lastName: "appendLuo"})
				}>
				append
			</button>
			<button
				type="button"
				onClick={() =>
					prepend({
						firstName: "prependFirstName",
						lastName: "prependLastName",
					})
				}>
				prepend
			</button>
			<input type="submit" />
		</form>
	);
}

export function Scroll({children, ...rest}) {
	return (
		<Sc {...rest} wheelEnabled={true}>
			{children}
		</Sc>
	);
}
Scroll.defaultProps = {
	background: "rgba(0,0,0,0)",
};
function BottomSheet({children, size = "100%", ...rest}) {
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
			<Page direction="horizontal" />
		</Frame>
	);
}
export function AppContainer({children, ...rest}) {
	return (
		<Scroll
			overflow="hidden"
			center
			background="red"
			className="AppContainer"
			{...rest}>
			{children}
		</Scroll>
	);
}
AppContainer.defaultProps = {
	size: "300px",
};
export function Frame({children, ...rest}) {
	return <F {...rest}>{children}</F>;
}
F.defaultProps = {
	background: "rgba(0,0,0,0)",
};
export function Page({children, currentPage, ...rest}) {
	return (
		<P currentPage={currentPage} {...rest}>
			{children}
		</P>
	);
	P.defaultProps = {
		backgroundColor: "rgba(0,0,0,.2)",
		direction: "horizontal",
		defaultEffect: "pile",
	};
}
export function Stack({children, ...rest}) {
	return <S {...rest}>{children}</S>;
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

const defaultFont =
	'system-ui, -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Ubuntu, "Helvetica Neue", Oxygen, Cantarell, sans-serif';

export function ColorPicker({showColor = true}) {
	const [color, setColor] = React.useState({
		hsl: {h: 200, s: 0.6, l: 0.5, a: 1},
	});
	return (
		<>
			<motion.div animate style={{width: "50vw"}}>
				{showColor && (
					<ChromePicker
						color={color.hsl}
						onChange={(color) => {
							setColor(color);
						}}
					/>
				)}
			</motion.div>
		</>
	);
}

export function J({
	data,
	onEdit,
	collapsed = 2,
	onAdd,
	onDelete,
	style,
	...rest
}) {
	return (
		<ReactJson
			style={{
				padding: "20px",
				fontSize: ".8em",
				textAlign: "left",
				width: "100%",
				...style,
			}}
			onAdd={(v) => onAdd(v.updated_src)}
			onEdit={(v) => console.log(v.updated_src)}
			src={data}
			theme="eighties"
			sortKeys={true}
			onDelete={(v) => onDelete(v.updated_src)}
			defaultValue=""
			// onSelect={v => console.log({ [v.name]: v.new_value })}
			collapsed={collapsed}
			displayDataTypes={true}
			iconStyle="circle"
			displayObjectSize={false}
			enableClipboard={true}
			groupArraysAfterLength={5}
			{...rest}
		/>
	);
}
export function Icon({name, ...rest}) {
	const Comp = Icons[name];
	return <Comp children={name} {...rest} />;
}
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
