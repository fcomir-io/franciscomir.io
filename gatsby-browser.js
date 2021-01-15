import React from "react";
import { ThemeProvider } from "./src/context/ThemeContext";
import { MDXProvider } from "@mdx-js/react";
import Code from "./src/components/MdxComponents/code";
import EmbeddedImage from "./src/components/MdxComponents/embeddedImage";
// Styles
import styled from "styled-components";
import "./src/styles/main.scss";

const StyledH2 = styled.h2`
  font-height: 1.3rem;
  text-decoration: underline lightgray;
  text-decoration-style: 10px solid;
  text-underline-position: under;
  padding-top: 1.5rem;
`;

const components = {
  h2: ({ children }) => <StyledH2>{children}</StyledH2>,
  h3: ({ children }) => <h3 style={{ color: "red" }}>{children}</h3>,
  "p.inlineCode": (props) => (
    <code {...props} style={{ backgroundColor: "lightgray" }}></code>
  ),
  pre: ({ children: { props } }) => {
    if (props.mdxType === "code") {
      return (
        <Code
          codeString={props.children.trim()}
          language={props.className && props.className.replace("language-", "")}
          {...props}
        />
      );
    }
  },
  "p.img": (props) => {
    return (
      <EmbeddedImage
        imageSource={props.src.trim()}
        imageCaption={props.alt.trim()}
        {...props}
      />
    );
  },
};

/** To provide the root with the ThemeContext */
export const wrapRootElement = ({ element }) => (
  <ThemeProvider>
    <MDXProvider components={components}>{element}</MDXProvider>
  </ThemeProvider>
);
