import React from 'react'
import { withRouter } from 'react-router'
import { connect } from 'react-redux'
import MusicLyrics from '../../components/Music/MusicLyrics'
import './MusicDetailPage.scss'

function MusicDetailPage(props) {
    const theSong = props.selectedSongFromStore
    
    return (
        <div className="musicmain">
            <div className="main">
                <div className="songdetail">
                    <div className="songCover">
                        <img src={theSong.cover || "https://i.loli.net/2021/11/03/CM6T9AamqOUgRzb.png"} alt="网易云音乐"></img>
                    </div>
                    <div className="songLyrics">
                        <MusicLyrics></MusicLyrics>
                    </div>
                </div>
                <div className="commitblock">
                    <div className="commit"></div>
                    <div className="recommand"></div>
                    
                </div>
            </div>
        </div>
    )
}
const MusicDetailPageUI = connect(
    state => ({
        selectedSongFromStore: state.playingSong
    }),
)(MusicDetailPage)
export default withRouter(MusicDetailPageUI)
