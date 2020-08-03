import React, { useState } from "react";
import {
  useFirestore,
  SuspenseWithPerf,
  useUser,
  useFirestoreDocData,
  useFirestoreCollectionData
} from "reactfire";
import * as I from "react-icons/fi";
import * as C from "./StyledComponents";
import { Page } from "framer";
import { Frame } from "framer";
import { useCollection, l } from "./Utilities";
import LoginBtn from "./Auth";
import {
  motion,
  useSpring,
  AnimateSharedLayout,
  AnimatePresence
} from "framer-motion";
const { FiPlusCircle: Plus } = I;
const { Flex, Box, J } = C;
const { stringify: st } = JSON;
const Json = ({ name, data, ...rest }) => {
  return (
    <>
      <h2>{name}</h2>
      <J src={data} {...rest} />
    </>
  );
};
//User
const User = ({ id }) => {
  const db = useFirestore();
  const { FieldValue } = useFirestore;
  const userref = db.collection("users").doc(id);
  const profile = useFirestoreDocData(userref);
  const update = v => userref.set(v, { merge: true });
  const remove = v => userref.set(v);

  return (
    <Json
      name="User"
      data={profile}
      onAdd={update}
      onDelete={remove}
      onEdit={update}
    />
  );
};
//Accounts
const Accounts = () => {
  const db = useFirestore();
  const user = useUser();
  const query = db
    .collection("accounts")
    .where("admins", "array-contains", user.uid);
  const accounts = useFirestoreCollectionData(query, { idField: "id" });
  return <Json name="Accounts" data={accounts} />;
};

///Songs
const Songs = ({ accountId = "1" }) => {
  const db = useFirestore();
  const query = db
    .collection("songs")
    .where("interestedParties", "array-contains", accountId);
  const songs = useFirestoreCollectionData(query);
  return <Json name="Songs" data={songs} />;
};

///Journals
const Journals = ({ songId = "1" }) => {
  const db = useFirestore();
  const query = db
    .collection("songs")
    .doc(songId)
    .collection("journals");
  const journals = useFirestoreCollectionData(query);
  return <Json name="Journals for Song #1" data={journals} />;
};

///
function Layout() {
  const user = useUser();
  return (
    <Flex direction="column" style={{ minHeight: "100vh" }}>
      <Box fr={0} min="80px">
        <Box style={{ margin: "24px" }} justify="flex-start">
          <motion.h2 layout> WMG</motion.h2>
        </Box>

        <Box fr={0} min="auto" cursor="pointer">
          <I.FiMenu style={{ margin: "24px" }} size="23px" color="#000" />
        </Box>
      </Box>
      <Box
        bg="lightgray"
        direction="column"
        style={{ height: "auto", overflow: "scroll" }}
      >
        <User id={user.uid} />
        <Accounts />
        <Songs />
        <Journals />
      </Box>
      <Box bg="primary" fr={0} min="80px" />
    </Flex>
  );
}
export function Dashboard() {
  return (
    <>
      <SuspenseWithPerf fallback={"loading"} traceId={"hello"}>
        <LoginBtn />
        <Layout />
      </SuspenseWithPerf>
    </>
  );
}
