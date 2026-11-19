import React from 'react';

// 1. GERENTE DE GRAVATA APONTANDO (Melhorado)
export function GerenteSVG({ tamanho = 160 }) {
  return (
    <svg width={tamanho} height={tamanho * 1.4} viewBox="0 0 120 180" fill="none" stroke="#2b2b2b" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round">
      <circle cx="60" cy="35" r="20" fill="#ffecd2" />
      <circle cx="53" cy="30" r="2.5" fill="#2b2b2b" />
      <circle cx="67" cy="30" r="2.5" fill="#2b2b2b" />
      <path d="M 50 42 Q 60 48 70 42" stroke="#e74c3c" />
      <line x1="60" y1="55" x2="60" y2="125" />
      {/* Gravata */}
      <path d="M 56 55 L 64 55 L 67 90 L 60 102 L 53 90 Z" fill="#e74c3c" stroke="#2b2b2b" strokeWidth="2" />
      {/* Braços */}
      <path d="M 60 70 L 35 85 L 42 105" />
      <path d="M 60 70 L 90 85 L 115 75" />
      {/* Prancheta na mão */}
      <rect x="105" y="55" width="20" height="30" fill="#f1c40f" stroke="#2b2b2b" strokeWidth="2" />
      {/* Pernas */}
      <line x1="60" y1="125" x2="35" y2="175" />
      <line x1="60" y1="125" x2="85" y2="175" />
      <line x1="35" y1="175" x2="25" y2="175" />
      <line x1="85" y1="175" x2="95" y2="175" />
    </svg>
  );
}

// 2. DEV ESTRESSADO DIGITANDO (Melhorado)
export function DevEstressadoSVG({ tamanho = 140 }) {
  return (
    <svg width={tamanho * 1.2} height={tamanho} viewBox="0 0 160 140" fill="none" stroke="#2b2b2b" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round">
      {/* Mesa e PC */}
      <line x1="80" y1="80" x2="150" y2="80" strokeWidth="4" />
      <line x1="90" y1="80" x2="90" y2="135" />
      <line x1="140" y1="80" x2="140" y2="135" />
      <rect x="120" y="25" width="12" height="55" rx="2" fill="#95a5a6" />
      <line x1="126" y1="80" x2="126" y2="80" />
      {/* Cadeira */}
      <path d="M 25 30 Q 15 65 25 90 L 65 90" strokeWidth="4" />
      <line x1="45" y1="90" x2="45" y2="120" />
      <line x1="30" y1="120" x2="60" y2="120" strokeWidth="4" />
      <circle cx="32" cy="128" r="4" fill="#2b2b2b" />
      <circle cx="58" cy="128" r="4" fill="#2b2b2b" />
      {/* Corpo do Dev */}
      <circle cx="55" cy="35" r="16" fill="#f8d7da" />
      {/* Rosto bravo */}
      <line x1="48" y1="30" x2="55" y2="34" strokeWidth="2" stroke="#c0392b" />
      <line x1="62" y1="30" x2="55" y2="34" strokeWidth="2" stroke="#c0392b" />
      <circle cx="50" cy="36" r="1.5" fill="#2b2b2b" />
      <circle cx="60" cy="36" r="1.5" fill="#2b2b2b" />
      <path d="M 52 44 Q 58 40 64 44" stroke="#c0392b" />
      {/* Braços digitando */}
      <path d="M 55 51 Q 40 65 50 85" />
      <path d="M 48 62 L 75 60 L 95 72" />
      <path d="M 48 62 L 80 68 L 98 75" />
      <path d="M 50 85 L 75 88 L 70 120" />
      {/* Fogo de estresse */}
      <path d="M 45 15 Q 55 5 65 15 Q 60 25 45 15" fill="#e74c3c" stroke="none" />
      <path d="M 48 18 Q 55 10 62 18 Q 58 24 48 18" fill="#f1c40f" stroke="none" />
    </svg>
  );
}

// 3. DEV FELIZ APONTANDO PARA A TELA (Melhorado)
export function DevFelizSVG({ tamanho = 140 }) {
  return (
    <svg width={tamanho * 1.3} height={tamanho} viewBox="0 0 170 140" fill="none" stroke="#2b2b2b" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round">
      {/* Mesa e PC */}
      <line x1="10" y1="85" x2="80" y2="85" strokeWidth="4" />
      <line x1="20" y1="85" x2="20" y2="135" />
      <line x1="70" y1="85" x2="70" y2="135" />
      <rect x="15" y="20" width="55" height="45" rx="3" fill="#e0f7fa" />
      <line x1="42" y1="65" x2="42" y2="85" />
      <line x1="30" y1="85" x2="54" y2="85" />
      <rect x="25" y="30" width="35" height="25" fill="#fff" />
      <path d="M 30 40 L 50 40 M 30 46 L 45 46 M 30 52 L 55 52" stroke="#27ae60" strokeWidth="2" />
      {/* Cadeira */}
      <path d="M 150 40 L 150 90 L 115 90" strokeWidth="4" />
      <line x1="135" y1="90" x2="135" y2="120" />
      <line x1="120" y1="120" x2="150" y2="120" strokeWidth="4" />
      <circle cx="122" cy="127" r="4" fill="#2b2b2b" />
      <circle cx="148" cy="127" r="4" fill="#2b2b2b" />
      {/* Corpo */}
      <circle cx="130" cy="35" r="16" fill="#d4edda" />
      {/* Rosto feliz */}
      <circle cx="124" cy="32" r="2.5" fill="#2b2b2b" />
      <circle cx="134" cy="32" r="2.5" fill="#2b2b2b" />
      <path d="M 122 40 Q 130 50 138 40" stroke="#27ae60" />
      {/* Braços */}
      <line x1="130" y1="51" x2="130" y2="88" />
      <path d="M 130 62 L 95 62 L 72 45" />
      <path d="M 130 88 L 105 92 L 100 120" />
      <path d="M 130 88 L 115 102 L 130 120" />
    </svg>
  );
}

// 4. DEV TOMANDO CAFE
export function DevCafeSVG({ tamanho = 140 }) {
  return (
    <svg width={tamanho * 1.3} height={tamanho} viewBox="0 0 170 140" fill="none" stroke="#2b2b2b" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round">
      <circle cx="85" cy="40" r="16" fill="#ffe0b2" />
      <circle cx="78" cy="37" r="2.5" fill="#2b2b2b" />
      <circle cx="92" cy="37" r="2.5" fill="#2b2b2b" />
      <path d="M 80 45 Q 85 48 90 45" />
      <line x1="85" y1="56" x2="85" y2="100" />
      <path d="M 85 65 L 60 75 L 75 55" />
      <path d="M 85 65 L 110 75 L 100 95" />
      <line x1="85" y1="100" x2="70" y2="135" />
      <line x1="85" y1="100" x2="100" y2="135" />
      {/* Caneca */}
      <rect x="65" y="45" width="12" height="15" rx="2" fill="#8d6e63" />
      <path d="M 65 50 Q 58 52 65 55" stroke="#8d6e63" strokeWidth="2" fill="none" />
      <path d="M 68 35 Q 70 25 72 35" stroke="#ccc" />
      <path d="M 73 35 Q 75 25 77 35" stroke="#ccc" />
    </svg>
  );
}

// 5. CARLOS ANALISANDO SERVIDORES
export function CarlosSVG({ tamanho = 140 }) {
  return (
    <svg width={tamanho * 1.3} height={tamanho} viewBox="0 0 170 140" fill="none" stroke="#2b2b2b" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round">
      <rect x="25" y="24" width="58" height="72" rx="4" fill="#dbeafe" />
      <line x1="36" y1="43" x2="72" y2="43" stroke="#2563eb" />
      <line x1="36" y1="58" x2="72" y2="58" stroke="#2563eb" />
      <line x1="36" y1="73" x2="62" y2="73" stroke="#2563eb" />
      <circle cx="73" cy="87" r="3" fill="#16a34a" />
      <circle cx="85" cy="38" r="16" fill="#f6d6b8" />
      <circle cx="79" cy="35" r="2" fill="#2b2b2b" />
      <circle cx="91" cy="35" r="2" fill="#2b2b2b" />
      <path d="M 78 47 Q 85 42 92 47" />
      <line x1="85" y1="54" x2="85" y2="101" />
      <path d="M 85 66 L 72 78 L 58 78" />
      <path d="M 85 66 L 108 76 L 120 64" />
      <line x1="85" y1="101" x2="70" y2="135" />
      <line x1="85" y1="101" x2="102" y2="135" />
      <circle cx="122" cy="61" r="8" fill="#facc15" />
      <path d="M 122 48 V 42 M 109 61 H 103 M 135 61 H 141" stroke="#d97706" />
    </svg>
  );
}

// 6. DEV CANSADO SEM ENERGIA
export function DevCansadoSVG({ tamanho = 140 }) {
  return (
    <svg width={tamanho * 1.3} height={tamanho} viewBox="0 0 170 140" fill="none" stroke="#2b2b2b" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round">
      <circle cx="85" cy="40" r="16" fill="#d6d3d1" />
      <path d="M 75 36 L 82 38 M 88 38 L 95 36" />
      <path d="M 78 50 Q 85 45 92 50" stroke="#64748b" />
      <line x1="85" y1="56" x2="85" y2="105" />
      <path d="M 85 68 L 60 82 L 72 94" />
      <path d="M 85 68 L 110 82 L 98 94" />
      <line x1="85" y1="105" x2="70" y2="135" />
      <line x1="85" y1="105" x2="100" y2="135" />
      <path d="M 108 24 L 118 24 M 113 19 L 113 29" stroke="#94a3b8" />
      <path d="M 55 25 L 62 25 M 58.5 21.5 L 58.5 28.5" stroke="#94a3b8" />
    </svg>
  );
}

// 6. DEV IDEIA (Lampada)
export function DevIdeiaSVG({ tamanho = 140 }) {
  return (
    <svg width={tamanho * 1.3} height={tamanho} viewBox="0 0 170 140" fill="none" stroke="#2b2b2b" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round">
      <circle cx="85" cy="50" r="16" fill="#fff9c4" />
      <circle cx="78" cy="45" r="2.5" fill="#2b2b2b" />
      <circle cx="92" cy="45" r="2.5" fill="#2b2b2b" />
      <path d="M 78 55 Q 85 65 92 55" stroke="#f1c40f" />
      <line x1="85" y1="66" x2="85" y2="110" />
      <path d="M 85 75 L 60 65 L 75 45" />
      <path d="M 85 75 L 110 85 L 115 110" />
      <line x1="85" y1="110" x2="70" y2="140" />
      <line x1="85" y1="110" x2="100" y2="140" />
      {/* Lampada */}
      <circle cx="75" cy="25" r="10" fill="#f1c40f" stroke="#f1c40f" />
      <line x1="72" y1="36" x2="78" y2="36" stroke="#95a5a6" strokeWidth="4" />
      <path d="M 70 10 L 72 5 M 80 10 L 85 5 M 62 20 L 55 18 M 88 20 L 95 18" stroke="#f1c40f" />
    </svg>
  );
}

// 6. DEV DORMINDO NA MESA
export function DevDormindoSVG({ tamanho = 140 }) {
  return (
    <svg width={tamanho * 1.3} height={tamanho} viewBox="0 0 170 140" fill="none" stroke="#2b2b2b" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round">
      <line x1="20" y1="100" x2="150" y2="100" strokeWidth="4" />
      <line x1="40" y1="100" x2="40" y2="140" />
      <line x1="130" y1="100" x2="130" y2="140" />
      {/* Cabeça deitada */}
      <circle cx="85" cy="90" r="15" fill="#e2e2e2" />
      <path d="M 75 88 Q 80 85 85 88" />
      <path d="M 88 88 Q 93 85 98 88" />
      <circle cx="85" cy="95" r="2.5" fill="#2b2b2b" />
      {/* Corpo deitado */}
      <path d="M 100 95 Q 120 75 140 95" />
      {/* Braços cruzados */}
      <path d="M 85 95 L 60 95" />
      {/* Zzz */}
      <path d="M 60 70 L 70 70 L 60 60 L 70 60" stroke="#3498db" />
      <path d="M 50 50 L 60 50 L 50 40 L 60 40" stroke="#3498db" strokeWidth="2" />
    </svg>
  );
}

// 7. SUPORTE COM HEADSET
export function SuporteFoneSVG({ tamanho = 140 }) {
  return (
    <svg width={tamanho * 1.3} height={tamanho} viewBox="0 0 170 140" fill="none" stroke="#2b2b2b" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round">
      <circle cx="85" cy="40" r="16" fill="#e8daef" />
      {/* Headset */}
      <path d="M 69 40 A 16 16 0 0 1 101 40" stroke="#8e44ad" strokeWidth="4" />
      <rect x="65" y="35" width="6" height="12" rx="2" fill="#8e44ad" stroke="none" />
      <rect x="99" y="35" width="6" height="12" rx="2" fill="#8e44ad" stroke="none" />
      <path d="M 65 45 Q 60 50 75 52" stroke="#8e44ad" strokeWidth="2" />
      
      <circle cx="78" cy="38" r="2.5" fill="#2b2b2b" />
      <circle cx="92" cy="38" r="2.5" fill="#2b2b2b" />
      <path d="M 80 46 Q 85 50 90 46" />
      <line x1="85" y1="56" x2="85" y2="100" />
      <path d="M 85 65 L 60 75 L 75 90" />
      <path d="M 85 65 L 110 75 L 95 90" />
      <line x1="85" y1="100" x2="70" y2="135" />
      <line x1="85" y1="100" x2="100" y2="135" />
    </svg>
  );
}

// 8. DEV COMEMORANDO
export function DevComemorandoSVG({ tamanho = 140 }) {
  return (
    <svg width={tamanho * 1.3} height={tamanho} viewBox="0 0 170 140" fill="none" stroke="#2b2b2b" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round">
      <circle cx="85" cy="35" r="16" fill="#fcf3cf" />
      <path d="M 77 32 Q 80 28 83 32" strokeWidth="2" />
      <path d="M 87 32 Q 90 28 93 32" strokeWidth="2" />
      <path d="M 80 40 Q 85 50 90 40 Z" fill="#c0392b" />
      <line x1="85" y1="51" x2="85" y2="90" />
      {/* Braços pra cima */}
      <path d="M 85 60 L 60 40 L 50 20" />
      <path d="M 85 60 L 110 40 L 120 20" />
      {/* Pernas saltando */}
      <path d="M 85 90 L 65 110 L 50 130" />
      <path d="M 85 90 L 105 105 L 115 130" />
      {/* Confetes */}
      <circle cx="40" cy="40" r="3" fill="#3498db" stroke="none" />
      <circle cx="130" cy="45" r="3" fill="#e74c3c" stroke="none" />
      <circle cx="60" cy="15" r="3" fill="#2ecc71" stroke="none" />
      <circle cx="110" cy="15" r="3" fill="#f1c40f" stroke="none" />
    </svg>
  );
}

// 9. DEV PENSATIVO
export function DevPensativoSVG({ tamanho = 140 }) {
  return (
    <svg width={tamanho * 1.3} height={tamanho} viewBox="0 0 170 140" fill="none" stroke="#2b2b2b" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round">
      <circle cx="85" cy="40" r="16" fill="#e8f8f5" />
      <circle cx="78" cy="37" r="2.5" fill="#2b2b2b" />
      <circle cx="92" cy="37" r="2.5" fill="#2b2b2b" />
      <line x1="75" y1="32" x2="81" y2="34" />
      <line x1="95" y1="32" x2="89" y2="34" />
      <line x1="80" y1="46" x2="90" y2="46" />
      <line x1="85" y1="56" x2="85" y2="100" />
      {/* Mão no queixo */}
      <path d="M 85 65 L 100 80 L 85 55" />
      <path d="M 85 65 L 70 85 L 85 95" />
      <line x1="85" y1="100" x2="70" y2="135" />
      <line x1="85" y1="100" x2="100" y2="135" />
      {/* Interrogação */}
      <path d="M 105 20 A 5 5 0 1 1 115 25 Q 115 30 110 32 L 110 35" stroke="#3498db" />
      <circle cx="110" cy="40" r="1.5" fill="#3498db" stroke="none" />
    </svg>
  );
}