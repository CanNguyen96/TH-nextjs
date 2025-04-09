export type User = {
    id: number;
    username: string;
    email: string;
    password: string;
};

let users: User[] = [];

export const addUser = (user: Omit<User, "id">) => {
    const newUser = { ...user, id: users.length + 1 };
    users.push(newUser);
    return newUser;
};

export const findUserByEmail = (email: string) => {
    return users.find((user) => user.email === email);
};

export const getAllUsers = () => {
    return users;
};