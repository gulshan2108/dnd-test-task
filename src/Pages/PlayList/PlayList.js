import React, { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { getToken, getFeaturePlaylist, updateUserPlayList } from '../../Redux/Actions/Playlist'
import Board from 'react-trello'
import '../../App.css';



const PlayList = () => {
  const [state, setState] = useState({ featurePlayList: [], userPlayList: [] })
  const dispatch = useDispatch()

  const { playlist } = useSelector((state) => ({
    playlist: state?.Playlist,
  }));

  useEffect(() => {
    dispatch(getToken())
  }, [])

  useEffect(() => {
    if (playlist?.token) {
      dispatch(getFeaturePlaylist())
    }
  }, [playlist?.token])

  useEffect(() => {
   

    setState({
      ...state,
      featurePlayList: playlist?.featurePlaylist,
      userPlayList: playlist?.selectedPlaylist
    })

  }, [playlist])


  const handleChange = (cardId, sourceLaneId, targetLaneId, position, cardDetails) => {
    dispatch(updateUserPlayList({ cardId, sourceLaneId, targetLaneId, position, cardDetails }))
  }

  const data = {
    lanes: [
      {
        id: 'lane1',
        label: `${state.featurePlayList.length}`,
        title: 'Feature Playlist',
        cards: state.featurePlayList,
      },
      {
        id: 'lane2',
        label: `${state.userPlayList.length}`,
        title: 'User Playlist',
        cards: state.userPlayList,


      }
    ]
  }

  return (
    <div>
      <Board data={data} handleDragEnd={handleChange} />
    </div>
  )
}
export default PlayList;