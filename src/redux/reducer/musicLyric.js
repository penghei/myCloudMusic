export default function musicLyric(pre=[],act){
    const {type,data} = act;
    switch (type) {
        case "setPlayingMusicLyric":
            return data;
        default:
            return pre;
    }
}