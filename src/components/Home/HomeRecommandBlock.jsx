import React  from 'react'
import { withRouter } from 'react-router'
import './css/HomeRecommandBlock.scss'

function HomeRecommandBlock(props) {
    const recmdBlock = props.recmdBlock
    function songListDetail(e) {
        if(e.target.tagName !== 'IMG') return;
        let selectedListObj = recmdBlock.find(obj=>{
            return obj.cover === e.target.src
        })
        props.history.push({
            pathname:'/main/songlist',
            state:selectedListObj
        })
    }
    return (
        <div className="recommandblockmain">
            <div className="recommandblock" onClick={songListDetail}>
                {
                    recmdBlock.map((obj, index) => {
                        return (
                            <div key={index} className="mainBlock">
                                <img src={obj.cover} alt="#"></img>
                                <p >{obj.name}</p>
                            </div>
                        )
                    })
                }
            </div>
        </div>
    )
}
export default withRouter(HomeRecommandBlock);