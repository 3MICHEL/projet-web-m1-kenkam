import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { BooksService } from './books.service';
import { CreateBookDto } from './dto/create-book.dto';

@Controller('books')
export class BooksController {
  constructor(private readonly booksService: BooksService) {}

  @Post()
  create(@Body() createBookDto: CreateBookDto) {
    return this.booksService.Add(createBookDto);
  }

  @Get()
  findAll() {
    return this.booksService.FindAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.booksService.FindOne(id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateBookDto: CreateBookDto) {
    return this.booksService.Update(id, updateBookDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.booksService.Delete(id);
  }
}
