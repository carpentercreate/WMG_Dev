import * as React from "react";
import {Frame, Stack} from "framer";
export function Loader({
	name,
	bars = [30, 50, 80, 40, 70, 100, 80, 50, 10],
	...rest
}) {
	const variants = {
		on: (custom) => ({
			scaleY: [0, -custom[0]],
			transition: {yoyo: Infinity, duration: 0.3, delay: custom[1] * 0.04},
		}),
		initial: {scaleY: 0},
	};
	const styles = {
		background: "red",
		width: 20,
		height: "1px",
	};
	return (
		<Frame center background="rgba(0,0,0,0)" width={200} height={100} {...rest}>
			<Stack alignment="end" direction="horizontal" size="40vw">
				{bars.map((v, i) => (
					<Frame
						originY={0}
						style={{...styles}}
						custom={[v, i]}
						variants={variants}
						animate={"on"}
					/>
				))}
			</Stack>
		</Frame>
	);
}
