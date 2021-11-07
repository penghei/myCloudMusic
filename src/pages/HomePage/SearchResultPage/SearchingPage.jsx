import React, { useEffect, useState } from 'react'
import axios from 'axios'
import ListSongs from '../../../components/List/ListSongs'
import './SearchingPage.scss'


export default function SearchingPage(props) {
    const [searchResList,setResList] = useState([])
    let searchInput = props.location.state
    useEffect(()=>{
        axios.get(`/search?keywords=${searchInput}&limit=20`)
        .then(res=>{
            let searchRes = res.data.result.songs
            searchRes.forEach(obj=>{
                axios.get(`/song/url?id=${obj.id}`)
                .then(res=>{
                    let songObj = {
                        name:obj.name,
                        id:obj.id,
                        singer:obj.artists[0].name,
                        url:res.data.data[0].url,
                        cover:''
                    }
                    setResList(searchResList=>[...searchResList,songObj])
                })
            })
        })
        // eslint-disable-next-line
    },[])
    return (
        <div className="searchingmain">
            <div className="head">
                <h1>{searchInput}</h1>
                <p>共{searchResList.length||0}条搜索结果</p>
            </div>
            <div className="list">
                <ListSongs searchRes={searchResList}></ListSongs>
            </div>
        </div>
    )
}
