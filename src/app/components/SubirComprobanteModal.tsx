import React, { useState, useRef, useEffect } from 'react';
import { X, CheckCircle, Upload, FileText, Clock, ChevronRight } from 'lucide-react';

interface SubirComprobanteModalProps {
  isOpen: boolean;
  onClose: () => void;
  onComprobanteEnviado: () => void;
  parcela: { titulo: string };
  initialPaso?: 1 | 2;
}


export function SubirComprobanteModal({ isOpen, onClose, onComprobanteEnviado, parcela, initialPaso = 1 }: SubirComprobanteModalProps) {
  const [paso, setPaso] = useState<1 | 2 | 3>(initialPaso);
  const [monto, setMonto] = useState('');
  const [fecha, setFecha] = useState('');
  const [referencia, setReferencia] = useState('');
  const [mensaje, setMensaje] = useState('');
  const [archivo, setArchivo] = useState<string | null>(null);
  const [dragOver, setDragOver] = useState(false);
  const [enviando, setEnviando] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (isOpen) {
      setPaso(initialPaso);
      setArchivo(null);
      setFecha('');
      setReferencia('');
      setMensaje('');
      setMonto('');
    }
  }, [isOpen]);

  if (!isOpen) return null;

  const handleArchivo = (file: File) => {
    if (file.size > 10 * 1024 * 1024) return;
    setArchivo(file.name);
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    setDragOver(false);
    const file = e.dataTransfer.files[0];
    if (file) handleArchivo(file);
  };

  const puedeEnviar = fecha && referencia && archivo;

  const handleEnviar = async () => {
    if (!puedeEnviar) return;
    setEnviando(true);
    await new Promise(r => setTimeout(r, 1500));
    setEnviando(false);
    setPaso(3);
  };

  const handleCerrar = () => {
    if (paso === 3) onComprobanteEnviado();
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4" style={{ backgroundColor: 'rgba(0,0,0,0.5)' }} onClick={handleCerrar}>
      <div className="bg-white rounded-2xl shadow-2xl w-full max-w-lg max-h-[90vh] overflow-y-auto" onClick={e => e.stopPropagation()}>

        {/* Header */}
        <div className="sticky top-0 bg-white px-6 py-4 border-b flex items-center justify-between" style={{ borderColor: '#E5E5E5' }}>
          <div>
            {/* Steps */}
            <div className="flex items-center gap-2 mb-1">
              {[1, 2, 3].map((s, i) => (
                <React.Fragment key={s}>
                  <div className="flex items-center gap-1.5">
                    <div className="w-5 h-5 rounded-full flex items-center justify-center text-xs font-medium" style={{
                      backgroundColor: paso >= s ? '#006B4E' : '#E5E5E5',
                      color: paso >= s ? '#FFFFFF' : '#9CA3AF',
                    }}>
                      {paso > s ? <CheckCircle className="w-3 h-3" /> : s}
                    </div>
                    <span style={{ fontFamily: 'var(--font-body)', fontSize: '11px', color: paso === s ? '#006B4E' : '#9CA3AF', fontWeight: paso === s ? 600 : 400 }}>
                      {['Transferencia', 'Comprobante', 'Listo'][i]}
                    </span>
                  </div>
                  {i < 2 && <ChevronRight className="w-3 h-3" style={{ color: '#D1D5DB' }} />}
                </React.Fragment>
              ))}
            </div>
            <p style={{ fontFamily: 'var(--font-body)', fontSize: 'var(--font-size-xs)', color: '#9CA3AF' }}>{parcela.titulo}</p>
          </div>
          <button onClick={handleCerrar} className="p-2 rounded-lg hover:bg-gray-100 transition-colors">
            <X className="w-4 h-4" style={{ color: '#6B7280' }} />
          </button>
        </div>

        {/* PASO 2 — Formulario */}
        {paso === 2 && (
          <div className="p-6 space-y-5">
            <div>
              <h2 style={{ fontFamily: 'var(--font-heading)', fontWeight: 500, fontSize: 'var(--font-size-h3)', color: '#0A0A0A', marginBottom: '6px' }}>
                Sube tu comprobante
              </h2>
              <p style={{ fontFamily: 'var(--font-body)', fontSize: 'var(--font-size-body-sm)', color: '#6B7280', lineHeight: '1.6' }}>
                Completa los datos y adjunta el comprobante de transferencia.
              </p>
            </div>

            {/* Monto */}
            <div>
              <label style={{ display: 'block', fontFamily: 'var(--font-body)', fontSize: 'var(--font-size-body-sm)', fontWeight: 500, color: '#374151', marginBottom: '6px' }}>
                Monto transferido <span style={{ color: '#DC2626' }}>*</span>
              </label>
              <input type="text" value={monto} onChange={e => setMonto(e.target.value)} className="w-full px-4 py-2.5 rounded-lg text-sm"
                style={{ border: '1px solid #E5E5E5', backgroundColor: '#FAFAFA', color: '#0A0A0A', outline: 'none', fontFamily: 'var(--font-body)' }} />
            </div>

            {/* Fecha */}
            <div>
              <label style={{ display: 'block', fontFamily: 'var(--font-body)', fontSize: 'var(--font-size-body-sm)', fontWeight: 500, color: '#374151', marginBottom: '6px' }}>
                Fecha de la transferencia <span style={{ color: '#DC2626' }}>*</span>
              </label>
              <input type="date" value={fecha} onChange={e => setFecha(e.target.value)} className="w-full px-4 py-2.5 rounded-lg text-sm"
                style={{ border: '1px solid #E5E5E5', backgroundColor: '#FAFAFA', color: '#0A0A0A', outline: 'none', fontFamily: 'var(--font-body)' }} />
            </div>

            {/* Referencia */}
            <div>
              <label style={{ display: 'block', fontFamily: 'var(--font-body)', fontSize: 'var(--font-size-body-sm)', fontWeight: 500, color: '#374151', marginBottom: '6px' }}>
                N° de comprobante / referencia <span style={{ color: '#DC2626' }}>*</span>
              </label>
              <input type="text" value={referencia} onChange={e => setReferencia(e.target.value)} placeholder="Ej: 123456789"
                className="w-full px-4 py-2.5 rounded-lg text-sm"
                style={{ border: '1px solid #E5E5E5', backgroundColor: '#FAFAFA', color: '#0A0A0A', outline: 'none', fontFamily: 'var(--font-body)' }} />
            </div>

            {/* Archivo */}
            <div>
              <label style={{ display: 'block', fontFamily: 'var(--font-body)', fontSize: 'var(--font-size-body-sm)', fontWeight: 500, color: '#374151', marginBottom: '6px' }}>
                Archivo del comprobante <span style={{ color: '#DC2626' }}>*</span>
              </label>
              <input ref={fileInputRef} type="file" accept="image/*,.pdf" className="hidden"
                onChange={e => { if (e.target.files?.[0]) handleArchivo(e.target.files[0]); }} />
              {archivo ? (
                <div className="flex items-center justify-between px-4 py-3 rounded-xl" style={{ backgroundColor: '#EBFEF5', border: '1px solid #A7F3D0' }}>
                  <div className="flex items-center gap-2">
                    <FileText className="w-4 h-4" style={{ color: '#059669' }} />
                    <span style={{ fontFamily: 'var(--font-body)', fontSize: 'var(--font-size-body-sm)', color: '#065F46', fontWeight: 500 }}>{archivo}</span>
                  </div>
                  <button onClick={() => setArchivo(null)} className="text-xs" style={{ color: '#6B7280', fontFamily: 'var(--font-body)' }}>Cambiar</button>
                </div>
              ) : (
                <div
                  onClick={() => fileInputRef.current?.click()}
                  onDragOver={e => { e.preventDefault(); setDragOver(true); }}
                  onDragLeave={() => setDragOver(false)}
                  onDrop={handleDrop}
                  className="rounded-xl p-8 text-center cursor-pointer transition-all"
                  style={{ border: `2px dashed ${dragOver ? '#006B4E' : '#D1D5DB'}`, backgroundColor: dragOver ? '#EBFEF5' : '#FAFAFA' }}
                >
                  <Upload className="w-8 h-8 mx-auto mb-2" style={{ color: dragOver ? '#006B4E' : '#9CA3AF' }} />
                  <p style={{ fontFamily: 'var(--font-body)', fontSize: 'var(--font-size-body-sm)', fontWeight: 500, color: '#374151', marginBottom: '2px' }}>
                    Arrastra el archivo o haz clic para seleccionar
                  </p>
                  <p style={{ fontFamily: 'var(--font-body)', fontSize: 'var(--font-size-xs)', color: '#9CA3AF' }}>
                    JPG, PNG o PDF · Máximo 10 MB
                  </p>
                </div>
              )}
            </div>

            {/* Mensaje opcional */}
            <div>
              <label style={{ display: 'block', fontFamily: 'var(--font-body)', fontSize: 'var(--font-size-body-sm)', fontWeight: 500, color: '#374151', marginBottom: '6px' }}>
                Mensaje <span style={{ color: '#9CA3AF', fontWeight: 400 }}>(opcional)</span>
              </label>
              <textarea value={mensaje} onChange={e => setMensaje(e.target.value)} rows={2} placeholder="Cualquier información adicional..."
                className="w-full px-4 py-2.5 rounded-lg text-sm resize-none"
                style={{ border: '1px solid #E5E5E5', backgroundColor: '#FAFAFA', color: '#0A0A0A', outline: 'none', fontFamily: 'var(--font-body)', lineHeight: '1.5' }} />
            </div>

            <div className="flex gap-3 pt-1">
              {initialPaso === 1 && (
                <button onClick={() => setPaso(1)} className="px-5 py-2.5 rounded-full text-sm font-medium transition-all" style={{ backgroundColor: '#F5F5F5', color: '#374151', fontFamily: 'var(--font-body)' }}
                  onMouseEnter={e => e.currentTarget.style.backgroundColor = '#E5E5E5'}
                  onMouseLeave={e => e.currentTarget.style.backgroundColor = '#F5F5F5'}>
                  Atrás
                </button>
              )}
              <button onClick={handleEnviar} disabled={!puedeEnviar || enviando} className="flex-1 py-2.5 rounded-full text-sm font-medium transition-all flex items-center justify-center gap-2"
                style={{ backgroundColor: puedeEnviar && !enviando ? '#006B4E' : '#E5E5E5', color: puedeEnviar && !enviando ? '#FFFFFF' : '#9CA3AF', fontFamily: 'var(--font-body)', cursor: puedeEnviar && !enviando ? 'pointer' : 'not-allowed' }}
                onMouseEnter={e => { if (puedeEnviar && !enviando) e.currentTarget.style.backgroundColor = '#01533E'; }}
                onMouseLeave={e => { if (puedeEnviar && !enviando) e.currentTarget.style.backgroundColor = '#006B4E'; }}>
                {enviando ? 'Enviando...' : 'Enviar comprobante'}
              </button>
            </div>
          </div>
        )}

        {/* PASO 3 — Confirmación */}
        {paso === 3 && (
          <div className="p-8 text-center space-y-6">
            <div className="w-20 h-20 rounded-full flex items-center justify-center mx-auto" style={{ backgroundColor: '#FEF3C7' }}>
              <Clock className="w-9 h-9" style={{ color: '#D97706' }} />
            </div>

            <div>
              <h2 style={{ fontFamily: 'var(--font-heading)', fontWeight: 500, fontSize: 'var(--font-size-h3)', color: '#0A0A0A', marginBottom: '8px' }}>
                ¡Comprobante recibido!
              </h2>
              <p style={{ fontFamily: 'var(--font-body)', fontSize: 'var(--font-size-body-base)', color: '#6B7280', lineHeight: '1.6' }}>
                Tu pago está siendo validado. La parcela quedará en estado <strong style={{ color: '#D97706' }}>Pago en validación</strong> hasta que nuestro equipo confirme la transferencia.
              </p>
            </div>

            {/* Aviso de email */}
            <div className="rounded-xl p-4 flex items-start gap-3" style={{ backgroundColor: '#EFF6FF', border: '1px solid #BFDBFE' }}>
              <div className="w-8 h-8 rounded-full flex items-center justify-center flex-shrink-0" style={{ backgroundColor: '#DBEAFE' }}>
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#2563EB" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <rect width="20" height="16" x="2" y="4" rx="2"/>
                  <path d="m22 7-8.97 5.7a1.94 1.94 0 0 1-2.06 0L2 7"/>
                </svg>
              </div>
              <div>
                <p style={{ fontFamily: 'var(--font-body)', fontSize: 'var(--font-size-body-sm)', fontWeight: 600, color: '#1E40AF', marginBottom: '2px' }}>
                  Revisa tu casilla de email
                </p>
                <p style={{ fontFamily: 'var(--font-body)', fontSize: 'var(--font-size-xs)', color: '#3B82F6', lineHeight: '1.5' }}>
                  Te enviamos la confirmación de tu solicitud. Una vez validado el pago, recibirás un segundo correo con la confirmación final.
                </p>
              </div>
            </div>

            <div className="rounded-xl p-5 text-left space-y-3" style={{ backgroundColor: '#F9FAFB', border: '1px solid #E5E5E5' }}>
              <p style={{ fontFamily: 'var(--font-body)', fontSize: 'var(--font-size-body-sm)', fontWeight: 600, color: '#111827' }}>¿Qué pasa ahora?</p>
              {[
                'Nuestro equipo revisará el comprobante en las próximas 24 hs hábiles.',
                'Recibirás un correo confirmando que el pago fue validado.',
                'Una vez confirmado, la parcela pasará a estado "Reservada".',
              ].map((text, i) => (
                <div key={i} className="flex items-start gap-2">
                  <div className="w-5 h-5 rounded-full flex items-center justify-center flex-shrink-0 text-xs font-medium mt-0.5" style={{ backgroundColor: '#006B4E', color: '#FFFFFF' }}>{i + 1}</div>
                  <p style={{ fontFamily: 'var(--font-body)', fontSize: 'var(--font-size-body-sm)', color: '#6B7280', lineHeight: '1.5' }}>{text}</p>
                </div>
              ))}
            </div>

            <button onClick={handleCerrar} className="w-full py-3 rounded-full text-sm font-medium transition-all"
              style={{ backgroundColor: '#006B4E', color: '#FFFFFF', fontFamily: 'var(--font-body)' }}
              onMouseEnter={e => e.currentTarget.style.backgroundColor = '#01533E'}
              onMouseLeave={e => e.currentTarget.style.backgroundColor = '#006B4E'}>
              Entendido
            </button>
          </div>
        )}
      </div>
    </div>
  );
}
