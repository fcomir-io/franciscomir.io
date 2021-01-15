import React from "react";
import Highlight, { defaultProps } from "prism-react-renderer";
import theme from "prism-react-renderer/themes/oceanicNext";
import styled from "styled-components";
import copyToClipboard from "../../utils/copy-to-clipboard";

const Pre = styled.pre`
  position: relative;
  text-align: left;
  margin: 1em 0;
  padding: 0.5em;
  overflow: scroll;
  min-height: 70px;
  box-shadow: 1px 2px 15px rgba(0, 0, 0, 0.1);
  background-color: $primary-color;
`;

const Line = styled.div`
  display: table-row;
`;

const LineNo = styled.span`
  display: table-cell;
  text-align: right;
  padding-right: 1em;
  user-select: none;
  opacity: 0.5;
`;

const LineContent = styled.span`
  display: table-cell;
`;

const CopyCode = styled.button`
  position: absolute;
  right: 0.25rem;
  border: 0;
  border-radius: 3px;
  margin: 0.25em;
  opacity: 0.3;
  &:hover {
    opacity: 1;
  }
`;

const Code = ({ codeString, language, ...props }) => {  

  const [isCopied, setIsCopied] = React.useState(false);

  const handleCopyClick = () => {
    copyToClipboard(codeString);
    setIsCopied(true);
    setTimeout(() => setIsCopied(false), 3000);
  };
  
  return (
    <Highlight
      {...defaultProps}
      code={codeString}
      language={language}
      theme={theme}
    >
      {({ className, style, tokens, getLineProps, getTokenProps }) => (
        <Pre className={className} style={style}>
          <CopyCode onClick={handleCopyClick}>
            {isCopied ? "🎉 Copied!" : "Copy"}{" "}
          </CopyCode>
          {tokens.map((line, i) => (
            <Line key={i} {...getLineProps({ line, key: i })}>
              <LineNo>{i + 1}</LineNo>
              <LineContent>
                {line.map((token, key) => (
                  <span key={key} {...getTokenProps({ token, key })} />
                ))}
              </LineContent>
            </Line>
          ))}
        </Pre>
      )}
    </Highlight>
  );
};

export default Code;