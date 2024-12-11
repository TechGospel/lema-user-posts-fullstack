export interface User {
  id: number;
  name: string;
  username: string;
  email: string;
  phone: string;
  street: string;
  state: string;
  city: string;
  zipcode: string;
  lat: string;
  lng: string;
}

export type Pagination = {
  pageNumber: number;
  pageSize: number;
  totalUsers: number;
};
