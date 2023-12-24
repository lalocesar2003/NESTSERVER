import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { User } from './user.entity';

@Injectable()
export class UsersService {
    
    constructor(@InjectRepository(User) private repo:Repository<User>){}
        create(email:string,password:string){
            const user = this.repo.create({email,password});
            return this.repo.save(user);
        }
      findone(id:number){
          return this.repo.findOne({ where: { id } });
      }
      find(email:string){
          return this.repo.find({where:{email}});
      }
      async remove(id:number){
        const user = await this.findone(id);
        if(!user){
            throw new Error('user not found');
        }
        return this.repo.remove(user);
    }
    async update(id:number,attrs:Partial<User>){
        const user = await this.findone(id);
        if(!user){
            throw new Error('user not found');
        }
        Object.assign(user,attrs);
        return this.repo.save(user);
    }
}

