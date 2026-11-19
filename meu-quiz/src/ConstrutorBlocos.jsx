import React, { useState, useEffect } from 'react';
import { supabase } from './supabaseClient';
import './CSS/caderno.css';
import {
  IconeArrastarBloco,
  IconeBlocos,
  IconeLapis,
  IconeMultiplaEscolha,
  IconeQuestaoAberta
} from './IconesLapis.jsx';

export default function ConstrutorBlocos({ 
  quiz, 
  aoFechar, 
  onCancelar, 
  aoSalvarSucesso, 
  onQuizSalvo, 
  mostrarNotificacao 
}) {
  const [tituloQuiz, setTituloQuiz] = useState('');
  const [pilha, setPilha] = useState([]);
  const [editandoIndex, setEditandoIndex] = useState(null);
  const [mostrarEditor, setMostrarEditor] = useState(false);

  useEffect(() => {
    if (quiz) {
      setTituloQuiz(quiz.titulo || '');
      setPilha(Array.isArray(quiz.perguntas) ? quiz.perguntas : []);
    }
  }, [quiz]);

  const fecharModal = () => {
    if (aoFechar) aoFechar();
    else if (onCancelar) onCancelar();
  };

  const notificar = (msg) => {
    if (mostrarNotificacao) mostrarNotificacao(msg);
    else alert(msg);
  };

  const tiposBlocos = [
    { id: 'multipla', nome: 'Múltipla Escolha', cor: '#ff7675', icone: IconeMultiplaEscolha },
    { id: 'ordem', nome: 'Arrastar Bloco', cor: '#74b9ff', icone: IconeArrastarBloco },
    { id: 'aberta', nome: 'Questão Aberta', cor: '#55efc4', icone: IconeQuestaoAberta }
  ];

  const [postItAtual, setPostItAtual] = useState({
    tipo: 'multipla',
    pergunta: '',
    opcoes: ['', '', '', ''],
    correta: 0,
    blocos: ['', '', '', ''],
    blocoCorreto: [],
    cor: '#ff7675'
  });

  const normalizarTipo = (tipo) => {
    if (tipo === 'ordem' || tipo === 'arrastar' || tipo === 'Arrastar Bloco') return 'ordem';
    if (tipo === 'aberta' || tipo === 'Questão Aberta') return 'aberta';
    return 'multipla';
  };

  const abrirNovoPostIt = (tipoId, cor) => {
    setPostItAtual({
      tipo: tipoId,
      pergunta: '',
      opcoes: ['', '', '', ''],
      correta: 0,
      blocos: ['', '', '', ''],
      blocoCorreto: [],
      cor
    });
    setEditandoIndex(null);
    setMostrarEditor(true);
  };

  const editarItemDaPilha = (index) => {
    const item = pilha[index];
    const tipoNorm = normalizarTipo(item.tipo);
    const tipoObj = tiposBlocos.find(t => t.id === tipoNorm) || tiposBlocos[0];
    
    // Pega a lista de textos existente (seja de opcoes ou de blocos)
    const listaTexto = (item.blocos && item.blocos.length > 0 && item.blocos.some(b => b !== ''))
      ? item.blocos
      : ((item.opcoes && item.opcoes.length > 0 && item.opcoes.some(o => o !== '')) ? item.opcoes : ['', '', '', '']);

    const indicesCorretos = Array.isArray(item.blocoCorreto)
      ? item.blocoCorreto
      : [item.blocoCorreto ?? item.correta ?? 0];

    setPostItAtual({
      tipo: tipoNorm,
      pergunta: item.pergunta || '',
      opcoes: listaTexto,
      correta: item.correta || 0,
      blocos: listaTexto,
      blocoCorreto: tipoNorm === 'ordem' ? indicesCorretos : [],
      cor: item.cor || tipoObj.cor
    });
    setEditandoIndex(index);
    setMostrarEditor(true);
  };

  const concluirPostIt = () => {
    if (!postItAtual.pergunta.trim()) return notificar('Digite o enunciado da pergunta!');

    let itemParaSalvar = { ...postItAtual };

    if (postItAtual.tipo === 'ordem') {
      const validos = (postItAtual.blocos || []).filter(b => b && b.trim() !== '');
      if (validos.length < 2) return notificar('Adicione pelo menos 2 blocos de opção!');
      if (postItAtual.blocoCorreto.length === 0) return notificar('Marque pelo menos um bloco correto!');
      
      // Salva tanto em 'blocos' quanto em 'opcoes' para total compatibilidade no Aluno
      itemParaSalvar.blocos = validos;
      itemParaSalvar.opcoes = validos;
      itemParaSalvar.blocoCorreto = postItAtual.blocoCorreto;
      itemParaSalvar.correta = postItAtual.blocoCorreto;
    } else if (postItAtual.tipo === 'multipla') {
      const validas = (postItAtual.opcoes || []).filter(o => o && o.trim() !== '');
      if (validas.length < 2) return notificar('Preencha pelo menos 2 opções de resposta!');
      itemParaSalvar.opcoes = validas;
      itemParaSalvar.blocos = validas;
    } else if (postItAtual.tipo === 'aberta') {
      delete itemParaSalvar.respostaGabarito;
    }

    if (editandoIndex !== null) {
      const novaPilha = [...pilha];
      novaPilha[editandoIndex] = { ...itemParaSalvar, id: pilha[editandoIndex].id || Date.now() };
      setPilha(novaPilha);
    } else {
      setPilha([...pilha, { ...itemParaSalvar, id: Date.now() }]);
    }

    setMostrarEditor(false);
    setEditandoIndex(null);
  };

  const removerDaPilha = (e, index) => {
    e.stopPropagation();
    const novaPilha = pilha.filter((_, i) => i !== index);
    setPilha(novaPilha);
    if (editandoIndex === index) {
      setMostrarEditor(false);
      setEditandoIndex(null);
    }
  };


  const salvarQuizCompleto = async () => {
    if (!tituloQuiz.trim()) return notificar('Escreva o título do Quiz!');
    if (pilha.length === 0) return notificar('Adicione pelo menos 1 Post-it à pilha!');

    try {
      if (quiz && quiz.id) {
        const { error } = await supabase
          .from('quizzes')
          .update({ titulo: tituloQuiz, perguntas: pilha })
          .eq('id', quiz.id);

        if (error) throw error;
        notificar('Quiz atualizado e salvo com sucesso!');
        if (aoSalvarSucesso) aoSalvarSucesso(quiz.id, tituloQuiz.trim(), pilha);
      } else {
        const { data, error } = await supabase
          .from('quizzes')
          .insert([{ titulo: tituloQuiz, perguntas: pilha }])
          .select();

        if (error) throw error;
        notificar('Quiz salvo e publicado com sucesso!');
        if (onQuizSalvo) onQuizSalvo(data[0]);
      }
      fecharModal();
    } catch (err) {
      notificar('Erro ao salvar quiz: ' + err.message);
    }
  };

  return (
    <div style={{
      position: 'fixed',
      top: 0,
      left: 0,
      right: 0,
      bottom: 0,
      backgroundColor: 'rgba(0, 0, 0, 0.65)',
      display: 'flex',
      justifyContent: 'center',
      alignItems: 'center',
      zIndex: 9999,
      padding: '20px'
    }}>
      
      <div 
        className="folha-caderno" 
        style={{ 
          maxWidth: '900px', 
          width: '100%', 
          maxHeight: '90vh', 
          overflowY: 'auto', 
          margin: 0, 
          padding: '25px',
          position: 'relative',
          boxShadow: '0px 10px 30px rgba(0,0,0,0.3)'
        }}
      >
        {/* BOTÃO FECHAR (X) */}
        <button 
          type="button"
          onClick={fecharModal}
          style={{
            position: 'absolute',
            top: '15px',
            right: '20px',
            background: '#e74c3c',
            color: '#fff',
            border: '2px solid #2b2b2b',
            borderRadius: '50%',
            width: '35px',
            height: '35px',
            fontSize: '1.1rem',
            cursor: 'pointer',
            fontWeight: 'bold',
            zIndex: 100
          }}
        >
          ✕
        </button>

        {/* TÍTULO DO QUIZ */}
        <div className="caixa-rabisco" style={{ background: '#fff', marginBottom: '20px' }}>
          <h2 className="titulo-lapis" style={{ margin: '0 0 18px 0', display: 'flex', alignItems: 'center', gap: '8px' }}>
            <IconeLapis tamanho={24} /> Título do Projeto / Quiz
          </h2>
          <input 
            type="text" 
            placeholder="Ex: Avaliação Prática - Algoritmos" 
            value={tituloQuiz} 
            onChange={(e) => setTituloQuiz(e.target.value)}
            style={{ width: '100%', boxSizing: 'border-box', padding: '10px', fontSize: '1.1rem', fontFamily: 'Comic Neue', border: '2px solid #2b2b2b', borderRadius: '6px' }}
          />
        </div>

        {/* ESCOLHA DO TIPO DE QUESTAO */}
        <div className="caixa-rabisco" style={{ marginBottom: '20px', background: '#fff', textAlign: 'center' }}>
          <p style={{ margin: '0 0 10px 0', fontWeight: 'bold' }}>Escolha o tipo de questão:</p>
          <div style={{ display: 'flex', justifyContent: 'center', gap: '15px', flexWrap: 'wrap' }}>
            {tiposBlocos.map((bloco) => (
              <button
                key={bloco.id}
                type="button"
                onClick={() => abrirNovoPostIt(bloco.id, bloco.cor)}
                style={{
                  background: bloco.cor,
                  border: '2px solid #2b2b2b',
                  padding: '10px 18px',
                  borderRadius: '6px',
                  cursor: 'pointer',
                  fontFamily: 'Comic Neue',
                  fontWeight: 'bold',
                  boxShadow: '3px 3px 0px #2b2b2b',
                  display: 'flex',
                  alignItems: 'center',
                  gap: '8px'
                }}
              >
                <bloco.icone tamanho={16} /> {bloco.nome}
              </button>
            ))}
          </div>
        </div>

        {/* MESA DE TRABALHO */}
        <div 
          className="caixa-rabisco" 
          style={{ 
            position: 'relative', 
            minHeight: '400px', 
            background: '#f9f9f9', 
            backgroundImage: 'radial-gradient(#d1d1d1 1px, transparent 1px)', 
            backgroundSize: '20px 20px',
            display: 'flex',
            gap: '20px',
            padding: '20px'
          }}
        >
          {/* EDITOR DO POST-IT */}
          <div style={{ flex: 1, display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
            {!mostrarEditor ? (
              <div style={{ textAlign: 'center', color: '#7f8c8d' }}>
                <p style={{ fontSize: '1.1rem', fontWeight: 'bold', margin: '0 0 10px 0' }}>
                  Escolha um tipo de bloco abaixo para criar uma nova questão
                </p>
                <p style={{ fontSize: '0.95rem' }}>
                  ou clique em uma questão da <b>Pilha (à direita)</b> para editar.
                </p>
              </div>
            ) : (
              <div 
                style={{ 
                  width: '100%', 
                  maxWidth: '380px', 
                  background: postItAtual.cor, 
                  padding: '20px', 
                  borderRadius: '6px',
                  boxShadow: '6px 6px 15px rgba(0,0,0,0.15)',
                  transform: 'rotate(-0.5deg)',
                  maxHeight: '380px',
                  overflowY: 'auto',
                  border: '2px solid #2b2b2b'
                }}
              >
                <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '10px' }}>
                  <span style={{ fontWeight: 'bold', fontSize: '0.9rem', color: '#2b2b2b' }}>
                    {(() => {
                      const IconeTipo = tiposBlocos.find(t => t.id === postItAtual.tipo)?.icone || IconeBlocos;
                      return <IconeTipo tamanho={16} />;
                    })()} {tiposBlocos.find(t => t.id === postItAtual.tipo)?.nome} {editandoIndex !== null ? '(Editando #' + (editandoIndex + 1) + ')' : ''}
                  </span>
                  <button type="button" onClick={() => setMostrarEditor(false)} style={{ background: 'none', border: 'none', cursor: 'pointer', fontWeight: 'bold', fontSize: '1.1rem' }}>✕</button>
                </div>

                <textarea 
                  placeholder="Escreva a pergunta..."
                  value={postItAtual.pergunta}
                  onChange={(e) => setPostItAtual({ ...postItAtual, pergunta: e.target.value })}
                  rows="2"
                  style={{ width: '100%', background: 'transparent', border: 'none', borderBottom: '2px dashed #2b2b2b', fontWeight: 'bold', fontSize: '1rem', fontFamily: 'Comic Neue', resize: 'none', marginBottom: '15px', outline: 'none' }}
                />

                {/* TIPO 1: MÚLTIPLA ESCOLHA */}
                {postItAtual.tipo === 'multipla' && (
                  <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
                    <small style={{ fontWeight: 'bold' }}>Marque a alternativa correta:</small>
                    {postItAtual.opcoes.map((opcao, idx) => (
                      <div key={idx} style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                        <input 
                          type="radio" 
                          name="correta" 
                          checked={postItAtual.correta === idx} 
                          onChange={() => setPostItAtual({ ...postItAtual, correta: idx })}
                        />
                        <input 
                          type="text" 
                          placeholder={`Opção ${idx + 1}`} 
                          value={opcao}
                          onChange={(e) => {
                            const novas = [...postItAtual.opcoes];
                            novas[idx] = e.target.value;
                            setPostItAtual({ ...postItAtual, opcoes: novas, blocos: novas });
                          }}
                          style={{ flex: 1, padding: '4px 8px', border: '1px solid #2b2b2b', borderRadius: '4px', background: 'rgba(255,255,255,0.85)', fontFamily: 'Comic Neue' }}
                        />
                      </div>
                    ))}
                  </div>
                )}

                {/* TIPO 2: ARRASTAR BLOCO */}
                {postItAtual.tipo === 'ordem' && (
                  <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
                    <small style={{ fontWeight: 'bold' }}>Cadastre os blocos e marque os <b>corretos</b>:</small>
                    {postItAtual.blocos.map((blocoText, idx) => (
                      <div key={idx} style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                        <input 
                          type="checkbox" 
                          name="blocoCorreto" 
                          checked={postItAtual.blocoCorreto.includes(idx)} 
                          onChange={() => {
                            const corretos = postItAtual.blocoCorreto.includes(idx)
                              ? postItAtual.blocoCorreto.filter((indice) => indice !== idx)
                              : [...postItAtual.blocoCorreto, idx];
                            setPostItAtual({ ...postItAtual, blocoCorreto: corretos });
                          }}
                        />
                        <input 
                          type="text" 
                          placeholder={`Bloco ${idx + 1}`} 
                          value={blocoText}
                          onChange={(e) => {
                            const novos = [...postItAtual.blocos];
                            novos[idx] = e.target.value;
                            setPostItAtual({ ...postItAtual, blocos: novos, opcoes: novos });
                          }}
                          style={{ 
                            flex: 1, 
                            padding: '6px', 
                            border: '2px solid #2b2b2b', 
                            borderRadius: '6px', 
                            background: postItAtual.blocoCorreto.includes(idx) ? '#e0f7fa' : '#fff', 
                            fontWeight: 'bold',
                            fontFamily: 'Comic Neue' 
                          }}
                        />
                      </div>
                    ))}
                    <button 
                      type="button"
                      onClick={() => setPostItAtual({ ...postItAtual, blocos: [...postItAtual.blocos, ''], opcoes: [...postItAtual.opcoes, ''] })}
                      style={{ background: 'rgba(255,255,255,0.8)', border: '1px dashed #2b2b2b', padding: '4px', cursor: 'pointer', fontFamily: 'Comic Neue', marginTop: '5px', borderRadius: '4px', fontWeight: 'bold' }}
                    >
                      Adicionar Mais Bloco
                    </button>
                  </div>
                )}

                {/* TIPO 3: QUESTÃO ABERTA */}
                {postItAtual.tipo === 'aberta' && (
                  <small style={{ fontWeight: 'bold' }}>O professor avaliará a resposta manualmente.</small>
                )}

                <button 
                  type="button"
                  className="btn-rabisco" 
                  onClick={concluirPostIt}
                  style={{ marginTop: '15px', width: '100%', background: '#27ae60', color: '#fff', padding: '8px', fontSize: '1rem' }}
                >
                  ✓ Concluir Post-it
                </button>
              </div>
            )}
          </div>

          {/* PILHA DE QUESTÕES (LADO DIREITO) */}
          <div style={{ width: '240px', borderLeft: '2px dashed #ccc', paddingLeft: '15px' }}>
            <strong style={{ display: 'flex', alignItems: 'center', gap: '6px', marginBottom: '10px', fontSize: '1.05rem' }}>
              <IconeBlocos tamanho={16} /> Pilha do Quiz ({pilha.length})
            </strong>
            
            <div style={{ maxHeight: '340px', overflowY: 'auto', display: 'flex', flexDirection: 'column', gap: '10px', paddingRight: '5px' }}>
              {pilha.map((item, index) => {
                const tipoNorm = normalizarTipo(item.tipo);
                const infoTipo = tiposBlocos.find(t => t.id === tipoNorm) || { nome: 'Questão', cor: '#fff', icone: IconeBlocos };
                const IconeTipo = infoTipo.icone;

                return (
                  <React.Fragment key={item.id || index}>
                    <div 
                      onClick={() => editarItemDaPilha(index)}
                      style={{ 
                        background: infoTipo.cor, 
                        padding: '10px', 
                        borderRadius: '6px', 
                        border: editandoIndex === index ? '3px solid #2980b9' : '1.5px solid #2b2b2b',
                        boxShadow: '3px 3px 0px rgba(0,0,0,0.15)',
                        fontSize: '0.85rem',
                        position: 'relative',
                        cursor: 'pointer'
                      }}
                    >
                      <div className="controles-pilha">
                      <button
                        type="button"
                        className="btn-excluir-item"
                        onClick={(e) => removerDaPilha(e, index)}
                        aria-label="Excluir questão"
                        title="Excluir do quiz"
                      >
                        ✕
                      </button>
                      </div>
                    
                    <span style={{ fontSize: '0.75rem', fontWeight: 'bold', display: 'block', color: '#2b2b2b', marginBottom: '4px' }}>
                      #{index + 1} - <IconeTipo tamanho={14} /> {infoTipo.nome}
                    </span>
                    
                    <p style={{ margin: 0, fontWeight: 'bold', color: '#2b2b2b', overflow: 'hidden', textOverflow: 'ellipsis', display: '-webkit-box', WebkitLineClamp: 2, WebkitBoxOrient: 'vertical' }}>
                      {item.pergunta || '(Sem pergunta)'}
                    </p>
                    </div>
                  </React.Fragment>
                );
              })}
            </div>

          </div>
        </div>

        {/* BOTÃO SALVAR */}
        <button 
          type="button"
          className="btn-rabisco" 
          onClick={salvarQuizCompleto}
          style={{ width: '100%', marginTop: '15px', background: '#2980b9', color: '#fff', fontSize: '1.2rem', padding: '12px' }}
        >
          Salvar e Publicar Quiz
        </button>

      </div>
    </div>
  );
}