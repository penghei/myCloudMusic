import React from 'react'
import { withRouter } from 'react-router';
import Searchinginput from '../Search/SearchingInput';
import { Menu } from 'antd';
import './css/TheNavList.scss'

function TheNavList(props) {

    function handleClick(e) {
        let navKey = e.key
        props.history.push(`/main/${navKey}`)
    }
    return (
        <div className="navlistmain">
            <div className="nav-sider"></div>
            <div className="nav-main">
                <Menu mode="horizontal" onClick={handleClick}>
                    <Menu.Item key="recommand" >
                        个性推荐
                    </Menu.Item>
                    <Menu.Item key="rank" >
                        排行榜
                    </Menu.Item>
                    <Menu.Item key="music" >
                        正在播放
                    </Menu.Item>
                </Menu>
            </div>
            <div className="nav-sider">
                <Searchinginput></Searchinginput>
            </div>
        </div>
    )
}
export default withRouter(TheNavList);