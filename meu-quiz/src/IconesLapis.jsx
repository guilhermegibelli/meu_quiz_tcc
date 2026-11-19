import React from 'react';

export function IconeLapis({ tamanho = 20, cor = "currentColor" }) {
  return (
    <svg width={tamanho} height={tamanho} viewBox="0 0 24 24" fill="none" stroke={cor} strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
      <path d="M17 3a2.828 2.828 0 1 1 4 4L7.5 20.5 2 22l1.5-5.5L17 3z" />
    </svg>
  );
}

export function IconePrancheta({ tamanho = 20, cor = "currentColor" }) {
  return (
    <svg width={tamanho} height={tamanho} viewBox="0 0 24 24" fill="none" stroke={cor} strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
      <path d="M16 4h2a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2H6a2 2 0 0 1-2-2V6a2 2 0 0 1 2-2h2" />
      <rect x="8" y="2" width="8" height="4" rx="1" ry="1" />
    </svg>
  );
}

export function IconeLink({ tamanho = 20, cor = "currentColor" }) {
  return (
    <svg width={tamanho} height={tamanho} viewBox="0 0 24 24" fill="none" stroke={cor} strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
      <path d="M10 13a5 5 0 0 0 7.54.54l3-3a5 5 0 0 0-7.07-7.07l-1.72 1.71" />
      <path d="M14 11a5 5 0 0 0-7.54-.54l-3 3a5 5 0 0 0 7.07 7.07l1.71-1.71" />
    </svg>
  );
}

export function IconeLixeira({ tamanho = 20, cor = "currentColor" }) {
  return (
    <svg width={tamanho} height={tamanho} viewBox="0 0 24 24" fill="none" stroke={cor} strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
      <polyline points="3 6 5 6 21 6" />
      <path d="M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6m3 0V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2" />
    </svg>
  );
}

export function IconeGrafico({ tamanho = 20, cor = "currentColor" }) {
  return (
    <svg width={tamanho} height={tamanho} viewBox="0 0 24 24" fill="none" stroke={cor} strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
      <line x1="18" y1="20" x2="18" y2="10" />
      <line x1="12" y1="20" x2="12" y2="4" />
      <line x1="6" y1="20" x2="6" y2="14" />
    </svg>
  );
}

export function IconeFechar({ tamanho = 20, cor = "currentColor" }) {
  return (
    <svg width={tamanho} height={tamanho} viewBox="0 0 24 24" fill="none" stroke={cor} strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
      <line x1="18" y1="6" x2="6" y2="18" />
      <line x1="6" y1="6" x2="18" y2="18" />
    </svg>
  );
}

export function IconeBlocos({ tamanho = 20, cor = "currentColor" }) {
  return (
    <svg width={tamanho} height={tamanho} viewBox="0 0 24 24" fill="none" stroke={cor} strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
      <rect x="3" y="3" width="7" height="7" rx="1" />
      <rect x="14" y="3" width="7" height="7" rx="1" />
      <rect x="14" y="14" width="7" height="7" rx="1" />
      <rect x="3" y="14" width="7" height="7" rx="1" />
    </svg>
  );
}

export function IconeMultiplaEscolha({ tamanho = 20, cor = "currentColor" }) {
  return (
    <svg width={tamanho} height={tamanho} viewBox="0 0 24 24" fill="none" stroke={cor} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <circle cx="5" cy="6" r="2" />
      <circle cx="5" cy="12" r="2" />
      <circle cx="5" cy="18" r="2" />
      <path d="M10 6h9M10 12h9M10 18h9" />
    </svg>
  );
}

export function IconeArrastarBloco({ tamanho = 20, cor = "currentColor" }) {
  return (
    <svg width={tamanho} height={tamanho} viewBox="0 0 24 24" fill="none" stroke={cor} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <rect x="3" y="4" width="13" height="5" rx="1" />
      <rect x="8" y="15" width="13" height="5" rx="1" />
      <path d="M18 9v4M16 11l2 2 2-2" />
    </svg>
  );
}

export function IconeQuestaoAberta({ tamanho = 20, cor = "currentColor" }) {
  return (
    <svg width={tamanho} height={tamanho} viewBox="0 0 24 24" fill="none" stroke={cor} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M4 5h16v14H4z" />
      <path d="M7 9h10M7 13h7M7 17h4" />
    </svg>
  );
}

export function IconeTrocarOrdem({ tamanho = 20, cor = "currentColor" }) {
  return (
    <svg width={tamanho} height={tamanho} viewBox="0 0 24 24" fill="none" stroke={cor} strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M8 13V3M8 3L5 6M8 3l3 3" />
      <path d="M16 11v10M16 21l-3-3M16 21l3-3" />
    </svg>
  );
}