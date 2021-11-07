export default function User(pre = {},act){
    const {type,data} = act;
    switch (type) {
        case "setUserData":
            return data
        default:
            return pre;
    }
}