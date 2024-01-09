// import userDetails from "../interfaces/userInterface";
import { userdetails } from "../models/entity/userDetails";
import { getUserChannelDetails } from "./retrieveUserChannelInfo";
import { getUserDetails } from "./retrieveUsers";



export async function runCronJob():Promise<void>{
  const users: Array<userdetails> = await getUserDetails();
  getUserChannelDetails(users)


}

