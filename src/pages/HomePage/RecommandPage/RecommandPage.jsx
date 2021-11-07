import React,{ useEffect ,useState} from 'react';
import axios from 'axios'
import HomeCarousel from '../../../components/Home/HomeCarousel';
import HomeLatestBlock from '../../../components/Home/HomeLatestBlock';
import HomeRecommandBlock from '../../../components/Home/HomeRecommandBlock';
import './RecommandPage.scss'

const Recommandpage = () => {
    const [recmdBlock, setBlock] = useState([])
    useEffect(() => {
        axios
            .get('/top/playlist?limit=10&order=hot')
            .then((res) => {
                let songLists = res.data.playlists;
                let newList = []
                songLists.forEach((obj) => {
                    let songListObj = {
                        cover: obj.coverImgUrl,
                        name: obj.name,
                        id: obj.id,
                        tags: obj.tags,
                        playCount: obj.playCount,
                        description: obj.description,
                        trackCount:obj.trackCount
                    }
                    newList.push(songListObj)
                })
                setBlock(newList)
            })
            
    }, [])
    return (
        <div className="recommandmain">
            <div className="sider"></div>
            <div className="main-main">
                <div className="block-carousel">
                    <HomeCarousel></HomeCarousel>
                </div>
                <div className="block-recommand">
                    <HomeRecommandBlock recmdBlock={recmdBlock}></HomeRecommandBlock>
                </div>
                <div className="block-latest">
                    <HomeLatestBlock></HomeLatestBlock>
                </div>
            </div>
            <div className="sider"></div>
        </div>
    );
}

export default Recommandpage;
