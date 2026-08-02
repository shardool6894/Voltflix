# Voltfix
Voltfix is a community-driven reporting tool and management platform designed to keep Electric Vehicle (EV) charging networks online. Drivers can flag broken stations in seconds, while admins get a bird's-eye view to fix issues fast.
## Features:-

### For Users (Drivers)
* **Report Issues:** Easily submit reports about broken connectors, unresponsive screens, or offline stations.
* **Photo Proof:** Upload images of the damaged equipment for better diagnostics.
* **Authentication:** Secure account creation and login system.

### For Administrators
* **Role-Based Access:** Dedicated admin dashboard hidden from standard users.
* **Live Report Queue:** View, filter, and manage incoming fault reports.
* **Quick Actions:** Mark stations as fixed, flag them for maintenance, or dismiss false reports with a single click.
* **Network Management:** Add new EV charging stations to the network with automatic geolocation (via OpenStreetMap/Nominatim).
* **System Stats:** Track total open reports and overall network health.

---

## Tech Stack:-

**Frontend**
* HTML5, CSS3, Vanilla JavaScript
* Fetch API for async network requests
* LocalStorage for JWT session management

**Backend**
* Node.js & Express.js
* MongoDB (Database)
* Multer (Image file uploads & static file serving)
* JSON Web Tokens (JWT) for secure authentication
* Express Rate Limit & Crypto for brute-force and timing-attack protection

## Getting Started:-

### Prerequisites
Make sure you have the following installed on your machine:
* [Node.js](https://nodejs.org/)
* [Git](https://git-scm.com/)
* A local or cloud MongoDB database (like MongoDB Atlas)

### Installation

1. **Clone the repository:**
   ```bash
   git clone [https://github.com/YourUsername/voltfix.git](https://github.com/YourUsername/voltfix.git)
   cd voltfix
   npm install
    ```
2. Set up Environment Variables:
    Create a .env file in the root directory and add the following keys:
    ```
    Mongoose_URL = your_mongodb_connection_string
<<<<<<< HEAD
JWT_Secret = your_secret_jwt_key
JWT_Refresh_Secret = your_refresh_secret_jwt_key
COOKIE_PARSER_Secret = your_cookie_parser_secret
NODE_ENV = your_node_env
ADMIN_SECRET = your_admin_secret
=======
    JWT_Secret = your_secret_jwt_key
    JWT_Refresh_Secret = your_refresh_secret_jwt_key
    COOKIE_PARSER_Secret = your_cookie_parser_secret
    NODE_ENV = your_node_env
    ```

   Note: Standard users are registered as drivers by default. To create an Admin account, a user must provide the exact ADMIN_SECRET during the registration process on the frontend.

3. Start the server:
```bash : npm run dev```
4. Open the app and navigate to http://localhost:5000

### Future Improvements:-

AWS S3 Integration: Migrate image uploads from local storage to cloud storage.

Image Compression: Resize and compress user-uploaded photos to save bandwidth.

Automated Cleanup: Delete associated image files from the server when a report is dismissed.

Email Notifications: Alert users when their submitted issue has been resolved.
