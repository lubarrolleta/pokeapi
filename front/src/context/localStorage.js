export const setTokens = (token)=> {
    window.localStorage.setItem('token', token);
};
export const removeTokens = ()=> {
    window.localStorage.removeItem('token');
}