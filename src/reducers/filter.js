const SET_FILTER = 'SET_FILTER';
const REMOVE_FILTER = 'REMOVE_FILTER';
const CLEAR_FILTER = 'CLEAR_FILTER';

const omit = (obj, rkey) => Object.entries(obj)
    .filter(([key]) => rkey !== key)
    .reduce((acc, val) => ({...acc, [val[0]]: val[1]}), {});

const initalState = {};

export default function reducer(state = initalState, action) {
    const { type, data } = action;
    switch (type) {
        case SET_FILTER:
            return {
                ...state,
                [data.name]: data.value
            };
        case REMOVE_FILTER:
            return {
                ...state,
                [data.name]: omit(state[data.name], data.value)
            };
        case CLEAR_FILTER:
            return {};
        default:
            return state;
    }
}

export function setFilter(name, value, ...args) {
    return { type: SET_FILTER, data: { name, value } };
}

export function removeFilter(name, value) {
    return { type: REMOVE_FILTER, data: { name, value } };
}

export function clearFilter() {
    return { type: CLEAR_FILTER };
}