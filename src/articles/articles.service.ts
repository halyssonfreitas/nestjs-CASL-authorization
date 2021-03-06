import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateArticleDto } from './dto/create-article.dto';
import { UpdateArticleDto } from './dto/update-article.dto';
import { Article } from './entities/article.entity';
const crypto = require('crypto');

@Injectable()
export class ArticlesService {

  constructor(
    @InjectRepository(Article) private articleRepository : Repository<Article>
  ) { }

  create(createArticleDto: CreateArticleDto) {
    createArticleDto.id = crypto.randomUUID()
    createArticleDto.isPublished = true
    return this.articleRepository.save(createArticleDto);
  }

  findAll() {
    return `This action returns all articles`;
  }

  findOne(id: number) {
    return `This action returns a #${id} article`;
  }

  update(id: number, updateArticleDto: UpdateArticleDto) {
    return `This action updates a #${id} article`;
  }

  remove(id: number) {
    return `This action removes a #${id} article`;
  }
}
