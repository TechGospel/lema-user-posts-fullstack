import axios from "axios";
import { User } from "../types/User.type";

export const getUsersCount = async (): Promise<number> => {
	const response = await axios.get(
		`${process.env.REACT_APP_API_BASE_URL}/users/count`
	);
	const count: number = response.data.count;
	return count;
};

export const getUsers = async (
	offset: number,
	limit: number
): Promise<User[]> => {
	const response = await axios.get(
		`${process.env.REACT_APP_API_BASE_URL}/users?pageNumber=${offset}&pageSize=${limit}`
	);
	const users: User[] = response.data.map(
		({
			name,
			email,
			city,
			street,
			state,
			zipcode,
			id,
		}: {
			name: string;
			email: string;
			street: string;
			state: string;
			city: string;
			zipcode: string;
			id: number;
		}) => ({
			id: id,
			fullName: name,
			email: email,
			address: `${street}, ${state}, ${city}, ${zipcode}`,
		})
	);

	return users;
};
