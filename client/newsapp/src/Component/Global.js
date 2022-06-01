export default function changeUserName(username){
    global.username=username;
    return username;
}

export function returnUserName()
{
    console.log(global.username+"Abid");
    return global.username;
}
let appName="Trendews";
export { appName };

