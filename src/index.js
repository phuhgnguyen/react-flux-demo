import "bootstrap/dist/css/bootstrap.min.css";
import React from "react";
import { BrowserRouter as Router } from "react-router-dom";
import { render } from "react-dom";
import App from "./components/App";

// render parameters: component to render, and DOM element to render into
render(
    <Router>
        <App />
    </Router>,
    document.getElementById("root")
);
