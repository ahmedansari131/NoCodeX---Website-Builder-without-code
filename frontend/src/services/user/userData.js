const storeUserData = (user) => {
    return localStorage.setItem("user", user);
}

const getUserData = () => {
    return localStorage.getItem("user");
}

const removeUserData = () => {
    return localStorage.removeItem("user");
}

export {storeUserData, getUserData, removeUserData};