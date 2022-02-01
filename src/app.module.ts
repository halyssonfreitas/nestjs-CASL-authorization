import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { AuthModule } from './auth/auth.module';
import { UserModule } from './users/user.module';
import { ArticlesModule } from './articles/articles.module';
import { CaslModule } from './casl/casl.module';
import { PoliciesModule } from './policies/policies.module';

@Module({
  imports: [TypeOrmModule.forRoot(),AuthModule, UserModule, ArticlesModule, CaslModule, PoliciesModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
