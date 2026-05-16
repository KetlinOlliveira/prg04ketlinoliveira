import { initialUsers } from "../data/initialUsers";

const STORAGE_KEY = "usuarios";

/*
  Busca os usuários salvos no localStorage.

  Caso ainda não exista nenhum usuário salvo, o sistema carrega
  os usuários iniciais e salva no localStorage.
*/
export function getUsers() {
  const storedUsers = JSON.parse(localStorage.getItem(STORAGE_KEY));

  if (!storedUsers || storedUsers.length === 0) {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(initialUsers));
    return initialUsers;
  }

  return storedUsers;
}

/*
  Salva a lista atualizada de usuários no localStorage.
  O JSON.stringify transforma o array em texto, pois o localStorage
  só armazena strings.
*/
export function saveUsers(users) {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(users));
}

/*
  Cria um novo usuário fictício.

  O ID é calculado com base no maior ID já existente,
  garantindo que cada novo usuário receba um identificador único.
*/
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

/*
  Atualiza apenas o nome de um usuário.

  O método map percorre todos os usuários e altera somente aquele
  que possui o ID correspondente.
*/
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

/*
  Exclui um usuário da lista.

  O filter cria um novo array contendo todos os usuários,
  exceto aquele que possui o ID informado.
*/
export function deleteUser(userId) {
  const users = getUsers();

  const updatedUsers = users.filter((user) => user.id !== userId);

  saveUsers(updatedUsers);

  return updatedUsers;
}

/*
  Retorna a primeira letra do nome do usuário.
  Essa função é usada para criar o avatar circular no painel admin.
*/
export function getInitial(name) {
  if (!name) return "?";

  return name.trim().charAt(0).toUpperCase();
}