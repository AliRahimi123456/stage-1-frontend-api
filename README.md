# NEWSEXPLORER(NewsExplorer Full-Stack News Search & Save App)

News Explorer is a fully deployed full-stack we application that allows users to explore real-time news articles, securely save their favorites, and manage them anytim. This dynamic app combines a sleek React frontend with a robust Node.js + Express backend and MongoDB dataase-all deployed on Google Cloud Platform (GCP) for high availability and performance.

## Key Features

1. Live News Search
   Instantly fetch up-to-date articles ben entering a keyword, using a live news API.

2. Authentication System
   Secure user registration and login using JWT, with token validation and session persistence.

3. Save & Manage Articles
   Logged-in users can bookmark articles and manage them from a personalized Saved News page.

4. Keyword-Based Filtering
   Articles are saved with the associated search keyword for better organization.

5. Responsive Design
   Fully responsive UI with clean layout, modal popups, side menus, and loading
   states.

6. Cloud Deployment
   Backend and database are hosted on Google Cloud, ensuring reliability and speed.

## Tech Stack Used for the Frontend

1. React-Dynamic and reusable UI components
2. React Router DOM-Smooth navigation between routes
3. Context API-Global state management(user and auth state)
4. Custom CSS-Responsive and mobile-friendly design.

## Tech Stack Used for the backend

1. Node.js-Server-side JavaScript runtime
2. Express.js-Lightweight backend framework for API routes
3. MongoDB-ODM(Object Data Modeling) tool for schema-based validation
4. JWT-Token-based user authentication
5. Schemas-Validates ans structures backend data.

## How It Works

1. User Authentication
   Users can register or log in.JWT tokens are issued and stored locally for secure access.
2. News Search
   Users input a keyword articles are fetched from the news API dsiplayed dynamically on the homepage.
3. Save/Delete Articles
   Users can save articles to their profile or remove them. Saved data is persisted in MongoDB.
4. Saved News Page
   Logged-in users can view and manage their personal saved articles on /saved-news.

## Links

https://github.com/AliRahimi123456/newsExplorer
https://newsexplorer.hardsoft.nu/
