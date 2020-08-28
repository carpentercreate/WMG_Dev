import * as React from "react";

const useExample = (initial) => {
	const [state, setState] = React.useState();

	const methods = {
		setExample: setState,
		resetExample: () => setState(initial),
	};
	return [state, methods];
};
export function ExampleProvider({children}) {
	const [exampleData] = useExample();
	return (
		<ExampleContext.Provider value={exampleData}>
			{children}
		</ExampleContext.Provider>
	);
}
export const ExampleComponents = {
	Card: (props) => (
		<div>
			<img src="#" />
			<h2>{props.name}</h2>
			<h6>{props.description}</h6>
			<p>{props.content}</p>
			{props.actions.map((fn) => (
				<button onClick={() => action.method()}>action.name</button>
			))}
		</div>
	),
};
