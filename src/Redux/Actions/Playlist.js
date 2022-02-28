import { GET_TOKEN, TOKEN_ERROR, GET_PLAYLIST, PLAYLIST_ERROR, UPDATE_USER_PLAYLIST } from './ActionTypes'
import axios from 'axios';
import qs from "qs";
import { clientId, clientSecret } from '../../Config'

const headers = {
    headers: {
        Accept: "application/json",
        "Content-Type": "application/x-www-form-urlencoded"
    },
    auth: {
        //   username: clientId,
        //   password: clientSecret
        username: '3a5f48d1050a4afe89875b1d1ad9d793',
        password: '81597203681743aa84ba208515b2084a'
    }
};

const data = {
    grant_type: "client_credentials"
};

export function getToken() {
    return async (dispatch) => {
        try {
            const res = await axios.post(`https://accounts.spotify.com/api/token`,
                qs.stringify(data),
                headers
            )
            const token = `${res?.data?.token_type} ${res?.data?.access_token}`;
            axios.defaults.headers.common['Authorization'] = token;
            dispatch(tokenSuccess(token))
        } catch (error) {
            dispatch(tokenError(error))
        }
    }
}

export function getFeaturePlaylist() {
    return async (dispatch) => {
        try {
            const res = await axios.get(`https://api.spotify.com/v1/browse/featured-playlists`)
            dispatch(playlistSuccess(res?.data?.playlists?.items))
        } catch (error) {
            dispatch(playlistError(error))
        }
    }
}

export function updateUserPlayList(data) {
    return async (dispatch) => {
        // debugger
        //  const selectedPlaylist = localStorage.getItem('selectedPlaylist') ? JSON.parse(localStorage.getItem('selectedPlaylist')) : []

        //  selectedPlaylist.push(data)

        dispatch(userPlayList(data))

    }
}


const tokenSuccess = res => ({
    type: GET_TOKEN,
    payload: res
})

const tokenError = err => ({
    type: TOKEN_ERROR,
    payload: err
})

const playlistSuccess = res => ({
    type: GET_PLAYLIST,
    payload: res
})

const playlistError = err => ({
    type: PLAYLIST_ERROR,
    payload: err
})

const userPlayList = data => ({
    type: UPDATE_USER_PLAYLIST,
    payload: data
})