import React, {useState, useEffect} from 'react';
import { useSelector, useDispatch } from 'react-redux';
import {getToken, getFeaturePlaylist, updateUserPlayList } from '../../Redux/Actions/Playlist'
import Board, { Draggable } from 'react-trello'
import '../../App.css';

import Axios from '../../Redux/Service'
const PlayList = () => {
    const [ state, setState ] = useState({ featurePlayList:[], userPlayList:[] })
    const dispatch = useDispatch()

    const { playlist } = useSelector((state) => ({
        playlist: state?.Playlist,
    }));

    useEffect(()=>{
        dispatch(getToken())
    },[])

    useEffect(()=>{
        if(playlist?.token){
            dispatch(getFeaturePlaylist())
        }
    },[playlist?.token])

    useEffect(()=>{
        const myArrayFiltere = [...playlist?.featurePlaylist]

          for (var i in myArrayFiltere){
            for(var j in playlist?.selectedPlaylist ){
                if(myArrayFiltere[i].name==playlist?.selectedPlaylist[j].name){
                   
                    console.log(666, myArrayFiltere.slice(0,i));
                }
            }

          }
          
           
        setState({
            ...state, 
            featurePlayList: playlist?.featurePlaylist,
            userPlayList: playlist?.selectedPlaylist
        })

    },[playlist])


    const handleChange=( cardId, sourceLaneId, targetLaneId, position, cardDetails)=>{
        dispatch(updateUserPlayList({cardId, sourceLaneId, targetLaneId, position, cardDetails}))
    }

    console.log(159,state)



    const data = {
        lanes: [
          {
            id: 'lane1',
            title: 'Feature Playlist',
            cards: state.featurePlayList
            
          
          },
          {
            id: 'lane2',
            title: 'User Playlist',
            cards: state.userPlayList,
            Draggable:false
          }
        ]
      }
    return(
        <div>
          <Board data={data} handleDragEnd={handleChange} onLaneUpdate={(id, da)=>{console.log(4444, id, da)}}/>
      </div>
    )
}
export default PlayList;