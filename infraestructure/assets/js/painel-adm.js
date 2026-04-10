// Executa assim que a página termina de carregar
document.addEventListener('DOMContentLoaded', () => {
    renderizarPainel();
});

function renderizarPainel() {
    const grid = document.getElementById('grid-admin');
    if (!grid) return;

    // LIMPA para evitar que os cards se multipliquem ao editar/excluir
    grid.innerHTML = "";

    // Puxa a lista oficial do LocalStorage
    const listaFinal = JSON.parse(localStorage.getItem('usuarios')) || [];

    listaFinal.forEach((user, index) => {
        const card = document.createElement('div');
        card.className = "admin-user-card";
        // Estilo baseado no seu design
        card.style = "background: white; padding: 20px; border-radius: 12px; display: flex; align-items: center; gap: 15px; box-shadow: 0 4px 10px rgba(0,0,0,0.05); border: 1px solid #eee; position: relative; margin-bottom: 15px;";

        card.innerHTML = `
            <div style="background: #A05535; width: 50px; height: 50px; border-radius: 50%; display: flex; align-items: center; justify-content: center; color: white; font-weight: bold; font-size: 1.2rem; flex-shrink: 0;">
                ${user.nome.charAt(0).toUpperCase()}
            </div>
            <div style="flex-grow: 1; text-align: left;">
                <h3 style="margin: 0; color: #3B1F10;">${user.nome}</h3>
                <p style="margin: 2px 0; color: #6B3520; font-size: 0.8rem;">${user.email}</p>
                <span style="background: #F0DBC8; color: #A05535; padding: 2px 8px; border-radius: 10px; font-size: 0.7rem;">ID: ${user.id}</span>
            </div>
            
            <div class="dropdown-container" style="position: relative;">
                <button onclick="abrirAcoes(${index})" style="background: #FAF5EE; border: 1px solid #D4956A; padding: 6px 12px; border-radius: 6px; cursor: pointer;">Ação ▾</button>
                <div id="menu-${index}" style="display: none; position: absolute; right: 0; top: 35px; background: white; border: 1px solid #ddd; border-radius: 8px; box-shadow: 0 4px 12px rgba(0,0,0,0.1); z-index: 100; min-width: 110px;">
                    <button onclick="editarUser(${index})" style="width: 100%; padding: 10px; border: none; background: none; text-align: left; cursor: pointer; border-bottom: 1px solid #eee;">Editar</button>
                    <button onclick="excluirUser(${index})" style="width: 100%; padding: 10px; border: none; background: none; text-align: left; cursor: pointer; color: #C94C5E;">Excluir</button>
                </div>
            </div>
        `;
        grid.appendChild(card);
    });
}

// Funções globais de suporte
window.abrirAcoes = (index) => {
    const menu = document.getElementById(`menu-${index}`);
    menu.style.display = menu.style.display === 'none' ? 'block' : 'none';
};

window.excluirUser = (index) => {
    let dados = JSON.parse(localStorage.getItem('usuarios'));
    if(confirm("Deseja excluir?")) {
        dados.splice(index, 1);
        localStorage.setItem('usuarios', JSON.stringify(dados));
        renderizarPainel(); // Redesenha a lista
    }
};

window.editarUser = (index) => {
    let dados = JSON.parse(localStorage.getItem('usuarios'));
    const novo = prompt("Novo nome:", dados[index].nome);
    if(novo) {
        dados[index].nome = novo;
        localStorage.setItem('usuarios', JSON.stringify(dados));
        renderizarPainel();
    }
};