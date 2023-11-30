/**
 * Saves user related information in localStorage
 * @param {string} accessToken the user's access token
 * @param {string} username the user's username
 * @param {string} userAvatar the url of the user's avatar
 */

function saveToStorage(accessToken, username, userAvatar) {
    localStorage.setItem('accessToken', accessToken);
    localStorage.setItem('username', username);
    localStorage.setItem('avatar', userAvatar);
}

export default saveToStorage;