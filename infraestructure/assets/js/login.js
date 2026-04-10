const usuariosIniciais = [
    { id: 1, nome: "Ketlin Oliveira", email: "ketlin@email.com", senha: "123" },
    { id: 2, nome: "Eduardo Satiro", email: "eduardo@email.com", senha: "123" },
    { id: 3, nome: "Lais", email: "lais@email.com", senha: "123" },
    { id: 4, nome: "Sheila", email: "sheila@email.com", senha: "123" },
    { id: 5, nome: "Maria", email: "maria@email.com", senha: "123" }
];

// 2. Lógica de Sincronização: só salva se o banco estiver vazio
let usuarios = JSON.parse(localStorage.getItem('usuarios'));

if (!usuarios || usuarios.length === 0) {
    usuarios = usuariosIniciais;
    localStorage.setItem('usuarios', JSON.stringify(usuarios));
}

function realizarLogin() {
    const nomeValor = document.getElementById('usuario').value.trim();
    const emailValor = document.getElementById('email').value.trim();
    const senhaValor = document.getElementById('senha').value.trim();

    if (nomeValor && emailValor && senhaValor) {
        // Pega o maior ID atual para seguir a sequência (6, 7, 8...)
        const proximoId = usuarios.length > 0 ? Math.max(...usuarios.map(u => u.id)) + 1 : 1;

        const novoUsuario = {
            id: proximoId,
            nome: nomeValor,
            email: emailValor,
            senha: senhaValor
        };

        usuarios.push(novoUsuario);
        localStorage.setItem('usuarios', JSON.stringify(usuarios));
        window.location.href = "painel-adm.html";
    } else {
        alert("Preencha todos os campos!");
    }
}
// Pega um nome e retorna a inicial em maiúsculo. Ex: "ketlin" -> "K"
function obterInicial(nome) {
    if (!nome) return "?";
    // Pega o primeiro caractere e transforma em Maiúsculo
    return nome.trim().charAt(0).toUpperCase();
}


//função para renderizar a lista de usuários na página
function renderizarUsuarios() {
    const listaUsuarios = document.getElementById('lista-usuarios');
    if (!listaUsuarios) return;

    listaUsuarios.innerHTML = "";
    usuarios.forEach((user) => {
        const li = document.createElement('li');
        li.className = "user-card-small"; // Estilo da barra lateral
        li.innerHTML = `<strong>${user.nome}</strong>`;
        listaUsuarios.appendChild(li);
    });
}

document.addEventListener('DOMContentLoaded', renderizarUsuarios);
