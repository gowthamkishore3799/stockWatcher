import { Entity, Column, PrimaryColumn } from "typeorm";



type userDetailType = { username: string; password: string; name: string; age: number };

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

    constructor({ age, username, password, name }: userDetailType) {
        this.name = name;
        this.username = username;
        this.password = password;
        this.age = age;
      }
}