import { Injectable } from '@nestjs/common';
import { CreateAuthorDto } from './dto/create-author.dto';
import { UpdateAuthorDto } from './dto/update-author.dto';
import { faker } from '@faker-js/faker';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Author, AuthorDocument } from './entities/author.entity';

@Injectable()
export class AuthorsService {
  //remove(arg0: number) {
  //   throw new Error('Method not implemented.');
  // }
  constructor(@InjectModel(Author.name) private userModel: Model<AuthorDocument>) {}
  Add(body: CreateAuthorDto) {
    return this.userModel.create(body);
  }

  FindAll() {
    return this.userModel.find();
  }

  FindOne(id: string) {
    return this.userModel.findOne({ _id: id });
  }

  Update(id: string, body: CreateAuthorDto) {
    return this.userModel.findByIdAndUpdate(
      { _id: id },
      { $set: body },
      { new: true },
    );
  }

  Delete(id: string) {
    return this.userModel.remove({ _id: id });
  }

  Search(key: string) {
    const keyword = key
      ? {
          $or: [
            { fullname: { $regex: key, $options: 'i' } },
            { email: { $regex: key, $options: 'i' } },
          ],
        }
      : {};
    return this.userModel.find(keyword);
  }

  Faker() {
    for (let index = 0; index < 30; index++) {
      const fakeUser = {
        firstname: faker.name.fullName(),
        lastname: faker.name.lastName(),
      };
      this.userModel.create(fakeUser);
    }
    return 'success';
  }
}
