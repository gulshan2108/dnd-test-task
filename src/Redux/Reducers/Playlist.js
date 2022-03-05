import { GET_TOKEN, TOKEN_ERROR, GET_PLAYLIST, PLAYLIST_ERROR, UPDATE_USER_PLAYLIST } from '../Actions/ActionTypes'

const selectedPlaylist = localStorage.getItem('selectedPlaylist') ? JSON.parse(localStorage.getItem('selectedPlaylist')) : []
const INIT_STATE = {
    token: false,
    error: false,
    featurePlaylist: [],
    selectedPlaylist,
    apiPlayList: []
}

export const Playlist = (state = INIT_STATE, action) => {
    switch (action.type) {
        case GET_TOKEN:
            state = {
                ...state,
                token: action.payload
            }
            break;
        case GET_PLAYLIST:
            action.payload?.forEach((item) => {
                item['title'] = item.name
            })

            var newPlaylist = action.payload.filter(function (objFromA) {
                return !state.selectedPlaylist.find(function (objFromB) {
                    return objFromA.id === objFromB.id
                })
            })
            state = {
                ...state,
                featurePlaylist: newPlaylist,
                apiPlayList: action.payload,
            }
            break;
        case TOKEN_ERROR:
            state = {
                ...state,
                error: action.payload
            }
            break;
        case PLAYLIST_ERROR:
            state = {
                ...state,
                error: action.payload
            }
            break;
        case UPDATE_USER_PLAYLIST:
            if (action.payload?.sourceLaneId === 'lane1' && action?.payload?.targetLaneId === 'lane2') {
                state.selectedPlaylist = [...state.selectedPlaylist, ...state.featurePlaylist?.filter((el) => { return el.id === action.payload.cardId })]
            }
            if (action.payload?.sourceLaneId === 'lane2' && action?.payload?.targetLaneId === 'lane1') {
                state.selectedPlaylist = [...state.selectedPlaylist?.filter((el) => { return el.id !== action.payload.cardId })]
            }
            var newPlaylist = state.apiPlayList.filter(function (objFromA) {
                return !state.selectedPlaylist.find(function (objFromB) {
                    return objFromA.id === objFromB.id
                })
            })
            
            localStorage.setItem('selectedPlaylist', JSON.stringify(state.selectedPlaylist))
            state = {
                ...state,
                featurePlaylist: newPlaylist
            }
            break;
        default:
            state = state

    }
    return state;
}