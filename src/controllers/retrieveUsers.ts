// import userDetails from "../interfaces/userInterface";
import { getRepository } from "../models/connection/postgres";
import { userdetails } from "../models/entity/userDetails";
import _ from "lodash";

export async function getUserDetails(): Promise<Array<userdetails>> {
    const appDataSource = await getRepository()

    if(!appDataSource){
        throw new Error('Error in Estabilishing connection');
    }
    const usersRepository = await appDataSource.getRepository(userdetails)
    const users = await usersRepository.find();

    if(_.isEmpty(users)){
        throw new Error('No records to process further')
    }
    return users;
}