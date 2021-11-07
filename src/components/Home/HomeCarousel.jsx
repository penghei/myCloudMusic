import React, { useEffect, useState } from 'react'
import axios from 'axios';
import { Carousel } from 'antd';
import './css/HomeCarousel.scss'


export default function HomeCarousel(props) {
    const [picList, setList] = useState([])
    useEffect(() => {
        axios.get('/personalized/privatecontent/list?limit=6')
            .then(res => {
                let list = res.data.result
                list.forEach(obj => {
                    setList(picList => [...picList, obj.picUrl])
                })
            })
    }, [])
    return (
        <div className="carouselmain">
            <div className="carouselReplace">
                <p>网易云音乐</p>
            </div>
            <div className="carouselinner">
                <Carousel autoplay effect="fade" dots={true}>
                    {
                        picList.map((obj, index) => {
                            return (
                                <img key={index} src={obj} className="carouselPics" alt="example" />
                            )
                        })
                    }
                </Carousel></div>
        </div>
    )
}
