import React, { useState, useEffect } from 'react';
import { supabase } from './supabaseClient';
import "./CSS/caderno.css";
import { 
  IconeLapis, 
  IconePrancheta, 
  IconeLink, 
  IconeLixeira, 
  IconeGrafico, 
  IconeBlocos,
} from './IconesLapis.jsx';
import ConstrutorBlocos from './ConstrutorBlocos.jsx';
import ModalResultados from './ModalResultados.jsx';

export default function PaginaProfessor() {
  const [quizzes, setQuizzes] = useState([]);
  const [respostasPorQuiz, setRespostasPorQuiz] = useState({});
  const [novoTitulo, setNovoTitulo] = useState('');
  const [carregando, setCarregando] = useState(true);

  // Modais e Estados
  const [quizParaEditarBlocos, setQuizParaEditarBlocos] = useState(null);
  const [quizParaVerRespostas, setQuizParaVerRespostas] = useState(null);
  const [respostasQuiz, setRespostasQuiz] = useState([]);
  const [carregandoRespostas, setCarregandoRespostas] = useState(false);
  
  const [toast, setToast] = useState({ visivel: false, mensagem: '', tipo: 'normal' });
  const [idParaExcluir, setIdParaExcluir] = useState(null);

  // Função para exibir a notificação Post-it
  const mostrarNotificacao = (mensagem, tipo = 'normal') => {
    setToast({ visivel: true, mensagem, tipo });
    setTimeout(() => setToast({ visivel: false, mensagem: '', tipo: 'normal' }), 3000);
  };

  const normalizarTitulo = (titulo) => titulo.trim().replace(/\s+/g, ' ').toLocaleLowerCase();

  useEffect(() => {
    buscarQuizzes();
  }, []);

  // Busca quizzes no Supabase
  async function buscarQuizzes() {
    setCarregando(true);
    try {
      const { data, error } = await supabase
        .from('quizzes')
        .select('*')
        .order('created_at', { ascending: false });

      if (error) throw error;
      setQuizzes(data || []);

      const { data: respostas, error: erroRespostas } = await supabase
        .from('respostas')
        .select('quiz_id');

      if (erroRespostas) throw erroRespostas;
      const contagem = (respostas || []).reduce((totais, resposta) => {
        if (resposta.quiz_id) {
          totais[resposta.quiz_id] = (totais[resposta.quiz_id] || 0) + 1;
        }
        return totais;
      }, {});
      setRespostasPorQuiz(contagem);
    } catch (err) {
      console.error('Erro ao buscar quizzes:', err);
      mostrarNotificacao('Erro ao carregar projetos ou a quantidade de respostas.');
    } finally {
      setCarregando(false);
    }
  }

  // Criar novo quiz INSTANTANEAMENTE (Sem Animação)
  const criarNovoQuiz = async () => {
    const titulo = novoTitulo.trim().replace(/\s+/g, ' ');

    if (!titulo) {
      mostrarNotificacao('Digite o nome do projeto!');
      return;
    }

    try {
      const { data: projetosExistentes, error: erroBusca } = await supabase
        .from('quizzes')
        .select('titulo');

      if (erroBusca) throw erroBusca;

      const tituloJaExiste = (projetosExistentes || []).some(
        (projeto) => normalizarTitulo(projeto.titulo || '') === normalizarTitulo(titulo)
      );

      if (tituloJaExiste) {
        mostrarNotificacao('Já existe um projeto com esse nome. Escolha outro título.', 'erro');
        return;
      }

      const novoProjeto = { titulo, perguntas: [] };
      const { data, error } = await supabase
        .from('quizzes')
        .insert([novoProjeto])
        .select();

      if (error) throw error;

      if (data && data.length > 0) {
        setQuizzes([data[0], ...quizzes]);
        setRespostasPorQuiz((contagem) => ({ ...contagem, [data[0].id]: 0 }));
        setNovoTitulo('');
        setQuizParaEditarBlocos(data[0]);
        mostrarNotificacao('Projeto criado com sucesso!');
      }
    } catch (err) {
      console.error('Erro ao criar quiz:', err);
      mostrarNotificacao('Erro ao criar o projeto.');
    }
  };

  // Excluir quiz (Funcionando 100%)
  const confirmarExclusao = async () => {
    if (!idParaExcluir) return;

    try {
      const { error } = await supabase
        .from('quizzes')
        .delete()
        .eq('id', idParaExcluir);

      if (error) throw error;

      // Remove da lista na tela
      setQuizzes(quizzes.filter(q => q.id !== idParaExcluir));
      mostrarNotificacao('Projeto excluído com sucesso!');
    } catch (err) {
      console.error('Erro ao excluir quiz:', err);
      mostrarNotificacao('Erro ao apagar o projeto do banco.');
    } finally {
      setIdParaExcluir(null);
    }
  };

  // Abrir Modal e Buscar Respostas dos Alunos
  const abrirRespostas = async (quiz) => {
    setQuizParaVerRespostas(quiz);
    setCarregandoRespostas(true);
    setRespostasQuiz([]);

    try {
      const { data, error } = await supabase
        .from('respostas')
        .select('*')
        .eq('quiz_id', quiz.id)
        .order('created_at', { ascending: false });

      if (error) throw error;
      setRespostasQuiz(data || []);
      setRespostasPorQuiz((contagem) => ({ ...contagem, [quiz.id]: (data || []).length }));
    } catch (err) {
      console.error('Erro ao buscar respostas:', err);
      mostrarNotificacao('Erro ao carregar respostas deste quiz.');
    } finally {
      setCarregandoRespostas(false);
    }
  };

  // Atualiza blocos após salvar no Construtor
  const handleSalvarSucesso = (quizId, novoTitulo, novasPerguntas) => {
    setQuizzes((projetosAtuais) => projetosAtuais.map((q) => (
      q.id === quizId
        ? { ...q, titulo: novoTitulo, perguntas: novasPerguntas }
        : q
    )));
  };

  // Copiar link do quiz para o aluno
  const copiarLink = (quizId) => {
    const link = `${window.location.origin}/aluno?id=${quizId}`;
    navigator.clipboard.writeText(link);
    mostrarNotificacao('Link copiado para a área de transferência!');
  };

  return (
    <>
      <div className="prancheta-madeira">
        <div className="prancheta-clip-metal"></div>

        <div className="folha-caderno-pagina">

          {/* CABEÇALHO */}
          <div className="caixa-rabisco" style={{ background: '#fffbe6', marginBottom: '35px' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
              <IconePrancheta tamanho={36} />
              <div>
                <h1 className="titulo-lapis" style={{ margin: 0 }}>Prancheta do Professor</h1>
                <p style={{ margin: 0, color: '#555' }}>Painel de Gestão de Quizzes por Blocos</p>
              </div>
            </div>
          </div>

          {/* ÁREA DE CRIAÇÃO */}
          <div className="caixa-rabisco" style={{ marginBottom: '35px' }}>
            <h3 className="titulo-lapis" style={{ margin: '0 0 15px 0', display: 'flex', alignItems: 'center', gap: '8px' }}>
              <IconeLapis tamanho={22} /> Criar Novo Projeto
            </h3>
            <div style={{ display: 'flex', gap: '15px' }}>
              <input 
                className="input-rabisco" 
                type="text" 
                placeholder="Digite o nome do seu projeto..." 
                value={novoTitulo} 
                onChange={(e) => setNovoTitulo(e.target.value)} 
              />
              <button 
                className="btn-rabisco" 
                style={{ background: '#27ae60', color: '#fff', whiteSpace: 'nowrap' }} 
                onClick={criarNovoQuiz}
              >
                Criar Projeto
              </button>
            </div>
          </div>

          {/* LISTA DE PROJETOS */}
          <div className="caixa-rabisco">
            <h3 className="titulo-lapis" style={{ margin: '0 0 20px 0' }}>Meus Projetos</h3>

            {carregando ? (
              <p>Carregando projetos da prancheta...</p>
            ) : quizzes.length === 0 ? (
              <p style={{ fontStyle: 'italic', color: '#777' }}>Nenhum quiz criado. Crie um acima!</p>
            ) : (
              <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
                {quizzes.map((quiz) => (
                  <div key={quiz.id} className="card-projeto-item">
                    <div>
                      <strong style={{ fontSize: '1.15rem' }}>{quiz.titulo}</strong>
                      <br />
                      <small style={{ color: '#777' }}>
                        Respostas: {respostasPorQuiz[quiz.id] ?? 0}
                      </small>
                    </div>

                    {/* BOTÕES DE AÇÃO */}
                    <div style={{ display: 'flex', gap: '8px', flexWrap: 'wrap', alignItems: 'center' }}>
                      <button className="btn-rabisco" style={{ background: '#9b59b6', color: '#fff' }} onClick={() => setQuizParaEditarBlocos(quiz)}>
                        <IconeBlocos tamanho={18} /> Montar Quiz
                      </button>

                      <button className="btn-rabisco" style={{ background: '#3498db', color: '#fff' }} onClick={() => abrirRespostas(quiz)}>
                        <IconeGrafico tamanho={18} /> Respostas
                      </button>

                      <button className="btn-rabisco" style={{ background: '#f1c40f', color: '#2c3e50' }} onClick={() => copiarLink(quiz.id)}>
                        <IconeLink tamanho={18} /> Compartilhar
                      </button>

                      <button className="btn-rabisco" style={{ background: '#e74c3c', color: '#fff', padding: '8px 12px' }} onClick={() => setIdParaExcluir(quiz.id)} title="Excluir">
                        <IconeLixeira tamanho={18} />
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>

        </div>
      </div>

      {/* MODAL DE CONFIRMAÇÃO DE EXCLUSÃO */}
      {idParaExcluir && (
        <div className="modal-overlay">
          <div className="caixa-rabisco modal-excluir">
            <IconeLixeira tamanho={32} cor="#e74c3c" />
            <h3 className="titulo-lapis" style={{ color: '#c0392b', margin: '10px 0' }}>Excluir Projeto?</h3>
            <p>Tem certeza de que deseja apagar este projeto permanentemente?</p>
            <div style={{ display: 'flex', gap: '15px', marginTop: '20px' }}>
              <button className="btn-rabisco" style={{ background: '#e74c3c', color: '#fff', flex: 1 }} onClick={confirmarExclusao}>
                Sim, Excluir
              </button>
              <button className="btn-rabisco" style={{ background: '#fff', flex: 1 }} onClick={() => setIdParaExcluir(null)}>
                Cancelar
              </button>
            </div>
          </div>
        </div>
      )}

      {/* MODAL DE RESPOSTAS DOS ALUNOS */}
      {quizParaVerRespostas && (
        <ModalResultados
          quiz={quizParaVerRespostas}
          respostas={respostasQuiz}
          carregando={carregandoRespostas}
          aoFechar={() => setQuizParaVerRespostas(null)}
        />
      )}

      {/* MODAL CONSTRUTOR DE BLOCOS */}
      {quizParaEditarBlocos && (
        <ConstrutorBlocos
          quiz={quizParaEditarBlocos}
          aoFechar={() => setQuizParaEditarBlocos(null)}
          mostrarNotificacao={mostrarNotificacao}
          aoSalvarSucesso={handleSalvarSucesso}
        />
      )}

      {/* NOTIFICAÇÃO TOAST */}
      {toast.visivel && (
        <div className={`notificacao-toast ${toast.tipo === 'erro' ? 'notificacao-toast-erro' : ''}`}>
          <IconeLapis tamanho={18} />
          <span>{toast.mensagem}</span>
        </div>
      )}
    </>
  );
}