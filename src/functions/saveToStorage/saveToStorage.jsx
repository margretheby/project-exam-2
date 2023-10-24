function saveToStorage(accessToken, username, userAvatar, userManager) {
    localStorage.setItem('accessToken', accessToken);
    localStorage.setItem('username', username);
    localStorage.setItem('avatar', userAvatar);
    localStorage.setItem('manager', userManager);
}

export default saveToStorage;