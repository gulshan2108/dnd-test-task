import { act } from "react-dom/test-utils"
import {GET_TOKEN, TOKEN_ERROR, GET_PLAYLIST, PLAYLIST_ERROR, UPDATE_USER_PLAYLIST} from '../Actions/ActionTypes'

const selectedPlaylist = localStorage.getItem('selectedPlaylist') ? JSON.parse(localStorage.getItem('selectedPlaylist')) : []
const INIT_STATE = {
    token: false,
    error: false,
    featurePlaylist: [],
    selectedPlaylist
}

export const Playlist = (state= INIT_STATE, action) => {
    switch(action.type){
        case GET_TOKEN: 
            state = {
                ...state,
                token: action.payload
            }
            // state = Object.assign({}, state, {playList: [...state.playList, action.payload]})
        break;
        case GET_PLAYLIST: 
            action.payload?.forEach((item)=>{
                item['title'] = item.name
            })
            
            action.payload?.filter((el)=>{
                return state.selectedPlaylist?.some((item)=>{
                    return item.id===el.id
                })
            })
            console.log(55555, action.payload)
            state = {
                ...state,
                featurePlaylist:action.payload
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
        case  UPDATE_USER_PLAYLIST:
            if(action.payload?.sourceLaneId==='lane1' && action?.payload?.targetLaneId==='lane2'){
                state.selectedPlaylist = [...state.selectedPlaylist, ...state.featurePlaylist?.filter((el)=>{return el.id===action.payload.cardId})]
            }
            localStorage.setItem('selectedPlaylist', JSON.stringify(state.selectedPlaylist))
            state = {
                ...state,
            }
        break;
    }
    return state;
}