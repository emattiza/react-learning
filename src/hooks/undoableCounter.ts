import { createContext, useContext, useReducer, useState } from "react";

// State
export type Counter = {
	index: number;
	counter: number;
	steps: Step[];
};

// Action
export type Step =
	| {
			type: "incr";
			index: number;
			magnitude: 1 | 10 | 100;
			old: number;
	  }
	| {
			type: "decr";
			index: number;
			magnitude: -1 | -10 | -100;
			old: number;
	  };

function counterReducer(state: Counter, action: Step): Counter {
	switch (action.type) {
		case "decr":
			return Object.assign({}, state, {
				index: state.index + 1,
				counter: state.counter + action.magnitude,
				steps: [action, ...state.steps],
			});
		case "incr":
			return Object.assign({}, state, {
				index: state.index + 1,
				counter: state.counter + action.magnitude,
				steps: [action, ...state.steps],
			});
		default:
			return Object.assign({}, state, { index: 0, counter: 0, steps: [] });
	}
}

export default function useUndoableCounter(counterState: Counter) {
	const [counter, dispatch] = useReducer(counterReducer, counterState);

	const incr = (magnitude: 1 | 10 | 100) =>
		dispatch({
			type: "incr",
			index: counter.index + 1,
			magnitude: magnitude,
			old: counter.counter,
		});
	const decr = (magnitude: -1 | -10 | -100) =>
		dispatch({
			type: "decr",
			index: counter.index + 1,
			magnitude: magnitude,
			old: counter.counter,
		});

	return { counter, incr, decr };
}
