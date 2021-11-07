import React, { useEffect, useState } from 'react'
import HomeRecommandBlock from '../../../components/Home/HomeRecommandBlock'
import axios from 'axios'
import './RankListPage.scss'

export default function RankListPage() {
    const [recmdBlock, setBlock] = useState([])
    useEffect(() => {
        axios
            .get('/toplist')
            .then((res) => {
                console.log(res.data)
                let songLists = res.data.list;
                let newList = []
                songLists.forEach((obj) => {
                    let songListObj = {
                        cover: obj.coverImgUrl,
                        name: obj.name,
                        id: obj.id,
                        tags: obj.tags,
                        playCount: obj.playCount,
                        description: obj.description,
                        trackCount: obj.trackCount
                    }
                    newList.push(songListObj)
                })
                setBlock(newList)
            })

    }, [])
    return (
        <div className="ranklist">
            <HomeRecommandBlock recmdBlock={recmdBlock}></HomeRecommandBlock>
        </div>
    )
}
