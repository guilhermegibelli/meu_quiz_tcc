import React, { useEffect, useState } from 'react';
import './CSS/EventoAleatorio.css';

function EventoAleatorio({ evento, jogoEstado, onClose }) {
  const [processando, setProcessando] = useState(false);

  useEffect(() => {
    setProcessando(false);
  }, [evento]);

  const aplicarImpactos = (impactos) => {
    const { setDinheiro, setMultiplicador, setEnergiaPostos, setCafeBloqueado } = jogoEstado;

    if (impactos.dinheiro) {
      setDinheiro((valor) => Math.max(0, valor + impactos.dinheiro));
    }
    if (impactos.multiplicador) {
      setMultiplicador((valor) => Math.max(0.1, parseFloat((valor + impactos.multiplicador).toFixed(1))));
    }
    if (impactos.energia) {
      setEnergiaPostos((energias) => energias.map((energia) => (
        Math.max(0, Math.min(100, energia + impactos.energia))
      )));
    }
    if (typeof impactos.bloquearCafe === 'boolean') {
      setCafeBloqueado(impactos.bloquearCafe);
    }
  };

  const escolherOpcao = (opcao) => {
    if (processando) return;
    setProcessando(true);

    const impactos = typeof opcao.impactos === 'function' ? opcao.impactos() : opcao.impactos;
    aplicarImpactos(impactos);
    onClose();
  };

  if (!evento) return null;

  return (
    <div className="evento-overlay" role="dialog" aria-modal="true" aria-labelledby="evento-titulo">
      <div className="evento-card">
        <div className="evento-fita">DECISÃO DO EXPEDIENTE</div>
        <div className="evento-canto" aria-hidden="true" />
        <h2 id="evento-titulo" className="evento-titulo">{evento.titulo}</h2>
        <p className="evento-descricao">{evento.descricao}</p>
        <div className="evento-opcoes">
          {evento.opcoes.map((opcao, indice) => (
            <button
              key={opcao.titulo}
              type="button"
              className={`btn-opcao btn-opcao-${indice === 0 ? 'a' : 'b'}`}
              onClick={() => escolherOpcao(opcao)}
              disabled={processando}
            >
              <span className="opcao-conteudo">
                <strong>{opcao.titulo}</strong>
                <small>{opcao.descricao}</small>
              </span>
              <span className="opcao-letra">{indice === 0 ? 'A' : 'B'}</span>
            </button>
          ))}
        </div>
      </div>
    </div>
  );
}

export default EventoAleatorio;