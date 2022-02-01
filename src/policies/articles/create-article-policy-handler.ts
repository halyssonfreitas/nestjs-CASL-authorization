import { Injectable } from '@nestjs/common';
import { Article } from 'src/articles/entities/article.entity';
import { Action } from 'src/casl/action.enum';
import { AppAbility } from 'src/casl/casl-ability.factory';
import { IPolicyHandler } from '../i-policy-handler'

@Injectable()
export class CreateArticlePolicyHandler implements IPolicyHandler {
    handle(ability: AppAbility) {
        return ability.can(Action.Create, Article);
    }
}
export const createArticlePolicyHandler = new CreateArticlePolicyHandler()