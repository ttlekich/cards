import React from "react";
import ReactDOM from "react-dom";
import "./index.css";
import { App } from "./App";
import * as serviceWorker from "./serviceWorker";

import { createOvermind } from "overmind";
import { config } from "./overmind";
import { Provider } from "overmind-react";

const overmind = createOvermind(config, {
    devtools: true,
});

ReactDOM.render(
    <React.StrictMode>
        <Provider value={overmind}>
            <App />
        </Provider>
    </React.StrictMode>,
    document.getElementById("root")
);

serviceWorker.unregister();
