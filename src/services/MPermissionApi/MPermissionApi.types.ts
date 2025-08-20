import { TPaging } from "services/Api.types";

export type TPermissionRole = {
  id: string;
  name: string;
  permissions: string[];
  users: string[];
  creator: string;
  description: string;
  createdAt: Date;
};

export type TPermissionParams = {
  search?: string;
} & TPaging;
