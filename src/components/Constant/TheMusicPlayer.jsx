import React, { useEffect, useRef, useState } from 'react'
import { withRouter } from 'react-router'
import { connect } from 'react-redux'
import ThePlayingList from './ThePlayingList.jsx'
import timeToMinute from '../../TimeToMinute';
import Pubsub from 'pubsub-js'
import './css/TheMusicPlayer.scss'

function TheMusicPlayer(props) {
    const songList = props.songListFromStore;
    const thisSong = props.selectedSongFromStore;
    const theAudio = useRef()
    const [ifPlay, setIfPlay] = useState(false)
    const [hasPlayedTime, setPlayedTime] = useState("00:00")
    const [songDuration, setSongDuration] = useState("00:00")
    const [playedProgress, setPlayedProgress] = useState("0%")
    const songNum = useRef(0)

    function playSong() {
        let audio = theAudio.current
        audio.load()
        setIfPlay(true)
        getCuerrentTime();
        setTimeout(() => {
            audio.play().catch(err => console.log(err))
        }, 0)
        Pubsub.publish("changePlayingSong", true)
    }
    function stopSong() {
        let audio = theAudio.current
        setIfPlay(false)
        audio.pause()
        setSongDuration("00:00")
        setPlayedTime("00:00")
        props.emptyPlayingList()
        setPlayedProgress("0%")
    }
    function controlPlay() {
        let audio = theAudio.current
        if (!ifPlay) {
            if (JSON.stringify(thisSong) === '{}') {
                if (songList.length === 0) return
                audio.load()
                getCuerrentTime();
            }
            setIfPlay(true)
            setTimeout(() => {
                audio.play().catch(err => { throw err })
            }, 0)
        } else {
            audio.pause()
            setIfPlay(false)
        }
    }
    function lastSong() {
        if (songList.length === 0) return
        if (songNum.current !== 0) {
            songNum.current -= 1
            if (songNum.current === 0) songNum.current = 0;
        } else {
            songNum.current -= 1
        }
        setIfPlay(true)
        playSong()
        props.setPlayingSong(songList[songNum.current])
    }
    function nextSong() {
        if (songList.length === 0) return
        if (songNum.current <= songList.length - 1) {
            songNum.current += 1
            if (songNum.current > songList.length - 1) songNum.current = 0;
        } else {
            songNum.current = 0
        }
        setIfPlay(true)
        props.setPlayingSong(songList[songNum.current])
        playSong()
    }
    function getCuerrentTime() {
        let audio = theAudio.current
        audio.addEventListener('timeupdate', () => {
            setPlayedTime(timeToMinute(audio.currentTime))
            Pubsub.publish("playedTime", audio.currentTime)
            let playedPercent = `${(audio.currentTime / audio.duration) * 100}%`
            setSongDuration(timeToMinute(audio.duration))
            setPlayedProgress(playedPercent)
            if (audio.ended) {
                console.log('next')
                nextSong()
            }
        })
    }
    function openMusicDetail() {
        if (JSON.stringify(thisSong) === '{}') return;
        props.history.push({
            pathname: '/main/music',
        })
    }
    function changeProgressBar(e) {
        let audio = theAudio.current
        let percent = e.pageX / document.body.scrollWidth
        let perTime = percent * audio.duration
        audio.currentTime = perTime
    }
    useEffect(() => {
        let sub = Pubsub.subscribe('emptySongList', (_, data) => {
            if (data) {
                props.emptyPlayingList()
                props.removePlayingSong()
                stopSong()
            }
        })
        return () => {
            Pubsub.unsubscribe(sub)
        }
    })
    useEffect(() => {
        playSong()
        // eslint-disable-next-line
    }, [thisSong, songList])
    return (
        <div className="musicplayermain">
            <div onClick={changeProgressBar} className="progress">
                <div className="progressbar" style={{ width: playedProgress }} ></div>
                <div className="progresscircle"></div>
            </div>
            <div className="player">
                <div className="sider-music">
                    <div className="music-avatar" onClick={openMusicDetail}>
                        <img src={thisSong.cover || "https://i.loli.net/2021/11/03/CM6T9AamqOUgRzb.png"} alt="网易云音乐"></img>
                    </div>
                    <div className="music-detail">
                        <p className="musicName">{thisSong.name || '网易云音乐'}</p>
                        <p className="progressTime">{hasPlayedTime}/{songDuration || "00:00"}</p>
                    </div>
                </div>
                <div className="music-main">
                    <div>
                        <svg onClick={lastSong} t="1635406948422" viewBox="0 0 1024 1024" version="1.1" xmlns="http://www.w3.org/2000/svg" p-id="3036" width="20" height="20"><path d="M364.302083 465.602819L687.954365 218.588294c38.416414-29.327534 93.791393-1.929039 93.791392 46.396277v494.029051c0 48.325316-55.374979 75.725617-93.791392 46.398084L364.302083 558.397181c-30.600916-23.357989-30.600916-69.436372 0-92.794362zM238.945254 780.798397V451.684117v-164.562559c0-19.628152-5.904521-60.475733 17.057907-75.841215 25.523642-17.068744 59.747828 1.210165 59.747828 31.919454v493.676839c0 19.628152 5.915358 60.473927-17.047069 75.841215-25.53448 17.068744-59.758666-1.211971-59.758666-31.919454z" fill="#231815" p-id="3037"></path></svg>
                    </div>
                    <div onClick={controlPlay}>
                        {
                            ifPlay
                                ? <svg t="1635671484216" className="icon" viewBox="0 0 1024 1024" version="1.1" xmlns="http://www.w3.org/2000/svg" p-id="3753" width="30" height="30"><path d="M512 64c247.424 0 448 200.576 448 448S759.424 960 512 960 64 759.424 64 512 264.576 64 512 64z m0 68c-209.868 0-380 170.132-380 380s170.132 380 380 380 380-170.132 380-380-170.132-380-380-380zM400 352c17.673 0 32 14.327 32 32v256c0 17.673-14.327 32-32 32-17.673 0-32-14.327-32-32V384c0-17.673 14.327-32 32-32z m225 0c17.673 0 32 14.327 32 32v256c0 17.673-14.327 32-32 32-17.673 0-32-14.327-32-32V384c0-17.673 14.327-32 32-32z" p-id="3754"></path>
                                </svg>
                                : <svg t="1635406901217" viewBox="0 0 1024 1024" version="1.1" xmlns="http://www.w3.org/2000/svg" p-id="2534" width="30" height="30">
                                    <path d="M512 0C230.4 0 0 230.4 0 512s230.4 512 512 512 512-230.4 512-512S793.6 0 512 0z m0 981.333333C253.866667 981.333333 42.666667 770.133333 42.666667 512S253.866667 42.666667 512 42.666667s469.333333 211.2 469.333333 469.333333-211.2 469.333333-469.333333 469.333333z" p-id="2535">
                                    </path>
                                    <path d="M672 441.6l-170.666667-113.066667c-57.6-38.4-106.666667-12.8-106.666666 57.6v256c0 70.4 46.933333 96 106.666666 57.6l170.666667-113.066666c57.6-42.666667 57.6-106.666667 0-145.066667z" p-id="2536">
                                    </path>
                                </svg>
                        }
                        <audio ref={theAudio} src={thisSong.url}></audio>
                    </div>
                    <div>
                        <svg onClick={nextSong} t="1635406983991" viewBox="0 0 1024 1024" version="1.1" xmlns="http://www.w3.org/2000/svg" p-id="3681" width="20" height="20"><path d="M655.706179 465.602819L332.053897 218.588294c-38.414608-29.327534-93.791393-1.929039-93.791392 46.396277v494.029051c0 48.325316 55.376785 75.725617 93.791392 46.398084l323.652282-247.014525c30.602722-23.357989 30.602722-69.436372 0-92.794362zM781.064814 780.798397V451.684117v-164.562559c0-19.628152 5.904521-60.475733-17.057907-75.841215-25.523642-17.068744-59.747828 1.210165-59.747828 31.919454v493.676839c0 19.628152-5.915358 60.473927 17.047069 75.841215 25.532673 17.068744 59.758666-1.211971 59.758666-31.919454z" fill="#231815" p-id="3682"></path></svg>
                    </div>
                </div>
                <div className="sider-setting">
                    <ThePlayingList></ThePlayingList>
                </div>
            </div>
        </div>
    )
}
const TheMusicPlayerUI = connect(
    state => ({
        songListFromStore: state.playingList,
        selectedSongFromStore: state.playingSong
    }),
    dispatch => ({
        setPlayingSong: (value) => dispatch({ type: 'setPlayingSong', data: value }),
        emptyPlayingList: () => dispatch({ type: "emptyPlayingList", data: [] }),
        removePlayingSong: () => dispatch({ type: "removePlayingSong", data: {} })
    })
)(TheMusicPlayer)
export default withRouter(TheMusicPlayerUI)