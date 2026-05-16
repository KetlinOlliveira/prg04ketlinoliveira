import { useEffect, useState } from "react";
import { Link } from "react-router-dom";

import UserTable from "../../components/UserTable/UserTable";
import {
  getUsers,
  updateUserName,
  deleteUser
} from "../../services/userService";

import "./AdminDashboard.css";

/*
  Página do painel administrativo.

  Ela carrega os usuários salvos no localStorage e permite editar
  ou excluir usuários da lista.
*/
function AdminDashboard() {
  const [users, setUsers] = useState([]);

  /*
    useEffect executa quando o componente é carregado.
    Aqui ele busca os usuários salvos e coloca no estado.
  */
  useEffect(() => {
    const storedUsers = getUsers();
    setUsers(storedUsers);
  }, []);

  /*
    Edita o nome de um usuário.
    Após salvar no localStorage, o estado é atualizado para refletir
    a mudança imediatamente na tabela.
  */
  function handleEditUser(user) {
    const newName = window.prompt("Novo nome:", user.nome);

    if (!newName || !newName.trim()) {
      return;
    }

    const updatedUsers = updateUserName(user.id, newName.trim());
    setUsers(updatedUsers);
  }

  /*
    Exclui um usuário após confirmação.
    O estado é atualizado com a nova lista retornada pelo service.
  */
  function handleDeleteUser(userId) {
    const shouldDelete = window.confirm("Deseja excluir este usuário?");

    if (!shouldDelete) {
      return;
    }

    const updatedUsers = deleteUser(userId);
    setUsers(updatedUsers);
  }

  return (
    <main className="admin-page">
      <div className="dash-wrapper">
        <header className="dash-header">
          <div>
            <h1>Usuários</h1>
            <p>Gerencie os usuários cadastrados no FindPet.</p>
          </div>

          <div className="dash-actions">
            <Link to="/login" className="btn-action">
              + Novo Usuário
            </Link>

            <Link to="/login" className="close-admin">
              ✕
            </Link>
          </div>
        </header>

        <UserTable
          users={users}
          onEditUser={handleEditUser}
          onDeleteUser={handleDeleteUser}
        />
      </div>
    </main>
  );
}

export default AdminDashboard;