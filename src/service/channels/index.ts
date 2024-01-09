



import { KeyValue } from "../../interfaces/general.interface";
import { Telegram } from "./telegram";

export function findChannelApi() {
    return Telegram.getInstance(); // To add more channels later
}



export async function sendNotification(userDetail: Map<String, KeyValue>, userMessage: KeyValue): Promise<void> {
    console.log(userMessage, 'Messaeg')
    console.log(userDetail, 'DEtails')
    for(let [userEmail, channel] of userDetail){
        const instance = findChannelApi(); // No other integrations currently so
        console.log(userEmail,'Inside...')
        instance.sendMessage(channel["telegram"], userMessage.get(userEmail));

       
    }
}