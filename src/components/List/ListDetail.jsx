import React, { useLayoutEffect, useState } from 'react';
import PubSub from 'pubsub-js';
import { Button} from 'antd';
import './css/ListDetail.scss'

const ListDetail = (props) => {
    const [selectedListObj,setSelectedObj] = useState({})
    useLayoutEffect(()=>{
        if(props.selectedList !== undefined && props.selectedList !== {}) setSelectedObj(props.selectedList)
        // eslint-disable-next-line
    },[])
    function playAllSongs(){
        PubSub.publish('ifGetAllSongs',true)
    }
    return (
        <div className="listdetailmain">
            <div className="listdetail-pic">
                <img src={selectedListObj.cover} alt=" "></img>
            </div>
            <div className="listdetail-desp">
                <div className="desp-head">
                    <h2>{selectedListObj.name}</h2>
                </div>
                <div className="desp-main">
                    <p>标签:
                        {
                            selectedListObj.tags === undefined  ? '' : selectedListObj.tags.toString()
                        }
                    </p>
                    <p>歌曲数: {selectedListObj.trackCount}  播放数: {selectedListObj.playCount}</p>
                    <p className="desp">简介:{selectedListObj.description}</p>
                </div>
                <div className="desp-footer">
                    <Button type="danger" shape="round"  size='large' onClick={playAllSongs}>
                       播放全部
                    </Button>
                </div>
            </div>
        </div>
    );
}

export default ListDetail;
