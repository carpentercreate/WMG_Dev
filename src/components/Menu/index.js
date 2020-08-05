import React, {useState} from "react";
import {motion, AnimatePresence} from "framer-motion";
import {Frame, Page, Stack} from "framer";

export default ({isOpen, cb, ...rest}) => {
	const [state, setState] = useState(0);
	return (
		<>
			<AnimatePresence>
				{isOpen && (
					<>
						<motion.div
							onClick={() => cb()}
							style={{
								position: "absolute",
								cursor: "pointer",
								top: 0,
								background: "rgba(0,0,0,.5)",
								zIndex: "9",
								height: "100vh",
								color: "white",
								display: "flex",
								alignItems: "center",
								justifyContent: "center",
								textAlign: "center",
								width: "100vw",
							}}
							key="modal"
							initial={{opacity: 0, scale: 0}}
							animate={{opacity: 1, scale: 1}}
							exit={{opacity: 0, scale: 0}}
						/>
						<motion.div
							key="inside-modal"
							initial={{opacity: 0, scale: 0}}
							animate={{opacity: 1, scale: 1}}
							exit={{opacity: 0, scale: 0}}
							style={{
								position: "absolute",
								top: "10vh",
								left: "10vw",
								color: "white",
								zIndex: "99",
								background: "black",
								height: "80vh",
								width: "80vw",
								display: "flex",
							}}>
							<Page currentPage={state} bottom={0} width="80vw" height="70vh">
								<Frame>Menu</Frame>
								<Frame>Menu2</Frame>
							</Page>
						</motion.div>
					</>
				)}
			</AnimatePresence>
		</>
	);
};
