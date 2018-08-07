import { renegadeActions } from "./actions"
import { remainingTime } from "../../tools/Date"

const initialState = {
    events: [],
    programs: [],
    streamers: [],
    isLoading: false,
}

const renegadeReducer = (state = initialState, action) => {
    switch (action.type) {
        case renegadeActions.STORE_RENEGADE_DATA:
            const programs = action.data.programs
            const filteredEvents = action.data.events
                .sort((a, b) => a.time_start - b.time_start)
                .filter((value) => new Date().getTime() < value.time_start * 1000)
            for (let i = 0; i < programs.length; i += 1) {
                const nextLive = filteredEvents.find((event) => event.program === programs[i].id)
                programs[i].nextLive = nextLive ? remainingTime(nextLive.time_start * 1000) : ""
            }
            return {
                ...state,
                events: action.data.events,
                programs,
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
