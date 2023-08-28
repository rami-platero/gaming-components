export enum Roles {
  user = "User",
  admin = "Admin",
}

export type User = {
    id: number;
    username: string;
    email: string;
    password: string;
    roles: Roles[];
    createdAt: Date,
    updatedAt: Date
}

