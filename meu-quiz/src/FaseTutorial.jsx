import React, { useEffect, useState } from 'react';
import { createPortal } from 'react-dom';

export const passosGuiados = [
  { titulo: 'Horário de trabalho', texto: 'O relógio mostra o horário do expediente: das 08:00 às 18:00.', alvo: 'relogio-digital-corpo', cor: 'postit-amarelo' },
  { titulo: 'Equipe e mesas', texto: 'Aqui você acompanha os funcionários, suas habilidades e o nível de energia de cada um.', alvo: 'grid-trabalho', cor: 'postit-amarelo' },
  { titulo: 'Contratar pelo RH', texto: 'Clique na aba azul “Contratar” para escolher profissionais e completar sua equipe.', alvo: 'aba-rh-tutorial', cor: 'postit-amarelo' },
  { titulo: 'Chamados técnicos', texto: 'Arraste cada chamado da esteira para uma mesa ocupada por alguém com a habilidade necessária.', alvo: 'esteira-chamados', cor: 'postit-amarelo' },
  { titulo: 'Mural de anúncios', texto: 'Use este mural para acompanhar os avisos e os novos chamados recebidos durante o expediente.', alvo: 'painel-anuncios', cor: 'postit-amarelo' },
  { titulo: 'Pausa para o café', texto: 'A aba laranja pausa o trabalho e recupera a energia dos funcionários. Clique novamente para retomar.', alvo: 'aba-cafe-tutorial', cor: 'postit-amarelo' },
  { titulo: 'Resumo do dia', texto: 'A aba verde mostra os resultados do dia. Use-a para conferir o desempenho e avançar.', alvo: 'aba-proximo-tutorial', cor: 'postit-amarelo' }
];

function MapaJogo({ passoAtivo }) {
  return (
    <svg className="mapa-manual" viewBox="0 0 760 430" role="img" aria-label="Mapa ilustrado da tela do jogo">
      <rect className="mapa-prancheta" x="14" y="14" width="732" height="402" rx="8" />
      <path className="mapa-linhas" d="M 40 72 H 720 M 40 145 H 720 M 40 218 H 720 M 40 291 H 720 M 40 364 H 720" />

      <rect className={`mapa-relogio mapa-area ${passoAtivo === 0 ? 'mapa-area-ativa' : ''}`} x="584" y="30" width="130" height="54" rx="8" />
      <text className="mapa-hora" x="649" y="64" textAnchor="middle">18:00</text>

      <rect className={`mapa-equipe mapa-area ${passoAtivo === 1 ? 'mapa-area-ativa' : ''}`} x="45" y="78" width="510" height="205" rx="8" />
      <text className="mapa-titulo" x="300" y="101" textAnchor="middle">equipe e mesas</text>
      {[0, 1, 2, 3, 4, 5].map((indice) => {
        const x = 62 + (indice % 3) * 164;
        const y = 116 + Math.floor(indice / 3) * 73;
        return (
          <g key={indice}>
            <rect className="mapa-mesa" x={x} y={y} width="142" height="56" rx="4" />
            <circle className="mapa-pessoa" cx={x + 24} cy={y + 25} r="10" />
            <path className="mapa-barra" d={`M ${x + 46} ${y + 28} H ${x + 125}`} />
          </g>
        );
      })}

      <rect className={`mapa-chamados mapa-area ${passoAtivo === 3 ? 'mapa-area-ativa' : ''}`} x="45" y="306" width="510" height="78" rx="8" />
      <text className="mapa-titulo" x="300" y="331" textAnchor="middle">esteira de chamados</text>
      {[0, 1, 2, 3].map((indice) => (
        <rect key={indice} className="mapa-cartao" x={68 + indice * 116} y="345" width="88" height="22" rx="3" />
      ))}

      <rect className={`mapa-painel mapa-area ${passoAtivo === 4 ? 'mapa-area-ativa' : ''}`} x="568" y="96" width="154" height="288" rx="8" />
      <rect className="mapa-rendimento" x="580" y="104" width="130" height="105" rx="5" />
      <text className="mapa-titulo" x="645" y="125" textAnchor="middle">rendimento</text>
      <path className="mapa-grafico" d="M 592 188 L 615 166 L 636 177 L 657 145 L 698 158" />
      <rect className="mapa-anuncios" x="580" y="220" width="130" height="152" rx="5" />
      <text className="mapa-titulo" x="645" y="242" textAnchor="middle">anuncios</text>
      {[0, 1, 2].map((indice) => (
        <rect key={indice} className="mapa-anuncio-card" x="590" y={255 + indice * 34} width="110" height="23" rx="3" />
      ))}

      <rect className={`mapa-aba mapa-rh ${passoAtivo === 2 ? 'mapa-area-ativa' : ''}`} x="15" y="112" width="25" height="70" rx="4" />
      <text className="mapa-aba-texto" x="27" y="148" textAnchor="middle" transform="rotate(-90 27 148)">RH</text>
      <rect className={`mapa-aba mapa-cafe ${passoAtivo === 5 ? 'mapa-area-ativa' : ''}`} x="15" y="190" width="25" height="70" rx="4" />
      <text className="mapa-aba-texto" x="27" y="225" textAnchor="middle" transform="rotate(-90 27 225)">cafe</text>
      <rect className={`mapa-aba mapa-resumo ${passoAtivo === 6 ? 'mapa-area-ativa' : ''}`} x="15" y="268" width="25" height="70" rx="4" />
      <text className="mapa-aba-texto" x="27" y="303" textAnchor="middle" transform="rotate(-90 27 303)">dia</text>

    </svg>
  );
}

export function TutorialOverlay({ passoTutorial, aoAvancar, aoVoltar, aoSaltar }) {
  const passo = passosGuiados[passoTutorial];
  const [alvoRect, setAlvoRect] = useState(null);

  useEffect(() => {
    if (!passo) return undefined;
    const elemento = document.querySelector(`.${passo.alvo}`);
    const atualizar = () => setAlvoRect(elemento ? elemento.getBoundingClientRect() : null);
    atualizar();
    elemento?.classList.add('destaque-tutorial-ativo');
    window.addEventListener('resize', atualizar);
    window.addEventListener('scroll', atualizar, true);
    return () => {
      elemento?.classList.remove('destaque-tutorial-ativo');
      window.removeEventListener('resize', atualizar);
      window.removeEventListener('scroll', atualizar, true);
    };
  }, [passo]);

  if (!passo) return null;

  return createPortal(
    <div className="tutorial-overlay-container">
      <div className={`balao-tutorial ${passo.cor}`}>
        <div className="cabecalho-manual">
          <span>Manual do escritorio</span>
          <button className="btn-fechar-manual" onClick={aoSaltar}>Fechar</button>
        </div>
        <MapaJogo passoAtivo={passoTutorial} />
        <div className="indicadores-passo">
          {passosGuiados.map((_, indice) => <span key={indice} className={`ponto-passo ${indice === passoTutorial ? 'ativo' : ''}`} />)}
        </div>
        <h3>{passo.titulo}</h3>
        <p>{passo.texto}</p>
        <div className="acoes-tutorial-rodape">
          {passoTutorial > 0 && <button className="btn-secundario-tutorial" onClick={aoVoltar}>Voltar</button>}
          <button className="btn-proximo-tutorial" onClick={aoAvancar}>
            {passoTutorial + 1 < passosGuiados.length ? 'Proximo' : 'Concluir'}
          </button>
        </div>
      </div>
    </div>,
    document.body
  );
}
