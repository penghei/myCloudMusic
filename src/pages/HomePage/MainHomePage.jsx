import React from 'react'
import { Redirect, Route, BrowserRouter as Router, Switch ,withRouter} from 'react-router-dom'
import TheMusicPlayer from '../../components/Constant/TheMusicPlayer'
import TheNavList from '../../components/Constant/TheNavList'
import TheSider from '../../components/Constant/TheSider'
import MusicDetailPage from '../MusicPage/MusicDetailPage'
import RankListPage from './RankListPage/RankListPage'
import Recommandpage from './RecommandPage/RecommandPage'
import SearchingPage from './SearchResultPage/SearchingPage'
import SongListPage from './SongListPage/SongListPage'
import UserPage from './UserPage/UserPage'
import './MainHomePage.scss'

function MainHomePage(props) {
    return (
        <div id="all">
            <div id="header">
                <TheNavList></TheNavList>
            </div>
            <div id="main">
                <div id="sider-block">
                    <TheSider></TheSider>
                </div>
                <div id="main-block" key={props.location.key}>
                    <Router>
                        <Switch>
                            <Route path="/main/recommand" component={Recommandpage}></Route>
                            <Route path="/main/music" component={MusicDetailPage}></Route>
                            <Route path="/main/songlist" component={SongListPage}></Route>
                            <Route path="/main/search" component={SearchingPage}></Route>
                            <Route path="/main/user" component={UserPage}></Route>
                            <Route path="/main/rank" component={RankListPage}></Route>
                            <Redirect to="/main/recommand" />
                        </Switch>
                    </Router>

                </div>
            </div>
            <div id="footer">
                <TheMusicPlayer></TheMusicPlayer>
            </div>
        </div>
    )
}
export default withRouter(MainHomePage)