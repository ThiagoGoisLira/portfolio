/*   DADOS DOS PROJETOS
  */
const dadosProjetos = {
  1: {
    titulo: "Geração de orçamentos informatica",
    descricao: "Plataforma simples de criação e gerência de orçamentos de serviços para informática. Recurso de salvamento de orçamentos realizados com status de pendente, aprovado ou recusado, além de recurso de edição e exclusão de propostas. (IMPORTANTE: para funcionalidade do banco de dados usar ambiente XAMPP, documentação no git de como usar completo.)",
    imagem: "./assets/img/Screen01.png",
    tecnologias: ["HTML", "CSS", "JavaScript", "PHP", "MySQL"],
    linkDemo: "https://thiagogoislira.github.io/gerador_orcamentos_servicos_informatica/",
    linkGithub: "https://github.com/ThiagoGoisLira/gerador_orcamentos_servicos_informatica"
  },
  2: {
    titulo: "Imersão dev. ALURA com IA - Base de conhecimento",
    descricao: "Base de conhecimento desenvolvida durante a imersão gratuita da Alura, com foco em facilitar a consulta a documentações de linguagens de programação. O projeto contou com o suporte da IA Gemini no processo de desenvolvimento, otimizando a implementação de recursos e a estrutura da aplicação",
    imagem: "./assets/img/Screen02.png",
    tecnologias: ["HTML", "CSS", "JavaScript", "IA"],
    linkDemo: "https://thiagogoislira.github.io/Imersao_dev_alura/",
    linkGithub: "https://github.com/ThiagoGoisLira/Imersao_dev_alura"
  },
  3: {
    titulo: "Curso de HTML5 em desenvolvimento...",
    descricao: "Desenvolvimento de interfaces web modernas com tecnologias web. A busca do aprendizado contínuo, unindo programação, design e tecnologia em um workspace de desenvolvedor web. O projeto destaca estudos em front-end desenvolvido durante o curso do Gustavo Guanabara professor renomado no mundo do desenvolvimento.",
    imagem: "./assets/img/Screen03.png",
    tecnologias: ["HTML", "CSS", "JavaScript"],
    linkDemo: "https://thiagogoislira.github.io/curso_em_video_html5/",
    linkGithub: "https://github.com/ThiagoGoisLira/curso_em_video_html5"
  },
  4: {
    titulo: "Coleção de projetos GIT",
    descricao: "Bem-vindo ao meu laboratório digital. 🛠️ Aqui compartilho minha evolução como desenvolvedor web, documentando cada desafio vencido. De componentes UI refinados a integrações complexas de API, minha coleção de projetos reflete minha paixão por criar experiências de usuário memoráveis.",
    imagem: "./assets/img/Screen04.png",
    tecnologias: ["C#", "PHP", "Python", "SQL", "Vanilla HTML"],
    linkDemo: "https://github.com/ThiagoGoisLira?tab=repositories",
    linkGithub: "https://github.com/ThiagoGoisLira?tab=repositories"
  }
};

/*   ELEMENTOS DO DOM
  */
const elementosDOM = {
  modal: document.getElementById("modal-projeto"),
  modalImagem: document.getElementById("modal-imagem"),
  modalTitulo: document.getElementById("modal-titulo"),
  modalDescricao: document.getElementById("modal-descricao"),
  modalTecnologias: document.getElementById("modal-tecnologias"),
  modalLinkDemo: document.getElementById("modal-link-demo"),
  modalLinkGithub: document.getElementById("modal-link-github"),
  formularioContato: document.getElementById("formulario-contato"),
  cartoesProjeto: document.querySelectorAll(".cartao-projeto"),
  botaoFecharModal: document.querySelector(".modal-projeto__fechar"),
  overlayModal: document.querySelector(".modal-projeto__overlay")
};

/*   FUNÇÕES DO MODAL
  */
function abrirModal(idProjeto) {
  const projeto = dadosProjetos[idProjeto];
  
  if (!projeto) return;
  
  // Preencher dados do modal
  elementosDOM.modalImagem.src = projeto.imagem;
  elementosDOM.modalImagem.alt = projeto.titulo;
  elementosDOM.modalTitulo.textContent = projeto.titulo;
  elementosDOM.modalDescricao.textContent = projeto.descricao;
  elementosDOM.modalLinkDemo.href = projeto.linkDemo;
  elementosDOM.modalLinkGithub.href = projeto.linkGithub;
  
  // Limpar e preencher tecnologias
  elementosDOM.modalTecnologias.innerHTML = "";
  projeto.tecnologias.forEach(tecnologia => {
    const spanTecnologia = document.createElement("span");
    spanTecnologia.className = "modal-projeto__tecnologia";
    spanTecnologia.textContent = tecnologia;
    elementosDOM.modalTecnologias.appendChild(spanTecnologia);
  });
  
  // Abrir modal
  elementosDOM.modal.classList.add("modal-projeto--aberto");
  elementosDOM.modal.setAttribute("aria-hidden", "false");
  document.body.style.overflow = "hidden";
}

function fecharModal() {
  elementosDOM.modal.classList.remove("modal-projeto--aberto");
  elementosDOM.modal.setAttribute("aria-hidden", "true");
  document.body.style.overflow = "";
}

/*   FUNÇÕES DO FORMULÁRIO
  */
/* FUNÇÕES DO FORMULÁRIO */
function tratarEnvioFormulario(evento) {
  // Evita o recarregamento da página
  evento.preventDefault();
  
  const formulario = evento.target;
  const dadosFormulario = new FormData(formulario);
  const endpoint = 'https://formspree.io/f/xnjwgdwa';
  
  // 1. Inicia o Feedback visual (Botão girando)
  const botao = formulario.querySelector(".formulario-contato__botao");
  const textoOriginal = botao.innerHTML;
  
  botao.innerHTML = `
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" style="animation: girar 1s linear infinite;" width="24" height="24">
      <circle cx="12" cy="12" r="10"/>
      <path d="M12 6v6l4 2"/>
    </svg>
    Enviando...
  `;
  botao.disabled = true;
  
  // 2. Faz o envio real dos dados para o Formspree
  fetch(endpoint, {
      method: 'POST',
      body: dadosFormulario,
      headers: {
          'Accept': 'application/json'
      }
  })
  .then(response => {
      if (response.ok) {
          // 3. Deu certo! Mostra o ícone de sucesso.
          botao.innerHTML = `
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" width="24" height="24">
              <polyline points="20 6 9 17 4 12"/>
            </svg>
            Mensagem Enviada!
          `;
          
          // Espera 2 segundos, limpa o formulário e volta o botão ao normal
          setTimeout(() => {
            botao.innerHTML = textoOriginal;
            botao.disabled = false;
            formulario.reset();
          }, 2000);
          
      } else {
          // Trata erros vindos do Formspree
          response.json().then(data => {
              if (Object.hasOwn(data, 'errors')) {
                  alert(data["errors"].map(error => error["message"]).join(", "));
              } else {
                  alert('Ocorreu um erro ao enviar o formulário.');
              }
              // Retorna o botão ao estado normal
              botao.innerHTML = textoOriginal;
              botao.disabled = false;
          });
      }
  })
  .catch(error => {
      // Trata erros de internet/conexão
      alert('Erro de conexão. Por favor, tente novamente mais tarde.');
      botao.innerHTML = textoOriginal;
      botao.disabled = false;
  });
}

/*   SCROLL SUAVE PARA LINKS INTERNOS
  */
function configurarScrollSuave() {
  document.querySelectorAll('a[href^="#"]').forEach(link => {
    link.addEventListener("click", (evento) => {
      evento.preventDefault();
      const idAlvo = link.getAttribute("href");
      const elementoAlvo = document.querySelector(idAlvo);
      
      if (elementoAlvo) {
        elementoAlvo.scrollIntoView({
          behavior: "smooth",
          block: "start"
        });
      }
    });
  });
}

/*   INICIALIZAÇÃO
  */
function inicializar() {
  // Eventos dos cartões de projeto
  elementosDOM.cartoesProjeto.forEach(cartao => {
    cartao.addEventListener("click", () => {
      const idProjeto = cartao.dataset.projeto;
      abrirModal(idProjeto);
    });
  });
  
  // Eventos do modal
  elementosDOM.botaoFecharModal.addEventListener("click", fecharModal);
  elementosDOM.overlayModal.addEventListener("click", fecharModal);
  
  // Fechar modal com tecla ESC
  document.addEventListener("keydown", (evento) => {
    if (evento.key === "Escape" && elementosDOM.modal.classList.contains("modal-projeto--aberto")) {
      fecharModal();
    }
  });
  
  // Evento do formulário
  elementosDOM.formularioContato.addEventListener("submit", tratarEnvioFormulario);
  
  // Scroll suave
  configurarScrollSuave();
  
  // Animação de entrada dos elementos
  configurarAnimacaoEntrada();
}

/*   ANIMAÇÃO DE ENTRADA
  */
function configurarAnimacaoEntrada() {
  const observador = new IntersectionObserver(
    (entradas) => {
      entradas.forEach(entrada => {
        if (entrada.isIntersecting) {
          entrada.target.style.opacity = "1";
          entrada.target.style.transform = "translateY(0)";
        }
      });
    },
    { threshold: 0.1 }
  );
  
  // Adicionar estilo inicial e observar elementos
  const elementosAnimados = document.querySelectorAll(
    ".cartao-tecnologia, .cartao-projeto, .cartao-contato"
  );
  
  elementosAnimados.forEach((elemento, indice) => {
    elemento.style.opacity = "0";
    elemento.style.transform = "translateY(20px)";
    elemento.style.transition = `opacity 0.5s ease ${indice * 0.05}s, transform 0.5s ease ${indice * 0.05}s`;
    observador.observe(elemento);
  });
}

// Iniciar quando o DOM estiver pronto
document.addEventListener("DOMContentLoaded", inicializar);
