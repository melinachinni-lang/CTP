import React, { useState, useRef, useEffect } from 'react';
import {
  Plus, Search, ChevronLeft, ChevronRight, X, Check, MoreVertical,
  Calendar, User, MessageSquare, MapPin, Clock, Mail, Phone, Video,
  Copy, Trash2, Edit3, CheckCircle, AlertTriangle, Info,
  LayoutGrid, List
} from 'lucide-react';

// ─── Types ───────────────────────────────────────────────────────────────────

type CalType = 'visita' | 'video';

interface CalendarItem {
  id: string;
  name: string;
  sub: string;
  tipo: CalType;
  createdDate: string;
  owner: string;
  consultaCount: number;
}

interface Reserva {
  id: string;
  nombre: string;
  parcela: string;
  email: string;
  tel: string;
  fecha: string;
  fechaDate: Date | null;
  hora: string;
  estado: 'confirmada' | 'pendiente';
  notas: string;
  meetLink?: string;
}

interface EventosDia {
  [day: number]: string[];
}

interface EventosPorCal {
  [calSub: string]: EventosDia;
}

interface ReservasPorCal {
  [calSub: string]: Reserva[];
}

// ─── Mock data ────────────────────────────────────────────────────────────────

const INITIAL_CALENDARIOS: CalendarItem[] = [
  { id: 'c1', name: 'El Refugio', sub: 'El Refugio — Visitas', tipo: 'visita', createdDate: '14 mar 2026', owner: 'Juan Pérez', consultaCount: 12 },
  { id: 'c2', name: 'El Refugio', sub: 'El Refugio — Videollamadas', tipo: 'video', createdDate: '14 mar 2026', owner: 'Juan Pérez', consultaCount: 8 },
  { id: 'c3', name: 'Los Álamos', sub: 'Los Álamos — Visitas', tipo: 'visita', createdDate: '19 mar 2026', owner: 'Juan Pérez', consultaCount: 5 },
];

const INITIAL_RESERVAS: ReservasPorCal = {
  'El Refugio — Visitas': [
    { id: 'r1', nombre: 'Ana Torres', parcela: 'Parcela Pirque', email: 'ana.torres@email.com', tel: '+56 9 1234 5678', fecha: 'jueves, 9 de abril de 2026', fechaDate: new Date(2026, 3, 9), hora: '09:00 - 10:00', estado: 'confirmada', notas: 'Cliente interesado en financiamiento' },
    { id: 'r2', nombre: 'Roberto Silva', parcela: 'Parcela Pirque', email: 'roberto.silva@email.com', tel: '+56 9 8765 4321', fecha: 'lunes, 13 de abril de 2026', fechaDate: new Date(2026, 3, 13), hora: '15:00 - 16:00', estado: 'pendiente', notas: 'Primera visita, requiere información sobre servicios' },
    { id: 'r3', nombre: 'María González', parcela: 'Terreno El Refugio', email: 'mgonzalez@email.com', tel: '+56 9 5555 1122', fecha: 'miércoles, 15 de abril de 2026', fechaDate: new Date(2026, 3, 15), hora: '11:00 - 12:00', estado: 'confirmada', notas: '' },
  ],
  'El Refugio — Videollamadas': [
    { id: 'r4', nombre: 'Carlos Méndez', parcela: 'El Refugio', email: 'cmendez@email.com', tel: '+56 9 3344 5566', fecha: 'martes, 14 de abril de 2026', fechaDate: new Date(2026, 3, 14), hora: '10:00 - 10:30', estado: 'confirmada', notas: 'Consulta sobre documentación', meetLink: 'https://meet.google.com/xkq-mvzn-rpc' },
    { id: 'r5', nombre: 'Laura Rojas', parcela: 'El Refugio', email: 'lrojas@email.com', tel: '+56 9 7788 9900', fecha: 'viernes, 17 de abril de 2026', fechaDate: new Date(2026, 3, 17), hora: '16:00 - 16:30', estado: 'pendiente', notas: '', meetLink: 'https://meet.google.com/qwt-jbhs-pxy' },
  ],
  'Los Álamos — Visitas': [
    { id: 'r6', nombre: 'Pedro Aguilar', parcela: 'Los Álamos', email: 'paguilar@email.com', tel: '+56 9 2233 4455', fecha: 'sábado, 11 de abril de 2026', fechaDate: new Date(2026, 3, 11), hora: '10:00 - 11:00', estado: 'confirmada', notas: 'Trae a su familia' },
  ],
};

const INITIAL_EVENTOS: EventosPorCal = {
  'El Refugio — Visitas': { 7: ['Ana Torres', 'M. Rodríguez', 'J. Castro'], 9: ['Ana Torres'], 13: ['Roberto Silva'], 15: ['María González'], 22: ['C. López'] },
  'El Refugio — Videollamadas': { 7: ['P. Núñez'], 10: ['Carlos Méndez'], 14: ['Carlos Méndez'], 17: ['Laura Rojas'], 23: ['A. Muñoz'] },
  'Los Álamos — Visitas': { 11: ['Pedro Aguilar'], 18: ['F. Herrera'], 25: ['R. Díaz'] },
};

// ─── Availability day row ─────────────────────────────────────────────────────

interface DayRow {
  id: string;
  label: string;
  enabled: boolean;
  desde: string;
  hasta: string;
}

const INITIAL_DAYS: DayRow[] = [
  { id: 'lun', label: 'Lunes', enabled: true, desde: '09:00', hasta: '18:00' },
  { id: 'mar', label: 'Martes', enabled: true, desde: '09:00', hasta: '18:00' },
  { id: 'mie', label: 'Miércoles', enabled: true, desde: '09:00', hasta: '18:00' },
  { id: 'jue', label: 'Jueves', enabled: true, desde: '09:00', hasta: '18:00' },
  { id: 'vie', label: 'Viernes', enabled: true, desde: '09:00', hasta: '17:00' },
  { id: 'sab', label: 'Sábado', enabled: false, desde: '09:00', hasta: '13:00' },
  { id: 'dom', label: 'Domingo', enabled: false, desde: '09:00', hasta: '13:00' },
];

interface BlockedDay { id: string; date: string; reason: string; }
const INITIAL_BLOCKED: BlockedDay[] = [
  { id: 'b1', date: '18 de mayo de 2026', reason: 'Feriado nacional' },
  { id: 'b2', date: '21 de mayo de 2026', reason: 'Vacaciones de equipo' },
];

// ─── Small helpers ────────────────────────────────────────────────────────────

function generateId() { return Math.random().toString(36).slice(2, 10); }
function generateMeetLink() {
  const p = () => Math.random().toString(36).substring(2, 6);
  return `https://meet.google.com/${p()}-${p()}-${p()}`;
}

// April 2026: offset (Mon=0) for day 1 = Wednesday = 2
const MONTH_YEAR = 'abril de 2026';
const MONTH_DAYS = 30;
const MONTH_OFFSET = 2; // Wednesday

const DAYS_OF_WEEK = ['LUN', 'MAR', 'MIÉ', 'JUE', 'VIE', 'SÁB', 'DOM'];

// ─── Sub-components ───────────────────────────────────────────────────────────

// Badge
function BadgeVisita() {
  return (
    <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-[11.5px] font-medium bg-[#edf7f1] text-[#1B7A4A]">
      Visitas
    </span>
  );
}
function BadgeVideo() {
  return (
    <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-[11.5px] font-medium bg-[#f0eefa] text-[#5b4b9a]">
      Videollamadas
    </span>
  );
}

// Dot active
function ActiveDot() {
  return (
    <span className="flex items-center gap-1.5 text-[12px] text-[#1B7A4A]">
      <span className="w-1.5 h-1.5 rounded-full bg-[#1B7A4A] inline-block" />
      Activo
    </span>
  );
}

// Toast
function Toast({ message, visible }: { message: string; visible: boolean }) {
  return (
    <div
      className="fixed bottom-7 right-7 z-[300] flex items-center gap-2 bg-[#1a1a1a] text-white px-5 py-3 rounded-[10px] text-[13.5px] pointer-events-none transition-all duration-300"
      style={{ transform: visible ? 'translateY(0)' : 'translateY(80px)', opacity: visible ? 1 : 0 }}
    >
      <Check size={15} />
      <span>{message}</span>
    </div>
  );
}

// Toggle switch
function Toggle({ checked, onChange }: { checked: boolean; onChange: (v: boolean) => void }) {
  return (
    <button
      type="button"
      role="switch"
      aria-checked={checked}
      onClick={() => onChange(!checked)}
      className="relative w-9 h-5 rounded-full transition-colors duration-200 flex-shrink-0"
      style={{ background: checked ? '#1B7A4A' : '#ddd' }}
    >
      <span
        className="absolute top-[3px] w-3.5 h-3.5 bg-white rounded-full transition-transform duration-200"
        style={{ left: '3px', transform: checked ? 'translateX(16px)' : 'translateX(0)' }}
      />
    </button>
  );
}

// ─── Main Component ───────────────────────────────────────────────────────────

export function CalendariosView() {
  // ── State ─────────────────────────────────────────────────────────────────

  const [view, setView] = useState<'list' | 'detail'>('list');
  const [calendarios, setCalendarios] = useState<CalendarItem[]>(INITIAL_CALENDARIOS);
  const [reservasPorCal, setReservasPorCal] = useState<ReservasPorCal>(INITIAL_RESERVAS);
  const [eventosPorCal, setEventosPorCal] = useState<EventosPorCal>(INITIAL_EVENTOS);

  // Detail view
  const [currentCal, setCurrentCal] = useState<CalendarItem>(INITIAL_CALENDARIOS[0]);
  const [detalleTab, setDetalleTab] = useState<'calendario' | 'lista' | 'disponibilidad'>('calendario');

  // Calendar search
  const [searchQuery, setSearchQuery] = useState('');

  // Dropdown menus (card context menus)
  const [openMenuId, setOpenMenuId] = useState<string | null>(null);

  // Modals
  const [showCreateModal, setShowCreateModal] = useState(false);
  const [showReservaModal, setShowReservaModal] = useState(false);
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [showMeetModal, setShowMeetModal] = useState(false);
  const [deleteTarget, setDeleteTarget] = useState<{ id: string; sub: string } | null>(null);
  const [meetLink, setMeetLink] = useState('');
  const [meetInvitee, setMeetInvitee] = useState('');

  // Toast
  const [toastMsg, setToastMsg] = useState('');
  const [toastVisible, setToastVisible] = useState(false);
  const toastTimer = useRef<ReturnType<typeof setTimeout> | null>(null);

  // Availability tab
  const [days, setDays] = useState<DayRow[]>(INITIAL_DAYS);
  const [selectedDuration, setSelectedDuration] = useState('1 hora');
  const [blockedDays, setBlockedDays] = useState<BlockedDay[]>(INITIAL_BLOCKED);
  const [newBlockDate, setNewBlockDate] = useState('');
  const [newBlockReason, setNewBlockReason] = useState('');

  // Create calendar form
  const [createName, setCreateName] = useState('');
  const [createTipo, setCreateTipo] = useState<'terreno' | 'video' | null>(null);
  const [createRegion, setCreateRegion] = useState('');
  const [createDesde, setCreateDesde] = useState('09:00');
  const [createHasta, setCreateHasta] = useState('18:00');
  const [createErrors, setCreateErrors] = useState<Record<string, string>>({});
  const [createDupWarning, setCreateDupWarning] = useState('');

  // Nueva consulta form
  const [resNombre, setResNombre] = useState('');
  const [resEmail, setResEmail] = useState('');
  const [resTel, setResTel] = useState('');
  const [resFecha, setResFecha] = useState('');
  const [resDesde, setResDesde] = useState('09:00');
  const [resHasta, setResHasta] = useState('10:00');
  const [resParcela, setResParcela] = useState('');
  const [resNotas, setResNotas] = useState('');

  // Close menu on outside click
  useEffect(() => {
    const handler = () => setOpenMenuId(null);
    document.addEventListener('click', handler);
    return () => document.removeEventListener('click', handler);
  }, []);

  // ── Helpers ───────────────────────────────────────────────────────────────

  function showToast(msg: string) {
    if (toastTimer.current) clearTimeout(toastTimer.current);
    setToastMsg(msg);
    setToastVisible(true);
    toastTimer.current = setTimeout(() => setToastVisible(false), 3500);
  }

  function enterCalendar(cal: CalendarItem) {
    setCurrentCal(cal);
    setDetalleTab('calendario');
    setView('detail');
  }

  function switchCalendar(sub: string) {
    const cal = calendarios.find(c => c.sub === sub);
    if (cal) setCurrentCal(cal);
  }

  // ── Reservas ──────────────────────────────────────────────────────────────

  function openReservaModal() {
    setResNombre(''); setResEmail(''); setResTel('');
    setResFecha(''); setResDesde('09:00'); setResHasta('10:00');
    setResParcela(''); setResNotas('');
    setShowReservaModal(true);
  }

  function submitReserva() {
    if (!resNombre.trim() || !resFecha) { showToast('Completá nombre y fecha'); return; }
    const isVideo = currentCal.tipo === 'video';
    if (isVideo && !resEmail.trim()) { showToast('Email obligatorio para videollamadas'); return; }

    const d = new Date(resFecha + 'T12:00:00');
    const fechaLabel = d.toLocaleDateString('es-CL', { weekday: 'long', day: 'numeric', month: 'long', year: 'numeric' });
    const link = isVideo ? generateMeetLink() : undefined;
    const parcela = resParcela.trim() || (isVideo ? 'Videollamada' : currentCal.name);

    const newReserva: Reserva = {
      id: generateId(),
      nombre: resNombre.trim(),
      parcela,
      email: resEmail.trim() || '—',
      tel: resTel.trim() || '—',
      fecha: fechaLabel,
      fechaDate: d,
      hora: `${resDesde} - ${resHasta}`,
      estado: 'pendiente',
      notas: resNotas.trim(),
      meetLink: link,
    };

    setReservasPorCal(prev => ({
      ...prev,
      [currentCal.sub]: [newReserva, ...(prev[currentCal.sub] || [])],
    }));

    // Add to calendar events if April 2026
    if (d.getFullYear() === 2026 && d.getMonth() === 3) {
      const day = d.getDate();
      setEventosPorCal(prev => ({
        ...prev,
        [currentCal.sub]: {
          ...(prev[currentCal.sub] || {}),
          [day]: [...((prev[currentCal.sub] || {})[day] || []), resNombre.trim()],
        },
      }));
    }

    // Update consulta count
    setCalendarios(prev =>
      prev.map(c => c.sub === currentCal.sub ? { ...c, consultaCount: c.consultaCount + 1 } : c)
    );

    setShowReservaModal(false);

    if (isVideo && link) {
      setMeetLink(link);
      setMeetInvitee(resEmail.trim());
      setShowMeetModal(true);
    } else {
      showToast('Consulta creada correctamente');
    }
  }

  // ── Create calendar ───────────────────────────────────────────────────────

  function openCreateModal() {
    setCreateName(''); setCreateTipo(null); setCreateRegion('');
    setCreateDesde('09:00'); setCreateHasta('18:00');
    setCreateErrors({}); setCreateDupWarning('');
    setShowCreateModal(true);
  }

  function submitCreate() {
    const errors: Record<string, string> = {};
    if (!createName.trim()) errors.name = 'El nombre es obligatorio';
    if (!createTipo) errors.tipo = 'Seleccioná un tipo de visita';
    if (createTipo === 'terreno' && !createRegion) errors.region = 'La región es obligatoria para visitas en terreno';
    if (createTipo === 'video' && createDesde >= createHasta) errors.horario = 'El horario de disponibilidad es inválido';

    const dup = calendarios.find(c => c.name.toLowerCase() === createName.trim().toLowerCase());
    if (dup) { setCreateDupWarning(`Ya existe un calendario con el nombre "${createName.trim()}". Usá un nombre distinto.`); return; }
    else setCreateDupWarning('');

    if (Object.keys(errors).length) { setCreateErrors(errors); return; }

    const tipo: CalType = createTipo === 'video' ? 'video' : 'visita';
    const sub = createName.trim() + (tipo === 'visita' ? ' — Visitas' : ' — Videollamadas');
    const newCal: CalendarItem = {
      id: generateId(),
      name: createName.trim(),
      sub,
      tipo,
      createdDate: 'Hoy',
      owner: 'Mi cuenta',
      consultaCount: 0,
    };
    setCalendarios(prev => [...prev, newCal]);
    setShowCreateModal(false);
    showToast(`Calendario "${createName.trim()}" creado exitosamente`);
  }

  // ── Delete ────────────────────────────────────────────────────────────────

  function confirmDelete() {
    if (!deleteTarget) return;
    setCalendarios(prev => prev.filter(c => c.id !== deleteTarget.id));
    setShowDeleteModal(false);
    if (view === 'detail' && currentCal.id === deleteTarget.id) setView('list');
    showToast('Calendario eliminado correctamente');
    setDeleteTarget(null);
  }

  // ── Availability helpers ──────────────────────────────────────────────────

  function updateDay(id: string, field: Partial<DayRow>) {
    setDays(prev => prev.map(d => d.id === id ? { ...d, ...field } : d));
  }

  function copyHoursToAll(src: DayRow) {
    setDays(prev => prev.map(d => d.enabled ? { ...d, desde: src.desde, hasta: src.hasta } : d));
  }

  function addBlockedDay() {
    if (!newBlockDate) return;
    const d = new Date(newBlockDate + 'T12:00:00');
    const label = d.toLocaleDateString('es-CL', { day: 'numeric', month: 'long', year: 'numeric' });
    setBlockedDays(prev => [...prev, { id: generateId(), date: label, reason: newBlockReason || 'Sin motivo' }]);
    setNewBlockDate(''); setNewBlockReason('');
  }

  // ── Calendar grid rendering ───────────────────────────────────────────────

  function renderMonthlyGrid() {
    const tipo = currentCal.tipo;
    const events = eventosPorCal[currentCal.sub] || {};
    const cells: React.ReactNode[] = [];
    let day = 1;

    for (let w = 0; w < 6; w++) {
      const rowCells: React.ReactNode[] = [];
      for (let d = 0; d < 7; d++) {
        const cellIdx = w * 7 + d;
        if (cellIdx < MONTH_OFFSET || day > MONTH_DAYS) {
          rowCells.push(<td key={d} className="border border-[#f0f0ec] p-2 h-[90px] align-top w-[calc(100%/7)]" />);
        } else {
          const isToday = day === 23; // April 23 = today per context
          const dayEvents = events[day] || [];
          const shown = dayEvents.slice(0, 3);
          rowCells.push(
            <td key={d} className="border border-[#f0f0ec] p-2 h-[90px] align-top w-[calc(100%/7)]">
              <div
                className={`text-[13px] mb-1 w-[26px] h-[26px] flex items-center justify-center rounded-full ${isToday ? 'bg-[#1B7A4A] text-white font-semibold' : 'text-[#555]'}`}
              >
                {day}
              </div>
              {shown.map((name, i) => (
                <div
                  key={i}
                  className={`text-[11px] px-1.5 py-0.5 rounded mb-0.5 flex items-center gap-1 overflow-hidden truncate cursor-pointer ${tipo === 'video' ? 'bg-[#f0eefa] text-[#5b4b9a]' : 'bg-[#edf7f1] text-[#1B7A4A]'}`}
                >
                  <span className={`w-1.5 h-1.5 rounded-full flex-shrink-0 ${tipo === 'video' ? 'bg-[#5b4b9a]' : 'bg-[#1B7A4A]'}`} />
                  <span className="truncate">{name}</span>
                </div>
              ))}
              {dayEvents.length > shown.length && (
                <div className="text-[11px] text-[#aaa] px-1">+{dayEvents.length - shown.length} más</div>
              )}
            </td>
          );
          day++;
        }
      }
      cells.push(<tr key={w}>{rowCells}</tr>);
      if (day > MONTH_DAYS) break;
    }
    return cells;
  }

  // ── Filtered list view ────────────────────────────────────────────────────

  const filteredCalendarios = calendarios.filter(c =>
    c.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
    c.sub.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const currentReservas = reservasPorCal[currentCal.sub] || [];

  // ─────────────────────────────────────────────────────────────────────────
  // Render
  // ─────────────────────────────────────────────────────────────────────────

  return (
    <div className="flex flex-col flex-1 overflow-hidden" style={{ fontFamily: 'var(--font-body, "Segoe UI", system-ui, sans-serif)', fontSize: 14, color: 'var(--foreground, #1a1a1a)' }}>

      {/* ── VIEW 1: CALENDAR LIST ───────────────────────────────────────── */}
      {view === 'list' && (
        <>
          {/* Page header */}
          <div className="bg-white border-b border-[#e8e8e4] px-8 py-5 flex-shrink-0">
            <div className="flex items-start justify-between">
              <div>
                <h1 className="text-[22px] font-semibold text-[#1a1a1a] mb-0.5">Calendarios</h1>
                <p className="text-[13.5px] text-[#888]">Gestiona tus calendarios de visitas y videollamadas</p>
              </div>
              <button
                onClick={openCreateModal}
                className="flex items-center gap-1.5 bg-[#1B7A4A] hover:bg-[#155f3a] text-white rounded-full px-4 py-2.5 text-[13.5px] font-medium transition-colors mt-1"
              >
                <Plus size={14} strokeWidth={2.5} />
                Nuevo calendario
              </button>
            </div>
          </div>

          {/* Content */}
          <div className="flex-1 overflow-y-auto px-8 py-7">
            {/* Toolbar */}
            <div className="flex items-center justify-between mb-5">
              <p className="text-[13.5px] font-semibold text-[#1a1a1a]">Listado de calendarios</p>
              <div className="flex items-center gap-2 bg-white border border-[#e8e8e4] rounded-lg px-3.5 py-2">
                <Search size={14} className="text-[#aaa]" />
                <input
                  type="text"
                  placeholder="Buscar"
                  value={searchQuery}
                  onChange={e => setSearchQuery(e.target.value)}
                  className="outline-none text-[13.5px] text-[#1a1a1a] placeholder-[#aaa] w-44 bg-transparent"
                />
              </div>
            </div>

            {/* Grid */}
            <div className="grid grid-cols-3 gap-4">
              {filteredCalendarios.map(cal => (
                <CalCard
                  key={cal.id}
                  cal={cal}
                  openMenuId={openMenuId}
                  onOpenMenu={id => { setOpenMenuId(id); }}
                  onEnter={() => enterCalendar(cal)}
                  onDelete={() => { setDeleteTarget({ id: cal.id, sub: cal.sub }); setShowDeleteModal(true); setOpenMenuId(null); }}
                />
              ))}
            </div>

            {filteredCalendarios.length === 0 && (
              <div className="bg-white border border-dashed border-[#e0e0dc] rounded-xl p-10 text-center text-[13.5px] text-[#888]">
                No se encontraron calendarios
              </div>
            )}
          </div>
        </>
      )}

      {/* ── VIEW 2: DETAIL ──────────────────────────────────────────────── */}
      {view === 'detail' && (
        <>
          {/* Page header */}
          <div className="bg-white border-b border-[#e8e8e4] px-8 pt-5 flex-shrink-0">
            <div className="flex items-start justify-between mb-4">
              <div>
                <button
                  onClick={() => setView('list')}
                  className="flex items-center gap-1.5 text-[13px] text-[#888] hover:text-[#1a1a1a] transition-colors mb-2 bg-transparent border-none p-0 cursor-pointer"
                >
                  <ChevronLeft size={14} />
                  Volver a calendarios
                </button>
                <h1 className="text-[22px] font-semibold text-[#1a1a1a] mb-0.5">{currentCal.name}</h1>
                <p className="text-[13.5px] text-[#888]">{currentCal.sub}</p>
              </div>
              <div className="flex items-center gap-3 mt-1">
                <select
                  value={currentCal.sub}
                  onChange={e => switchCalendar(e.target.value)}
                  className="border border-[#e8e8e4] rounded-lg px-3 py-2 text-[13.5px] text-[#1a1a1a] bg-white outline-none cursor-pointer min-w-[220px]"
                  style={{ fontFamily: 'inherit' }}
                >
                  {calendarios.map(c => (
                    <option key={c.id} value={c.sub}>{c.sub}</option>
                  ))}
                </select>
                <button
                  onClick={openReservaModal}
                  className="flex items-center gap-1.5 bg-[#1B7A4A] hover:bg-[#155f3a] text-white rounded-full px-4 py-2.5 text-[13.5px] font-medium transition-colors"
                >
                  <Plus size={14} strokeWidth={2.5} />
                  Nueva consulta
                </button>
              </div>
            </div>

            {/* Tabs */}
            <div className="flex">
              {(['calendario', 'lista', 'disponibilidad'] as const).map(tab => (
                <button
                  key={tab}
                  onClick={() => setDetalleTab(tab)}
                  className={`flex items-center gap-1.5 px-4 py-3 text-[13.5px] border-b-2 transition-all capitalize cursor-pointer bg-transparent ${detalleTab === tab ? 'text-[#1B7A4A] border-[#1B7A4A] font-semibold' : 'text-[#888] border-transparent hover:text-[#444]'}`}
                >
                  {tab === 'calendario' && <Calendar size={13} />}
                  {tab === 'lista' && <List size={13} />}
                  {tab === 'disponibilidad' && <Clock size={13} />}
                  {tab === 'calendario' ? 'Calendario' : tab === 'lista' ? 'Lista' : 'Disponibilidad'}
                </button>
              ))}
            </div>
          </div>

          {/* Tab content */}
          <div className="flex-1 overflow-y-auto px-8 py-7">

            {/* TAB: Calendario */}
            {detalleTab === 'calendario' && (
              <div>
                <div className="flex items-center gap-3 mb-5">
                  <button className="border border-[#e8e8e4] rounded-md w-[30px] h-[30px] flex items-center justify-center text-[#555] hover:border-[#bbb] transition-colors">
                    <ChevronLeft size={14} />
                  </button>
                  <h2 className="text-[17px] font-semibold text-[#1a1a1a]">{MONTH_YEAR}</h2>
                  <button className="border border-[#e8e8e4] rounded-md w-[30px] h-[30px] flex items-center justify-center text-[#555] hover:border-[#bbb] transition-colors">
                    <ChevronRight size={14} />
                  </button>
                </div>

                <div className="bg-white border border-[#e8e8e4] rounded-xl overflow-hidden">
                  <table className="w-full border-collapse">
                    <thead>
                      <tr>
                        {DAYS_OF_WEEK.map(d => (
                          <th key={d} className="px-2 py-2.5 text-center text-[12px] font-semibold text-[#aaa] uppercase tracking-wider border-b border-[#f0f0ec]">
                            {d}
                          </th>
                        ))}
                      </tr>
                    </thead>
                    <tbody>{renderMonthlyGrid()}</tbody>
                  </table>
                </div>

                {/* Legend */}
                <div className="flex items-center gap-4 mt-3">
                  <div className="flex items-center gap-1.5 text-[12px] text-[#666]">
                    <span className={`w-2 h-2 rounded-full ${currentCal.tipo === 'video' ? 'bg-[#5b4b9a]' : 'bg-[#1B7A4A]'}`} />
                    {currentCal.tipo === 'video' ? 'Videollamada' : 'Visita'} — {currentCal.name}
                  </div>
                </div>
              </div>
            )}

            {/* TAB: Lista */}
            {detalleTab === 'lista' && (
              <div>
                <p className="text-[13px] text-[#888] mb-4">
                  <strong className="text-[#1a1a1a]">{currentReservas.length} {currentReservas.length === 1 ? 'reserva' : 'reservas'}</strong>
                  {' '}en{' '}
                  <strong className="text-[#1a1a1a]">{currentCal.sub}</strong>
                  {' '}
                  {currentCal.tipo === 'video' ? <BadgeVideo /> : <BadgeVisita />}
                </p>

                {currentReservas.length === 0 ? (
                  <div className="bg-white border border-dashed border-[#e0e0dc] rounded-xl p-10 text-center text-[13.5px] text-[#888]">
                    No hay reservas en este calendario todavía
                  </div>
                ) : (
                  currentReservas.map(r => (
                    <ReservaCard
                      key={r.id}
                      reserva={r}
                      calSub={currentCal.sub}
                      tipo={currentCal.tipo}
                      onDelete={id => {
                        setReservasPorCal(prev => ({
                          ...prev,
                          [currentCal.sub]: (prev[currentCal.sub] || []).filter(r => r.id !== id),
                        }));
                        showToast('Reserva eliminada');
                      }}
                      onConfirm={id => {
                        setReservasPorCal(prev => ({
                          ...prev,
                          [currentCal.sub]: (prev[currentCal.sub] || []).map(r => r.id === id ? { ...r, estado: 'confirmada' } : r),
                        }));
                        showToast('Reserva confirmada');
                      }}
                    />
                  ))
                )}
              </div>
            )}

            {/* TAB: Disponibilidad */}
            {detalleTab === 'disponibilidad' && (
              <AvailabilityTab
                days={days}
                onDayChange={updateDay}
                onCopyHours={copyHoursToAll}
                selectedDuration={selectedDuration}
                onSelectDuration={setSelectedDuration}
                blockedDays={blockedDays}
                onRemoveBlocked={id => setBlockedDays(prev => prev.filter(b => b.id !== id))}
                newBlockDate={newBlockDate}
                onNewBlockDate={setNewBlockDate}
                newBlockReason={newBlockReason}
                onNewBlockReason={setNewBlockReason}
                onAddBlocked={addBlockedDay}
                onSave={() => showToast('Disponibilidad guardada correctamente')}
              />
            )}
          </div>
        </>
      )}

      {/* ── MODALS ──────────────────────────────────────────────────────── */}

      {/* Create calendar modal */}
      {showCreateModal && (
        <ModalOverlay onClose={() => setShowCreateModal(false)}>
          <div className="bg-white rounded-2xl p-8 w-[520px] max-w-[95vw] max-h-[90vh] overflow-y-auto shadow-2xl">
            <ModalHeader
              title="Crear calendario"
              subtitle="El calendario se creará en Google Calendar via cuenta de servicio"
              onClose={() => setShowCreateModal(false)}
            />

            {createDupWarning && (
              <div className="flex items-start gap-2.5 bg-[#fef9ec] border border-[#f0d88a] text-[#8a5c00] rounded-[10px] p-3 mb-5 text-[13.5px]">
                <AlertTriangle size={16} className="flex-shrink-0 mt-0.5" />
                <span>{createDupWarning}</span>
              </div>
            )}

            <div className="mb-5">
              <label className="block text-[13px] font-medium text-[#444] mb-1.5">
                Nombre del calendario <span className="text-red-500">*</span>
              </label>
              <input
                type="text"
                value={createName}
                onChange={e => { setCreateName(e.target.value); setCreateErrors(p => ({ ...p, name: '' })); setCreateDupWarning(''); }}
                placeholder="Ej: Visitas Región Metropolitana"
                className="w-full border-[1.5px] border-[#e0e0dc] focus:border-[#1B7A4A] rounded-lg px-3 py-2.5 text-[13.5px] text-[#1a1a1a] outline-none bg-white transition-colors"
                style={{ fontFamily: 'inherit' }}
              />
              {createErrors.name && <p className="text-[12px] text-red-500 mt-1.5">{createErrors.name}</p>}
            </div>

            <div className="mb-5">
              <label className="block text-[13px] font-medium text-[#444] mb-1.5">
                Tipo de visita <span className="text-red-500">*</span>
              </label>
              <div className="grid grid-cols-2 gap-3">
                <label
                  onClick={() => { setCreateTipo('terreno'); setCreateErrors(p => ({ ...p, tipo: '' })); }}
                  className={`border-[1.5px] rounded-[10px] p-4 cursor-pointer transition-all ${createTipo === 'terreno' ? 'border-[#1B7A4A] bg-[#edf7f1]' : 'border-[#e8e8e4] hover:border-[#bbb]'}`}
                >
                  <div className={`text-[14px] font-medium mb-0.5 ${createTipo === 'terreno' ? 'text-[#1B7A4A]' : 'text-[#1a1a1a]'}`}>🏕 Visita en terreno</div>
                  <div className="text-[12px] text-[#aaa]">Asocia proyectos o parcelas por región</div>
                </label>
                <label
                  onClick={() => { setCreateTipo('video'); setCreateErrors(p => ({ ...p, tipo: '' })); }}
                  className={`border-[1.5px] rounded-[10px] p-4 cursor-pointer transition-all ${createTipo === 'video' ? 'border-[#1B7A4A] bg-[#edf7f1]' : 'border-[#e8e8e4] hover:border-[#bbb]'}`}
                >
                  <div className={`text-[14px] font-medium mb-0.5 ${createTipo === 'video' ? 'text-[#1B7A4A]' : 'text-[#1a1a1a]'}`}>📹 Videollamada</div>
                  <div className="text-[12px] text-[#aaa]">Sin asociación geográfica requerida</div>
                </label>
              </div>
              {createErrors.tipo && <p className="text-[12px] text-red-500 mt-1.5">{createErrors.tipo}</p>}
            </div>

            {createTipo === 'terreno' && (
              <div className="mb-5">
                <label className="block text-[13px] font-medium text-[#444] mb-1.5">
                  Región <span className="text-red-500">*</span>
                </label>
                <select
                  value={createRegion}
                  onChange={e => { setCreateRegion(e.target.value); setCreateErrors(p => ({ ...p, region: '' })); }}
                  className="w-full border-[1.5px] border-[#e0e0dc] focus:border-[#1B7A4A] rounded-lg px-3 py-2.5 text-[13.5px] text-[#1a1a1a] outline-none bg-white"
                  style={{ fontFamily: 'inherit' }}
                >
                  <option value="">Seleccionar región...</option>
                  <option>Región Metropolitana</option>
                  <option>Región de Valparaíso</option>
                  <option>Región del Biobío</option>
                  <option>Región de Los Lagos</option>
                  <option>Región de Aysén</option>
                  <option>Región de La Araucanía</option>
                  <option>Región de Los Ríos</option>
                  <option>Región de Magallanes</option>
                </select>
                {createErrors.region && <p className="text-[12px] text-red-500 mt-1.5">{createErrors.region}</p>}
              </div>
            )}

            {createTipo === 'video' && (
              <>
                <div className="mb-5">
                  <label className="block text-[13px] font-medium text-[#444] mb-1.5">
                    Horario de disponibilidad <span className="text-red-500">*</span>
                  </label>
                  <div className="flex items-center gap-2.5">
                    <input type="time" value={createDesde} onChange={e => setCreateDesde(e.target.value)}
                      className="border-[1.5px] border-[#e0e0dc] focus:border-[#1B7A4A] rounded-lg px-3 py-2.5 text-[13.5px] outline-none w-auto"
                      style={{ fontFamily: 'inherit' }} />
                    <span className="text-[#aaa] text-[13px]">hasta</span>
                    <input type="time" value={createHasta} onChange={e => setCreateHasta(e.target.value)}
                      className="border-[1.5px] border-[#e0e0dc] focus:border-[#1B7A4A] rounded-lg px-3 py-2.5 text-[13.5px] outline-none w-auto"
                      style={{ fontFamily: 'inherit' }} />
                  </div>
                  {createErrors.horario && <p className="text-[12px] text-red-500 mt-1.5">{createErrors.horario}</p>}
                </div>
                <div className="flex items-start gap-3 bg-[#eef4fb] border border-[#cfdef0] rounded-[10px] px-3.5 py-3 mb-5">
                  <Video size={18} className="text-[#006B4E] flex-shrink-0 mt-0.5" />
                  <p className="text-[12.5px] text-[#2d4b70] leading-relaxed">Cada consulta agendada en este calendario generará automáticamente un enlace de Google Meet que podrás compartir con el cliente.</p>
                </div>
              </>
            )}

            <div className="flex justify-end gap-2.5 pt-6 border-t border-[#f0f0ec] mt-2">
              <button onClick={() => setShowCreateModal(false)} className="border border-[#ddd] rounded-lg px-4 py-2.5 text-[13.5px] font-medium bg-white hover:border-[#bbb] transition-colors cursor-pointer">
                Cancelar
              </button>
              <button onClick={submitCreate} className="flex items-center gap-1.5 bg-[#1B7A4A] hover:bg-[#155f3a] text-white rounded-lg px-4 py-2.5 text-[13.5px] font-medium transition-colors cursor-pointer">
                <Check size={14} strokeWidth={2.5} />
                Crear calendario
              </button>
            </div>
          </div>
        </ModalOverlay>
      )}

      {/* Nueva consulta modal */}
      {showReservaModal && (
        <ModalOverlay onClose={() => setShowReservaModal(false)}>
          <div className="bg-white rounded-2xl p-8 w-[520px] max-w-[95vw] max-h-[90vh] overflow-y-auto shadow-2xl">
            <ModalHeader
              title="Nueva consulta"
              subtitle={`${currentCal.tipo === 'video' ? 'Agendar una videollamada' : 'Agendar una visita'} en "${currentCal.sub}"`}
              onClose={() => setShowReservaModal(false)}
            />

            <div className="mb-5">
              <label className="block text-[13px] font-medium text-[#444] mb-1.5">Calendario</label>
              <input type="text" readOnly value={currentCal.sub}
                className="w-full border-[1.5px] border-[#e0e0dc] rounded-lg px-3 py-2.5 text-[13.5px] text-[#555] bg-[#fafaf8] outline-none"
                style={{ fontFamily: 'inherit' }} />
            </div>

            <div className="mb-5">
              <label className="block text-[13px] font-medium text-[#444] mb-1.5">
                Nombre del cliente <span className="text-red-500">*</span>
              </label>
              <input type="text" value={resNombre} onChange={e => setResNombre(e.target.value)}
                placeholder="Ej: Juan Pérez"
                className="w-full border-[1.5px] border-[#e0e0dc] focus:border-[#1B7A4A] rounded-lg px-3 py-2.5 text-[13.5px] outline-none bg-white transition-colors"
                style={{ fontFamily: 'inherit' }} />
            </div>

            <div className="grid grid-cols-2 gap-3.5 mb-5">
              <div>
                <label className="block text-[13px] font-medium text-[#444] mb-1.5">
                  Email {currentCal.tipo === 'video' && <span className="text-red-500">*</span>}
                </label>
                <input type="email" value={resEmail} onChange={e => setResEmail(e.target.value)}
                  placeholder="correo@ejemplo.com"
                  className="w-full border-[1.5px] border-[#e0e0dc] focus:border-[#1B7A4A] rounded-lg px-3 py-2.5 text-[13.5px] outline-none bg-white transition-colors"
                  style={{ fontFamily: 'inherit' }} />
                {currentCal.tipo === 'video' && (
                  <p className="text-[12px] text-[#aaa] mt-1.5">Se usará para enviarle la invitación con el link de Meet</p>
                )}
              </div>
              <div>
                <label className="block text-[13px] font-medium text-[#444] mb-1.5">Teléfono</label>
                <input type="tel" value={resTel} onChange={e => setResTel(e.target.value)}
                  placeholder="+56 9 ..."
                  className="w-full border-[1.5px] border-[#e0e0dc] focus:border-[#1B7A4A] rounded-lg px-3 py-2.5 text-[13.5px] outline-none bg-white transition-colors"
                  style={{ fontFamily: 'inherit' }} />
              </div>
            </div>

            <div className="grid grid-cols-3 gap-3.5 mb-5">
              <div>
                <label className="block text-[13px] font-medium text-[#444] mb-1.5">
                  Fecha <span className="text-red-500">*</span>
                </label>
                <input type="date" value={resFecha} onChange={e => setResFecha(e.target.value)}
                  className="w-full border-[1.5px] border-[#e0e0dc] focus:border-[#1B7A4A] rounded-lg px-3 py-2.5 text-[13.5px] outline-none bg-white transition-colors"
                  style={{ fontFamily: 'inherit' }} />
              </div>
              <div>
                <label className="block text-[13px] font-medium text-[#444] mb-1.5">Desde</label>
                <input type="time" value={resDesde} onChange={e => setResDesde(e.target.value)}
                  className="w-full border-[1.5px] border-[#e0e0dc] focus:border-[#1B7A4A] rounded-lg px-3 py-2.5 text-[13.5px] outline-none bg-white transition-colors"
                  style={{ fontFamily: 'inherit' }} />
              </div>
              <div>
                <label className="block text-[13px] font-medium text-[#444] mb-1.5">Hasta</label>
                <input type="time" value={resHasta} onChange={e => setResHasta(e.target.value)}
                  className="w-full border-[1.5px] border-[#e0e0dc] focus:border-[#1B7A4A] rounded-lg px-3 py-2.5 text-[13.5px] outline-none bg-white transition-colors"
                  style={{ fontFamily: 'inherit' }} />
              </div>
            </div>

            <div className="mb-5">
              <label className="block text-[13px] font-medium text-[#444] mb-1.5">
                {currentCal.tipo === 'video' ? 'Asunto' : 'Parcela / proyecto'}
              </label>
              <input type="text" value={resParcela} onChange={e => setResParcela(e.target.value)}
                placeholder={currentCal.tipo === 'video' ? 'Ej: Consulta sobre documentación' : 'Ej: Parcela Pirque'}
                className="w-full border-[1.5px] border-[#e0e0dc] focus:border-[#1B7A4A] rounded-lg px-3 py-2.5 text-[13.5px] outline-none bg-white transition-colors"
                style={{ fontFamily: 'inherit' }} />
            </div>

            <div className="mb-5">
              <label className="block text-[13px] font-medium text-[#444] mb-1.5">Notas</label>
              <textarea value={resNotas} onChange={e => setResNotas(e.target.value)}
                rows={2} placeholder="Información adicional..."
                className="w-full border-[1.5px] border-[#e0e0dc] focus:border-[#1B7A4A] rounded-lg px-3 py-2.5 text-[13.5px] outline-none bg-white transition-colors resize-none"
                style={{ fontFamily: 'inherit' }} />
            </div>

            <div className="flex justify-end gap-2.5 pt-6 border-t border-[#f0f0ec]">
              <button onClick={() => setShowReservaModal(false)} className="border border-[#ddd] rounded-lg px-4 py-2.5 text-[13.5px] font-medium bg-white hover:border-[#bbb] transition-colors cursor-pointer">
                Cancelar
              </button>
              <button onClick={submitReserva} className="flex items-center gap-1.5 bg-[#1B7A4A] hover:bg-[#155f3a] text-white rounded-lg px-4 py-2.5 text-[13.5px] font-medium transition-colors cursor-pointer">
                <Check size={14} strokeWidth={2.5} />
                Crear consulta
              </button>
            </div>
          </div>
        </ModalOverlay>
      )}

      {/* Meet link modal */}
      {showMeetModal && (
        <ModalOverlay onClose={() => setShowMeetModal(false)}>
          <div className="bg-white rounded-2xl p-8 w-[420px] max-w-[95vw] shadow-2xl">
            <div className="w-[52px] h-[52px] bg-[#eef4fb] rounded-xl flex items-center justify-center mb-4">
              <Video size={24} className="text-[#006B4E]" />
            </div>
            <ModalHeader
              title="Videollamada creada"
              subtitle="Se generó el enlace de Google Meet y se envió la invitación por email"
              onClose={() => setShowMeetModal(false)}
            />
            <div className="mb-4">
              <label className="block text-[13px] font-medium text-[#444] mb-1.5">Link de Google Meet</label>
              <div className="flex gap-2">
                <input type="text" readOnly value={meetLink}
                  className="flex-1 border-[1.5px] border-[#e0e0dc] rounded-lg px-3 py-2.5 text-[12.5px] font-mono text-[#555] bg-[#fafaf8] outline-none" />
                <button
                  onClick={() => { navigator.clipboard.writeText(meetLink).then(() => showToast('Link copiado al portapapeles')); }}
                  className="border border-[#ddd] rounded-lg px-3 py-2.5 hover:border-[#bbb] transition-colors cursor-pointer bg-white"
                  title="Copiar enlace"
                >
                  <Copy size={14} />
                </button>
              </div>
              {meetInvitee && <p className="text-[12px] text-[#aaa] mt-1.5">Invitación enviada a {meetInvitee}</p>}
            </div>
          </div>
        </ModalOverlay>
      )}

      {/* Delete modal */}
      {showDeleteModal && deleteTarget && (
        <ModalOverlay onClose={() => setShowDeleteModal(false)}>
          <div className="bg-white rounded-2xl p-8 w-[420px] max-w-[95vw] shadow-2xl">
            <div className="w-[52px] h-[52px] bg-[#fdf3f2] rounded-xl flex items-center justify-center mb-4">
              <AlertTriangle size={24} className="text-[#c0392b]" />
            </div>
            <ModalHeader title="Eliminar calendario" subtitle="Esta acción no se puede deshacer" onClose={() => setShowDeleteModal(false)} />
            <div className="flex items-start gap-2.5 bg-[#fdf3f2] border border-[#f5c6c2] rounded-[10px] px-4 py-3 mb-5 text-[13px] text-[#8b2018]">
              <AlertTriangle size={16} className="flex-shrink-0 mt-0.5" />
              <span>Al eliminar este calendario, los usuarios no podrán agendar visitas asociadas a él. Las reservas ya confirmadas no se verán afectadas.</span>
            </div>
            <p className="text-[13.5px] text-[#555] leading-relaxed">
              ¿Estás seguro de que quieres eliminar <strong>"{deleteTarget.sub}"</strong>?
            </p>
            <div className="flex justify-end gap-2.5 pt-5 border-t border-[#f0f0ec] mt-5">
              <button onClick={() => setShowDeleteModal(false)} className="border border-[#ddd] rounded-lg px-4 py-2.5 text-[13.5px] font-medium bg-white hover:border-[#bbb] transition-colors cursor-pointer">
                Cancelar
              </button>
              <button onClick={confirmDelete} className="bg-[#c0392b] hover:bg-[#a93226] text-white rounded-lg px-4 py-2.5 text-[13.5px] font-medium transition-colors cursor-pointer">
                Sí, eliminar
              </button>
            </div>
          </div>
        </ModalOverlay>
      )}

      {/* Toast */}
      <Toast message={toastMsg} visible={toastVisible} />
    </div>
  );
}

// ─── CalCard ──────────────────────────────────────────────────────────────────

function CalCard({
  cal, openMenuId, onOpenMenu, onEnter, onDelete,
}: {
  cal: CalendarItem;
  openMenuId: string | null;
  onOpenMenu: (id: string) => void;
  onEnter: () => void;
  onDelete: () => void;
}) {
  const isOpen = openMenuId === cal.id;

  return (
    <div
      onClick={onEnter}
      className="bg-white border border-[#e8e8e4] rounded-xl px-4 pt-4 pb-3.5 cursor-pointer relative transition-all hover:shadow-[0_4px_16px_rgba(0,0,0,.08)] hover:border-[#d0d0cc]"
    >
      <div className="flex items-start justify-between mb-1">
        <div className="text-[14px] font-semibold text-[#1a1a1a] leading-snug pr-2">{cal.name}</div>
        <button
          onClick={e => { e.stopPropagation(); onOpenMenu(cal.id); }}
          className="p-1 rounded-md text-[#bbb] hover:text-[#555] hover:bg-[#f5f5f3] transition-colors relative z-10 flex-shrink-0"
        >
          <MoreVertical size={16} />
        </button>

        {/* Dropdown */}
        {isOpen && (
          <div
            className="absolute top-9 right-3.5 bg-white border border-[#e8e8e4] rounded-[10px] shadow-[0_8px_24px_rgba(0,0,0,.12)] z-50 w-[150px] py-1.5"
            onClick={e => e.stopPropagation()}
          >
            <button className="w-full flex items-center gap-2.5 px-3.5 py-2.5 text-[13.5px] text-[#1a1a1a] hover:bg-[#f5f5f3] transition-colors text-left">
              <Edit3 size={14} /> Editar
            </button>
            <button className="w-full flex items-center gap-2.5 px-3.5 py-2.5 text-[13.5px] text-[#1a1a1a] hover:bg-[#f5f5f3] transition-colors text-left">
              <Copy size={14} /> Duplicar
            </button>
            <button
              onClick={onDelete}
              className="w-full flex items-center gap-2.5 px-3.5 py-2.5 text-[13.5px] text-[#c0392b] hover:bg-[#fdf3f2] transition-colors text-left"
            >
              <Trash2 size={14} /> Eliminar
            </button>
          </div>
        )}
      </div>

      <div className="text-[12.5px] text-[#888] mb-3.5">{cal.sub}</div>

      <div className="flex flex-col gap-1.5 mb-3.5">
        <div className="flex items-center gap-1.5 text-[12.5px] text-[#555]">
          <Calendar size={13} className="text-[#aaa] flex-shrink-0" />
          {cal.createdDate}
        </div>
        <div className="flex items-center gap-1.5 text-[12.5px] text-[#555]">
          <User size={13} className="text-[#aaa] flex-shrink-0" />
          {cal.owner}
        </div>
        <div className="flex items-center gap-1.5 text-[12.5px] text-[#555]">
          <MessageSquare size={13} className="text-[#aaa] flex-shrink-0" />
          {cal.consultaCount} consultas
        </div>
      </div>

      <div className="flex items-center justify-between pt-3 border-t border-[#f0f0ec]">
        {cal.tipo === 'visita' ? <BadgeVisita /> : <BadgeVideo />}
        <ActiveDot />
      </div>
    </div>
  );
}

// ─── ReservaCard ──────────────────────────────────────────────────────────────

function ReservaCard({
  reserva, calSub, tipo, onDelete, onConfirm,
}: {
  reserva: Reserva;
  calSub: string;
  tipo: CalType;
  onDelete: (id: string) => void;
  onConfirm: (id: string) => void;
}) {
  const isConfirmada = reserva.estado === 'confirmada';
  const tipoFieldLabel = tipo === 'video' ? 'Videollamada' : 'Visita presencial';

  return (
    <div className="bg-white border border-[#e8e8e4] rounded-xl p-5 mb-3">
      {/* Header */}
      <div className="flex items-start justify-between mb-3">
        <div>
          <div className="text-[15px] font-semibold text-[#1a1a1a]">{reserva.nombre}</div>
          <div className="flex flex-wrap gap-1.5 items-center mt-0.5">
            <span className="flex items-center gap-1 text-[12.5px] text-[#888]">
              <Calendar size={12} /> {calSub}
            </span>
            <span className="text-[#ccc]">·</span>
            <span className="flex items-center gap-1 text-[12.5px] text-[#888]">
              <MapPin size={12} /> {reserva.parcela}
            </span>
          </div>
        </div>
        <span className={`text-[12px] font-medium border rounded-md px-2.5 py-1 ${isConfirmada ? 'bg-[#edf7f1] text-[#1B7A4A] border-[#b8ddc8]' : 'bg-[#fef9ec] text-[#b7830a] border-[#f0d88a]'}`}>
          {isConfirmada ? 'Confirmada' : 'Pendiente'}
        </span>
      </div>

      {/* Grid */}
      <div className="grid grid-cols-2 gap-y-2 gap-x-6 mb-3">
        <div className="flex items-center gap-1.5 text-[13px] text-[#444]">
          <User size={14} className="text-[#aaa] flex-shrink-0" /> {reserva.nombre}
        </div>
        <div className="flex items-center gap-1.5 text-[13px] text-[#444]">
          <Calendar size={14} className="text-[#aaa] flex-shrink-0" /> {reserva.fecha}
        </div>
        <div className="flex items-center gap-1.5 text-[13px] text-[#444]">
          <Mail size={14} className="text-[#aaa] flex-shrink-0" /> {reserva.email}
        </div>
        <div className="flex items-center gap-1.5 text-[13px] text-[#444]">
          <Clock size={14} className="text-[#aaa] flex-shrink-0" /> {reserva.hora}
        </div>
        <div className="flex items-center gap-1.5 text-[13px] text-[#444]">
          <Phone size={14} className="text-[#aaa] flex-shrink-0" /> {reserva.tel}
        </div>
        <div className="flex items-center gap-1.5 text-[13px] text-[#444]">
          {tipo === 'video' ? <Video size={14} className="text-[#aaa] flex-shrink-0" /> : <LayoutGrid size={14} className="text-[#aaa] flex-shrink-0" />}
          {tipoFieldLabel}
        </div>
      </div>

      {reserva.notas && (
        <div className="bg-[#fafaf8] rounded-lg px-3.5 py-2.5 text-[13px] text-[#555] mb-3">
          Notas: {reserva.notas}
        </div>
      )}

      {/* Actions */}
      <div className="flex items-center justify-between">
        <div className="flex gap-2">
          <button
            onClick={() => onConfirm(reserva.id)}
            className="flex items-center gap-1 bg-[#edf7f1] text-[#1B7A4A] border border-[#b8ddc8] rounded-[7px] px-3.5 py-1.5 text-[13px] font-medium cursor-pointer"
          >
            <Check size={13} strokeWidth={2.5} /> Marcar como hecho
          </button>
          {!isConfirmada && (
            <button className="flex items-center gap-1 bg-white text-[#888] border border-[#ddd] rounded-[7px] px-3.5 py-1.5 text-[13px] cursor-pointer">
              <X size={13} /> Cancelar
            </button>
          )}
        </div>
        <div className="flex">
          <button className="flex items-center gap-1 text-[#888] text-[13px] px-2.5 py-1.5 cursor-pointer hover:text-[#555]">
            <Edit3 size={13} /> Editar
          </button>
          <button
            onClick={() => onDelete(reserva.id)}
            className="flex items-center gap-1 text-[#c0392b] text-[13px] px-2.5 py-1.5 cursor-pointer hover:text-[#a93226]"
          >
            <Trash2 size={13} /> Eliminar
          </button>
        </div>
      </div>
    </div>
  );
}

// ─── AvailabilityTab ──────────────────────────────────────────────────────────

function AvailabilityTab({
  days, onDayChange, onCopyHours,
  selectedDuration, onSelectDuration,
  blockedDays, onRemoveBlocked,
  newBlockDate, onNewBlockDate,
  newBlockReason, onNewBlockReason,
  onAddBlocked, onSave,
}: {
  days: DayRow[];
  onDayChange: (id: string, field: Partial<DayRow>) => void;
  onCopyHours: (src: DayRow) => void;
  selectedDuration: string;
  onSelectDuration: (d: string) => void;
  blockedDays: BlockedDay[];
  onRemoveBlocked: (id: string) => void;
  newBlockDate: string;
  onNewBlockDate: (v: string) => void;
  newBlockReason: string;
  onNewBlockReason: (v: string) => void;
  onAddBlocked: () => void;
  onSave: () => void;
}) {
  const durations = ['30 min', '45 min', '1 hora', '1.5 hs', '2 horas'];

  return (
    <div>
      {/* Section 1: Days & hours */}
      <div className="bg-white border border-[#e8e8e4] rounded-xl p-6 mb-5">
        <div className="mb-5">
          <div className="text-[15px] font-semibold text-[#1a1a1a] mb-0.5">Días y horarios disponibles</div>
          <div className="text-[13px] text-[#888]">Configurá en qué días y en qué rango horario se pueden agendar visitas</div>
        </div>
        <div className="flex flex-col">
          {days.map((day, i) => (
            <div key={day.id} className={`flex items-center gap-4 py-3 ${i < days.length - 1 ? 'border-b border-[#f5f5f3]' : ''}`}>
              <div className="flex items-center gap-2.5 w-[130px] flex-shrink-0">
                <Toggle checked={day.enabled} onChange={v => onDayChange(day.id, { enabled: v })} />
                <span className={`text-[13.5px] font-medium ${day.enabled ? 'text-[#1a1a1a]' : 'text-[#bbb]'}`}>{day.label}</span>
              </div>
              <div className={`flex items-center gap-2.5 flex-1 transition-opacity ${day.enabled ? 'opacity-100' : 'opacity-0 pointer-events-none'}`}>
                <input type="time" value={day.desde} onChange={e => onDayChange(day.id, { desde: e.target.value })}
                  className="border border-[#e0e0dc] focus:border-[#1B7A4A] rounded-[7px] px-2.5 py-1.5 text-[13px] text-[#1a1a1a] outline-none w-[100px]"
                  style={{ fontFamily: 'inherit' }} />
                <span className="text-[#aaa] text-[13px]">hasta</span>
                <input type="time" value={day.hasta} onChange={e => onDayChange(day.id, { hasta: e.target.value })}
                  className="border border-[#e0e0dc] focus:border-[#1B7A4A] rounded-[7px] px-2.5 py-1.5 text-[13px] text-[#1a1a1a] outline-none w-[100px]"
                  style={{ fontFamily: 'inherit' }} />
                {i === 0 && (
                  <button
                    onClick={() => onCopyHours(day)}
                    className="flex items-center gap-1 text-[#aaa] hover:text-[#1B7A4A] hover:bg-[#edf7f1] text-[12px] px-2 py-1.5 rounded-md transition-colors ml-auto cursor-pointer border-none bg-transparent"
                  >
                    <Copy size={13} /> Copiar a todos
                  </button>
                )}
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Section 2: Duration */}
      <div className="bg-white border border-[#e8e8e4] rounded-xl p-6 mb-5">
        <div className="mb-5">
          <div className="text-[15px] font-semibold text-[#1a1a1a] mb-0.5">Duración de las consultas</div>
          <div className="text-[13px] text-[#888]">Definí cuánto dura cada visita y el tiempo de pausa entre turnos</div>
        </div>
        <div className="grid grid-cols-2 gap-4">
          <div>
            <div className="text-[13px] font-medium text-[#444] mb-1.5">Duración de la visita</div>
            <div className="flex gap-2 flex-wrap">
              {durations.map(d => (
                <button key={d} onClick={() => onSelectDuration(d)}
                  className={`border-[1.5px] rounded-lg px-4 py-2 text-[13.5px] cursor-pointer transition-all ${selectedDuration === d ? 'border-[#1B7A4A] bg-[#edf7f1] text-[#1B7A4A] font-medium' : 'border-[#e8e8e4] text-[#555] bg-white hover:border-[#bbb]'}`}>
                  {d}
                </button>
              ))}
            </div>
          </div>
          <div>
            <div className="text-[13px] font-medium text-[#444] mb-1.5">Pausa entre visitas</div>
            <select className="border border-[#e0e0dc] focus:border-[#1B7A4A] rounded-lg px-3 py-2.5 text-[13.5px] text-[#1a1a1a] outline-none bg-white w-full" style={{ fontFamily: 'inherit' }}>
              <option>Sin pausa</option>
              <option selected>15 minutos</option>
              <option>30 minutos</option>
              <option>45 minutos</option>
              <option>1 hora</option>
            </select>
          </div>
          <div>
            <div className="text-[13px] font-medium text-[#444] mb-1.5">Anticipación mínima para reservar</div>
            <select className="border border-[#e0e0dc] focus:border-[#1B7A4A] rounded-lg px-3 py-2.5 text-[13.5px] text-[#1a1a1a] outline-none bg-white w-full" style={{ fontFamily: 'inherit' }}>
              <option>Sin anticipación</option>
              <option>1 hora antes</option>
              <option selected>24 horas antes</option>
              <option>48 horas antes</option>
              <option>72 horas antes</option>
            </select>
          </div>
          <div>
            <div className="text-[13px] font-medium text-[#444] mb-1.5">Ventana de disponibilidad</div>
            <select className="border border-[#e0e0dc] focus:border-[#1B7A4A] rounded-lg px-3 py-2.5 text-[13.5px] text-[#1a1a1a] outline-none bg-white w-full" style={{ fontFamily: 'inherit' }}>
              <option>Próximos 7 días</option>
              <option>Próximas 2 semanas</option>
              <option selected>Próximo mes</option>
              <option>Próximos 2 meses</option>
              <option>Próximos 3 meses</option>
            </select>
          </div>
        </div>
      </div>

      {/* Section 3: Blocked days */}
      <div className="bg-white border border-[#e8e8e4] rounded-xl p-6 mb-5">
        <div className="mb-5">
          <div className="text-[15px] font-semibold text-[#1a1a1a] mb-0.5">Días bloqueados</div>
          <div className="text-[13px] text-[#888]">Agregá fechas específicas sin disponibilidad (feriados, vacaciones, etc.)</div>
        </div>
        <div className="flex flex-col gap-2 mb-4">
          {blockedDays.map(b => (
            <div key={b.id} className="flex items-center justify-between bg-[#fafaf8] border border-[#f0f0ec] rounded-lg px-3.5 py-2.5">
              <div className="flex items-center gap-2.5">
                <Calendar size={15} className="text-[#aaa]" />
                <div>
                  <div className="text-[13.5px] font-medium text-[#1a1a1a]">{b.date}</div>
                  <div className="text-[12.5px] text-[#888]">{b.reason}</div>
                </div>
              </div>
              <button onClick={() => onRemoveBlocked(b.id)} className="text-[#ddd] hover:text-[#c0392b] transition-colors p-1 rounded cursor-pointer border-none bg-transparent">
                <X size={16} />
              </button>
            </div>
          ))}
        </div>
        <div className="flex gap-2.5 items-center">
          <input type="date" value={newBlockDate} onChange={e => onNewBlockDate(e.target.value)}
            className="border border-[#e0e0dc] focus:border-[#1B7A4A] rounded-lg px-3 py-2.5 text-[13.5px] text-[#1a1a1a] outline-none w-40"
            style={{ fontFamily: 'inherit' }} />
          <input type="text" value={newBlockReason} onChange={e => onNewBlockReason(e.target.value)}
            placeholder="Motivo (opcional)"
            className="flex-1 border border-[#e0e0dc] focus:border-[#1B7A4A] rounded-lg px-3 py-2.5 text-[13.5px] text-[#1a1a1a] outline-none"
            style={{ fontFamily: 'inherit' }} />
          <button onClick={onAddBlocked}
            className="flex items-center gap-1.5 border border-[#e8e8e4] rounded-lg px-3.5 py-2.5 text-[13px] text-[#555] hover:border-[#bbb] hover:bg-[#f5f5f3] transition-all cursor-pointer bg-white">
            <Plus size={13} strokeWidth={2.5} /> Agregar
          </button>
        </div>
      </div>

      {/* Save bar */}
      <div className="bg-white border border-[#e8e8e4] rounded-[10px] px-5 py-3.5 flex items-center justify-between mt-2">
        <div className="flex items-center gap-2 text-[13px] text-[#888]">
          <CheckCircle size={15} className="text-[#1B7A4A]" />
          Los cambios se sincronizan automáticamente con Google Calendar
        </div>
        <div className="flex gap-2.5">
          <button className="border border-[#ddd] rounded-lg px-4 py-2.5 text-[13.5px] font-medium bg-white hover:border-[#bbb] transition-colors cursor-pointer">
            Descartar cambios
          </button>
          <button onClick={onSave}
            className="flex items-center gap-1.5 bg-[#1B7A4A] hover:bg-[#155f3a] text-white rounded-lg px-4 py-2.5 text-[13.5px] font-medium transition-colors cursor-pointer">
            <Check size={14} strokeWidth={2.5} /> Guardar disponibilidad
          </button>
        </div>
      </div>
    </div>
  );
}

// ─── Shared modal pieces ──────────────────────────────────────────────────────

function ModalOverlay({ children, onClose }: { children: React.ReactNode; onClose: () => void }) {
  return (
    <div
      className="fixed inset-0 bg-black/40 z-[100] flex items-center justify-center"
      onClick={e => { if (e.target === e.currentTarget) onClose(); }}
    >
      {children}
    </div>
  );
}

function ModalHeader({ title, subtitle, onClose }: { title: string; subtitle?: string; onClose: () => void }) {
  return (
    <div className="flex items-start justify-between mb-6">
      <div>
        <h2 className="text-[18px] font-semibold text-[#1a1a1a]">{title}</h2>
        {subtitle && <p className="text-[13px] text-[#888] mt-1">{subtitle}</p>}
      </div>
      <button onClick={onClose} className="text-[#bbb] hover:text-[#666] transition-colors p-1 rounded-md cursor-pointer border-none bg-transparent">
        <X size={20} />
      </button>
    </div>
  );
}
