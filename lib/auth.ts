import UserSchema from "@/models/User";

const register = async (user: User): Promise<boolean> => {
  try {
    const dbUser = await UserSchema.create({ user });
    return true;
  } catch (error) {
    console.error(error);
  }
  return false;
};
