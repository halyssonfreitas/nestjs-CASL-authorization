import { Controller, Get, Post, Body, Patch, Param, Delete, UseGuards, Request, HttpException, HttpStatus } from '@nestjs/common';
import { ApiBearerAuth, ApiNotFoundResponse, ApiTags, ApiUnauthorizedResponse } from '@nestjs/swagger';
import { JwtAuthGuard } from 'src/auth/jwt/jwt-auth.guard';
import { Action } from 'src/casl/action.enum';
import { CaslAbilityFactory } from 'src/casl/casl-ability.factory';
import { createArticlePolicyHandler } from 'src/policies/articles/create-article-policy-handler';
import { CheckPolicies } from 'src/policies/check-policies.decorator';
import { PoliciesGuard } from 'src/policies/policies-guard';
import { User } from 'src/users/entities/user.entity';
import { UserService } from 'src/users/user.service';
import { erroApiResponse } from 'src/util/dto/error-ApiResponse.dto';
import { ArticlesService } from './articles.service';
import { CreateArticleDto } from './dto/create-article.dto';
import { UpdateArticleDto } from './dto/update-article.dto';

@Controller('articles')
@ApiTags('Articles')
@UseGuards(JwtAuthGuard)
@ApiBearerAuth()
@ApiUnauthorizedResponse({
  description: 'You are unauthorized to access this endpoint.',
  type: erroApiResponse
})
@ApiNotFoundResponse({
  description: 'Some resourse was not found',
  type: erroApiResponse
})
export class ArticlesController {
  constructor(
    private readonly articlesService: ArticlesService,
    private readonly caslAbilityFactory: CaslAbilityFactory,
    private readonly userService: UserService,
  ) { }

  @Post()
  @UseGuards(PoliciesGuard)
  @CheckPolicies(createArticlePolicyHandler)
  async create(
    @Body() createArticleDto: CreateArticleDto,
    @Request() req
  ): Promise<CreateArticleDto & import("/home/halysson/projetos/nestjs-CASL-authorization/src/articles/entities/article.entity").Article> { 
    createArticleDto.author = req.user.sub
    return this.articlesService.create(createArticleDto);
  }

  @Get()
  findAll() {
    return this.articlesService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.articlesService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateArticleDto: UpdateArticleDto) {
    return this.articlesService.update(+id, updateArticleDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.articlesService.remove(+id);
  }

    // I don't use this more, but I will leave this here for remember   
    private checkPermission(user: User, action: Action, target: any|'all') {
      const ability = this.caslAbilityFactory.createForUser(user);
      if (ability.cannot(action, target)) {
        throw new HttpException("You are unauthorized to access this endpoint.", HttpStatus.UNAUTHORIZED)
      }
    }
  
    // I don't use this more, but I will leave this here for remember   
    private async getUser(req) {
      let user : User
      try {
        // More one step of validation.
        // Verify if user exists
        user = await this.userService.findOne(req.user.sub)
      } catch (error) {
        throw new HttpException("Not found this User", HttpStatus.NOT_FOUND)
      }
      return user
    }
}
