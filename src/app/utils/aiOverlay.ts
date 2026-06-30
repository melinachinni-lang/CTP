const STYLES = `
  @keyframes ctpSpin { from{transform:rotate(0deg)} to{transform:rotate(360deg)} }
  @keyframes ctpIn   { from{opacity:0;transform:scale(0.88) translateY(24px)} to{opacity:1;transform:scale(1) translateY(0)} }
  @keyframes ctpS1   { 0%,100%{transform:scale(1) rotate(0deg);opacity:0.9} 50%{transform:scale(1.5) rotate(25deg);opacity:0.25} }
  @keyframes ctpS2   { 0%,100%{transform:scale(0.6) rotate(-20deg);opacity:0.25} 50%{transform:scale(1.35) rotate(15deg);opacity:1} }
  @keyframes ctpS3   { 0%,33%,100%{transform:scale(1.1) rotate(8deg);opacity:0.5} 66%{transform:scale(0.65) rotate(-15deg);opacity:1} }
  @keyframes ctpT1   { 0%,100%{transform:scale(0.5) rotate(0deg);opacity:0.15} 50%{transform:scale(1.3) rotate(30deg);opacity:1} }
  @keyframes ctpT2   { 0%,100%{transform:scale(1.2) rotate(-10deg);opacity:0.9} 50%{transform:scale(0.45) rotate(20deg);opacity:0.1} }
  @keyframes ctpT3   { 0%,100%{transform:scale(0.8) rotate(5deg);opacity:0.4} 50%{transform:scale(1.4) rotate(-25deg);opacity:0.95} }
`;

// Constelación de estrellas — posiciones fijas dentro de 240×52px
const stars = [
  { t: 4,  l: 0,   s: 0.6,  c: '#52D68A', a: 'ctpT1', d: 1.2, delay: 0.0 },
  { t: 22, l: 28,  s: 1.15, c: '#006B4E', a: 'ctpT2', d: 2.0, delay: 0.4 },
  { t: 2,  l: 60,  s: 0.75, c: '#1A8B62', a: 'ctpT3', d: 1.5, delay: 0.8 },
  { t: 32, l: 88,  s: 0.5,  c: '#A8F0CA', a: 'ctpT1', d: 1.3, delay: 1.1 },
  { t: 8,  l: 112, s: 1.4,  c: '#006B4E', a: 'ctpT2', d: 2.2, delay: 0.6 },
  { t: 36, l: 140, s: 0.65, c: '#52D68A', a: 'ctpT3', d: 1.4, delay: 1.5 },
  { t: 10, l: 165, s: 0.9,  c: '#1A8B62', a: 'ctpT1', d: 1.7, delay: 0.3 },
  { t: 28, l: 192, s: 0.55, c: '#006B4E', a: 'ctpT2', d: 1.9, delay: 0.9 },
  { t: 4,  l: 218, s: 0.7,  c: '#52D68A', a: 'ctpT3', d: 1.1, delay: 1.2 },
  { t: 26, l: 240, s: 1.0,  c: '#1A8B62', a: 'ctpT1', d: 1.6, delay: 0.1 },
]
  .map(
    ({ t, l, s, c, a, d, delay }) =>
      `<span style="position:absolute;top:${t}px;left:${l}px;font-size:${s}rem;color:${c};line-height:1;animation:${a} ${d}s ease-in-out ${delay}s infinite">✦</span>`
  )
  .join('');

export function showAiOverlay(): void {
  if (!document.getElementById('__ctp-ai-style__')) {
    const s = document.createElement('style');
    s.id = '__ctp-ai-style__';
    s.textContent = STYLES;
    document.head.appendChild(s);
  }

  document.getElementById('__ctp-ai-overlay__')?.remove();

  const el = document.createElement('div');
  el.id = '__ctp-ai-overlay__';
  el.style.cssText =
    'position:fixed;inset:0;z-index:99999;display:flex;align-items:center;justify-content:center;background:rgba(0,8,4,0.55);backdrop-filter:blur(14px)';

  el.innerHTML = `
    <div style="position:relative;border-radius:24px;overflow:hidden;padding:2.5px;animation:ctpIn 0.4s cubic-bezier(0.34,1.56,0.64,1) forwards">
      <!-- Borde giratorio en gradiente verde CTP -->
      <div style="position:absolute;top:50%;left:50%;width:500px;height:500px;margin:-250px 0 0 -250px">
        <div style="width:100%;height:100%;background:conic-gradient(from 0deg,#01533E,#006B4E,#1A8B62,#2ECC71,#52D68A,#A8F0CA,#52D68A,#1A8B62,#006B4E,#01533E);animation:ctpSpin 2.5s linear infinite"></div>
      </div>
      <!-- Tarjeta blanca -->
      <div style="position:relative;z-index:1;background:#fff;border-radius:22px;padding:44px 36px;width:320px;display:flex;flex-direction:column;align-items:center;gap:24px;text-align:center">
        <!-- Cluster de estrellas central (ícono) -->
        <div style="position:relative;width:80px;height:80px">
          <div style="position:absolute;inset:0;background:#E8F5EE;border-radius:20px"></div>
          <span style="position:absolute;inset:0;display:flex;align-items:center;justify-content:center;font-size:2.2rem;color:#006B4E;animation:ctpS1 2s ease-in-out infinite">✦</span>
          <span style="position:absolute;top:-12px;right:-12px;font-size:1rem;color:#52D68A;animation:ctpS2 1.4s ease-in-out 0.35s infinite">✦</span>
          <span style="position:absolute;bottom:-8px;left:-10px;font-size:0.7rem;color:#1A8B62;animation:ctpS3 1.7s ease-in-out 0.7s infinite">✦</span>
          <span style="position:absolute;top:-8px;left:-12px;font-size:0.55rem;color:#A8F0CA;animation:ctpT1 1.5s ease-in-out 1.0s infinite">✦</span>
        </div>
        <!-- Texto -->
        <div>
          <p style="margin:0 0 10px;font-size:1.1rem;font-weight:700;color:#006B4E;font-family:Montserrat,sans-serif;letter-spacing:-0.02em">La IA está analizando tu búsqueda…</p>
          <p style="margin:0;font-size:0.875rem;color:#737373;font-family:Inter,sans-serif;line-height:1.65">Estamos encontrando las parcelas que mejor se adaptan a lo que describes.</p>
        </div>
        <!-- Constelación de estrellas -->
        <div style="position:relative;width:260px;height:52px;overflow:visible">
          ${stars}
        </div>
      </div>
    </div>
  `;

  document.body.appendChild(el);
}

export function hideAiOverlay(): void {
  document.getElementById('__ctp-ai-overlay__')?.remove();
}
