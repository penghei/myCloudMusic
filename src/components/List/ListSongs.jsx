import React, { useEffect, useState } from 'react'
import { connect } from 'react-redux'
import PubSub from 'pubsub-js';
import axios from 'axios';
import './css/ListSongs.scss'

function ListSongs(props) {
    const [songList, setSongList] = useState([])
    useEffect(() => {
        let selectedList = props.selectedList;
        if (selectedList !== {} && selectedList !== undefined) {
            let id = selectedList.id
            axios.get(`/playlist/detail?id=${id}`)
                .then(res => {
                    let allSongs = []
                    res.data.playlist.tracks.forEach(obj => {
                        allSongs.push(obj)
                    })
                    getAllSongs(allSongs)
                })
        }
        // eslint-disable-next-line
    }, [])
    useEffect(() => {
        let sub = PubSub.subscribe('ifGetAllSongs', (_, data) => {
            if (data) {
                props.setNewPlayingList(songList)
                if(songList.length!==0) props.setPlayingSong(songList[0])
            }
        })
        return () => {
            PubSub.unsubscribe(sub)
        }
    })
    // eslint-disable-next-line
    useEffect(() => {
        if (props.searchRes) {
            setSongList(props.searchRes)
        }
    })
    function getAllSongs(allSongs) {//这是每一首个的id组成的数组,可用来请求详情
        let allSongsId = []
        allSongs.forEach(obj => {
            allSongsId.push(obj.id.toString())
        })
        axios.get(`/song/url?id=${allSongsId.toString()}`)
            .then(res => {
                res.data.data.forEach(songUrlObj => {
                    let foundSong = allSongs.find(songDetailObj => {//在歌曲详情中查找歌曲名等信息
                        return songDetailObj.id === songUrlObj.id
                    })
                    if (foundSong) {
                        let displaySongObj = {
                            name: foundSong.name,
                            id: songUrlObj.id,
                            url: songUrlObj.url,
                            singer: foundSong.ar[0].name,
                            cover: foundSong.al.picUrl,
                        }
                        setSongList(songList => [...songList, displaySongObj])
                    }

                })

            })
    }
    function getSelectedSong(index, songObj) {
        if (songObj !== {} && songObj !== undefined) {
            props.setPlayingSong(songObj)
            props.addToPlayingList(songObj)
        }
    }
    return (
        <div className="listofsongmain" >
            <div className="tableHead">
                <p>序号</p>
                <p>歌曲名</p>
                <p>歌手</p>
            </div>
            <div >
                {
                    songList.map((obj, index) => {
                        return (
                            <div className="listItems" key={index}
                                onDoubleClick={((e) => { return () => { getSelectedSong(e, obj) } })(index)}
                            >
                                <p>{index + 1}</p>
                                <p>{obj.name}</p>
                                <p>{obj.singer}</p>
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
        addToPlayingList: (value) => dispatch({ type: "addToPlayingList", data: value }),
        setNewPlayingList: (value) => dispatch({ type: 'setNewPlayingList', data: value }),
        setPlayingSong: (value) => dispatch({ type: "setPlayingSong", data: value })
    })
)(ListSongs)
