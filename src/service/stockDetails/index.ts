import { KeyValue } from "../../interfaces/general.interface";

import _ from 'lodash';
import yahooFinance from 'yahoo-finance2';
import logger from "../../utils/logger";



export function comparison(price: any, condition:string, conditionPrice: any){
    conditionPrice = parseInt(conditionPrice);
    price = parseInt(price);
    switch(condition){
        case "gte":
            return price > conditionPrice;
        case "lte":
            return price < conditionPrice;
        default:
            logger.info('Invalid Operation from comparison operator')
    }
}


export function comparisonText(stockName: string, condition: string, price: number, currentPrice: number){
    switch(condition){
        case "gte":
            return `Price of ${stockName} has become greater than ${price}. Current Price is ${currentPrice}\n`;
        case "lte":
            return  `Price of ${stockName} has become less than ${price}. Current Price is ${currentPrice}\n`
        default:
            return;
    }
}


export function alertLogic(currentPrice: number, alertCondition:Array<KeyValue>, message:string, stockName: string) {
    for(let alert of alertCondition){
       let {condition, price} = alert;
       if(comparison(currentPrice, condition, price)){
        message += comparisonText(stockName, condition, price, currentPrice);
       }
    }
    return message;
}


export async function processAlertMessage(stockInfo: Array<KeyValue> ) : Promise<KeyValue> {
    let message = "";
    let userMessage = new Map();
    for(let stockDetail of stockInfo){
        const { alertInfo, username, stockName} = stockDetail;

        const quote: any = await yahooFinance.quote(stockName);
        message = userMessage.has(username) ? `${userMessage.get(username)}` : ""
        const alertMessage = await alertLogic(quote?.regularMarketPrice, alertInfo, message, stockName);
        if(!_.isEmpty(alertMessage)) {
            userMessage.set(username, alertMessage)
        }
    }
    return userMessage;
}


