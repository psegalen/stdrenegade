import { renegadeActions } from "./actions"

const initialState = {
    events: [],
    programs: [],
    streamers: [],
    isLoading: false,
}

const renegadeReducer = (state = initialState, action) => {
    switch (action.type) {
        case renegadeActions.STORE_RENEGADE_DATA:
            return {
                ...state,
                events: action.data.events,
                programs: action.data.programs,
                streamers: action.data.streamers,
                isLoading: false,
            }
        case renegadeActions.FETCH_RENEGADE_DATA:
            return {
                ...state,
                isLoading: true,
            }
        default:
            return state
    }
}

export default renegadeReducer
