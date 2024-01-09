import axios from 'axios'
import qs from 'qs';
import * as dotenv from 'dotenv';
import logger from '../../utils/logger';
import { KeyValue } from '../../interfaces/general.interface';
import _ from 'lodash'
dotenv.config();


export class Telegram {
    private static instance: Telegram; 
    private static BOTTOKEN = process.env.TELEGRAM_BOTTOKEN;
    public static getInstance(): Telegram{
        if(!Telegram.instance){
            Telegram.instance = new Telegram();
        }
        return Telegram.instance;
    }


    private static async sendMessage(message: String, chat_id:String) {

        try{
        let data = qs.stringify({
            'chat_id': chat_id,
            'text': message
        });
        console.log(data, 'Data...')
        const config = {
            method: 'post',
            maxBodyLength: Infinity,
            url: `https://api.telegram.org/${Telegram.BOTTOKEN}/sendMessage`,
            headers: { 
              'Content-Type': 'application/x-www-form-urlencoded'
            },
            data : data
        };


        return await axios.request(config);
    }catch(e) {
        logger.error('Error in Sending Message');
    }
          




    }

    public sendMessage(channelOptions: KeyValue, message:String){
        if(_.isEmpty(message)){
            logger.info('Empty message')
            return;
        }
        Telegram.sendMessage(message, channelOptions.chat_id)
    }
}