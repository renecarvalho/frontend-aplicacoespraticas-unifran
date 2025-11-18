/* =============================================
   cadastro.js
   Salva projetos no LocalStorage em formato JSON
============================================= */

// Nome da chave usada no localStorage
const STORAGE_KEY = "projetos_cadastrados";

// Função para carregar lista existente
function carregarProjetos() {
    const dados = localStorage.getItem(STORAGE_KEY);
    return dados ? JSON.parse(dados) : [];
}

// Função para salvar a lista atualizada
function salvarProjetos(lista) {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(lista));
}

// Captura o formulário na página
const form = document.querySelector("form");

if (form) {
    form.addEventListener("submit", function (event) {
        event.preventDefault();

        // Captura os dados do formulário
        const novoProjeto = {
            categoria: document.getElementById("categoria").value,
            titulo: document.getElementById("titulo").value,
            descricao: document.getElementById("descricao").value,
            foto: document.getElementById("foto").files[0]
                ? URL.createObjectURL(document.getElementById("foto").files[0])
                : null,
            youtube: document.getElementById("youtube").value,
            responsavel: document.getElementById("responsavel").value,
            telefone: document.getElementById("telefone").value,
            email: document.getElementById("email").value,
            criadoEm: new Date().toISOString()
        };

        // Carrega a lista atual, adiciona o novo projeto e salva
        const lista = carregarProjetos();
        lista.push(novoProjeto);
        salvarProjetos(lista);

        alert("Projeto cadastrado com sucesso!");
        form.reset();
    });
}
