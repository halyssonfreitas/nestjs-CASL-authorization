import { Module } from '@nestjs/common';
import { CaslModule } from 'src/casl/casl.module';
import { UserModule } from 'src/users/user.module';
import { CreateArticlePolicyHandler } from './articles/create-article-policy-handler';

@Module({
  imports: [
    CaslModule,
    UserModule
  ],
  controllers: [],
  providers: [],
  exports: []
})
export class PoliciesModule { }