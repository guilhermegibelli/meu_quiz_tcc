import React from 'react';
import PaginaAluno from './PaginaAluno';
import PaginaProfessor from './PaginaProfessor';

const urlParams = new URLSearchParams(window.location.search);
const quizId = urlParams.get('id');

export default function App() {
  // Se houver ID na URL, renderiza SOMENTE o componente do aluno
  if (quizId) {
    return <PaginaAluno idQuiz={quizId} />;
  }

  // Caso contrário, renderiza SOMENTE a visão do professor
  return <PaginaProfessor />;
}