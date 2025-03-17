import { UserData } from "@/interfaces/auth/auth";
import { useUserSlice } from "../slice/user";

export const changeUserData = (user: UserData) => useUserSlice.setState(user)


