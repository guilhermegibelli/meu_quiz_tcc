import React, { useState } from 'react';

export default function QuestaoArrastar({ pergunta, blocos = [], aoResponder }) {
  const [indicesSelecionados, setIndicesSelecionados] = useState([]);

  // Filtra blocos válidos
  const listaBlocos = Array.isArray(blocos) 
    ? blocos.map(b => (b && typeof b === 'object' ? (b.texto || b.bloco || b.opcao || '') : String(b || ''))).filter(b => b.trim() !== '')
    : [];

  // 1. Guarda o bloco que começou a ser arrastado
  const aoIniciarArrasto = (e, index) => {
    e.dataTransfer.setData('text/plain', String(index));
  };

  // 2. Libera a área de destino para receber o bloco
  const aoPassarPorCima = (e) => {
    e.preventDefault();
  };

  // 3. Executa ao soltar o bloco dentro da caixa alvo
  const aoSoltar = (e) => {
    e.preventDefault();
    const index = e.dataTransfer.getData('text/plain');
    if (index !== undefined && index !== '') {
      const idxNum = parseInt(index, 10);
      if (!isNaN(idxNum) && listaBlocos[idxNum] !== undefined) {
        setIndicesSelecionados((indicesAtuais) => indicesAtuais.includes(idxNum)
          ? indicesAtuais
          : [...indicesAtuais, idxNum]);
      }
    }
  };

  // 4. Permite selecionar com um simples clique (ótimo para touch e agilidade)
  const aoClicarBloco = (idx) => {
    setIndicesSelecionados((indicesAtuais) => indicesAtuais.includes(idx)
      ? indicesAtuais.filter((indice) => indice !== idx)
      : [...indicesAtuais, idx]);
  };

  const handleConfirmar = () => {
    if (indicesSelecionados.length > 0 && aoResponder) {
      aoResponder(indicesSelecionados, indicesSelecionados.map((idx) => listaBlocos[idx]).join(', '));
    }
  };

  return (
    <div style={{ textAlign: 'center', width: '100%', margin: '15px 0' }}>
      <p style={{ fontWeight: 'bold', fontSize: '1.2rem', marginBottom: '15px', color: '#1a252f', lineHeight: '1.4' }}>
        "{pergunta}"
      </p>

      {/* ÁREA DE SOLTAR (ALVO) */}
      <div 
        onDragOver={aoPassarPorCima}
        onDrop={aoSoltar}
        style={{
          border: '3px dashed #2c3e50',
          borderRadius: '8px',
          padding: '16px',
          minHeight: '65px',
          background: indicesSelecionados.length > 0 ? '#e8f8f5' : '#f8f9fa',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          marginBottom: '20px',
          transition: 'all 0.2s',
          boxSizing: 'border-box'
        }}
      >
        {indicesSelecionados.length > 0 ? (
          <div style={{ display: 'flex', flexWrap: 'wrap', gap: '8px', justifyContent: 'center' }}>
            {indicesSelecionados.map((idx) => (
              <div
                key={idx}
                onClick={(e) => {
                  e.stopPropagation();
                  setIndicesSelecionados((indicesAtuais) => indicesAtuais.filter((indice) => indice !== idx));
                }}
                style={{
                background: '#3498db',
                color: '#fff',
                border: '2px solid #2c3e50',
                padding: '10px 18px',
                borderRadius: '6px',
                fontWeight: 'bold',
                fontSize: '1.1rem',
                boxShadow: '3px 3px 0px #2c3e50',
                cursor: 'pointer'
              }}>
                {listaBlocos[idx]}
              </div>
            ))}
          </div>
        ) : (
          <span style={{ color: '#7f8c8d', fontSize: '1rem', fontStyle: 'italic' }}>
            Arraste ou clique no bloco correto para posicioná-lo aqui
          </span>
        )}
      </div>

      {/* BLOCOS DISPONÍVEIS PARA ARRASTAR OU CLICAR */}
      <div style={{ display: 'flex', flexWrap: 'wrap', gap: '12px', justifyContent: 'center' }}>
        {listaBlocos.map((texto, idx) => {
          const selecionado = indicesSelecionados.includes(idx);
          return (
            <div
              key={idx}
              draggable
              onDragStart={(e) => aoIniciarArrasto(e, idx)}
              onClick={() => aoClicarBloco(idx)}
              style={{
                padding: '10px 18px',
                background: selecionado ? '#cbd5e1' : '#f1c40f',
                color: '#2c3e50',
                border: '2px solid #2c3e50',
                borderRadius: '6px',
                cursor: 'grab',
                fontWeight: 'bold',
                fontSize: '1.05rem',
                boxShadow: selecionado ? 'none' : '3px 3px 0px #2c3e50',
                userSelect: 'none',
                opacity: selecionado ? 0.6 : 1,
                transition: 'transform 0.1s, background 0.2s'
              }}
              onMouseEnter={(e) => { if (!selecionado) e.currentTarget.style.transform = 'translateY(-2px)'; }}
              onMouseLeave={(e) => { e.currentTarget.style.transform = 'translateY(0)'; }}
            >
              {texto}
            </div>
          );
        })}
      </div>

      {/* BOTÃO PARA CONFIRMAR A RESPOSTA */}
      {indicesSelecionados.length > 0 && (
        <div style={{ marginTop: '22px' }}>
          <button
            type="button"
            onClick={handleConfirmar}
            style={{
              padding: '10px 24px',
              background: '#27ae60',
              color: '#fff',
              border: '2px solid #2c3e50',
              borderRadius: '6px',
              fontWeight: 'bold',
              cursor: 'pointer',
              fontSize: '1.1rem',
              boxShadow: '3px 3px 0px #2c3e50'
            }}
          >
            Confirmar Resposta →
          </button>
        </div>
      )}
    </div>
  );
}