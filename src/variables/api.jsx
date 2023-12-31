import { username } from "./localStorage.jsx"

// Base url for API
const BASE_URL = 'https://api.noroff.dev/api/v1/holidaze/'

// Endpoints for register and login
export const registerUrl = `${BASE_URL}auth/register`
export const loginUrl = `${BASE_URL}auth/login`

// Endpoints for venues and bookings
export const venueUrl = `${BASE_URL}venues`
export const bookingsUrl = `${BASE_URL}bookings`

// Endpoints for profile, profile bookings and profile venues
export const profilesUrl = `${BASE_URL}profiles`
export const profileDataUrl = `${profilesUrl}/${username}`;
export const profileMediaUpdateUrl = `${profileDataUrl}/media`
export const profileBookingsUrl = `${profileDataUrl}/bookings?_venue=true&_customer=true&sort=dateFrom&sortOrder=asc`;
export const profileVenuesUrl = `${profilesUrl}/${username}/venues`;