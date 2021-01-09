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
        email: payload.email.split('@')[0],
        username: payload.username,
        gender: payload.gender,
        hereFor: payload.hereFor,
        lookingFor: payload.lookingFor,
    }
            }
        }

        return state;
    }



    // user: {
    //     username: payload.split('@')[0]
    // }