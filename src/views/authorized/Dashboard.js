import * as React from "react";
import {useUser} from "reactfire";
export default (props) => {
	const user = useUser();

	return <div>{props.children}</div>;
};
