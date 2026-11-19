import React, { useState } from 'react';

// FASE 1: Tela de identificação do aluno (folha de prova de caderno)
export default function FaseLogin({ quiz, aoIniciar }) {
  const [nomeAluno, setNomeAluno] = useState('');
  const [erroNome, setErroNome] = useState('');

  const handleIniciarProva = () => {
    if (!nomeAluno.trim()) {
      setErroNome('Preencha seu nome para iniciar a prova!');
      return;
    }
    setErroNome('');
    aoIniciar(nomeAluno);
  };

  return (
    <div className="folha-prova-caderno">
      <svg className="doodle doodle-coracao" viewBox="0 0 24 24">
        <path d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z" />
      </svg>
      <svg className="doodle doodle-estrela" viewBox="0 0 24 24">
        <path d="M12 2l2.4 7.2h7.6l-6 4.8 2.4 7.2-6.4-4.8-6.4 4.8 2.4-7.2-6-4.8h7.6z" />
      </svg>
      <svg className="doodle doodle-raio" viewBox="0 0 24 24">
        <path d="M13 2L3 14h9l-1 8 10-12h-9l1-8z" />
      </svg>
      <svg className="doodle doodle-smile" viewBox="0 0 24 24">
        <circle cx="12" cy="12" r="10" />
        <circle cx="8" cy="9" r="1.5" />
        <circle cx="16" cy="9" r="1.5" />
        <path d="M7 14s2 3 5 3 5-3 5-3" />
      </svg>

      <div className="conteudo-folha">
        <div className="cabecalho-topo-prova">
          <div>
            <h1 className="titulo-prova">Avaliação Prática</h1>
            <span className="subtitulo-prova">{quiz?.modulo || 'Gestão de Projetos'}</span>
          </div>
          <div className="caixa-nota-prova">
            <span>NOTA</span>
            <strong>-- / 100</strong>
          </div>
        </div>

        <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '1.25rem', color: '#333', margin: '15px 0' }}>
          <span>Data: {new Date().toLocaleDateString('pt-BR')}</span>
          <span>Turma: {quiz?.titulo || 'Quiz de Revisão'}</span>
        </div>

        <div className="campo-nome-aluno">
          <span className="label-nome">Nome do Aluno(a):</span>
          <input
            className="input-lapis-prova"
            type="text"
            placeholder="Escreva seu nome aqui..."
            value={nomeAluno}
            onChange={(e) => {
              setNomeAluno(e.target.value);
              if (erroNome) setErroNome('');
            }}
            maxLength={30}
          />
        </div>

        {erroNome && <div className="mensagem-erro-aluno">{erroNome}</div>}

        <button className="btn-marca-texto-amarelo" onClick={handleIniciarProva}>
          Iniciar Prova
        </button>
      </div>
    </div>
  );
}