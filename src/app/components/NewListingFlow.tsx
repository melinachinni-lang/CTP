import React, { useState, useRef, useEffect } from 'react';
import { ChevronLeft, X, Check, Upload, FileText, Image as ImageIcon, AlertCircle, Video, Download, Plus, Trash2, MapPin, Move, Home, Compass, Wheat, Store, Waves, Mountain, Trees, Leaf, Droplet, Zap, Wifi, Car, DoorOpen, Shield, Search, FileCheck, Lightbulb, Sun, Globe, Route, Camera, Recycle, Trash, Settings } from 'lucide-react';

interface NewListingFlowProps {
  onClose: () => void;
  onPublish: () => void;
  parcelaId?: string | null;
}

export function NewListingFlow({ onClose, onPublish, parcelaId }: NewListingFlowProps) {
  const [currentStep, setCurrentStep] = useState(1);
  const isEditing = !!parcelaId;
  const [formData, setFormData] = useState({
    // Paso 1: Información básica
    title: '',
    description: '',
    mainImage: null as File | null,
    galleryImages: [] as File[],
    price: '',
    currency: 'CLP',
    previousOwners: '',
    region: '',
    comuna: '',
    address: '',
    
    // Paso 2: Características
    // Uso del terreno
    residential: false,
    tourist: false,
    agricultural: false,
    commercial: false,
    
    // Características físicas
    lakeView: false,
    mountainView: false,
    nativeForest: false,
    surroundedByNature: false,
    
    // Servicios
    drinkingWater: false,
    networkWater: false,
    wellWater: false,
    tankTruckWater: false,
    undergroundElectricity: false,
    electricalPole: false,
    solarPanel: false,
    internetAccess: false,
    stabilizedRoad: false,
    pavedRoad: false,
    securityCameras: false,
    commonAreas: false,
    recyclingZone: false,
    wasteZone: false,
    
    // Estado o condiciones
    readyToDeed: false,
    permittedUse: false,
    designRules: false,
    
    // Paso 3: Ubicación y mapas
    latitude: '',
    longitude: '',
    masterPlan: null as File | null,
    
    // Paso 4: Documentación
    terrainPlan: null as File | null,
    rolAvaluo: null as File | null,
    serviceFeasibility: null as File | null,
    certificadoIP: null as File | null,
    brochure: null as File | null,
    customDocs: [] as Array<{ name: string; file: File | null }>,
    
    // Paso 5: Multimedia
    propertyVideo: '',
    droneVideo: '',
    view360: '',
  });

  const [imagePreview, setImagePreview] = useState<string>('');
  const [galleryPreviews, setGalleryPreviews] = useState<string[]>([]);
  const [masterPlanPreview, setMasterPlanPreview] = useState<string>('');
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [fileErrors, setFileErrors] = useState<Record<string, string>>({});
  const [showValidationAlert, setShowValidationAlert] = useState(false);
  const [showPreview, setShowPreview] = useState(false);
  const [activeMapTab, setActiveMapTab] = useState<'360' | 'plano' | 'mapa'>('mapa');

  const steps = [
    { number: 1, label: 'Información básica' },
    { number: 2, label: 'Características' },
    { number: 3, label: 'Ubicación y mapas' },
    { number: 4, label: 'Documentación' },
    { number: 5, label: 'Multimedia' },
  ];

  // Helper functions para "Seleccionar todo"
  const landUseKeys = ['residential', 'tourist', 'agricultural', 'commercial'];
  const physicalFeaturesKeys = ['lakeView', 'mountainView', 'nativeForest', 'surroundedByNature'];
  const servicesKeys = ['drinkingWater', 'networkWater', 'wellWater', 'tankTruckWater', 'undergroundElectricity', 'electricalPole', 'solarPanel', 'internetAccess', 'stabilizedRoad', 'pavedRoad', 'securityCameras', 'commonAreas', 'recyclingZone', 'wasteZone'];
  const conditionsKeys = ['readyToDeed', 'permittedUse', 'designRules'];

  const areAllSelected = (keys: string[]) => {
    return keys.every(key => formData[key as keyof typeof formData]);
  };

  const toggleAll = (keys: string[]) => {
    const allSelected = areAllSelected(keys);
    const updates = keys.reduce((acc, key) => {
      acc[key] = !allSelected;
      return acc;
    }, {} as Record<string, boolean>);
    setFormData({ ...formData, ...updates });
  };

  // Constantes de validación de archivos
  const MAX_IMAGE_SIZE = 5 * 1024 * 1024; // 5MB
  const MAX_PDF_SIZE = 10 * 1024 * 1024; // 10MB
  const ALLOWED_IMAGE_TYPES = ['image/jpeg', 'image/jpg', 'image/png'];
  const ALLOWED_PDF_TYPES = ['application/pdf'];

  // Función de validación de archivos
  const validateFile = (file: File, fieldName: string, allowedTypes: string[], maxSize: number): boolean => {
    // Limpiar error previo
    const newFileErrors = { ...fileErrors };
    delete newFileErrors[fieldName];
    
    // Validar tipo de archivo
    if (!allowedTypes.includes(file.type)) {
      newFileErrors[fieldName] = 'Formato de archivo no permitido';
      setFileErrors(newFileErrors);
      return false;
    }
    
    // Validar tamaño
    if (file.size > maxSize) {
      newFileErrors[fieldName] = 'El archivo supera el tamaño máximo permitido';
      setFileErrors(newFileErrors);
      return false;
    }
    
    setFileErrors(newFileErrors);
    return true;
  };

  // Cargar datos de la parcela si está en modo edición
  useEffect(() => {
    if (parcelaId) {
      // En un caso real, aquí se haría una llamada al backend para obtener los datos
      // Por ahora, mostramos un console.log para indicar que se cargarían los datos
      console.log('Cargando datos de la parcela:', parcelaId);
      
      // Simulación de carga de datos (en producción vendría del backend)
      // Ejemplo de cómo se cargarían los datos:
      // const parcelaData = await fetchParcelaData(parcelaId);
      // setFormData({
      //   title: parcelaData.titulo,
      //   description: parcelaData.descripcion,
      //   price: parcelaData.precio,
      //   region: parcelaData.region,
      //   comuna: parcelaData.comuna,
      //   ... resto de campos
      // });
    }
  }, [parcelaId]);

  const validateStep = (step: number): boolean => {
    const newErrors: Record<string, string> = {};

    if (step === 1) {
      if (!formData.title.trim()) {
        newErrors.title = 'Título de la publicación: ingresa un título descriptivo';
      }
      if (!formData.description.trim()) {
        newErrors.description = 'Descripción: escribe detalles que ayuden a vender la parcela';
      }
      if (!formData.price) {
        newErrors.price = 'Precio: ingresa el valor de venta';
      }
      if (!formData.region) {
        newErrors.region = 'Región: selecciona la región donde se ubica';
      }
      if (!formData.comuna) {
        newErrors.comuna = 'Comuna: selecciona la comuna específica';
      }
    }

    if (step === 3) {
      if (!formData.latitude || !formData.longitude) {
        newErrors.coordinates = 'Coordenadas: ingresa la ubicación exacta de la parcela';
      }
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleNext = () => {
    if (validateStep(currentStep)) {
      setShowValidationAlert(false);
      if (currentStep < 5) {
        setCurrentStep(currentStep + 1);
        window.scrollTo(0, 0);
      }
    } else {
      setShowValidationAlert(true);
      window.scrollTo(0, 0);
    }
  };

  const handleBack = () => {
    if (currentStep > 1) {
      setCurrentStep(currentStep - 1);
      setErrors({});
      setShowValidationAlert(false);
      window.scrollTo(0, 0);
    }
  };

  const handleMainImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      const file = e.target.files[0];
      
      // Validar archivo
      if (!validateFile(file, 'mainImage', ALLOWED_IMAGE_TYPES, MAX_IMAGE_SIZE)) {
        e.target.value = ''; // Limpiar el input
        return;
      }
      
      setFormData({ ...formData, mainImage: file });
      const reader = new FileReader();
      reader.onloadend = () => {
        setImagePreview(reader.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleGalleryUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      const files = Array.from(e.target.files);
      const validFiles: File[] = [];
      let hasError = false;
      
      // Validar cada archivo
      files.forEach((file, index) => {
        if (validateFile(file, `galleryImage_${index}`, ALLOWED_IMAGE_TYPES, MAX_IMAGE_SIZE)) {
          validFiles.push(file);
        } else {
          hasError = true;
        }
      });
      
      if (hasError) {
        e.target.value = ''; // Limpiar el input
        // Mostrar error general para galería
        setFileErrors({ ...fileErrors, galleryImages: 'Algunos archivos no cumplen con los requisitos' });
        return;
      }
      
      setFormData({ ...formData, galleryImages: [...formData.galleryImages, ...validFiles] });
      
      validFiles.forEach(file => {
        const reader = new FileReader();
        reader.onloadend = () => {
          setGalleryPreviews(prev => [...prev, reader.result as string]);
        };
        reader.readAsDataURL(file);
      });
    }
  };

  const removeGalleryImage = (index: number) => {
    const newImages = formData.galleryImages.filter((_, i) => i !== index);
    const newPreviews = galleryPreviews.filter((_, i) => i !== index);
    setFormData({ ...formData, galleryImages: newImages });
    setGalleryPreviews(newPreviews);
  };

  const handleMasterPlanUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      const file = e.target.files[0];
      
      // Validar archivo
      if (!validateFile(file, 'masterPlan', ALLOWED_IMAGE_TYPES, MAX_IMAGE_SIZE)) {
        e.target.value = ''; // Limpiar el input
        return;
      }
      
      setFormData({ ...formData, masterPlan: file });
      const reader = new FileReader();
      reader.onloadend = () => {
        setMasterPlanPreview(reader.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleDocUpload = (field: keyof typeof formData, e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      const file = e.target.files[0];
      
      // Determinar tipos permitidos según el campo
      const allowedTypes = field === 'brochure' ? ALLOWED_PDF_TYPES : [...ALLOWED_PDF_TYPES, ...ALLOWED_IMAGE_TYPES];
      const maxSize = allowedTypes.includes('application/pdf') ? MAX_PDF_SIZE : MAX_IMAGE_SIZE;
      
      // Validar archivo
      if (!validateFile(file, field as string, allowedTypes, maxSize)) {
        e.target.value = ''; // Limpiar el input
        return;
      }
      
      setFormData({ ...formData, [field]: file });
    }
  };

  const addCustomDoc = () => {
    setFormData({
      ...formData,
      customDocs: [...formData.customDocs, { name: '', file: null }]
    });
  };

  const removeCustomDoc = (index: number) => {
    const newDocs = formData.customDocs.filter((_, i) => i !== index);
    setFormData({ ...formData, customDocs: newDocs });
  };

  const updateCustomDoc = (index: number, field: 'name' | 'file', value: string | File) => {
    const newDocs = [...formData.customDocs];
    if (field === 'name') {
      newDocs[index].name = value as string;
    } else {
      newDocs[index].file = value as File;
    }
    setFormData({ ...formData, customDocs: newDocs });
  };

  const handlePublish = () => {
    if (validateStep(currentStep)) {
      setShowValidationAlert(false);
      onPublish();
    } else {
      setShowValidationAlert(true);
      window.scrollTo(0, 0);
    }
  };

  const handleSaveDraft = () => {
    alert('Borrador guardado exitosamente');
    onClose();
  };

  const regionesComunas: Record<string, string[]> = {
    'Región Metropolitana': ['Pirque', 'Colina', 'Buin', 'Lampa', 'San José de Maipo', 'Til Til', 'Paine', 'Calera de Tango'],
    'Valparaíso': ['Casablanca', 'Olmué', 'Limache', 'Quilpué', 'Villa Alemana', 'Quillota'],
    "O'Higgins": ['San Fernando', 'Pichilemu', 'Santa Cruz', 'Nancagua', 'Chimbarongo'],
    'Maule': ['Curicó', 'Talca', 'Linares', 'Constitución', 'Parral'],
    'Biobío': ['Concepción', 'Los Ángeles', 'Chillán', 'Coronel', 'Cabrero'],
    'Araucanía': ['Temuco', 'Villarrica', 'Pucón', 'Angol', 'Victoria'],
    'Los Ríos': ['Valdivia', 'Panguipulli', 'La Unión', 'Río Bueno'],
    'Los Lagos': ['Puerto Varas', 'Puerto Montt', 'Osorno', 'Castro', 'Frutillar'],
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
          <div className="max-w-[1000px] mx-auto px-6 py-5">
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
                    {isEditing ? 'Editar publicación' : 'Publicar parcela'}
                  </h1>
                  <p style={{
                    fontFamily: 'var(--font-body)',
                    fontSize: 'var(--font-size-body-sm)',
                    color: '#737373',
                    marginTop: '4px',
                    lineHeight: 'var(--line-height-body)'
                  }}>
                    Paso {currentStep} de 5
                  </p>
                </div>
              </div>
              <button
                onClick={handleSaveDraft}
                className="px-5 py-3 rounded-full transition-all"
                style={{
                  backgroundColor: 'transparent',
                  border: '1px solid #DEDEDE',
                  color: '#0A0A0A',
                  fontFamily: 'var(--font-body)',
                  fontSize: 'var(--font-size-body-sm)',
                  fontWeight: 'var(--font-weight-medium)',
                  letterSpacing: 'var(--letter-spacing-wide)',
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.borderColor = '#006B4E';
                  e.currentTarget.style.color = '#006B4E';
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.borderColor = '#DEDEDE';
                  e.currentTarget.style.color = '#0A0A0A';
                }}
              >
                Guardar borrador
              </button>
            </div>
          </div>

          {/* Indicador de pasos */}
          <div 
            className="max-w-[1000px] mx-auto px-6 py-4"
            style={{ borderTop: '1px solid var(--border)' }}
          >
            <div className="flex items-center justify-between">
              {steps.map((step, index) => (
                <React.Fragment key={step.number}>
                  <div className="flex flex-col items-center gap-2 flex-1">
                    <div
                      className="w-8 h-8 rounded-full flex items-center justify-center transition-all"
                      style={{
                        backgroundColor: currentStep > step.number 
                          ? '#006B4E' 
                          : currentStep === step.number 
                          ? '#FFFFFF' 
                          : '#FAFAFA',
                        border: currentStep >= step.number ? '2px solid #006B4E' : '2px solid #DEDEDE',
                        color: currentStep > step.number 
                          ? '#FFFFFF' 
                          : currentStep === step.number 
                          ? '#006B4E' 
                          : '#C3C3C3',
                        fontFamily: 'var(--font-body)',
                        fontSize: 'var(--font-size-xs)',
                        fontWeight: 'var(--font-weight-semibold)',
                      }}
                    >
                      {currentStep > step.number ? (
                        <Check size={14} />
                      ) : (
                        step.number
                      )}
                    </div>
                    <span
                      style={{
                        fontFamily: 'var(--font-body)',
                        fontSize: '11px',
                        fontWeight: currentStep >= step.number ? 'var(--font-weight-medium)' : 'var(--font-weight-regular)',
                        color: currentStep >= step.number ? '#0A0A0A' : '#C3C3C3',
                        textAlign: 'center',
                      }}
                    >
                      {step.label}
                    </span>
                  </div>
                  {index < steps.length - 1 && (
                    <div
                      className="flex-1 h-0.5 mx-2 mb-6 transition-colors"
                      style={{
                        backgroundColor: currentStep > step.number ? '#006B4E' : '#DEDEDE',
                        maxWidth: '40px',
                      }}
                    />
                  )}
                </React.Fragment>
              ))}
            </div>
          </div>
        </div>

        {/* Contenido del formulario */}
        <div className="max-w-[1000px] mx-auto px-6 py-8 pb-32">
          {/* Banner de validación de errores */}
          {showValidationAlert && Object.keys(errors).length > 0 && (
            <div 
              className="mb-6 p-5 rounded-xl flex items-start gap-4"
              style={{
                backgroundColor: '#FEF2F2',
                border: '1px solid #FCA5A5',
              }}
            >
              <AlertCircle 
                size={24} 
                style={{ 
                  color: '#DC2626',
                  flexShrink: 0,
                  marginTop: '2px'
                }} 
              />
              <div className="flex-1">
                <h4 style={{
                  fontFamily: 'var(--font-heading)',
                  fontSize: 'var(--font-size-body-base)',
                  fontWeight: 'var(--font-weight-semibold)',
                  color: '#DC2626',
                  marginBottom: '8px',
                  lineHeight: 'var(--line-height-heading)',
                }}>
                  Completa los campos requeridos para continuar
                </h4>
                <p style={{
                  fontFamily: 'var(--font-body)',
                  fontSize: 'var(--font-size-body-sm)',
                  color: '#991B1B',
                  lineHeight: 'var(--line-height-body)',
                }}>
                  {Object.keys(errors).length === 1 
                    ? 'Hay 1 campo que requiere tu atención:'
                    : `Hay ${Object.keys(errors).length} campos que requieren tu atención:`}
                </p>
                <ul style={{
                  marginTop: '8px',
                  paddingLeft: '20px',
                  listStyleType: 'disc',
                }}>
                  {Object.entries(errors).map(([field, message]) => (
                    <li 
                      key={field}
                      style={{
                        fontFamily: 'var(--font-body)',
                        fontSize: 'var(--font-size-body-sm)',
                        color: '#991B1B',
                        marginTop: '4px',
                        lineHeight: 'var(--line-height-ui)',
                      }}
                    >
                      {message}
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          )}

          {/* Paso 1: Información básica */}
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
                  Información básica
                </h2>
                <p style={{
                  fontFamily: 'var(--font-body)',
                  fontSize: 'var(--font-size-body-base)',
                  color: '#737373',
                  marginTop: '8px',
                  lineHeight: 'var(--line-height-body)',
                }}>
                  Ingresa los datos principales de tu parcela
                </p>
              </div>

              {/* Sección 1: Información básica */}
              <div 
                className="p-6 rounded-xl space-y-5"
                style={{
                  backgroundColor: '#FFFFFF',
                  border: '1px solid var(--border)'
                }}
              >
                <h3 style={{
                  fontFamily: 'var(--font-body)',
                  fontSize: 'var(--font-size-body-sm)',
                  fontWeight: 'var(--font-weight-semibold)',
                  color: '#0A0A0A',
                  textTransform: 'uppercase',
                  letterSpacing: '0.5px',
                }}>
                  Información básica
                </h3>

                {/* Título */}
                <div>
                  <label style={{
                    display: 'block',
                    fontFamily: 'var(--font-body)',
                    fontSize: 'var(--font-size-body-sm)',
                    fontWeight: 'var(--font-weight-medium)',
                    color: '#0A0A0A',
                    marginBottom: '8px',
                  }}>
                    Título de la publicación <span style={{ color: '#DC2626' }}>*</span>
                  </label>
                  <input
                    type="text"
                    value={formData.title}
                    onChange={(e) => {
                      setFormData({ ...formData, title: e.target.value });
                      const newErrors = { ...errors };
                      delete newErrors.title;
                      setErrors(newErrors);
                      if (Object.keys(newErrors).length === 0) {
                        setShowValidationAlert(false);
                      }
                    }}
                    placeholder="Ej: Parcela con vista al valle en Pirque"
                    style={{
                      width: '100%',
                      padding: '12px 16px',
                      backgroundColor: '#FAFAFA',
                      border: errors.title ? '1px solid #DC2626' : '1px solid var(--border)',
                      borderRadius: '8px',
                      fontFamily: 'var(--font-body)',
                      fontSize: 'var(--font-size-body-base)',
                      color: '#0A0A0A',
                      outline: 'none',
                    }}
                    onFocus={(e) => {
                      if (!errors.title) e.currentTarget.style.borderColor = '#006B4E';
                    }}
                    onBlur={(e) => {
                      if (!errors.title) e.currentTarget.style.borderColor = '#DEDEDE';
                    }}
                  />
                </div>

                {/* Descripción */}
                <div>
                  <label style={{
                    display: 'block',
                    fontFamily: 'var(--font-body)',
                    fontSize: 'var(--font-size-body-sm)',
                    fontWeight: 'var(--font-weight-medium)',
                    color: '#0A0A0A',
                    marginBottom: '8px',
                  }}>
                    Descripción <span style={{ color: '#DC2626' }}>*</span>
                  </label>
                  <textarea
                    value={formData.description}
                    onChange={(e) => {
                      setFormData({ ...formData, description: e.target.value });
                      const newErrors = { ...errors };
                      delete newErrors.description;
                      setErrors(newErrors);
                      if (Object.keys(newErrors).length === 0) {
                        setShowValidationAlert(false);
                      }
                    }}
                    placeholder="Describe las características principales, beneficios y atractivos de tu parcela..."
                    rows={5}
                    style={{
                      width: '100%',
                      padding: '12px 16px',
                      backgroundColor: '#FAFAFA',
                      border: errors.description ? '1px solid #DC2626' : '1px solid var(--border)',
                      borderRadius: '8px',
                      fontFamily: 'var(--font-body)',
                      fontSize: 'var(--font-size-body-base)',
                      color: '#0A0A0A',
                      outline: 'none',
                      resize: 'vertical',
                    }}
                    onFocus={(e) => {
                      if (!errors.description) e.currentTarget.style.borderColor = '#006B4E';
                    }}
                    onBlur={(e) => {
                      if (!errors.description) e.currentTarget.style.borderColor = '#DEDEDE';
                    }}
                  />
                </div>
              </div>

              {/* Sección 2: Imágenes de la parcela */}
              <div 
                className="p-6 rounded-xl space-y-5"
                style={{
                  backgroundColor: '#FFFFFF',
                  border: '1px solid var(--border)'
                }}
              >
                <h3 style={{
                  fontFamily: 'var(--font-body)',
                  fontSize: 'var(--font-size-body-sm)',
                  fontWeight: 'var(--font-weight-semibold)',
                  color: '#0A0A0A',
                  textTransform: 'uppercase',
                  letterSpacing: '0.5px',
                }}>
                  Imágenes de la parcela
                </h3>

                {/* Imagen principal */}
                <div>
                  <label style={{
                    display: 'block',
                    fontFamily: 'var(--font-body)',
                    fontSize: 'var(--font-size-body-sm)',
                    fontWeight: 'var(--font-weight-medium)',
                    color: '#0A0A0A',
                    marginBottom: '8px',
                  }}>
                    Imagen principal
                  </label>
                  
                  {!imagePreview ? (
                    <label 
                      className="cursor-pointer block"
                      style={{
                        border: fileErrors.mainImage ? '2px dashed #DC2626' : '2px dashed #DEDEDE',
                        borderRadius: '12px',
                        padding: '24px',
                        backgroundColor: '#FAFAFA',
                        transition: 'all 0.2s',
                      }}
                      onMouseEnter={(e) => {
                        if (!fileErrors.mainImage) {
                          e.currentTarget.style.borderColor = '#006B4E';
                          e.currentTarget.style.backgroundColor = '#F9FAFB';
                        }
                      }}
                      onMouseLeave={(e) => {
                        if (!fileErrors.mainImage) {
                          e.currentTarget.style.borderColor = '#DEDEDE';
                          e.currentTarget.style.backgroundColor = '#FAFAFA';
                        }
                      }}
                    >
                      <input
                        type="file"
                        accept="image/*"
                        onChange={handleMainImageUpload}
                        className="hidden"
                      />
                      <div className="flex flex-col items-center gap-2">
                        <div 
                          className="w-10 h-10 rounded-full flex items-center justify-center"
                          style={{ backgroundColor: '#F0F0F0' }}
                        >
                          <ImageIcon size={20} style={{ color: '#006B4E' }} />
                        </div>
                        <div className="text-center">
                          <p style={{
                            fontFamily: 'var(--font-body)',
                            fontSize: 'var(--font-size-body-sm)',
                            fontWeight: 'var(--font-weight-medium)',
                            color: '#0A0A0A',
                            marginBottom: '2px',
                          }}>
                            Haz clic para subir o arrastra la imagen
                          </p>
                          <p style={{
                            fontFamily: 'var(--font-body)',
                            fontSize: 'var(--font-size-xs)',
                            color: '#737373',
                          }}>
                            PNG, JPG hasta 5MB
                          </p>
                        </div>
                      </div>
                    </label>
                  ) : (
                    <div className="relative">
                      <img 
                        src={imagePreview} 
                        alt="Preview" 
                        style={{
                          width: '100%',
                          height: '180px',
                          objectFit: 'cover',
                          borderRadius: '12px'
                        }}
                      />
                      <button
                        onClick={() => {
                          setImagePreview('');
                          setFormData({ ...formData, mainImage: null });
                        }}
                        className="absolute top-3 right-3 p-2 rounded-lg transition-colors"
                        style={{
                          backgroundColor: 'rgba(255, 255, 255, 0.9)',
                          color: '#DC2626'
                        }}
                        onMouseEnter={(e) => e.currentTarget.style.backgroundColor = '#FEE2E2'}
                        onMouseLeave={(e) => e.currentTarget.style.backgroundColor = 'rgba(255, 255, 255, 0.9)'}
                      >
                        <Trash2 size={18} />
                      </button>
                    </div>
                  )}
                  
                  {/* Mensaje de error */}
                  {fileErrors.mainImage && (
                    <div 
                      className="mt-2 px-3 py-2 rounded-lg flex items-start gap-2"
                      style={{ backgroundColor: '#FEF2F2', border: '1px solid #FCA5A5' }}
                    >
                      <AlertCircle size={16} style={{ color: '#DC2626', marginTop: '2px', flexShrink: 0 }} />
                      <p style={{ 
                        fontFamily: 'var(--font-body)',
                        fontSize: 'var(--font-size-body-sm)',
                        color: '#DC2626',
                        lineHeight: '1.5'
                      }}>
                        {fileErrors.mainImage}
                      </p>
                    </div>
                  )}
                </div>

                {/* Galería de imágenes */}
                <div>
                  <label style={{
                    display: 'block',
                    fontFamily: 'var(--font-body)',
                    fontSize: 'var(--font-size-body-sm)',
                    fontWeight: 'var(--font-weight-medium)',
                    color: '#0A0A0A',
                    marginBottom: '8px',
                  }}>
                    Galería de imágenes (opcional)
                  </label>

                  {galleryPreviews.length > 0 && (
                    <div className="grid grid-cols-4 gap-3 mb-3">
                      {galleryPreviews.map((preview, index) => (
                        <div key={index} className="relative group">
                          <img 
                            src={preview} 
                            alt={`Gallery ${index + 1}`}
                            style={{
                              width: '100%',
                              height: '100px',
                              objectFit: 'cover',
                              borderRadius: '8px'
                            }}
                          />
                          <button
                            onClick={() => removeGalleryImage(index)}
                            className="absolute top-2 right-2 p-1.5 rounded-lg transition-opacity opacity-0 group-hover:opacity-100"
                            style={{
                              backgroundColor: 'rgba(255, 255, 255, 0.95)',
                              color: '#DC2626'
                            }}
                          >
                            <Trash2 size={14} />
                          </button>
                        </div>
                      ))}
                    </div>
                  )}

                  <label 
                    className="cursor-pointer block"
                    style={{
                      border: fileErrors.galleryImages ? '2px dashed #DC2626' : '2px dashed #DEDEDE',
                      borderRadius: '8px',
                      padding: '16px',
                      backgroundColor: '#FAFAFA',
                      transition: 'all 0.2s',
                    }}
                    onMouseEnter={(e) => {
                      if (!fileErrors.galleryImages) {
                        e.currentTarget.style.borderColor = '#006B4E';
                        e.currentTarget.style.backgroundColor = '#F9FAFB';
                      }
                    }}
                    onMouseLeave={(e) => {
                      if (!fileErrors.galleryImages) {
                        e.currentTarget.style.borderColor = '#DEDEDE';
                        e.currentTarget.style.backgroundColor = '#FAFAFA';
                      }
                    }}
                  >
                    <input
                      type="file"
                      accept="image/*"
                      multiple
                      onChange={handleGalleryUpload}
                      className="hidden"
                    />
                    <div className="flex items-center justify-center gap-2">
                      <Upload size={16} style={{ color: '#006B4E' }} />
                      <span style={{
                        fontFamily: 'var(--font-body)',
                        fontSize: 'var(--font-size-body-sm)',
                        fontWeight: 'var(--font-weight-medium)',
                        color: '#0A0A0A',
                      }}>
                        Agregar más imágenes
                      </span>
                    </div>
                  </label>

                  {/* Mensaje de error */}
                  {fileErrors.galleryImages && (
                    <div 
                      className="mt-2 px-3 py-2 rounded-lg flex items-start gap-2"
                      style={{ backgroundColor: '#FEF2F2', border: '1px solid #FCA5A5' }}
                    >
                      <AlertCircle size={16} style={{ color: '#DC2626', marginTop: '2px', flexShrink: 0 }} />
                      <p style={{ 
                        fontFamily: 'var(--font-body)',
                        fontSize: 'var(--font-size-body-sm)',
                        color: '#DC2626',
                        lineHeight: '1.5'
                      }}>
                        {fileErrors.galleryImages}
                      </p>
                    </div>
                  )}

                  {/* Texto de ayuda */}
                  <p style={{
                    fontFamily: 'var(--font-body)',
                    fontSize: 'var(--font-size-xs)',
                    color: '#737373',
                    marginTop: '8px',
                    lineHeight: 'var(--line-height-body)',
                  }}>
                    Las publicaciones con más imágenes suelen recibir más consultas.
                  </p>
                </div>
              </div>

              {/* Sección 3: Datos de la parcela */}
              <div 
                className="p-6 rounded-xl space-y-5"
                style={{
                  backgroundColor: '#FFFFFF',
                  border: '1px solid var(--border)'
                }}
              >
                <h3 style={{
                  fontFamily: 'var(--font-body)',
                  fontSize: 'var(--font-size-body-sm)',
                  fontWeight: 'var(--font-weight-semibold)',
                  color: '#0A0A0A',
                  textTransform: 'uppercase',
                  letterSpacing: '0.5px',
                }}>
                  Datos de la parcela
                </h3>

                {/* Grid de 2 columnas */}
                <div className="grid grid-cols-2 gap-5">
                  {/* Precio */}
                  <div>
                    <label style={{
                      display: 'block',
                      fontFamily: 'var(--font-body)',
                      fontSize: 'var(--font-size-body-sm)',
                      fontWeight: 'var(--font-weight-medium)',
                      color: '#0A0A0A',
                      marginBottom: '8px',
                    }}>
                      Precio <span style={{ color: '#DC2626' }}>*</span>
                    </label>
                    <input
                      type="text"
                      value={formData.price}
                      onChange={(e) => {
                        setFormData({ ...formData, price: e.target.value });
                        const newErrors = { ...errors };
                        delete newErrors.price;
                        setErrors(newErrors);
                        if (Object.keys(newErrors).length === 0) {
                          setShowValidationAlert(false);
                        }
                      }}
                      placeholder="Ej: 45.000.000"
                      style={{
                        width: '100%',
                        padding: '12px 16px',
                        backgroundColor: '#FAFAFA',
                        border: errors.price ? '1px solid #DC2626' : '1px solid var(--border)',
                        borderRadius: '8px',
                        fontFamily: 'var(--font-body)',
                        fontSize: 'var(--font-size-body-base)',
                        color: '#0A0A0A',
                        outline: 'none',
                      }}
                      onFocus={(e) => {
                        if (!errors.price) e.currentTarget.style.borderColor = '#006B4E';
                      }}
                      onBlur={(e) => {
                        if (!errors.price) e.currentTarget.style.borderColor = '#DEDEDE';
                      }}
                    />
                  </div>

                  {/* Moneda */}
                  <div>
                    <label style={{
                      display: 'block',
                      fontFamily: 'var(--font-body)',
                      fontSize: 'var(--font-size-body-sm)',
                      fontWeight: 'var(--font-weight-medium)',
                      color: '#0A0A0A',
                      marginBottom: '8px',
                    }}>
                      Moneda
                    </label>
                    <select
                      value={formData.currency}
                      onChange={(e) => setFormData({ ...formData, currency: e.target.value })}
                      style={{
                        width: '100%',
                        padding: '12px 16px',
                        backgroundColor: '#FAFAFA',
                        border: '1px solid var(--border)',
                        borderRadius: '8px',
                        fontFamily: 'var(--font-body)',
                        fontSize: 'var(--font-size-body-base)',
                        color: '#0A0A0A',
                        outline: 'none',
                      }}
                      onFocus={(e) => e.currentTarget.style.borderColor = '#006B4E'}
                      onBlur={(e) => e.currentTarget.style.borderColor = '#DEDEDE'}
                    >
                      <option value="CLP">CLP (Peso chileno)</option>
                      <option value="UF">UF (Unidad de fomento)</option>
                      <option value="USD">USD (Dólar)</option>
                    </select>
                  </div>

                  {/* Cantidad de dueños anteriores */}
                  <div>
                    <label style={{
                      display: 'block',
                      fontFamily: 'var(--font-body)',
                      fontSize: 'var(--font-size-body-sm)',
                      fontWeight: 'var(--font-weight-medium)',
                      color: '#0A0A0A',
                      marginBottom: '8px',
                    }}>
                      Condición
                    </label>
                    <select
                      value={formData.previousOwners}
                      onChange={(e) => setFormData({ ...formData, previousOwners: e.target.value })}
                      style={{
                        width: '100%',
                        padding: '12px 16px',
                        backgroundColor: '#FAFAFA',
                        border: '1px solid var(--border)',
                        borderRadius: '8px',
                        fontFamily: 'var(--font-body)',
                        fontSize: 'var(--font-size-body-base)',
                        color: '#0A0A0A',
                        outline: 'none',
                      }}
                      onFocus={(e) => e.currentTarget.style.borderColor = '#006B4E'}
                      onBlur={(e) => e.currentTarget.style.borderColor = '#DEDEDE'}
                    >
                      <option value="">Seleccionar</option>
                      <option value="primer-dueno">Primer dueño</option>
                      <option value="2">2 dueños anteriores</option>
                      <option value="3">3 dueños anteriores</option>
                      <option value="mas-de-3">Más de 3 dueños</option>
                    </select>
                  </div>

                  {/* Región */}
                  <div>
                    <label style={{
                      display: 'block',
                      fontFamily: 'var(--font-body)',
                      fontSize: 'var(--font-size-body-sm)',
                      fontWeight: 'var(--font-weight-medium)',
                      color: '#0A0A0A',
                      marginBottom: '8px',
                    }}>
                      Región <span style={{ color: '#DC2626' }}>*</span>
                    </label>
                    <select
                      value={formData.region}
                      onChange={(e) => {
                        setFormData({ ...formData, region: e.target.value, comuna: '' });
                        const newErrors = { ...errors };
                        delete newErrors.region;
                        setErrors(newErrors);
                        if (Object.keys(newErrors).length === 0) {
                          setShowValidationAlert(false);
                        }
                      }}
                      style={{
                        width: '100%',
                        padding: '12px 16px',
                        backgroundColor: '#FAFAFA',
                        border: errors.region ? '1px solid #DC2626' : '1px solid var(--border)',
                        borderRadius: '8px',
                        fontFamily: 'var(--font-body)',
                        fontSize: 'var(--font-size-body-base)',
                        color: '#0A0A0A',
                        outline: 'none',
                      }}
                      onFocus={(e) => {
                        if (!errors.region) e.currentTarget.style.borderColor = '#006B4E';
                      }}
                      onBlur={(e) => {
                        if (!errors.region) e.currentTarget.style.borderColor = '#DEDEDE';
                      }}
                    >
                      <option value="">Selecciona una región</option>
                      {Object.keys(regionesComunas).map((region) => (
                        <option key={region} value={region}>{region}</option>
                      ))}
                    </select>
                  </div>

                  {/* Comuna */}
                  <div>
                    <label style={{
                      display: 'block',
                      fontFamily: 'var(--font-body)',
                      fontSize: 'var(--font-size-body-sm)',
                      fontWeight: 'var(--font-weight-medium)',
                      color: '#0A0A0A',
                      marginBottom: '8px',
                    }}>
                      Comuna o ciudad <span style={{ color: '#DC2626' }}>*</span>
                    </label>
                    <select
                      value={formData.comuna}
                      onChange={(e) => {
                        setFormData({ ...formData, comuna: e.target.value });
                        const newErrors = { ...errors };
                        delete newErrors.comuna;
                        setErrors(newErrors);
                        if (Object.keys(newErrors).length === 0) {
                          setShowValidationAlert(false);
                        }
                      }}
                      disabled={!formData.region}
                      style={{
                        width: '100%',
                        padding: '12px 16px',
                        backgroundColor: formData.region ? '#FAFAFA' : '#F5F5F5',
                        border: errors.comuna ? '1px solid #DC2626' : '1px solid var(--border)',
                        borderRadius: '8px',
                        fontFamily: 'var(--font-body)',
                        fontSize: 'var(--font-size-body-base)',
                        color: formData.region ? '#0A0A0A' : '#C3C3C3',
                        outline: 'none',
                        cursor: formData.region ? 'pointer' : 'not-allowed',
                      }}
                      onFocus={(e) => {
                        if (formData.region && !errors.comuna) e.currentTarget.style.borderColor = '#006B4E';
                      }}
                      onBlur={(e) => {
                        if (!errors.comuna) e.currentTarget.style.borderColor = '#DEDEDE';
                      }}
                    >
                      <option value="">Selecciona una comuna</option>
                      {formData.region && regionesComunas[formData.region]?.map((comuna) => (
                        <option key={comuna} value={comuna}>{comuna}</option>
                      ))}
                    </select>
                  </div>

                  {/* Dirección o referencia */}
                  <div>
                    <label style={{
                      display: 'block',
                      fontFamily: 'var(--font-body)',
                      fontSize: 'var(--font-size-body-sm)',
                      fontWeight: 'var(--font-weight-medium)',
                      color: '#0A0A0A',
                      marginBottom: '8px',
                    }}>
                      Dirección o referencia
                    </label>
                    <input
                      type="text"
                      value={formData.address}
                      onChange={(e) => setFormData({ ...formData, address: e.target.value })}
                      placeholder="Ej: Camino Los Maitenes Km 12"
                      style={{
                        width: '100%',
                        padding: '12px 16px',
                        backgroundColor: '#FAFAFA',
                        border: '1px solid var(--border)',
                        borderRadius: '8px',
                        fontFamily: 'var(--font-body)',
                        fontSize: 'var(--font-size-body-base)',
                        color: '#0A0A0A',
                        outline: 'none',
                      }}
                      onFocus={(e) => e.currentTarget.style.borderColor = '#006B4E'}
                      onBlur={(e) => e.currentTarget.style.borderColor = '#DEDEDE'}
                    />
                  </div>
                </div>
              </div>

              {/* Sección 4: Brochure */}
              <div 
                className="p-6 rounded-xl space-y-5"
                style={{
                  backgroundColor: '#FFFFFF',
                  border: '1px solid var(--border)'
                }}
              >
                <h3 style={{
                  fontFamily: 'var(--font-body)',
                  fontSize: 'var(--font-size-body-sm)',
                  fontWeight: 'var(--font-weight-semibold)',
                  color: '#0A0A0A',
                  textTransform: 'uppercase',
                  letterSpacing: '0.5px',
                }}>
                  Brochure de la parcela
                </h3>

                <div>
                  <label style={{
                    display: 'block',
                    fontFamily: 'var(--font-body)',
                    fontSize: 'var(--font-size-body-sm)',
                    fontWeight: 'var(--font-weight-medium)',
                    color: '#0A0A0A',
                    marginBottom: '8px',
                  }}>
                    Brochure (PDF opcional)
                  </label>
                  
                  {!formData.brochure ? (
                    <label 
                      className="cursor-pointer block"
                      style={{
                        border: fileErrors.brochure ? '2px dashed #DC2626' : '2px dashed #DEDEDE',
                        borderRadius: '12px',
                        padding: '24px',
                        backgroundColor: '#FAFAFA',
                        transition: 'all 0.2s',
                      }}
                      onMouseEnter={(e) => {
                        if (!fileErrors.brochure) {
                          e.currentTarget.style.borderColor = '#006B4E';
                          e.currentTarget.style.backgroundColor = '#F9FAFB';
                        }
                      }}
                      onMouseLeave={(e) => {
                        if (!fileErrors.brochure) {
                          e.currentTarget.style.borderColor = '#DEDEDE';
                          e.currentTarget.style.backgroundColor = '#FAFAFA';
                        }
                      }}
                    >
                      <input
                        type="file"
                        accept=".pdf"
                        onChange={(e) => handleDocUpload('brochure' as keyof typeof formData, e)}
                        className="hidden"
                      />
                      <div className="flex flex-col items-center gap-2">
                        <div 
                          className="w-10 h-10 rounded-full flex items-center justify-center"
                          style={{ backgroundColor: '#F0F0F0' }}
                        >
                          <FileText size={20} style={{ color: '#006B4E' }} />
                        </div>
                        <div className="text-center">
                          <p style={{
                            fontFamily: 'var(--font-body)',
                            fontSize: 'var(--font-size-body-sm)',
                            fontWeight: 'var(--font-weight-medium)',
                            color: '#0A0A0A',
                            marginBottom: '2px',
                          }}>
                            Haz clic para subir el brochure
                          </p>
                          <p style={{
                            fontFamily: 'var(--font-body)',
                            fontSize: 'var(--font-size-xs)',
                            color: '#737373',
                          }}>
                            PDF hasta 10MB
                          </p>
                        </div>
                      </div>
                    </label>
                  ) : (
                    <div 
                      className="flex items-center justify-between p-4 rounded-lg"
                      style={{
                        backgroundColor: '#F0F9FF',
                        border: '1px solid #006B4E'
                      }}
                    >
                      <div className="flex items-center gap-3">
                        <div 
                          className="w-10 h-10 rounded-lg flex items-center justify-center"
                          style={{ 
                            backgroundColor: '#FFFFFF',
                            border: '1px solid var(--border)'
                          }}
                        >
                          <FileText size={20} style={{ color: '#006B4E' }} />
                        </div>
                        <div>
                          <p style={{
                            fontFamily: 'var(--font-body)',
                            fontSize: 'var(--font-size-body-sm)',
                            fontWeight: 'var(--font-weight-semibold)',
                            color: '#0A0A0A',
                          }}>
                            Brochure subido
                          </p>
                          <p style={{
                            fontFamily: 'var(--font-body)',
                            fontSize: 'var(--font-size-xs)',
                            color: '#647E3F',
                            marginTop: '2px',
                          }}>
                            Archivo listo ✓
                          </p>
                        </div>
                      </div>
                      <button
                        onClick={() => setFormData({ ...formData, brochure: null })}
                        className="p-2 rounded-lg transition-colors"
                        style={{
                          backgroundColor: 'rgba(255, 255, 255, 0.9)',
                          color: '#DC2626'
                        }}
                        onMouseEnter={(e) => e.currentTarget.style.backgroundColor = '#FEE2E2'}
                        onMouseLeave={(e) => e.currentTarget.style.backgroundColor = 'rgba(255, 255, 255, 0.9)'}
                      >
                        <Trash2 size={18} />
                      </button>
                    </div>
                  )}
                  
                  {/* Mensaje de error */}
                  {fileErrors.brochure && (
                    <div 
                      className="mt-2 px-3 py-2 rounded-lg flex items-start gap-2"
                      style={{ backgroundColor: '#FEF2F2', border: '1px solid #FCA5A5' }}
                    >
                      <AlertCircle size={16} style={{ color: '#DC2626', marginTop: '2px', flexShrink: 0 }} />
                      <p style={{ 
                        fontFamily: 'var(--font-body)',
                        fontSize: 'var(--font-size-body-sm)',
                        color: '#DC2626',
                        lineHeight: '1.5'
                      }}>
                        {fileErrors.brochure}
                      </p>
                    </div>
                  )}

                  <p style={{
                    fontFamily: 'var(--font-body)',
                    fontSize: 'var(--font-size-xs)',
                    color: '#737373',
                    marginTop: '8px',
                    lineHeight: 'var(--line-height-body)',
                  }}>
                    Un brochure ayuda a los interesados a conocer mejor tu parcela.
                  </p>
                </div>
              </div>
            </div>
          )}

          {/* Paso 2: Características */}
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
                  Características
                </h2>
                <p style={{
                  fontFamily: 'var(--font-body)',
                  fontSize: 'var(--font-size-body-base)',
                  color: '#737373',
                  marginTop: '8px',
                  lineHeight: 'var(--line-height-body)',
                }}>
                  Selecciona las características que tiene tu parcela
                </p>
              </div>

              <div className="space-y-8">
                {/* Uso del terreno */}
                <div>
                  <h3 style={{
                    fontFamily: 'var(--font-body)',
                    fontSize: 'var(--font-size-body-base)',
                    fontWeight: 'var(--font-weight-semibold)',
                    color: '#0A0A0A',
                    marginBottom: '12px',
                  }}>
                    Uso del terreno
                  </h3>
                  <label 
                    className="flex items-center gap-2 mb-4 cursor-pointer"
                    style={{
                      paddingLeft: '2px',
                    }}
                  >
                    <input
                      type="checkbox"
                      checked={areAllSelected(landUseKeys)}
                      onChange={() => toggleAll(landUseKeys)}
                      style={{
                        width: '16px',
                        height: '16px',
                        accentColor: '#006B4E',
                        cursor: 'pointer',
                        flexShrink: 0,
                      }}
                    />
                    <span style={{
                      fontFamily: 'var(--font-body)',
                      fontSize: 'var(--font-size-body-sm)',
                      fontWeight: 'var(--font-weight-regular)',
                      color: '#737373',
                    }}>
                      Seleccionar todas las opciones
                    </span>
                  </label>
                  <div className="grid grid-cols-2 gap-4">
                    {[
                      { key: 'residential', label: 'Residencial', icon: Home },
                      { key: 'tourist', label: 'Turístico', icon: Compass },
                      { key: 'agricultural', label: 'Agrícola', icon: Wheat },
                      { key: 'commercial', label: 'Comercial', icon: Store },
                    ].map((item) => {
                      const Icon = item.icon;
                      return (
                        <label 
                          key={item.key}
                          className="flex items-center gap-3 p-4 rounded-lg cursor-pointer transition-all"
                          style={{
                            backgroundColor: formData[item.key as keyof typeof formData] ? '#F0F9FF' : '#FAFAFA',
                            border: formData[item.key as keyof typeof formData] ? '2px solid #006B4E' : '1px solid var(--border)',
                          }}
                        >
                          <Icon 
                            size={20} 
                            style={{ 
                              color: formData[item.key as keyof typeof formData] ? '#006B4E' : '#737373',
                              flexShrink: 0 
                            }} 
                          />
                          <span style={{
                            fontFamily: 'var(--font-body)',
                            fontSize: 'var(--font-size-body-sm)',
                            fontWeight: 'var(--font-weight-medium)',
                            color: '#0A0A0A',
                            flex: 1,
                          }}>
                            {item.label}
                          </span>
                          <input
                            type="checkbox"
                            checked={formData[item.key as keyof typeof formData] as boolean}
                            onChange={(e) => setFormData({ ...formData, [item.key]: e.target.checked })}
                            style={{
                              width: '18px',
                              height: '18px',
                              accentColor: '#006B4E',
                              cursor: 'pointer',
                              flexShrink: 0,
                            }}
                          />
                        </label>
                      );
                    })}
                  </div>
                </div>

                {/* Características físicas */}
                <div>
                  <h3 style={{
                    fontFamily: 'var(--font-body)',
                    fontSize: 'var(--font-size-body-base)',
                    fontWeight: 'var(--font-weight-semibold)',
                    color: '#0A0A0A',
                    marginBottom: '12px',
                  }}>
                    Características físicas
                  </h3>
                  <label 
                    className="flex items-center gap-2 mb-4 cursor-pointer"
                    style={{
                      paddingLeft: '2px',
                    }}
                  >
                    <input
                      type="checkbox"
                      checked={areAllSelected(physicalFeaturesKeys)}
                      onChange={() => toggleAll(physicalFeaturesKeys)}
                      style={{
                        width: '16px',
                        height: '16px',
                        accentColor: '#006B4E',
                        cursor: 'pointer',
                        flexShrink: 0,
                      }}
                    />
                    <span style={{
                      fontFamily: 'var(--font-body)',
                      fontSize: 'var(--font-size-body-sm)',
                      fontWeight: 'var(--font-weight-regular)',
                      color: '#737373',
                    }}>
                      Seleccionar todas las opciones
                    </span>
                  </label>
                  <div className="grid grid-cols-2 gap-4">
                    {[
                      { key: 'lakeView', label: 'Vista a lago', icon: Waves },
                      { key: 'mountainView', label: 'Vista a montaña', icon: Mountain },
                      { key: 'nativeForest', label: 'Bosque nativo', icon: Trees },
                      { key: 'surroundedByNature', label: 'Rodeado de naturaleza', icon: Leaf },
                    ].map((item) => {
                      const Icon = item.icon;
                      return (
                        <label 
                          key={item.key}
                          className="flex items-center gap-3 p-4 rounded-lg cursor-pointer transition-all"
                          style={{
                            backgroundColor: formData[item.key as keyof typeof formData] ? '#F0F9FF' : '#FAFAFA',
                            border: formData[item.key as keyof typeof formData] ? '2px solid #006B4E' : '1px solid var(--border)',
                          }}
                        >
                          <Icon 
                            size={20} 
                            style={{ 
                              color: formData[item.key as keyof typeof formData] ? '#006B4E' : '#737373',
                              flexShrink: 0 
                            }} 
                          />
                          <span style={{
                            fontFamily: 'var(--font-body)',
                            fontSize: 'var(--font-size-body-sm)',
                            fontWeight: 'var(--font-weight-medium)',
                            color: '#0A0A0A',
                            flex: 1,
                          }}>
                            {item.label}
                          </span>
                          <input
                            type="checkbox"
                            checked={formData[item.key as keyof typeof formData] as boolean}
                            onChange={(e) => setFormData({ ...formData, [item.key]: e.target.checked })}
                            style={{
                              width: '18px',
                              height: '18px',
                              accentColor: '#006B4E',
                              cursor: 'pointer',
                              flexShrink: 0,
                            }}
                          />
                        </label>
                      );
                    })}
                  </div>
                </div>

                {/* Servicios */}
                <div>
                  <h3 style={{
                    fontFamily: 'var(--font-body)',
                    fontSize: 'var(--font-size-body-base)',
                    fontWeight: 'var(--font-weight-semibold)',
                    color: '#0A0A0A',
                    marginBottom: '12px',
                  }}>
                    Servicios
                  </h3>
                  <label 
                    className="flex items-center gap-2 mb-4 cursor-pointer"
                    style={{
                      paddingLeft: '2px',
                    }}
                  >
                    <input
                      type="checkbox"
                      checked={areAllSelected(servicesKeys)}
                      onChange={() => toggleAll(servicesKeys)}
                      style={{
                        width: '16px',
                        height: '16px',
                        accentColor: '#006B4E',
                        cursor: 'pointer',
                        flexShrink: 0,
                      }}
                    />
                    <span style={{
                      fontFamily: 'var(--font-body)',
                      fontSize: 'var(--font-size-body-sm)',
                      fontWeight: 'var(--font-weight-regular)',
                      color: '#737373',
                    }}>
                      Seleccionar todas las opciones
                    </span>
                  </label>
                  <div className="grid grid-cols-3 gap-4">
                    {[
                      { key: 'drinkingWater', label: 'Agua potable', icon: Droplet },
                      { key: 'networkWater', label: 'Agua de red', icon: Droplet },
                      { key: 'wellWater', label: 'Agua en pozo', icon: Droplet },
                      { key: 'tankTruckWater', label: 'Camión aljibe', icon: Droplet },
                      { key: 'undergroundElectricity', label: 'Luz soterrada', icon: Zap },
                      { key: 'electricalPole', label: 'Luz postación eléctrica', icon: Zap },
                      { key: 'solarPanel', label: 'Panel solar', icon: Sun },
                      { key: 'internetAccess', label: 'Acceso a internet', icon: Wifi },
                      { key: 'stabilizedRoad', label: 'Camino estabilizado', icon: Route },
                      { key: 'pavedRoad', label: 'Camino pavimentado', icon: Route },
                      { key: 'securityCameras', label: 'Cámaras de seguridad', icon: Camera },
                      { key: 'commonAreas', label: 'Áreas comunes', icon: Home },
                      { key: 'recyclingZone', label: 'Zona de reciclaje', icon: Recycle },
                      { key: 'wasteZone', label: 'Zona de basura', icon: Trash },
                    ].map((item) => {
                      const Icon = item.icon;
                      return (
                        <label 
                          key={item.key}
                          className="flex items-center gap-3 p-4 rounded-lg cursor-pointer transition-all"
                          style={{
                            backgroundColor: formData[item.key as keyof typeof formData] ? '#F0F9FF' : '#FAFAFA',
                            border: formData[item.key as keyof typeof formData] ? '2px solid #006B4E' : '1px solid var(--border)',
                          }}
                        >
                          <Icon 
                            size={20} 
                            style={{ 
                              color: formData[item.key as keyof typeof formData] ? '#006B4E' : '#737373',
                              flexShrink: 0 
                            }} 
                          />
                          <span style={{
                            fontFamily: 'var(--font-body)',
                            fontSize: 'var(--font-size-body-sm)',
                            fontWeight: 'var(--font-weight-medium)',
                            color: '#0A0A0A',
                            flex: 1,
                          }}>
                            {item.label}
                          </span>
                          <input
                            type="checkbox"
                            checked={formData[item.key as keyof typeof formData] as boolean}
                            onChange={(e) => setFormData({ ...formData, [item.key]: e.target.checked })}
                            style={{
                              width: '18px',
                              height: '18px',
                              accentColor: '#006B4E',
                              cursor: 'pointer',
                              flexShrink: 0,
                            }}
                          />
                        </label>
                      );
                    })}
                  </div>
                </div>
                
                {/* Estado o condiciones */}
                <div>
                  <h3 style={{
                    fontFamily: 'var(--font-body)',
                    fontSize: 'var(--font-size-body-base)',
                    fontWeight: 'var(--font-weight-semibold)',
                    color: '#0A0A0A',
                    marginBottom: '12px',
                  }}>
                    Estado o condiciones
                  </h3>
                  <label 
                    className="flex items-center gap-2 mb-4 cursor-pointer"
                    style={{
                      paddingLeft: '2px',
                    }}
                  >
                    <input
                      type="checkbox"
                      checked={areAllSelected(conditionsKeys)}
                      onChange={() => toggleAll(conditionsKeys)}
                      style={{
                        width: '16px',
                        height: '16px',
                        accentColor: '#006B4E',
                        cursor: 'pointer',
                        flexShrink: 0,
                      }}
                    />
                    <span style={{
                      fontFamily: 'var(--font-body)',
                      fontSize: 'var(--font-size-body-sm)',
                      fontWeight: 'var(--font-weight-regular)',
                      color: '#737373',
                    }}>
                      Seleccionar todas las opciones
                    </span>
                  </label>
                  <div className="grid grid-cols-3 gap-4">
                    {[
                      { key: 'readyToDeed', label: 'Listo para escriturar', icon: FileCheck },
                      { key: 'permittedUse', label: 'Uso permitido', icon: Settings },
                      { key: 'designRules', label: 'Reglas de diseño', icon: Settings },
                    ].map((item) => {
                      const Icon = item.icon;
                      return (
                        <label 
                          key={item.key}
                          className="flex items-center gap-3 p-4 rounded-lg cursor-pointer transition-all"
                          style={{
                            backgroundColor: formData[item.key as keyof typeof formData] ? '#F0F9FF' : '#FAFAFA',
                            border: formData[item.key as keyof typeof formData] ? '2px solid #006B4E' : '1px solid var(--border)',
                          }}
                        >
                          <Icon 
                            size={20} 
                            style={{ 
                              color: formData[item.key as keyof typeof formData] ? '#006B4E' : '#737373',
                              flexShrink: 0 
                            }} 
                          />
                          <span style={{
                            fontFamily: 'var(--font-body)',
                            fontSize: 'var(--font-size-body-sm)',
                            fontWeight: 'var(--font-weight-medium)',
                            color: '#0A0A0A',
                            flex: 1,
                          }}>
                            {item.label}
                          </span>
                          <input
                            type="checkbox"
                            checked={formData[item.key as keyof typeof formData] as boolean}
                            onChange={(e) => setFormData({ ...formData, [item.key]: e.target.checked })}
                            style={{
                              width: '18px',
                              height: '18px',
                              accentColor: '#006B4E',
                              cursor: 'pointer',
                              flexShrink: 0,
                            }}
                          />
                        </label>
                      );
                    })}
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* Paso 3: Ubicación y mapas */}
          {currentStep === 3 && (
            <div className="space-y-8">
              <div>
                <h2 style={{
                  fontFamily: 'var(--font-heading)',
                  fontSize: 'var(--font-size-h2)',
                  fontWeight: 'var(--font-weight-regular)',
                  color: '#0A0A0A',
                  lineHeight: 'var(--line-height-heading)',
                }}>
                  Ubicación y mapas
                </h2>
                <p style={{
                  fontFamily: 'var(--font-body)',
                  fontSize: 'var(--font-size-body-base)',
                  color: '#737373',
                  marginTop: '8px',
                  lineHeight: 'var(--line-height-body)',
                }}>
                  Especifica la ubicación exacta de tu parcela
                </p>
              </div>

              <div className="space-y-6">
                {/* Grid de 2 columnas */}
                <div className="grid grid-cols-2 gap-6">
                  {/* Región */}
                  <div>
                    <label style={{
                      display: 'block',
                      fontFamily: 'var(--font-body)',
                      fontSize: 'var(--font-size-body-sm)',
                      fontWeight: 'var(--font-weight-medium)',
                      color: '#0A0A0A',
                      marginBottom: '8px',
                    }}>
                      Región
                    </label>
                    <select
                      value={formData.region}
                      onChange={(e) => setFormData({ ...formData, region: e.target.value, comuna: '' })}
                      style={{
                        width: '100%',
                        padding: '12px 16px',
                        backgroundColor: '#FAFAFA',
                        border: '1px solid var(--border)',
                        borderRadius: '8px',
                        fontFamily: 'var(--font-body)',
                        fontSize: 'var(--font-size-body-base)',
                        color: '#0A0A0A',
                        outline: 'none',
                      }}
                      onFocus={(e) => e.currentTarget.style.borderColor = '#006B4E'}
                      onBlur={(e) => e.currentTarget.style.borderColor = '#DEDEDE'}
                    >
                      <option value="">Selecciona una región</option>
                      {Object.keys(regionesComunas).map((region) => (
                        <option key={region} value={region}>{region}</option>
                      ))}
                    </select>
                  </div>

                  {/* Comuna */}
                  <div>
                    <label style={{
                      display: 'block',
                      fontFamily: 'var(--font-body)',
                      fontSize: 'var(--font-size-body-sm)',
                      fontWeight: 'var(--font-weight-medium)',
                      color: '#0A0A0A',
                      marginBottom: '8px',
                    }}>
                      Comuna
                    </label>
                    <select
                      value={formData.comuna}
                      onChange={(e) => setFormData({ ...formData, comuna: e.target.value })}
                      disabled={!formData.region}
                      style={{
                        width: '100%',
                        padding: '12px 16px',
                        backgroundColor: formData.region ? '#FAFAFA' : '#F5F5F5',
                        border: '1px solid var(--border)',
                        borderRadius: '8px',
                        fontFamily: 'var(--font-body)',
                        fontSize: 'var(--font-size-body-base)',
                        color: formData.region ? '#0A0A0A' : '#C3C3C3',
                        outline: 'none',
                        cursor: formData.region ? 'pointer' : 'not-allowed',
                      }}
                      onFocus={(e) => {
                        if (formData.region) e.currentTarget.style.borderColor = '#006B4E';
                      }}
                      onBlur={(e) => e.currentTarget.style.borderColor = '#DEDEDE'}
                    >
                      <option value="">Selecciona una comuna</option>
                      {formData.region && regionesComunas[formData.region]?.map((comuna) => (
                        <option key={comuna} value={comuna}>{comuna}</option>
                      ))}
                    </select>
                  </div>
                </div>

                {/* Tabs: 360, Plano, Mapa */}
                <div 
                  className="p-6 rounded-xl space-y-5"
                  style={{
                    backgroundColor: '#FFFFFF',
                    border: '1px solid var(--border)'
                  }}
                >
                  {/* Tabs Header */}
                  <div className="flex gap-1 p-1 rounded-lg" style={{ backgroundColor: '#FAFAFA' }}>
                    {[
                      { key: '360' as const, label: '360' },
                      { key: 'plano' as const, label: 'Plano' },
                      { key: 'mapa' as const, label: 'Mapa' },
                    ].map((tab) => (
                      <button
                        key={tab.key}
                        type="button"
                        onClick={() => setActiveMapTab(tab.key)}
                        className="flex-1 py-2 px-4 rounded-md transition-all"
                        style={{
                          fontFamily: 'var(--font-body)',
                          fontSize: 'var(--font-size-body-sm)',
                          fontWeight: activeMapTab === tab.key ? 'var(--font-weight-semibold)' : 'var(--font-weight-medium)',
                          color: activeMapTab === tab.key ? '#0A0A0A' : '#737373',
                          backgroundColor: activeMapTab === tab.key ? '#FFFFFF' : 'transparent',
                          border: 'none',
                          cursor: 'pointer',
                          boxShadow: activeMapTab === tab.key ? '0 1px 2px rgba(0, 0, 0, 0.05)' : 'none',
                          borderBottom: activeMapTab === tab.key ? '2px solid #647E3F' : '2px solid transparent',
                        }}
                      >
                        {tab.label}
                      </button>
                    ))}
                  </div>

                  {/* Tab Content: 360 */}
                  {activeMapTab === '360' && (
                    <div className="space-y-4">
                      <label style={{
                        display: 'block',
                        fontFamily: 'var(--font-body)',
                        fontSize: 'var(--font-size-body-sm)',
                        fontWeight: 'var(--font-weight-medium)',
                        color: '#0A0A0A',
                        marginBottom: '8px',
                      }}>
                        Vista 360° (URL de iframe)
                      </label>
                      <div className="flex items-center gap-3">
                        <div 
                          className="w-10 h-10 rounded-lg flex items-center justify-center flex-shrink-0"
                          style={{ 
                            backgroundColor: '#FAFAFA',
                            border: '1px solid var(--border)'
                          }}
                        >
                          <Move size={20} style={{ color: '#006B4E' }} />
                        </div>
                        <input
                          type="url"
                          value={formData.view360}
                          onChange={(e) => setFormData({ ...formData, view360: e.target.value })}
                          placeholder="https://ejemplo.com/vista-360"
                          style={{
                            flex: 1,
                            padding: '12px 16px',
                            backgroundColor: '#FAFAFA',
                            border: '1px solid var(--border)',
                            borderRadius: '8px',
                            fontFamily: 'var(--font-body)',
                            fontSize: 'var(--font-size-body-base)',
                            color: '#0A0A0A',
                            outline: 'none',
                          }}
                          onFocus={(e) => e.currentTarget.style.borderColor = '#006B4E'}
                          onBlur={(e) => e.currentTarget.style.borderColor = '#DEDEDE'}
                        />
                      </div>
                      <p style={{
                        fontFamily: 'var(--font-body)',
                        fontSize: 'var(--font-size-xs)',
                        color: '#737373',
                        lineHeight: 'var(--line-height-body)',
                      }}>
                        Agrega un enlace para mostrar una vista de 360° de la parcela.
                      </p>
                    </div>
                  )}

                  {/* Tab Content: Plano */}
                  {activeMapTab === 'plano' && (
                    <div>
                      {!masterPlanPreview ? (
                        <label 
                          className="cursor-pointer block"
                          style={{
                            border: fileErrors.masterPlan ? '2px dashed #DC2626' : '2px dashed #DEDEDE',
                            borderRadius: '12px',
                            padding: '32px',
                            backgroundColor: '#FAFAFA',
                            transition: 'all 0.2s',
                          }}
                          onMouseEnter={(e) => {
                            if (!fileErrors.masterPlan) {
                              e.currentTarget.style.borderColor = '#006B4E';
                              e.currentTarget.style.backgroundColor = '#F9FAFB';
                            }
                          }}
                          onMouseLeave={(e) => {
                            if (!fileErrors.masterPlan) {
                              e.currentTarget.style.borderColor = '#DEDEDE';
                              e.currentTarget.style.backgroundColor = '#FAFAFA';
                            }
                          }}
                        >
                          <input
                            type="file"
                            accept="image/*"
                            onChange={handleMasterPlanUpload}
                            className="hidden"
                          />
                          <div className="flex flex-col items-center gap-3">
                            <div 
                              className="w-12 h-12 rounded-full flex items-center justify-center"
                              style={{ backgroundColor: '#FFFFFF' }}
                            >
                              <Upload size={24} style={{ color: '#006B4E' }} />
                            </div>
                            <div className="text-center">
                              <p style={{
                                fontFamily: 'var(--font-body)',
                                fontSize: 'var(--font-size-body-sm)',
                                fontWeight: 'var(--font-weight-medium)',
                                color: '#0A0A0A',
                                marginBottom: '4px',
                              }}>
                                Subir plano de la parcela (masterplan)
                              </p>
                              <p style={{
                                fontFamily: 'var(--font-body)',
                                fontSize: 'var(--font-size-xs)',
                                color: '#737373',
                              }}>
                                PNG, JPG o PDF hasta 10MB
                              </p>
                            </div>
                          </div>
                        </label>
                      ) : (
                        <div className="relative">
                          <img 
                            src={masterPlanPreview} 
                            alt="Master plan preview" 
                            style={{
                              width: '100%',
                              height: '240px',
                              objectFit: 'contain',
                              borderRadius: '12px',
                              backgroundColor: '#FFFFFF',
                              border: '1px solid var(--border)',
                            }}
                          />
                          <button
                            type="button"
                            onClick={() => {
                              setMasterPlanPreview('');
                              setFormData({ ...formData, masterPlan: null });
                            }}
                            className="absolute top-3 right-3 p-2 rounded-lg transition-colors"
                            style={{
                              backgroundColor: 'rgba(255, 255, 255, 0.9)',
                              color: '#DC2626'
                            }}
                            onMouseEnter={(e) => e.currentTarget.style.backgroundColor = '#FEE2E2'}
                            onMouseLeave={(e) => e.currentTarget.style.backgroundColor = 'rgba(255, 255, 255, 0.9)'}
                          >
                            <Trash2 size={18} />
                          </button>
                        </div>
                      )}
                      
                      {/* Mensaje de error */}
                      {fileErrors.masterPlan && (
                        <div 
                          className="mt-3 px-3 py-2 rounded-lg flex items-start gap-2"
                          style={{ backgroundColor: '#FEF2F2', border: '1px solid #FCA5A5' }}
                        >
                          <AlertCircle size={16} style={{ color: '#DC2626', marginTop: '2px', flexShrink: 0 }} />
                          <p style={{ 
                            fontFamily: 'var(--font-body)',
                            fontSize: 'var(--font-size-body-sm)',
                            color: '#DC2626',
                            lineHeight: '1.5'
                          }}>
                            {fileErrors.masterPlan}
                          </p>
                        </div>
                      )}
                    </div>
                  )}

                  {/* Tab Content: Mapa */}
                  {activeMapTab === 'mapa' && (
                    <div className="space-y-5">
                      {/* Campos de coordenadas */}
                      <div className="grid grid-cols-2 gap-4">
                        {/* Latitud */}
                        <div>
                          <label style={{
                            display: 'block',
                            fontFamily: 'var(--font-body)',
                            fontSize: 'var(--font-size-body-sm)',
                            fontWeight: 'var(--font-weight-medium)',
                            color: '#0A0A0A',
                            marginBottom: '8px',
                          }}>
                            Latitud <span style={{ color: '#DC2626' }}>*</span>
                          </label>
                      <input
                        type="text"
                        value={formData.latitude}
                        onChange={(e) => {
                          setFormData({ ...formData, latitude: e.target.value });
                          const newErrors = { ...errors };
                          delete newErrors.coordinates;
                          setErrors(newErrors);
                          if (Object.keys(newErrors).length === 0) {
                            setShowValidationAlert(false);
                          }
                        }}
                        placeholder="Ej: -33.4569"
                        style={{
                          width: '100%',
                          padding: '12px 16px',
                          backgroundColor: '#FAFAFA',
                          border: errors.coordinates ? '1px solid #DC2626' : '1px solid var(--border)',
                          borderRadius: '8px',
                          fontFamily: 'var(--font-body)',
                          fontSize: 'var(--font-size-body-base)',
                          color: '#0A0A0A',
                          outline: 'none',
                        }}
                        onFocus={(e) => {
                          if (!errors.coordinates) e.currentTarget.style.borderColor = '#006B4E';
                        }}
                        onBlur={(e) => {
                          if (!errors.coordinates) e.currentTarget.style.borderColor = '#DEDEDE';
                        }}
                      />
                    </div>

                    {/* Longitud */}
                    <div>
                      <label style={{
                        display: 'block',
                        fontFamily: 'var(--font-body)',
                        fontSize: 'var(--font-size-body-sm)',
                        fontWeight: 'var(--font-weight-medium)',
                        color: '#0A0A0A',
                        marginBottom: '8px',
                      }}>
                        Longitud <span style={{ color: '#DC2626' }}>*</span>
                      </label>
                      <input
                        type="text"
                        value={formData.longitude}
                        onChange={(e) => {
                          setFormData({ ...formData, longitude: e.target.value });
                          const newErrors = { ...errors };
                          delete newErrors.coordinates;
                          setErrors(newErrors);
                          if (Object.keys(newErrors).length === 0) {
                            setShowValidationAlert(false);
                          }
                        }}
                        placeholder="Ej: -70.6483"
                        style={{
                          width: '100%',
                          padding: '12px 16px',
                          backgroundColor: '#FAFAFA',
                          border: errors.coordinates ? '1px solid #DC2626' : '1px solid var(--border)',
                          borderRadius: '8px',
                          fontFamily: 'var(--font-body)',
                          fontSize: 'var(--font-size-body-base)',
                          color: '#0A0A0A',
                          outline: 'none',
                        }}
                        onFocus={(e) => {
                          if (!errors.coordinates) e.currentTarget.style.borderColor = '#006B4E';
                        }}
                        onBlur={(e) => {
                          if (!errors.coordinates) e.currentTarget.style.borderColor = '#DEDEDE';
                        }}
                      />
                    </div>
                  </div>

                  {/* Mapa placeholder */}
                  <div 
                    className="flex flex-col items-center justify-center"
                    style={{ 
                      height: '380px', 
                      borderRadius: '12px',
                      border: '1px solid var(--border)',
                      backgroundColor: '#FAFAFA'
                    }}
                  >
                    <MapPin size={48} style={{ color: '#006B4E', marginBottom: '16px' }} />
                    <p style={{
                      fontFamily: 'var(--font-body)',
                      fontSize: 'var(--font-size-body-base)',
                      fontWeight: 'var(--font-weight-medium)',
                      color: '#0A0A0A',
                      marginBottom: '8px',
                    }}>
                      Vista previa del mapa
                    </p>
                    <p style={{
                      fontFamily: 'var(--font-body)',
                      fontSize: 'var(--font-size-body-sm)',
                      color: '#737373',
                      textAlign: 'center',
                      maxWidth: '400px',
                    }}>
                      {formData.latitude && formData.longitude 
                        ? `Coordenadas: ${formData.latitude}, ${formData.longitude}`
                        : 'Ingresa las coordenadas para ubicar la parcela en el mapa'}
                    </p>
                  </div>

                      {/* Texto de ayuda */}
                      <p style={{
                        fontFamily: 'var(--font-body)',
                        fontSize: 'var(--font-size-xs)',
                        color: '#737373',
                        lineHeight: 'var(--line-height-body)',
                      }}>
                        Ingresa las coordenadas para ubicar exactamente la parcela en el mapa.
                      </p>
                    </div>
                  )}
                </div>
              </div>
            </div>
          )}

          {/* Paso 4: Documentación */}
          {currentStep === 4 && (
            <div className="space-y-8">
              <div>
                <h2 style={{
                  fontFamily: 'var(--font-heading)',
                  fontSize: 'var(--font-size-h2)',
                  fontWeight: 'var(--font-weight-regular)',
                  color: '#0A0A0A',
                  lineHeight: 'var(--line-height-heading)',
                }}>
                  Documentación
                </h2>
                <p style={{
                  fontFamily: 'var(--font-body)',
                  fontSize: 'var(--font-size-body-base)',
                  color: '#737373',
                  marginTop: '8px',
                  lineHeight: 'var(--line-height-body)',
                }}>
                  Sube los documentos legales relacionados con la parcela. No es obligatorio subir todos, pero ayuda a generar más confianza
                </p>
              </div>

              <div className="space-y-4">
                {/* Documentos estándar */}
                {[
                  { key: 'terrainPlan', label: 'Plano del terreno', icon: FileText },
                  { key: 'rolAvaluo', label: 'Rol de avalúo', icon: FileText },
                  { key: 'serviceFeasibility', label: 'Factibilidad de servicios', icon: FileText },
                  { key: 'certificadoIP', label: 'Certificado de informaciones previas', icon: FileText },
                ].map((doc) => {
                  const Icon = doc.icon;
                  const fileUploaded = formData[doc.key as keyof typeof formData];
                  
                  return (
                    <div key={doc.key} className="space-y-2">
                      <div 
                        className="flex items-center justify-between p-5 rounded-xl"
                        style={{
                          backgroundColor: '#FAFAFA',
                          border: fileErrors[doc.key] ? '1px solid #DC2626' : '1px solid var(--border)',
                        }}
                      >
                      <div className="flex items-center gap-4">
                        <div 
                          className="w-10 h-10 rounded-lg flex items-center justify-center"
                          style={{ 
                            backgroundColor: '#FFFFFF',
                            border: '1px solid var(--border)'
                          }}
                        >
                          <Icon size={20} style={{ color: '#006B4E' }} />
                        </div>
                        <div>
                          <h3 style={{
                            fontFamily: 'var(--font-body)',
                            fontSize: 'var(--font-size-body-sm)',
                            fontWeight: 'var(--font-weight-semibold)',
                            color: '#0A0A0A',
                          }}>
                            {doc.label}
                          </h3>
                          {fileUploaded && (
                            <p style={{
                              fontFamily: 'var(--font-body)',
                              fontSize: 'var(--font-size-xs)',
                              color: '#647E3F',
                              marginTop: '2px',
                            }}>
                              Archivo subido ✓
                            </p>
                          )}
                        </div>
                      </div>
                      <label 
                        className="cursor-pointer px-4 py-2 rounded-full transition-colors flex items-center gap-2"
                        style={{
                          backgroundColor: fileUploaded ? '#F0F9FF' : '#FFFFFF',
                          border: fileUploaded ? '1px solid #006B4E' : '1px solid var(--border)',
                          color: fileUploaded ? '#006B4E' : '#0A0A0A',
                          fontFamily: 'var(--font-body)',
                          fontSize: 'var(--font-size-body-sm)',
                          fontWeight: 'var(--font-weight-medium)',
                        }}
                        onMouseEnter={(e) => {
                          e.currentTarget.style.backgroundColor = '#F9FAFB';
                        }}
                        onMouseLeave={(e) => {
                          e.currentTarget.style.backgroundColor = fileUploaded ? '#F0F9FF' : '#FFFFFF';
                        }}
                      >
                        <input
                          type="file"
                          accept=".pdf,.jpg,.jpeg,.png"
                          onChange={(e) => handleDocUpload(doc.key as keyof typeof formData, e)}
                          className="hidden"
                        />
                        <Upload size={16} />
                        {fileUploaded ? 'Cambiar' : 'Subir'}
                      </label>
                    </div>
                    
                    {/* Mensaje de error */}
                    {fileErrors[doc.key] && (
                      <div 
                        className="px-3 py-2 rounded-lg flex items-start gap-2"
                        style={{ backgroundColor: '#FEF2F2', border: '1px solid #FCA5A5' }}
                      >
                        <AlertCircle size={16} style={{ color: '#DC2626', marginTop: '2px', flexShrink: 0 }} />
                        <p style={{ 
                          fontFamily: 'var(--font-body)',
                          fontSize: 'var(--font-size-body-sm)',
                          color: '#DC2626',
                          lineHeight: '1.5'
                        }}>
                          {fileErrors[doc.key]}
                        </p>
                      </div>
                    )}
                  </div>
                  );
                })}

                {/* Documentos personalizados */}
                {formData.customDocs.map((doc, index) => (
                  <div 
                    key={index}
                    className="flex items-start gap-4 p-5 rounded-xl"
                    style={{
                      backgroundColor: '#FAFAFA',
                      border: '1px solid var(--border)',
                    }}
                  >
                    <div 
                      className="w-10 h-10 rounded-lg flex items-center justify-center flex-shrink-0"
                      style={{ 
                        backgroundColor: '#FFFFFF',
                        border: '1px solid var(--border)'
                      }}
                    >
                      <FileText size={20} style={{ color: '#006B4E' }} />
                    </div>
                    <div className="flex-1 space-y-3">
                      <input
                        type="text"
                        value={doc.name}
                        onChange={(e) => updateCustomDoc(index, 'name', e.target.value)}
                        placeholder="Nombre del documento"
                        style={{
                          width: '100%',
                          padding: '10px 14px',
                          backgroundColor: '#FFFFFF',
                          border: '1px solid var(--border)',
                          borderRadius: '8px',
                          fontFamily: 'var(--font-body)',
                          fontSize: 'var(--font-size-body-sm)',
                          color: '#0A0A0A',
                          outline: 'none',
                        }}
                        onFocus={(e) => e.currentTarget.style.borderColor = '#006B4E'}
                        onBlur={(e) => e.currentTarget.style.borderColor = '#DEDEDE'}
                      />
                      <label 
                        className="cursor-pointer px-4 py-2 rounded-full transition-colors inline-flex items-center gap-2"
                        style={{
                          backgroundColor: doc.file ? '#F0F9FF' : '#FFFFFF',
                          border: doc.file ? '1px solid #006B4E' : '1px solid var(--border)',
                          color: doc.file ? '#006B4E' : '#0A0A0A',
                          fontFamily: 'var(--font-body)',
                          fontSize: 'var(--font-size-body-sm)',
                          fontWeight: 'var(--font-weight-medium)',
                        }}
                        onMouseEnter={(e) => {
                          e.currentTarget.style.backgroundColor = '#F9FAFB';
                        }}
                        onMouseLeave={(e) => {
                          e.currentTarget.style.backgroundColor = doc.file ? '#F0F9FF' : '#FFFFFF';
                        }}
                      >
                        <input
                          type="file"
                          accept=".pdf,.jpg,.jpeg,.png"
                          onChange={(e) => {
                            if (e.target.files && e.target.files[0]) {
                              updateCustomDoc(index, 'file', e.target.files[0]);
                            }
                          }}
                          className="hidden"
                        />
                        <Upload size={16} />
                        {doc.file ? 'Archivo subido ✓' : 'Subir archivo'}
                      </label>
                    </div>
                    <button
                      onClick={() => removeCustomDoc(index)}
                      className="p-2 rounded-lg transition-colors"
                      style={{
                        backgroundColor: 'transparent',
                        color: '#DC2626'
                      }}
                      onMouseEnter={(e) => e.currentTarget.style.backgroundColor = '#FEE2E2'}
                      onMouseLeave={(e) => e.currentTarget.style.backgroundColor = 'transparent'}
                    >
                      <Trash2 size={18} />
                    </button>
                  </div>
                ))}

                {/* Botón para agregar documento personalizado */}
                <button
                  onClick={addCustomDoc}
                  className="w-full p-4 rounded-xl transition-all flex items-center justify-center gap-2"
                  style={{
                    backgroundColor: 'transparent',
                    border: '2px dashed #DEDEDE',
                    color: '#006B4E',
                    fontFamily: 'var(--font-body)',
                    fontSize: 'var(--font-size-body-sm)',
                    fontWeight: 'var(--font-weight-medium)',
                  }}
                  onMouseEnter={(e) => {
                    e.currentTarget.style.borderColor = '#006B4E';
                    e.currentTarget.style.backgroundColor = '#F9FAFB';
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.borderColor = '#DEDEDE';
                    e.currentTarget.style.backgroundColor = 'transparent';
                  }}
                >
                  <Plus size={18} />
                  Agregar documento
                </button>
              </div>
            </div>
          )}

          {/* Paso 5: Multimedia */}
          {currentStep === 5 && (
            <div className="space-y-8">
              <div>
                <h2 style={{
                  fontFamily: 'var(--font-heading)',
                  fontSize: 'var(--font-size-h2)',
                  fontWeight: 'var(--font-weight-regular)',
                  color: '#0A0A0A',
                  lineHeight: 'var(--line-height-heading)',
                }}>
                  Multimedia
                </h2>
                <p style={{
                  fontFamily: 'var(--font-body)',
                  fontSize: 'var(--font-size-body-base)',
                  color: '#737373',
                  marginTop: '8px',
                  lineHeight: 'var(--line-height-body)',
                }}>
                  Agrega contenido visual adicional para destacar tu publicación
                </p>
              </div>

              <div className="space-y-6">
                {/* Video de la parcela */}
                <div>
                  <label style={{
                    display: 'block',
                    fontFamily: 'var(--font-body)',
                    fontSize: 'var(--font-size-body-sm)',
                    fontWeight: 'var(--font-weight-medium)',
                    color: '#0A0A0A',
                    marginBottom: '8px',
                  }}>
                    Video de la parcela (YouTube o Vimeo)
                  </label>
                  <div className="flex items-center gap-3">
                    <div 
                      className="w-10 h-10 rounded-lg flex items-center justify-center flex-shrink-0"
                      style={{ 
                        backgroundColor: '#FAFAFA',
                        border: '1px solid var(--border)'
                      }}
                    >
                      <Video size={20} style={{ color: '#006B4E' }} />
                    </div>
                    <input
                      type="text"
                      value={formData.propertyVideo}
                      onChange={(e) => setFormData({ ...formData, propertyVideo: e.target.value })}
                      placeholder="https://youtube.com/watch?v=..."
                      style={{
                        flex: 1,
                        padding: '12px 16px',
                        backgroundColor: '#FAFAFA',
                        border: '1px solid var(--border)',
                        borderRadius: '8px',
                        fontFamily: 'var(--font-body)',
                        fontSize: 'var(--font-size-body-base)',
                        color: '#0A0A0A',
                        outline: 'none',
                      }}
                      onFocus={(e) => e.currentTarget.style.borderColor = '#006B4E'}
                      onBlur={(e) => e.currentTarget.style.borderColor = '#DEDEDE'}
                    />
                  </div>
                </div>

                {/* Video drone */}
                <div>
                  <label style={{
                    display: 'block',
                    fontFamily: 'var(--font-body)',
                    fontSize: 'var(--font-size-body-sm)',
                    fontWeight: 'var(--font-weight-medium)',
                    color: '#0A0A0A',
                    marginBottom: '8px',
                  }}>
                    Video drone (YouTube o Vimeo)
                  </label>
                  <div className="flex items-center gap-3">
                    <div 
                      className="w-10 h-10 rounded-lg flex items-center justify-center flex-shrink-0"
                      style={{ 
                        backgroundColor: '#FAFAFA',
                        border: '1px solid var(--border)'
                      }}
                    >
                      <Video size={20} style={{ color: '#006B4E' }} />
                    </div>
                    <input
                      type="text"
                      value={formData.droneVideo}
                      onChange={(e) => setFormData({ ...formData, droneVideo: e.target.value })}
                      placeholder="https://youtube.com/watch?v=..."
                      style={{
                        flex: 1,
                        padding: '12px 16px',
                        backgroundColor: '#FAFAFA',
                        border: '1px solid var(--border)',
                        borderRadius: '8px',
                        fontFamily: 'var(--font-body)',
                        fontSize: 'var(--font-size-body-base)',
                        color: '#0A0A0A',
                        outline: 'none',
                      }}
                      onFocus={(e) => e.currentTarget.style.borderColor = '#006B4E'}
                      onBlur={(e) => e.currentTarget.style.borderColor = '#DEDEDE'}
                    />
                  </div>
                </div>

                {/* Preview de multimedia */}
                <div 
                  className="p-6 rounded-xl"
                  style={{
                    backgroundColor: '#F9FAFB',
                    border: '1px solid var(--border)'
                  }}
                >
                  <div className="flex items-start gap-3">
                    <div 
                      className="w-10 h-10 rounded-lg flex items-center justify-center flex-shrink-0"
                      style={{ 
                        backgroundColor: '#E0F2FE',
                        border: '1px solid #7DD3FC'
                      }}
                    >
                      <Video size={20} style={{ color: '#0369A1' }} />
                    </div>
                    <div>
                      <h3 style={{
                        fontFamily: 'var(--font-body)',
                        fontSize: 'var(--font-size-body-sm)',
                        fontWeight: 'var(--font-weight-semibold)',
                        color: '#0A0A0A',
                        marginBottom: '4px',
                      }}>
                        Contenido multimedia opcional
                      </h3>
                      <p style={{
                        fontFamily: 'var(--font-body)',
                        fontSize: 'var(--font-size-xs)',
                        color: '#737373',
                        lineHeight: 'var(--line-height-body)',
                      }}>
                        Los videos y vistas 360° aumentan significativamente el interés de los compradores. Puedes agregarlos ahora o más tarde desde tu panel.
                      </p>
                    </div>
                  </div>
                </div>
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
          <div className="max-w-[1000px] mx-auto px-6 py-5">
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

              {currentStep < 5 ? (
                <button
                  onClick={handleNext}
                  className="flex items-center gap-2 px-6 py-3 rounded-full transition-all"
                  style={{
                    backgroundColor: '#006B4E',
                    color: '#FFFFFF',
                    fontFamily: 'var(--font-body)',
                    fontSize: 'var(--font-size-body-sm)',
                    fontWeight: 'var(--font-weight-medium)',
                    letterSpacing: 'var(--letter-spacing-wide)',
                  }}
                  onMouseEnter={(e) => e.currentTarget.style.backgroundColor = '#0F3B44'}
                  onMouseLeave={(e) => e.currentTarget.style.backgroundColor = '#006B4E'}
                >
                  Continuar
                  <ChevronLeft size={18} style={{ transform: 'rotate(180deg)' }} />
                </button>
              ) : (
                <div className="flex items-center gap-3">
                  <button
                    onClick={() => setShowPreview(true)}
                    className="px-6 py-3 rounded-full transition-all"
                    style={{
                      backgroundColor: '#FFFFFF',
                      color: '#462611',
                      border: '1px solid #462611',
                      fontFamily: 'var(--font-body)',
                      fontSize: 'var(--font-size-body-sm)',
                      fontWeight: 'var(--font-weight-medium)',
                      letterSpacing: 'var(--letter-spacing-wide)',
                    }}
                    onMouseEnter={(e) => {
                      e.currentTarget.style.backgroundColor = '#462611';
                      e.currentTarget.style.color = '#FFFFFF';
                    }}
                    onMouseLeave={(e) => {
                      e.currentTarget.style.backgroundColor = '#FFFFFF';
                      e.currentTarget.style.color = '#462611';
                    }}
                  >
                    Vista previa
                  </button>
                  <button
                    onClick={handlePublish}
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
                    Publicar parcela
                  </button>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>

      {/* Modal de Vista Previa */}
      {showPreview && (
        <div 
          className="fixed inset-0 z-50 flex items-center justify-center p-6"
          style={{ backgroundColor: 'rgba(0, 0, 0, 0.5)' }}
          onClick={() => setShowPreview(false)}
        >
          <div 
            className="relative max-w-4xl w-full max-h-[90vh] overflow-auto rounded-2xl"
            style={{ backgroundColor: '#FFFFFF' }}
            onClick={(e) => e.stopPropagation()}
          >
            {/* Header del modal */}
            <div 
              className="sticky top-0 z-10 flex items-center justify-between p-6 border-b"
              style={{ 
                backgroundColor: '#FFFFFF',
                borderColor: 'var(--border)'
              }}
            >
              <div>
                <h2 style={{
                  fontFamily: 'var(--font-heading)',
                  fontSize: 'var(--font-size-h3)',
                  fontWeight: 'var(--font-weight-regular)',
                  color: '#0A0A0A',
                  lineHeight: 'var(--line-height-heading)',
                }}>
                  Vista previa de la publicación
                </h2>
                <p style={{
                  fontFamily: 'var(--font-body)',
                  fontSize: 'var(--font-size-body-sm)',
                  color: '#737373',
                  marginTop: '4px',
                }}>
                  Así es como verán tu parcela los usuarios
                </p>
              </div>
              <button
                onClick={() => setShowPreview(false)}
                className="p-2 rounded-lg transition-colors"
                style={{ color: '#737373' }}
                onMouseEnter={(e) => e.currentTarget.style.backgroundColor = '#F5F5F5'}
                onMouseLeave={(e) => e.currentTarget.style.backgroundColor = 'transparent'}
              >
                <X size={24} />
              </button>
            </div>

            {/* Contenido del preview */}
            <div className="p-6 space-y-6">
              {/* Tarjeta principal de la parcela */}
              <div 
                className="rounded-xl overflow-hidden"
                style={{ 
                  border: '1px solid var(--border)',
                  backgroundColor: '#FFFFFF'
                }}
              >
                {/* Imagen principal */}
                {imagePreview && (
                  <div style={{ position: 'relative', height: '320px' }}>
                    <img 
                      src={imagePreview} 
                      alt="Imagen principal"
                      style={{
                        width: '100%',
                        height: '100%',
                        objectFit: 'cover',
                      }}
                    />
                    {/* Badge de precio */}
                    <div 
                      className="absolute top-4 right-4 px-4 py-2 rounded-lg"
                      style={{
                        backgroundColor: 'rgba(18, 72, 84, 0.95)',
                        backdropFilter: 'blur(8px)',
                      }}
                    >
                      <p style={{
                        fontFamily: 'var(--font-body)',
                        fontSize: 'var(--font-size-h4)',
                        fontWeight: 'var(--font-weight-semibold)',
                        color: '#FFFFFF',
                      }}>
                        {formData.currency} {formData.price ? parseInt(formData.price).toLocaleString('es-CL') : '0'}
                      </p>
                    </div>
                  </div>
                )}

                {/* Información */}
                <div className="p-6 space-y-4">
                  <div>
                    <h3 style={{
                      fontFamily: 'var(--font-heading)',
                      fontSize: 'var(--font-size-h3)',
                      fontWeight: 'var(--font-weight-regular)',
                      color: '#0A0A0A',
                      marginBottom: '8px',
                    }}>
                      {formData.title || 'Título de la parcela'}
                    </h3>
                    <div className="flex items-center gap-2">
                      <MapPin size={16} style={{ color: '#737373' }} />
                      <p style={{
                        fontFamily: 'var(--font-body)',
                        fontSize: 'var(--font-size-body-sm)',
                        color: '#737373',
                      }}>
                        {formData.comuna ? `${formData.comuna}, ${formData.region}` : 'Ubicación no especificada'}
                      </p>
                    </div>
                  </div>

                  {/* Descripción */}
                  {formData.description && (
                    <div>
                      <h4 style={{
                        fontFamily: 'var(--font-body)',
                        fontSize: 'var(--font-size-body-sm)',
                        fontWeight: 'var(--font-weight-semibold)',
                        color: '#0A0A0A',
                        marginBottom: '8px',
                      }}>
                        Descripción
                      </h4>
                      <p style={{
                        fontFamily: 'var(--font-body)',
                        fontSize: 'var(--font-size-body-base)',
                        color: '#525252',
                        lineHeight: 'var(--line-height-body)',
                      }}>
                        {formData.description}
                      </p>
                    </div>
                  )}

                  {/* Detalles básicos */}
                  <div 
                    className="grid grid-cols-3 gap-4 p-4 rounded-lg"
                    style={{ backgroundColor: '#FAFAFA' }}
                  >
                    {formData.landSize && (
                      <div>
                        <p style={{
                          fontFamily: 'var(--font-body)',
                          fontSize: 'var(--font-size-xs)',
                          color: '#737373',
                          marginBottom: '4px',
                        }}>
                          Superficie
                        </p>
                        <p style={{
                          fontFamily: 'var(--font-body)',
                          fontSize: 'var(--font-size-body-base)',
                          fontWeight: 'var(--font-weight-semibold)',
                          color: '#0A0A0A',
                        }}>
                          {formData.landSize} {formData.landUnit}
                        </p>
                      </div>
                    )}
                    {formData.landType && (
                      <div>
                        <p style={{
                          fontFamily: 'var(--font-body)',
                          fontSize: 'var(--font-size-xs)',
                          color: '#737373',
                          marginBottom: '4px',
                        }}>
                          Tipo de terreno
                        </p>
                        <p style={{
                          fontFamily: 'var(--font-body)',
                          fontSize: 'var(--font-size-body-base)',
                          fontWeight: 'var(--font-weight-semibold)',
                          color: '#0A0A0A',
                        }}>
                          {formData.landType}
                        </p>
                      </div>
                    )}
                    {formData.previousOwners && (
                      <div>
                        <p style={{
                          fontFamily: 'var(--font-body)',
                          fontSize: 'var(--font-size-xs)',
                          color: '#737373',
                          marginBottom: '4px',
                        }}>
                          N° de dueños
                        </p>
                        <p style={{
                          fontFamily: 'var(--font-body)',
                          fontSize: 'var(--font-size-body-base)',
                          fontWeight: 'var(--font-weight-semibold)',
                          color: '#0A0A0A',
                        }}>
                          {formData.previousOwners}
                        </p>
                      </div>
                    )}
                  </div>

                  {/* Características */}
                  <div>
                    <h4 style={{
                      fontFamily: 'var(--font-body)',
                      fontSize: 'var(--font-size-body-sm)',
                      fontWeight: 'var(--font-weight-semibold)',
                      color: '#0A0A0A',
                      marginBottom: '12px',
                    }}>
                      Características
                    </h4>
                    <div className="grid grid-cols-2 gap-3">
                      {formData.waterAvailable && (
                        <div className="flex items-center gap-2">
                          <div 
                            className="w-5 h-5 rounded flex items-center justify-center"
                            style={{ backgroundColor: '#E8F4F6' }}
                          >
                            <Droplet size={14} style={{ color: '#006B4E' }} />
                          </div>
                          <span style={{
                            fontFamily: 'var(--font-body)',
                            fontSize: 'var(--font-size-body-sm)',
                            color: '#0A0A0A',
                          }}>
                            Agua disponible
                          </span>
                        </div>
                      )}
                      {formData.electricityNearby && (
                        <div className="flex items-center gap-2">
                          <div 
                            className="w-5 h-5 rounded flex items-center justify-center"
                            style={{ backgroundColor: '#E8F4F6' }}
                          >
                            <Zap size={14} style={{ color: '#006B4E' }} />
                          </div>
                          <span style={{
                            fontFamily: 'var(--font-body)',
                            fontSize: 'var(--font-size-body-sm)',
                            color: '#0A0A0A',
                          }}>
                            Luz cercana
                          </span>
                        </div>
                      )}
                      {formData.pavedRoad && (
                        <div className="flex items-center gap-2">
                          <div 
                            className="w-5 h-5 rounded flex items-center justify-center"
                            style={{ backgroundColor: '#E8F4F6' }}
                          >
                            <Car size={14} style={{ color: '#006B4E' }} />
                          </div>
                          <span style={{
                            fontFamily: 'var(--font-body)',
                            fontSize: 'var(--font-size-body-sm)',
                            color: '#0A0A0A',
                          }}>
                            Camino pavimentado
                          </span>
                        </div>
                      )}
                      {formData.internetAccess && (
                        <div className="flex items-center gap-2">
                          <div 
                            className="w-5 h-5 rounded flex items-center justify-center"
                            style={{ backgroundColor: '#E8F4F6' }}
                          >
                            <Wifi size={14} style={{ color: '#006B4E' }} />
                          </div>
                          <span style={{
                            fontFamily: 'var(--font-body)',
                            fontSize: 'var(--font-size-body-sm)',
                            color: '#0A0A0A',
                          }}>
                            Acceso a internet
                          </span>
                        </div>
                      )}
                      {formData.perimetricalFence && (
                        <div className="flex items-center gap-2">
                          <div 
                            className="w-5 h-5 rounded flex items-center justify-center"
                            style={{ backgroundColor: '#E8F4F6' }}
                          >
                            <Shield size={14} style={{ color: '#006B4E' }} />
                          </div>
                          <span style={{
                            fontFamily: 'var(--font-body)',
                            fontSize: 'var(--font-size-body-sm)',
                            color: '#0A0A0A',
                          }}>
                            Cerco perimetral
                          </span>
                        </div>
                      )}
                    </div>
                  </div>

                  {/* Galería de imágenes */}
                  {galleryPreviews.length > 0 && (
                    <div>
                      <h4 style={{
                        fontFamily: 'var(--font-body)',
                        fontSize: 'var(--font-size-body-sm)',
                        fontWeight: 'var(--font-weight-semibold)',
                        color: '#0A0A0A',
                        marginBottom: '12px',
                      }}>
                        Galería de imágenes ({galleryPreviews.length})
                      </h4>
                      <div className="grid grid-cols-4 gap-2">
                        {galleryPreviews.slice(0, 4).map((preview, index) => (
                          <img
                            key={index}
                            src={preview}
                            alt={`Galería ${index + 1}`}
                            style={{
                              width: '100%',
                              height: '100px',
                              objectFit: 'cover',
                              borderRadius: '8px',
                            }}
                          />
                        ))}
                      </div>
                    </div>
                  )}

                  {/* Coordenadas */}
                  {formData.latitude && formData.longitude && (
                    <div>
                      <h4 style={{
                        fontFamily: 'var(--font-body)',
                        fontSize: 'var(--font-size-body-sm)',
                        fontWeight: 'var(--font-weight-semibold)',
                        color: '#0A0A0A',
                        marginBottom: '8px',
                      }}>
                        Ubicación
                      </h4>
                      <p style={{
                        fontFamily: 'var(--font-body)',
                        fontSize: 'var(--font-size-body-sm)',
                        color: '#525252',
                      }}>
                        Coordenadas: {formData.latitude}, {formData.longitude}
                      </p>
                    </div>
                  )}
                </div>
              </div>

              {/* Botones de acción */}
              <div className="flex items-center justify-end gap-3 pt-4">
                <button
                  onClick={() => setShowPreview(false)}
                  className="px-6 py-3 rounded-full transition-all"
                  style={{
                    backgroundColor: '#F5F5F5',
                    color: '#0A0A0A',
                    fontFamily: 'var(--font-body)',
                    fontSize: 'var(--font-size-body-sm)',
                    fontWeight: 'var(--font-weight-medium)',
                  }}
                  onMouseEnter={(e) => e.currentTarget.style.backgroundColor = '#E5E5E5'}
                  onMouseLeave={(e) => e.currentTarget.style.backgroundColor = '#F5F5F5'}
                >
                  Cerrar
                </button>
                <button
                  onClick={() => {
                    setShowPreview(false);
                    handlePublish();
                  }}
                  className="px-8 py-3 rounded-full transition-all"
                  style={{
                    backgroundColor: '#647E3F',
                    color: '#FFFFFF',
                    fontFamily: 'var(--font-body)',
                    fontSize: 'var(--font-size-body-sm)',
                    fontWeight: 'var(--font-weight-medium)',
                  }}
                  onMouseEnter={(e) => e.currentTarget.style.backgroundColor = '#546A35'}
                  onMouseLeave={(e) => e.currentTarget.style.backgroundColor = '#647E3F'}
                >
                  Publicar parcela
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
