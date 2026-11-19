import React, { useState } from 'react';
import { IconeFechar, IconeGrafico } from './IconesLapis.jsx';

function Medalha({ posicao }) {
  const estilos = [
    { fita: '#3b82f6', medalha: '#f5b942', sombra: '#d99120' },
    { fita: '#3b82f6', medalha: '#d9dee7', sombra: '#a8b0bd' },
    { fita: '#3b82f6', medalha: '#d89462', sombra: '#aa6242' }
  ];
  const estilo = estilos[posicao - 1];

  return (
    <svg
      width="40"
      height="48"
      viewBox="0 0 40 48"
      role="img"
      aria-label={`Medalha de ${posicao}º lugar`}
    >
      <path d="M10 2h9l4 15-8 5z" fill={estilo.fita} stroke="#2c3e50" strokeWidth="1.5" />
      <path d="M30 2h-9l-4 15 8 5z" fill={estilo.fita} stroke="#2c3e50" strokeWidth="1.5" />
      <circle cx="20" cy="29" r="13" fill={estilo.sombra} stroke="#2c3e50" strokeWidth="1.5" />
      <circle cx="20" cy="27" r="11" fill={estilo.medalha} stroke="#2c3e50" strokeWidth="1.5" />
      <text x="20" y="31" textAnchor="middle" fontSize="12" fontWeight="bold" fill="#2c3e50">
        {posicao}
      </text>
    </svg>
  );
}

export default function ModalResultados({ quiz, respostas = [], carregando = false, aoFechar }) {
  const [visao, setVisao] = useState('menu');
  const [alunoSelecionado, setAlunoSelecionado] = useState(null);

  const listaRespostas = Array.isArray(respostas) ? respostas : [];
  const totalRespostas = listaRespostas.length;
  const perguntas = Array.isArray(quiz?.perguntas) ? quiz.perguntas : [];

  const obterDinheiroFinal = (resposta) => {
    const valor = resposta?.dinheiro_final ?? resposta?.respostas_aluno?.__dinheiro_final;
    const dinheiro = Number(valor);
    return valor !== undefined && valor !== null && Number.isFinite(dinheiro) ? dinheiro : null;
  };

  const formatarDinheiro = (valor) => (
    valor === null
      ? 'Não registrado'
      : valor.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' })
  );

  const rankingAlunos = [...listaRespostas].sort((alunoA, alunoB) => {
    const dinheiroA = obterDinheiroFinal(alunoA);
    const dinheiroB = obterDinheiroFinal(alunoB);
    if (dinheiroA === null) return dinheiroB === null ? 0 : 1;
    if (dinheiroB === null) return -1;
    return dinheiroB - dinheiroA;
  });

  // Extrai o texto da opção marcada como correta no cadastro do quiz
  const extrairGabarito = (q) => {
    if (!q) return '';

    // 1. Caso questão de arrastar blocos (ordem)
    if (q.tipo === 'ordem' || q.tipo === 'arrastar') {
      const listaB = q.blocos || q.opcoes;
      const indicesCorretos = Array.isArray(q.blocoCorreto)
        ? q.blocoCorreto
        : [q.blocoCorreto ?? q.correta];
      if (Array.isArray(listaB) && indicesCorretos.length > 0) {
        return indicesCorretos
          .map((indice) => listaB[indice])
          .filter(Boolean)
          .map((bloco) => String(bloco).trim())
          .join(', ');
      }
    }

    // 2. Caso questão aberta
    if (q.tipo === 'aberta') {
      return 'Avaliação manual pelo professor';
    }

    // 3. Procura dentro do array de opções
    if (Array.isArray(q.opcoes)) {
      const opCorreta = q.opcoes.find(op => 
        op && typeof op === 'object' && (op.correta === true || op.correta === 'true' || op.eCorreta || op.isCorrect)
      );
      if (opCorreta) {
        return String(opCorreta.texto || opCorreta.opcao || opCorreta.resposta || opCorreta.label || '').trim();
      }

      // Se q.correta for o índice numérico da opção correta
      const idxCorreto = q.correta ?? q.respostaCorreta ?? q.opcaoCorreta;
      if (typeof idxCorreto === 'number' && q.opcoes[idxCorreto]) {
        const op = q.opcoes[idxCorreto];
        return String(typeof op === 'object' ? (op.texto || op.opcao || op) : op).trim();
      }
    }

    // 4. Se o gabarito estiver como string direta na pergunta
    const gabaritoDireto = q.respostaCorreta ?? q.resposta ?? q.correta ?? q.opcaoCorreta ?? '';
    return String(gabaritoDireto).trim();
  };

  // Obtém o texto da resposta que o aluno enviou
  const obterTextoResposta = (q, idx, respAlunoObj) => {
    if (!respAlunoObj || !respAlunoObj.respostas_aluno) return '';
    const mapa = respAlunoObj.respostas_aluno;

    let val = undefined;
    if (q?.id && mapa[q.id] !== undefined) {
      val = mapa[q.id];
    } else if (mapa[idx] !== undefined) {
      val = mapa[idx];
    } else {
      const valores = Object.values(mapa);
      if (valores[idx] !== undefined) val = valores[idx];
    }

    if (val && typeof val === 'object') {
      val = val.respostaEscolhida ?? val.resposta ?? val.texto ?? val.opcao ?? val;
    }

    return val !== undefined && val !== null ? String(val).trim() : '';
  };

  // Verifica se a resposta do aluno confere com o gabarito
  const verificarAcerto = (q, idx, respAlunoObj) => {
    if (!respAlunoObj || !respAlunoObj.respostas_aluno) return false;
    const mapa = respAlunoObj.respostas_aluno;

    const item = (q?.id && mapa[q.id] !== undefined) ? mapa[q.id] : mapa[idx];
    if (item && typeof item === 'object' && typeof item.correta === 'boolean') {
      return item.correta;
    }

    const respAluno = obterTextoResposta(q, idx, respAlunoObj).toLowerCase();
    const gabarito = extrairGabarito(q).toLowerCase();

    if (!respAluno || !gabarito) return false;
    return respAluno === gabarito;
  };

  // Calcula total de acertos de um aluno
  const calcularAcertosAluno = (r) => {
    if (perguntas.length === 0) return 0;
    return perguntas.reduce((acc, q, idx) => acc + (verificarAcerto(q, idx, r) ? 1 : 0), 0);
  };

  // Média Geral de acertos da turma
  const mediaPontos = totalRespostas > 0 
    ? (listaRespostas.reduce((acc, r) => acc + calcularAcertosAluno(r), 0) / totalRespostas).toFixed(1)
    : 0;

  // Estatísticas das questões para os gráficos
  const estatisticasQuestoes = perguntas.map((q, idx) => {
    let acertos = 0;
    listaRespostas.forEach(r => {
      if (verificarAcerto(q, idx, r)) acertos++;
    });

    const percentual = totalRespostas > 0 ? Math.round((acertos / totalRespostas) * 100) : 0;
    return {
      num: idx + 1,
      pergunta: q.pergunta || `Questao ${idx + 1}`,
      acertos,
      percentual
    };
  });

  return (
    <div className="modal-overlay">
      <div className="caixa-rabisco" style={{ maxWidth: '850px', width: '100%', background: '#fff', minHeight: '480px' }}>
        
        {/* CABEÇALHO */}
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '20px', borderBottom: '2px dashed #ccc', paddingBottom: '10px' }}>
          <h2 className="titulo-lapis" style={{ margin: 0, display: 'flex', alignItems: 'center', gap: '8px' }}>
            <IconeGrafico tamanho={24} /> Respostas: {quiz?.titulo || 'Quiz'}
          </h2>
          <div style={{ display: 'flex', gap: '10px' }}>
            {visao !== 'menu' && (
              <button className="btn-rabisco" style={{ background: '#f39c12', color: '#fff' }} onClick={() => setVisao('menu')}>
                Voltar às Opções
              </button>
            )}
            <button className="btn-rabisco" style={{ background: '#e74c3c', color: '#fff' }} onClick={aoFechar}>
              <IconeFechar tamanho={18} />
            </button>
          </div>
        </div>

        {carregando ? (
          <div style={{ textAlign: 'center', padding: '40px', color: '#555', fontSize: '1.2rem' }}>
            Carregando respostas do banco de dados...
          </div>
        ) : (
          <>
            {/* VISÃO 1: MENU PRINCIPAL */}
            {visao === 'menu' && (
              <div style={{ padding: '30px 0' }}>
                <p style={{ textAlign: 'center', color: '#555', marginBottom: '30px', fontWeight: 'bold', fontSize: '1.2rem' }}>
                  Selecione o modo de visualização:
                </p>
                <div style={{ display: 'flex', gap: '30px', justifyContent: 'center', flexWrap: 'wrap' }}>
                  
                  <div 
                    className="caixa-rabisco" 
                    onClick={() => setVisao('graficos')}
                    style={{ width: '230px', height: '180px', background: '#fffbe6', cursor: 'pointer', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', textAlign: 'center' }}
                  >
                    <div style={{ background: '#f1c40f', borderRadius: '50%', width: '50px', height: '50px', display: 'flex', alignItems: 'center', justifyContent: 'center', marginBottom: '10px' }}>
                      <IconeGrafico tamanho={28} cor="#2c3e50" />
                    </div>
                    <h3 className="titulo-lapis" style={{ margin: '5px 0', fontSize: '1.3rem' }}>Gráficos Gerais</h3>
                    <small style={{ color: '#666' }}>Estatísticas e desempenho</small>
                  </div>

                  <div 
                    className="caixa-rabisco" 
                    onClick={() => setVisao('especificas')}
                    style={{ width: '230px', height: '180px', background: '#f0f8ff', cursor: 'pointer', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', textAlign: 'center' }}
                  >
                    <div style={{ background: '#3498db', borderRadius: '50%', width: '50px', height: '50px', display: 'flex', alignItems: 'center', justifyContent: 'center', marginBottom: '10px' }}>
                      <IconeGrafico tamanho={28} cor="#fff" />
                    </div>
                    <h3 className="titulo-lapis" style={{ margin: '5px 0', fontSize: '1.3rem' }}>Respostas Individuais</h3>
                    <small style={{ color: '#666' }}>Checklist detalhado por aluno</small>
                  </div>

                </div>
              </div>
            )}

            {/* VISÃO 2: GRÁFICOS */}
            {visao === 'graficos' && (
              <div style={{ padding: '5px', maxHeight: '420px', overflowY: 'auto', display: 'flex', flexDirection: 'column', gap: '20px' }}>
                
                <div style={{ display: 'flex', gap: '20px', order: 1 }}>
                  <div className="caixa-rabisco" style={{ background: '#e8f8f5', textAlign: 'center', flex: 1 }}>
                    <h2 style={{ margin: '5px 0', fontSize: '2.2rem', color: '#27ae60' }}>{totalRespostas}</h2>
                    <p style={{ margin: 0, fontSize: '0.95rem', color: '#555' }}>Alunos que responderam</p>
                  </div>
                  <div className="caixa-rabisco" style={{ background: '#fef9e7', textAlign: 'center', flex: 1 }}>
                    <h2 style={{ margin: '5px 0', fontSize: '2.2rem', color: '#f39c12' }}>{mediaPontos} / {perguntas.length}</h2>
                    <p style={{ margin: 0, fontSize: '0.95rem', color: '#555' }}>Média de Acertos da Turma</p>
                  </div>
                </div>

                <div className="caixa-rabisco" style={{ background: '#fafafa', padding: '15px', order: 2 }}>
                  <h4 className="titulo-lapis" style={{ margin: '0 0 15px 0', fontSize: '1.3rem' }}>Taxa de Acertos por Questão</h4>
                  
                  {totalRespostas === 0 ? (
                    <p style={{ fontStyle: 'italic', color: '#888', textAlign: 'center', padding: '20px 0' }}>
                      Ainda não há respostas registradas para gerar o gráfico.
                    </p>
                  ) : (
                    <div style={{ display: 'flex', flexDirection: 'column', gap: '14px' }}>
                      {estatisticasQuestoes.map((item) => (
                        <div key={item.num}>
                          <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.95rem', marginBottom: '4px' }}>
                            <strong>Questão {item.num}: {item.pergunta}</strong>
                            <span><strong>{item.percentual}%</strong> acertos ({item.acertos}/{totalRespostas})</span>
                          </div>
                          
                          <div style={{ width: '100%', background: '#e2e8f0', borderRadius: '10px', height: '18px', overflow: 'hidden', border: '1px solid #2c3e50' }}>
                            <div 
                              style={{ 
                                width: `${item.percentual}%`, 
                                background: item.percentual >= 70 ? '#2ecc71' : item.percentual >= 40 ? '#f1c40f' : '#e74c3c', 
                                height: '100%',
                                transition: 'width 0.5s ease'
                              }} 
                            />
                          </div>
                        </div>
                      ))}
                    </div>
                  )}
                </div>

                <div className="caixa-rabisco" style={{ background: '#f8f9fa', padding: '15px', order: 0 }}>
                  <h4 className="titulo-lapis" style={{ margin: '0 0 15px 0', fontSize: '1.3rem' }}>Ranking por Dinheiro</h4>
                  {rankingAlunos.length === 0 ? (
                    <p style={{ fontStyle: 'italic', color: '#888', textAlign: 'center', padding: '20px 0' }}>
                      Ainda não há alunos para montar o ranking.
                    </p>
                  ) : (
                    <>
                      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(150px, 1fr))', gap: '10px', marginBottom: rankingAlunos.length > 3 ? '15px' : 0 }}>
                        {rankingAlunos.slice(0, 3).map((aluno, idx) => {
                          const posicao = idx + 1;
                          const coresPodio = ['#fff3cd', '#e9ecef', '#f8e2d5'];

                          return (
                            <div
                              key={aluno.id || idx}
                              style={{
                                padding: '14px 10px',
                                border: '2px solid #2c3e50',
                                borderRadius: '10px',
                                background: coresPodio[idx],
                                textAlign: 'center',
                                boxShadow: posicao === 1 ? '0 3px 10px #f1c40f66' : 'none'
                              }}
                            >
                              <div style={{ display: 'flex', justifyContent: 'center', marginBottom: '4px' }}>
                                <Medalha posicao={posicao} />
                              </div>
                              <strong>{posicao}º lugar</strong>
                              <div style={{ marginTop: '5px', overflowWrap: 'anywhere' }}>
                                {aluno.nome_aluno || aluno.nome || 'Aluno Anônimo'}
                              </div>
                              <strong style={{ display: 'block', marginTop: '5px', color: '#1e8449' }}>
                                {formatarDinheiro(obterDinheiroFinal(aluno))}
                              </strong>
                            </div>
                          );
                        })}
                      </div>
                      {rankingAlunos.length > 3 && (
                        <div style={{ display: 'flex', flexDirection: 'column', gap: '7px' }}>
                          {rankingAlunos.slice(3).map((aluno, idx) => (
                            <div
                              key={aluno.id || idx + 3}
                              style={{
                                display: 'flex',
                                justifyContent: 'space-between',
                                alignItems: 'center',
                                gap: '10px',
                                padding: '9px 12px',
                                border: '1px solid #ccd1d1',
                                borderRadius: '7px',
                                background: '#fff'
                              }}
                            >
                              <span>
                                <strong>{idx + 4}º</strong> — {aluno.nome_aluno || aluno.nome || 'Aluno Anônimo'}
                              </span>
                              <strong style={{ color: '#1e8449', whiteSpace: 'nowrap' }}>
                                {formatarDinheiro(obterDinheiroFinal(aluno))}
                              </strong>
                            </div>
                          ))}
                        </div>
                      )}
                    </>
                  )}
                </div>

              </div>
            )}

            {/* VISÃO 3: TELA ESPECÍFICA */}
            {visao === 'especificas' && (
              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1.3fr', gap: '20px' }}>
                
                <div style={{ borderRight: '2px dashed #ccc', paddingRight: '15px', maxHeight: '360px', overflowY: 'auto' }}>
                  <h4 className="titulo-lapis" style={{ margin: '0 0 10px 0', fontSize: '1.2rem' }}>Alunos</h4>
                  {totalRespostas === 0 ? (
                    <p style={{ color: '#777', fontStyle: 'italic', padding: '10px' }}>Nenhum aluno respondeu ainda.</p>
                  ) : (
                    listaRespostas.map((resp, idx) => {
                      const acertos = calcularAcertosAluno(resp);
                      const passou = perguntas.length > 0 && (acertos / perguntas.length) >= 0.5;
                      const ehSelecionado = alunoSelecionado?.id === resp.id;

                      return (
                        <div 
                          key={resp.id || idx}
                          onClick={() => setAlunoSelecionado(resp)}
                          style={{
                            padding: '10px 12px',
                            marginBottom: '8px',
                            borderRadius: '8px',
                            border: '1px solid #2c3e50',
                            background: ehSelecionado ? '#d5f5e3' : '#fffbe6',
                            cursor: 'pointer',
                            display: 'flex',
                            justifyContent: 'space-between',
                            alignItems: 'center',
                            transition: 'background 0.15s'
                          }}
                        >
                          <div>
                            <strong>{resp.nome_aluno || resp.nome || 'Aluno Anônimo'}</strong>
                            <small style={{ display: 'block', color: '#666', fontSize: '0.8rem' }}>
                              Nota: {resp.nota ?? resp.pontuacao ?? `${acertos}/${perguntas.length}`}
                            </small>
                            <small style={{ display: 'block', color: '#1e8449', fontSize: '0.8rem', fontWeight: 'bold' }}>
                              Dinheiro: {formatarDinheiro(obterDinheiroFinal(resp))}
                            </small>
                          </div>
                          <span style={{ 
                            padding: '2px 8px', 
                            borderRadius: '4px', 
                            fontSize: '0.8rem', 
                            fontWeight: 'bold',
                            background: passou ? '#d4edda' : '#f8d7da',
                            color: passou ? '#155724' : '#721c24'
                          }}>
                            {passou ? 'Aprovado' : 'Reforço'}
                          </span>
                        </div>
                      );
                    })
                  )}
                </div>

                <div style={{ maxHeight: '360px', overflowY: 'auto' }}>
                  <h4 className="titulo-lapis" style={{ margin: '0 0 10px 0', fontSize: '1.2rem' }}>Respostas do Aluno</h4>
                  {alunoSelecionado ? (
                    <div className="caixa-rabisco" style={{ background: '#fafafa', padding: '15px' }}>
                      <p style={{ margin: '0 0 6px 0', fontSize: '1.1rem' }}>
                        <strong>Aluno:</strong> {alunoSelecionado.nome_aluno || alunoSelecionado.nome || 'Anônimo'}
                      </p>
                      <p style={{ margin: '0 0 10px 0', color: '#555' }}>
                        <strong>Desempenho:</strong> {calcularAcertosAluno(alunoSelecionado)} de {perguntas.length} acertos
                      </p>
                      <p style={{ margin: '0 0 10px 0', color: '#1e8449', fontSize: '1.05rem' }}>
                        <strong>Dinheiro conseguido no jogo:</strong> {formatarDinheiro(obterDinheiroFinal(alunoSelecionado))}
                      </p>
                      <hr style={{ border: 'none', borderTop: '1px dashed #ccc', margin: '10px 0' }} />
                      
                      {perguntas.map((q, i) => {
                        const acertou = verificarAcerto(q, i, alunoSelecionado);
                        const respostaDada = obterTextoResposta(q, i, alunoSelecionado);

                        return (
                          <div key={i} style={{ marginBottom: '12px', fontSize: '0.95rem' }}>
                            <p style={{ margin: '0 0 3px 0' }}>
                              <strong>Questão {i+1}:</strong> {q.pergunta || `Pergunta ${i+1}`}
                            </p>
                            {q.tipo === 'aberta' ? (
                              <p style={{ margin: 0, color: '#2c3e50' }}>
                                Resposta: <em>"{respostaDada || 'Não respondeu'}"</em> 
                                <strong style={{ marginLeft: '6px', color: '#6366f1' }}>
                                  (Questão Aberta - Avaliação do Professor)
                                </strong>
                              </p>
                            ) : (
                              <p style={{ margin: 0, color: acertou ? '#27ae60' : '#c0392b' }}>
                                Resposta: <em>"{respostaDada || 'Não respondeu'}"</em> 
                                <strong style={{ marginLeft: '6px' }}>
                                  {acertou ? '(Correto)' : '(Incorreto)'}
                                </strong>
                              </p>
                            )}
                          </div>
                        );
                      })}
                    </div>
                  ) : (
                    <div style={{ padding: '30px 10px', textAlign: 'center', color: '#888', fontStyle: 'italic' }}>
                      Selecione o nome de um aluno à esquerda para visualizar suas respostas.
                    </div>
                  )}
                </div>

              </div>
            )}
          </>
        )}

      </div>
    </div>
  );
}