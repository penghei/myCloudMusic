import React from 'react'
import { withRouter } from 'react-router'
import Loginmodal from '../Login/LoginModal';
import { Menu } from 'antd';
import './css/TheSider.scss'

const { SubMenu } = Menu;

function TheSider(props) {
    function handleClick(e) {
        console.log(e.key)
    }
    return (
        <div className="thesidermain">
            <Menu mode="inline" onClick={handleClick}>
                <Menu.Item key="login">
                <Loginmodal></Loginmodal>
                </Menu.Item>
                <Menu.Item key="recommand">
                    发现音乐
                </Menu.Item>
                <SubMenu key="my" title="我的音乐">
                    <Menu.Item key="download">下载管理</Menu.Item>
                    <Menu.Item key="star">我的收藏</Menu.Item>
                    <Menu.Item key="user">我的音乐云盘</Menu.Item>
                </SubMenu>
            </Menu>
        </div>
    )
}
export default withRouter(TheSider)