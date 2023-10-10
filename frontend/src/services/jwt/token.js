const storeToken = (value) => {
    const {access, refresh} = value;
    localStorage.setItem("access", access);
    localStorage.setItem("refresh", refresh);
}

const getToken = () => {
    let access = localStorage.getItem("access");
    let refresh = localStorage.getItem("refresh");
    return {access, refresh};
}

const removeToken = () => {
    localStorage.removeItem("access");
    localStorage.removeItem("refresh");
}

export {storeToken, getToken, removeToken};