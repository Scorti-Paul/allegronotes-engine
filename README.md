![logo](https://allegranotes.vercel.app/logo.png)  
<br />

# Project Documentation

### Table of Content
- Project Overview
- Installation & Setup
- Folder Structure 
- Core Features
- Tech Stack
- API Documentation

## 1. Project Overview
A basic note-taking application that allows users to **create**, **view**, **edit**, and **delete** notes.

#### Live Site
[Visit Live Site](https://allegranotes.vercel.app)

### UI/UX Design
[Link To Prototype](https://www.figma.com/proto/HrX5Wfv1HG6KQIpwD57PVB/Allergo---Notes?node-id=0-1&t=NfmqdhGrwc8WSO65-1)


## 2. Installation & Setup

### Prerequisites
- Node.js (v16+ recommended)
- npm or yarn
- Typescript

### Setup Steps
1. Clone the repository:
   ```sh
   git clone https://github.com/Scorti-Paul/allegronotes-engine.git
   ```
2. Navigate to the project directory:
   ```sh
   cd allegronotes-engine
   ```
3. Create .env file:
   ```sh
   PORT=3500
   MONGODB_URI=<your-mongodb-connection-string>
   APP_SECRET=<secret>
   ```
4. Install dependencies:
   ```sh
   npm install  
   # OR
   yarn install
   ```
5. Start the development server:
   ```sh
   tsc -w
   ```

   ```sh
   npm run dev
   # OR
   yarn dev
   ```
1. Start the development server:
   ```sh
   npm run dev
   # OR
   yarn dev
   ```


## 3. Folder Structure
```
project-folder/
│── src/
│   ├── controllers/    # Process Client Requests
│   ├── database/       # Connect MongoDB & Create Schemas
│   ├── routes/         # Setup Endpoint
│   ├── index.ts/       # Entry Point
│── .gitignore
│── package.json
│── README.md
│── tsconfig.json
```


## 4. Core Features
1. **Notes Management**  
   - Create, read, update, and delete (CRUD) operations for notes.  
   - Notes are stored in MongoDB with Mongoose schema validation.  

2. **Categories & Tags**  
   - Create, retrieve, and delete categories and tags.  
   - Assign categories and tags to notes.  

3. **RESTful API Design**  
   - Follows standard REST principles for structured endpoints.  
   - Uses Express.js for route handling.  

4. **Error Handling & Validation**  
   - Centralized error handling with meaningful error messages.   

5. **Database Integration**  
   - Uses MongoDB with Mongoose ORM for schema-based data modeling.  
   - Connection management with environment variable support.  

6. **Security**   
   - CORS middleware for security enhancements.  

7. **Logging**  
   - Middleware for request logging (e.g., Morgan).   

8. **Scalability & Performance Optimization**  
   - Uses lightweight Node.js and Express.js framework.   

9. **Deployment & Configuration Management**  
   - Environment variable support using `.env` files.  
   - Ready for deployment on Render or other cloud platforms.  


## 5. Tech Stack
- **API**: RESTful 
- **Database**: MongoDB - Mongoose
- **Backend**: NodeJS + Express
- **Type**: TypeScript

## 6. API Documentation
Deployed API on Render: http://localhost:3500/api

***Examples:***   
  Full Link to get all Notes: http://localhost:3500/api/notes
### Endpoints
---
| Method | Endpoint                        | Description           |
|--------|---------------------------------|-----------------------|
| GET    | /notes                          | Get all notes         |
| GET    | /notes/:id                      | Get a note            |
| GET    | /notes/filter/:category/:tag    | Filter notes          |
| POST   | /note                           | Create a new note     |
| PUT    | /note/:id                       | Update a new note     |
| DELETE | /note/:id                       | Delete a note         |
| GET    | /tags                           | Get all tags          |
| DELETE | /tag/:id                        | Delete a tag          |
| GET    | /categories                     | Get all category      |
| DELETE | /category/:id                   | Delete a tag          |
