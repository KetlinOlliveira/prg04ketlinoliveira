import { getInitial } from "../../services/userService";
import "./UserTable.css";

function UserTable({ users, onEditUser, onDeleteUser }) {
  if (users.length === 0) {
    return (
      <div className="empty-users">
        Nenhum usuário cadastrado.
      </div>
    );
  }

  return (
    <div className="table-responsive">
      <table className="table table-striped table-hover user-table">
        <thead>
          <tr>
            <th>Nome</th>
            <th>Email</th>
            <th>ID</th>
            <th>Status</th>
            <th>Ações</th>
          </tr>
        </thead>

        <tbody>
          {users.map((user) => (
            <tr key={user.id}>
              <td>
                <div className="user-name-cell">
                  <div className="avatar-circle">
                    {getInitial(user.nome)}
                  </div>

                  <strong>{user.nome}</strong>
                </div>
              </td>

              <td className="user-email">{user.email}</td>

              <td>
                <span className="badge user-id-badge">
                  ID: {user.id}
                </span>
              </td>

              <td>
                <span className="badge bg-success">
                  Ativo
                </span>
              </td>

              <td>
                <div className="dropdown">
                  <button
                    className="btn btn-sm dropdown-toggle action-button"
                    type="button"
                    data-bs-toggle="dropdown"
                    aria-expanded="false"
                  >
                    Ação
                  </button>

                  <ul className="dropdown-menu dropdown-menu-end">
                    <li>
                      <button
                        className="dropdown-item"
                        type="button"
                        onClick={() => onEditUser(user)}
                      >
                        ✏️ Editar
                      </button>
                    </li>

                    <li>
                      <hr className="dropdown-divider" />
                    </li>

                    <li>
                      <button
                        className="dropdown-item text-danger"
                        type="button"
                        onClick={() => onDeleteUser(user.id)}
                      >
                        🗑️ Excluir
                      </button>
                    </li>
                  </ul>
                </div>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default UserTable;