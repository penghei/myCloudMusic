import React from 'react'
import { withRouter } from 'react-router'
import ListDetail from '../../../components/List/ListDetail'
import ListSongs from '../../../components/List/ListSongs'
import './SongListPage.scss'

function SongListPage(props) {
    const selectedListObj = props.location.state
    return (
        <div className="songmain">
            <div className="detail">
                <ListDetail selectedList={selectedListObj}></ListDetail>
            </div>
            <div className="list">
                <ListSongs selectedList={selectedListObj}></ListSongs>
            </div>
        </div>
    )
}
export default withRouter(SongListPage);