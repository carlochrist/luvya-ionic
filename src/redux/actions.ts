export const setUserState = (payload: any) => {
    return {type: 'SET_USER_STATE', payload}
}

export const setLoggedInState = (payload: any) => {
    return {type: 'SET_LOGGED_IN', payload}
}

export const setUserMatchedState = (payload: any) => {
    return {type: 'SET_USER_MATCHED_STATE', payload}
}

export const setUserSelectedState = (payload: any) => {
    return {type: 'SET_USER_SELECTED_STATE', payload}
}