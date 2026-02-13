import { User } from "../auth.types";
import mockUser from "./user.mock.json";

export class UserMother {
  static getMockUser(user?: Partial<User>) {
    return { ...mockUser, ...user } as User;
  }
}
