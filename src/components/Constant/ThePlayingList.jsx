import React, { useEffect, useState } from 'react'
import { connect } from 'react-redux'
import { withRouter } from 'react-router';
import { Drawer, Button } from 'antd';
import { DeleteOutlined } from '@ant-design/icons';
import Pubsub from 'pubsub-js'
import './css/ThePlayingList.scss'



function ThePlayingList(props) {
    const songList = props.songListFromStore;
    const [visible, setVisible] = useState(false);
    const [drawerWidth, setDrawerWidth] = useState(500)
    const screenWidth = document.body.clientWidth
    const showDrawer = () => {
        setVisible(true);
    };
    const onClose = () => {
        setVisible(false);
    };
    const emptySongList = () => {
        props.emptyPlayingList()
        Pubsub.publish("emptySongList", true)
    }
    const getSelectedSong = (index, songObj) => {
        props.setPlayingSong(songObj)
    }
    useEffect(() => {
        if (screenWidth < 800 && screenWidth >= 500) {
            setDrawerWidth(400)
        } else if (screenWidth < 500) {
            setDrawerWidth(250)
        }

    }, [screenWidth]);
    return (
        <div>
            <div onClick={showDrawer}>
                <svg t="1635407212844" viewBox="0 0 1024 1024" version="1.1" xmlns="http://www.w3.org/2000/svg" p-id="4302" width="20" height="20"><path d="M426.666667 874.666667a21.333333 21.333333 0 0 1-21.333334 21.333333H64a21.333333 21.333333 0 0 1 0-42.666667h341.333333a21.333333 21.333333 0 0 1 21.333334 21.333334zM64 128h896a21.333333 21.333333 0 0 0 0-42.666667H64a21.333333 21.333333 0 0 0 0 42.666667z m0 384h597.333333a21.333333 21.333333 0 0 0 0-42.666667H64a21.333333 21.333333 0 0 0 0 42.666667z m896 341.333333h-85.333333a21.333333 21.333333 0 0 0 0 42.666667h85.333333a21.333333 21.333333 0 0 0 0-42.666667z m-114-385.333333a21.18 21.18 0 0 1-4.36-2.186667A140.893333 140.893333 0 0 1 810.666667 438v436.666667c0 15.633333-4.5 30.666667-13.38 44.666666-8.053333 12.666667-19.333333 23.94-33.613334 33.44-27.64 18.433333-64 28.58-102.34 28.58s-74.666667-10.146667-102.34-28.58c-14.253333-9.5-25.56-20.746667-33.613333-33.44-8.88-14-13.38-29.013333-13.38-44.666666s4.5-30.666667 13.38-44.666667c8.053333-12.666667 19.333333-23.94 33.613333-33.44C586.666667 778.146667 622.98 768 661.333333 768s74.666667 10.146667 102.34 28.58c1.48 0.98 2.913333 2 4.326667 3.006667V320a21.333333 21.333333 0 0 1 42.626667-1.266667c1.073333 18.04 5.806667 52.666667 25.446666 82.08 7.713333 11.553333 16.846667 21.006667 27.153334 28.133334 13.853333 5.513333 26.453333 14.113333 37.493333 25.606666 22.813333 23.753333 32.966667 53.493333 37.466667 74.266667a21.333333 21.333333 0 1 1-41.706667 9.026667c-2.726667-12.586667-9.8-36.313333-26.533333-53.733334-7.18-7.446667-15.24-12.886667-23.946667-16.113333z m-78 406.666667c0-20.82-17.54-35.62-28-42.586667-20.666667-13.806667-48.666667-21.413333-78.666667-21.413333s-58 7.606667-78.666666 21.413333c-10.453333 6.966667-28 21.766667-28 42.586667s17.54 35.62 28 42.586666c20.706667 13.806667 48.666667 21.413333 78.666666 21.413334s58-7.606667 78.666667-21.413334c10.46-6.966667 28-21.766667 28-42.586666z" fill="#5C5C66" p-id="4303"></path></svg>
            </div>
            <Drawer title="播放列表" placement="right" onClose={onClose} visible={visible} width={drawerWidth}>
                <div className="songListSettings">
                    <p>{`总${songList.length}首`}</p>
                    <Button onClick={emptySongList} type="danger" shape="circle" icon={<DeleteOutlined />} size="middle" ></Button>
                </div>
                {
                    songList.map((obj, index) => {
                        return (
                            <div
                                className="singleSong"
                                key={index}
                                onClick={((e) => { return () => { getSelectedSong(e, obj) } })(index)}
                            >
                                <p>{obj.name}</p>
                                <p>{obj.singer}</p>
                                <p>{obj.duration}</p>
                            </div>
                        )
                    })
                }
            </Drawer>
        </div>
    )
}
const ThePlayingListUI = connect(
    state => ({
        songListFromStore: state.playingList,
    }),
    dispatch => ({
        setPlayingSong: (value) => dispatch({ type: 'setPlayingSong', data: value }),
        emptyPlayingList: () => dispatch({ type : 'emptyPlayingList', data: []})
    })
)(ThePlayingList)
export default withRouter(ThePlayingListUI)
