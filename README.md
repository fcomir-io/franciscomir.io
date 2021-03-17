<!-- AUTO-GENERATED-CONTENT:START (STARTER) -->
<p align="center">
  <a href="https://www.franciscomir.io">
    <img alt="Francisco Mir" src="./src/images/favicon.png" width="60" />
  </a>
</p>
<h1 align="center">
franciscomir.io
</h1>

My personal website running on Gatsby, React, and Node.js.

https://franciscomir.io/

[![License: MIT](https://img.shields.io/badge/License-MIT-blue.svg)](https://opensource.org/licenses/MIT) [![Netlify Status](https://api.netlify.com/api/v1/badges/621392d3-e486-49c7-8d75-cd0602e168c9/deploy-status)](https://app.netlify.com/sites/compassionate-villani-cd7ef9/deploys)

### How to...

#### Clone and setup the project

	git clone repo to {folder}
	cd {folder}
	run npm install
	run npm audit fix
	git submodule update --remote --recursive  // If you have access to linked submodules

#### Set up .env file

	GATSBY_GRAPHQL_IDE=playground
	GATSBY_EMAILJS_SERVICE_ID={}
	GATSBY_EMAILJS_TEMPLATE_ID={}
	GATSBY_EMAILJS_USER_ID={}
	GATSBY_MAILCHIMP_URL={}

#### Setup /content folder

/content folder is a submodule where Gatsby.js extracts the website content:

**.gitmodules**

	[submodule "content"]
		path = content
		url = git@github.com:fcomir-io/franciscomir.io-content.git

Structure of the folder:

    content
    ├── assets
    ├── data
    ├── images
    ├── posts
    └── .gitignore

1.  **`/assets`**: This directory contains all of the images used in the articles.

2.  **`/data`**: This directory will contain the content of the About, Resume and Bio pages.

3.  **`/images`**: This directory will contain all images used overall in the website.

4.  **`/posts`**: This directory contains article files in MD-Format.

There are two options to setup /content folder:

1. Delete .gitmodules and setup /content folder directly on the project
2. Create a repository with the described structure and update .gitmodules file

#### Start your website

	npm start

### 3rd party libraries

- React Popupbox
https://fraina.github.io/react-popupbox/

- EmailJS
https://www.npmjs.com/package/emailjs

## License

This project is open source and available under the [MIT License](LICENSE).
