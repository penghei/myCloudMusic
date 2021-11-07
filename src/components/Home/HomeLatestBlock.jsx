import React, { useLayoutEffect, useState } from 'react'
import { connect } from 'react-redux';
import axios from 'axios';
import './css/HomeLatestBlock.scss'

function HomeLatestBlock(props) {
    const [songList, setSongs] = useState([])
    function getSelectedSong(index, songObj) {
        props.setPlayingSong(songObj)
        props.addToPlayingList(songObj)
    }
    useLayoutEffect(() => {
        axios.get('/top/song?type=0')
            .then(res => {
                let songList = res.data.data
                songList.length = 10;
                songList.forEach((obj) => {
                    axios.get(`/song/url?id=${obj.id}`)
                        .then(res => {
                            let songUrl = res.data.data[0].url
                            let displaySongObj = {
                                name: obj.name,
                                id: obj.id,
                                url: songUrl,
                                singer: obj.artists[0].name,
                                cover: obj.album.picUrl,
                            }
                            setSongs(songList => [...songList, displaySongObj])
                        })
                })

            })
    }, [])
    return (
        <div className="latestblock">
            <div className="latestblocktitle">最新音乐</div>
            <div className="latestblockmain">
                {
                    songList.map((songObj, index) => {
                        return (
                            <div
                                className="songItem"
                                key={index}
                                onDoubleClick={((e) => { return () => { getSelectedSong(e, songObj) } })(index)}
                            >
                                <img src={songObj.cover} alt=" "></img>
                                <div className="songDetail">
                                    <p>{songObj.name}</p>
                                    <p>{songObj.singer}</p>
                                </div>
                            </div>
                        )
                    })
                }
            </div>
        </div>
    )
}
export default connect(
    state => ({
        songListFromStore: state.playingList,
        selectedSongFromStore: state.playingSong
    }),
    dispatch => ({
        setPlayingSong: (value) => dispatch({ type: 'setPlayingSong', data: value }),
        addToPlayingList: (value) => dispatch({ type: 'addToPlayingList', data: value })
    })
)(HomeLatestBlock)
