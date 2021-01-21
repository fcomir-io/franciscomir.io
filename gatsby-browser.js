import React from "react";
import { ThemeProvider } from "./src/context/ThemeContext";
import { MDXProvider } from "@mdx-js/react";
// Mdx Components
import Code from "./src/components/MdxComponents/code";
import EmbeddedImage from "./src/components/MdxComponents/embeddedImage";
// Styles
import styled from "styled-components";

const StyledH2 = styled.h2`
  font-height: 1.3rem;
  text-decoration: underline lightgray;
  text-decoration-style: 10px solid;
  text-underline-position: under;
  padding: 0;
  padding-top: 1.3rem;
`;

const StyledH3 = styled.h3`
  font-height: 1rem;
  font-style: bold;
  padding: 0;
  padding-top: 1rem;
`;

const StyledH4 = styled.h4`
  font-height: 0.7rem;
  font-style: normal;
  padding: 0;
  padding-top: 0.6rem;
`;

const StyledVideo = styled.iframe`
  display: block;
  padding: 0;
  margin: 0;
  margin-left: auto;
  margin-right: auto;
  padding: 0;
  padding-bottom: 1rem;
  max-width: 100%;
`;

const StyledP = styled.p`
  padding: 0.3rem;
  margin-bottom: 0.5rem;
`;

const components = {
  h2: ({ children }) => <StyledH2>{children}</StyledH2>,
  h3: ({ children }) => <StyledH3>{children}</StyledH3>,
  h4: ({ children }) => <StyledH4>{children}</StyledH4>,

  "p.inlineCode": (props) => (
    <code {...props} style={{ backgroundColor: "lightgray" }}></code>
  ),

  "p.img": (props) => {
    return (
      <EmbeddedImage
        imageSource={props.src.trim()}
        imageCaption={props.alt.trim()}
        {...props}
      />
    );
  },
  iframe: (props) => <StyledVideo {...props} />,

  "ul.li": ({ children: { props } }) => {
    return <li {...props}></li>;
  },

  /** Always at the end */
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
};

/** To provide the root with the ThemeContext */
export const wrapRootElement = ({ element }) => (
  <ThemeProvider>
    <MDXProvider components={components}>{element}</MDXProvider>
  </ThemeProvider>
);
