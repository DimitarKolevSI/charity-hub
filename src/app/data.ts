import { APP_INITIALIZER } from '@angular/core';
import { User } from 'src/app/models/User';

export class db{
    private users:User[]
    constructor()
    {
        this.init()
    }

    init(): void
    {
        this.users.push(new User('dimitar','123456'))
        this.users.push(new User('ivana','ivana99'))
        this.users.push(new User('ivanatoneva99','123456'))
        this.users.push(new User('xxPussySlayerxx','sexbog34'))
    }

    getUserByUsername(username:string):User
    {
        for(let user of this.users){
            if(user.username === username) return user;
        }
        return null;
    }
}