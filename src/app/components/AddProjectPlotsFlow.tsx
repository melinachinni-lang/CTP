import React, { useState } from 'react';
import { ChevronLeft, X, Plus, Trash2, Check, AlertCircle, Mountain, Waves, Map as MapIcon, TrendingUp } from 'lucide-react';
import { StockUnit } from './PublicationWizard';

interface AddProjectPlotsFlowProps {
  onClose: () => void;
  onSave: (plots: StockUnit[]) => void;
  projectId: string;
  projectName: string;
}

export function AddProjectPlotsFlow({ onClose, onSave, projectId, projectName }: AddProjectPlotsFlowProps) {
  const [currentStep, setCurrentStep] = useState(1);
  const [plots, setPlots] = useState<StockUnit[]>([
    {
      id: 'temp-1',
      code: '',
      surface: '',
      price: '',
      status: 'available',
      terrainType: 'flat'
    }
  ]);
  const [errors, setErrors] = useState<Record<string, string>>({});

  const steps = [
    { number: 1, label: 'Información de parcelas' },
    { number: 2, label: 'Revisión y guardar' }
  ];

  const terrainTypes = [
    { value: 'flat', label: 'Parcela plana', icon: MapIcon, description: 'Terreno completamente nivelado' },
    { value: 'gentle-slopes', label: 'Lomajes suaves', icon: Waves, description: 'Ondulaciones suaves del terreno' },
    { value: 'mixed', label: 'Terreno mixto', icon: Mountain, description: 'Combinación de áreas planas y pendientes' },
    { value: 'slope-views', label: 'Pendiente con vistas', icon: TrendingUp, description: 'Inclinación con vistas panorámicas' }
  ];

  const addPlot = () => {
    setPlots([...plots, {
      id: `temp-${Date.now()}`,
      code: '',
      surface: '',
      price: '',
      status: 'available',
      terrainType: 'flat'
    }]);
  };

  const removePlot = (id: string) => {
    if (plots.length > 1) {
      setPlots(plots.filter(p => p.id !== id));
      // Limpiar errores de este plot
      const newErrors = { ...errors };
      Object.keys(newErrors).forEach(key => {
        if (key.startsWith(`${id}-`)) {
          delete newErrors[key];
        }
      });
      setErrors(newErrors);
    }
  };

  const updatePlot = (id: string, field: keyof StockUnit, value: string) => {
    setPlots(plots.map(p => p.id === id ? { ...p, [field]: value } : p));
    // Limpiar error si existe
    if (errors[`${id}-${field}`]) {
      const newErrors = { ...errors };
      delete newErrors[`${id}-${field}`];
      setErrors(newErrors);
    }
  };

  const validateStep1 = () => {
    const newErrors: Record<string, string> = {};
    
    plots.forEach(plot => {
      if (!plot.code.trim()) {
        newErrors[`${plot.id}-code`] = 'El número de lote es obligatorio';
      }
      if (!plot.surface.trim()) {
        newErrors[`${plot.id}-surface`] = 'La superficie es obligatoria';
      }
      if (!plot.price.trim()) {
        newErrors[`${plot.id}-price`] = 'El precio es obligatorio';
      }
    });

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleNext = () => {
    if (currentStep === 1) {
      if (validateStep1()) {
        setCurrentStep(2);
      }
    }
  };

  const handleBack = () => {
    if (currentStep > 1) {
      setCurrentStep(currentStep - 1);
    }
  };

  const handleSave = () => {
    if (validateStep1()) {
      onSave(plots);
      onClose();
    }
  };

  const getTerrainTypeLabel = (value: string) => {
    return terrainTypes.find(t => t.value === value)?.label || value;
  };

  return (
    <div 
      className="fixed inset-0 z-50 flex items-start justify-center overflow-y-auto"
      style={{ backgroundColor: 'rgba(10, 10, 10, 0.6)' }}
    >
      <div 
        className="w-full min-h-screen"
        style={{ backgroundColor: '#FFFFFF' }}
      >
        {/* Header fijo */}
        <div 
          className="sticky top-0 z-40"
          style={{ 
            backgroundColor: '#FFFFFF',
            borderBottom: '1px solid var(--border)'
          }}
        >
          <div className="max-w-5xl mx-auto px-6 py-5">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-4">
                <button
                  onClick={onClose}
                  className="p-2 transition-colors rounded-lg"
                  style={{
                    backgroundColor: 'transparent',
                    color: '#737373'
                  }}
                  onMouseEnter={(e) => e.currentTarget.style.backgroundColor = '#FAFAFA'}
                  onMouseLeave={(e) => e.currentTarget.style.backgroundColor = 'transparent'}
                >
                  <X size={20} />
                </button>
                <div>
                  <h1 style={{
                    fontFamily: 'var(--font-heading)',
                    fontSize: 'var(--font-size-h3)',
                    fontWeight: 'var(--font-weight-medium)',
                    color: '#0A0A0A',
                    lineHeight: 'var(--line-height-heading)',
                  }}>
                    Agregar parcelas al proyecto
                  </h1>
                  <p style={{
                    fontFamily: 'var(--font-body)',
                    fontSize: 'var(--font-size-body-sm)',
                    color: '#737373',
                    lineHeight: 'var(--line-height-body)',
                    marginTop: '4px'
                  }}>
                    {projectName}
                  </p>
                </div>
              </div>

              {/* Steps indicator */}
              <div className="flex items-center gap-3">
                {steps.map((step, index) => (
                  <React.Fragment key={step.number}>
                    <div className="flex items-center gap-2">
                      <div
                        className="flex items-center justify-center rounded-full transition-all"
                        style={{
                          width: '32px',
                          height: '32px',
                          backgroundColor: currentStep >= step.number ? '#124854' : '#F5F5F5',
                          color: currentStep >= step.number ? '#FFFFFF' : '#737373',
                          fontFamily: 'var(--font-body)',
                          fontSize: 'var(--font-size-body-sm)',
                          fontWeight: 'var(--font-weight-semibold)',
                        }}
                      >
                        {currentStep > step.number ? <Check size={16} /> : step.number}
                      </div>
                      <span style={{
                        fontFamily: 'var(--font-body)',
                        fontSize: 'var(--font-size-body-sm)',
                        color: currentStep >= step.number ? '#0A0A0A' : '#737373',
                        fontWeight: currentStep === step.number ? 'var(--font-weight-medium)' : 'var(--font-weight-regular)',
                      }}>
                        {step.label}
                      </span>
                    </div>
                    {index < steps.length - 1 && (
                      <div style={{
                        width: '40px',
                        height: '2px',
                        backgroundColor: currentStep > step.number ? '#124854' : '#DEDEDE',
                      }} />
                    )}
                  </React.Fragment>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* Contenido principal con padding bottom para el footer */}
        <div className="max-w-5xl mx-auto px-6 py-8" style={{ paddingBottom: '120px' }}>
          
          {/* Paso 1: Información de parcelas */}
          {currentStep === 1 && (
            <div className="space-y-6">
              <div>
                <h2 style={{
                  fontFamily: 'var(--font-heading)',
                  fontSize: 'var(--font-size-h2)',
                  fontWeight: 'var(--font-weight-regular)',
                  color: '#0A0A0A',
                  lineHeight: 'var(--line-height-heading)',
                }}>
                  Información de parcelas
                </h2>
                <p style={{
                  fontFamily: 'var(--font-body)',
                  fontSize: 'var(--font-size-body-base)',
                  color: '#737373',
                  lineHeight: 'var(--line-height-body)',
                  marginTop: '8px'
                }}>
                  Ingresa los detalles de cada parcela que formarán parte del inventario del proyecto
                </p>
              </div>

              {/* Lista de parcelas */}
              <div className="space-y-4">
                {plots.map((plot, index) => (
                  <div 
                    key={plot.id} 
                    className="p-6 rounded-xl space-y-4"
                    style={{ 
                      backgroundColor: '#FAFAFA',
                      border: '1px solid var(--border)'
                    }}
                  >
                    <div className="flex items-center justify-between">
                      <h3 style={{
                        fontFamily: 'var(--font-heading)',
                        fontSize: 'var(--font-size-body-base)',
                        fontWeight: 'var(--font-weight-semibold)',
                        color: '#0A0A0A',
                      }}>
                        Parcela {index + 1}
                      </h3>
                      {plots.length > 1 && (
                        <button
                          onClick={() => removePlot(plot.id)}
                          className="p-2 transition-colors rounded-lg"
                          style={{
                            backgroundColor: 'transparent',
                            color: '#737373'
                          }}
                          onMouseEnter={(e) => {
                            e.currentTarget.style.backgroundColor = '#FFFFFF';
                            e.currentTarget.style.color = '#DC2626';
                          }}
                          onMouseLeave={(e) => {
                            e.currentTarget.style.backgroundColor = 'transparent';
                            e.currentTarget.style.color = '#737373';
                          }}
                        >
                          <Trash2 size={18} />
                        </button>
                      )}
                    </div>

                    <div className="grid grid-cols-2 gap-4">
                      {/* Número de lote */}
                      <div>
                        <label style={{
                          fontFamily: 'var(--font-body)',
                          fontSize: 'var(--font-size-body-sm)',
                          fontWeight: 'var(--font-weight-medium)',
                          color: '#0A0A0A',
                          display: 'block',
                          marginBottom: '8px'
                        }}>
                          Número de lote *
                        </label>
                        <input
                          type="text"
                          value={plot.code}
                          onChange={(e) => updatePlot(plot.id, 'code', e.target.value)}
                          placeholder="Ej: A-01, Lote 15"
                          className="w-full px-4 py-3 rounded-lg transition-all"
                          style={{
                            backgroundColor: '#FFFFFF',
                            border: errors[`${plot.id}-code`] ? '1px solid #DC2626' : '1px solid var(--border)',
                            fontFamily: 'var(--font-body)',
                            fontSize: 'var(--font-size-body-base)',
                            color: '#0A0A0A',
                            outline: 'none'
                          }}
                          onFocus={(e) => {
                            if (!errors[`${plot.id}-code`]) {
                              e.currentTarget.style.borderColor = '#124854';
                            }
                          }}
                          onBlur={(e) => {
                            if (!errors[`${plot.id}-code`]) {
                              e.currentTarget.style.borderColor = '#DEDEDE';
                            }
                          }}
                        />
                        {errors[`${plot.id}-code`] && (
                          <p className="flex items-center gap-1 mt-2" style={{
                            fontFamily: 'var(--font-body)',
                            fontSize: 'var(--font-size-xs)',
                            color: '#DC2626'
                          }}>
                            <AlertCircle size={14} />
                            {errors[`${plot.id}-code`]}
                          </p>
                        )}
                      </div>

                      {/* Superficie */}
                      <div>
                        <label style={{
                          fontFamily: 'var(--font-body)',
                          fontSize: 'var(--font-size-body-sm)',
                          fontWeight: 'var(--font-weight-medium)',
                          color: '#0A0A0A',
                          display: 'block',
                          marginBottom: '8px'
                        }}>
                          Superficie (m²) *
                        </label>
                        <input
                          type="number"
                          value={plot.surface}
                          onChange={(e) => updatePlot(plot.id, 'surface', e.target.value)}
                          placeholder="Ej: 5000"
                          className="w-full px-4 py-3 rounded-lg transition-all"
                          style={{
                            backgroundColor: '#FFFFFF',
                            border: errors[`${plot.id}-surface`] ? '1px solid #DC2626' : '1px solid var(--border)',
                            fontFamily: 'var(--font-body)',
                            fontSize: 'var(--font-size-body-base)',
                            color: '#0A0A0A',
                            outline: 'none'
                          }}
                          onFocus={(e) => {
                            if (!errors[`${plot.id}-surface`]) {
                              e.currentTarget.style.borderColor = '#124854';
                            }
                          }}
                          onBlur={(e) => {
                            if (!errors[`${plot.id}-surface`]) {
                              e.currentTarget.style.borderColor = '#DEDEDE';
                            }
                          }}
                        />
                        {errors[`${plot.id}-surface`] && (
                          <p className="flex items-center gap-1 mt-2" style={{
                            fontFamily: 'var(--font-body)',
                            fontSize: 'var(--font-size-xs)',
                            color: '#DC2626'
                          }}>
                            <AlertCircle size={14} />
                            {errors[`${plot.id}-surface`]}
                          </p>
                        )}
                      </div>

                      {/* Precio */}
                      <div>
                        <label style={{
                          fontFamily: 'var(--font-body)',
                          fontSize: 'var(--font-size-body-sm)',
                          fontWeight: 'var(--font-weight-medium)',
                          color: '#0A0A0A',
                          display: 'block',
                          marginBottom: '8px'
                        }}>
                          Precio (CLP) *
                        </label>
                        <input
                          type="number"
                          value={plot.price}
                          onChange={(e) => updatePlot(plot.id, 'price', e.target.value)}
                          placeholder="Ej: 85000000"
                          className="w-full px-4 py-3 rounded-lg transition-all"
                          style={{
                            backgroundColor: '#FFFFFF',
                            border: errors[`${plot.id}-price`] ? '1px solid #DC2626' : '1px solid var(--border)',
                            fontFamily: 'var(--font-body)',
                            fontSize: 'var(--font-size-body-base)',
                            color: '#0A0A0A',
                            outline: 'none'
                          }}
                          onFocus={(e) => {
                            if (!errors[`${plot.id}-price`]) {
                              e.currentTarget.style.borderColor = '#124854';
                            }
                          }}
                          onBlur={(e) => {
                            if (!errors[`${plot.id}-price`]) {
                              e.currentTarget.style.borderColor = '#DEDEDE';
                            }
                          }}
                        />
                        {errors[`${plot.id}-price`] && (
                          <p className="flex items-center gap-1 mt-2" style={{
                            fontFamily: 'var(--font-body)',
                            fontSize: 'var(--font-size-xs)',
                            color: '#DC2626'
                          }}>
                            <AlertCircle size={14} />
                            {errors[`${plot.id}-price`]}
                          </p>
                        )}
                      </div>

                      {/* Estado */}
                      <div>
                        <label style={{
                          fontFamily: 'var(--font-body)',
                          fontSize: 'var(--font-size-body-sm)',
                          fontWeight: 'var(--font-weight-medium)',
                          color: '#0A0A0A',
                          display: 'block',
                          marginBottom: '8px'
                        }}>
                          Estado
                        </label>
                        <select
                          value={plot.status}
                          onChange={(e) => updatePlot(plot.id, 'status', e.target.value as 'available' | 'reserved' | 'sold')}
                          className="w-full px-4 py-3 rounded-lg transition-all"
                          style={{
                            backgroundColor: '#FFFFFF',
                            border: '1px solid var(--border)',
                            fontFamily: 'var(--font-body)',
                            fontSize: 'var(--font-size-body-base)',
                            color: '#0A0A0A',
                            outline: 'none'
                          }}
                          onFocus={(e) => e.currentTarget.style.borderColor = '#124854'}
                          onBlur={(e) => e.currentTarget.style.borderColor = '#DEDEDE'}
                        >
                          <option value="available">Disponible</option>
                          <option value="reserved">Reservada</option>
                          <option value="sold">Vendida</option>
                        </select>
                      </div>
                    </div>

                    {/* Tipo de terreno */}
                    <div>
                      <label style={{
                        fontFamily: 'var(--font-body)',
                        fontSize: 'var(--font-size-body-sm)',
                        fontWeight: 'var(--font-weight-medium)',
                        color: '#0A0A0A',
                        display: 'block',
                        marginBottom: '12px'
                      }}>
                        Tipo de terreno
                      </label>
                      <div className="grid grid-cols-2 gap-3">
                        {terrainTypes.map((type) => {
                          const Icon = type.icon;
                          const isSelected = plot.terrainType === type.value;
                          return (
                            <button
                              key={type.value}
                              onClick={() => updatePlot(plot.id, 'terrainType', type.value)}
                              className="flex items-start gap-3 p-3 rounded-lg transition-all text-left"
                              style={{
                                backgroundColor: isSelected ? '#E6F1F3' : '#FFFFFF',
                                border: isSelected ? '2px solid #124854' : '1px solid var(--border)',
                              }}
                              onMouseEnter={(e) => {
                                if (!isSelected) {
                                  e.currentTarget.style.borderColor = '#124854';
                                  e.currentTarget.style.backgroundColor = '#F5F9FA';
                                }
                              }}
                              onMouseLeave={(e) => {
                                if (!isSelected) {
                                  e.currentTarget.style.borderColor = '#DEDEDE';
                                  e.currentTarget.style.backgroundColor = '#FFFFFF';
                                }
                              }}
                            >
                              <div 
                                className="p-2 rounded-lg flex-shrink-0"
                                style={{ backgroundColor: isSelected ? '#124854' : '#F5F5F5' }}
                              >
                                <Icon size={18} style={{ color: isSelected ? '#FFFFFF' : '#737373' }} />
                              </div>
                              <div className="flex-1">
                                <div style={{
                                  fontFamily: 'var(--font-body)',
                                  fontSize: 'var(--font-size-body-sm)',
                                  fontWeight: 'var(--font-weight-medium)',
                                  color: '#0A0A0A',
                                  marginBottom: '2px'
                                }}>
                                  {type.label}
                                </div>
                                <div style={{
                                  fontFamily: 'var(--font-body)',
                                  fontSize: 'var(--font-size-xs)',
                                  color: '#737373',
                                }}>
                                  {type.description}
                                </div>
                              </div>
                            </button>
                          );
                        })}
                      </div>
                    </div>
                  </div>
                ))}
              </div>

              {/* Botón agregar parcela */}
              <button
                onClick={addPlot}
                className="flex items-center gap-2 px-4 py-3 rounded-lg transition-all"
                style={{
                  backgroundColor: 'transparent',
                  border: '2px dashed var(--border)',
                  color: '#124854',
                  fontFamily: 'var(--font-body)',
                  fontSize: 'var(--font-size-body-sm)',
                  fontWeight: 'var(--font-weight-medium)',
                  width: '100%',
                  justifyContent: 'center'
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.borderColor = '#124854';
                  e.currentTarget.style.backgroundColor = '#F5F9FA';
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.borderColor = '#DEDEDE';
                  e.currentTarget.style.backgroundColor = 'transparent';
                }}
              >
                <Plus size={20} />
                Agregar otra parcela
              </button>
            </div>
          )}

          {/* Paso 2: Revisión */}
          {currentStep === 2 && (
            <div className="space-y-8">
              <div>
                <h2 style={{
                  fontFamily: 'var(--font-heading)',
                  fontSize: 'var(--font-size-h2)',
                  fontWeight: 'var(--font-weight-regular)',
                  color: '#0A0A0A',
                  lineHeight: 'var(--line-height-heading)',
                }}>
                  Revisión y confirmación
                </h2>
                <p style={{
                  fontFamily: 'var(--font-body)',
                  fontSize: 'var(--font-size-body-base)',
                  color: '#737373',
                  lineHeight: 'var(--line-height-body)',
                  marginTop: '8px'
                }}>
                  Revisa las parcelas que serán agregadas al inventario del proyecto
                </p>
              </div>

              {/* Resumen del proyecto */}
              <div className="p-6 rounded-xl" style={{ backgroundColor: '#F5F9FA', border: '1px solid #CDD8DE' }}>
                <div className="flex items-center gap-3 mb-4">
                  <div className="p-3 rounded-lg" style={{ backgroundColor: '#124854' }}>
                    <MapIcon size={24} style={{ color: '#FFFFFF' }} />
                  </div>
                  <div>
                    <h3 style={{
                      fontFamily: 'var(--font-heading)',
                      fontSize: 'var(--font-size-body-lg)',
                      fontWeight: 'var(--font-weight-semibold)',
                      color: '#0A0A0A',
                    }}>
                      {projectName}
                    </h3>
                    <p style={{
                      fontFamily: 'var(--font-body)',
                      fontSize: 'var(--font-size-body-sm)',
                      color: '#737373',
                    }}>
                      Se agregarán {plots.length} {plots.length === 1 ? 'parcela' : 'parcelas'} al inventario
                    </p>
                  </div>
                </div>
              </div>

              {/* Lista de parcelas para confirmar */}
              <div className="space-y-3">
                <h3 style={{
                  fontFamily: 'var(--font-heading)',
                  fontSize: 'var(--font-size-body-base)',
                  fontWeight: 'var(--font-weight-semibold)',
                  color: '#0A0A0A',
                }}>
                  Parcelas a agregar
                </h3>
                {plots.map((plot, index) => (
                  <div 
                    key={plot.id}
                    className="p-5 rounded-xl"
                    style={{ backgroundColor: '#FFFFFF', border: '1px solid var(--border)' }}
                  >
                    <div className="flex items-start justify-between mb-3">
                      <div>
                        <h4 style={{
                          fontFamily: 'var(--font-heading)',
                          fontSize: 'var(--font-size-body-base)',
                          fontWeight: 'var(--font-weight-semibold)',
                          color: '#0A0A0A',
                        }}>
                          Parcela {index + 1} - {plot.code}
                        </h4>
                      </div>
                      <div 
                        className="px-3 py-1 rounded-full"
                        style={{
                          backgroundColor: plot.status === 'available' ? '#E8F3E8' : plot.status === 'reserved' ? '#FFF4E6' : '#F5F5F5',
                          fontFamily: 'var(--font-body)',
                          fontSize: 'var(--font-size-xs)',
                          fontWeight: 'var(--font-weight-medium)',
                          color: plot.status === 'available' ? '#647E3F' : plot.status === 'reserved' ? '#7D460D' : '#737373'
                        }}
                      >
                        {plot.status === 'available' ? 'Disponible' : plot.status === 'reserved' ? 'Reservada' : 'Vendida'}
                      </div>
                    </div>
                    <div className="grid grid-cols-3 gap-4 mb-3">
                      <div>
                        <p style={{
                          fontFamily: 'var(--font-body)',
                          fontSize: 'var(--font-size-xs)',
                          color: '#737373',
                          marginBottom: '4px'
                        }}>
                          Superficie
                        </p>
                        <p style={{
                          fontFamily: 'var(--font-body)',
                          fontSize: 'var(--font-size-body-base)',
                          fontWeight: 'var(--font-weight-medium)',
                          color: '#0A0A0A',
                        }}>
                          {Number(plot.surface).toLocaleString('es-CL')} m²
                        </p>
                      </div>
                      <div>
                        <p style={{
                          fontFamily: 'var(--font-body)',
                          fontSize: 'var(--font-size-xs)',
                          color: '#737373',
                          marginBottom: '4px'
                        }}>
                          Precio
                        </p>
                        <p style={{
                          fontFamily: 'var(--font-body)',
                          fontSize: 'var(--font-size-body-base)',
                          fontWeight: 'var(--font-weight-medium)',
                          color: '#0A0A0A',
                        }}>
                          ${Number(plot.price).toLocaleString('es-CL')}
                        </p>
                      </div>
                      <div>
                        <p style={{
                          fontFamily: 'var(--font-body)',
                          fontSize: 'var(--font-size-xs)',
                          color: '#737373',
                          marginBottom: '4px'
                        }}>
                          Tipo de terreno
                        </p>
                        <p style={{
                          fontFamily: 'var(--font-body)',
                          fontSize: 'var(--font-size-body-base)',
                          fontWeight: 'var(--font-weight-medium)',
                          color: '#0A0A0A',
                        }}>
                          {getTerrainTypeLabel(plot.terrainType || 'flat')}
                        </p>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>

        {/* Footer fijo con botones */}
        <div 
          className="fixed bottom-0 left-0 right-0 z-40"
          style={{
            backgroundColor: '#FFFFFF',
            borderTop: '1px solid var(--border)',
            boxShadow: '0 -4px 6px -1px rgba(0, 0, 0, 0.05)',
          }}
        >
          <div className="max-w-5xl mx-auto px-6 py-5">
            <div className="flex items-center justify-between gap-4">
              <button
                onClick={handleBack}
                disabled={currentStep === 1}
                className="flex items-center gap-2 px-5 py-3 rounded-full transition-all disabled:opacity-40 disabled:cursor-not-allowed"
                style={{
                  backgroundColor: 'transparent',
                  border: '1px solid var(--border)',
                  color: '#0A0A0A',
                  fontFamily: 'var(--font-body)',
                  fontSize: 'var(--font-size-body-sm)',
                  fontWeight: 'var(--font-weight-medium)',
                  letterSpacing: 'var(--letter-spacing-wide)',
                }}
                onMouseEnter={(e) => {
                  if (currentStep !== 1) e.currentTarget.style.borderColor = '#0A0A0A';
                }}
                onMouseLeave={(e) => {
                  if (currentStep !== 1) e.currentTarget.style.borderColor = '#DEDEDE';
                }}
              >
                <ChevronLeft size={18} />
                Atrás
              </button>

              {currentStep < 2 ? (
                <button
                  onClick={handleNext}
                  className="flex items-center gap-2 px-6 py-3 rounded-full transition-all"
                  style={{
                    backgroundColor: '#124854',
                    color: '#FFFFFF',
                    fontFamily: 'var(--font-body)',
                    fontSize: 'var(--font-size-body-sm)',
                    fontWeight: 'var(--font-weight-medium)',
                    letterSpacing: 'var(--letter-spacing-wide)',
                  }}
                  onMouseEnter={(e) => e.currentTarget.style.backgroundColor = '#0F3B44'}
                  onMouseLeave={(e) => e.currentTarget.style.backgroundColor = '#124854'}
                >
                  Continuar
                  <ChevronLeft size={18} style={{ transform: 'rotate(180deg)' }} />
                </button>
              ) : (
                <button
                  onClick={handleSave}
                  className="px-8 py-3 rounded-full transition-all"
                  style={{
                    backgroundColor: '#647E3F',
                    color: '#FFFFFF',
                    fontFamily: 'var(--font-body)',
                    fontSize: 'var(--font-size-body-sm)',
                    fontWeight: 'var(--font-weight-medium)',
                    letterSpacing: 'var(--letter-spacing-wide)',
                  }}
                  onMouseEnter={(e) => e.currentTarget.style.backgroundColor = '#546A35'}
                  onMouseLeave={(e) => e.currentTarget.style.backgroundColor = '#647E3F'}
                >
                  Guardar parcelas
                </button>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}