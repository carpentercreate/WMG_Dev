/** @jsx jsx */
import {jsx, ThemeProvider as TP, merge, useThemeUi} from "theme-ui";
import {Color} from "framer";
import {
	SuspenseWithPerf,
	useFirestoreDocDataOnce,
	useFirestore,
} from "reactfire";
import {flow} from "lodash";
const GLOBALS = {
	red: Color("#DC3F32"),
};
export function ThemeProvider({children}) {
	const [theme, setTheme] = useTheme();

	return <TP theme={theme}>{children}</TP>;
}

function ThemeProviderWrap({children}) {
	return <div className="ThemeProvider">{children}</div>;
}

//default comp
//<Suspense fallback='loading styles'>
////<ThemeProvider theme={theme}>
//////{children}
