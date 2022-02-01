import { Module } from '@nestjs/common';
import { ArticlesService } from './articles.service';
import { ArticlesController } from './articles.controller';
import { CaslModule } from 'src/casl/casl.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Article } from './entities/article.entity';
import { UserModule } from 'src/users/user.module';
import { PoliciesModule } from 'src/policies/policies.module';

@Module({
  imports: [
    TypeOrmModule.forFeature([Article]),
    CaslModule,
    UserModule,
  ],
  controllers: [ArticlesController],
  providers: [
    ArticlesService,
  ]
})
export class ArticlesModule { }
