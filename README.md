# Backend - Proyect3 (IronApt)

This is the backend for the apartment rental project (IronApt).

## 🚀 Installation & Usage

To run this server locally, follow these steps:

1. Install dependencies if you haven't already:
   ```bash
   npm install
   ```
2. Build the project (TypeScript):
   ```bash
   npm run build
   ```
3. Start the server:
   ```bash
   npm start
   ```

*(Note: Make sure you have your `.env` file configured with the required environment variables such as `PORT`, `TOKEN_SECRET`, and the  Mongo database URL).*

## 📡 API Endpoints

Below is the list of available routes in the application. Note that some routes require authentication (passing the JWT token in the `Authorization: Bearer <token>` header).

### 🏠 Apartments (`/api/apartment`)

The following routes manage the creation and retrieval of apartments.

- **`POST /api/apartment/`**
  - **Description**: Creates a new apartment in the database.
  - **Body (JSON)**: `name`, `images`, `size`, `pricePerDay`, `description`, `capacity`
- **`GET /api/apartment/`**
  - **Description**: Retrieves the list of all apartments, also populating the bookings for each one.
- **`GET /api/apartment/:id`** 🔒 (Requires Authentication)
  - **Description**: Retrieves details of a specific apartment by its ID.
- **`PUT /api/apartment/:id`** 🔒 (Requires Authentication)
  - **Description**: Updates the details of an apartment by its ID.
  - **Body (JSON)**: `_id`, `name`, `images`, `size`, `pricePerDay`, `description`, `capacity`
- **`DELETE /api/apartment/:id`** 🔒 (Requires Authentication)
  - **Description**: Deletes an apartment from the database using its ID.

### 📅 Bookings (`/api/booking`)

All booking routes are protected and **require authentication** 🔒.

- **`POST /api/booking/`**
  - **Description**: Creates a new booking for an apartment.
  - **Body (JSON)**: `apartmentId`, `checkIn`, `checkOut`, `guests`, `guestName`
- **`GET /api/booking/`**
  - **Description**: Retrieves all recorded bookings in the system.
- **`DELETE /api/booking/:id`**
  - **Description**: Cancels (deletes) a booking based on its ID. Also removes it from the corresponding apartment's bookings array.

### 👤 Authentication & Users (`/auth`)

Routes responsible for user registration, login, and token validation.

- **`POST /auth/signup`**
  - **Description**: Creates (registers) a new user.
  - **Body (JSON)**: `email`, `password`, `name`
- **`POST /auth/login`**
  - **Description**: Verifies the provided email and password and returns a valid JWT token.
  - **Body (JSON)**: `email`, `password`
- **`GET /auth/verify`** 🔒 (Requires Authentication)
  - **Description**: Verifies that the JWT token stored on the client's frontend is valid. Returns the user payload.
- **`GET /auth/user/:id`** 🔒 (Requires Authentication)
  - **Description**: Route to get specific user details based on ID.
- **`PUT /auth/user/:id`** 🔒 (Requires Authentication)
  - **Description**: Updates a user's profile (only available for the authenticated user themselves).
  - **Body (JSON)**: `name`, `password` (at least one field required).

### 📁 File Uploads (`/api/fileupload`)

- **`POST /api/fileupload/upload`** 🔒 (Requires Authentication)
  - **Description**: Uploads a single file to `cloudinary` via the `multer` middleware.
  - **Body (FormData)**: Send file with the `file` field.
