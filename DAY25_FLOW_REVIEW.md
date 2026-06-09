# Day 25 Flow Review

## Backend Routes

- `GET /api/health` checks if the backend is running.
- `GET /api/rentals` sends all rental cards to the frontend.
- `GET /api/rentals/:id` sends one rental detail page.
- `POST /api/inquiries` receives the inquiry form.
- `GET /api/inquiries` shows saved inquiry form submissions.
- `POST /api/login` checks demo login details.
- `POST /api/signup` creates a user in backend memory.
- `POST /api/users/:userId/saved-rentals` saves a rental for one user.
- `DELETE /api/users/:userId/saved-rentals/:rentalId` removes a saved rental.

## Frontend To Backend Flow

1. `App.jsx` loads rentals from `GET /api/rentals`.
2. `RentalCard.jsx` links to a detail page using the rental id.
3. `RentalDetailPage.jsx` loads one rental from `GET /api/rentals/:id`.
4. Inquiry form sends data to `POST /api/inquiries`.
5. Save button checks if a user is logged in.
6. If not logged in, `AuthModal.jsx` opens login/signup.
7. After login/signup, the rental is saved through the saved-rentals route.
8. `SavedPage.jsx` reads the saved ids from React state and shows matching rentals.

## Current Limit

The backend still uses in-memory arrays. This is okay for Day 25 cleanup.
The next database checkpoint can move `rentals`, `users`, `inquiries`, and saved rentals into PostgreSQL.
