import React, { useState, useEffect, useRef } from 'react';
import { createPortal } from 'react-dom';
import './CSS/JogoGerencia.css';
import './CSS/jogoAluno.css';
import { supabase } from './supabaseClient';
import QuestaoArrastar from './QuestaoArrastar';
import { TutorialOverlay, passosGuiados } from './FaseTutorial';
import {
  GerenteSVG,
  DevEstressadoSVG,
  DevFelizSVG,
  DevCafeSVG,
  CarlosSVG,
  DevCansadoSVG,
  DevIdeiaSVG,
  DevDormindoSVG,
  SuporteFoneSVG,
  DevComemorandoSVG,
  DevPensativoSVG
} from './BonecosEscritorio';

const renderAvatar = (id, tamanho) => {
  if (id === 102) return <CarlosSVG tamanho={tamanho} />;
  const mod = id % 9;
  switch (mod) {
    case 0: return <GerenteSVG tamanho={tamanho} />;
    case 1: return <DevEstressadoSVG tamanho={tamanho} />;
    case 2: return <DevFelizSVG tamanho={tamanho} />;
    case 3: return <DevCafeSVG tamanho={tamanho} />;
    case 4: return <DevIdeiaSVG tamanho={tamanho} />;
    case 5: return <DevDormindoSVG tamanho={tamanho} />;
    case 6: return <SuporteFoneSVG tamanho={tamanho} />;
    case 7: return <DevComemorandoSVG tamanho={tamanho} />;
    case 8: return <DevPensativoSVG tamanho={tamanho} />;
    default: return <DevFelizSVG tamanho={tamanho} />;
  }
};
import EventoAleatorio from './EventoAleatorio';
// --- SVGs ILUSTRADOS ---

function ChamadoPastaSVG() {
  return (
    <svg width="36" height="36" viewBox="0 0 60 60" fill="none" stroke="#2c3e50" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round">
      <path d="M 10 20 L 25 20 L 30 25 L 50 25 L 50 50 L 10 50 Z" fill="#fff" />
      <line x1="18" y1="33" x2="42" y2="33" />
      <line x1="18" y1="41" x2="34" y2="41" />
    </svg>
  );
}

function ChamadoImpressoraSVG() {
  return (
    <svg width="36" height="36" viewBox="0 0 60 60" fill="none" stroke="#2c3e50" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round">
      <rect x="15" y="10" width="30" height="15" fill="#fff" />
      <rect x="10" y="25" width="40" height="20" rx="3" fill="#fff" />
      <rect x="18" y="38" width="24" height="15" fill="#fff" />
      <circle cx="42" cy="32" r="2" fill="#2c3e50" />
    </svg>
  );
}

function ChamadoMonitorSVG() {
  return (
    <svg width="36" height="36" viewBox="0 0 60 60" fill="none" stroke="#2c3e50" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round">
      <rect x="10" y="10" width="40" height="28" rx="2" fill="#fff" />
      <line x1="30" y1="38" x2="30" y2="48" />
      <line x1="20" y1="48" x2="40" y2="48" />
      <line x1="16" y1="20" x2="30" y2="20" strokeWidth="2" />
      <line x1="16" y1="26" x2="24" y2="26" strokeWidth="2" />
    </svg>
  );
}

function AnuncioMegafoneSVG() {
  return (
    <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="#be185d" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M22 10v3M2 15l10 4V5L2 9v6zM12 5l7-3v18l-7-3M6 15v5" />
    </svg>
  );
}

function MesaVaziaSVG() {
  return (
    <svg width="36" height="36" viewBox="0 0 60 60" fill="none" stroke="#2c3e50" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round">
      <path d="M 10 25 L 50 25 L 45 45 L 15 45 Z" fill="#fff" />
      <line x1="15" y1="45" x2="15" y2="55" />
      <line x1="45" y1="45" x2="45" y2="55" />
      <line x1="20" y1="25" x2="20" y2="15" />
      <line x1="40" y1="25" x2="40" y2="15" />
    </svg>
  );
}

function ChamadoSegurancaSVG() {
  return (
    <svg width="36" height="36" viewBox="0 0 60 60" fill="none" stroke="#2c3e50" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round">
      <path d="M30 7 L49 14 V28 C49 40 41 49 30 54 C19 49 11 40 11 28 V14 Z" fill="#dbeafe" />
      <path d="M21 30 L27 36 L40 22" stroke="#2563eb" strokeWidth="4" />
    </svg>
  );
}

function ChamadoMarketingSVG() {
  return (
    <svg width="36" height="36" viewBox="0 0 60 60" fill="none" stroke="#2c3e50" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round">
      <path d="M12 29 L42 17 V43 L12 34 Z" fill="#fbcfe8" />
      <path d="M12 34 V46 C12 49 17 50 19 47 L23 36" />
      <path d="M48 23 Q55 30 48 37 M53 18 Q63 30 53 42" stroke="#be185d" />
    </svg>
  );
}

function RaioSVG() {
  return (
    <svg width="12" height="12" viewBox="0 0 24 24" fill="#f59e0b" stroke="#fff" strokeWidth="1">
      <polygon points="13,2 3,14 12,14 11,22 21,10 12,10" />
    </svg>
  );
}

function AmpulhetaSVG() {
  return (
    <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="#d97706" strokeWidth="2" strokeLinecap="round">
      <path d="M5 22h14M5 2h14M17 22v-4.172a2 2 0 0 0-.586-1.414L12 12l-4.414 4.414A2 2 0 0 0 7 17.828V22M7 2v4.172a2 2 0 0 0 .586 1.414L12 12l4.414-4.414A2 2 0 0 0 17 6.172V2" />
    </svg>
  );
}

function PinLocalSVG() {
  return (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#fff" strokeWidth="2.5" strokeLinecap="round">
      <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z" />
      <circle cx="12" cy="10" r="3" />
    </svg>
  );
}

function AlertaPlacaSVG() {
  return (
    <svg width="36" height="36" viewBox="0 0 60 60" fill="none" stroke="#dc2626" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round">
      <polygon points="30,8 52,48 8,48" fill="#fef08a" stroke="#d97706" strokeWidth="3" />
      <line x1="30" y1="22" x2="30" y2="34" stroke="#dc2626" strokeWidth="4" />
      <circle cx="30" cy="40" r="2.5" fill="#dc2626" stroke="none" />
    </svg>
  );
}

function CadeadoSVG() {
  return (
    <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="#ffffff" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
      <rect x="3" y="11" width="18" height="11" rx="2" ry="2" fill="#dc2626" />
      <path d="M7 11V7a5 5 0 0 1 10 0v4" />
    </svg>
  );
}

// --- CONFIGURAÇÕES DE DIFICULDADE E DADOS ---

const DIFICULDADES = {
  facil: { rotulo: "Fácil", cor: "#16a34a", bgTag: "#dcfce7", tempoMs: 3000, ganhoBase: 30, bonusMult: 0.1, desgasteEnergia: 10 },
  medio: { rotulo: "Médio", cor: "#d97706", bgTag: "#fef3c7", tempoMs: 6000, ganhoBase: 60, bonusMult: 0.2, desgasteEnergia: 20 },
  dificil: { rotulo: "Difícil", cor: "#dc2626", bgTag: "#fee2e2", tempoMs: 10000, ganhoBase: 120, bonusMult: 0.4, desgasteEnergia: 35 },
};

const REQUISITOS_POSSIVEIS = [
  { requere: "Banco de Dados / SQL", titulo: "Erro no Banco SQL", Componente: ChamadoImpressoraSVG },
  { requere: "Frontend / Layout", titulo: "Ajustar Layout CSS", Componente: ChamadoMonitorSVG },
  { requere: "Infraestrutura / Redes", titulo: "Queda no Servidor", Componente: ChamadoPastaSVG },
  { requere: "Segurança / APIs", titulo: "Falha na API Rest", Componente: ChamadoSegurancaSVG },
  { requere: "Marketing / Anúncios", titulo: "Campanha Redes Sociais", Componente: ChamadoMarketingSVG },
  { requere: "Marketing / Anúncios", titulo: "Criar Comercial Tech", Componente: ChamadoMarketingSVG },
];

const LISTA_DE_EVENTOS = [
  {
    titulo: 'Oportunidade de Consultoria Express',
    descricao: 'Um cliente antigo precisa de um atendimento urgente em uma hora. A equipe consegue assumir este desafio?',
    opcoes: [
      {
        titulo: 'Aceitar o desafio',
        descricao: 'Custa 30% da energia, mas concede R$ 150 e +0.2x no multiplicador.',
        impactos: { dinheiro: 150, multiplicador: 0.2, energia: -30 }
      },
      {
        titulo: 'Recusar educadamente',
        descricao: 'Sem custos ou recompensas. A equipe mantém a energia intacta.',
        impactos: {}
      }
    ]
  },
  {
    titulo: 'Proposta de Software Paralelo',
    descricao: 'Um fornecedor oferece uma licença barata que promete acelerar o trabalho do escritório.',
    opcoes: [
      {
        titulo: 'Comprar software paralelo',
        descricao: 'Pague R$ 20 e ganhe +0.3x. Existe risco de fiscalização e perda adicional de R$ 100.',
        impactos: () => ({ dinheiro: Math.random() < 0.35 ? -120 : -20, multiplicador: 0.3 })
      },
      {
        titulo: 'Investir na licença oficial',
        descricao: 'Custa R$ 80 e garante +0.1x de eficiência, sem riscos extras.',
        impactos: { dinheiro: -80, multiplicador: 0.1 }
      }
    ]
  },
  {
    titulo: 'A Cafeteira do Escritório Quebrou',
    descricao: 'A equipe está sonolenta e o ritmo do expediente caiu sem o café da manhã.',
    opcoes: [
      {
        titulo: 'Comprar máquina profissional',
        descricao: 'Custa R$ 100, recupera 50% de energia e melhora o ritmo com +0.1x.',
        impactos: { dinheiro: -100, energia: 50, multiplicador: 0.1, bloquearCafe: false }
      },
      {
        titulo: 'Adiar a compra',
        descricao: 'Sem custo agora, mas a Pausa Café fica desativada. O desbloqueio posterior custará R$ 40.',
        impactos: { bloquearCafe: true }
      }
    ]
  },
  {
    titulo: 'Investimento em Marketing de Guerrilha',
    descricao: 'Uma agência parceira propôs uma campanha viral rápida para atrair novos clientes.',
    opcoes: [
      {
        titulo: 'Patrocinar a campanha',
        descricao: 'Custa R$ 60 e garante +0.5x no multiplicador do dia.',
        impactos: { dinheiro: -60, multiplicador: 0.5 }
      },
      {
        titulo: 'Guardar o caixa',
        descricao: 'Não altera o multiplicador e preserva o saldo atual.',
        impactos: {}
      }
    ]
  }
];

const TODOS_CANDIDATOS = [
  { id: 101, nome: "Ana", cargo: "Dev Front-end", fortes: ["Frontend / Layout"], custo: 100 },
  { id: 102, nome: "Carlos", cargo: "Admin de Sistemas", fortes: ["Banco de Dados / SQL"], custo: 100 },
  { id: 103, nome: "Beatriz", cargo: "Analista de Marketing", fortes: ["Marketing / Anúncios"], custo: 120 },
  { id: 104, nome: "Lucas", cargo: "Suporte TI", fortes: ["Infraestrutura / Redes"], custo: 100 },
  { id: 105, nome: "Fernanda", cargo: "Growth Hacker", fortes: ["Marketing / Anúncios", "Frontend / Layout"], custo: 200 },
  { id: 106, nome: "Gabriel", cargo: "DevOps Engineer", fortes: ["Infraestrutura / Redes"], custo: 180 },
  { id: 107, nome: "Renato (Sênior)", cargo: "Dev Fullstack + Marketing", fortes: ["Frontend / Layout", "Marketing / Anúncios"], custo: 300 },
  { id: 108, nome: "Juliana (Sênior)", cargo: "Dados + Segurança", fortes: ["Banco de Dados / SQL", "Segurança / APIs"], custo: 350 },
];

const CUSTO_DEMISSAO = 100.00;

export default function JogoGerencia({ 
  quiz, 
  nomeAluno = 'Aluno', 
  querTutorial = false, 
  diaAtual: diaProp = 1, 
  aoFinalizarDia 
}) {
  const [diaAtual, setDiaAtual] = useState(diaProp);
  const [animando, setAnimando] = useState(false);

  // TUTORIAL
  const [tutorialAtivo, setTutorialAtivo] = useState(false);
  const [passoTutorial, setPassoTutorial] = useState(0);
  const [mostrarAvisoManual, setMostrarAvisoManual] = useState(true);
  const ignorarCliqueAposDrop = useRef(false);

  const [postos, setPostos] = useState([null, null, null, null, null, null]);
  const [energiaPostos, setEnergiaPostos] = useState([100, 100, 100, 100, 100, 100]);
  const [candidatosDisponiveis, setCandidatosDisponiveis] = useState(TODOS_CANDIDATOS);

  const [modoSelecaoInicial, setModoSelecaoInicial] = useState(true);
  const [candidatoSelecionadoParaAlocar, setCandidatoSelecionadoParaAlocar] = useState(null);
  
  // PAINEIS DESLIZANTES
  const [mostrarModalRH, setMostrarModalRH] = useState(false);
  const [mostrarPainelResumo, setMostrarPainelResumo] = useState(false);

  // CONTROLE DO QUIZ DIÁRIO DO PROFESSOR
  const perguntasDoQuiz = Array.isArray(quiz?.perguntas) ? quiz.perguntas : [];
  const [quizModalAberto, setQuizModalAberto] = useState(false);
  const [perguntaDoDia, setPerguntaDoDia] = useState(null);
  const [respostaSelecionada, setRespostaSelecionada] = useState(null);
  const [feedbackQuiz, setFeedbackQuiz] = useState(null);
  const [respostasSalvas, setRespostasSalvas] = useState({});
  const [totalAcertos, setTotalAcertos] = useState(0);
  const [jogoConcluido, setJogoConcluido] = useState(false);
  const [salvandoRespostas, setSalvandoRespostas] = useState(false);
  const [respostaAberta, setRespostaAberta] = useState('');

  const [emPausaCafe, setEmPausaCafe] = useState(false);
  const [cafeBloqueado, setCafeBloqueado] = useState(false);
  const [eventoAtual, setEventoAtual] = useState(null);
  const diasComEvento = useRef(new Set());
  const horariosEventos = useRef(new Map());

  // CONTROLE DO ALERTA DA ESTEIRA E TRAVAMENTO
  const [alertaFila, setAlertaFila] = useState(null);
  const [filaCongelada, setFilaCongelada] = useState(false);
  const [filaTrancada, setFilaTrancada] = useState(false);
  const [equipeAlertaSelecionada, setEquipeAlertaSelecionada] = useState([]);
  const [equipeAlertaEmAcao, setEquipeAlertaEmAcao] = useState([]);

  const [tarefasEmAndamento, setTarefasEmAndamento] = useState({});
  const [tarefaSelecionada, setTarefaSelecionada] = useState(null);

  const [feedbackPosto, setFeedbackPosto] = useState(null);
  const [animarMultiplicador, setAnimarMultiplicador] = useState(false);
  const [dinheiro, setDinheiro] = useState(400.00);
  const [multiplicador, setMultiplicador] = useState(1.0);

  // METRICAS E HISTÓRICO
  const [totaisChamadosConcluidos, setTotaisChamadosConcluidos] = useState(0);
  const [totalChamadosGerados, setTotalChamadosGerados] = useState(2);

  // CONTROLE DE TEMPO
  const [minutosTotais, setMinutosTotais] = useState(8 * 60);
  const [historicoRendimento, setHistoricoRendimento] = useState([{ dia: 1, ganhos: 0 }]);

  const [chamadosEsteira, setChamadosEsteira] = useState([
    { id: 'ch-init-1', titulo: "Erro no Banco SQL", requere: "Banco de Dados / SQL", dificuldade: 'facil', Componente: ChamadoImpressoraSVG },
    { id: 'ch-init-2', titulo: "Ajustar Layout CSS", requere: "Frontend / Layout", dificuldade: 'medio', Componente: ChamadoMonitorSVG },
  ]);

  const [avisosMural, setAvisosMural] = useState([
    { id: 'aviso-inicio', titulo: 'Expediente iniciado', detalhe: 'A equipe está pronta para trabalhar.' },
    { id: 'aviso-foco', titulo: 'Foco do dia', detalhe: 'Resolva os chamados da fila.' },
  ]);

  const hora = Math.floor(minutosTotais / 60);
  const minExibicao = minutosTotais % 60;
  const horaFormatada = `${String(hora).padStart(2, '0')}:${String(minExibicao).padStart(2, '0')}`;

  const jogoPausado = Boolean(
    tutorialAtivo ||
    modoSelecaoInicial || 
    candidatoSelecionadoParaAlocar || 
    mostrarModalRH || 
    mostrarPainelResumo ||
    tarefaSelecionada || 
    eventoAtual ||
    quizModalAberto ||
    jogoConcluido
  );

  const avancarTutorial = () => {
    if (passoTutorial + 1 < passosGuiados.length) {
      setPassoTutorial((prev) => prev + 1);
    } else {
      setTutorialAtivo(false);
    }
  };

  const voltarTutorial = () => {
    setPassoTutorial((prev) => Math.max(0, prev - 1));
  };

  const saltarTutorial = () => {
    setTutorialAtivo(false);
  };

  const abrirManual = () => {
    setMostrarAvisoManual(false);
    setPassoTutorial(0);
    setTutorialAtivo(true);
  };

  const jogoPausadoRef = useRef(jogoPausado);
  useEffect(() => {
    jogoPausadoRef.current = jogoPausado;
  }, [jogoPausado]);

  // SORTEIO DE ALERTA DE FILA (A cada 15 segundos)
  useEffect(() => {
    if (jogoPausado || alertaFila) return;

    const intervalorAlerta = setInterval(() => {
      if (Math.random() < 0.35 && !alertaFila && !filaCongelada) {
        const novoAlerta = {
          id: `alerta-${Date.now()}`,
          titulo: 'Incidente no Servidor Central',
          descricao: 'Uma falha crítica exige uma força-tarefa de três pessoas para estabilizar o atendimento.',
          isAlerta: true,
          Componente: AlertaPlacaSVG
        };
        setAlertaFila(novoAlerta);
        setFilaCongelada(true);
        setChamadosEsteira((prev) => [...prev, novoAlerta]);
      }
    }, 15000);

    return () => clearInterval(intervalorAlerta);
  }, [jogoPausado, alertaFila, filaCongelada]);

  // VERIFICA SE O ALERTA CHEGOU AO FINAL DA ESTEIRA PARA TRANCAR
  useEffect(() => {
    if (alertaFila && chamadosEsteira.length > 0) {
      const ultimoElemento = chamadosEsteira[chamadosEsteira.length - 1];
      if (ultimoElemento.id === alertaFila.id) {
        setFilaTrancada(true);
      }
    } else if (!alertaFila) {
      setFilaTrancada(false);
    }
  }, [chamadosEsteira, alertaFila]);

  // Cada dia recebe um horario aleatorio entre 11:00 e 16:59.
  useEffect(() => {
    if (!horariosEventos.current.has(diaAtual)) {
      const inicioJanela = 11 * 60;
      const fimJanela = 16 * 60 + 59;
      const horarioSorteado = inicioJanela + Math.floor(Math.random() * (fimJanela - inicioJanela + 1));
      horariosEventos.current.set(diaAtual, horarioSorteado);
    }

    const horarioDoDia = horariosEventos.current.get(diaAtual);
    const estaNaJanelaDoEvento = minutosTotais >= horarioDoDia && minutosTotais < 17 * 60;

    if (!jogoPausado && estaNaJanelaDoEvento && !eventoAtual && !alertaFila && !diasComEvento.current.has(diaAtual)) {
      const eventoSorteado = LISTA_DE_EVENTOS[Math.floor(Math.random() * LISTA_DE_EVENTOS.length)];
      diasComEvento.current.add(diaAtual);
      setEventoAtual(eventoSorteado);
    }
  }, [jogoPausado, eventoAtual, alertaFila, diaAtual, minutosTotais]);

  useEffect(() => {
    if (jogoPausado) return;

    const intervalorTempo = setInterval(() => {
      setMinutosTotais((prev) => {
        if (prev + 10 >= 1080) {
          setMostrarPainelResumo(true);
          return 1080;
        }
        return prev + 10;
      });
    }, 1200);

    return () => clearInterval(intervalorTempo);
  }, [jogoPausado]);

  useEffect(() => {
    if (!emPausaCafe || jogoPausado) return;
    const intervalCafe = setInterval(() => {
      setEnergiaPostos((prevEnergia) => {
        let todosCheios = true;
        const novaEnergia = prevEnergia.map((e, idx) => {
          if (!postos[idx]) return e;
          const proxima = Math.min(100, e + 15);
          if (proxima < 100) todosCheios = false;
          return proxima;
        });

        if (todosCheios) setEmPausaCafe(false);
        return novaEnergia;
      });
    }, 1000);

    return () => clearInterval(intervalCafe);
  }, [emPausaCafe, jogoPausado, postos]);

  useEffect(() => {
    const intervaloGerador = setInterval(() => {
      if (jogoPausadoRef.current || hora >= 18 || filaCongelada || filaTrancada) return;
      setTotalChamadosGerados((prev) => prev + 1);
      const modeloSorteado = REQUISITOS_POSSIVEIS[Math.floor(Math.random() * REQUISITOS_POSSIVEIS.length)];
      const tiposDificuldade = ['facil', 'facil', 'medio', 'medio', 'dificil'];
      const diffSorteada = tiposDificuldade[Math.floor(Math.random() * tiposDificuldade.length)];
      const idChamado = `ch-${Date.now()}-${Math.random().toString(36).substring(2, 6)}`;

      setChamadosEsteira((prev) => {
        if (prev.length >= 5) return prev;

        return [
          ...prev,
          {
            id: idChamado,
            titulo: modeloSorteado.titulo,
            requere: modeloSorteado.requere,
            dificuldade: diffSorteada,
            Componente: modeloSorteado.Componente,
          }
        ];
      });
      setAvisosMural((avisosAtuais) => [
        { id: `aviso-${idChamado}`, titulo: 'Novo chamado recebido', detalhe: modeloSorteado.titulo },
        ...avisosAtuais
      ].slice(0, 4));
    }, 3000);

    return () => clearInterval(intervaloGerador);
  }, [hora, filaCongelada, filaTrancada]);

  useEffect(() => {
    if (jogoPausado || emPausaCafe) return;

    const intervalProgresso = setInterval(() => {
      setTarefasEmAndamento((prev) => {
        const proximoEstado = { ...prev };
        let mudou = false;

        Object.keys(proximoEstado).forEach((indexStr) => {
          const indexPosto = Number(indexStr);
          const tarefa = proximoEstado[indexPosto];
          if (!tarefa) return;

          const energiaAtual = energiaPostos[indexPosto] ?? 100;
          if (energiaAtual <= 0) return;
          const fatorVelocidade = energiaAtual < 40 ? 100 : 200;

          if (tarefa.tempoRestante <= fatorVelocidade) {
            const diffConfig = DIFICULDADES[tarefa.dificuldade];
            const ganho = diffConfig.ganhoBase * multiplicador;

            setDinheiro((p) => p + ganho);
            setMultiplicador((p) => parseFloat((p + diffConfig.bonusMult).toFixed(1)));
            setTotaisChamadosConcluidos((prev) => prev + 1);
            registrarGanhoNoDia(ganho);

            setEnergiaPostos((prevEnergia) => {
              const nova = [...prevEnergia];
              nova[indexPosto] = Math.max(0, nova[indexPosto] - diffConfig.desgasteEnergia);
              return nova;
            });

            setAnimarMultiplicador(true);
            setTimeout(() => setAnimarMultiplicador(false), 600);

            delete proximoEstado[indexPosto];
            mudou = true;
          } else {
            proximoEstado[indexPosto] = {
              ...tarefa,
              tempoRestante: tarefa.tempoRestante - fatorVelocidade,
            };
            mudou = true;
          }
        });

        return mudou ? proximoEstado : prev;
      });
    }, 200);

    return () => clearInterval(intervalProgresso);
  }, [jogoPausado, emPausaCafe, multiplicador, energiaPostos]);

  const alternarMembroAlerta = (indexPosto) => {
    setEquipeAlertaSelecionada((prev) => (
      prev.includes(indexPosto)
        ? prev.filter((index) => index !== indexPosto)
        : prev.length < 3 ? [...prev, indexPosto] : prev
    ));
  };

  const resolverAlerta = () => {
    if (!alertaFila) return;

    if (equipeAlertaSelecionada.length !== 3) {
      alert('Selecione exatamente 3 pessoas da equipe para resolver o incidente.');
      return;
    }

    setEquipeAlertaEmAcao(equipeAlertaSelecionada);
    setDinheiro((prev) => prev + 150);
    setMultiplicador((prev) => parseFloat((prev + 0.2).toFixed(1)));

    setTarefasEmAndamento((prev) => {
      const novasTarefas = { ...prev };
      equipeAlertaSelecionada.forEach((indexPosto) => {
        novasTarefas[indexPosto] = {
          dificuldade: 'dificil',
          tempoTotal: 12000,
          tempoRestante: 12000,
          eAnuncio: true
        };
      });
      return novasTarefas;
    });

    setEnergiaPostos((prev) => prev.map((energia, index) => (
      equipeAlertaSelecionada.includes(index)
        ? Math.max(0, energia - 20)
        : energia
    )));
    setChamadosEsteira((prev) => prev.filter((item) => item.id !== alertaFila.id));
    setAlertaFila(null);
    setFilaCongelada(false);
    setFilaTrancada(false);
    setEquipeAlertaSelecionada([]);
    setTarefaSelecionada(null);
    setTimeout(() => setEquipeAlertaEmAcao([]), 5000);
  };

  const totalOcupados = postos.filter((p) => p !== null).length;

  const alocarFuncionarioNoPosto = (indexPosto) => {
    if (!candidatoSelecionadoParaAlocar) return;
    const postoAtualOcupado = postos[indexPosto] !== null;

    if (postoAtualOcupado) {
      if (dinheiro < candidatoSelecionadoParaAlocar.custo + CUSTO_DEMISSAO) {
        alert(`Saldo insuficiente! Requer R$${(candidatoSelecionadoParaAlocar.custo + CUSTO_DEMISSAO).toFixed(2)}.`);
        return;
      }
      setDinheiro((prev) => prev - candidatoSelecionadoParaAlocar.custo - CUSTO_DEMISSAO);
    } else {
      const estaNoDraftInicial = totalOcupados < 4 && candidatosDisponiveis.length > 4;
      if (!estaNoDraftInicial && dinheiro < candidatoSelecionadoParaAlocar.custo) {
        alert("Saldo insuficiente para esta contratação!");
        return;
      }
      if (!estaNoDraftInicial) {
        setDinheiro((prev) => prev - candidatoSelecionadoParaAlocar.custo);
      }
    }

    const novosPostos = [...postos];
    novosPostos[indexPosto] = candidatoSelecionadoParaAlocar;
    setPostos(novosPostos);

    setEnergiaPostos((prev) => {
      const nova = [...prev];
      nova[indexPosto] = 100;
      return nova;
    });

    setCandidatosDisponiveis((prev) => prev.filter((c) => c.id !== candidatoSelecionadoParaAlocar.id));
    setCandidatoSelecionadoParaAlocar(null);

    const novosOcupadosCount = novosPostos.filter((p) => p !== null).length;
    setModoSelecaoInicial(novosOcupadosCount < 4);
  };

  const registrarGanhoNoDia = (valor) => {
    setHistoricoRendimento((prev) => {
      const novoHistorico = [...prev];
      const indiceDia = novoHistorico.findIndex((item) => item.dia === diaAtual);

      if (indiceDia !== -1) {
        novoHistorico[indiceDia] = {
          ...novoHistorico[indiceDia],
          ganhos: Math.max(0, novoHistorico[indiceDia].ganhos + valor),
        };
      } else {
        novoHistorico.push({ dia: diaAtual, ganhos: Math.max(0, valor) });
      }

      return novoHistorico;
    });
  };

  const lidarComDragStart = (e, itemData, origem) => {
    if (itemData.isAlerta || filaTrancada) return;
    e.dataTransfer.setData('origem', origem);
    e.dataTransfer.setData('id', itemData.id);
  };

  const lidarComDragOver = (e) => {
    e.preventDefault();
  };

  const alternarPausaCafe = () => {
    if (cafeBloqueado) {
      if (dinheiro < 40) {
        alert('A reposição da cafeteira agora custa R$ 40. Saldo insuficiente.');
        return;
      }

      setDinheiro((valor) => valor - 40);
      setCafeBloqueado(false);
      return;
    }

    setEmPausaCafe((prev) => !prev);
  };

  const lidarComDropNoPosto = (e, indexPosto) => {
    e.preventDefault();
    ignorarCliqueAposDrop.current = true;
    setTimeout(() => {
      ignorarCliqueAposDrop.current = false;
    }, 100);
    if (filaTrancada) {
      alert("Fila bloqueada! Resolva o alerta no final da esteira.");
      return;
    }

    const origem = e.dataTransfer.getData('origem');
    const itemId = e.dataTransfer.getData('id');

    if (emPausaCafe) {
      alert("Os funcionários estão na pausa para o café!");
      return;
    }

    const funcionario = postos[indexPosto];
    if (!itemId || !funcionario) return;

    if ((energiaPostos[indexPosto] ?? 100) <= 0) {
      alert("Este funcionário está sem energia e precisa descansar!");
      return;
    }

    if (tarefasEmAndamento[indexPosto]) {
      alert("Este funcionário já está executando uma tarefa!");
      return;
    }

    const itemProcurado = chamadosEsteira.find((c) => c.id === itemId);

    if (!itemProcurado) return;

    const normalizarHabilidade = (valor) => String(valor || '')
      .normalize('NFD')
      .replace(/[\u0300-\u036f]/g, '')
      .toLowerCase()
      .trim();
    const requisito = normalizarHabilidade(itemProcurado.requere);
    const acertou = funcionario.fortes.some((forte) => {
      const habilidade = normalizarHabilidade(forte);
      return habilidade === requisito || habilidade.includes(requisito) || requisito.includes(habilidade);
    });

    if (acertou) {
      const diffConfig = DIFICULDADES[itemProcurado.dificuldade];
      setTarefasEmAndamento((prev) => ({
        ...prev,
        [indexPosto]: {
          dificuldade: itemProcurado.dificuldade,
          tempoTotal: diffConfig.tempoMs,
          tempoRestante: diffConfig.tempoMs,
          eAnuncio: false
        }
      }));
    } else {
      return;
    }

    setChamadosEsteira((prev) => prev.filter((item) => item.id !== itemId));
  };

  const dispararFeedback = (indexPosto, tipo) => {
    setFeedbackPosto({ index: indexPosto, tipo });
    setTimeout(() => {
      setFeedbackPosto(null);
    }, 1500);
  };

  const ganhoHoje = historicoRendimento.find((h) => h.dia === diaAtual)?.ganhos || 0;

  const rendimentoTotal = historicoRendimento.reduce((total, item) => total + item.ganhos, 0);
  const melhorDia = historicoRendimento.reduce(
    (melhor, item) => item.ganhos > melhor.ganhos ? item : melhor,
    historicoRendimento[0] || { dia: diaAtual, ganhos: 0 }
  );
  const detalhesQuestoes = perguntasDoQuiz.map((pergunta, index) => {
    const resposta = respostasSalvas[pergunta.id || index];
    return {
      numero: index + 1,
      pergunta: pergunta.pergunta || `Questão ${index + 1}`,
      resposta: resposta?.respostaEscolhida || 'Não respondida',
      aberta: pergunta.tipo === 'aberta' || resposta?.tipo === 'aberta',
      correta: resposta?.correta === true
    };
  });

  const avancarProximoDia = () => {
    if (animando) return;
    setAnimando(true);

    setTimeout(() => {
      const proximoDiaNum = diaAtual + 1;
      setMostrarPainelResumo(false);
      setMinutosTotais(8 * 60);
      setDiaAtual(proximoDiaNum);
      diasComEvento.current.delete(proximoDiaNum);
      setTarefasEmAndamento({});
      setEmPausaCafe(false);
      setEnergiaPostos([100, 100, 100, 100, 100, 100]);
      setTotaisChamadosConcluidos(0);
      setTotalChamadosGerados(2);
      setAlertaFila(null);
      setFilaCongelada(false);
      setFilaTrancada(false);

      setChamadosEsteira([
        { id: `ch-d${proximoDiaNum}-1`, titulo: "Erro no Banco SQL", requere: "Banco de Dados / SQL", dificuldade: 'facil', Componente: ChamadoImpressoraSVG },
        { id: `ch-d${proximoDiaNum}-2`, titulo: "Ajustar Layout CSS", requere: "Frontend / Layout", dificuldade: 'medio', Componente: ChamadoMonitorSVG },
      ]);

      setAvisosMural([
        { id: `aviso-d${proximoDiaNum}-1`, titulo: 'Novo expediente', detalhe: `Dia ${proximoDiaNum} iniciado.` },
        { id: `aviso-d${proximoDiaNum}-2`, titulo: 'Objetivo do dia', detalhe: 'Resolva os chamados da fila.' },
      ]);

      setHistoricoRendimento((prev) => {
        if (prev.some((item) => item.dia === proximoDiaNum)) return prev;
        return [...prev, { dia: proximoDiaNum, ganhos: 0 }];
      });

      if (aoFinalizarDia) aoFinalizarDia(proximoDiaNum);
      setAnimando(false);
    }, 500);
  };

  const iniciarQuizDoDia = () => {
    const indexPergunta = diaAtual - 1;
    if (perguntasDoQuiz && indexPergunta < perguntasDoQuiz.length) {
      const p = perguntasDoQuiz[indexPergunta];
      setPerguntaDoDia({ ...p, index: indexPergunta });
      setRespostaSelecionada(null);
      setRespostaAberta('');
      setFeedbackQuiz(null);
      setMostrarPainelResumo(false);
      setQuizModalAberto(true);
    } else {
      avancarProximoDia();
    }
  };

  const responderQuizDoDia = (indiceOpcao, opcaoTexto) => {
    if (!perguntaDoDia || (respostaSelecionada !== null && feedbackQuiz)) return;

    setRespostaSelecionada(indiceOpcao);

    let isCorreta = false;
    let respostaCertaTexto = '';

    if (perguntaDoDia.tipo === 'ordem' || perguntaDoDia.tipo === 'arrastar') {
      const listaBlocos = perguntaDoDia.blocos || perguntaDoDia.opcoes || [];
      const indicesCorretos = Array.isArray(perguntaDoDia.blocoCorreto)
        ? perguntaDoDia.blocoCorreto
        : [perguntaDoDia.blocoCorreto ?? perguntaDoDia.correta ?? 0];
      const indicesRespondidos = Array.isArray(indiceOpcao) ? indiceOpcao : [indiceOpcao];
      isCorreta = indicesRespondidos.length === indicesCorretos.length
        && indicesRespondidos.every((indice) => indicesCorretos.includes(indice));
      respostaCertaTexto = indicesCorretos.map((indice) => listaBlocos[indice]).filter(Boolean).join(', ');
    } else if (perguntaDoDia.tipo === 'aberta') {
      const novasRespostas = {
        ...respostasSalvas,
        [perguntaDoDia.id || perguntaDoDia.index]: {
          pergunta: perguntaDoDia.pergunta,
          respostaEscolhida: opcaoTexto,
          tipo: 'aberta',
          correta: null
        }
      };
      setRespostasSalvas(novasRespostas);

      // Recompensa a participação do aluno
      setTotalAcertos((prev) => prev + 1);
      setDinheiro((prev) => prev + 100);
      setMultiplicador((prev) => parseFloat((prev + 0.2).toFixed(1)));

      setFeedbackQuiz({
        tipo: 'aberta',
        correto: null,
        mensagem: 'Sua resposta foi registrada com sucesso e será enviada para o professor avaliar!'
      });
      return;
    } else {
      const corretaEsperada = perguntaDoDia.correta;
      isCorreta = 
        indiceOpcao === corretaEsperada || 
        indiceOpcao === Number(corretaEsperada) || 
        opcaoTexto === corretaEsperada;

      if (typeof corretaEsperada === 'number' && perguntaDoDia.opcoes?.[corretaEsperada]) {
        respostaCertaTexto = perguntaDoDia.opcoes[corretaEsperada];
      } else if (typeof corretaEsperada === 'string') {
        const numIdx = Number(corretaEsperada);
        if (!isNaN(numIdx) && perguntaDoDia.opcoes?.[numIdx]) {
          respostaCertaTexto = perguntaDoDia.opcoes[numIdx];
        } else {
          respostaCertaTexto = corretaEsperada;
        }
      }
    }

    const novasRespostas = {
      ...respostasSalvas,
      [perguntaDoDia.id || perguntaDoDia.index]: {
        pergunta: perguntaDoDia.pergunta,
        respostaEscolhida: opcaoTexto,
        correta: isCorreta
      }
    };
    setRespostasSalvas(novasRespostas);

    if (isCorreta) {
      setTotalAcertos((prev) => prev + 1);
      setDinheiro((prev) => prev + 100);
      setMultiplicador((prev) => parseFloat((prev + 0.2).toFixed(1)));
      setFeedbackQuiz({
        correto: true,
        mensagem: 'Resposta Correta! Você ganhou +R$ 100 e +0.2x multiplicador para sua empresa!'
      });
    } else {
      setFeedbackQuiz({
        correto: false,
        mensagem: respostaCertaTexto ? `Resposta Incorreta! A opção correta era: "${respostaCertaTexto}".` : 'Resposta Incorreta!'
      });
    }
  };

  const selecionarAlternativa = (indiceOpcao) => {
    if (feedbackQuiz) return;
    setRespostaSelecionada((indiceAtual) => indiceAtual === indiceOpcao ? null : indiceOpcao);
  };

  const confirmarAvancoAposQuiz = () => {
    setQuizModalAberto(false);
    setPerguntaDoDia(null);
    setRespostaSelecionada(null);
    setRespostaAberta('');
    setFeedbackQuiz(null);
    avancarProximoDia();
  };

  const finalizarQuizEProjeto = async () => {
    setSalvandoRespostas(true);
    const totalPerg = perguntasDoQuiz.length || 1;
    const acertosFinais = totalAcertos;
    const notaCalculada = Math.min(100, Math.round((acertosFinais / totalPerg) * 100));

    try {
      if (quiz?.id) {
        const { error } = await supabase.from('respostas').insert([
          {
            quiz_id: quiz.id,
            nome_aluno: nomeAluno || 'Aluno',
            respostas_aluno: {
              ...respostasSalvas,
              __dinheiro_final: dinheiro
            },
            nota: notaCalculada
          }
        ]);

        if (error) {
          console.error('Erro do Supabase ao salvar resposta:', error);
          alert('Erro ao salvar respostas: ' + error.message);
        }
      }
    } catch (err) {
      console.error('Erro ao salvar resposta no banco:', err);
      alert('Erro inesperado ao salvar respostas.');
    } finally {
      setSalvandoRespostas(false);
      setQuizModalAberto(false);
      setJogoConcluido(true);
    }
  };

  return (
    <div className="container-tela-cheia">
      {jogoPausado && !jogoConcluido && !modoSelecaoInicial && !candidatoSelecionadoParaAlocar && createPortal(
        <div className="banner-pausa-jogo" role="status">
          <strong>PAUSADO</strong>
        </div>,
        document.body
      )}

      {mostrarAvisoManual && !candidatoSelecionadoParaAlocar && (
        <div className="aviso-manual-inicial">
          <strong>Manual do jogo</strong>
          <span>Consulte o manual pelo botao lateral sempre que precisar.</span>
          <button onClick={() => setMostrarAvisoManual(false)} aria-label="Fechar aviso">Fechar</button>
        </div>
      )}

      <div className="quadro-jogo">
        
        {/* ÁREA CENTRAL */}
        <div className="area-central">
          <div className="banner-dia">
            DIA {diaAtual} {emPausaCafe ? <span style={{ color: '#ea580c', fontSize: '16px' }}>(PAUSA PRO CAFÉ)</span> : (jogoPausado && <span style={{ color: '#d97706', fontSize: '16px' }}>(PAUSADO)</span>)}
          </div>

          <div className="grid-trabalho">
            {postos.map((func, index) => {
              const temFeedback = feedbackPosto?.index === index;
              const tipoFeedback = feedbackPosto?.tipo;
              const emSelecao = Boolean(candidatoSelecionadoParaAlocar);
              const emAndamento = tarefasEmAndamento[index];
              const energia = energiaPostos[index] ?? 100;
              const emForcaTarefa = equipeAlertaEmAcao.includes(index);

              let corEnergia = '#16a34a';
              if (energia < 40) corEnergia = '#dc2626';
              else if (energia < 70) corEnergia = '#d97706';

              return (
                <div
                  key={index}
                  onDragOver={lidarComDragOver}
                  onDrop={(e) => lidarComDropNoPosto(e, index)}
                  onClick={emSelecao ? () => {
                    if (ignorarCliqueAposDrop.current) return;
                    alocarFuncionarioNoPosto(index);
                  } : undefined}
                  className={`card-posto ${temFeedback ? `efeito-${tipoFeedback}` : ''}`}
                >
                  {temFeedback && (
                    <div className={`balao-feedback ${tipoFeedback}`}>
                      {tipoFeedback === 'erro' && 'ERROU! (-R$40)'}
                    </div>
                  )}

                  {func ? (
                    <>
                      <div className="container-boneco">
                        {emForcaTarefa
                          ? <DevEstressadoSVG tamanho={65} />
                          : emPausaCafe
                          ? <DevCafeSVG tamanho={65} />
                          : energia <= 0
                            ? <DevCansadoSVG tamanho={65} />
                            : renderAvatar(func.id, 65)}
                      </div>
                      <span className="nome-funcionario">
                        <strong>{func.nome}</strong>
                        <small>({func.cargo})</small>
                      </span>
                      {emForcaTarefa && <span className="tag-forca-tarefa">TRABALHO DIFÍCIL</span>}

                      <div className="container-barra-energia">
                        <div className="rotulo-energia">
                          <span>Energia</span>
                          <span>{energia}%</span>
                        </div>
                        <div className="fundo-barra-energia">
                          <div className="preenchimento-barra-energia" style={{ width: `${energia}%`, backgroundColor: corEnergia }} />
                        </div>
                      </div>

                      <div className="status-posto-fixo">
                        {emPausaCafe ? (
                          <span className="texto-pausa-cafe">Tomando café...</span>
                        ) : energia <= 0 ? (
                          <span className="texto-sem-energia">Sem energia - descansando</span>
                        ) : emAndamento ? (
                          <div className="container-progresso-tarefa">
                            <span className="rotulo-progresso">
                              <AmpulhetaSVG /> {emAndamento.eAnuncio ? 'Criando Anúncio...' : 'Trabalhando...'}
                            </span>
                            <div className="fundo-barra-progresso">
                              <div className="preenchimento-barra-progresso" style={{
                                width: `${((emAndamento.tempoTotal - emAndamento.tempoRestante) / emAndamento.tempoTotal) * 100}%`,
                                backgroundColor: emAndamento.eAnuncio ? '#db2777' : DIFICULDADES[emAndamento.dificuldade].cor
                              }} />
                            </div>
                          </div>
                        ) : (
                          func.fortes.length > 1 && (
                            <span className="tag-dupla-habilidade">
                              <RaioSVG /> 2 HABILIDADES
                            </span>
                          )
                        )}
                      </div>

                      {emSelecao && (
                        <div className="overlay-demissao">
                          <strong>DEMITIR E TROCAR</strong>
                          <small>Multa: R${CUSTO_DEMISSAO}</small>
                        </div>
                      )}
                    </>
                  ) : (
                    <div className="mesa-vazia-container">
                      <MesaVaziaSVG />
                      <strong>Mesa {index + 1} Vazia</strong>
                      {emSelecao && <span className="texto-alocar">Clique para Alocar</span>}
                    </div>
                  )}
                </div>
              );
            })}
          </div>

          {/* ESTEIRA DE CHAMADOS TÉCNICOS E ALERTA */}
          <div className={`esteira-chamados ${filaTrancada ? 'esteira-bloqueada' : ''}`}>
            
            {/* OVERLAY DE FILA TRANCADA COM CORRENTE/CADEADO */}
            {filaTrancada && (
              <div className="overlay-trancado">
                <CadeadoSVG />
                <span>FILA BLOQUEADA! RESOLVA O ALERTA.</span>
              </div>
            )}

            {chamadosEsteira.length > 0 ? (
              chamadosEsteira.map((item) => {
                if (item.isAlerta) {
                  return (
                    <div
                      key={item.id}
                      onClick={() => setTarefaSelecionada(item)}
                      className="item-arrastavel item-alerta-animado"
                    >
                      <AlertaPlacaSVG />
                      <span className="badge-perda">EQUIPE</span>
                    </div>
                  );
                }

                const IconeComponente = item.Componente;
                const diffConfig = DIFICULDADES[item.dificuldade || 'facil'];

                return (
                  <div
                    key={item.id}
                    draggable={!emPausaCafe && !filaTrancada}
                    onDragStart={(e) => lidarComDragStart(e, item, 'chamado')}
                    onClick={() => setTarefaSelecionada(item)}
                    className={`item-arrastavel ${filaTrancada ? 'desativado' : ''}`}
                    style={{ borderBottom: `3px solid ${diffConfig.cor}` }}
                  >
                    <IconeComponente />
                    <span className="tag-dificuldade-chamado" style={{ backgroundColor: diffConfig.cor }}>
                      {diffConfig.rotulo}
                    </span>
                  </div>
                );
              })
            ) : (
              <span className="texto-vazio">Aguardando chamados técnicos...</span>
            )}
          </div>
        </div>

        {/* PAINEL CENTRAL DE PROBLEMA BLOQUEANTE */}
        {filaTrancada && (
          <div className="modal-problema-central">
            <h2>INCIDENTE DE EQUIPE</h2>
            <p>{alertaFila?.descricao || 'O incidente chegou ao final da esteira e exige uma decisão.'}</p>
            <div className="caixa-prejuizo-alerta">
              <span>Equipe necessária: <strong>3 pessoas</strong></span>
              <span>Selecione três pessoas para executar este chamado difícil.</span>
            </div>
            <button className="btn-resolver-emergencia" onClick={() => setTarefaSelecionada(alertaFila)}>
              Montar equipe e decidir
            </button>
          </div>
        )}

        {/* ABAS LATERAIS */}
        <div className={`container-abas-divisoria ${modoSelecaoInicial && !tutorialAtivo ? 'selecao-inicial-ativa' : ''}`}>
          <button className="aba-discreta manual aba-manual-tutorial" onClick={abrirManual}>
            <span className="rotulo-aba">Manual</span>
            <span className="icone-seta-aba">
              <span className="icone-manual">?</span>
            </span>
          </button>

          <button className="aba-discreta rh aba-rh-tutorial" onClick={() => { setMostrarModalRH(true); setMostrarPainelResumo(false); }}>
            <span className="rotulo-aba">Contratar</span>
            <span className="icone-seta-aba">
              <svg className="desenho-mao" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <rect x="2" y="3" width="20" height="14" rx="2" />
                <path d="M8 21h8M12 17v4" />
              </svg>
            </span>
          </button>

          {!modoSelecaoInicial && !candidatoSelecionadoParaAlocar && (
            <button className="aba-discreta cafe aba-cafe-tutorial" onClick={alternarPausaCafe}>
              <span className="rotulo-aba">{cafeBloqueado ? 'Desbloquear Café (R$ 40)' : 'Pausa Café'}</span>
              <span className="icone-seta-aba">
                <svg className="desenho-mao" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M17 8h1a4 4 0 0 1 0 8h-1" />
                  <path d="M3 8h14v9a4 4 0 0 1-4 4H7a4 4 0 0 1-4-4V8z" />
                  <path d="M6 2c0 2 2 2 2 4M10 2c0 2 2 2 2 4M14 2c0 2 2 2 2 4" />
                </svg>
              </span>
            </button>
          )}

          <button className="aba-discreta proximo aba-proximo-tutorial" onClick={() => { setMostrarPainelResumo(true); setMostrarModalRH(false); }}>
            <span className="rotulo-aba">Próximo Dia</span>
            <span className="icone-seta-aba">
              <svg className="desenho-mao" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <rect x="3" y="4" width="18" height="18" rx="2" />
                <path d="M16 2v4M8 2v4M3 10h18" />
                <path d="M8 14h.01M12 14h.01M16 14h.01M8 18h.01M12 18h.01" strokeWidth="3" />
              </svg>
            </span>
          </button>
        </div>

        {/* PAINEL LATERAL DIREITO */}
        <div className="painel-lateral">
          <div className="relogio-digital-corpo">
            <div className="botoes-laterais-esq">
              <span className="botao-label">MODE</span>
              <span className="botao-label">SET</span>
            </div>
            <div className="tela-lcd">
              <span className="display-hora">{horaFormatada}</span>
            </div>
            <div className="botoes-laterais-dir">
              <span className="botao-label-dir">BACKLITE</span>
              <div className="botao-lite">LITE</div>
            </div>
          </div>

          <div className="bloco-rendimento">
            <span className="titulo-secao">RENDIMENTO DO DIA</span>
            <div className="rendimento-dia-atual">
              <span>Dia {diaAtual}</span>
              <strong>R$ {ganhoHoje.toFixed(2)}</strong>
            </div>

            <div className="caixa-pontuacao">
              <div className="texto-dinheiro">R$ {dinheiro.toFixed(2)}</div>
              <div className={`card-multiplicador ${animarMultiplicador ? 'animar-multiplicador' : ''}`}>
                <span className="label-mult">MULTIPLICADOR</span>
                <span className="valor-mult">{multiplicador.toFixed(1)}x</span>
              </div>
            </div>
          </div>

          <div className="painel-anuncios">
            <div className="cabecalho-anuncios">
              <AnuncioMegafoneSVG />
              <span>Mural do Dia</span>
            </div>

            <div className="lista-anuncios">
              {avisosMural.length > 0 ? (
                avisosMural.map((aviso) => (
                  <div key={aviso.id} className="card-anuncio-item aviso-mural-item">
                    <div className="info-anuncio">
                      <strong>{aviso.titulo}</strong>
                      <span>{aviso.detalhe}</span>
                    </div>
                  </div>
                ))
              ) : (
                <div className="anuncios-vazios">Nenhum aviso por enquanto...</div>
              )}
            </div>
          </div>

          <div className="bilhete-expediente">
            <span className="bilhete-alfinete">*</span>
            <span className="bilhete-etiqueta">BILHETE DO DIA</span>
            <h3>Missão do expediente</h3>
            <p><strong>Horário:</strong> 08:00 - 18:00</p>
            <p><strong>Seu trabalho:</strong> resolver os chamados da fila.</p>
            <span className="bilhete-assinatura">Boa sorte, gerente!</span>
          </div>
        </div>

        {/* PAINEL AZUL SLIDE DO RH */}
        <div className={`painel-deslizante-rh ${mostrarModalRH ? 'ativo' : ''}`}>
          <div className="aba-topo-painel">
            <svg className="desenho-mao" viewBox="0 -2 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <rect x="2" y="3" width="20" height="14" rx="2" />
              <path d="M8 21h8M12 17v4" />
            </svg>
          </div>
          <div className="cabecalho-painel-rh">
            <h2>Central de Recrutamento (RH)</h2>
            <button onClick={() => setMostrarModalRH(false)} className="btn-fechar-rh">X Fechar</button>
          </div>

          <p className="subtitulo-rh">
            Vagas Ocupadas: {totalOcupados}/6 {totalOcupados >= 6 && <span style={{ color: '#ff7675' }}>(Rescisão: R$100)</span>}
          </p>

          <div className="grid-candidatos-rh">
            {candidatosDisponiveis.length > 0 ? (
              candidatosDisponiveis.map((candidato) => (
                <div key={candidato.id} className="card-candidato-rh">
                  <div className="info-candidato-container">
                    <div className="avatar-candidato">
                      {renderAvatar(candidato.id, 48)}
                    </div>
                    <div>
                      <strong>{candidato.nome}</strong> 
                      <div className="cargo-candidato">{candidato.cargo}</div>
                      <div className="habs-candidato">Habilidades: {candidato.fortes.join(' + ')}</div>
                    </div>
                  </div>
                  
                  <button
                    onClick={() => {
                      setCandidatoSelecionadoParaAlocar(candidato);
                      setMostrarModalRH(false);
                    }}
                    className="btn-contratar"
                  >
                    Contratar (R$ {candidato.custo})
                  </button>
                </div>
              ))
            ) : (
              <p className="msg-sem-candidatos">Nenhum candidato disponível no momento.</p>
            )}
          </div>
        </div>

        {/* PAINEL VERDE SLIDE DE RESUMO DO DIA */}
        <div className={`painel-deslizante-resumo ${mostrarPainelResumo ? 'ativo' : ''}`}>
          <button 
            className="aba-topo-painel-resumo" 
            onClick={() => setMostrarPainelResumo((prev) => !prev)}
            title="Alternar Painel de Resumo"
          >
            <svg className="desenho-mao" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <rect x="3" y="4" width="18" height="18" rx="2" />
              <path d="M16 2v4M8 2v4M3 10h18" />
              <path d="M8 14h.01M12 14h.01M16 14h.01M8 18h.01M12 18h.01" strokeWidth="3" />
            </svg>
          </button>
          
          <div className="cabecalho-painel-resumo">
            <h2>Relatório de Expediente - Dia {diaAtual}</h2>
            <button 
              onClick={() => setMostrarPainelResumo(false)} 
              className="btn-fechar-resumo"
            >
              X Fechar
            </button>
          </div>

          <p className="subtitulo-resumo">
            Relatório do Dia {diaAtual}: {totaisChamadosConcluidos} tarefas finalizadas
          </p>

          <div className="grid-cards-resumo">
            <div className="card-estatistica-resumo card-destaque-lucro">
              <span>Lucro / Rendimento de Hoje</span>
              <div className="conteudo-card-indicativo">
                <svg className="icone-indicativo icone-lucro" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                  <line x1="12" y1="1" x2="12" y2="23" />
                  <path d="M17 5H9.5a3.5 3.5 0 0 0 0 7h5a3.5 3.5 0 0 1 0 7H6" />
                </svg>
                <strong className="valor-lucro">R$ {ganhoHoje.toFixed(2)}</strong>
              </div>
            </div>

            <div className="card-estatistica-resumo">
              <span>Saldo Total da Empresa</span>
              <div className="conteudo-card-indicativo">
                <svg className="icone-indicativo icone-saldo" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                  <rect x="2" y="6" width="20" height="12" rx="2" />
                  <path d="M12 12h.01" />
                  <path d="M17 12h2" />
                </svg>
                <strong className="valor-saldo">R$ {dinheiro.toFixed(2)}</strong>
              </div>
            </div>

            <div className="card-estatistica-resumo card-destaque-multi">
              <span>Multiplicador do Dia</span>
              <div className="conteudo-card-indicativo">
                <svg className="icone-indicativo icone-multiplicador" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                  <polygon points="13 2 3 14 12 14 11 22 21 10 12 10 13 2" />
                </svg>
                <strong className="valor-multiplicador">{multiplicador.toFixed(1)}x</strong>
              </div>
            </div>

            <button
              onClick={iniciarQuizDoDia}
              className="btn-avancar-expediente"
            >
              {perguntasDoQuiz.length > 0 && diaAtual <= perguntasDoQuiz.length
                ? `Encerrar Expediente e Responder Quiz do Dia ${diaAtual} →`
                : 'Encerrar Dia e Iniciar Próximo →'}
            </button>
          </div>
        </div>
      </div>

      {/* BANNER FLUTUANTE DE ALOCAÇÃO */}
      {candidatoSelecionadoParaAlocar && (
        <div className="banner-alocacao-flutuante">
          <div className="mensagem-alocacao">
            <PinLocalSVG />
            <span>Clique em uma mesa para alocar <strong>{candidatoSelecionadoParaAlocar.nome}</strong></span>
          </div>
          <button onClick={() => setCandidatoSelecionadoParaAlocar(null)}>Cancelar</button>
        </div>
      )}

      {/* MODAL SELEÇÃO INICIAL */}
      {modoSelecaoInicial && !candidatoSelecionadoParaAlocar && !tutorialAtivo && (
        <div className="overlay-modal">
          <div className="card-modal selecao-inicial-modal">
            <h3>Monte sua Equipe Inicial</h3>
            <p className="sub-modal">
              Escolha exatamente 4 funcionários para formar sua equipe inicial ({totalOcupados}/4 selecionados).
            </p>

            <div className="lista-selecao-inicial">
              {candidatosDisponiveis.map((candidato) => (
                <div key={candidato.id} className="item-selecao-inicial">
                  <div>
                    <strong>{candidato.nome}</strong> - <small>{candidato.cargo}</small><br />
                    <span className="habs-text">Habilidades: {candidato.fortes.join(', ')}</span>
                  </div>
                  <button onClick={() => { setCandidatoSelecionadoParaAlocar(candidato); setModoSelecaoInicial(false); }}>
                    Selecionar
                  </button>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}

      {/* MODAL DETALHES DA TAREFA / ALERTA */}
      {tarefaSelecionada && (
        <div className="overlay-modal">
          <div className="card-modal">
            {tarefaSelecionada.isAlerta ? (
              <>
                <h3>{tarefaSelecionada.titulo}</h3>
                <p>{tarefaSelecionada.descricao}</p>
                <div className="box-detalhes-dificuldade">
                  <p><strong>Equipe necessária:</strong> selecione 3 pessoas.</p>
                  <div className="lista-equipe-alerta">
                    {postos.map((funcionario, indexPosto) => funcionario && (
                      <button
                        key={funcionario.id}
                        type="button"
                        className={`membro-equipe-alerta ${equipeAlertaSelecionada.includes(indexPosto) ? 'selecionado' : ''}`}
                        onClick={() => alternarMembroAlerta(indexPosto)}
                      >
                        <strong>{funcionario.nome}</strong>
                        <small>{funcionario.cargo}</small>
                      </button>
                    ))}
                  </div>
                  <p><strong>Selecionados:</strong> {equipeAlertaSelecionada.length}/3</p>
                </div>
                <div className="container-btn-fechar">
                  <button onClick={resolverAlerta} style={{ backgroundColor: '#16a34a', color: '#fff' }}>
                    Aceitar chamado emergencial
                  </button>
                  <button onClick={() => setTarefaSelecionada(null)}>Fechar</button>
                </div>
              </>
            ) : (
              <>
                <h3>{tarefaSelecionada.titulo}</h3>
                <p><strong>Requisito:</strong> <span style={{ color: '#16a34a' }}>{tarefaSelecionada.requere}</span></p>
                
                {(() => {
                  const diff = DIFICULDADES[tarefaSelecionada.dificuldade || 'facil'];
                  return (
                    <div className="box-detalhes-dificuldade">
                      <p><strong>Dificuldade:</strong> <span style={{ color: diff.cor }}>{diff.rotulo}</span></p>
                      <p><strong>Tempo Estimado:</strong> {diff.tempoMs / 1000}s</p>
                      <p><strong>Cansaço de Energia:</strong> -{diff.desgasteEnergia}%</p>
                      <p><strong>Recompensa:</strong> R$ {diff.ganhoBase} (+{diff.bonusMult}x mult)</p>
                    </div>
                  );
                })()}

                <div className="container-btn-fechar">
                  <button onClick={() => setTarefaSelecionada(null)}>Fechar e Arrastar</button>
                </div>
              </>
            )}
          </div>
        </div>
      )}

      {/* MODAL EVENTO ALEATÓRIO GERAL */}
      {eventoAtual && (
        <EventoAleatorio
          evento={eventoAtual}
          jogoEstado={{ setDinheiro, setEnergiaPostos, setMultiplicador, setCafeBloqueado }}
          onClose={() => setEventoAtual(null)}
        />
      )}

      {/* MODAL DE QUIZ DIÁRIO DO PROFESSOR */}
      {quizModalAberto && perguntaDoDia && (
        <div className="modal-overlay">
          <div className="card-modal quiz-modal">
            <div className="quiz-cabecalho">
              <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                <div className="quiz-avatar">
                  {renderAvatar(diaAtual, 50)}
                </div>
                <div>
                  <h3 className="quiz-titulo">
                    Pergunta do Dia {diaAtual} {perguntasDoQuiz.length > 0 ? `(de ${perguntasDoQuiz.length})` : ''}
                  </h3>
                  <small className="quiz-subtitulo">
                    {quiz?.titulo ? `Avaliação: ${quiz.titulo}` : 'Desafio Teórico do Professor'}
                  </small>
                </div>
              </div>
              <div className="quiz-dia-tag">
                Dia {diaAtual}
              </div>
            </div>

            {perguntaDoDia.tipo === 'ordem' || perguntaDoDia.tipo === 'arrastar' ? (
              <QuestaoArrastar
                pergunta={perguntaDoDia.pergunta}
                blocos={perguntaDoDia.blocos || perguntaDoDia.opcoes || []}
                aoResponder={(idx, texto) => responderQuizDoDia(idx, texto)}
              />
            ) : perguntaDoDia.tipo === 'aberta' ? (
              <div style={{ margin: '15px 0' }}>
                <p className="quiz-pergunta">
                  {perguntaDoDia.pergunta}
                </p>
                <textarea
                  className="quiz-resposta-aberta"
                  rows={4}
                  placeholder="Escreva sua resposta para o professor..."
                  value={respostaAberta}
                  onChange={(e) => setRespostaAberta(e.target.value)}
                  disabled={respostaSelecionada !== null}
                  style={{
                    width: '100%',
                    padding: '12px',
                    borderRadius: '8px',
                    border: '2px solid #2c3e50',
                    fontSize: '1.1rem',
                    boxSizing: 'border-box',
                    fontFamily: 'inherit'
                  }}
                />
                {respostaSelecionada === null && (
                  <div style={{ marginTop: '12px', display: 'flex', justifyContent: 'flex-end' }}>
                    <button
                      type="button"
                      className="btn-avancar-expediente"
                      onClick={() => {
                        if (!respostaAberta.trim()) return;
                        responderQuizDoDia(0, respostaAberta.trim());
                      }}
                      disabled={!respostaAberta.trim()}
                      style={{ padding: '8px 20px', fontSize: '1.05rem' }}
                    >
                      Enviar Resposta →
                    </button>
                  </div>
                )}
              </div>
            ) : (
              <>
                <p className="quiz-pergunta">
                  {perguntaDoDia.pergunta}
                </p>

                <div className="opcoes-quiz-container">
                  {Array.isArray(perguntaDoDia.opcoes) && perguntaDoDia.opcoes.map((opcao, idx) => {
                    const foiSelecionada = respostaSelecionada === idx;
                    let classeExtra = '';
                    if (foiSelecionada) {
                      classeExtra = 'selecionada';
                    }
                    return (
                      <button
                        key={idx}
                        className={`opcao-btn ${classeExtra}`}
                        onClick={() => selecionarAlternativa(idx)}
                        disabled={Boolean(feedbackQuiz)}
                        style={{ cursor: feedbackQuiz ? 'default' : 'pointer' }}
                      >
                        <span style={{
                          fontWeight: 'bold',
                          background: foiSelecionada ? '#2c3e50' : '#e2e8f0',
                          color: foiSelecionada ? '#fff' : '#2c3e50',
                          width: '26px',
                          height: '26px',
                          borderRadius: '50%',
                          display: 'flex',
                          alignItems: 'center',
                          justifyContent: 'center',
                          fontSize: '0.9rem',
                          flexShrink: 0
                        }}>
                          {String.fromCharCode(65 + idx)}
                        </span>
                        <span style={{ flex: 1 }}>{opcao}</span>
                      </button>
                    );
                  })}
                </div>
                {respostaSelecionada !== null && !feedbackQuiz && (
                  <div style={{ marginTop: '16px', display: 'flex', justifyContent: 'flex-end' }}>
                    <button
                      type="button"
                      className="btn-avancar-expediente"
                      onClick={() => responderQuizDoDia(respostaSelecionada, perguntaDoDia.opcoes[respostaSelecionada])}
                      style={{ padding: '8px 20px', fontSize: '1.05rem' }}
                    >
                      Confirmar Resposta →
                    </button>
                  </div>
                )}
              </>
            )}

            {feedbackQuiz && (
              <div className={`feedback-animado ${
                feedbackQuiz.tipo === 'aberta'
                  ? 'feedback-informativo'
                  : feedbackQuiz.correto 
                    ? 'feedback-correto' 
                    : 'feedback-incorreto'
              }`}>
                <div style={{ marginBottom: '6px', fontWeight: 'bold' }}>
                  {feedbackQuiz.tipo === 'aberta'
                    ? 'Resposta Enviada!'
                    : feedbackQuiz.correto 
                      ? 'Correto!' 
                      : 'Incorreto!'}
                </div>
                <div style={{ fontSize: '1rem', fontWeight: 'normal' }}>
                  {feedbackQuiz.mensagem}
                </div>
              </div>
            )}

            {respostaSelecionada !== null && feedbackQuiz && (
              <div style={{ marginTop: '20px', display: 'flex', justifyContent: 'flex-end' }}>
                {diaAtual < perguntasDoQuiz.length ? (
                  <button
                    onClick={confirmarAvancoAposQuiz}
                    className="btn-avancar-expediente"
                    style={{ padding: '10px 20px', fontSize: '1.1rem' }}
                  >
                    Ir para o Dia {diaAtual + 1} →
                  </button>
                ) : (
                  <button
                    onClick={finalizarQuizEProjeto}
                    className="btn-avancar-expediente"
                    disabled={salvandoRespostas}
                    style={{ background: '#27ae60', padding: '10px 20px', fontSize: '1.1rem' }}
                  >
                    {salvandoRespostas ? 'Entregando Avaliação...' : 'Finalizar Avaliação e Entregar Projeto →'}
                  </button>
                )}
              </div>
            )}
          </div>
        </div>
      )}

      {/* TELA DE PROJETO CONCLUÍDO */}
      {jogoConcluido && (
        <div className="overlay-modal tela-final-overlay">
          <div
            className="card-modal tela-final-card"
          >
            <div className="tela-final-cabecalho">
              <span className="tela-final-selo" aria-hidden="true">✓</span>
              <h2>
                Projeto Concluído!
              </h2>
              <p>
                Parabéns, <strong>{nomeAluno}</strong>! Confira seu desempenho no jogo.
              </p>
            </div>

            <div className="tela-final-estatisticas">
              {[
                { classe: 'lucro', titulo: 'Lucro total', valor: `R$ ${rendimentoTotal.toFixed(2)}`, detalhe: 'Resultado acumulado' },
                { classe: 'melhor-dia', titulo: `Melhor dia · Dia ${melhorDia.dia}`, valor: `R$ ${melhorDia.ganhos.toFixed(2)}`, detalhe: 'Maior lucro em um dia' },
                { classe: 'multiplicador', titulo: 'Multiplicador total', valor: `${multiplicador.toFixed(1)}x`, detalhe: 'Multiplicador alcançado' }
              ].map((item) => (
                <div key={item.titulo} className={`tela-final-estatistica ${item.classe}`}>
                  <small>{item.titulo}</small>
                  <strong>{item.valor}</strong>
                  <small className="tela-final-detalhe">{item.detalhe}</small>
                </div>
              ))}
            </div>

            {detalhesQuestoes.length > 0 && (
              <section className="tela-final-questoes">
                <h3>Respostas do quiz</h3>
                <div className="tela-final-lista-questoes">
                  {detalhesQuestoes.map((questao) => {
                    return (
                      <article
                        key={questao.numero}
                        className={`tela-final-questao ${questao.aberta ? 'aberta' : questao.correta ? 'correta' : 'incorreta'}`}
                      >
                        <div className="tela-final-questao-titulo">
                          <strong>
                            Questão {questao.numero}: {questao.pergunta}
                          </strong>
                          {!questao.aberta && (
                            <span className="tela-final-status">
                              {questao.correta ? 'Acertou' : 'Errou'}
                            </span>
                          )}
                        </div>
                        <p>
                          <strong>Sua resposta:</strong> {questao.resposta}
                        </p>
                      </article>
                    );
                  })}
                </div>
              </section>
            )}

          </div>
        </div>
      )}

      {tutorialAtivo && (
        <TutorialOverlay
          passoTutorial={passoTutorial}
          aoAvancar={avancarTutorial}
          aoVoltar={voltarTutorial}
          aoSaltar={saltarTutorial}
        />
      )}

    </div>
  );
}