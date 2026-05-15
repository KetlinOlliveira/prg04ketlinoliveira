import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import UserTable from "../../components/UserTable/UserTable";
import {
  getUsers,
  updateUserName,
  deleteUser
} from "../../services/userService";
import "./AdminDashboard.css";

function AdminDashboard() {
  const [users, setUsers] = useState([]);

  useEffect(() => {
    const storedUsers = getUsers();
    setUsers(storedUsers);
  }, []);

  function handleEditUser(user) {
    const newName = window.prompt("Novo nome:", user.nome);

    if (!newName || !newName.trim()) {
      return;
    }

    const updatedUsers = updateUserName(user.id, newName.trim());
    setUsers(updatedUsers);
  }

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