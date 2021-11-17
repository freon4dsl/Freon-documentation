// Generated by the ProjectIt Language Generator.
// TODO Change generator

import { PiStyle } from "@projectit/core";

export const placeholdertext: PiStyle = {
    color: "black",
    opacity: "0.5",
    content: "attr(data-placeholdertext)",
    ":empty:before": {
        color: "blue",
        opacity: "0.5",
        content: "attr(data-placeholdertext)"
    },
    ":before": {
        color: "blue",
        opacity: "0.5",
        content: "attr(data-placeholdertext)"
    }
};

export const indentedplaceholdertext: PiStyle = {
    color: "gray",
    "margin-left": "40px"
};

export const numeric: PiStyle = {
    color: "green"
};

export const reference: PiStyle = {
    color: "darkorange"
};
export const stringLiteral: PiStyle = {
    color: "green"
};
export const keyword: PiStyle = {
    "font-weight": "bold",
    color: "blue"
};
export const propertykeyword: PiStyle = {
    "font-weight": "normal",
    color: "blue"
};
export const conceptkeyword: PiStyle = {
    "font-weight": "bold",
    color: "darkblue"
};

export const mygrid: PiStyle = {
    padding: "0px",
    "grid-gap": "0px",
    border: "0px",
    "border-style": "hidden"
};
export const mycell: PiStyle = {
    display: "flex",
    // justifySelf: "stretch",
    padding: "0px",
    "grid-gap": "-1px",
    border: "0px",
    "border-style": "hidden"
};
export const tree: PiStyle = {
    border: "1px",
    "border-style": "dotted",
    "border-color": "darkorange"
};

export const myButton: PiStyle = {
    border: "1px solid blue",
    background: "lightblue",
    color: "black",
    "border-radius": "2px"
};

export const borderLeft: PiStyle = {
    "border-left": "2px",
    "border-style": "solid",
    "border-top-style": "none",
    "border-top": "none"
};
