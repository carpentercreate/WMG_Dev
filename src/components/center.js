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
