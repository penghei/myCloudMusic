export default function playingSong(state={},act){
    const {type,data} = act;//正在播放的歌曲
    switch (type) {
        case "setPlayingSong":
            return data;
        case "removePlayingSong":
            return {}
        default:
            return state;
    }
}