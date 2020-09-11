import React, {useState, useEffect} from "react";
import _ from "lodash";
import matchSorter from "match-sorter";
import {
	useFirestore,
	useFirestoreDocData,
	useFirestoreCollectionData,
} from "reactfire";
import {useLatest} from "react-use";
export const l = console.log;

export const useCollection = (id) => {
	const db = useFirestore();
	const collref = db.collection(id);
	const coll = useFirestoreCollectionData(collref);
	const collection = useLatest(coll);
	const [results, setResults] = useState(collection);

	const methods = {
		removeDoc: (id) =>
			collref
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
