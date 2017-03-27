import { createStore, compose } from 'redux';
import rootReducer from './reducers';
import DevTools from './devtools';

const enhancer = compose(
    DevTools.instrument()
);

export default function configureStore(initialState) {
    const store = createStore(rootReducer, initialState, enhancer);

    if (module.hot) {
        module.hot.accept('../reducers', () =>
            store.replaceReducer(require('../reducers')/*.default if you use Babel 6+ */)
        );
    }

    return store;
}