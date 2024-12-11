import React, { useState, useEffect } from "react";
import { getUsers, getUsersCount, User } from "../api/users";
import { useNavigate } from "react-router-dom";
import { useQuery } from "react-query";
import Pagination from "./pagination";
import Loader from "./loader";

const pageSize = 4;

export const Users = () => {
  const [data, setData] = useState<User[]>();
  const [currentPage, setCurrentPage] = useState(0);
  const { data: usersCount, isLoading } = useQuery("usersCount", getUsersCount);
  const [totalPages, setTotalPages] = useState (0)
  // const { data: usersCount, isLoading } = useQuery("usersCount", getUsersCount);
  const { data:users, isLoading:isLoadingUsers } = useQuery(["users", currentPage], () =>
    getUsers(currentPage, pageSize)
  );

  const navigate = useNavigate();

  useEffect(() => {
    setTotalPages(usersCount!/pageSize)
  }, [isLoading]);

  if (isLoading||isLoadingUsers) return(
    <div className="flex justify-center items-center min-h-screen">
      <Loader backgroundColor={'#a3a1a1'}/>
    </div>
  )

  return (
    <div className="p-4">
      <h1 className="text-3xl font-bold">Users</h1>
      <table className="table-auto w-full mt-4 border-collapse border text-left border-gray-300">
        <thead>
          <tr>
            <th className="font-normal px-4 py-2">Full Name</th>
            <th className="font-normal px-4 py-2">Email Address</th>
            <th className="font-normal px-4 py-2">Address</th>
          </tr>
        </thead>
        <tbody>
          {users?.map((user: any) => (
            <tr className="cursor-pointer" key={user.id} onClick={()=>navigate((`/posts/${user.id}`), { state: { user } })}>
              <td className="border-b border-gray-300 px-4 py-4">{user.fullName}</td>
              <td className="border-b border-gray-300 px-4 py-4">{user.email}</td>
              <td className="border-b border-gray-300 px-4 py-4">{user.address}</td>
            </tr>
          ))}
        </tbody>
      </table>
      <Pagination
        currentPage={currentPage}
        totalPages={totalPages}
        onPageChange={setCurrentPage}
      />
    </div>
  );
};

export default Users;
