// =======================
// FILTRO POR CATEGORIA
// =======================
const filtro = document.getElementById('filtroCategoria');

filtro.addEventListener('change', () => {
    const valor = filtro.value;
    const secoes = document.querySelectorAll('h3.section');
    const grids = document.querySelectorAll('.cards-grid');

    secoes.forEach((secao, i) => {
        const categoria = secao.id;
        const grid = grids[i];

        if (valor === 'todas' || valor === categoria) {
            secao.style.display = 'block';
            grid.style.display = 'grid';
        } else {
            secao.style.display = 'none';
            grid.style.display = 'none';
        }
    });
});

/* =====================================================
   Lê projetos salvos no LocalStorage e exibe na página
======================================================== */

const STORAGE_KEY = "projetos_cadastrados";

// Carregar lista do LocalStorage
function carregarProjetos() {
    const dados = localStorage.getItem(STORAGE_KEY);
    return dados ? JSON.parse(dados) : [];
}

// Gerar card HTML
function criarCard(projeto) {
    return `
        <div class="card">
            <img src="${projeto.foto || 'imagens/default.jpg'}" alt="${projeto.titulo}">
            <div class="card-body">
                <h4>${projeto.titulo}</h4>
                <p class="card-meta">Categoria: ${projeto.categoria}</p>
                <p>${projeto.descricao}</p>
                ${projeto.youtube ? `<a href="${projeto.youtube}" target="_blank" class="btn btn-secondary">Vídeo</a>` : ''}
            </div>
        </div>
    `;
}

// Insere projetos nas seções corretas
document.addEventListener("DOMContentLoaded", () => {
    const projetos = carregarProjetos();
    if (!projetos.length) return;

    const secoes = {
        educacao: document.querySelector("#educacao + .cards-grid"),
        saude: document.querySelector("#saude + .cards-grid"),
        comunidade: document.querySelector("#comunidade + .cards-grid")
    };

    projetos.forEach(p => {
        if (secoes[p.categoria]) {
            secoes[p.categoria].insertAdjacentHTML("beforeend", criarCard(p));
        }
    });
});
