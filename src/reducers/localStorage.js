
function read(scope) {
    let content = localStorage.getItem('scope');
    if (!content) {
        return undefined;
    }
    return JSON.parse(content);
}

function write(scope, content) {
    return localStorage.setItem('scope', JSON.stringify(content));
}

export default function reducerHOC(scope, reducer) {
    return (state, action) => {
        let nState = state;

        if (!nState) {
            nState = read(scope);
        }
        nState = reducer(nState, action);
        write(scope, nState);
        return nState;
    };
}