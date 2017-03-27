import React from "react";
import { render } from "react-dom";
import { Provider } from "react-redux";
import configureStore from "./configureStore";
import DevTools from "./devtools";
import Application from './application';
import './index.scss';

const store = configureStore();

function Entrypoint() {
    return (
        <Provider store={store}>
            <div>
                <Application />
                <DevTools />
            </div>
        </Provider>
    );
}

render(<Entrypoint />, document.getElementById('root'));
