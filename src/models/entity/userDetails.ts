import { Entity, Column, PrimaryColumn } from "typeorm";
import { KeyValue } from '../../interfaces/general.interface';


type userDetailType = { username: string; password: string; name: string; age: number; channel: Record<string, any> };

@Entity()
export class userdetails {
    @PrimaryColumn()
    username: string

    @Column()
    password: string

    @Column()
    name: string

    @Column()
    age: number

    @Column('json')
    channel: Record<string, any>

    constructor({ age, username, password, name, channel }: userDetailType) {
        this.name = name;
        this.username = username;
        this.password = password;
        this.age = age;
        this.channel = channel
      }
}