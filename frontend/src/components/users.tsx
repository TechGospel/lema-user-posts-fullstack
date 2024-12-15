import React, { useState, useEffect } from "react";
import { getUsers, getUsersCount } from "../api/users";
import { useLocation, useNavigate } from "react-router-dom";
import { useQuery } from "react-query";
import Pagination from "../shared/pagination";
import Loader from "../shared/loader";
import UsersList from "./userList";
import { useUsers } from "../hooks/useUsers";

const pageSize = 4;

export const Users = () => {
  const { state } = useLocation();
  console.log("current page", state?.currentPage);
  const [currentPage, setCurrentPage] = useState(state?.currentPage || 0);
  const { data: usersCount, isLoading } = useQuery("usersCount", getUsersCount);
  const [totalPages, setTotalPages] = useState(0);
  // const { data: usersCount, isLoading } = useQuery("usersCount", getUsersCount);
  // const { data: users = [], isLoading: isLoadingUsers } = useQuery(
  // 	["users", currentPage],
  // 	() => getUsers(currentPage, pageSize)
  // );
  const { data: users = [], isLoading: isLoadingUsers } = useUsers(
    currentPage,
    pageSize
  );

  const navigate = useNavigate();

  useEffect(() => {
    setTotalPages(usersCount! / pageSize);
  }, [isLoading]);

  if (isLoading)
    return (
      <div className="flex justify-center items-center min-h-screen">
        <Loader backgroundColor={"#a3a1a1"} />
      </div>
    );

  return (
    <div className="p-4 my-0 md:my-24">
      <h1 className="text-3xl font-bold">Users</h1>
      <div className="overflow-x-auto">
        <table className="hidden md:table table-auto w-full mt-4 border-collapse border rounded-lg text-left border-gray-300">
          <thead>
            <tr>
              <th className="px-4 py-2">Full Name</th>
              <th className=" px-4 py-2">Email Address</th>
              <th className=" px-4 py-2">Address</th>
            </tr>
          </thead>

          {isLoadingUsers ? (
            <tbody className="relative">
              <tr>
                <td colSpan={3}>
                  <div className="flex justify-center items-center h-[400px] w-[50px] mx-auto">
                    <Loader backgroundColor={"#a3a1a1"} />
                  </div>
                </td>
              </tr>
            </tbody>
          ) : (
            <tbody>
              <UsersList users={users} currentPage={currentPage} />
            </tbody>
          )}
        </table>

        {/* Stacked layout for smaller screens */}
        <div className="md:hidden grid gap-4">
          {users?.map((user: any) => (
            <div
              className="border p-4 rounded cursor-pointer"
              key={user.id}
              onClick={() =>
                navigate(`/posts/${user.id}`, {
                  state: { user, currentPage },
                })
              }
            >
              <p>
                <span className="font-bold">Full Name:</span> {user.fullName}
              </p>
              <p>
                <span className="font-bold">Email Address:</span> {user.email}
              </p>
              <p>
                <span className="font-bold">Address:</span> {user.address}
              </p>
            </div>
          ))}
          {isLoadingUsers && (
            <div className="flex justify-center items-center h-[400px] w-[50px] mx-auto">
              <Loader backgroundColor={"#a3a1a1"} />
            </div>
          )}
        </div>
      </div>

      <Pagination
        currentPage={currentPage}
        totalPages={totalPages}
        onPageChange={setCurrentPage}
      />
    </div>
  );
};

export default Users;
