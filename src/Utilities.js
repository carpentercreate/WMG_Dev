import React, {useState, useEffect} from "react";
import _ from "lodash";
import matchSorter from "match-sorter";
import {
	useFirestore,
	useFirestoreDocData,
	useFirestoreCollectionData,
} from "reactfire";
export const l = console.log;

export const useCollection = (id) => {
	const db = useFirestore();
	const collref = db.collection(id);
	const collection = useFirestoreCollectionData(collref);
	const [results, setResults] = useState();

	const methods = {
		removeDoc: (id) =>
			collection
				.doc(id)
				.delete()
				.then((doc) => console.log("doc was deleted"))
				.catch((err) => console.log(err)),
		sumBy: (k) => setResults(_.sumBy(collection, k)),
		meanBy: (k) => setResults(_.meanBy(collection, k)),
		search: (v, keys) => setResults(matchSorter(collection, v, {keys: keys})),
		maxBy: (k) => setResults(_.maxBy(collection, k)),
		minBy: (k) => setResults(_.minBy(collection, k)),
		countBy: (k) => setResults(_.countBy(collection, k)),
		groupBy: (k) => setResults(_.groupBy(collection, k)),
		orderBy: (k) => setResults(_.orderBy(collection, k)),
		pickBy: (k) => setResults(_.pickBy(collection, k)),
		some: (k) => setResults(_.some(collection, k)),
		every: (k) => setResults(_.every(collection, k)),
		includes: (k) => setResults(_.includes(collection, k)),
		size: (k) => setResults(_.size(collection, k)),
		omitBy: (k) => setResults(_.omitBy(collection, k)),
		find: (k) => setResults(_.find(collection, k)),
		filter: (k) => setResults(_.filter(collection, k)),
		map: (k) => setResults(_.map(collection, k)),
		log: () => console.log(collection),
	};

	return [collection, results, {...methods}];
};
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
