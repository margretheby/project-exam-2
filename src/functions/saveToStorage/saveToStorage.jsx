function saveToStorage(accessToken, username, userAvatar) {
    localStorage.setItem('accessToken', accessToken);
    localStorage.setItem('username', username);
    localStorage.setItem('avatar', userAvatar);
}

export default saveToStorage;