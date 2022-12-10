import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { User } from './models';
import { GithubProfile } from './interfaces';

@Injectable()
export class AuthService {
  constructor(
    @InjectModel(User)
    private readonly userModel: typeof User
  ) {}

  async findUserById(id: number): Promise<User> {
    return this.userModel.findOne({ where: { id } });
  }

  async findOrCreateUser(githubProfile: GithubProfile): Promise<User> {
    const [user] = await this.userModel.findOrCreate({
      where: { githubId: String(githubProfile.id) },
      defaults: { username: githubProfile.username },
    });

    return user;
  }
}
