import React, { useEffect, useLayoutEffect, useState } from 'react';
import { connect } from 'react-redux'
import { withRouter } from 'react-router';
import PubSub from 'pubsub-js';
import axios from 'axios';
import useLocalStorageState from 'use-local-storage-state'
import "./css/MusicLyrics.scss"

const Musiclyrics = (props) => {
    const theSong = props.selectedSongFromStore
    const [allLyric, setAllLyric] = useState([])
    const [activeIndex,setActIndex] = useState(0)
    const [partLyric, setPartLyric ,{removeItem}] = useLocalStorageState('partLyricStore',[])
    useEffect(() => { 
        if (JSON.stringify(theSong) !== '{}') {
            axios.get(`/lyric?id=${theSong.id}`)
                .then(res => {
                    let lyTimes = [], lyInners = []
                    if(res.data.lrc === undefined){
                        setPartLyric([{
                            time:0,
                            inner:'暂无歌词,享受音乐'
                        }])
                        return;
                    }
                    let pre = res.data.lrc.lyric;
                    let lyric = pre.split("\n")
                    lyric.forEach(str => {
                        if (str === "") return
                        let [lyTime, lyInner] = str.split("]")
                        lyTimes.push(lyTime.slice(1));
                        lyInners.push(lyInner)
                    })
                    matchLyric(lyTimes, lyInners)
                })
        }
        // eslint-disable-next-line
    }, [theSong])
    useLayoutEffect(() => {
        let sub = PubSub.subscribe("playedTime", (_, data) => {
            let nowTime = parseInt(data)
            let foundIndex = allLyric.findIndex(obj => obj.time === nowTime)
            if (foundIndex !== -1) {
                let foundIndexDec = foundIndex - 5 < 0 ? 0 : foundIndex - 5
                let foundIndexInc = foundIndex + 6 > allLyric.length ? allLyric.length : foundIndex + 6
                if(foundIndex <= 5){
                    setActIndex(foundIndex+1)
                }else if(foundIndex <= 3){
                    foundIndexInc =  10 + foundIndex
                }else{
                    setActIndex(6)
                }
                let part = allLyric.slice(foundIndexDec, foundIndexInc)
                setPartLyric(part)
            }
        })
        let sub_1 = PubSub.subscribe("changePlayingSong",(_,data)=>{
            if(data){
                removeItem();
            }
        })
        return () => {
            PubSub.unsubscribe(sub)
            PubSub.unsubscribe(sub_1)
        }
    })
    function matchLyric(lyTimes, lyInners) {
        let lyObjs = [], lyTimeSum = [];
        lyTimes.forEach(strT => {
            let time = strT.split(":").map(str => Number(str))
            let timeSum = parseInt(time[0] * 60 + time[1])
            lyTimeSum.push(timeSum)
        })
        for (let i = 0; i < lyTimeSum.length; i++) {
            let lyObj = {
                time: lyTimeSum[i],
                inner: lyInners[i]
            }
            lyObjs.push(lyObj)
        }
        setAllLyric(lyObjs)
    }
    return (
        <div className="lyricsMain">
            <div className="songTitle">
                <p>{theSong.name}</p>
                <p>歌手:{theSong.singer}</p>
            </div>
            <div className="mainLyrics">
                {
                    partLyric.map((obj, index) => {
                        return (
                            <p 
                            key={index}
                            style={index===activeIndex-1?{fontWeight:'bolder',color:'black'}:{fontWeight:'normal'}}
                            >{obj.inner}</p>
                        )
                    })
                }
            </div>
        </div>
    );
}

const MusicLyricsUI = connect(
    state => ({
        selectedSongFromStore: state.playingSong
    }),
    
)(Musiclyrics)
export default withRouter(MusicLyricsUI);

