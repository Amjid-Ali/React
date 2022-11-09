export const setToken = (token, data) => {
    localStorage.setItem("authToken", JSON.stringify(token));
    localStorage.setItem("info", JSON.stringify(data));
};



export const getToken = () => { 
    return JSON.parse(localStorage.getItem("authToken"))
};


