import * as React from "react";
import _ from "lodash";
import {Frame} from "framer";
const kindof = require("kind-of");
function Value(name = "", value = 0) {
	return {
		name: name,
		type: kindof(value),
		value: value,
		set(val) {
			this.value = _.toNumber(val);
			return this;
		},
		renderInput() {
			return <input value={this.value} />;
		},
		log() {
			console.log(this);
			return this;
		},
	};
}

function Item(name = "") {
	return {
		name: name,
		createId() {
			this.id = _.chain(this.name)
				.trim()
				.camelCase()
				.value();
			return this;
		},
		updateId(val) {
			this.id =
				this.id +
				"_" +
				_.chain(val)
					.trim()
					.camelCase()
					.value();
			return this;
		},
		log() {
			console.log(this);
			return this;
		},
	};
}

function Likeable(initialLikes = 0, O) {
	return {
		likes: initialLikes,
		like() {
			this.likes = this.likes + 1;
			return this;
		},
		unlike() {
			this.likes = this.likes - 1;
			return this;
		},
		...O,
	};
}
function FirestoreDoc(name, path = "do/me") {
	return {
		id: _.chain(name)
			.trim()
			.camelCase()
			.value(),
		name: name,
		firestore: (firestore) => firestore(),
		path: path,
		ref: this.firestore().doc(this.id),
		set(val) {
			this.ref.set(val);
			return this;
		},
		merge(val) {
			this.ref.set(val, {merge: true});
			return this;
		},
		update(key, val) {
			this.ref.update({[key]: val});
			return this;
		},
		delete() {
			this.ref.delete();
			return this;
		},
		addMap(key, val = {}) {
			this.ref.update({[key]: val});
			return this;
		},
		arrayUnion(key, val) {
			this.ref.update({[key]: this.firestore.FieldValue.arrayUnion(val)});
			return this;
		},
		...O,
	};
	o.Item = Item;
	o.Firestore = o;
	return o;
}
Value("likes").log();
Item("bill").log();
console.log(_(<Frame />).value());
