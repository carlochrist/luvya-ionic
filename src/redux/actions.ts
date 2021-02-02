export const setUserState = (payload: any) => {
    return {type: 'SET_USER_STATE', payload}
}

export const setLoggedInState = (payload: any) => {
    return {type: 'SET_LOGGED_IN', payload}
}