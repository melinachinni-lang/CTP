import React, { useState, useEffect, useRef } from 'react';
import { ChevronDown, AlertCircle, CloudOff } from 'lucide-react';
import { getAllProyectos } from '@/app/data/proyectosData';
import logo from 'figma:asset/a4719ce43ce52ee49df30a2a5c090c8a8b743667.png';
import heroBackground from 'figma:asset/46be9646c60608d21a829a86b189efb4cfc6cbbc.png';

interface ParcelasPageErrorProps {
  onNavigate: (screen: string, parcelaId?: number, data?: string) => void;
}

export function ParcelasPageError({ onNavigate }: ParcelasPageErrorProps) {
  const [showMap, setShowMap] = useState(false);
  const [sortBy, setSortBy] = useState('relevancia');
  const proyectosCarouselRef = useRef<HTMLDivElement>(null);
  
  // Estados para filtros del buscador hero
  const [heroFilters, setHeroFilters] = useState({
    ubicacion: '',
    tipo: '',
    superficieMin: '',
    superficieMax: '',
    condicion: '',
    precioMin: '',
    precioMax: ''
  });
  
  // Estado para controlar si se aplicaron filtros
  const [filtersApplied, setFiltersApplied] = useState(false);
  
  // Estados para calculadora de presupuesto
  const [showBudgetCalculator, setShowBudgetCalculator] = useState(false);
  const [budget, setBudget] = useState('');
  const [calcZone, setCalcZone] = useState('');
  const [calcParcelType, setCalcParcelType] = useState('');
  const [openDropdown, setOpenDropdown] = useState<string | null>(null);
  
  // Estado para filtros activos (chips)
  const [activeFilters, setActiveFilters] = useState<{
    ubicacion?: string;
    precioMin?: string;
    precioMax?: string;
    superficieMin?: string;
    superficieMax?: string;
    tipos: string[];
    destacadas: boolean;
    nuevas: boolean;
  }>({
    tipos: ['Agrícola', 'Forestal'],
    destacadas: true,
    nuevas: false,
    ubicacion: 'Aysén',
    precioMin: '$50.000.000',
    superficieMax: '10.000'
  });

  // Estados para búsqueda inteligente
  const [isSmartSearchExpanded, setIsSmartSearchExpanded] = useState(false);
  const [smartSearchValue, setSmartSearchValue] = useState('');
  const [selectedBadges, setSelectedBadges] = useState<string[]>([]);

  // Cerrar dropdown cuando se hace clic fuera
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      const target = event.target as HTMLElement;
      if (!target.closest('.dropdown-container')) {
        setOpenDropdown(null);
      }
    };

    if (openDropdown) {
      document.addEventListener('mousedown', handleClickOutside);
    }

    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [openDropdown]);

  // Función para eliminar un filtro
  const proyectos = getAllProyectos();

  const removeFilter = (filterType: string, value?: string) => {
    setActiveFilters(prev => {
      const newFilters = { ...prev };
      
      switch(filterType) {
        case 'ubicacion':
          delete newFilters.ubicacion;
          break;
        case 'precioMin':
          delete newFilters.precioMin;
          break;
        case 'precioMax':
          delete newFilters.precioMax;
          break;
        case 'superficieMin':
          delete newFilters.superficieMin;
          break;
        case 'superficieMax':
          delete newFilters.superficieMax;
          break;
        case 'tipo':
          if (value) {
            newFilters.tipos = newFilters.tipos.filter(t => t !== value);
          }
          break;
        case 'destacadas':
          newFilters.destacadas = false;
          break;
        case 'nuevas':
          newFilters.nuevas = false;
          break;
      }
      
      return newFilters;
    });
  };

  return (
    <div style={{ 
      minHeight: '100vh', 
      backgroundColor: '#FFFFFF',
      fontFamily: 'var(--font-body)'
    }}>
      {/* Header/Navbar */}
      <header style={{
        borderBottom: '1px solid #CDD8DE',
        backgroundColor: '#FFFFFF',
        position: 'sticky',
        top: 0,
        zIndex: 50
      }}>
        <div style={{
          maxWidth: '1440px',
          margin: '0 auto',
          padding: '20px 80px',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between'
        }}>
          {/* Logo */}
          <button
            onClick={() => onNavigate('home')}
            style={{
              display: 'flex',
              alignItems: 'center',
              gap: '12px',
              background: 'none',
              border: 'none',
              cursor: 'pointer',
              padding: 0
            }}
          >
            <img 
              src={logo} 
              alt="CompraTuParcela" 
              style={{ height: '32px', width: 'auto' }}
            />
          </button>

          {/* Navigation */}
          <nav style={{ display: 'flex', gap: '40px', alignItems: 'center' }}>
            <button
              onClick={() => onNavigate('parcelas')}
              style={{
                fontFamily: 'var(--font-body)',
                fontSize: '16px',
                fontWeight: 'var(--font-weight-medium)',
                color: '#006B4E',
                background: 'none',
                border: 'none',
                cursor: 'pointer',
                padding: '8px 0',
                borderBottom: '2px solid #006B4E'
              }}
            >
              Parcelas
            </button>
            <button
              onClick={() => onNavigate('inmobiliarias')}
              style={{
                fontFamily: 'var(--font-body)',
                fontSize: '16px',
                fontWeight: 'var(--font-weight-regular)',
                color: '#0A0A0A',
                background: 'none',
                border: 'none',
                cursor: 'pointer',
                padding: '8px 0',
                transition: 'color 0.2s'
              }}
              onMouseEnter={(e) => e.currentTarget.style.color = '#006B4E'}
              onMouseLeave={(e) => e.currentTarget.style.color = '#0A0A0A'}
            >
              Inmobiliarias
            </button>
            <button
              onClick={() => onNavigate('brokers')}
              style={{
                fontFamily: 'var(--font-body)',
                fontSize: '16px',
                fontWeight: 'var(--font-weight-regular)',
                color: '#0A0A0A',
                background: 'none',
                border: 'none',
                cursor: 'pointer',
                padding: '8px 0',
                transition: 'color 0.2s'
              }}
              onMouseEnter={(e) => e.currentTarget.style.color = '#006B4E'}
              onMouseLeave={(e) => e.currentTarget.style.color = '#0A0A0A'}
            >
              Brokers
            </button>
            <button
              onClick={() => onNavigate('como-funciona-loading')}
              style={{
                fontFamily: 'var(--font-body)',
                fontSize: '16px',
                fontWeight: 'var(--font-weight-regular)',
                color: '#0A0A0A',
                background: 'none',
                border: 'none',
                cursor: 'pointer',
                padding: '8px 0',
                transition: 'color 0.2s'
              }}
              onMouseEnter={(e) => e.currentTarget.style.color = '#006B4E'}
              onMouseLeave={(e) => e.currentTarget.style.color = '#0A0A0A'}
            >
              Cómo funciona
            </button>
          </nav>

          {/* Auth Buttons */}
          <div style={{ display: 'flex', gap: '12px', alignItems: 'center' }}>
            <button
              onClick={() => onNavigate('login')}
              style={{
                fontFamily: 'var(--font-body)',
                fontSize: '16px',
                fontWeight: 'var(--font-weight-medium)',
                color: '#0A0A0A',
                background: 'none',
                border: 'none',
                cursor: 'pointer',
                padding: '10px 24px',
                transition: 'color 0.2s'
              }}
              onMouseEnter={(e) => e.currentTarget.style.color = '#006B4E'}
              onMouseLeave={(e) => e.currentTarget.style.color = '#0A0A0A'}
            >
              Ingresar
            </button>
            <button
              onClick={() => onNavigate('crear-cuenta')}
              style={{
                fontFamily: 'var(--font-body)',
                fontSize: '16px',
                fontWeight: 'var(--font-weight-medium)',
                color: '#FFFFFF',
                backgroundColor: '#006B4E',
                border: 'none',
                borderRadius: '200px',
                cursor: 'pointer',
                padding: '10px 24px',
                transition: 'background-color 0.2s'
              }}
              onMouseEnter={(e) => e.currentTarget.style.backgroundColor = '#01533E'}
              onMouseLeave={(e) => e.currentTarget.style.backgroundColor = '#006B4E'}
            >
              Crear cuenta
            </button>
          </div>
        </div>
      </header>

      {/* Hero Section with Search */}
      <div style={{
        backgroundImage: `url(${heroBackground})`,
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        position: 'relative'
      }}>
        {/* Overlay */}
        <div style={{
          position: 'absolute',
          inset: 0,
          backgroundColor: 'rgba(0, 0, 0, 0.4)'
        }} />

        {/* Content */}
        <div style={{
          position: 'relative',
          maxWidth: '1440px',
          margin: '0 auto',
          padding: '80px 80px 60px',
        }}>
          <h1 style={{
            fontFamily: 'var(--font-heading)',
            fontSize: '48px',
            fontWeight: 'var(--font-weight-semibold)',
            color: '#FFFFFF',
            marginBottom: '16px',
            textAlign: 'center',
            lineHeight: 'var(--line-height-heading)'
          }}>
            Encuentra tu parcela ideal
          </h1>
          <p style={{
            fontFamily: 'var(--font-body)',
            fontSize: '20px',
            fontWeight: 'var(--font-weight-regular)',
            color: '#FFFFFF',
            marginBottom: '40px',
            textAlign: 'center',
            lineHeight: 'var(--line-height-body)'
          }}>
            Explora cientos de opciones en todo Chile
          </p>

          {/* Search Box */}
          <div style={{
            backgroundColor: '#FFFFFF',
            borderRadius: '12px',
            padding: '24px',
            boxShadow: '0 4px 20px rgba(0, 0, 0, 0.1)',
            maxWidth: '900px',
            margin: '0 auto'
          }}>
            <div style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(3, 1fr)',
              gap: '16px',
              marginBottom: '16px'
            }}>
              <div>
                <label style={{
                  fontFamily: 'var(--font-body)',
                  fontSize: '14px',
                  fontWeight: 'var(--font-weight-medium)',
                  color: '#0A0A0A',
                  display: 'block',
                  marginBottom: '8px'
                }}>
                  Ubicación
                </label>
                <input
                  type="text"
                  placeholder="Región, ciudad..."
                  value={heroFilters.ubicacion}
                  onChange={(e) => setHeroFilters({ ...heroFilters, ubicacion: e.target.value })}
                  style={{
                    width: '100%',
                    padding: '10px 12px',
                    border: '1px solid #CDD8DE',
                    borderRadius: '8px',
                    fontFamily: 'var(--font-body)',
                    fontSize: '16px',
                    color: '#0A0A0A'
                  }}
                />
              </div>

              <div>
                <label style={{
                  fontFamily: 'var(--font-body)',
                  fontSize: '14px',
                  fontWeight: 'var(--font-weight-medium)',
                  color: '#0A0A0A',
                  display: 'block',
                  marginBottom: '8px'
                }}>
                  Tipo de parcela
                </label>
                <select
                  value={heroFilters.tipo}
                  onChange={(e) => setHeroFilters({ ...heroFilters, tipo: e.target.value })}
                  style={{
                    width: '100%',
                    padding: '10px 12px',
                    border: '1px solid #CDD8DE',
                    borderRadius: '8px',
                    fontFamily: 'var(--font-body)',
                    fontSize: '16px',
                    color: '#0A0A0A',
                    backgroundColor: '#FFFFFF'
                  }}
                >
                  <option value="">Todos los tipos</option>
                  <option value="agricola">Agrícola</option>
                  <option value="forestal">Forestal</option>
                  <option value="recreacional">Recreacional</option>
                </select>
              </div>

              <div>
                <label style={{
                  fontFamily: 'var(--font-body)',
                  fontSize: '14px',
                  fontWeight: 'var(--font-weight-medium)',
                  color: '#0A0A0A',
                  display: 'block',
                  marginBottom: '8px'
                }}>
                  Precio máx.
                </label>
                <input
                  type="text"
                  placeholder="$100.000.000"
                  value={heroFilters.precioMax}
                  onChange={(e) => setHeroFilters({ ...heroFilters, precioMax: e.target.value })}
                  style={{
                    width: '100%',
                    padding: '10px 12px',
                    border: '1px solid #CDD8DE',
                    borderRadius: '8px',
                    fontFamily: 'var(--font-body)',
                    fontSize: '16px',
                    color: '#0A0A0A'
                  }}
                />
              </div>
            </div>

            <button
              style={{
                width: '100%',
                padding: '12px',
                backgroundColor: '#006B4E',
                color: '#FFFFFF',
                border: 'none',
                borderRadius: '8px',
                fontFamily: 'var(--font-body)',
                fontSize: '16px',
                fontWeight: 'var(--font-weight-medium)',
                cursor: 'pointer',
                transition: 'background-color 0.2s'
              }}
              onMouseEnter={(e) => e.currentTarget.style.backgroundColor = '#01533E'}
              onMouseLeave={(e) => e.currentTarget.style.backgroundColor = '#006B4E'}
            >
              Buscar parcelas
            </button>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div style={{
        maxWidth: '1440px',
        margin: '0 auto',
        padding: '40px 80px'
      }}>
        {/* Filtros y orden */}
        <div style={{
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          marginBottom: '32px',
          paddingBottom: '24px',
          borderBottom: '1px solid #CDD8DE'
        }}>
          <div style={{
            display: 'flex',
            gap: '8px',
            flexWrap: 'wrap',
            alignItems: 'center'
          }}>
            {/* Filtros activos como chips */}
            {activeFilters.ubicacion && (
              <div style={{
                display: 'flex',
                alignItems: 'center',
                gap: '8px',
                padding: '6px 12px',
                backgroundColor: '#F5F5F5',
                borderRadius: '20px',
                fontFamily: 'var(--font-body)',
                fontSize: '14px',
                color: '#0A0A0A'
              }}>
                <span>{activeFilters.ubicacion}</span>
                <button
                  onClick={() => removeFilter('ubicacion')}
                  style={{
                    background: 'none',
                    border: 'none',
                    cursor: 'pointer',
                    padding: 0,
                    display: 'flex',
                    alignItems: 'center'
                  }}
                >
                  ×
                </button>
              </div>
            )}
            
            {activeFilters.tipos.map(tipo => (
              <div key={tipo} style={{
                display: 'flex',
                alignItems: 'center',
                gap: '8px',
                padding: '6px 12px',
                backgroundColor: '#F5F5F5',
                borderRadius: '20px',
                fontFamily: 'var(--font-body)',
                fontSize: '14px',
                color: '#0A0A0A'
              }}>
                <span>{tipo}</span>
                <button
                  onClick={() => removeFilter('tipo', tipo)}
                  style={{
                    background: 'none',
                    border: 'none',
                    cursor: 'pointer',
                    padding: 0,
                    display: 'flex',
                    alignItems: 'center'
                  }}
                >
                  ×
                </button>
              </div>
            ))}
          </div>

          <div style={{ display: 'flex', gap: '12px', alignItems: 'center' }}>
            <span style={{
              fontFamily: 'var(--font-body)',
              fontSize: '14px',
              color: '#0A0A0A'
            }}>
              Ordenar por:
            </span>
            <select
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value)}
              style={{
                padding: '8px 12px',
                border: '1px solid #CDD8DE',
                borderRadius: '8px',
                fontFamily: 'var(--font-body)',
                fontSize: '14px',
                color: '#0A0A0A',
                backgroundColor: '#FFFFFF',
                cursor: 'pointer'
              }}
            >
              <option value="relevancia">Relevancia</option>
              <option value="precio-asc">Precio: menor a mayor</option>
              <option value="precio-desc">Precio: mayor a menor</option>
              <option value="superficie-desc">Superficie: mayor a menor</option>
            </select>
          </div>
        </div>

        {/* Error Component - Centered */}
        <div style={{
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center',
          minHeight: '400px',
          padding: '60px 20px'
        }}>
          {/* Icon */}
          <div style={{
            marginBottom: '24px',
            width: '80px',
            height: '80px',
            borderRadius: '50%',
            backgroundColor: '#F3F4F6',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center'
          }}>
            <CloudOff 
              size={40} 
              style={{ color: '#6B7280', strokeWidth: 1.5 }}
            />
          </div>

          {/* Title */}
          <h2 style={{
            fontFamily: 'var(--font-heading)',
            fontSize: '24px',
            fontWeight: 'var(--font-weight-semibold)',
            color: '#0A0A0A',
            marginBottom: '12px',
            textAlign: 'center'
          }}>
            No pudimos cargar las parcelas
          </h2>

          {/* Description */}
          <p style={{
            fontFamily: 'var(--font-body)',
            fontSize: '16px',
            fontWeight: 'var(--font-weight-regular)',
            color: '#6B7280',
            marginBottom: '32px',
            textAlign: 'center',
            maxWidth: '500px',
            lineHeight: 'var(--line-height-body)'
          }}>
            Estamos teniendo un problema temporal al obtener los datos. Podés intentar nuevamente.
          </p>

          {/* Retry Button */}
          <button
            onClick={() => onNavigate('parcelas')}
            style={{
              padding: '12px 32px',
              backgroundColor: '#006B4E',
              color: '#FFFFFF',
              border: 'none',
              borderRadius: '8px',
              fontFamily: 'var(--font-body)',
              fontSize: '16px',
              fontWeight: 'var(--font-weight-medium)',
              cursor: 'pointer',
              transition: 'background-color 0.2s'
            }}
            onMouseEnter={(e) => e.currentTarget.style.backgroundColor = '#01533E'}
            onMouseLeave={(e) => e.currentTarget.style.backgroundColor = '#006B4E'}
          >
            Reintentar
          </button>
        </div>
      </div>

      {/* Footer */}
      <footer style={{
        marginTop: '80px',
        padding: '40px 80px',
        backgroundColor: '#1E2116',
        color: '#FFFFFF'
      }}>
        <div style={{
          maxWidth: '1440px',
          margin: '0 auto',
          display: 'grid',
          gridTemplateColumns: 'repeat(4, 1fr)',
          gap: '40px'
        }}>
          <div>
            <h3 style={{
              fontFamily: 'var(--font-heading)',
              fontSize: '16px',
              fontWeight: 'var(--font-weight-semibold)',
              marginBottom: '16px'
            }}>
              CompraTuParcela
            </h3>
            <p style={{
              fontFamily: 'var(--font-body)',
              fontSize: '14px',
              color: '#CDD8DE',
              lineHeight: 'var(--line-height-body)'
            }}>
              La plataforma que conecta compradores con las mejores oportunidades en parcelas.
            </p>
          </div>
          <div>
            <h4 style={{
              fontFamily: 'var(--font-heading)',
              fontSize: '14px',
              fontWeight: 'var(--font-weight-semibold)',
              marginBottom: '12px'
            }}>
              Explorar
            </h4>
            <ul style={{ listStyle: 'none', padding: 0 }}>
              <li style={{ marginBottom: '8px' }}>
                <button
                  onClick={() => onNavigate('parcelas')}
                  style={{
                    background: 'none',
                    border: 'none',
                    color: '#CDD8DE',
                    fontFamily: 'var(--font-body)',
                    fontSize: '14px',
                    cursor: 'pointer',
                    padding: 0
                  }}
                >
                  Parcelas
                </button>
              </li>
              <li style={{ marginBottom: '8px' }}>
                <button
                  onClick={() => onNavigate('inmobiliarias')}
                  style={{
                    background: 'none',
                    border: 'none',
                    color: '#CDD8DE',
                    fontFamily: 'var(--font-body)',
                    fontSize: '14px',
                    cursor: 'pointer',
                    padding: 0
                  }}
                >
                  Inmobiliarias
                </button>
              </li>
            </ul>
          </div>
          <div>
            <h4 style={{
              fontFamily: 'var(--font-heading)',
              fontSize: '14px',
              fontWeight: 'var(--font-weight-semibold)',
              marginBottom: '12px'
            }}>
              Información
            </h4>
            <ul style={{ listStyle: 'none', padding: 0 }}>
              <li style={{ marginBottom: '8px' }}>
                <button
                  onClick={() => onNavigate('como-funciona-loading')}
                  style={{
                    background: 'none',
                    border: 'none',
                    color: '#CDD8DE',
                    fontFamily: 'var(--font-body)',
                    fontSize: '14px',
                    cursor: 'pointer',
                    padding: 0
                  }}
                >
                  Cómo funciona
                </button>
              </li>
            </ul>
          </div>
          <div>
            <h4 style={{
              fontFamily: 'var(--font-heading)',
              fontSize: '14px',
              fontWeight: 'var(--font-weight-semibold)',
              marginBottom: '12px'
            }}>
              Contacto
            </h4>
            <p style={{
              fontFamily: 'var(--font-body)',
              fontSize: '14px',
              color: '#CDD8DE'
            }}>
              info@compratuparcela.cl
            </p>
          </div>
        </div>
        <div style={{
          marginTop: '32px',
          paddingTop: '24px',
          borderTop: '1px solid rgba(255, 255, 255, 0.1)',
          textAlign: 'center'
        }}>
          <p style={{
            fontFamily: 'var(--font-body)',
            fontSize: '14px',
            color: '#CDD8DE'
          }}>
            © 2026 CompraTuParcela. Todos los derechos reservados.
          </p>
        </div>
      </footer>
    </div>
  );
}