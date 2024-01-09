
import { map } from "lodash";
import { KeyValue } from "../interfaces/general.interface";
import UserStockDetailsModel from "../models/connection/mongodb"
import { userdetails } from "../models/entity/userDetails";
import { processAlertMessage } from "../service/stockDetails";
import { sendNotification } from "../service/channels";


export function findUserEmails(userInfo: Array<userdetails>): Array<String> {
    const userEmail = userInfo.map((userdetails)=> userdetails.username);
    return userEmail;
}

export function findUserChannel(userInfo: Array<userdetails>): Map<String, KeyValue> {
    let userDetail: Map<String, KeyValue> = new Map();
    for(let user of userInfo){
        userDetail.set(user.username, user.channel);
    }
    return userDetail;
}



export async function getUserChannelDetails(userInfo: Array<userdetails>): Promise<void> {
    const userEmails = findUserEmails(userInfo);
    const userChannel = findUserChannel(userInfo);
    const alertDetails: Array<KeyValue> = await UserStockDetailsModel.find({ username: {$in: userEmails}}).lean();

    const messagetoSend = await processAlertMessage(alertDetails);
    sendNotification(userChannel, messagetoSend);


    /**
     * Find alert info,
     */
    // console.log(response, 'Response....')
}