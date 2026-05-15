window.addEventListener('load', () => {
    renderizarPainel();
});

function renderizarPainel() {
    const tbody = document.getElementById('grid-admin');
    if (!tbody) return;

    tbody.innerHTML = "";

    const listaFinal = JSON.parse(localStorage.getItem('usuarios')) || [];

    listaFinal.forEach((user, index) => {
        const tr = document.createElement('tr');

        tr.innerHTML = `
            <td>
                <div class="d-flex align-items-center gap-2">
                    <div style="background: #A05535; width: 38px; height: 38px; border-radius: 50%; display: flex; align-items: center; justify-content: center; color: white; font-weight: bold; font-size: 1rem; flex-shrink: 0;">
                        ${user.nome.charAt(0).toUpperCase()}
                    </div>
                    <strong style="color: #3B1F10;">${user.nome}</strong>
                </div>
            </td>
            <td style="color: #6B3520;">${user.email}</td>
            <td>
                <span class="badge" style="background: #F0DBC8; color: #A05535;">ID: ${user.id}</span>
            </td>
            <td>
                <span class="badge bg-success">Ativo</span>
            </td>
            <td>
                <div class="dropdown">
                    <button 
                        class="btn btn-sm dropdown-toggle" 
                        style="background: #FAF5EE; border: 1px solid #D4956A; color: #3B1F10;"
                        data-bs-toggle="dropdown" 
                        aria-expanded="false">
                        Ação
                    </button>
                    <ul class="dropdown-menu dropdown-menu-end">
                        <li>
                            <button class="dropdown-item" onclick="editarUser(${index})">
                                ✏️ Editar
                            </button>
                        </li>
                        <li><hr class="dropdown-divider"></li>
                        <li>
                            <button class="dropdown-item text-danger" onclick="excluirUser(${index})">
                                🗑️ Excluir
                            </button>
                        </li>
                    </ul>
                </div>
            </td>
        `;

        tbody.appendChild(tr);
    });
}

window.excluirUser = (index) => {
    let dados = JSON.parse(localStorage.getItem('usuarios'));
    if (confirm("Deseja excluir?")) {
        dados.splice(index, 1);
        localStorage.setItem('usuarios', JSON.stringify(dados));
        renderizarPainel();
    }
};

window.editarUser = (index) => {
    let dados = JSON.parse(localStorage.getItem('usuarios'));
    const novo = prompt("Novo nome:", dados[index].nome);
    if (novo) {
        dados[index].nome = novo;
        localStorage.setItem('usuarios', JSON.stringify(dados));
        renderizarPainel();
    }
};