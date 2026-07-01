import React, { useState } from 'react';
import { MapPin, ChevronRight } from 'lucide-react';

// ─── Datos ────────────────────────────────────────────────────────────────────

const REGIONES_INIT: Record<string, string[]> = {
  'Antofagasta':       ['Antofagasta', 'Calama', 'María Elena', 'Mejillones', 'Ollagüe', 'San Pedro de Atacama', 'Sierra Gorda', 'Taltal', 'Tocopilla'],
  'Arica y Parinacota':['Arica', 'Camarones', 'General Lagos', 'Putre'],
  'Atacama':           ['Alto del Carmen', 'Caldera', 'Chañaral', 'Copiapó', 'Diego de Almagro', 'Freirina', 'Huasco', 'Tierra Amarilla', 'Vallenar'],
  'Aysén':             ['Aysén', 'Chile Chico', 'Cisnes', 'Cochrane', 'Coyhaique', 'Guaitecas', 'Lago Verde', 'Río Ibáñez', 'Tortel'],
  'Biobío':            ['Arauco', 'Cabrero', 'Cañete', 'Concepción', 'Coronel', 'Curanilahue', 'Hualqui', 'Laja', 'Lebu', 'Los Ángeles', 'Lota', 'Mulchén', 'Nacimiento', 'Penco', 'San Pedro de la Paz', 'Santa Bárbara', 'Talcahuano', 'Tomé', 'Yumbel'],
  'Coquimbo':          ['Andacollo', 'Canela', 'Combarbalá', 'Coquimbo', 'Illapel', 'La Higuera', 'La Serena', 'Los Vilos', 'Monte Patria', 'Ovalle', 'Paihuano', 'Salamanca', 'Vicuña'],
  'La Araucanía':      ['Angol', 'Carahue', 'Cholchol', 'Collipulli', 'Cunco', 'Curacautín', 'Freire', 'Galvarino', 'Gorbea', 'Lautaro', 'Loncoche', 'Nueva Imperial', 'Pucón', 'Temuco', 'Traiguén', 'Victoria', 'Villarrica'],
  'Libertador Bernardo O\'Higgins': ['Chimbarongo', 'Codegua', 'Graneros', 'Las Cabras', 'Litueche', 'Machalí', 'Nancagua', 'Pichilemu', 'Rancagua', 'Rengo', 'San Fernando', 'Santa Cruz'],
  'Los Lagos':         ['Ancud', 'Calbuco', 'Castro', 'Chaitén', 'Chonchi', 'Dalcahue', 'Fresia', 'Frutillar', 'Futaleufú', 'Llanquihue', 'Los Muermos', 'Maullín', 'Osorno', 'Palena', 'Puerto Montt', 'Puerto Varas', 'Purranque', 'Puyehue', 'Quellón', 'Río Negro'],
  'Los Ríos':          ['Corral', 'Futrono', 'La Unión', 'Lago Ranco', 'Lanco', 'Los Lagos', 'Paillaco', 'Panguipulli', 'Río Bueno', 'Valdivia'],
  'Magallanes':        ['Cabo de Hornos', 'Laguna Blanca', 'Natales', 'Punta Arenas', 'Río Verde', 'San Gregorio', 'Timaukel', 'Torres del Paine'],
  'Maule':             ['Cauquenes', 'Colbún', 'Constitución', 'Curicó', 'Linares', 'Longaví', 'Molina', 'Parral', 'San Clemente', 'San Javier', 'Talca', 'Teno', 'Villa Alegre'],
  'Metropolitana':     ['Buin', 'Colina', 'El Monte', 'Huechuraba', 'Isla de Maipo', 'La Florida', 'La Reina', 'Lampa', 'Las Condes', 'Lo Barnechea', 'Maipú', 'Melipilla', 'Ñuñoa', 'Paine', 'Peñalolén', 'Providencia', 'Pudahuel', 'Puente Alto', 'Quilicura', 'San Bernardo', 'Santiago', 'Vitacura'],
  'Ñuble':             ['Bulnes', 'Chillán', 'Chillán Viejo', 'Cobquecura', 'Coelemu', 'Coihueco', 'El Carmen', 'Ninhue', 'Pemuco', 'Pinto', 'Portezuelo', 'Quillón', 'Quirihue', 'Ránquil', 'San Carlos', 'San Fabián', 'San Ignacio', 'San Nicolás', 'Treguaco', 'Yungay'],
  'Tarapacá':          ['Alto Hospicio', 'Camiña', 'Colchane', 'Huara', 'Iquique', 'Pica', 'Pozo Almonte'],
  'Valparaíso':        ['Algarrobo', 'Cabildo', 'Calera', 'Cartagena', 'Casablanca', 'Concón', 'El Quisco', 'El Tabo', 'La Cruz', 'La Ligua', 'Limache', 'Llaillay', 'Los Andes', 'Nogales', 'Olmué', 'Papudo', 'Petorca', 'Quillota', 'Quilpué', 'Quintero', 'San Antonio', 'San Felipe', 'Valparaíso', 'Villa Alemana', 'Viña del Mar', 'Zapallar'],
};

// ─── Component ────────────────────────────────────────────────────────────────

export function AdminRegionesView() {
  const [data, setData] = useState<Record<string, string[]>>(REGIONES_INIT);
  const [selectedRegion, setSelectedRegion] = useState<string>('Arica y Parinacota');

  const [addingRegion, setAddingRegion] = useState(false);
  const [newRegion, setNewRegion] = useState('');

  const [addingComuna, setAddingComuna] = useState(false);
  const [newComuna, setNewComuna] = useState('');

  const regiones = Object.keys(data).sort((a, b) => a.localeCompare(b, 'es'));
  const comunas = selectedRegion ? (data[selectedRegion] ?? []) : [];

  const handleAddRegion = () => {
    const nombre = newRegion.trim();
    if (!nombre || data[nombre]) return;
    setData(prev => ({ ...prev, [nombre]: [] }));
    setSelectedRegion(nombre);
    setNewRegion('');
    setAddingRegion(false);
  };

  const handleAddComuna = () => {
    const nombre = newComuna.trim();
    if (!nombre || !selectedRegion) return;
    setData(prev => ({ ...prev, [selectedRegion]: [...(prev[selectedRegion] ?? []), nombre] }));
    setNewComuna('');
    setAddingComuna(false);
  };

  const inputStyle: React.CSSProperties = {
    border: '1px solid #E5E5E5',
    borderRadius: '8px',
    padding: '6px 10px',
    fontFamily: 'var(--font-body)',
    fontSize: '13px',
    color: '#0A0A0A',
    backgroundColor: '#FAFAFA',
    outline: 'none',
    flex: 1,
    minWidth: 0,
  };

  const actionBtn = (onClick: () => void, label: string): React.ReactElement => (
    <button
      onClick={onClick}
      style={{ fontFamily: 'var(--font-body)', fontSize: '13px', color: '#6B7280', cursor: 'pointer', background: 'none', border: 'none', padding: '0 4px', whiteSpace: 'nowrap' }}
      onMouseEnter={e => (e.currentTarget.style.color = '#0A0A0A')}
      onMouseLeave={e => (e.currentTarget.style.color = '#6B7280')}
    >
      {label}
    </button>
  );

  return (
    <div className="p-6">
      {/* Header */}
      <div className="mb-6">
        <h1 style={{ fontFamily: 'var(--font-heading)', fontSize: 'var(--font-size-h2)', fontWeight: 500, color: '#0A0A0A', lineHeight: 'var(--line-height-heading)' }}>
          Regiones y Comunas
        </h1>
        <p style={{ fontFamily: 'var(--font-body)', fontSize: 'var(--font-size-body-base)', color: '#6B6B6B', marginTop: '4px' }}>
          Gestiona las regiones y sus comunas disponibles en el marketplace
        </p>
      </div>

      {/* Two-panel layout */}
      <div className="flex rounded-2xl overflow-hidden" style={{ border: '1px solid #E5E5E5', height: '620px', backgroundColor: '#FFFFFF' }}>

        {/* ── Panel izquierdo: Regiones ── */}
        <div className="flex flex-col flex-shrink-0" style={{ width: '320px', borderRight: '1px solid #E5E5E5', overflow: 'hidden' }}>
          {/* Header */}
          <div className="flex items-center justify-between px-5 py-4 flex-shrink-0" style={{ borderBottom: '1px solid #E5E5E5' }}>
            <span style={{ fontFamily: 'var(--font-body)', fontSize: '14px', fontWeight: 600, color: '#0A0A0A' }}>Regiones</span>
            <button
              onClick={() => { setAddingRegion(true); setNewRegion(''); }}
              style={{ fontFamily: 'var(--font-body)', fontSize: '13px', color: '#006B4E', fontWeight: 500, background: 'none', border: 'none', cursor: 'pointer' }}
              onMouseEnter={e => (e.currentTarget.style.color = '#01533E')}
              onMouseLeave={e => (e.currentTarget.style.color = '#006B4E')}
            >
              + Agregar
            </button>
          </div>

          {/* Add region form */}
          {addingRegion && (
            <div className="flex items-center gap-2 px-4 py-3 flex-shrink-0" style={{ borderBottom: '1px solid #E5E5E5', backgroundColor: '#FAFAFA' }}>
              <input
                autoFocus
                value={newRegion}
                onChange={e => setNewRegion(e.target.value)}
                onKeyDown={e => { if (e.key === 'Enter') handleAddRegion(); if (e.key === 'Escape') setAddingRegion(false); }}
                placeholder="Nombre de la región"
                style={{ ...inputStyle }}
              />
              {actionBtn(handleAddRegion, 'Guardar')}
              {actionBtn(() => setAddingRegion(false), 'Cancelar')}
            </div>
          )}

          {/* List */}
          <div className="overflow-y-auto flex-1">
            {regiones.map(region => {
              const isSelected = region === selectedRegion;
              return (
                <button
                  key={region}
                  onClick={() => { setSelectedRegion(region); setAddingComuna(false); }}
                  className="w-full flex items-center gap-3 px-5 py-3.5 text-left transition-colors"
                  style={{
                    backgroundColor: isSelected ? '#F3F4F6' : 'transparent',
                    borderBottom: '1px solid #F5F5F5',
                    fontFamily: 'var(--font-body)',
                    fontSize: '14px',
                    fontWeight: isSelected ? 600 : 400,
                    color: '#0A0A0A',
                  }}
                  onMouseEnter={e => { if (!isSelected) e.currentTarget.style.backgroundColor = '#F9FAFB'; }}
                  onMouseLeave={e => { if (!isSelected) e.currentTarget.style.backgroundColor = 'transparent'; }}
                >
                  <MapPin className="w-4 h-4 flex-shrink-0" style={{ color: isSelected ? '#006B4E' : '#9CA3AF' }} />
                  <span className="flex-1 truncate">{region}</span>
                  {isSelected && <ChevronRight className="w-4 h-4 flex-shrink-0" style={{ color: '#9CA3AF' }} />}
                </button>
              );
            })}
          </div>
        </div>

        {/* ── Panel derecho: Comunas ── */}
        <div className="flex flex-col flex-1">
          {/* Header */}
          <div className="flex items-center justify-between px-6 py-4 flex-shrink-0" style={{ borderBottom: '1px solid #E5E5E5' }}>
            <span style={{ fontFamily: 'var(--font-body)', fontSize: '14px', fontWeight: 600, color: '#0A0A0A' }}>
              {selectedRegion ? `Comunas de ${selectedRegion}` : 'Comunas'}
            </span>
            {selectedRegion && (
              <button
                onClick={() => { setAddingComuna(true); setNewComuna(''); }}
                style={{ fontFamily: 'var(--font-body)', fontSize: '13px', color: '#006B4E', fontWeight: 500, background: 'none', border: 'none', cursor: 'pointer' }}
                onMouseEnter={e => (e.currentTarget.style.color = '#01533E')}
                onMouseLeave={e => (e.currentTarget.style.color = '#006B4E')}
              >
                + Agregar
              </button>
            )}
          </div>

          {/* Add comuna form */}
          {addingComuna && (
            <div className="flex items-center gap-2 px-6 py-3 flex-shrink-0" style={{ borderBottom: '1px solid #E5E5E5', backgroundColor: '#FAFAFA' }}>
              <input
                autoFocus
                value={newComuna}
                onChange={e => setNewComuna(e.target.value)}
                onKeyDown={e => { if (e.key === 'Enter') handleAddComuna(); if (e.key === 'Escape') setAddingComuna(false); }}
                placeholder="Nombre de la comuna"
                style={{ ...inputStyle }}
              />
              {actionBtn(handleAddComuna, 'Guardar')}
              {actionBtn(() => setAddingComuna(false), 'Cancelar')}
            </div>
          )}

          {/* List */}
          <div className="overflow-y-auto flex-1">
            {comunas.length === 0 ? (
              <div className="flex flex-col items-center justify-center h-full text-center px-8">
                <MapPin className="w-10 h-10 mb-3" style={{ color: '#E5E5E5' }} />
                <p style={{ fontFamily: 'var(--font-body)', fontSize: '14px', fontWeight: 500, color: '#0A0A0A', marginBottom: '4px' }}>Sin comunas</p>
                <p style={{ fontFamily: 'var(--font-body)', fontSize: '13px', color: '#9CA3AF' }}>Agrega comunas a esta región usando el botón "+ Agregar".</p>
              </div>
            ) : (
              comunas.map((comuna, i) => (
                <div
                  key={i}
                  className="px-6 py-3.5 transition-colors"
                  style={{ borderBottom: '1px solid #F5F5F5', fontFamily: 'var(--font-body)', fontSize: '14px', color: '#0A0A0A' }}
                  onMouseEnter={e => (e.currentTarget.style.backgroundColor = '#FAFAFA')}
                  onMouseLeave={e => (e.currentTarget.style.backgroundColor = 'transparent')}
                >
                  {comuna}
                </div>
              ))
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
