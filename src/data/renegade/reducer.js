import { renegadeActions } from "./actions"
import { remainingTime } from "../../tools/Date"

const initialState = {
    events: [],
    programs: [],
    streamers: [],
    streams: [],
    isLoading: false,
}

const renegadeReducer = (state = initialState, action) => {
    switch (action.type) {
        case renegadeActions.STORE_RENEGADE_DATA:
            const filteredEvents = action.data.events
                .sort((a, b) => a.time_start - b.time_start)
                .filter((value) => new Date().getTime() < value.time_start * 1000)
            const programs = action.data.programs.map((program) => {
                const nextLive = filteredEvents.find((event) => event.program === program.id)
                const anim = []
                program.streamers.map((streamerId) =>
                    anim.push(action.data.streamers.find((streamer) => streamer.id === streamerId))
                )
                return {
                    ...program,
                    nextLive: nextLive ? remainingTime(nextLive.time_start * 1000) : "",
                    anim,
                }
            })
            const streams = action.data.streams.map((stream) => {
                const nextLive = filteredEvents.find((event) => event.stream === stream.id)
                return {
                    ...stream,
                    nextLive: nextLive ? remainingTime(nextLive.time_start * 1000) : "",
                }
            })
            return {
                ...state,
                events: action.data.events,
                programs,
                streamers: action.data.streamers,
                streams,
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
