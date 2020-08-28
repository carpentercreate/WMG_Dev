import React, {useState, useEffect} from "react";
import _ from "lodash";
import {useFirestore, useFirestoreDocData} from "reactfire";
export const l = console.log;

export function useDoc(collectionID, docID) {
	const db = useFirestore;
	const docref = db()
		.collection(collectionID)
		.doc(docID);
	const {fieldValue} = db;

	const doc = useFirestoreDocData(docref);
	const update = (v) => docref.update(v);
	const add = (v) => docref.add(v);
	const set = (v, merge = true) => docref.set(v, {merge});

	const deleteField = (v) => docref.update({[v]: fieldValue.delete()});
	const addToArray = (v, k) => docref.update({[k]: fieldValue.arrayUnion(v)});
	const removeFromArray = (key, fieldsToRemove) =>
		docref.update({[key]: fieldValue.arrayRemove(fieldsToRemove)});
	const increment = (key, amount) =>
		docref.update({[key]: fieldValue.increment(amount)});
	const has = (k) => _.has(doc, k);
	const keys = () => _.keys(doc);
	const values = () => _.values(doc);
	return [
		doc,
		{
			add,
			has,
			set,
			keys,
			values,
			deleteField,
			update,
			removeFromArray,
			addToArray,
			increment,
		},
	];
}
///

export const getUniqueObjectFields = (newO, prevO) =>
	_.pickBy(newO, (v, k) => !_.isEqual(prevO[k], v));
