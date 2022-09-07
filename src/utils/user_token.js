
export const setUserToken = (token) => {
    sessionStorage.setItem('USERTOKEN', token)
}

export const getUserToken = (key) => {
    return sessionStorage.getItem(key)
}

export const removeUserToken = () => {
    sessionStorage.removeItem('USERTOKEN')
}