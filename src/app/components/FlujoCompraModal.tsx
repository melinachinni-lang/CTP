import React, { useState, useEffect, useRef } from 'react';
import { X, Copy, CheckCircle, Check, AlertCircle, ChevronLeft, Building2, CreditCard, Upload, FileText, Clock, ChevronDown, Lock } from 'lucide-react';

const DATOS_BANCARIOS = [
  { label: 'Nombre', value: 'Inmobiliaria Isla SPA' },
  { label: 'RUT', value: '76.979.142-6' },
  { label: 'Banco', value: 'Banco Santander' },
  { label: 'Tipo de cuenta', value: 'Cuenta Corriente' },
  { label: 'N° de cuenta', value: '74062750' },
  { label: 'Email', value: 'ventaonline@compratuparcela.cl' },
];

const LINK_PAGO_MOCK = 'https://pago.compratuparcela.cl/r/abc123xyz456';
const ESTADOS_CIVILES = ['Soltero/a', 'Casado/a', 'Viudo/a', 'Divorciado/a', 'Separado/a de hecho', 'Conviviente civil'];

interface DatosCliente {
  nombreCompleto: string;
  rut: string;
  nacionalidad: string;
  profesion: string;
  estadoCivil: string;
  regimenPatrimonial: string;
  conyugeNombre: string;
  conyugeRut: string;
  conyugeEmail: string;
  conyugeCelular: string;
  direccion: string;
  ciudad: string;
  provincia: string;
  codigoPostal: string;
  email: string;
  celular: string;
}

const DATOS_VACIOS: DatosCliente = {
  nombreCompleto: '', rut: '', nacionalidad: '', profesion: '',
  estadoCivil: '', regimenPatrimonial: '',
  conyugeNombre: '', conyugeRut: '', conyugeEmail: '', conyugeCelular: '',
  direccion: '', ciudad: '', provincia: '',
  codigoPostal: '', email: '', celular: '',
};

const labelStyle: React.CSSProperties = {
  display: 'block',
  fontFamily: 'var(--font-body)',
  fontSize: 'var(--font-size-body-sm)',
  color: '#525252',
  fontWeight: 500,
  marginBottom: '0.5rem',
};

const inputStyle: React.CSSProperties = {
  fontFamily: 'var(--font-body)',
  fontSize: 'var(--font-size-body-base)',
  borderColor: '#E5E5E5',
  backgroundColor: '#FAFAFA',
  color: '#0A0A0A',
};

function ClienteForm({ datos, onChange, titulo }: {
  datos: DatosCliente;
  onChange: (d: DatosCliente) => void;
  titulo?: string;
}) {
  const set = (key: keyof DatosCliente) => (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) =>
    onChange({ ...datos, [key]: e.target.value });

  return (
    <div className="space-y-4">
      {titulo && (
        <p style={{ fontFamily: 'var(--font-body)', fontWeight: 600, fontSize: 'var(--font-size-body-sm)', color: '#374151', paddingBottom: '8px', borderBottom: '1px solid #F3F4F6' }}>
          {titulo}
        </p>
      )}

      <div>
        <label style={labelStyle}>Nombre completo <span style={{ color: '#DC2626' }}>*</span></label>
        <input type="text" value={datos.nombreCompleto} onChange={set('nombreCompleto')} placeholder="Ej: María González López"
          className="w-full px-4 py-2.5 rounded-lg border transition-colors focus:outline-none focus:ring-2 focus:ring-gray-900" style={inputStyle} />
      </div>

      <div>
        <label style={labelStyle}>RUT <span style={{ color: '#9CA3AF', fontWeight: 400, fontSize: '11px' }}>Formato 11.111.111-1</span></label>
        <input type="text" value={datos.rut} onChange={set('rut')} placeholder="11.111.111-1"
          className="w-full px-4 py-2.5 rounded-lg border transition-colors focus:outline-none focus:ring-2 focus:ring-gray-900" style={inputStyle} />
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <div>
          <label style={labelStyle}>Nacionalidad</label>
          <input type="text" value={datos.nacionalidad} onChange={set('nacionalidad')} placeholder="Ej: Chilena"
            className="w-full px-4 py-2.5 rounded-lg border transition-colors focus:outline-none focus:ring-2 focus:ring-gray-900" style={inputStyle} />
        </div>
        <div>
          <label style={labelStyle}>Profesión u oficio</label>
          <input type="text" value={datos.profesion} onChange={set('profesion')} placeholder="Ej: Ingeniero/a"
            className="w-full px-4 py-2.5 rounded-lg border transition-colors focus:outline-none focus:ring-2 focus:ring-gray-900" style={inputStyle} />
        </div>
      </div>

      <div>
        <label style={labelStyle}>Estado civil</label>
        <div className="relative">
          <select value={datos.estadoCivil} onChange={set('estadoCivil')}
            className="w-full px-4 py-2.5 rounded-lg border transition-colors focus:outline-none focus:ring-2 focus:ring-gray-900 appearance-none"
            style={{ ...inputStyle, cursor: 'pointer' }}>
            <option value="">Seleccionar...</option>
            {ESTADOS_CIVILES.map(e => <option key={e} value={e}>{e}</option>)}
          </select>
          <ChevronDown className="w-4 h-4 absolute right-4 top-1/2 -translate-y-1/2 pointer-events-none" style={{ color: '#9CA3AF' }} />
        </div>
      </div>

      {datos.estadoCivil === 'Casado/a' && (
        <>
          <div>
            <label style={labelStyle}>Régimen patrimonial</label>
            <div className="relative">
              <select value={datos.regimenPatrimonial} onChange={set('regimenPatrimonial')}
                className="w-full px-4 py-2.5 rounded-lg border transition-colors focus:outline-none focus:ring-2 focus:ring-gray-900 appearance-none"
                style={{ ...inputStyle, cursor: 'pointer' }}>
                <option value="">Seleccionar...</option>
                <option value="sociedad-conyugal">Sociedad conyugal</option>
                <option value="separacion-bienes">Separación de bienes</option>
                <option value="participacion-gananciales">Participación en los gananciales</option>
              </select>
              <ChevronDown className="w-4 h-4 absolute right-4 top-1/2 -translate-y-1/2 pointer-events-none" style={{ color: '#9CA3AF' }} />
            </div>
          </div>
          <div className="space-y-4 p-4 rounded-lg border" style={{ backgroundColor: '#F9FAFB', borderColor: '#E5E5E5' }}>
            <p style={{ ...labelStyle, marginBottom: 0, color: '#374151' }}>Datos del cónyuge</p>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label style={labelStyle}>Nombre completo</label>
                <input type="text" value={datos.conyugeNombre} onChange={set('conyugeNombre')} placeholder="Nombre del cónyuge"
                  className="w-full px-4 py-2.5 rounded-lg border transition-colors focus:outline-none focus:ring-2 focus:ring-gray-900" style={inputStyle} />
              </div>
              <div>
                <label style={labelStyle}>RUT</label>
                <input type="text" value={datos.conyugeRut} onChange={set('conyugeRut')} placeholder="11.111.111-1"
                  className="w-full px-4 py-2.5 rounded-lg border transition-colors focus:outline-none focus:ring-2 focus:ring-gray-900" style={inputStyle} />
              </div>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label style={labelStyle}>Email</label>
                <input type="email" value={datos.conyugeEmail} onChange={set('conyugeEmail')} placeholder="conyuge@email.com"
                  className="w-full px-4 py-2.5 rounded-lg border transition-colors focus:outline-none focus:ring-2 focus:ring-gray-900" style={inputStyle} />
              </div>
              <div>
                <label style={labelStyle}>Celular</label>
                <input type="tel" value={datos.conyugeCelular} onChange={set('conyugeCelular')} placeholder="+56 9 1234 5678"
                  className="w-full px-4 py-2.5 rounded-lg border transition-colors focus:outline-none focus:ring-2 focus:ring-gray-900" style={inputStyle} />
              </div>
            </div>
          </div>
        </>
      )}

      <div>
        <label style={labelStyle}>Dirección <span style={{ color: '#9CA3AF', fontWeight: 400, fontSize: '11px' }}>(Código postal es opcional)</span></label>
        <input type="text" value={datos.direccion} onChange={set('direccion')} placeholder="Ingresa tu dirección"
          className="w-full px-4 py-2.5 rounded-lg border transition-colors focus:outline-none focus:ring-2 focus:ring-gray-900 mb-2" style={inputStyle} />
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-2">
          <input type="text" value={datos.ciudad} onChange={set('ciudad')} placeholder="Ciudad"
            className="px-4 py-2.5 rounded-lg border transition-colors focus:outline-none focus:ring-2 focus:ring-gray-900" style={inputStyle} />
          <input type="text" value={datos.provincia} onChange={set('provincia')} placeholder="Provincia"
            className="px-4 py-2.5 rounded-lg border transition-colors focus:outline-none focus:ring-2 focus:ring-gray-900" style={inputStyle} />
          <input type="text" value={datos.codigoPostal} onChange={set('codigoPostal')} placeholder="Cód. postal"
            className="px-4 py-2.5 rounded-lg border transition-colors focus:outline-none focus:ring-2 focus:ring-gray-900" style={inputStyle} />
        </div>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <div>
          <label style={labelStyle}>Email <span style={{ color: '#DC2626' }}>*</span></label>
          <input type="email" value={datos.email} onChange={set('email')} placeholder="tu@email.com"
            className="w-full px-4 py-2.5 rounded-lg border transition-colors focus:outline-none focus:ring-2 focus:ring-gray-900" style={inputStyle} />
        </div>
        <div>
          <label style={labelStyle}>Celular <span style={{ color: '#DC2626' }}>*</span></label>
          <input type="tel" value={datos.celular} onChange={set('celular')} placeholder="+56 9 1234 5678"
            className="w-full px-4 py-2.5 rounded-lg border transition-colors focus:outline-none focus:ring-2 focus:ring-gray-900" style={inputStyle} />
        </div>
      </div>
    </div>
  );
}

type PersonaEmpresa = { rut: string; nombres: string; apellidoPaterno: string; apellidoMaterno: string; sexo: string; estadoCivil: string; nacionalidad: string; profesion: string; telefono: string; email: string };

function PersonaEmpresaCard({ titulo, datos, onChange, inputStyle, labelStyle }: { titulo: string; datos: PersonaEmpresa; onChange: (d: PersonaEmpresa) => void; inputStyle: React.CSSProperties; labelStyle: React.CSSProperties }) {
  const set = (k: keyof PersonaEmpresa) => (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => onChange({ ...datos, [k]: e.target.value });
  return (
    <div className="space-y-4 p-4 rounded-lg border" style={{ backgroundColor: '#F9FAFB', borderColor: '#E5E5E5' }}>
      <p style={{ ...labelStyle, marginBottom: 0, color: '#374151', fontWeight: 600 }}>{titulo}</p>
      <div>
        <label style={labelStyle}>RUT <span style={{ color: '#DC2626' }}>*</span></label>
        <input type="text" value={datos.rut} onChange={set('rut')} placeholder="12.345.678-9"
          className="w-full px-4 py-2.5 rounded-lg border focus:outline-none focus:ring-2 focus:ring-gray-900" style={inputStyle} />
      </div>
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <div>
          <label style={labelStyle}>Nombres <span style={{ color: '#DC2626' }}>*</span></label>
          <input type="text" value={datos.nombres} onChange={set('nombres')} placeholder="Nombre(s)"
            className="w-full px-4 py-2.5 rounded-lg border focus:outline-none focus:ring-2 focus:ring-gray-900" style={inputStyle} />
        </div>
        <div>
          <label style={labelStyle}>Apellido paterno <span style={{ color: '#DC2626' }}>*</span></label>
          <input type="text" value={datos.apellidoPaterno} onChange={set('apellidoPaterno')} placeholder="Apellido paterno"
            className="w-full px-4 py-2.5 rounded-lg border focus:outline-none focus:ring-2 focus:ring-gray-900" style={inputStyle} />
        </div>
      </div>
      <div>
        <label style={labelStyle}>Apellido materno</label>
        <input type="text" value={datos.apellidoMaterno} onChange={set('apellidoMaterno')} placeholder="Apellido materno"
          className="w-full px-4 py-2.5 rounded-lg border focus:outline-none focus:ring-2 focus:ring-gray-900" style={inputStyle} />
      </div>
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <div>
          <label style={labelStyle}>Sexo</label>
          <div className="relative">
            <select value={datos.sexo} onChange={set('sexo')} className="w-full px-4 py-2.5 rounded-lg border focus:outline-none appearance-none" style={{ ...inputStyle, cursor: 'pointer' }}>
              <option value="">Sin especificar</option>
              <option>Masculino</option><option>Femenino</option><option>Otro</option>
            </select>
            <ChevronDown className="w-4 h-4 absolute right-4 top-1/2 -translate-y-1/2 pointer-events-none" style={{ color: '#9CA3AF' }} />
          </div>
        </div>
        <div>
          <label style={labelStyle}>Estado civil</label>
          <div className="relative">
            <select value={datos.estadoCivil} onChange={set('estadoCivil')} className="w-full px-4 py-2.5 rounded-lg border focus:outline-none appearance-none" style={{ ...inputStyle, cursor: 'pointer' }}>
              <option value="">Sin especificar</option>
              <option>Soltero/a</option><option>Casado/a</option><option>Viudo/a</option>
              <option>Divorciado/a</option><option>Separado/a de hecho</option><option>Conviviente civil</option>
            </select>
            <ChevronDown className="w-4 h-4 absolute right-4 top-1/2 -translate-y-1/2 pointer-events-none" style={{ color: '#9CA3AF' }} />
          </div>
        </div>
      </div>
      <div>
        <label style={labelStyle}>Nacionalidad <span style={{ color: '#DC2626' }}>*</span></label>
        <input type="text" value={datos.nacionalidad} onChange={set('nacionalidad')} placeholder="Ej: Chilena"
          className="w-full px-4 py-2.5 rounded-lg border focus:outline-none focus:ring-2 focus:ring-gray-900" style={inputStyle} />
      </div>
      <div>
        <label style={labelStyle}>Profesión</label>
        <input type="text" value={datos.profesion} onChange={set('profesion')} placeholder="Ej: Ingeniero/a"
          className="w-full px-4 py-2.5 rounded-lg border focus:outline-none focus:ring-2 focus:ring-gray-900" style={inputStyle} />
      </div>
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <div>
          <label style={labelStyle}>Teléfono</label>
          <input type="tel" value={datos.telefono} onChange={set('telefono')} placeholder="+56 9 1234 5678"
            className="w-full px-4 py-2.5 rounded-lg border focus:outline-none focus:ring-2 focus:ring-gray-900" style={inputStyle} />
        </div>
        <div>
          <label style={labelStyle}>Email</label>
          <input type="email" value={datos.email} onChange={set('email')} placeholder="correo@ejemplo.cl"
            className="w-full px-4 py-2.5 rounded-lg border focus:outline-none focus:ring-2 focus:ring-gray-900" style={inputStyle} />
        </div>
      </div>
    </div>
  );
}

function Toggle({ value, onChange }: { value: boolean; onChange: (v: boolean) => void }) {
  return (
    <button
      onClick={() => onChange(!value)}
      className="relative w-10 h-6 rounded-full transition-colors flex-shrink-0"
      style={{ backgroundColor: value ? '#0A0A0A' : '#D1D5DB' }}
    >
      <span className="absolute top-1 w-4 h-4 rounded-full bg-white shadow transition-all"
        style={{ left: value ? '22px' : '2px' }} />
    </button>
  );
}

function CountdownTimer({ segundos }: { segundos: number }) {
  const mins = Math.floor(segundos / 60).toString().padStart(2, '0');
  const secs = (segundos % 60).toString().padStart(2, '0');
  const urgente = segundos <= 300;
  const porcentaje = (segundos / (30 * 60)) * 100;

  return (
    <div className="rounded-xl overflow-hidden"
      style={{ border: `2px solid ${urgente ? '#FCA5A5' : '#E5E5E5'}`, backgroundColor: urgente ? '#FEF2F2' : '#F9FAFB' }}>
      <div className="flex items-center gap-3 px-4 py-3">
        <div className="w-9 h-9 rounded-full flex items-center justify-center flex-shrink-0"
          style={{ backgroundColor: urgente ? '#FEE2E2' : '#F3F4F6' }}>
          <Clock className="w-5 h-5" style={{ color: urgente ? '#DC2626' : '#6B7280' }} />
        </div>
        <div className="flex-1 min-w-0">
          <p style={{ fontFamily: 'var(--font-body)', fontSize: 'var(--font-size-body-sm)', fontWeight: 600, color: urgente ? '#DC2626' : '#111827', marginBottom: '2px' }}>
            {urgente ? '⚠ Tiempo limitado' : 'Reserva bloqueada para ti'}
          </p>
          <p style={{ fontFamily: 'var(--font-body)', fontSize: 'var(--font-size-xs)', color: urgente ? '#DC2626' : '#6B7280' }}>
            {urgente ? 'Completa el pago antes de que expire la reserva.' : 'Tienes tiempo para completar el pago.'}
          </p>
        </div>
        <div className="text-right flex-shrink-0">
          <span style={{ fontFamily: 'var(--font-heading)', fontSize: 'var(--font-size-h3)', fontWeight: 700, color: urgente ? '#DC2626' : '#0A0A0A', letterSpacing: '0.02em' }}>
            {mins}:{secs}
          </span>
        </div>
      </div>
      <div style={{ height: '4px', backgroundColor: urgente ? '#FCA5A5' : '#E5E5E5' }}>
        <div style={{
          height: '100%',
          width: `${porcentaje}%`,
          backgroundColor: urgente ? '#DC2626' : '#006B4E',
          transition: 'width 1s linear, background-color 0.5s ease'
        }} />
      </div>
    </div>
  );
}

interface FlujoCompraModalProps {
  isOpen: boolean;
  onClose: () => void;
  parcelaNombre: string;
  precio: string;
  tipoCompra: 'comprar' | 'reservar';
  onEstadoChange?: (estado: 'disponible' | 'reservandose' | 'pago-en-validacion' | 'reservada') => void;
}

export function FlujoCompraModal({ isOpen, onClose, parcelaNombre, precio, tipoCompra, onEstadoChange }: FlujoCompraModalProps) {
  const [paso, setPaso] = useState<1 | 'aviso' | 2 | 3 | 'mp-checkout' | 'mp-success' | 'expirado' | 'error'>(1);
  const [metodoPago, setMetodoPago] = useState<'transferencia' | 'mercadopago'>('transferencia');
  const [aceptoTyC, setAceptoTyC] = useState(false);
  const [todoCopiado, setTodoCopiado] = useState(false);
  const [archivo, setArchivo] = useState<string | null>(null);
  // MP Checkout Pro state
  const [mpMetodo, setMpMetodo] = useState<'credito' | 'debito'>('credito');
  const [mpTarjeta, setMpTarjeta] = useState({ numero: '', vencimiento: '', cvv: '', nombre: '' });
  const [mpProcesando, setMpProcesando] = useState(false);
  const [dragOver, setDragOver] = useState(false);
  const [enviando, setEnviando] = useState(false);
  const [enviado, setEnviado] = useState(false);
  const [showExitWarning, setShowExitWarning] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const [segundosTimer, setSegundosTimer] = useState(30 * 60);
  const timerRef = useRef<ReturnType<typeof setInterval> | null>(null);

  const [datosCliente, setDatosCliente] = useState<DatosCliente>(DATOS_VACIOS);
  const [masDuenio, setMasDuenio] = useState(false);
  const [datosSegundoDuenio, setDatosSegundoDuenio] = useState<DatosCliente>(DATOS_VACIOS);
  const [esEmpresa, setEsEmpresa] = useState(false);
  // Datos empresa (CRM)
  const [tipoEmpresa, setTipoEmpresa] = useState('Persona jurídica');
  const [rutEmpresa, setRutEmpresa] = useState('');
  const [razonSocial, setRazonSocial] = useState('');
  const [emailEmpresa, setEmailEmpresa] = useState('');
  const [telefonoEmpresa, setTelefonoEmpresa] = useState('');
  const [regionEmpresa, setRegionEmpresa] = useState('');
  const [comunaEmpresa, setComunaEmpresa] = useState('');
  const [direccionEmpresa, setDireccionEmpresa] = useState('');
  // Representante legal (CRM)
  const PERSONA_EMPRESA_VACIA = { rut: '', nombres: '', apellidoPaterno: '', apellidoMaterno: '', sexo: '', estadoCivil: '', nacionalidad: 'Chilena', profesion: '', telefono: '', email: '' };
  const [repLegal, setRepLegal] = useState({ ...PERSONA_EMPRESA_VACIA });
  // Encargado de compra (CRM)
  const [encargado, setEncargado] = useState({ ...PERSONA_EMPRESA_VACIA });
  // Documentos (CRM)
  const [docCedulaFrente, setDocCedulaFrente] = useState<string | null>(null);
  const [docCedulaDorso, setDocCedulaDorso] = useState<string | null>(null);
  const [docEscritura, setDocEscritura] = useState<string | null>(null);
  const [docCertificado, setDocCertificado] = useState<string | null>(null);

  useEffect(() => {
    if (!isOpen) return;
    setPaso(1);
    setMetodoPago('transferencia');
    setAceptoTyC(false);
    setTodoCopiado(false);
    setLinkCopiado(false);
    setArchivo(null);
    setDragOver(false);
    setEnviando(false);
    setEnviado(false);
    setShowExitWarning(false);
    setSegundosTimer(30 * 60);
    setDatosCliente(DATOS_VACIOS);
    setMasDuenio(false);
    setDatosSegundoDuenio(DATOS_VACIOS);
    setEsEmpresa(false);
    setTipoEmpresa('Persona jurídica'); setRutEmpresa(''); setRazonSocial('');
    setEmailEmpresa(''); setTelefonoEmpresa(''); setRegionEmpresa('');
    setComunaEmpresa(''); setDireccionEmpresa('');
    setRepLegal({ ...PERSONA_EMPRESA_VACIA }); setEncargado({ ...PERSONA_EMPRESA_VACIA });
    setDocCedulaFrente(null); setDocCedulaDorso(null); setDocEscritura(null); setDocCertificado(null);
    if (timerRef.current) clearInterval(timerRef.current);
  }, [isOpen]);

  useEffect(() => {
    if (paso === 2 && isOpen && !timerRef.current) {
      timerRef.current = setInterval(() => {
        setSegundosTimer(prev => {
          if (prev <= 1) { clearInterval(timerRef.current!); timerRef.current = null; return 0; }
          return prev - 1;
        });
      }, 1000);
    }
    return () => {};
  }, [paso, isOpen]);

  useEffect(() => {
    return () => { if (timerRef.current) clearInterval(timerRef.current); };
  }, []);

  useEffect(() => {
    if (segundosTimer === 0 && (paso === 2 || paso === 3 || paso === 'mp-checkout')) {
      setPaso('expirado');
      onEstadoChange?.('disponible');
    }
  }, [segundosTimer, paso]);

  if (!isOpen) return null;

  const formValido = datosCliente.nombreCompleto.trim() && datosCliente.email.trim() && datosCliente.celular.trim();

  const handleCopiarTodo = () => {
    const texto = DATOS_BANCARIOS.map(d => `${d.label}: ${d.value}`).join('\n');
    navigator.clipboard.writeText(texto).catch(() => {});
    setTodoCopiado(true);
    setTimeout(() => setTodoCopiado(false), 2000);
  };

  const handleMpPagar = async () => {
    setMpProcesando(true);
    await new Promise(r => setTimeout(r, 2000));
    setMpProcesando(false);
    setPaso('mp-success');
    onEstadoChange?.('pago-en-validacion');
    if (timerRef.current) { clearInterval(timerRef.current); timerRef.current = null; }
  };

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

  const handleEnviar = async () => {
    if (!archivo) return;
    setEnviando(true);
    await new Promise(r => setTimeout(r, 1500));
    setEnviando(false);
    setEnviado(true);
    onEstadoChange?.('pago-en-validacion');
    if (timerRef.current) { clearInterval(timerRef.current); timerRef.current = null; }
  };

  const montoPago = tipoCompra === 'comprar' ? precio : '$500.000';
  const montoPagoLabel = tipoCompra === 'comprar' ? precio : '$500.000 (UF 12,9)';
  const mpFormValido = mpTarjeta.numero.trim() && mpTarjeta.vencimiento.trim() && mpTarjeta.cvv.trim() && mpTarjeta.nombre.trim();
  const pasoLabels = ['Tus datos', 'Método de pago', metodoPago === 'transferencia' ? 'Comprobante' : 'Pago online'];

  const handleIntentoCerrar = () => {
    if (enviado || paso === 'mp-success') { onClose(); return; }
    setShowExitWarning(true);
  };

  return (
    <>
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4"
      style={{ backgroundColor: 'rgba(0,0,0,0.5)' }}
      onClick={e => { if (e.target === e.currentTarget) handleIntentoCerrar(); }}>

      {/* Modal */}
      <div className="bg-white rounded-2xl shadow-2xl w-full max-w-2xl relative flex flex-col" style={{ maxHeight: '90vh' }}>

        {/* Header */}
        {!enviado && paso !== 'expirado' && paso !== 'error' && paso !== 'mp-success' && (
          <div className="px-6 py-5 border-b bg-white z-10" style={{ borderColor: '#E5E5E5', flexShrink: 0 }}>
            <div className="flex items-start justify-between mb-4">
              <div>
                <h2 style={{ fontFamily: 'var(--font-heading)', fontWeight: 600, fontSize: 'var(--font-size-h3)', color: '#0A0A0A', marginBottom: '0.25rem' }}>
                  {tipoCompra === 'comprar' ? 'Comprar parcela' : 'Reservar parcela'}
                </h2>
                <p style={{ fontFamily: 'var(--font-body)', fontSize: 'var(--font-size-body-sm)', color: '#737373' }}>
                  {parcelaNombre} · {precio}
                </p>
              </div>
              <button onClick={handleIntentoCerrar} className="p-1 rounded-lg hover:bg-gray-100 transition-colors">
                <X className="w-5 h-5" style={{ color: '#525252' }} />
              </button>
            </div>

            {/* Stepper */}
            {paso !== 'aviso' && paso !== 'expirado' && paso !== 'error' && (
              <div className="flex items-center gap-2">
                {pasoLabels.map((label, i) => {
                  const num = (i + 1) as 1 | 2 | 3;
                  const pasoNum = typeof paso === 'number' ? paso : (paso === 'mp-checkout' ? 3 : 1);
                  return (
                    <React.Fragment key={num}>
                      {i > 0 && <div className="flex-1 h-px" style={{ backgroundColor: pasoNum > i ? '#0A0A0A' : '#E5E5E5' }} />}
                      <div className="flex items-center gap-2">
                        <div className="w-7 h-7 rounded-full flex items-center justify-center text-xs font-semibold flex-shrink-0"
                          style={{ backgroundColor: pasoNum >= num ? '#0A0A0A' : '#E5E5E5', color: pasoNum >= num ? '#FFFFFF' : '#9CA3AF' }}>
                          {pasoNum > num ? <Check className="w-3.5 h-3.5" /> : num}
                        </div>
                        <span style={{ fontFamily: 'var(--font-body)', fontSize: '12px', color: pasoNum === num ? '#0A0A0A' : '#9CA3AF', fontWeight: pasoNum === num ? 600 : 400, whiteSpace: 'nowrap' }}>
                          {label}
                        </span>
                      </div>
                    </React.Fragment>
                  );
                })}
              </div>
            )}

            {/* Timer — visible y fijo en el header durante los pasos 2 y 3 */}
            {(paso === 2 || paso === 3 || paso === 'mp-checkout') && (
              <div className="mt-4">
                <CountdownTimer segundos={segundosTimer} />
              </div>
            )}
          </div>
        )}

        {/* Contenido scrollable */}
        <div className="px-6 py-6" style={{ overflowY: 'auto', flex: 1 }}>

          {/* ── PASO 1: Datos del cliente ── */}
          {paso === 1 && !enviado && (
            <div className="space-y-5">
              <div>
                <h3 style={{ fontFamily: 'var(--font-body)', fontWeight: 600, fontSize: 'var(--font-size-body-lg)', color: '#0A0A0A' }}>
                  Datos del Cliente{' '}
                  <span style={{ fontWeight: 400, color: '#6B7280', fontSize: 'var(--font-size-body-sm)' }}>P. Natural o Rep. Legal</span>
                </h3>
              </div>

              <ClienteForm datos={datosCliente} onChange={setDatosCliente} />

              <div className="space-y-4 pt-2 border-t" style={{ borderColor: '#F3F4F6' }}>
                <div className="flex items-center justify-between">
                  <span style={{ fontFamily: 'var(--font-body)', fontSize: 'var(--font-size-body-sm)', fontWeight: 500, color: '#0A0A0A' }}>
                    ¿Más de un dueño?
                  </span>
                  <Toggle value={masDuenio} onChange={setMasDuenio} />
                </div>

                {masDuenio && (
                  <ClienteForm datos={datosSegundoDuenio} onChange={setDatosSegundoDuenio} titulo="Segundo dueño" />
                )}

                <div className="flex items-center justify-between">
                  <span style={{ fontFamily: 'var(--font-body)', fontSize: 'var(--font-size-body-sm)', fontWeight: 500, color: '#0A0A0A' }}>
                    ¿Compra como empresa?
                  </span>
                  <Toggle value={esEmpresa} onChange={setEsEmpresa} />
                </div>

                {esEmpresa && (
                  <div className="space-y-5">

                    {/* ── Datos de la empresa ── */}
                    <div className="space-y-4 pt-1">
                      <p style={{ fontFamily: 'var(--font-body)', fontWeight: 600, fontSize: 'var(--font-size-body-sm)', color: '#374151', paddingBottom: '8px', borderBottom: '1px solid #F3F4F6' }}>
                        Datos de la empresa
                      </p>
                      <div>
                        <label style={labelStyle}>Tipo <span style={{ color: '#DC2626' }}>*</span></label>
                        <div className="relative">
                          <select value={tipoEmpresa} onChange={e => setTipoEmpresa(e.target.value)}
                            className="w-full px-4 py-2.5 rounded-lg border focus:outline-none focus:ring-2 focus:ring-gray-900 appearance-none"
                            style={{ ...inputStyle, cursor: 'pointer' }}>
                            <option>Persona jurídica</option>
                            <option>Persona natural (empresa unipersonal)</option>
                          </select>
                          <ChevronDown className="w-4 h-4 absolute right-4 top-1/2 -translate-y-1/2 pointer-events-none" style={{ color: '#9CA3AF' }} />
                        </div>
                      </div>
                      <div>
                        <label style={labelStyle}>RUT empresa <span style={{ color: '#DC2626' }}>*</span></label>
                        <input type="text" value={rutEmpresa} onChange={e => setRutEmpresa(e.target.value)} placeholder="76.123.456-7"
                          className="w-full px-4 py-2.5 rounded-lg border focus:outline-none focus:ring-2 focus:ring-gray-900" style={inputStyle} />
                      </div>
                      <div>
                        <label style={labelStyle}>Razón social <span style={{ color: '#DC2626' }}>*</span></label>
                        <input type="text" value={razonSocial} onChange={e => setRazonSocial(e.target.value)} placeholder="Inmobiliaria Ejemplo SpA"
                          className="w-full px-4 py-2.5 rounded-lg border focus:outline-none focus:ring-2 focus:ring-gray-900" style={inputStyle} />
                      </div>
                      <div>
                        <label style={labelStyle}>Email empresa <span style={{ color: '#DC2626' }}>*</span></label>
                        <input type="email" value={emailEmpresa} onChange={e => setEmailEmpresa(e.target.value)} placeholder="contacto@empresa.cl"
                          className="w-full px-4 py-2.5 rounded-lg border focus:outline-none focus:ring-2 focus:ring-gray-900" style={inputStyle} />
                      </div>
                      <div>
                        <label style={labelStyle}>Teléfono empresa <span style={{ color: '#DC2626' }}>*</span></label>
                        <input type="tel" value={telefonoEmpresa} onChange={e => setTelefonoEmpresa(e.target.value)} placeholder="+56 2 1234 5678"
                          className="w-full px-4 py-2.5 rounded-lg border focus:outline-none focus:ring-2 focus:ring-gray-900" style={inputStyle} />
                      </div>
                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                        <div>
                          <label style={labelStyle}>Región <span style={{ color: '#DC2626' }}>*</span></label>
                          <div className="relative">
                            <select value={regionEmpresa} onChange={e => setRegionEmpresa(e.target.value)}
                              className="w-full px-4 py-2.5 rounded-lg border focus:outline-none focus:ring-2 focus:ring-gray-900 appearance-none"
                              style={{ ...inputStyle, cursor: 'pointer' }}>
                              <option value="">Selecciona...</option>
                              {['Región Metropolitana','Región de Valparaíso','Región del Biobío','Región de La Araucanía',
                                'Región de Los Lagos','Región de Los Ríos','Región del Maule','Región de Aysén',
                                'Región de Coquimbo','Región de Atacama','Región de Antofagasta','Región de Tarapacá',
                                'Región de Arica y Parinacota','Región de Magallanes','Región de Ñuble',
                                "Región del Libertador General Bernardo O'Higgins"].map(r => (
                                <option key={r}>{r}</option>
                              ))}
                            </select>
                            <ChevronDown className="w-4 h-4 absolute right-4 top-1/2 -translate-y-1/2 pointer-events-none" style={{ color: '#9CA3AF' }} />
                          </div>
                        </div>
                        <div>
                          <label style={labelStyle}>Comuna <span style={{ color: '#DC2626' }}>*</span></label>
                          <input type="text" value={comunaEmpresa} onChange={e => setComunaEmpresa(e.target.value)} placeholder="Ej: Santiago"
                            className="w-full px-4 py-2.5 rounded-lg border focus:outline-none focus:ring-2 focus:ring-gray-900" style={inputStyle} />
                        </div>
                      </div>
                      <div>
                        <label style={labelStyle}>Dirección <span style={{ color: '#DC2626' }}>*</span></label>
                        <input type="text" value={direccionEmpresa} onChange={e => setDireccionEmpresa(e.target.value)} placeholder="Calle, número, dpto"
                          className="w-full px-4 py-2.5 rounded-lg border focus:outline-none focus:ring-2 focus:ring-gray-900" style={inputStyle} />
                      </div>
                    </div>

                    {/* ── Representante legal ── */}
                    <PersonaEmpresaCard titulo="Representante Legal" datos={repLegal} onChange={setRepLegal} inputStyle={inputStyle} labelStyle={labelStyle} />

                    {/* ── Encargado de compra ── */}
                    <PersonaEmpresaCard titulo="Encargado de compra" datos={encargado} onChange={setEncargado} inputStyle={inputStyle} labelStyle={labelStyle} />

                    {/* ── Documentos ── */}
                    <div className="space-y-3">
                      <p style={{ fontFamily: 'var(--font-body)', fontWeight: 600, fontSize: 'var(--font-size-body-sm)', color: '#374151', paddingBottom: '8px', borderBottom: '1px solid #F3F4F6' }}>
                        Documentos
                      </p>
                      <p style={{ fontFamily: 'var(--font-body)', fontSize: 'var(--font-size-xs)', color: '#6B7280' }}>
                        Selecciona los archivos. Se adjuntarán al enviar el formulario.
                      </p>
                      {[
                        { label: 'Cédula representante legal (frente)', req: true, value: docCedulaFrente, setter: setDocCedulaFrente },
                        { label: 'Cédula representante legal (dorso)', req: false, value: docCedulaDorso, setter: setDocCedulaDorso },
                        { label: 'Escritura pública de constitución', req: true, value: docEscritura, setter: setDocEscritura },
                        { label: 'Certificado de inscripción Reg. de Comercio', req: true, value: docCertificado, setter: setDocCertificado },
                      ].map(doc => (
                        <div key={doc.label} className="flex items-center justify-between p-3 rounded-lg border" style={{ borderColor: doc.value ? '#006B4E' : '#E5E5E5', backgroundColor: doc.value ? '#F0FDF4' : '#FAFAFA' }}>
                          <div>
                            <p style={{ fontFamily: 'var(--font-body)', fontSize: 'var(--font-size-xs)', fontWeight: 500, color: '#0A0A0A' }}>
                              {doc.label} {doc.req && <span style={{ color: '#DC2626' }}>*</span>}
                            </p>
                            <p style={{ fontFamily: 'var(--font-body)', fontSize: '11px', color: '#9CA3AF' }}>PDF o imagen, max 10 MiB</p>
                          </div>
                          {doc.value ? (
                            <div className="flex items-center gap-1.5">
                              <Check className="w-4 h-4" style={{ color: '#006B4E' }} />
                              <button onClick={() => doc.setter(null)} style={{ fontFamily: 'var(--font-body)', fontSize: '11px', color: '#9CA3AF' }}>Quitar</button>
                            </div>
                          ) : (
                            <button onClick={() => doc.setter('archivo_simulado.pdf')}
                              className="px-3 py-1 rounded-full text-xs border transition-colors hover:bg-gray-100"
                              style={{ fontFamily: 'var(--font-body)', fontWeight: 500, color: '#374151', borderColor: '#D1D5DB' }}>
                              Subir
                            </button>
                          )}
                        </div>
                      ))}
                    </div>

                  </div>
                )}
              </div>
            </div>
          )}

          {/* ── PASO 2: Método de pago + TyC ── */}
          {paso === 2 && !enviado && (
            <div className="space-y-5">
              {/* Monto de reserva */}
              <div className="rounded-xl p-4 text-center" style={{ backgroundColor: '#EBFEF5', border: '2px solid #006B4E' }}>
                <p style={{ fontFamily: 'var(--font-body)', fontSize: 'var(--font-size-xs)', color: '#047857', marginBottom: '8px', textTransform: 'uppercase', letterSpacing: '0.05em', fontWeight: 600 }}>
                  Monto de reserva
                </p>
                <p style={{ fontFamily: 'var(--font-heading)', fontSize: 'var(--font-size-h2)', fontWeight: 600, color: '#065F46' }}>
                  $500.000
                </p>
                <p style={{ fontFamily: 'var(--font-body)', fontSize: 'var(--font-size-xs)', color: '#047857', marginTop: '4px' }}>
                  UF 12,9
                </p>
              </div>

              <div>
                <p style={{ fontFamily: 'var(--font-body)', fontSize: 'var(--font-size-body-sm)', fontWeight: 500, color: '#525252', marginBottom: '10px' }}>
                  Selecciona cómo quieres pagar
                </p>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  <button onClick={() => setMetodoPago('transferencia')}
                    className="flex items-center gap-3 p-4 rounded-xl border-2 transition-all text-left"
                    style={{ borderColor: metodoPago === 'transferencia' ? '#0A0A0A' : '#E5E5E5', backgroundColor: metodoPago === 'transferencia' ? '#FAFAFA' : '#FFFFFF' }}>
                    <div className="w-9 h-9 rounded-full flex items-center justify-center flex-shrink-0"
                      style={{ backgroundColor: metodoPago === 'transferencia' ? '#0A0A0A' : '#F5F5F5' }}>
                      <Building2 className="w-4 h-4" style={{ color: metodoPago === 'transferencia' ? '#FFFFFF' : '#737373' }} />
                    </div>
                    <div>
                      <p style={{ fontFamily: 'var(--font-body)', fontSize: 'var(--font-size-body-sm)', fontWeight: 600, color: '#0A0A0A' }}>Transferencia bancaria</p>
                      <p style={{ fontFamily: 'var(--font-body)', fontSize: 'var(--font-size-xs)', color: '#737373' }}>Paga desde tu banco</p>
                    </div>
                  </button>

                  <button onClick={() => setMetodoPago('mercadopago')}
                    className="flex items-center gap-3 p-4 rounded-xl border-2 transition-all text-left"
                    style={{ borderColor: metodoPago === 'mercadopago' ? '#009EE3' : '#E5E5E5', backgroundColor: metodoPago === 'mercadopago' ? '#EFF9FF' : '#FFFFFF' }}>
                    <div className="w-9 h-9 rounded-full flex items-center justify-center flex-shrink-0"
                      style={{ backgroundColor: metodoPago === 'mercadopago' ? '#009EE3' : '#F5F5F5' }}>
                      <CreditCard className="w-4 h-4" style={{ color: metodoPago === 'mercadopago' ? '#FFFFFF' : '#737373' }} />
                    </div>
                    <div>
                      <p style={{ fontFamily: 'var(--font-body)', fontSize: 'var(--font-size-body-sm)', fontWeight: 600, color: '#0A0A0A' }}>Mercado Pago</p>
                      <p style={{ fontFamily: 'var(--font-body)', fontSize: 'var(--font-size-xs)', color: '#737373' }}>Tarjeta de crédito o débito</p>
                      <div className="flex items-center gap-1 mt-1">
                        <span style={{ fontFamily: 'var(--font-body)', fontSize: '9px', fontWeight: 700, color: '#009EE3', letterSpacing: '-0.02em' }}>Checkout Pro</span>
                      </div>
                    </div>
                  </button>
                </div>
              </div>

              <div
                className="flex items-start gap-3 p-4 rounded-xl cursor-pointer"
                style={{ backgroundColor: '#F9FAFB', border: `1px solid ${aceptoTyC ? '#0A0A0A' : '#E5E5E5'}` }}
                onClick={() => setAceptoTyC(!aceptoTyC)}
              >
                <div className="w-5 h-5 rounded flex items-center justify-center flex-shrink-0 mt-0.5 transition-all"
                  style={{ backgroundColor: aceptoTyC ? '#0A0A0A' : '#FFFFFF', border: `2px solid ${aceptoTyC ? '#0A0A0A' : '#D1D5DB'}` }}>
                  {aceptoTyC && <Check className="w-3 h-3 text-white" />}
                </div>
                <p style={{ fontFamily: 'var(--font-body)', fontSize: 'var(--font-size-body-sm)', color: '#374151', lineHeight: '1.5' }}>
                  Al hacer clic admito estar de acuerdo con los{' '}
                  <span style={{ color: '#006B4E', fontWeight: 500, textDecoration: 'underline' }}
                    onClick={e => e.stopPropagation()}>
                    términos y condiciones
                  </span>
                  {' '}del servicio.{' '}
                  <span style={{ color: '#DC2626' }}>*</span>
                </p>
              </div>
            </div>
          )}

          {/* ── PASO 3: Datos bancarios / link + comprobante ── */}
          {paso === 3 && !enviado && (
            <div className="space-y-5">
              {metodoPago === 'transferencia' && (
                <>
                  <div>
                    <p style={{ fontFamily: 'var(--font-body)', fontWeight: 600, fontSize: 'var(--font-size-body-base)', color: '#0A0A0A', marginBottom: '12px' }}>
                      Datos de transferencia
                    </p>
                    <div className="rounded-xl overflow-hidden" style={{ border: '1px solid #E5E5E5' }}>
                      {DATOS_BANCARIOS.map((dato, i) => (
                        <div key={dato.label} className="flex items-center px-4 py-3"
                          style={{ borderBottom: i < DATOS_BANCARIOS.length - 1 ? '1px solid #F3F4F6' : 'none', backgroundColor: i % 2 === 0 ? '#FAFAFA' : '#FFFFFF' }}>
                          <div>
                            <p style={{ fontFamily: 'var(--font-body)', fontSize: 'var(--font-size-xs)', color: '#9CA3AF', marginBottom: '1px' }}>{dato.label}</p>
                            <p style={{ fontFamily: 'var(--font-body)', fontSize: 'var(--font-size-body-sm)', fontWeight: 500, color: '#111827' }}>{dato.value}</p>
                          </div>
                        </div>
                      ))}
                    </div>
                    <button onClick={handleCopiarTodo}
                      className="mt-3 w-full flex items-center justify-center gap-2 py-2.5 rounded-lg text-sm font-medium transition-all"
                      style={{ backgroundColor: todoCopiado ? '#D1FAE5' : '#F5F5F5', color: todoCopiado ? '#065F46' : '#374151', fontFamily: 'var(--font-body)', border: '1px solid #E5E5E5' }}>
                      {todoCopiado
                        ? <><CheckCircle className="w-4 h-4" /> Datos copiados</>
                        : <><Copy className="w-4 h-4" /> Copiar todos los datos</>}
                    </button>
                  </div>

                  <div className="rounded-xl p-3 flex items-start gap-2" style={{ backgroundColor: '#FEF3C7', border: '1px solid #FDE68A' }}>
                    <AlertCircle className="w-4 h-4 mt-0.5 flex-shrink-0" style={{ color: '#D97706' }} />
                    <p style={{ fontFamily: 'var(--font-body)', fontSize: 'var(--font-size-xs)', color: '#92400E', lineHeight: '1.5' }}>
                      Transfiere el monto exacto e incluye el número de parcela como referencia.
                    </p>
                  </div>
                </>
              )}


              <div>
                <p style={{ fontFamily: 'var(--font-body)', fontWeight: 600, fontSize: 'var(--font-size-body-base)', color: '#0A0A0A', marginBottom: '4px' }}>
                  Comprobante de pago <span style={{ color: '#DC2626' }}>*</span>
                </p>
                <p style={{ fontFamily: 'var(--font-body)', fontSize: 'var(--font-size-body-sm)', color: '#6B7280', marginBottom: '12px' }}>
                  Favor subir aquí el comprobante de pago.
                </p>
                <input ref={fileInputRef} type="file" accept="image/*,.pdf" className="hidden"
                  onChange={e => { if (e.target.files?.[0]) handleArchivo(e.target.files[0]); }} />
                {archivo ? (
                  <div className="flex items-center justify-between px-4 py-3 rounded-xl" style={{ backgroundColor: '#EBFEF5', border: '1px solid #A7F3D0' }}>
                    <div className="flex items-center gap-2">
                      <FileText className="w-4 h-4" style={{ color: '#059669' }} />
                      <span style={{ fontFamily: 'var(--font-body)', fontSize: 'var(--font-size-body-sm)', color: '#065F46', fontWeight: 500 }}>{archivo}</span>
                    </div>
                    <button onClick={() => setArchivo(null)} style={{ color: '#6B7280', fontFamily: 'var(--font-body)', fontSize: '12px' }}>Cambiar</button>
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
            </div>
          )}

          {/* ── MERCADO PAGO CHECKOUT PRO ── */}
          {paso === 'mp-checkout' && (
            <div className="space-y-5">
              {/* MP branding header */}
              <div className="rounded-xl px-4 py-3 flex items-center justify-between" style={{ backgroundColor: '#009EE3' }}>
                <div className="flex items-center gap-2">
                  <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
                    <circle cx="12" cy="12" r="12" fill="white" fillOpacity="0.2" />
                    <path d="M6 12.5C6 9.46 8.46 7 11.5 7S17 9.46 17 12.5 14.54 18 11.5 18" stroke="white" strokeWidth="1.5" strokeLinecap="round"/>
                    <path d="M14 10l3 2.5-3 2.5" stroke="white" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                  </svg>
                  <span style={{ fontFamily: 'var(--font-body)', fontSize: '15px', fontWeight: 700, color: '#FFFFFF', letterSpacing: '-0.02em' }}>mercado pago</span>
                </div>
                <div className="flex items-center gap-1.5">
                  <Lock className="w-3.5 h-3.5" style={{ color: 'rgba(255,255,255,0.85)' }} />
                  <span style={{ fontFamily: 'var(--font-body)', fontSize: '11px', color: 'rgba(255,255,255,0.85)' }}>Pago seguro</span>
                </div>
              </div>

              {/* Order summary */}
              <div className="rounded-xl p-4" style={{ backgroundColor: '#F0F9FF', border: '1px solid #BAE6FD' }}>
                <p style={{ fontFamily: 'var(--font-body)', fontSize: 'var(--font-size-xs)', fontWeight: 600, color: '#0369A1', textTransform: 'uppercase', letterSpacing: '0.05em', marginBottom: '6px' }}>
                  Resumen del pago
                </p>
                <p style={{ fontFamily: 'var(--font-body)', fontSize: 'var(--font-size-body-sm)', fontWeight: 500, color: '#1E40AF', marginBottom: '4px' }}>
                  {tipoCompra === 'reservar' ? 'Reserva — ' : 'Compra — '}{parcelaNombre}
                </p>
                <p style={{ fontFamily: 'var(--font-heading)', fontSize: 'var(--font-size-h2)', fontWeight: 700, color: '#009EE3' }}>
                  {montoPago}
                </p>
                {tipoCompra === 'reservar' && (
                  <p style={{ fontFamily: 'var(--font-body)', fontSize: 'var(--font-size-xs)', color: '#6B7280', marginTop: '2px' }}>UF 12,9</p>
                )}
              </div>

              {/* Payment method selector */}
              <div>
                <p style={{ fontFamily: 'var(--font-body)', fontSize: 'var(--font-size-body-sm)', fontWeight: 600, color: '#111827', marginBottom: '10px' }}>
                  ¿Cómo querés pagar?
                </p>
                <div className="grid grid-cols-2 gap-2">
                  {([
                    { id: 'credito', label: 'Tarjeta de crédito' },
                    { id: 'debito', label: 'Tarjeta de débito' },
                  ] as const).map(m => (
                    <button key={m.id} onClick={() => setMpMetodo(m.id)}
                      className="flex items-center gap-2 p-3 rounded-xl border-2 transition-all text-left"
                      style={{ borderColor: mpMetodo === m.id ? '#009EE3' : '#E5E5E5', backgroundColor: mpMetodo === m.id ? '#EFF9FF' : '#FFFFFF' }}>
                      <CreditCard className="w-4 h-4 flex-shrink-0" style={{ color: mpMetodo === m.id ? '#009EE3' : '#9CA3AF' }} />
                      <span style={{ fontFamily: 'var(--font-body)', fontSize: 'var(--font-size-xs)', fontWeight: mpMetodo === m.id ? 600 : 400, color: '#374151' }}>{m.label}</span>
                    </button>
                  ))}
                </div>
              </div>

              {/* Card form */}
              <div className="space-y-3">
                <div>
                  <label style={{ ...labelStyle, fontSize: 'var(--font-size-xs)' }}>Número de tarjeta <span style={{ color: '#DC2626' }}>*</span></label>
                  <input
                    type="text" maxLength={19} value={mpTarjeta.numero} placeholder="0000 0000 0000 0000"
                    onChange={e => {
                      const raw = e.target.value.replace(/\D/g, '').slice(0, 16);
                      const formatted = raw.replace(/(.{4})/g, '$1 ').trim();
                      setMpTarjeta(t => ({ ...t, numero: formatted }));
                    }}
                    className="w-full px-4 py-2.5 rounded-lg border transition-colors focus:outline-none focus:ring-2"
                    style={{ ...inputStyle, '--tw-ring-color': '#009EE3' } as React.CSSProperties}
                  />
                </div>
                <div className="grid grid-cols-2 gap-3">
                  <div>
                    <label style={{ ...labelStyle, fontSize: 'var(--font-size-xs)' }}>Vencimiento <span style={{ color: '#DC2626' }}>*</span></label>
                    <input
                      type="text" maxLength={5} value={mpTarjeta.vencimiento} placeholder="MM/AA"
                      onChange={e => {
                        const raw = e.target.value.replace(/\D/g, '').slice(0, 4);
                        const formatted = raw.length > 2 ? raw.slice(0, 2) + '/' + raw.slice(2) : raw;
                        setMpTarjeta(t => ({ ...t, vencimiento: formatted }));
                      }}
                      className="w-full px-4 py-2.5 rounded-lg border transition-colors focus:outline-none focus:ring-2"
                      style={inputStyle}
                    />
                  </div>
                  <div>
                    <label style={{ ...labelStyle, fontSize: 'var(--font-size-xs)' }}>CVV <span style={{ color: '#DC2626' }}>*</span></label>
                    <input
                      type="text" maxLength={4} value={mpTarjeta.cvv} placeholder="123"
                      onChange={e => setMpTarjeta(t => ({ ...t, cvv: e.target.value.replace(/\D/g, '').slice(0, 4) }))}
                      className="w-full px-4 py-2.5 rounded-lg border transition-colors focus:outline-none focus:ring-2"
                      style={inputStyle}
                    />
                  </div>
                </div>
                <div>
                  <label style={{ ...labelStyle, fontSize: 'var(--font-size-xs)' }}>Nombre en la tarjeta <span style={{ color: '#DC2626' }}>*</span></label>
                  <input
                    type="text" value={mpTarjeta.nombre} placeholder="NOMBRE APELLIDO"
                    onChange={e => setMpTarjeta(t => ({ ...t, nombre: e.target.value.toUpperCase() }))}
                    className="w-full px-4 py-2.5 rounded-lg border transition-colors focus:outline-none focus:ring-2"
                    style={inputStyle}
                  />
                </div>
              </div>

              {/* Pay button */}
              <div className="space-y-3 pt-1">
                <button onClick={handleMpPagar} disabled={mpProcesando || !mpFormValido}
                  className="w-full py-3 rounded-full font-semibold transition-all disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
                  style={{ backgroundColor: '#009EE3', color: '#FFFFFF', fontFamily: 'var(--font-body)', fontSize: 'var(--font-size-body-base)' }}
                  onMouseEnter={e => { if (!mpProcesando && mpFormValido) e.currentTarget.style.backgroundColor = '#0082C2'; }}
                  onMouseLeave={e => { if (!mpProcesando && mpFormValido) e.currentTarget.style.backgroundColor = '#009EE3'; }}>
                  {mpProcesando
                    ? <><div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" /> Procesando...</>
                    : `Pagar ${montoPago}`}
                </button>
                <div className="flex items-center justify-center gap-1.5">
                  <Lock className="w-3 h-3" style={{ color: '#9CA3AF' }} />
                  <span style={{ fontFamily: 'var(--font-body)', fontSize: '11px', color: '#9CA3AF' }}>Operación segura procesada por Mercado Pago</span>
                </div>
                <button onClick={() => setPaso(2)}
                  className="w-full py-2 text-sm transition-colors"
                  style={{ fontFamily: 'var(--font-body)', color: '#9CA3AF' }}
                  onMouseEnter={e => e.currentTarget.style.color = '#374151'}
                  onMouseLeave={e => e.currentTarget.style.color = '#9CA3AF'}>
                  ← Cambiar método de pago
                </button>
              </div>
            </div>
          )}

          {/* ── MP PAGO CONFIRMADO ── */}
          {paso === 'mp-success' && (
            <div className="py-4 text-center space-y-6">
              <div className="w-20 h-20 rounded-full flex items-center justify-center mx-auto" style={{ backgroundColor: '#EFF9FF', border: '4px solid #BAE6FD' }}>
                <CheckCircle className="w-9 h-9" style={{ color: '#009EE3' }} />
              </div>
              <div>
                <h2 style={{ fontFamily: 'var(--font-heading)', fontWeight: 600, fontSize: 'var(--font-size-h3)', color: '#0A0A0A' }}>
                  ¡Pago confirmado!
                </h2>
                <p style={{ fontFamily: 'var(--font-body)', fontSize: 'var(--font-size-body-sm)', color: '#6B7280', marginTop: '6px', lineHeight: '1.5' }}>
                  Tu pago fue procesado exitosamente por Mercado Pago.
                </p>
              </div>

              <div className="rounded-xl overflow-hidden text-left" style={{ border: '1px solid #E5E5E5' }}>
                <div className="px-4 py-3" style={{ backgroundColor: '#F9FAFB', borderBottom: '1px solid #E5E5E5' }}>
                  <p style={{ fontFamily: 'var(--font-body)', fontSize: 'var(--font-size-xs)', fontWeight: 600, color: '#374151', textTransform: 'uppercase', letterSpacing: '0.05em' }}>
                    Resumen de la operación
                  </p>
                </div>
                {[
                  { label: 'Tipo', value: tipoCompra === 'reservar' ? 'Reserva de parcela' : 'Compra de parcela' },
                  { label: 'Parcela', value: parcelaNombre },
                  { label: 'Monto pagado', value: montoPagoLabel },
                  { label: 'Método', value: 'Mercado Pago' },
                  { label: 'Fecha', value: new Date().toLocaleDateString('es-CL', { day: '2-digit', month: 'long', year: 'numeric' }) },
                ].map((item, i, arr) => (
                  <div key={item.label} className="flex items-center justify-between px-4 py-3"
                    style={{ borderBottom: i < arr.length - 1 ? '1px solid #F3F4F6' : 'none', backgroundColor: i % 2 === 0 ? '#FFFFFF' : '#FAFAFA' }}>
                    <span style={{ fontFamily: 'var(--font-body)', fontSize: 'var(--font-size-xs)', color: '#9CA3AF' }}>{item.label}</span>
                    <span style={{ fontFamily: 'var(--font-body)', fontSize: 'var(--font-size-body-sm)', fontWeight: 500, color: '#111827' }}>{item.value}</span>
                  </div>
                ))}
              </div>

              <div className="rounded-xl p-4 flex items-start gap-3" style={{ backgroundColor: '#EFF6FF', border: '1px solid #BFDBFE' }}>
                <div className="w-8 h-8 rounded-full flex items-center justify-center flex-shrink-0" style={{ backgroundColor: '#DBEAFE' }}>
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#2563EB" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <rect width="20" height="16" x="2" y="4" rx="2" /><path d="m22 7-8.97 5.7a1.94 1.94 0 0 1-2.06 0L2 7" />
                  </svg>
                </div>
                <div className="text-left">
                  <p style={{ fontFamily: 'var(--font-body)', fontSize: 'var(--font-size-body-sm)', fontWeight: 600, color: '#1E40AF', marginBottom: '2px' }}>Revisa tu casilla de email</p>
                  <p style={{ fontFamily: 'var(--font-body)', fontSize: 'var(--font-size-xs)', color: '#3B82F6', lineHeight: '1.5' }}>
                    Recibirás la confirmación de tu operación. Una vez procesada, la parcela pasará a estado {tipoCompra === 'reservar' ? '"Reservada"' : '"Vendida"'}.
                  </p>
                </div>
              </div>

              <button onClick={onClose} className="w-full py-3 rounded-full text-sm font-semibold transition-all"
                style={{ backgroundColor: '#009EE3', color: '#FFFFFF', fontFamily: 'var(--font-body)' }}
                onMouseEnter={e => e.currentTarget.style.backgroundColor = '#0082C2'}
                onMouseLeave={e => e.currentTarget.style.backgroundColor = '#009EE3'}>
                Entendido
              </button>
            </div>
          )}

          {/* ── ENVIADO ── */}
          {enviado && (
            <div className="py-4 text-center space-y-6">
              <div className="w-20 h-20 rounded-full flex items-center justify-center mx-auto" style={{ backgroundColor: '#FEF3C7' }}>
                <Clock className="w-9 h-9" style={{ color: '#D97706' }} />
              </div>
              <div>
                <h2 style={{ fontFamily: 'var(--font-heading)', fontWeight: 500, fontSize: 'var(--font-size-h3)', color: '#0A0A0A' }}>
                  ¡Comprobante recibido!
                </h2>
              </div>

              {/* Resumen de la operación */}
              <div className="rounded-xl overflow-hidden text-left" style={{ border: '1px solid #E5E5E5' }}>
                <div className="px-4 py-3" style={{ backgroundColor: '#F9FAFB', borderBottom: '1px solid #E5E5E5' }}>
                  <p style={{ fontFamily: 'var(--font-body)', fontSize: 'var(--font-size-xs)', fontWeight: 600, color: '#374151', textTransform: 'uppercase', letterSpacing: '0.05em' }}>
                    Resumen de la operación
                  </p>
                </div>
                {[
                  { label: 'Tipo', value: tipoCompra === 'reservar' ? 'Reserva de parcela' : 'Compra de parcela' },
                  { label: 'Parcela', value: parcelaNombre },
                  { label: 'Monto pagado', value: montoPagoLabel },
                  { label: 'Método', value: 'Transferencia bancaria' },
                  { label: 'Fecha', value: new Date().toLocaleDateString('es-CL', { day: '2-digit', month: 'long', year: 'numeric' }) },
                ].map((item, i, arr) => (
                  <div key={item.label} className="flex items-center justify-between px-4 py-3"
                    style={{ borderBottom: i < arr.length - 1 ? '1px solid #F3F4F6' : 'none', backgroundColor: i % 2 === 0 ? '#FFFFFF' : '#FAFAFA' }}>
                    <span style={{ fontFamily: 'var(--font-body)', fontSize: 'var(--font-size-xs)', color: '#9CA3AF' }}>{item.label}</span>
                    <span style={{ fontFamily: 'var(--font-body)', fontSize: 'var(--font-size-body-sm)', fontWeight: 500, color: '#111827' }}>{item.value}</span>
                  </div>
                ))}
              </div>

              <div className="rounded-xl p-4 flex items-start gap-3" style={{ backgroundColor: '#EFF6FF', border: '1px solid #BFDBFE' }}>
                <div className="w-8 h-8 rounded-full flex items-center justify-center flex-shrink-0" style={{ backgroundColor: '#DBEAFE' }}>
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#2563EB" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <rect width="20" height="16" x="2" y="4" rx="2" /><path d="m22 7-8.97 5.7a1.94 1.94 0 0 1-2.06 0L2 7" />
                  </svg>
                </div>
                <div className="text-left">
                  <p style={{ fontFamily: 'var(--font-body)', fontSize: 'var(--font-size-body-sm)', fontWeight: 600, color: '#1E40AF', marginBottom: '2px' }}>Revisa tu casilla de email</p>
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
              <button onClick={onClose} className="w-full py-3 rounded-full text-sm font-semibold transition-all"
                style={{ backgroundColor: '#006B4E', color: '#FFFFFF', fontFamily: 'var(--font-body)' }}
                onMouseEnter={e => e.currentTarget.style.backgroundColor = '#01533E'}
                onMouseLeave={e => e.currentTarget.style.backgroundColor = '#006B4E'}>
                Entendido
              </button>
            </div>
          )}
          {/* ── EXPIRADO ── */}
          {paso === 'expirado' && (
            <div className="py-6 text-center space-y-5">
              <div className="w-20 h-20 rounded-full flex items-center justify-center mx-auto" style={{ backgroundColor: '#FEF2F2', border: '4px solid #FECACA' }}>
                <Clock className="w-9 h-9" style={{ color: '#DC2626' }} />
              </div>
              <div className="space-y-2">
                <h2 style={{ fontFamily: 'var(--font-heading)', fontWeight: 600, fontSize: 'var(--font-size-h3)', color: '#0A0A0A' }}>
                  Tu reserva expiró
                </h2>
                <p style={{ fontFamily: 'var(--font-body)', fontSize: 'var(--font-size-body-sm)', color: '#6B7280', lineHeight: '1.6', maxWidth: '320px', margin: '0 auto' }}>
                  El tiempo disponible para completar el pago se agotó. La parcela volvió a estar disponible para otros compradores.
                </p>
              </div>
              <div className="rounded-xl p-4 flex items-start gap-3 text-left" style={{ backgroundColor: '#FEF2F2', border: '1px solid #FECACA' }}>
                <AlertCircle className="w-4 h-4 mt-0.5 flex-shrink-0" style={{ color: '#DC2626' }} />
                <p style={{ fontFamily: 'var(--font-body)', fontSize: 'var(--font-size-xs)', color: '#B91C1C', lineHeight: '1.5' }}>
                  Si deseas adquirir esta parcela, puedes reiniciar el proceso desde el principio.
                </p>
              </div>
              <div className="space-y-2">
                <button
                  onClick={() => {
                    if (timerRef.current) { clearInterval(timerRef.current); timerRef.current = null; }
                    setSegundosTimer(30 * 60);
                    setArchivo(null);
                    setPaso(1);
                  }}
                  className="w-full py-3 rounded-full font-semibold transition-all"
                  style={{ backgroundColor: '#006B4E', color: '#FFFFFF', fontFamily: 'var(--font-body)', fontSize: 'var(--font-size-body-sm)' }}
                  onMouseEnter={e => e.currentTarget.style.backgroundColor = '#01533E'}
                  onMouseLeave={e => e.currentTarget.style.backgroundColor = '#006B4E'}>
                  Intentar de nuevo
                </button>
                <button
                  onClick={onClose}
                  className="w-full py-2 transition-colors text-sm"
                  style={{ fontFamily: 'var(--font-body)', color: '#9CA3AF' }}
                  onMouseEnter={e => e.currentTarget.style.color = '#374151'}
                  onMouseLeave={e => e.currentTarget.style.color = '#9CA3AF'}>
                  Cerrar
                </button>
              </div>
            </div>
          )}

          {/* ── ERROR DE PAGO ── */}
          {paso === 'error' && (
            <div className="py-6 text-center space-y-5">
              <div className="w-20 h-20 rounded-full flex items-center justify-center mx-auto" style={{ backgroundColor: '#FEF2F2', border: '4px solid #FECACA' }}>
                <AlertCircle className="w-9 h-9" style={{ color: '#DC2626' }} />
              </div>
              <div className="space-y-2">
                <h2 style={{ fontFamily: 'var(--font-heading)', fontWeight: 600, fontSize: 'var(--font-size-h3)', color: '#0A0A0A' }}>
                  Error en el pago
                </h2>
                <p style={{ fontFamily: 'var(--font-body)', fontSize: 'var(--font-size-body-sm)', color: '#6B7280', lineHeight: '1.6', maxWidth: '320px', margin: '0 auto' }}>
                  No pudimos procesar tu pago. Verifica los datos de tu tarjeta o elige otro método de pago e intenta nuevamente.
                </p>
              </div>
              <div className="rounded-xl p-4 space-y-2 text-left" style={{ backgroundColor: '#F9FAFB', border: '1px solid #E5E5E5' }}>
                <p style={{ fontFamily: 'var(--font-body)', fontWeight: 600, fontSize: '12px', color: '#111827' }}>Posibles causas</p>
                {['Fondos insuficientes en la cuenta', 'Datos de tarjeta incorrectos', 'Tarjeta bloqueada o vencida'].map((item, i) => (
                  <div key={i} className="flex items-start gap-2">
                    <div className="w-1.5 h-1.5 rounded-full mt-1.5 flex-shrink-0" style={{ backgroundColor: '#9CA3AF' }} />
                    <p style={{ fontFamily: 'var(--font-body)', fontSize: '12px', color: '#6B7280', lineHeight: '1.5' }}>{item}</p>
                  </div>
                ))}
              </div>
              <div className="space-y-2">
                <button
                  onClick={() => setPaso(metodoPago === 'mercadopago' ? 'mp-checkout' : 3)}
                  className="w-full py-3 rounded-full font-semibold transition-all"
                  style={{ backgroundColor: '#006B4E', color: '#FFFFFF', fontFamily: 'var(--font-body)', fontSize: 'var(--font-size-body-sm)' }}
                  onMouseEnter={e => e.currentTarget.style.backgroundColor = '#01533E'}
                  onMouseLeave={e => e.currentTarget.style.backgroundColor = '#006B4E'}>
                  Intentar de nuevo
                </button>
                <button
                  onClick={() => setPaso(2)}
                  className="w-full py-2 transition-colors text-sm"
                  style={{ fontFamily: 'var(--font-body)', color: '#6B7280' }}
                  onMouseEnter={e => e.currentTarget.style.color = '#374151'}
                  onMouseLeave={e => e.currentTarget.style.color = '#6B7280'}>
                  ← Cambiar método de pago
                </button>
                <a
                  href="https://wa.me/56977714626?text=Hola%2C%20tuve%20un%20problema%20con%20el%20pago%20de%20mi%20reserva%20y%20necesito%20ayuda"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-full py-2 transition-colors text-sm flex items-center justify-center gap-1.5"
                  style={{ fontFamily: 'var(--font-body)', color: '#006B4E', textDecoration: 'none' }}
                  onMouseEnter={e => (e.currentTarget as HTMLElement).style.color = '#01533E'}
                  onMouseLeave={e => (e.currentTarget as HTMLElement).style.color = '#006B4E'}>
                  Contactar soporte
                </a>
              </div>
            </div>
          )}

        </div>

        {/* Footer */}
        {!enviado && paso !== 'aviso' && paso !== 'expirado' && paso !== 'error' && paso !== 'mp-checkout' && paso !== 'mp-success' && (
          <div className="px-6 py-4 border-t flex items-center justify-between gap-3" style={{ borderColor: '#E5E5E5', flexShrink: 0 }}>
            {paso !== 1 ? (
              <button
                onClick={() => {
                  if (paso === 2) setPaso('aviso');
                  else if (paso === 3) setPaso(2);
                }}
                className="flex items-center gap-1.5 px-4 py-2 rounded-lg hover:bg-gray-100 transition-colors"
                style={{ fontFamily: 'var(--font-body)', fontSize: 'var(--font-size-body-sm)', color: '#525252', fontWeight: 500 }}>
                <ChevronLeft className="w-4 h-4" /> Anterior
              </button>
            ) : <div />}

            {paso === 1 && (
              <button onClick={() => setPaso('aviso')} disabled={!formValido}
                className="px-6 py-3 rounded-full transition-all disabled:opacity-50 disabled:cursor-not-allowed"
                style={{ backgroundColor: '#0A0A0A', color: '#FFFFFF', fontFamily: 'var(--font-body)', fontWeight: 600, fontSize: 'var(--font-size-body-base)' }}>
                Siguiente →
              </button>
            )}

            {paso === 2 && (
              <button onClick={() => setPaso(metodoPago === 'mercadopago' ? 'mp-checkout' : 3)} disabled={!aceptoTyC}
                className="px-6 py-3 rounded-full transition-all disabled:opacity-50 disabled:cursor-not-allowed"
                style={{ backgroundColor: '#0A0A0A', color: '#FFFFFF', fontFamily: 'var(--font-body)', fontWeight: 600, fontSize: 'var(--font-size-body-base)' }}>
                Siguiente →
              </button>
            )}

            {paso === 3 && (
              <button onClick={handleEnviar} disabled={!archivo || enviando}
                className="flex-1 py-3 rounded-full transition-all disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
                style={{ backgroundColor: '#006B4E', color: '#FFFFFF', fontFamily: 'var(--font-body)', fontWeight: 600, fontSize: 'var(--font-size-body-base)' }}
                onMouseEnter={e => { if (archivo && !enviando) e.currentTarget.style.backgroundColor = '#01533E'; }}
                onMouseLeave={e => { if (archivo && !enviando) e.currentTarget.style.backgroundColor = '#006B4E'; }}>
                {enviando ? 'Enviando...' : 'Enviar comprobante'}
              </button>
            )}
          </div>
        )}

        {/* ── AVISO OVERLAY — aparece como capa sobre el modal ── */}
        {paso === 'aviso' && !enviado && (
          <div
            className="absolute inset-0 rounded-2xl z-20 flex items-center justify-center p-6"
            style={{ backgroundColor: 'rgba(10, 10, 10, 0.55)' }}
          >
            <div className="bg-white rounded-2xl shadow-2xl p-6 w-full max-w-sm space-y-5 text-center">

              <div className="w-16 h-16 rounded-full flex items-center justify-center mx-auto"
                style={{ backgroundColor: '#FEF3C7', border: '4px solid #FDE68A' }}>
                <Clock className="w-8 h-8" style={{ color: '#D97706' }} />
              </div>

              <div>
                <h3 style={{ fontFamily: 'var(--font-heading)', fontWeight: 700, fontSize: 'var(--font-size-h3)', color: '#0A0A0A', marginBottom: '10px' }}>
                  Antes de continuar
                </h3>
                <p style={{ fontFamily: 'var(--font-body)', fontSize: 'var(--font-size-body-sm)', color: '#374151', lineHeight: '1.7' }}>
                  Al aceptar, la parcela quedará bloqueada para ti y se activará un <strong>temporizador de 30 minutos</strong> por razones de seguridad para completar el pago.
                </p>
                <p style={{ fontFamily: 'var(--font-body)', fontSize: 'var(--font-size-xs)', color: '#6B7280', lineHeight: '1.6', marginTop: '6px' }}>
                  Si el tiempo expira sin recibir el comprobante, la reserva se liberará automáticamente.
                </p>
              </div>

              <div className="rounded-xl p-4 text-left space-y-2.5" style={{ backgroundColor: '#F9FAFB', border: '1px solid #E5E5E5' }}>
                <p style={{ fontFamily: 'var(--font-body)', fontWeight: 600, fontSize: '12px', color: '#111827' }}>
                  Asegúrate de tener listo:
                </p>
                {[
                  'Acceso a tu banco para realizar la transferencia',
                  'El comprobante de pago (imagen o PDF) para subir',
                ].map((item, i) => (
                  <div key={i} className="flex items-start gap-2">
                    <div className="w-4 h-4 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5"
                      style={{ backgroundColor: '#EBFEF5', border: '1px solid #A7F3D0' }}>
                      <Check className="w-2.5 h-2.5" style={{ color: '#059669' }} />
                    </div>
                    <p style={{ fontFamily: 'var(--font-body)', fontSize: '12px', color: '#374151', lineHeight: '1.5' }}>
                      {item}
                    </p>
                  </div>
                ))}
              </div>

              <div className="space-y-2">
                <button
                  onClick={() => { setPaso(2); onEstadoChange?.('reservandose'); }}
                  className="w-full py-3 rounded-full font-semibold transition-all"
                  style={{ backgroundColor: '#006B4E', color: '#FFFFFF', fontFamily: 'var(--font-body)', fontSize: 'var(--font-size-body-sm)' }}
                  onMouseEnter={e => e.currentTarget.style.backgroundColor = '#01533E'}
                  onMouseLeave={e => e.currentTarget.style.backgroundColor = '#006B4E'}>
                  Aceptar y comenzar
                </button>
                <button
                  onClick={() => setPaso(1)}
                  className="w-full py-2 transition-colors text-sm"
                  style={{ fontFamily: 'var(--font-body)', color: '#9CA3AF' }}
                  onMouseEnter={e => e.currentTarget.style.color = '#374151'}
                  onMouseLeave={e => e.currentTarget.style.color = '#9CA3AF'}>
                  ← Volver a mis datos
                </button>
              </div>
            </div>
          </div>
        )}

      </div>
    </div>

    {/* ── WARNING SALIR — overlay fixed encima de todo ── */}
    {showExitWarning && (
      <div
        className="fixed inset-0 z-[60] flex items-center justify-center p-6"
        style={{ backgroundColor: 'rgba(10, 10, 10, 0.65)' }}
      >
        <div className="bg-white rounded-2xl shadow-2xl p-6 w-full max-w-sm space-y-5 text-center">
          <div className="w-14 h-14 rounded-full flex items-center justify-center mx-auto"
            style={{ backgroundColor: '#FEF2F2', border: '4px solid #FECACA' }}>
            <AlertCircle className="w-7 h-7" style={{ color: '#DC2626' }} />
          </div>

          <div>
            <h3 style={{ fontFamily: 'var(--font-heading)', fontWeight: 700, fontSize: 'var(--font-size-h3)', color: '#0A0A0A', marginBottom: '10px' }}>
              ¿Seguro que quieres salir?
            </h3>
            <p style={{ fontFamily: 'var(--font-body)', fontSize: 'var(--font-size-body-sm)', color: '#374151', lineHeight: '1.7' }}>
              Si sales ahora es posible que <strong>pierdas la reserva</strong>. La parcela podría quedar disponible para otro comprador.
            </p>
          </div>

          <div className="space-y-2">
            <button
              onClick={() => setShowExitWarning(false)}
              className="w-full py-3 rounded-full font-semibold transition-all"
              style={{ backgroundColor: '#006B4E', color: '#FFFFFF', fontFamily: 'var(--font-body)', fontSize: 'var(--font-size-body-sm)' }}
              onMouseEnter={e => e.currentTarget.style.backgroundColor = '#01533E'}
              onMouseLeave={e => e.currentTarget.style.backgroundColor = '#006B4E'}>
              Continuar con el proceso
            </button>
            <button
              onClick={() => { setShowExitWarning(false); onClose(); }}
              className="w-full py-2 transition-colors text-sm"
              style={{ fontFamily: 'var(--font-body)', color: '#9CA3AF' }}
              onMouseEnter={e => e.currentTarget.style.color = '#DC2626'}
              onMouseLeave={e => e.currentTarget.style.color = '#9CA3AF'}>
              Salir de todas formas
            </button>
          </div>
        </div>
      </div>
    )}
    </>
  );
}
