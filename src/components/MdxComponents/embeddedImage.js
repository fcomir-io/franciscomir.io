import React from "react";
// Components from Gatsby library
import { graphql, useStaticQuery } from "gatsby";
import Img from "gatsby-image";
// Styles
import styled from "styled-components";

const Image = styled(Img)`
  border-radius: 5px;  
  display: block;
  margin-left: auto;
  margin-right: auto;
  max-width: 70%;
  box-shadow: 1px 2px 15px rgba(0, 0, 0, 0.1);
  background-color: $primary-color;
`;

export default ({ imageSource, imageCaption, ...props }) => {
  /** Get Image Name based on imageSource */
  console.log("ImageSource", imageSource);
  let isFileLevelFound = false;
  let folderLevelCounter = 0;
  let folderName = "";
  let tempName = imageSource;
  console.log("tempName", tempName);
  let startOfFolder = 0;
  while (!isFileLevelFound) {
    startOfFolder = tempName.indexOf("/");
    if (startOfFolder != -1) {
      console.log("startOfFolder", startOfFolder);
      tempName = tempName.substring(startOfFolder + 1);
      console.log("tempName", tempName);            
    } else {
      /** No '/' found ==> We are in file level */
      isFileLevelFound = true;
    }
  }

  let imageName = tempName;
  const startOfExtension = imageName.indexOf(".");
  imageName = imageName.substring(0, startOfExtension);
  console.log("imageName", imageName);

  /** Query all Images in assets-Folder
   * It is not an efficient way to solve the issue, but up to today (14/01/2021) it is the best I get
   */
  const imageQuery = useStaticQuery(graphql`
    query {
      allFile(filter: { sourceInstanceName: { eq: "assets" } }) {
        edges {
          node {
            extension
            dir
            modifiedTime
            name
            childImageSharp {
              fluid(maxWidth: 1000) {
                ...GatsbyImageSharpFluid
              }
            }
          }
        }
      }
    }
  `);

  const images = imageQuery.allFile.edges;

  /** Search for the image in imageQuery */
  let embeddedImageSource = "XYZ";
  let temp;

  images.forEach((image) => {
    if (image.node.name === imageName) {
      embeddedImageSource = image.node.childImageSharp.original;
      embeddedImageSource = image.node.relativePath;
      //temp = image.node.childImageSharp.fixed.src;
      temp = image.node.childImageSharp.fluid;
      console.log("Image", temp);
    }
  });
  console.log("embeddedImageSource", temp);

  return <>{!temp ? "undefined" : <Image fluid={temp} />}</>;
};
