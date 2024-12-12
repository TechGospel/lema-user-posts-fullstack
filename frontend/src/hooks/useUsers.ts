import { useQuery } from "react-query";
import { getUsers } from "../api/users";
import { User } from "../types/User.type";

export const useUsers = (currentPage: number, pageSize: number) => {
	return useQuery<User[], Error>(["users", currentPage], () =>
		getUsers(currentPage, pageSize)
	);
};
