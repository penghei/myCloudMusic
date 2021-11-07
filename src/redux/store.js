import {combineReducers, createStore} from 'redux'
import {composeWithDevTools} from 'redux-devtools-extension'
import user from './reducer/user'
import musicLyric from './reducer/musicLyric'
import playingSong from './reducer/playingSong'
import playingList from './reducer/playingList'

const Reducers = combineReducers({
    musicLyric,
    user,
    playingSong,
    playingList
})
export default createStore(Reducers,composeWithDevTools())