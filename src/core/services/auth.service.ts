import UserModel from "../../data/models/user";
import {
  createUUID,
  hashPassword,
  mapObjectToSqlString,
  signJwt,
  verifyPassword,
} from "../../internal/helpers";
import {
  UserAlreadyExistsException,
  UserCreateErrorException,
  UserNotFoundException,
} from "../../internal/responses/error";
import { UserLoginDto, UserRegisterDto } from "../../internal/schema/auth";

class AuthService {
  private userModel: typeof UserModel;

  constructor() {
    this.userModel = UserModel;
  }

  async login({ username, password }: UserLoginDto) {
    const user = await this.userModel.findUser(
      mapObjectToSqlString({ username })
    );

    if (!user) {
      throw new UserNotFoundException();
    }

    const passwordMatched = await verifyPassword(password, user.password!);

    if (!passwordMatched) {
      throw new UserNotFoundException();
    }

    const token = signJwt(user.id!);
    return token;
  }

  async register({ username, password, email }: UserRegisterDto) {
    const duplicate = await this.userModel.findUser(
      mapObjectToSqlString({ username })
    );

    if (duplicate) {
      throw new UserAlreadyExistsException();
    }

    const user_id = createUUID();
    const sqlPayload = [user_id, username, hashPassword(password), email];

    const user = await this.userModel.createUser(sqlPayload);

    if (!user) {
      throw new UserCreateErrorException();
    }

    const token = signJwt(user_id);
    return token;
  }
}

export default new AuthService();
