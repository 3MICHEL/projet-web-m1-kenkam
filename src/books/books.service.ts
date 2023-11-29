import { Injectable } from '@nestjs/common';
import { CreateBookDto } from './dto/create-book.dto';
import { UpdateBookDto } from './dto/update-book.dto';
import { Book, BookDocument } from './entities/book.entity';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { faker } from '@faker-js/faker';

@Injectable()
export class BooksService {
  constructor(@InjectModel(Book.name) private userModel: Model<BookDocument>) {}
  Add(body: CreateBookDto) {
    return this.userModel.create(body);
  }

  FindAll() {
    return this.userModel.find();
  }

  FindOne(id: string) {
    return this.userModel.findOne({ _id: id });
  }

  Update(id: string, body: CreateBookDto) {
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
        name: faker.name.firstName(),
        authorId: faker.name.firstName(),
      };
      this.userModel.create(fakeUser);
    }
    return 'success';
  }
}
