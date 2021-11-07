//播放列表
export default function playingList(state=[],act){
    const {type,data} = act
    switch (type) {
        case "setNewPlayingList":
            return [...data,...state];
        case "addToPlayingList":
            return [data,...state];
        case "emptyPlayingList":
            return [];
        default:
            return state;
    }
}