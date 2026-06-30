const STYLES = `
  @keyframes ctpSpin  { from{transform:rotate(0deg)} to{transform:rotate(360deg)} }
  @keyframes ctpIn    { from{opacity:0;transform:scale(0.88) translateY(24px)} to{opacity:1;transform:scale(1) translateY(0)} }
  @keyframes ctpS1    { 0%,100%{transform:scale(1) rotate(0deg)} 50%{transform:scale(1.4) rotate(22deg)} }
  @keyframes ctpS2    { 0%,100%{transform:scale(0.7) rotate(-15deg);opacity:0.5} 50%{transform:scale(1.25) rotate(12deg);opacity:1} }
  @keyframes ctpS3    { 0%,100%{transform:scale(1) rotate(8deg);opacity:0.4} 50%{transform:scale(1.5) rotate(-18deg);opacity:1} }
  @keyframes ctpWave  { 0%,100%{transform:scaleY(0.3);opacity:0.35} 50%{transform:scaleY(1);opacity:1} }
`;

const bars = [10, 16, 24, 20, 28, 20, 16, 10]
  .map((h, i) =>
    `<div style="width:4px;height:${h}px;border-radius:99px;background:linear-gradient(to top,#006B4E,#52D68A);transform-origin:bottom;animation:ctpWave 0.8s ease-in-out ${(i * 0.1).toFixed(1)}s infinite"></div>`
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
      <!-- Rotating gradient border -->
      <div style="position:absolute;top:50%;left:50%;width:500px;height:500px;margin:-250px 0 0 -250px">
        <div style="width:100%;height:100%;background:conic-gradient(from 0deg,#01533E,#006B4E,#1A8B62,#2ECC71,#52D68A,#A8F0CA,#52D68A,#1A8B62,#006B4E,#01533E);animation:ctpSpin 2.5s linear infinite"></div>
      </div>
      <!-- White card -->
      <div style="position:relative;z-index:1;background:#fff;border-radius:22px;padding:44px 36px;width:320px;display:flex;flex-direction:column;align-items:center;gap:22px;text-align:center">
        <!-- Sparkle cluster -->
        <div style="position:relative;width:80px;height:80px">
          <div style="position:absolute;inset:0;background:#E8F5EE;border-radius:20px"></div>
          <span style="position:absolute;inset:0;display:flex;align-items:center;justify-content:center;font-size:2.2rem;color:#006B4E;animation:ctpS1 2s ease-in-out infinite">✦</span>
          <span style="position:absolute;top:-12px;right:-12px;font-size:1rem;color:#52D68A;animation:ctpS2 1.4s ease-in-out 0.35s infinite">✦</span>
          <span style="position:absolute;bottom:-8px;left:-10px;font-size:0.7rem;color:#1A8B62;animation:ctpS3 1.7s ease-in-out 0.7s infinite">✦</span>
        </div>
        <!-- Text -->
        <div>
          <p style="margin:0 0 10px;font-size:1.1rem;font-weight:700;color:#006B4E;font-family:Montserrat,sans-serif;letter-spacing:-0.02em">La IA está analizando tu búsqueda…</p>
          <p style="margin:0;font-size:0.875rem;color:#737373;font-family:Inter,sans-serif;line-height:1.6">Estamos encontrando las parcelas que mejor se adaptan a lo que describes.</p>
        </div>
        <!-- Equalizer bars -->
        <div style="display:flex;gap:4px;align-items:flex-end;height:28px">
          ${bars}
        </div>
      </div>
    </div>
  `;

  document.body.appendChild(el);
}

export function hideAiOverlay(): void {
  document.getElementById('__ctp-ai-overlay__')?.remove();
}
