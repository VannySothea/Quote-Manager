# **Random Quote Generator**

## **About**

This application allows users to:
- Fetch a random quote.
- Save their favorite quotes.
- Manage their saved quotes collection.

## **Technologies Used**

### Frontend:
- **React** – JavaScript library for building user interfaces.
- **Redux Toolkit** – For state management and handling asynchronous actions.
- **Axios** – For making HTTP requests to the backend.
- **CSS** – For styling.

### Backend:
- **PHP Laravel** – A PHP framework for building the backend API.
- **Sanctum** – For API authentication using tokens.
- **MySQL** – For database storage.

## **API Endpoints:**

### Authentication
- **POST /api/register**: Register new user account. 
- **POST /api/verify-email**: Verify user email account. 
- **POST /api/login**: Login an account. 
- **POST /api/logout**: Logout an account.
   
### Quote
- **GET /api/quotes/random**: Fetches a random quote.
- **POST /api/quotes**: Saves a new quote to the user's collection (requires authentication).
- **GET /api/quotes**: Retrieves the user's saved quotes (requires authentication).
- **DELETE /api/quotes/{id}**: Deletes a saved quote by ID (requires authentication).

## **Installation**

Follow the steps below to run the application locally.

### **Frontend:**

1. Navigate into the frontend directory:
    ```bash
    cd Quote-Manager/client
    ```

3. Install dependencies:
    ```bash
    npm install
    ```

4. Start the development server:
    ```bash
    npm run dev
    ```

### **Backend:**

1. Navigate into the backend directory:
    ```bash
    cd Quote-Manager/server
    ```

3. Install dependencies using **Composer**:
    ```bash
    composer install
    ```

4. Set up the environment variables in the `.env` file:
    - Database credentials (`DB_HOST`, `DB_DATABASE`, `DB_USERNAME`, `DB_PASSWORD`).

5. Generate the **Sanctum** keys:
    ```bash
    php artisan key:generate
    php artisan migrate
    php artisan sanctum:install
    ```

6. Start the backend server:
    ```bash
    php artisan serve
    ```

### **Configuration:**
Ensure the backend API URL is properly set in the frontend `.env` file (or directly in the Axios requests) for **CORS** to work correctly with your Laravel server.

## **Running the Application**

Once both the frontend and backend are running, the frontend will be available at `http://localhost:3000` (default React port). You can interact with the application by generating and saving quotes.

Ensure that the backend is running on a different port (default for Laravel is `http://localhost:8000`).
