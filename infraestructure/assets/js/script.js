//define um array de usuários com informações de ID, nome, email e senha (hardcoded para simulação)
let usuarios = [
    { id: 1, nome: "Ketlin Oliveira", email: "ketlin@email.com", senha: "123" },
    { id: 2, nome: "Eduardo Satiro", email: "eduardo@email.com", senha: "123" },
    { id: 3, nome: "Lais", email: "lais@email.com", senha: "123" },
    { id: 4, nome: "Sheila", email: "sheila@email.com", senha: "123" },
    { id: 5, nome: "Maria", email: "maria@email.com", senha: "123" }
];
let proximoId = 6; // Variável para gerar IDs únicos
renderizarUsuarios(); // Chama a função para renderizar a lista de usuários na página

function realizarLogin() {
    // Simulação de login (substitua com lógica real de autenticação)
    const inputNome = document.getElementById('usuario');
    const inputEmail = document.getElementById('email');
    const inputSenha = document.getElementById('senha');
    const mensagem = document.getElementById('mensagem');


    //extrai os valores dos inputs e remove espaços em branco
    const emailValor = inputEmail.value.trim();
    const senhaValor = inputSenha.value.trim();   
    const nomeValor = inputNome.value.trim();

    //faz a verificação
    if (emailValor === "" || senhaValor === "" || nomeValor === "") {
        //exibe mensagem de erro caso algum campo esteja vazio
       let mensagemErro = "Por favor, preencha todos os campos.";
       mensagem.textContent = mensagemErro;
       mensagem.style.color = "#C94C5E";
       return;
    }else{

        const novoUsuario = {
            nome: nomeValor,
            email: emailValor,
            senha: senhaValor,
            id: proximoId // Gera um ID único
        };

        //adiciona o novo usuário ao array de usuários
        usuarios.push(novoUsuario);
        proximoId++; // Incrementa o ID para o próximo usuário
        renderizarUsuarios(); //atualiza a lista de usuários na página
        
        //limpa os campos de input após o login
        inputNome.value = "";
        inputEmail.value = "";
        inputSenha.value = "";
        //adiciona o usuário à lista de usuários
        let mensagemSucesso = "Login realizado com sucesso!";
        mensagem.textContent = mensagemSucesso;
        mensagem.style.color = "green";
        //cria um novo item de lista para o usuário e adiciona à lista de usuários

        toggleUsers(); //abre o painel de usuários para mostrar o novo usuário adicionado
    } 
}

// Pega um nome e retorna a inicial em maiúsculo. Ex: "ketlin" -> "K"
function obterInicial(nome) {
    if (!nome) return "?";
    // Pega o primeiro caractere e transforma em Maiúsculo
    return nome.trim().charAt(0).toUpperCase();
}


//função para renderizar a lista de usuários na página
 function renderizarUsuarios(){
    const listaUsuarios = document.getElementById('lista-usuarios');
    if(!listaUsuarios) return;
    //limpa a lista antes de renderizar novamente
    listaUsuarios.innerHTML = "";

    //percorre o array de usuários e cria um item de lista para cada usuário
    usuarios.forEach((user, index) => {
        //cria um novo elemento de lista e define seu conteúdo com as informações do usuário
        const li = document.createElement('li');
        li.className = "user-card";

        const inicial = obterInicial(user.nome); // Obtém a inicial do nome do usuário
            
        
        //adiciona os detalhes do usuário e os botões de ação (editar e excluir)
        li.innerHTML = `
        <div style="
                background: #FAF5EE; 
                padding: 15px; 
                border-radius: 12px; 
                text-align: center; 
                box-shadow: 0 4px 6px rgba(0,0,0,0.05);
                border: 1px solid #D4956A;
                position: relative;
                margin-bottom: 10px;">
                
                <div style="
                    background: #A05535; /* Cobre da paleta */
                    width: 45px; 
                    height: 45px; 
                    border-radius: 50%; 
                    margin: 0 auto 10px;
                    display: flex; /* Para centralizar a letra */
                    align-items: center; 
                    justify-content: center;
                    color: white; /* Cor da letra */
                    font-weight: bold;
                    font-size: 1.2em;
                    text-shadow: 0 1px 2px rgba(0,0,0,0.2);">
                    ${inicial}
                </div>

                <strong style="color: #3B1F10; display: block;">${user.nome}</strong>
                <span style="color: #6B3520; display: block; font-size: 0.8em; margin-bottom: 5px;">${user.email}</span>
                <small style="color: #D4956A;">ID: ${user.id}</small>

                <div style="margin-top: 15px; display: flex; gap: 10px; justify-content: center;">
                    <button onclick="editarUsuario(${index})" style="background: #D4956A; color: white; border: none; padding: 5px 10px; border-radius: 5px; cursor: pointer; font-size: 12px;">Editar</button>
                    <button onclick="excluirUsuario(${index})" style="background: #C94C5E; color: white; border: none; padding: 5px 10px; border-radius: 5px; cursor: pointer; font-size: 12px;">Excluir</button>
                </div>
            </div>
        `;
        listaUsuarios.appendChild(li); //adiciona o item de lista à lista de usuários
    });
}

//função para excluir um usuário
function excluirUsuario(posicao){
    if(confirm("Tem certeza que deseja excluir este usuário?")){
        usuarios.splice(posicao, 1); //remove o usuário do array
        renderizarUsuarios(); //atualiza a lista de usuários na página
    }
}

//função para editar um usuário
function editarUsuario(posicao){
 
    const novoEmail = prompt("Digite o novo email:", usuarios[posicao].email);
     const novoNome = prompt("Digite o novo nome:", usuarios[posicao].nome);

    if(novoEmail !== null && novoEmail.trim() !== "" && novoNome !== null && novoNome.trim() !== ""){
        usuarios[posicao].email = novoEmail.trim(); //atualiza o email do usuário
        usuarios[posicao].nome = novoNome.trim(); //atualiza o nome do usuário
        renderizarUsuarios(); //atualiza a lista de usuários na página
    }   
}

//função para alternar a visibilidade do painel de usuários
function toggleUsers() {
    const panel = document.getElementById('user-panel');
    const imageContainer = document.querySelector('.image-container');

    if (panel) {
        // Alterna a classe 'hidden' que controla a transição
        panel.classList.toggle('hidden');
        
        // Se o painel for aberto, renderiza os usuários
        if (!panel.classList.contains('hidden')) {
            renderizarUsuarios();
        }
    }
}


