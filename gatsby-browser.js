import React from "react";
import { ThemeProvider } from "./src/context/ThemeContext";
import { MDXProvider } from "@mdx-js/react";

const components = {
  h2: ({ children }) => <h2 style={{ color: "red" }}>{children}</h2>,
  "p.inlineCode": (props) => (
    <code {...props} style={{ backgroundColor: "lightgray" }}></code>
  ),
};

/** To provide the root with the ThemeContext */
export const wrapRootElement = ({ element }) => (
  <ThemeProvider>
    <MDXProvider components={components}>{element}</MDXProvider>
  </ThemeProvider>
);
