import { CanActivate, ExecutionContext, HttpException, HttpStatus, Injectable } from "@nestjs/common";
import { Reflector } from "@nestjs/core";
import { AppAbility, CaslAbilityFactory } from "src/casl/casl-ability.factory";
import { User } from "src/users/entities/user.entity";
import { UserService } from "src/users/user.service";
import { CHECK_POLICIES_KEY } from "./check-policies.decorator";
import { PolicyHandler } from "./i-policy-handler";

@Injectable()
export class PoliciesGuard implements CanActivate {
  constructor(
    private reflector: Reflector,
    private caslAbilityFactory: CaslAbilityFactory,
    private readonly userService: UserService
  ) {}

  async canActivate(context: ExecutionContext): Promise<boolean> {
    const policyHandlers =
      this.reflector.get<PolicyHandler[]>(
        CHECK_POLICIES_KEY,
        context.getHandler(),
      ) || [];

    const req = context.switchToHttp().getRequest();
    const user = await this.getUser(req)
    const ability = this.caslAbilityFactory.createForUser(user);

    return policyHandlers.every((handler) =>
      this.execPolicyHandler(handler, ability),
    );
  }

  private execPolicyHandler(handler: PolicyHandler, ability: AppAbility) {
    if (typeof handler === 'function') {
      return handler(ability);
    }
    return handler.handle(ability);
  }

  private async getUser(req) : Promise<User> {
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