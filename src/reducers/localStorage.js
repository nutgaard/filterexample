
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
        if (state === undefined) {
           nState = read(scope);
        }
        
        const rState = reducer(nState, action);
        
        if (rState !== nState) {
            write(scope, rState);
        }
     
        return rState;
    };
}
