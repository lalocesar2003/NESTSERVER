import {Body, Controller, Get, Post, Param, Query, Delete, Patch,NotFoundException,UseInterceptors,ClassSerializerInterceptor} from '@nestjs/common';
import { createUserDto } from './dtos/create-user.dto';
import { UsersService } from './users.service';
import { UpdateUserDto } from './dtos/update-user.dto';
import { SerializeInterceptor,Serialize } from '../interceptors/serialize.interceptor';
import { UserDto } from './dtos/user.dto';


@Controller('users')
@Serialize(UserDto)
export class UsersController {
    constructor(private usersService: UsersService){}

@Post('/signup')
createUser(@Body() body: createUserDto){
this.usersService.create(body.email,body.password);
}

//@UseInterceptors(new SerializeInterceptor(UserDto))
@Get('/:id')
async findUser(@Param('id') id: string){
    console.log('handler is running');
    
    const user= await this.usersService.findone(parseInt(id));
    if(!user){
        throw new NotFoundException('user not found');
    }
    return user;
}
@Get()
findAllUsers(@Query('email') email: string){
    return this.usersService.find(email);
}
@Delete('/:id')
removeUser(@Param('id') id: string){
    return this.usersService.remove(parseInt(id));
}
@Patch('/:id')
updateUser(@Param('id') id: string,@Body() body: UpdateUserDto){
    return this.usersService.update(parseInt(id),body);

}
}