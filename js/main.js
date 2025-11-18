// ============================
// ACESSIBILIDADE – MODO ESCURO E ALTO CONTRASTE
// ============================

const botaoEscuro = document.getElementById('btn-escuro');
const botaoAltoContraste = document.getElementById('btn-alto-contraste');

// Carregar preferências salvas
window.addEventListener('DOMContentLoaded', () => {
    const modoEscuroAtivo = localStorage.getItem('modo-escuro');
    const altoContrasteAtivo = localStorage.getItem('alto-contraste');

    if (modoEscuroAtivo === 'true') {
        document.body.classList.add('modo-escuro');
        botaoEscuro.textContent = 'Modo Claro';
    } 

    if (altoContrasteAtivo === 'true') {
        document.body.classList.add('alto-contraste');
    }
});

// Alternar modo escuro
botaoEscuro.addEventListener('click', () => {
    const ativo = document.body.classList.toggle('modo-escuro');
    localStorage.setItem('modo-escuro', ativo);

    console.log(botaoEscuro.textContent);
    if(botaoEscuro.textContent === 'Modo Escuro'){
        botaoEscuro.textContent = 'Modo Claro';
    } else {
        botaoEscuro.textContent = 'Modo Escuro';
    }
});

// Alternar alto contraste
// botaoAltoContraste.addEventListener('click', () => {
//     const ativo = document.body.classList.toggle('alto-contraste');
//     localStorage.setItem('alto-contraste', ativo);
// });


// ===============================================
// menu.js — Menu responsivo + acessibilidade WCAG 2.1
// Controla: menu mobile, dropdown, estados ARIA
// ===============================================

// Seletores principais
const hamburger = document.getElementById("hamburger");
const mobileNav = document.getElementById("mobileNav");
const navItems = document.querySelectorAll(".nav-item");

// -----------------------------------------------
// MENU MOBILE (Hambúrguer)
// -----------------------------------------------

hamburger.addEventListener("click", () => {
    const isOpen = mobileNav.classList.toggle("open");

    // Acessibilidade ARIA
    hamburger.setAttribute("aria-expanded", isOpen);
    mobileNav.setAttribute("aria-hidden", !isOpen);
});

// Fecha o menu mobile ao clicar fora
window.addEventListener("click", (e) => {
    if (!hamburger.contains(e.target) && !mobileNav.contains(e.target)) {
        mobileNav.classList.remove("open");
        hamburger.setAttribute("aria-expanded", "false");
        mobileNav.setAttribute("aria-hidden", "true");
    }
});

// -----------------------------------------------
// DROPDOWN DO MENU DESKTOP (Acessibilidade + teclado)
// -----------------------------------------------

navItems.forEach((item) => {
    const submenu = item.querySelector(".submenu");
    if (!submenu) return;

    const trigger = item.querySelector("a");

    // Abrir ao passar o mouse
    item.addEventListener("mouseenter", () => submenu.style.display = "block");
    item.addEventListener("mouseleave", () => submenu.style.display = "none");

    // Abrir com teclado (Enter ou seta para baixo)
    trigger.addEventListener("keydown", (e) => {
        if (e.key === "Enter" || e.key === " " || e.key === "ArrowDown") {
            submenu.style.display = "block";
            submenu.querySelector("a").focus();
        }
        if (e.key === "Escape") {
            submenu.style.display = "none";
            trigger.focus();
        }
    });

    // Navegação por teclado dentro do submenu
    const submenuLinks = submenu.querySelectorAll("a");
    submenuLinks.forEach((link, index) => {
        link.addEventListener("keydown", (e) => {
            if (e.key === "Escape") {
                submenu.style.display = "none";
                trigger.focus();
            }
            if (e.key === "ArrowDown") {
                if (index < submenuLinks.length - 1)
                    submenuLinks[index + 1].focus();
            }
            if (e.key === "ArrowUp") {
                if (index > 0)
                    submenuLinks[index - 1].focus();
            }
        });
    });
});

// -----------------------------------------------
// FECHAR DROPDOWN AO CLICAR FORA (desktop)
// -----------------------------------------------

document.addEventListener("click", (e) => {
    navItems.forEach((item) => {
        const submenu = item.querySelector(".submenu");
        if (!submenu) return;
        if (!item.contains(e.target)) {
            submenu.style.display = "none";
        }
    });
});

// ===============================================
// Fim do arquivo
// ===============================================
