import React, { useState, useEffect } from 'react';
import { supabase } from './supabaseClient';
import './CSS/jogoAluno.css';
import FaseLogin from './FaseLogin';
import JogoGerencia from './JogoGerencia';

export default function PaginaAluno() {
  const [quiz, setQuiz] = useState(null);
  const [carregando, setCarregando] = useState(true);
  const [nomeAluno, setNomeAluno] = useState('');
  const [fase, setFase] = useState('LOGIN');

  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    const quizId = params.get('id');
    if (quizId) carregarQuiz(quizId);
    else setCarregando(false);
  }, []);

  async function carregarQuiz(id) {
    try {
      const { data, error } = await supabase.from('quizzes').select('*').eq('id', id).single();
      if (error) throw error;
      setQuiz(data);
    } catch (err) {
      console.error('Erro ao carregar quiz:', err);
    } finally {
      setCarregando(false);
    }
  }

  const aoIniciarProva = (nome) => {
    setNomeAluno(nome);
    setFase('JOGO');
  };

  if (carregando) return <div style={{ textAlign: 'center', padding: '50px', color: '#fff' }}>Carregando escritório...</div>;
  if (!quiz) return <div style={{ textAlign: 'center', padding: '50px', color: '#fff' }}>Quiz não encontrado!</div>;

  return (
    <div className="aluno-game-container">
      {fase === 'LOGIN' && (
        <FaseLogin quiz={quiz} aoIniciar={aoIniciarProva} />
      )}

      {fase === 'JOGO' && (
        <JogoGerencia quiz={quiz} nomeAluno={nomeAluno} />
      )}
    </div>
  );
}