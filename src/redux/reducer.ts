const defaultState = {
    user: {}
}

export default function reducer(
    state = defaultState,
    { type, payload}: {type: string; payload: any}
    ): any {
        // work with state
        switch(type) {
            case 'SET_USER_STATE': 
            return {
                ...state,
    user: {
        id: payload.id,
        email: payload.email,
        username: payload.username,
        gender: payload.gender,
        hereFor: payload.hereFor,
        lookingFor: payload.lookingFor,
        likes: payload.likes,
        dislikes: payload.dislikes,
        pictures: payload.pictures,
        chats: payload.chats,
        location: payload.location
    }
            }

            case 'SET_USER_MATCHED_STATE': 
            return {
                ...state,
    userMatched: {
        username: payload.username,
        pictures: payload.pictures,
        hereFor: payload.hereFor
    }
            }

            case 'SET_LOGGED_IN': 
            return {
                ...state,
    loggedIn: {
        loggedIn: payload.loggedIn,
        test: payload.test
    }
            }

            case 'SET_USER_SELECTED_STATE': 
            if (payload === null) {
                return {
                    ...state,
                    userSelected: null
                }
            } else {
                return {
                    ...state,
                    userSelected: {
                        id: payload.id,
                        email: payload.email,
                        username: payload.username,
                        pictures: payload.pictures
                    }
                }
            }

            case 'SET_SWIPE_BUTTON_PRESSED_STATE': 
            if (payload === null) {
                return {
                    ...state,
                    swipeButtonClicked: null
                }
            } else {
                return {
                    ...state,
                    swipeButtonClicked: {
                        name: payload.name
                    }
                }
            }


            
            
         
        }

        return state;
    }


    

//         email: payload.email.split('@')[0],

    // user: {
    //     username: payload.split('@')[0]
    // }