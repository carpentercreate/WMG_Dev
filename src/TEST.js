//import * as React from "react";
//import * as C from "./COMPONENTS";
//import * as F from "./FIREBASE";
//import * as S from "./STATE";
//import * as Config from './CONFIG;

//import _ from "lodash";

////function Item({name, photoURL, description, links, ...rest})

////return({

////	name,

////	render:(viewState)=>{
////		if(viewState === 'icon'){
////			return(
////				<div>
////				<h2>{this.name}</h2>
////				<h6>{writers.length >= 1 ? writers.map(v=>v.name) : ''}</h6>
////				</div>
////			)
////		}
////	},
////	...rest
////})
////}
//function Layout({}){
//	return(
//		<div>
//			<LayoutSection name='top'>
//				<LayoutItem>

//				</LayoutItem>
//			</LayoutSection>
//		</div>
//	)
//}
//function LayoutSection({name, children, ...rest}) {
//	return (
//		<Frame {...rest}>
//			<AnimateSharedLayout>
//				<motion.div layout>
//					<LayoutItem layoutID={name}>{children}</LayoutItem>
//				</motion.div>
//			</AnimateSharedLayout>
//		</Frame>
//	);
//}
//function LayoutItem({
//	layoutID,
//	condition,
//	variants = {
//		open: {opacity: 1},
//		closed: {opacity: 0},
//	},
//	children,
//	...rest
//}) {
//	return (
//		<>
//			<AnimatePresence>
//				{condition && (
//					<motion.div
//						layoutID={layoutID}
//						variants={variants}
//						initial="closed"
//						animate="open"
//						exit="closed"
//						{...rest}>
//						{children}
//					</motion.div>
//				)}
//			</AnimatePresence>
//		</>
//	);
//}
//<C.Details>{layoutID === "details" && thing.value}</C.Details>;
