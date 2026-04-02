import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Users } from './users.entity';
import { Repository } from 'typeorm';
// import { UserCreateDTO } from './users.dto';

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(Users)
    private userRepository: Repository<Users>,
  ) {}

  findAll() {
    return this.userRepository.find();
  }

  createUser(body: any) {
    const email = body.email;
    const firstName = body.firstName;
    const user = this.userRepository.create({ email, firstName, role: 'user' });
    this.userRepository.save(user);
  }
}
