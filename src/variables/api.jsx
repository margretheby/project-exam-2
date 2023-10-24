// Base url for API
const BASE_URL = 'https://api.noroff.dev/api/v1/holidaze/'

// Endpoints for registrer and login
export const registerUrl = `${BASE_URL}auth/register`
export const loginUrl = `${BASE_URL}auth/login`

// Endpoints for venues, bookings and profiles
export const venueUrl = `${BASE_URL}venues`
export const bookingsUrl = `${BASE_URL}bookings`
export const profilesUrl = `${BASE_URL}profiles`