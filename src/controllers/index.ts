// import userDetails from "../interfaces/userInterface";
import { userdetails } from "../models/entity/userDetails";
import { getUserDetails } from "./retrieveUsers";




export async function setCronJob():Promise<void>{
  const users: Array<userdetails> = await getUserDetails();


}

