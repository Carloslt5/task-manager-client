import mockUser from "./user.mock.json";
import { User } from "../auth.types";

export class UserMother {
  static getMockUser(user?: Partial<User>) {
    return { ...mockUser, ...user } as User;
  }
}
