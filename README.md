# Blog Website Project
# Blog Project with SEO Optimization

## Introduction
This project is a dynamic web application for creating and managing a personal blog. It provides an intuitive interface for users to write, edit, and publish their blog posts. Additionally, the website allows users to interact through comments and offers a search functionality to easily find specific articles.
This is a full-stack blog project built with Node.js, Express, and MongoDB. 
The project includes SEO optimization features such as slug-based URLs, an XML sitemap, Gzip compression, structured data, and caching.


## Table of Contents
1. [Features](#features)
2. [Technologies Used](#technologies-used)
3. [Setup Instructions](#setup-instructions)
4. [Usage](#usage)
5. [Contributing](#contributing)

## Features
- **Create**: Authenticated users can create new blog posts.
- **Publish and Unpublish Posts**: Users can choose to publish or unpublish their posts.
- SEO-friendly URLs using slugs.
- Auto-generated XML sitemap for better search engine indexing.
- Gzip compression enabled for performance improvement.
- HTTP caching implemented to optimize page load speed.
- Structured data added for better visibility in search results.
- Helmet.js added for improved security.


## Technologies Used
- **Frontend**:
  - HTML5
  - CSS3
  - JavaScript (ES6)

- **Backend**:
  - Backend Technologies:  Node JS, EJS, Express, lodash 
  - Database : Mongoose

- **Version Control**:
  - Version Control System : Git

## Setup Instructions
1. [Clone the repository](#) of this project.
2. [Install the necessary dependencies](#) by running the cammand `npm i`.
3. [Run the Mongod server](#) : Make sure you run the following command in your terminal `sudo mongod --dbpath=/Users/yourUserName/data/db`
4. [Configure the database](#) : Open your mongoDB and create a new Database named 'BlogDB'.
5. [Start the development server](#) by running the command `node app.js`.
6. [Access the application](#) in your web browser by typing 'http://localhost:8080/'.
7. SEO Optimizations
   - **Slug-based URLs:** Blog posts use slugs instead of IDs for better readability and SEO.
   - **XML Sitemap:** A sitemap is dynamically generated at `/sitemap.xml` to improve indexing.
   - **Gzip Compression:** Reduces file sizes to speed up page load time.
   - **Caching:** Static files are cached for better performance.
   - **Structured Data:** Google-friendly JSON-LD added for rich search results.
   - **Helmet.js:** Improves security by setting appropriate HTTP headers.
8. And you are all done.

## Usage
1. **Writing a Blog Post**:
   - Click on the "Create Post" button.
   - Use the rich text editor to write your blog post.
   - Add categories, tags, and choose whether to publish it.

2. **Editing a Blog Post**:
   - Navigate to the post you want to edit.
   - Click on the "Edit" button and make the necessary changes.

3. **Get All Published Blogs**:
   - See All published Blogs on Home Page.
   - Click on read more... to get to the published blog.


## Contributing
If you'd like to contribute to this project, please follow these steps:
1. Fork the repository.
2. Create a new branch for your feature or bug fix.
3. Make your changes and test thoroughly.
4. Submit a pull request, describing the changes you've made.
 
<img width="900" alt="blog1" src="https://github.com/Sarita-021/blogProject/assets/121181405/cfdaae55-1eab-4e85-9e9a-f11ebb4e7ac9">
<br />
<img width="900" alt="blog2" src="https://github.com/Sarita-021/blogProject/assets/121181405/4024e432-5242-47b1-b9d0-4f0e0fa0df8f">


