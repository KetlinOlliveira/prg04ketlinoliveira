import { initialUsers } from "../data/initialUsers";

const STORAGE_KEY = "usuarios";

export function getUsers() {
  const storedUsers = JSON.parse(localStorage.getItem(STORAGE_KEY));

  if (!storedUsers || storedUsers.length === 0) {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(initialUsers));
    return initialUsers;
  }

  return storedUsers;
}

export function saveUsers(users) {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(users));
}

export function createUser(userData) {
  const users = getUsers();

  const nextId =
    users.length > 0
      ? Math.max(...users.map((user) => user.id)) + 1
      : 1;

  const newUser = {
    id: nextId,
    nome: userData.nome,
    email: userData.email,
    senha: userData.senha
  };

  const updatedUsers = [...users, newUser];

  saveUsers(updatedUsers);

  return newUser;
}

export function updateUserName(userId, newName) {
  const users = getUsers();

  const updatedUsers = users.map((user) => {
    if (user.id === userId) {
      return {
        ...user,
        nome: newName
      };
    }

    return user;
  });

  saveUsers(updatedUsers);

  return updatedUsers;
}

export function deleteUser(userId) {
  const users = getUsers();

  const updatedUsers = users.filter((user) => user.id !== userId);

  saveUsers(updatedUsers);

  return updatedUsers;
}

export function getInitial(name) {
  if (!name) return "?";

  return name.trim().charAt(0).toUpperCase();
}