import React from "react";
import { useNavigate } from "react-router-dom";
import { User } from "../types/User.type";

const UsersList = ({
  users,
  currentPage,
}: {
  users: User[];
  currentPage?: number;
}) => {
  const navigate = useNavigate();

  return (
    <>
      {users.map((user: User) => (
        <tr
          key={user?.id}
          className="cursor-pointer"
          onClick={() =>
            navigate(`/posts/${user?.id}?page=${currentPage}`, {
              state: { user },
            })
          }
        >
          <td className="name-column text-sm border-b border-gray-300 px-6 py-4">
            {user?.fullName}
          </td>
          <td className="border-b text-sm border-gray-300 px-6 py-4">
            {user?.email}
          </td>
          <td
            title={user?.address}
            className="border-b text-sm border-gray-300 px-6 py-4 max-w-[392px] overflow-hidden text-ellipsis whitespace-nowrap"
          >
            {user?.address}
          </td>
        </tr>
      ))}
    </>
  );
};

export default UsersList;
