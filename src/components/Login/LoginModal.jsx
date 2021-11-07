import React, { useEffect, useState } from 'react';
import { connect } from 'react-redux'
import axios from 'axios';
import { Modal, Button, message, Avatar, Form, Input } from 'antd';
import { UserOutlined, LogoutOutlined } from '@ant-design/icons';
import './css/LoginModal.scss'
const { confirm } = Modal;

const Loginmodal = (props) => {
    const [visible, setVisible] = useState(false);
    const [loading, setLoading] = useState(false);
    const [onlineUser, setUser] = useState({})
    const [form] = Form.useForm();
    const handleCancel = () => {
        setVisible(false);
    }
    const handleOpen = () => {
        setVisible(true)
    }
    const handleNone = () => { }
    const handleLogout = () => {
        confirm({
            title: '退出登录',
            content: '确定退出登录?',
            onOk() {
                axios.get('/logout')
                    .then(res => {
                        setUser({})
                        props.setUserData({})
                    })
            }
        })
    }
    const handleLogin = () => {
        const formValues = form.getFieldsValue()
        let userName = formValues.username;
        let userCode = formValues.password;
        if (userName === '' || userCode === '') return;
        setLoading(true);
        axios.get(`/login/cellphone?phone=${userName}&password=${userCode}`)
            .then(res => {
                let loginMsg = res.data
                console.log(loginMsg)
                if (loginMsg.code === 502) {
                    message.error(loginMsg.msg)
                } else if (loginMsg.code === 200) {
                    message.success("登录成功")
                    let theUser = {
                        name: loginMsg.profile.nickname,
                        id: loginMsg.profile.userId,
                        avatar: loginMsg.profile.avatarUrl,
                    }
                    if (JSON.stringify(onlineUser) === '{}') {
                        setUser(theUser)
                        setLoading(false);
                        setVisible(false);
                    }
                    props.setUserData({ theUser })
                }
            })
    }
    useEffect(() => {
        axios.get('/login/status')
            .then(res => {
                let status = res.data.data
                if (status.code !== 200) return;
                else {
                    let theUser = {
                        name: status.profile.nickname,
                        id: status.profile.userId,
                        avatar: status.profile.avatarUrl,
                    }
                    setUser(theUser)
                    setLoading(false);
                    setVisible(false);
                }
            })
    }, [])
    return (
        <div className="userblock">
            <div className="avatar">
                {
                    JSON.stringify(onlineUser) === '{}'
                        ? <Avatar icon={<UserOutlined />} />
                        : (<Avatar src={onlineUser.avatar} />)
                }
            </div>
            <div className="username" onClick={JSON.stringify(onlineUser) === '{}' ? handleOpen : handleNone} >{onlineUser.name || "未登录"}</div>
            {
                JSON.stringify(onlineUser) === '{}'
                    ? <div></div>
                    : (<div onClick={handleLogout}><LogoutOutlined /></div>)
            }
            <Modal></Modal>
            <Modal
                title="登录账号"
                visible={visible}
                confirmLoading={loading}
                onCancel={handleCancel}
                footer={[]}
            >
                <Form
                    form={form}
                    name="basic"
                    labelCol={{ span: 6 }}
                    wrapperCol={{ span: 16 }}
                    autoComplete="off"
                >
                    <Form.Item
                        label="邮箱"
                        name="username"
                        rules={[{ required: true, message: '请输入网易云音乐邮箱' }]}
                    >
                        <Input />
                    </Form.Item>

                    <Form.Item
                        label="密码"
                        name="password"
                        rules={[{ required: true, message: '请输入密码' }]}
                    >
                        <Input.Password />
                    </Form.Item>
                    <Form.Item wrapperCol={{ offset: 8, span: 16 }}>
                        <Button type="danger" shape="round" size="large" onClick={handleLogin}>
                            登录
                        </Button>
                    </Form.Item>
                </Form>
            </Modal>
        </div>
    );
}

export default connect(
    dispatch => ({
        setUserData: (value) => dispatch({ type: 'setUserData', data: value })
    })
)(Loginmodal)