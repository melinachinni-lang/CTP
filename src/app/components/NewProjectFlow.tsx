import React, { useState, useRef, useEffect } from 'react';
import { ChevronLeft, X, MapPin, Check, Upload, FileText, Image as ImageIcon, AlertCircle, Plus, Trash2, Edit2, Copy, Search, Download, Home, Zap, Droplet, Car, Shield, DoorOpen, Eye, Move } from 'lucide-react';
import * as XLSX from 'xlsx';

interface NewProjectFlowProps {
  onClose: () => void;
  onPublish: () => void;
  proyectoId?: string | null;
}

interface PlotData {
  id: string;
  name: string;
  surface: string;
  servitude: string;
  price: string;
  status: 'disponible' | 'reservado' | 'vendido';
  currency: 'CLP' | 'USD' | 'UF';
}

export function NewProjectFlow({ onClose, onPublish, proyectoId }: NewProjectFlowProps) {
  const isEditing = !!proyectoId;
  const [currentStep, setCurrentStep] = useState(1);
  const [showPreview, setShowPreview] = useState(false);
  const [activeMapTab, setActiveMapTab] = useState<'360' | 'plano' | 'mapa'>('mapa');
  const mainImageInputRef = useRef<HTMLInputElement>(null);
  const galleryInputRef = useRef<HTMLInputElement>(null);
  const masterplanImageInputRef = useRef<HTMLInputElement>(null);
  const masterplanPdfInputRef = useRef<HTMLInputElement>(null);
  const excelInputRef = useRef<HTMLInputElement>(null);
  
  const [formData, setFormData] = useState({
    // Paso 1: Información básica
    projectName: '',
    projectType: '',
    projectStatus: 'en-venta',
    address: '',
    city: '',
    region: '',
    basePricePerPlot: '',
    minSurface: '',
    maxSurface: '',
    totalPlots: '',
    description: '',
    mainImage: null as File | null,
    galleryImages: [] as File[],
    brochure: null as File | null,
    
    // Financiamiento
    hasFinancing: false,
    financingTotalPrice: '',
    financingPriceFrom: '',
    financingDownPayment: '',
    
    // Paso 2: Características del terreno
    averageSurface: '',
    soilType: '',
    orientation: '',
    slope: '',
    permittedUse: '',
    hasWater: false,
    hasElectricity: false,
    hasPavedRoad: false,
    hasPerimeterFence: false,
    hasVehicleAccess: false,
    
    // Paso 3: Ubicación
    fullAddress: '',
    locationRegion: '',
    locationCity: '',
    latitude: '',
    longitude: '',
    view360: '',
    masterPlan: null as File | null,
    
    // Paso 4: Información del entorno
    timeToCityCenter: '',
    distanceToNearestCity: '',
    educationLevel: '3',
    commerceLevel: '3',
    healthLevel: '3',
    recreationLevel: '3',
    naturalEnvironment: '',
    views: '',
    averageTemperature: '',
    precipitation: '',
    approximatePopulation: '',
    mainActivities: '',
    
    // Paso 6: Documentación
    masterplanImage: null as File | null,
    masterplanPdf: null as File | null,
    taxRoll: '',
    legalStatus: '',
    documentationVerified: false,
    legalDocuments: [] as File[],
  });
  
  const [plots, setPlots] = useState<PlotData[]>([]);
  const [searchPlot, setSearchPlot] = useState('');
  const [imagePreview, setImagePreview] = useState<string>('');
  const [galleryPreviews, setGalleryPreviews] = useState<string[]>([]);
  const [masterplanImagePreview, setMasterplanImagePreview] = useState<string>('');
  const [brochureUploaded, setBrochureUploaded] = useState(false);
  const [masterPlanPreview, setMasterPlanPreview] = useState<string>('');
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [fileErrors, setFileErrors] = useState<Record<string, string>>({});

  const steps = [
    { number: 1, label: 'Información básica' },
    { number: 2, label: 'Características del terreno' },
    { number: 3, label: 'Ubicación' },
    { number: 4, label: 'Información del entorno' },
    { number: 5, label: 'Parcelas del proyecto' },
    { number: 6, label: 'Documentación' },
  ];

  // Helper functions para "Seleccionar todo"
  const servicesKeys = ['hasWater', 'hasElectricity', 'hasPavedRoad', 'hasPerimeterFence', 'hasVehicleAccess'];

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
  const MAX_EXCEL_SIZE = 5 * 1024 * 1024; // 5MB
  const ALLOWED_IMAGE_TYPES = ['image/jpeg', 'image/jpg', 'image/png'];
  const ALLOWED_PDF_TYPES = ['application/pdf'];
  const ALLOWED_EXCEL_TYPES = ['application/vnd.openxmlformats-officedocument.spreadsheetml.sheet', 'application/vnd.ms-excel', 'text/csv'];

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

  // Cargar datos del proyecto si está en modo edición
  useEffect(() => {
    if (proyectoId) {
      // En un caso real, aquí se haría una llamada al backend para obtener los datos
      // Por ahora, mostramos un console.log para indicar que se cargarían los datos
      console.log('Cargando datos del proyecto:', proyectoId);
      
      // Simulación de carga de datos (en producción vendría del backend)
      // Ejemplo de cómo se cargarían los datos:
      // const proyectoData = await fetchProyectoData(proyectoId);
      // setFormData({
      //   projectName: proyectoData.titulo,
      //   description: proyectoData.descripcion,
      //   ... resto de campos
      // });
    }
  }, [proyectoId]);

  const handleInputChange = (field: string, value: any) => {
    setFormData({ ...formData, [field]: value });
    setErrors({ ...errors, [field]: '' });
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

  const handleBrochureUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      const file = e.target.files[0];
      
      // Validar archivo
      if (!validateFile(file, 'brochure', ALLOWED_PDF_TYPES, MAX_PDF_SIZE)) {
        e.target.value = ''; // Limpiar el input
        return;
      }
      
      setFormData({ ...formData, brochure: file });
      setBrochureUploaded(true);
    }
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

  const handleMasterplanImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      const file = e.target.files[0];
      
      // Validar archivo
      if (!validateFile(file, 'masterplanImage', ALLOWED_IMAGE_TYPES, MAX_IMAGE_SIZE)) {
        e.target.value = ''; // Limpiar el input
        return;
      }
      
      setFormData({ ...formData, masterplanImage: file });
      const reader = new FileReader();
      reader.onloadend = () => {
        setMasterplanImagePreview(reader.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleAddPlot = () => {
    const newPlot: PlotData = {
      id: `plot-${Date.now()}`,
      name: `Parcela ${plots.length + 1}`,
      surface: '',
      servitude: '',
      price: '',
      status: 'disponible',
      currency: 'CLP',
    };
    setPlots([...plots, newPlot]);
  };

  const handleEditPlot = (id: string, field: keyof PlotData, value: any) => {
    setPlots(plots.map(plot => plot.id === id ? { ...plot, [field]: value } : plot));
  };

  const handleDuplicatePlot = (id: string) => {
    const plotToDuplicate = plots.find(p => p.id === id);
    if (plotToDuplicate) {
      const newPlot = { ...plotToDuplicate, id: `plot-${Date.now()}`, name: `${plotToDuplicate.name} (copia)` };
      setPlots([...plots, newPlot]);
    }
  };

  const handleDeletePlot = (id: string) => {
    setPlots(plots.filter(p => p.id !== id));
  };

  const handleExcelFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      const file = e.target.files[0];
      
      // Validar archivo Excel
      if (!validateFile(file, 'excelFile', ALLOWED_EXCEL_TYPES, MAX_EXCEL_SIZE)) {
        e.target.value = ''; // Limpiar el input
        return;
      }
      
      const reader = new FileReader();
      
      reader.onload = (event) => {
        try {
          const data = event.target?.result;
          const workbook = XLSX.read(data, { type: 'binary' });
          const sheetName = workbook.SheetNames[0];
          const worksheet = workbook.Sheets[sheetName];
          const jsonData = XLSX.utils.sheet_to_json(worksheet);
          
          // Convertir los datos del Excel a formato PlotData
          const importedPlots: PlotData[] = jsonData.map((row: any, index: number) => ({
            id: `plot-${Date.now()}-${index}`,
            name: row['Nombre'] || row['nombre'] || row['Name'] || row['name'] || `Parcela ${plots.length + index + 1}`,
            surface: String(row['Superficie'] || row['superficie'] || row['Surface'] || row['surface'] || ''),
            servitude: String(row['Servidumbre'] || row['servidumbre'] || row['Servitude'] || row['servitude'] || ''),
            price: String(row['Precio'] || row['precio'] || row['Price'] || row['price'] || ''),
            status: (row['Estado'] || row['estado'] || row['Status'] || row['status'] || 'disponible').toLowerCase() as 'disponible' | 'reservado' | 'vendido',
            currency: (row['Moneda'] || row['moneda'] || row['Currency'] || row['currency'] || 'CLP') as 'CLP' | 'USD' | 'UF',
          }));
          
          setPlots([...plots, ...importedPlots]);
        } catch (error) {
          console.error('Error al leer el archivo Excel:', error);
          alert('Error al importar el archivo. Por favor verifica que sea un archivo Excel válido.');
        }
      };
      
      reader.readAsBinaryString(file);
    }
    // Limpiar el input para permitir seleccionar el mismo archivo nuevamente
    if (e.target) {
      e.target.value = '';
    }
  };

  const handleImportPlots = () => {
    excelInputRef.current?.click();
  };

  const filteredPlots = plots.filter(plot => 
    plot.name.toLowerCase().includes(searchPlot.toLowerCase())
  );

  const plotStats = {
    total: plots.length,
    available: plots.filter(p => p.status === 'disponible').length,
    reserved: plots.filter(p => p.status === 'reservado').length,
    sold: plots.filter(p => p.status === 'vendido').length,
  };

  const handleNext = () => {
    if (currentStep < 6) {
      setCurrentStep(currentStep + 1);
      window.scrollTo(0, 0);
    }
  };

  const handleBack = () => {
    if (currentStep > 1) {
      setCurrentStep(currentStep - 1);
      window.scrollTo(0, 0);
    }
  };

  const handleSaveDraft = () => {
    alert('Borrador guardado exitosamente');
  };

  const handlePublishProject = () => {
    onPublish();
  };

  const regionesComunas: Record<string, string[]> = {
    'Región Metropolitana': ['Santiago', 'Pirque', 'Colina', 'Buin', 'San José de Maipo'],
    'Valparaíso': ['Valparaíso', 'Viña del Mar', 'Casablanca', 'Olmué'],
    'O\'Higgins': ['Rancagua', 'San Fernando', 'Pichilemu', 'Santa Cruz'],
    'Maule': ['Talca', 'Curicó', 'Linares', 'Constitución'],
    'Biobío': ['Concepción', 'Los Ángeles', 'Chillán', 'Talcahuano'],
  };

  return (
    <div 
      className="fixed inset-0 z-50 flex items-start justify-center overflow-y-auto"
      style={{ backgroundColor: 'rgba(10, 10, 10, 0.6)' }}
    >
      <div className="w-full min-h-screen" style={{ backgroundColor: '#FAFAFA' }}>
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
                    {isEditing ? 'Editar proyecto' : 'Publicar proyecto'}
                  </h1>
                  <p style={{
                    fontFamily: 'var(--font-body)',
                    fontSize: 'var(--font-size-body-sm)',
                    color: '#737373',
                    marginTop: '4px',
                    lineHeight: 'var(--line-height-body)'
                  }}>
                    Paso {currentStep} de {steps.length}
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

            {/* Stepper */}
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
                        <Check className="w-3.5 h-3.5" />
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
          {/* Paso 1: Información básica */}
          {currentStep === 1 && (
            <div className="space-y-6">
              <div className="p-6 rounded-xl bg-background" style={{ border: '1px solid var(--border)' }}>
                <h3 style={{
                  fontFamily: 'var(--font-heading)',
                  fontSize: 'var(--font-size-h4)',
                  fontWeight: 'var(--font-weight-semibold)',
                  color: '#0A0A0A',
                  marginBottom: '20px'
                }}>
                  Información básica del proyecto
                </h3>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                  {/* Nombre del proyecto */}
                  <div className="md:col-span-2">
                    <label style={{
                      display: 'block',
                      fontFamily: 'var(--font-body)',
                      fontSize: 'var(--font-size-body-sm)',
                      fontWeight: 'var(--font-weight-medium)',
                      color: '#0A0A0A',
                      marginBottom: '8px'
                    }}>
                      Nombre del proyecto *
                    </label>
                    <input
                      type="text"
                      value={formData.projectName}
                      onChange={(e) => handleInputChange('projectName', e.target.value)}
                      placeholder="Ej: Parcelas Valle del Sol"
                      className="w-full px-4 py-3 rounded-lg transition-all"
                      style={{
                        backgroundColor: '#FFFFFF',
                        border: '1px solid #DEDEDE',
                        fontFamily: 'var(--font-body)',
                        fontSize: 'var(--font-size-body-sm)',
                        color: '#0A0A0A',
                        outline: 'none'
                      }}
                    />
                  </div>

                  {/* Estado del proyecto */}
                  <div>
                    <label style={{
                      display: 'block',
                      fontFamily: 'var(--font-body)',
                      fontSize: 'var(--font-size-body-sm)',
                      fontWeight: 'var(--font-weight-medium)',
                      color: '#0A0A0A',
                      marginBottom: '8px'
                    }}>
                      Estado del proyecto *
                    </label>
                    <select
                      value={formData.projectStatus}
                      onChange={(e) => handleInputChange('projectStatus', e.target.value)}
                      className="w-full px-4 py-3 rounded-lg transition-all"
                      style={{
                        backgroundColor: '#FFFFFF',
                        border: '1px solid #DEDEDE',
                        fontFamily: 'var(--font-body)',
                        fontSize: 'var(--font-size-body-sm)',
                        color: '#0A0A0A',
                        outline: 'none'
                      }}
                    >
                      <option value="en-venta">En venta</option>
                      <option value="en-desarrollo">En desarrollo</option>
                      <option value="reservado">Reservado</option>
                    </select>
                  </div>

                  {/* Dirección */}
                  <div className="md:col-span-2">
                    <label style={{
                      display: 'block',
                      fontFamily: 'var(--font-body)',
                      fontSize: 'var(--font-size-body-sm)',
                      fontWeight: 'var(--font-weight-medium)',
                      color: '#0A0A0A',
                      marginBottom: '8px'
                    }}>
                      Dirección
                    </label>
                    <input
                      type="text"
                      value={formData.address}
                      onChange={(e) => handleInputChange('address', e.target.value)}
                      placeholder="Ej: Camino Los Aromos Km 12"
                      className="w-full px-4 py-3 rounded-lg transition-all"
                      style={{
                        backgroundColor: '#FFFFFF',
                        border: '1px solid #DEDEDE',
                        fontFamily: 'var(--font-body)',
                        fontSize: 'var(--font-size-body-sm)',
                        color: '#0A0A0A',
                        outline: 'none'
                      }}
                    />
                  </div>

                  {/* Ciudad */}
                  <div>
                    <label style={{
                      display: 'block',
                      fontFamily: 'var(--font-body)',
                      fontSize: 'var(--font-size-body-sm)',
                      fontWeight: 'var(--font-weight-medium)',
                      color: '#0A0A0A',
                      marginBottom: '8px'
                    }}>
                      Ciudad *
                    </label>
                    <input
                      type="text"
                      value={formData.city}
                      onChange={(e) => handleInputChange('city', e.target.value)}
                      placeholder="Ej: Pirque"
                      className="w-full px-4 py-3 rounded-lg transition-all"
                      style={{
                        backgroundColor: '#FFFFFF',
                        border: '1px solid #DEDEDE',
                        fontFamily: 'var(--font-body)',
                        fontSize: 'var(--font-size-body-sm)',
                        color: '#0A0A0A',
                        outline: 'none'
                      }}
                    />
                  </div>

                  {/* Región */}
                  <div>
                    <label style={{
                      display: 'block',
                      fontFamily: 'var(--font-body)',
                      fontSize: 'var(--font-size-body-sm)',
                      fontWeight: 'var(--font-weight-medium)',
                      color: '#0A0A0A',
                      marginBottom: '8px'
                    }}>
                      Región *
                    </label>
                    <select
                      value={formData.region}
                      onChange={(e) => handleInputChange('region', e.target.value)}
                      className="w-full px-4 py-3 rounded-lg transition-all"
                      style={{
                        backgroundColor: '#FFFFFF',
                        border: '1px solid #DEDEDE',
                        fontFamily: 'var(--font-body)',
                        fontSize: 'var(--font-size-body-sm)',
                        color: '#0A0A0A',
                        outline: 'none'
                      }}
                    >
                      <option value="">Seleccionar región</option>
                      {Object.keys(regionesComunas).map(region => (
                        <option key={region} value={region}>{region}</option>
                      ))}
                    </select>
                  </div>

                  {/* Precio base por parcela */}
                  <div>
                    <label style={{
                      display: 'block',
                      fontFamily: 'var(--font-body)',
                      fontSize: 'var(--font-size-body-sm)',
                      fontWeight: 'var(--font-weight-medium)',
                      color: '#0A0A0A',
                      marginBottom: '8px'
                    }}>
                      Precio base por parcela *
                    </label>
                    <input
                      type="text"
                      value={formData.basePricePerPlot}
                      onChange={(e) => handleInputChange('basePricePerPlot', e.target.value)}
                      placeholder="Ej: 45000000"
                      className="w-full px-4 py-3 rounded-lg transition-all"
                      style={{
                        backgroundColor: '#FFFFFF',
                        border: '1px solid #DEDEDE',
                        fontFamily: 'var(--font-body)',
                        fontSize: 'var(--font-size-body-sm)',
                        color: '#0A0A0A',
                        outline: 'none'
                      }}
                    />
                  </div>

                  {/* Superficie mínima */}
                  <div>
                    <label style={{
                      display: 'block',
                      fontFamily: 'var(--font-body)',
                      fontSize: 'var(--font-size-body-sm)',
                      fontWeight: 'var(--font-weight-medium)',
                      color: '#0A0A0A',
                      marginBottom: '8px'
                    }}>
                      Superficie mínima (m²) *
                    </label>
                    <input
                      type="text"
                      value={formData.minSurface}
                      onChange={(e) => handleInputChange('minSurface', e.target.value)}
                      placeholder="Ej: 5000"
                      className="w-full px-4 py-3 rounded-lg transition-all"
                      style={{
                        backgroundColor: '#FFFFFF',
                        border: '1px solid #DEDEDE',
                        fontFamily: 'var(--font-body)',
                        fontSize: 'var(--font-size-body-sm)',
                        color: '#0A0A0A',
                        outline: 'none'
                      }}
                    />
                  </div>

                  {/* Superficie máxima */}
                  <div>
                    <label style={{
                      display: 'block',
                      fontFamily: 'var(--font-body)',
                      fontSize: 'var(--font-size-body-sm)',
                      fontWeight: 'var(--font-weight-medium)',
                      color: '#0A0A0A',
                      marginBottom: '8px'
                    }}>
                      Superficie máxima (m²) *
                    </label>
                    <input
                      type="text"
                      value={formData.maxSurface}
                      onChange={(e) => handleInputChange('maxSurface', e.target.value)}
                      placeholder="Ej: 10000"
                      className="w-full px-4 py-3 rounded-lg transition-all"
                      style={{
                        backgroundColor: '#FFFFFF',
                        border: '1px solid #DEDEDE',
                        fontFamily: 'var(--font-body)',
                        fontSize: 'var(--font-size-body-sm)',
                        color: '#0A0A0A',
                        outline: 'none'
                      }}
                    />
                  </div>

                  {/* Total de parcelas */}
                  <div>
                    <label style={{
                      display: 'block',
                      fontFamily: 'var(--font-body)',
                      fontSize: 'var(--font-size-body-sm)',
                      fontWeight: 'var(--font-weight-medium)',
                      color: '#0A0A0A',
                      marginBottom: '8px'
                    }}>
                      Total de parcelas del proyecto *
                    </label>
                    <input
                      type="text"
                      value={formData.totalPlots}
                      onChange={(e) => handleInputChange('totalPlots', e.target.value)}
                      placeholder="Ej: 25"
                      className="w-full px-4 py-3 rounded-lg transition-all"
                      style={{
                        backgroundColor: '#FFFFFF',
                        border: '1px solid #DEDEDE',
                        fontFamily: 'var(--font-body)',
                        fontSize: 'var(--font-size-body-sm)',
                        color: '#0A0A0A',
                        outline: 'none'
                      }}
                    />
                  </div>

                  {/* Precio desde - Siempre visible */}
                  <div>
                    <label style={{
                      display: 'block',
                      fontFamily: 'var(--font-body)',
                      fontSize: 'var(--font-size-body-sm)',
                      fontWeight: 'var(--font-weight-medium)',
                      color: '#0A0A0A',
                      marginBottom: '8px'
                    }}>
                      Precio desde
                    </label>
                    <input
                      type="text"
                      value={formData.financingPriceFrom}
                      onChange={(e) => handleInputChange('financingPriceFrom', e.target.value)}
                      placeholder="Ej: 45000000"
                      className="w-full px-4 py-3 rounded-lg transition-all"
                      style={{
                        backgroundColor: '#FFFFFF',
                        border: '1px solid #DEDEDE',
                        fontFamily: 'var(--font-body)',
                        fontSize: 'var(--font-size-body-sm)',
                        color: '#0A0A0A',
                        outline: 'none'
                      }}
                    />
                  </div>

                  {/* Financiamiento - Toggle */}
                  <div className="md:col-span-2">
                    <div 
                      onClick={() => handleInputChange('hasFinancing', !formData.hasFinancing)}
                      className="flex items-center gap-3 p-4 rounded-lg cursor-pointer transition-all"
                      style={{
                        backgroundColor: formData.hasFinancing ? '#E8F3E9' : '#FAFAFA',
                        border: `1px solid ${formData.hasFinancing ? '#647E3F' : '#DEDEDE'}`
                      }}
                    >
                      <div
                        className="w-5 h-5 rounded flex items-center justify-center"
                        style={{
                          backgroundColor: formData.hasFinancing ? '#647E3F' : '#FFFFFF',
                          border: `2px solid ${formData.hasFinancing ? '#647E3F' : '#DEDEDE'}`
                        }}
                      >
                        {formData.hasFinancing && (
                          <Check className="w-3 h-3" style={{ color: '#FFFFFF' }} />
                        )}
                      </div>
                      <span style={{
                        fontFamily: 'var(--font-body)',
                        fontSize: 'var(--font-size-body-sm)',
                        color: '#0A0A0A',
                        fontWeight: 'var(--font-weight-medium)'
                      }}>
                        Proyecto con financiamiento
                      </span>
                    </div>
                  </div>

                  {/* Campos de financiamiento - Se muestran solo si hasFinancing es true */}
                  {formData.hasFinancing && (
                    <>
                      <div>
                        <label style={{
                          display: 'block',
                          fontFamily: 'var(--font-body)',
                          fontSize: 'var(--font-size-body-sm)',
                          fontWeight: 'var(--font-weight-medium)',
                          color: '#0A0A0A',
                          marginBottom: '8px'
                        }}>
                          Precio total del proyecto
                        </label>
                        <input
                          type="text"
                          value={formData.financingTotalPrice}
                          onChange={(e) => handleInputChange('financingTotalPrice', e.target.value)}
                          placeholder="Ej: 1125000000"
                          className="w-full px-4 py-3 rounded-lg transition-all"
                          style={{
                            backgroundColor: '#FFFFFF',
                            border: '1px solid #DEDEDE',
                            fontFamily: 'var(--font-body)',
                            fontSize: 'var(--font-size-body-sm)',
                            color: '#0A0A0A',
                            outline: 'none'
                          }}
                        />
                      </div>

                      <div>
                        <label style={{
                          display: 'block',
                          fontFamily: 'var(--font-body)',
                          fontSize: 'var(--font-size-body-sm)',
                          fontWeight: 'var(--font-weight-medium)',
                          color: '#0A0A0A',
                          marginBottom: '8px'
                        }}>
                          Porcentaje de pie o monto inicial
                        </label>
                        <input
                          type="text"
                          value={formData.financingDownPayment}
                          onChange={(e) => handleInputChange('financingDownPayment', e.target.value)}
                          placeholder="Ej: 20% o 9000000"
                          className="w-full px-4 py-3 rounded-lg transition-all"
                          style={{
                            backgroundColor: '#FFFFFF',
                            border: '1px solid #DEDEDE',
                            fontFamily: 'var(--font-body)',
                            fontSize: 'var(--font-size-body-sm)',
                            color: '#0A0A0A',
                            outline: 'none'
                          }}
                        />
                      </div>
                    </>
                  )}

                  {/* Descripción */}
                  <div className="md:col-span-2">
                    <label style={{
                      display: 'block',
                      fontFamily: 'var(--font-body)',
                      fontSize: 'var(--font-size-body-sm)',
                      fontWeight: 'var(--font-weight-medium)',
                      color: '#0A0A0A',
                      marginBottom: '8px'
                    }}>
                      Descripción del proyecto *
                    </label>
                    <textarea
                      value={formData.description}
                      onChange={(e) => handleInputChange('description', e.target.value)}
                      placeholder="Describe las características principales del proyecto, su entorno y beneficios..."
                      rows={5}
                      className="w-full px-4 py-3 rounded-lg transition-all resize-none"
                      style={{
                        backgroundColor: '#FFFFFF',
                        border: '1px solid #DEDEDE',
                        fontFamily: 'var(--font-body)',
                        fontSize: 'var(--font-size-body-sm)',
                        color: '#0A0A0A',
                        outline: 'none'
                      }}
                    />
                  </div>
                </div>

                {/* Multimedia del proyecto */}
                <div className="mt-8 pt-8" style={{ borderTop: '1px solid var(--border)' }}>
                  <h4 style={{
                    fontFamily: 'var(--font-heading)',
                    fontSize: 'var(--font-size-body-base)',
                    fontWeight: 'var(--font-weight-semibold)',
                    color: '#0A0A0A',
                    marginBottom: '20px'
                  }}>
                    Multimedia del proyecto
                  </h4>

                  {/* Imagen principal */}
                  <div className="mb-6">
                    <label style={{
                      display: 'block',
                      fontFamily: 'var(--font-body)',
                      fontSize: 'var(--font-size-body-sm)',
                      fontWeight: 'var(--font-weight-medium)',
                      color: '#0A0A0A',
                      marginBottom: '8px'
                    }}>
                      Imagen principal *
                    </label>
                    
                    <input
                      ref={mainImageInputRef}
                      type="file"
                      accept="image/*"
                      onChange={handleMainImageUpload}
                      className="hidden"
                    />
                    
                    {!imagePreview ? (
                      <button
                        type="button"
                        onClick={() => mainImageInputRef.current?.click()}
                        className="w-full px-6 py-8 rounded-lg transition-all flex flex-col items-center gap-3"
                        style={{
                          backgroundColor: '#FAFAFA',
                          border: fileErrors.mainImage ? '2px dashed #DC2626' : '2px dashed #DEDEDE'
                        }}
                      >
                        <Upload className="w-8 h-8" style={{ color: '#006B4E' }} />
                        <div className="text-center">
                          <p style={{
                            fontFamily: 'var(--font-body)',
                            fontSize: 'var(--font-size-body-sm)',
                            fontWeight: 'var(--font-weight-medium)',
                            color: '#0A0A0A'
                          }}>
                            Subir imagen principal
                          </p>
                          <p style={{
                            fontFamily: 'var(--font-body)',
                            fontSize: 'var(--font-size-body-xs)',
                            color: '#737373',
                            marginTop: '4px'
                          }}>
                            PNG, JPG hasta 5MB
                          </p>
                        </div>
                      </button>
                    ) : (
                      <div className="relative">
                        <img
                          src={imagePreview}
                          alt="Preview"
                          className="w-full h-64 object-cover rounded-lg"
                        />
                        <button
                          onClick={() => {
                            setImagePreview('');
                            setFormData({ ...formData, mainImage: null });
                          }}
                          className="absolute top-2 right-2 p-2 rounded-lg transition-all"
                          style={{
                            backgroundColor: 'rgba(255, 255, 255, 0.9)',
                            border: '1px solid #DEDEDE'
                          }}
                        >
                          <Trash2 className="w-4 h-4" style={{ color: '#DC2626' }} />
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
                      marginBottom: '8px'
                    }}>
                      Galería de imágenes
                    </label>
                    
                    <input
                      ref={galleryInputRef}
                      type="file"
                      accept="image/*"
                      multiple
                      onChange={handleGalleryUpload}
                      className="hidden"
                    />
                    
                    <button
                      type="button"
                      onClick={() => galleryInputRef.current?.click()}
                      className="w-full px-6 py-6 rounded-lg transition-all flex items-center justify-center gap-2 mb-4"
                      style={{
                        backgroundColor: '#FFFFFF',
                        border: fileErrors.galleryImages ? '1px solid #DC2626' : '1px solid #DEDEDE'
                      }}
                    >
                      <Plus className="w-5 h-5" style={{ color: '#006B4E' }} />
                      <span style={{
                        fontFamily: 'var(--font-body)',
                        fontSize: 'var(--font-size-body-sm)',
                        fontWeight: 'var(--font-weight-medium)',
                        color: '#0A0A0A'
                      }}>
                        Agregar imágenes
                      </span>
                    </button>

                    {galleryPreviews.length > 0 && (
                      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                        {galleryPreviews.map((preview, index) => (
                          <div key={index} className="relative">
                            <img
                              src={preview}
                              alt={`Gallery ${index + 1}`}
                              className="w-full h-32 object-cover rounded-lg"
                            />
                            <button
                              onClick={() => removeGalleryImage(index)}
                              className="absolute top-1 right-1 p-1.5 rounded-lg transition-all"
                              style={{
                                backgroundColor: 'rgba(255, 255, 255, 0.9)',
                                border: '1px solid #DEDEDE'
                              }}
                            >
                              <Trash2 className="w-3.5 h-3.5" style={{ color: '#DC2626' }} />
                            </button>
                          </div>
                        ))}
                      </div>
                    )}
                    
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
                  </div>

                  {/* Brochure del proyecto */}
                  <div className="mt-8 pt-8" style={{ borderTop: '1px solid var(--border)' }}>
                    <label style={{
                      display: 'block',
                      fontFamily: 'var(--font-body)',
                      fontSize: 'var(--font-size-body-sm)',
                      fontWeight: 'var(--font-weight-medium)',
                      color: '#0A0A0A',
                      marginBottom: '8px'
                    }}>
                      Brochure del proyecto (PDF opcional)
                    </label>
                    
                    {!brochureUploaded ? (
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
                          onChange={handleBrochureUpload}
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
                          onClick={() => {
                            setFormData({ ...formData, brochure: null });
                            setBrochureUploaded(false);
                          }}
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
                      Un brochure ayuda a los interesados a conocer mejor tu proyecto.
                    </p>
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* Paso 2: Características del terreno */}
          {currentStep === 2 && (
            <div className="space-y-6">
              {/* Card: Terreno */}
              <div className="p-6 rounded-xl bg-background" style={{ border: '1px solid var(--border)' }}>
                <h3 style={{
                  fontFamily: 'var(--font-heading)',
                  fontSize: 'var(--font-size-h4)',
                  fontWeight: 'var(--font-weight-semibold)',
                  color: '#0A0A0A',
                  marginBottom: '20px'
                }}>
                  Terreno
                </h3>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                  <div>
                    <label style={{
                      display: 'block',
                      fontFamily: 'var(--font-body)',
                      fontSize: 'var(--font-size-body-sm)',
                      fontWeight: 'var(--font-weight-medium)',
                      color: '#0A0A0A',
                      marginBottom: '8px'
                    }}>
                      Superficie promedio (m²)
                    </label>
                    <input
                      type="text"
                      value={formData.averageSurface}
                      onChange={(e) => handleInputChange('averageSurface', e.target.value)}
                      placeholder="Ej: 7500"
                      className="w-full px-4 py-3 rounded-lg transition-all"
                      style={{
                        backgroundColor: '#FFFFFF',
                        border: '1px solid #DEDEDE',
                        fontFamily: 'var(--font-body)',
                        fontSize: 'var(--font-size-body-sm)',
                        color: '#0A0A0A',
                        outline: 'none'
                      }}
                    />
                  </div>

                  <div>
                    <label style={{
                      display: 'block',
                      fontFamily: 'var(--font-body)',
                      fontSize: 'var(--font-size-body-sm)',
                      fontWeight: 'var(--font-weight-medium)',
                      color: '#0A0A0A',
                      marginBottom: '8px'
                    }}>
                      Tipo de suelo
                    </label>
                    <select
                      value={formData.soilType}
                      onChange={(e) => handleInputChange('soilType', e.target.value)}
                      className="w-full px-4 py-3 rounded-lg transition-all"
                      style={{
                        backgroundColor: '#FFFFFF',
                        border: '1px solid #DEDEDE',
                        fontFamily: 'var(--font-body)',
                        fontSize: 'var(--font-size-body-sm)',
                        color: '#0A0A0A',
                        outline: 'none'
                      }}
                    >
                      <option value="">Seleccionar</option>
                      <option value="arcilloso">Arcilloso</option>
                      <option value="arenoso">Arenoso</option>
                      <option value="rocoso">Rocoso</option>
                      <option value="mixto">Mixto</option>
                    </select>
                  </div>

                  <div>
                    <label style={{
                      display: 'block',
                      fontFamily: 'var(--font-body)',
                      fontSize: 'var(--font-size-body-sm)',
                      fontWeight: 'var(--font-weight-medium)',
                      color: '#0A0A0A',
                      marginBottom: '8px'
                    }}>
                      Orientación
                    </label>
                    <select
                      value={formData.orientation}
                      onChange={(e) => handleInputChange('orientation', e.target.value)}
                      className="w-full px-4 py-3 rounded-lg transition-all"
                      style={{
                        backgroundColor: '#FFFFFF',
                        border: '1px solid #DEDEDE',
                        fontFamily: 'var(--font-body)',
                        fontSize: 'var(--font-size-body-sm)',
                        color: '#0A0A0A',
                        outline: 'none'
                      }}
                    >
                      <option value="">Seleccionar</option>
                      <option value="norte">Norte</option>
                      <option value="sur">Sur</option>
                      <option value="este">Este</option>
                      <option value="oeste">Oeste</option>
                      <option value="noreste">Noreste</option>
                      <option value="noroeste">Noroeste</option>
                      <option value="sureste">Sureste</option>
                      <option value="suroeste">Suroeste</option>
                    </select>
                  </div>

                  <div>
                    <label style={{
                      display: 'block',
                      fontFamily: 'var(--font-body)',
                      fontSize: 'var(--font-size-body-sm)',
                      fontWeight: 'var(--font-weight-medium)',
                      color: '#0A0A0A',
                      marginBottom: '8px'
                    }}>
                      Pendiente
                    </label>
                    <select
                      value={formData.slope}
                      onChange={(e) => handleInputChange('slope', e.target.value)}
                      className="w-full px-4 py-3 rounded-lg transition-all"
                      style={{
                        backgroundColor: '#FFFFFF',
                        border: '1px solid #DEDEDE',
                        fontFamily: 'var(--font-body)',
                        fontSize: 'var(--font-size-body-sm)',
                        color: '#0A0A0A',
                        outline: 'none'
                      }}
                    >
                      <option value="">Seleccionar</option>
                      <option value="plano">Plano</option>
                      <option value="suave">Suave</option>
                      <option value="moderado">Moderado</option>
                      <option value="pronunciado">Pronunciado</option>
                    </select>
                  </div>

                  <div className="md:col-span-2">
                    <label style={{
                      display: 'block',
                      fontFamily: 'var(--font-body)',
                      fontSize: 'var(--font-size-body-sm)',
                      fontWeight: 'var(--font-weight-medium)',
                      color: '#0A0A0A',
                      marginBottom: '8px'
                    }}>
                      Uso permitido
                    </label>
                    <input
                      type="text"
                      value={formData.permittedUse}
                      onChange={(e) => handleInputChange('permittedUse', e.target.value)}
                      placeholder="Ej: Residencial, agrícola, turístico"
                      className="w-full px-4 py-3 rounded-lg transition-all"
                      style={{
                        backgroundColor: '#FFFFFF',
                        border: '1px solid #DEDEDE',
                        fontFamily: 'var(--font-body)',
                        fontSize: 'var(--font-size-body-sm)',
                        color: '#0A0A0A',
                        outline: 'none'
                      }}
                    />
                  </div>
                </div>
              </div>

              {/* Card: Servicios */}
              <div className="p-6 rounded-xl bg-background" style={{ border: '1px solid var(--border)' }}>
                <h3 style={{
                  fontFamily: 'var(--font-heading)',
                  fontSize: 'var(--font-size-h4)',
                  fontWeight: 'var(--font-weight-semibold)',
                  color: '#0A0A0A',
                  marginBottom: '20px'
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

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {[
                    { key: 'hasWater', label: 'Agua', icon: Droplet },
                    { key: 'hasElectricity', label: 'Electricidad', icon: Zap },
                    { key: 'hasPavedRoad', label: 'Camino pavimentado', icon: Home },
                    { key: 'hasPerimeterFence', label: 'Cerco perimetral', icon: Shield },
                    { key: 'hasVehicleAccess', label: 'Acceso vehicular', icon: Car },
                  ].map((service) => {
                    const IconComponent = service.icon;
                    return (
                      <div
                        key={service.key}
                        onClick={() => handleInputChange(service.key, !formData[service.key as keyof typeof formData])}
                        className="flex items-center gap-3 p-4 rounded-lg cursor-pointer transition-all"
                        style={{
                          backgroundColor: formData[service.key as keyof typeof formData] ? '#E8F3E9' : '#FAFAFA',
                          border: `1px solid ${formData[service.key as keyof typeof formData] ? '#647E3F' : '#DEDEDE'}`
                        }}
                      >
                        <div
                          className="w-5 h-5 rounded flex items-center justify-center"
                          style={{
                            backgroundColor: formData[service.key as keyof typeof formData] ? '#647E3F' : '#FFFFFF',
                            border: `2px solid ${formData[service.key as keyof typeof formData] ? '#647E3F' : '#DEDEDE'}`
                          }}
                        >
                          {formData[service.key as keyof typeof formData] && (
                            <Check className="w-3 h-3" style={{ color: '#FFFFFF' }} />
                          )}
                        </div>
                        <IconComponent className="w-5 h-5" style={{ color: formData[service.key as keyof typeof formData] ? '#647E3F' : '#737373' }} />
                        <span style={{
                          fontFamily: 'var(--font-body)',
                          fontSize: 'var(--font-size-body-sm)',
                          color: '#0A0A0A',
                          fontWeight: 'var(--font-weight-medium)'
                        }}>
                          {service.label}
                        </span>
                      </div>
                    );
                  })}
                </div>
              </div>
            </div>
          )}

          {/* Paso 3: Ubicación */}
          {currentStep === 3 && (
            <div className="space-y-6">
              {/* Dirección */}
              <div className="p-6 rounded-xl bg-background" style={{ border: '1px solid var(--border)' }}>
                <h3 style={{
                  fontFamily: 'var(--font-heading)',
                  fontSize: 'var(--font-size-h4)',
                  fontWeight: 'var(--font-weight-semibold)',
                  color: '#0A0A0A',
                  marginBottom: '20px'
                }}>
                  Dirección del proyecto
                </h3>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                  <div className="md:col-span-2">
                    <label style={{
                      display: 'block',
                      fontFamily: 'var(--font-body)',
                      fontSize: 'var(--font-size-body-sm)',
                      fontWeight: 'var(--font-weight-medium)',
                      color: '#0A0A0A',
                      marginBottom: '8px'
                    }}>
                      Dirección completa
                    </label>
                    <input
                      type="text"
                      value={formData.fullAddress}
                      onChange={(e) => handleInputChange('fullAddress', e.target.value)}
                      placeholder="Ej: Camino Los Aromos Km 12, Pirque"
                      className="w-full px-4 py-3 rounded-lg transition-all"
                      style={{
                        backgroundColor: '#FFFFFF',
                        border: '1px solid #DEDEDE',
                        fontFamily: 'var(--font-body)',
                        fontSize: 'var(--font-size-body-sm)',
                        color: '#0A0A0A',
                        outline: 'none'
                      }}
                    />
                  </div>

                  <div>
                    <label style={{
                      display: 'block',
                      fontFamily: 'var(--font-body)',
                      fontSize: 'var(--font-size-body-sm)',
                      fontWeight: 'var(--font-weight-medium)',
                      color: '#0A0A0A',
                      marginBottom: '8px'
                    }}>
                      Región
                    </label>
                    <select
                      value={formData.locationRegion}
                      onChange={(e) => handleInputChange('locationRegion', e.target.value)}
                      className="w-full px-4 py-3 rounded-lg transition-all"
                      style={{
                        backgroundColor: '#FFFFFF',
                        border: '1px solid #DEDEDE',
                        fontFamily: 'var(--font-body)',
                        fontSize: 'var(--font-size-body-sm)',
                        color: '#0A0A0A',
                        outline: 'none'
                      }}
                    >
                      <option value="">Seleccionar región</option>
                      {Object.keys(regionesComunas).map(region => (
                        <option key={region} value={region}>{region}</option>
                      ))}
                    </select>
                  </div>

                  <div>
                    <label style={{
                      display: 'block',
                      fontFamily: 'var(--font-body)',
                      fontSize: 'var(--font-size-body-sm)',
                      fontWeight: 'var(--font-weight-medium)',
                      color: '#0A0A0A',
                      marginBottom: '8px'
                    }}>
                      Ciudad
                    </label>
                    <select
                      value={formData.locationCity}
                      onChange={(e) => handleInputChange('locationCity', e.target.value)}
                      className="w-full px-4 py-3 rounded-lg transition-all"
                      style={{
                        backgroundColor: '#FFFFFF',
                        border: '1px solid #DEDEDE',
                        fontFamily: 'var(--font-body)',
                        fontSize: 'var(--font-size-body-sm)',
                        color: '#0A0A0A',
                        outline: 'none'
                      }}
                      disabled={!formData.locationRegion}
                    >
                      <option value="">Seleccionar ciudad</option>
                      {formData.locationRegion && regionesComunas[formData.locationRegion]?.map(city => (
                        <option key={city} value={city}>{city}</option>
                      ))}
                    </select>
                  </div>
                </div>
              </div>

              {/* Ubicación en mapa */}
              <div 
                className="p-6 rounded-xl space-y-5"
                style={{
                  backgroundColor: '#FFFFFF',
                  border: '1px solid var(--border)'
                }}
              >
                <h3 style={{
                  fontFamily: 'var(--font-heading)',
                  fontSize: 'var(--font-size-h4)',
                  fontWeight: 'var(--font-weight-semibold)',
                  color: '#0A0A0A',
                }}>
                  Ubicación en mapa
                </h3>

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
                        onChange={(e) => handleInputChange('view360', e.target.value)}
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
                      Agrega un enlace para mostrar una vista de 360° del proyecto.
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
                          border: '2px dashed #DEDEDE',
                          borderRadius: '12px',
                          padding: '32px',
                          backgroundColor: '#FAFAFA',
                          transition: 'all 0.2s',
                        }}
                        onMouseEnter={(e) => {
                          e.currentTarget.style.borderColor = '#006B4E';
                          e.currentTarget.style.backgroundColor = '#F9FAFB';
                        }}
                        onMouseLeave={(e) => {
                          e.currentTarget.style.borderColor = '#DEDEDE';
                          e.currentTarget.style.backgroundColor = '#FAFAFA';
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
                              Subir plano del proyecto (masterplan)
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
                          onChange={(e) => handleInputChange('latitude', e.target.value)}
                          placeholder="Ej: -33.4569"
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
                          onChange={(e) => handleInputChange('longitude', e.target.value)}
                          placeholder="Ej: -70.6483"
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
                          : 'Ingresa las coordenadas para ubicar el proyecto en el mapa'}
                      </p>
                    </div>

                    {/* Texto de ayuda */}
                    <p style={{
                      fontFamily: 'var(--font-body)',
                      fontSize: 'var(--font-size-xs)',
                      color: '#737373',
                      lineHeight: 'var(--line-height-body)',
                    }}>
                      Ingresa las coordenadas para ubicar exactamente el proyecto en el mapa.
                    </p>
                  </div>
                )}
              </div>
            </div>
          )}

          {/* Paso 4: Información del entorno */}
          {currentStep === 4 && (
            <div className="space-y-6">
              {/* Accesos y conectividad */}
              <div className="p-6 rounded-xl bg-background" style={{ border: '1px solid var(--border)' }}>
                <h3 style={{
                  fontFamily: 'var(--font-heading)',
                  fontSize: 'var(--font-size-h4)',
                  fontWeight: 'var(--font-weight-semibold)',
                  color: '#0A0A0A',
                  marginBottom: '20px'
                }}>
                  Accesos y conectividad
                </h3>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                  <div>
                    <label style={{
                      display: 'block',
                      fontFamily: 'var(--font-body)',
                      fontSize: 'var(--font-size-body-sm)',
                      fontWeight: 'var(--font-weight-medium)',
                      color: '#0A0A0A',
                      marginBottom: '8px'
                    }}>
                      Tiempo al centro (minutos)
                    </label>
                    <input
                      type="text"
                      value={formData.timeToCityCenter}
                      onChange={(e) => handleInputChange('timeToCityCenter', e.target.value)}
                      placeholder="Ej: 45"
                      className="w-full px-4 py-3 rounded-lg transition-all"
                      style={{
                        backgroundColor: '#FFFFFF',
                        border: '1px solid #DEDEDE',
                        fontFamily: 'var(--font-body)',
                        fontSize: 'var(--font-size-body-sm)',
                        color: '#0A0A0A',
                        outline: 'none'
                      }}
                    />
                  </div>

                  <div>
                    <label style={{
                      display: 'block',
                      fontFamily: 'var(--font-body)',
                      fontSize: 'var(--font-size-body-sm)',
                      fontWeight: 'var(--font-weight-medium)',
                      color: '#0A0A0A',
                      marginBottom: '8px'
                    }}>
                      Distancia a ciudad cercana (km)
                    </label>
                    <input
                      type="text"
                      value={formData.distanceToNearestCity}
                      onChange={(e) => handleInputChange('distanceToNearestCity', e.target.value)}
                      placeholder="Ej: 12"
                      className="w-full px-4 py-3 rounded-lg transition-all"
                      style={{
                        backgroundColor: '#FFFFFF',
                        border: '1px solid #DEDEDE',
                        fontFamily: 'var(--font-body)',
                        fontSize: 'var(--font-size-body-sm)',
                        color: '#0A0A0A',
                        outline: 'none'
                      }}
                    />
                  </div>
                </div>

                <div className="mt-6">
                  <h4 style={{
                    fontFamily: 'var(--font-body)',
                    fontSize: 'var(--font-size-body-sm)',
                    fontWeight: 'var(--font-weight-semibold)',
                    color: '#0A0A0A',
                    marginBottom: '16px'
                  }}>
                    Servicios cercanos
                  </h4>

                  <div className="space-y-5">
                    {[
                      { key: 'educationLevel', label: 'Educación' },
                      { key: 'commerceLevel', label: 'Comercio' },
                      { key: 'healthLevel', label: 'Salud' },
                      { key: 'recreationLevel', label: 'Recreación' },
                    ].map((service) => (
                      <div key={service.key}>
                        <label style={{
                          display: 'block',
                          fontFamily: 'var(--font-body)',
                          fontSize: 'var(--font-size-body-sm)',
                          color: '#0A0A0A',
                          marginBottom: '8px'
                        }}>
                          {service.label}
                        </label>
                        <input
                          type="range"
                          min="1"
                          max="5"
                          value={formData[service.key as keyof typeof formData]}
                          onChange={(e) => handleInputChange(service.key, e.target.value)}
                          className="w-full"
                          style={{
                            accentColor: '#006B4E'
                          }}
                        />
                        <div className="flex justify-between mt-1">
                          <span style={{
                            fontFamily: 'var(--font-body)',
                            fontSize: 'var(--font-size-body-xs)',
                            color: '#737373'
                          }}>Bajo</span>
                          <span style={{
                            fontFamily: 'var(--font-body)',
                            fontSize: 'var(--font-size-body-xs)',
                            color: '#737373'
                          }}>Alto</span>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>

              {/* Entorno natural */}
              <div className="p-6 rounded-xl bg-background" style={{ border: '1px solid var(--border)' }}>
                <h3 style={{
                  fontFamily: 'var(--font-heading)',
                  fontSize: 'var(--font-size-h4)',
                  fontWeight: 'var(--font-weight-semibold)',
                  color: '#0A0A0A',
                  marginBottom: '20px'
                }}>
                  Entorno natural
                </h3>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                  <div>
                    <label style={{
                      display: 'block',
                      fontFamily: 'var(--font-body)',
                      fontSize: 'var(--font-size-body-sm)',
                      fontWeight: 'var(--font-weight-medium)',
                      color: '#0A0A0A',
                      marginBottom: '8px'
                    }}>
                      Naturaleza / Paisaje
                    </label>
                    <input
                      type="text"
                      value={formData.naturalEnvironment}
                      onChange={(e) => handleInputChange('naturalEnvironment', e.target.value)}
                      placeholder="Ej: Bosque nativo, montañas"
                      className="w-full px-4 py-3 rounded-lg transition-all"
                      style={{
                        backgroundColor: '#FFFFFF',
                        border: '1px solid #DEDEDE',
                        fontFamily: 'var(--font-body)',
                        fontSize: 'var(--font-size-body-sm)',
                        color: '#0A0A0A',
                        outline: 'none'
                      }}
                    />
                  </div>

                  <div>
                    <label style={{
                      display: 'block',
                      fontFamily: 'var(--font-body)',
                      fontSize: 'var(--font-size-body-sm)',
                      fontWeight: 'var(--font-weight-medium)',
                      color: '#0A0A0A',
                      marginBottom: '8px'
                    }}>
                      Vistas
                    </label>
                    <input
                      type="text"
                      value={formData.views}
                      onChange={(e) => handleInputChange('views', e.target.value)}
                      placeholder="Ej: Vista a la cordillera"
                      className="w-full px-4 py-3 rounded-lg transition-all"
                      style={{
                        backgroundColor: '#FFFFFF',
                        border: '1px solid #DEDEDE',
                        fontFamily: 'var(--font-body)',
                        fontSize: 'var(--font-size-body-sm)',
                        color: '#0A0A0A',
                        outline: 'none'
                      }}
                    />
                  </div>

                  <div>
                    <label style={{
                      display: 'block',
                      fontFamily: 'var(--font-body)',
                      fontSize: 'var(--font-size-body-sm)',
                      fontWeight: 'var(--font-weight-medium)',
                      color: '#0A0A0A',
                      marginBottom: '8px'
                    }}>
                      Temperatura promedio (°C)
                    </label>
                    <input
                      type="text"
                      value={formData.averageTemperature}
                      onChange={(e) => handleInputChange('averageTemperature', e.target.value)}
                      placeholder="Ej: 18"
                      className="w-full px-4 py-3 rounded-lg transition-all"
                      style={{
                        backgroundColor: '#FFFFFF',
                        border: '1px solid #DEDEDE',
                        fontFamily: 'var(--font-body)',
                        fontSize: 'var(--font-size-body-sm)',
                        color: '#0A0A0A',
                        outline: 'none'
                      }}
                    />
                  </div>

                  <div>
                    <label style={{
                      display: 'block',
                      fontFamily: 'var(--font-body)',
                      fontSize: 'var(--font-size-body-sm)',
                      fontWeight: 'var(--font-weight-medium)',
                      color: '#0A0A0A',
                      marginBottom: '8px'
                    }}>
                      Precipitaciones (mm/año)
                    </label>
                    <input
                      type="text"
                      value={formData.precipitation}
                      onChange={(e) => handleInputChange('precipitation', e.target.value)}
                      placeholder="Ej: 800"
                      className="w-full px-4 py-3 rounded-lg transition-all"
                      style={{
                        backgroundColor: '#FFFFFF',
                        border: '1px solid #DEDEDE',
                        fontFamily: 'var(--font-body)',
                        fontSize: 'var(--font-size-body-sm)',
                        color: '#0A0A0A',
                        outline: 'none'
                      }}
                    />
                  </div>
                </div>
              </div>

              {/* Contexto del área */}
              <div className="p-6 rounded-xl bg-background" style={{ border: '1px solid var(--border)' }}>
                <h3 style={{
                  fontFamily: 'var(--font-heading)',
                  fontSize: 'var(--font-size-h4)',
                  fontWeight: 'var(--font-weight-semibold)',
                  color: '#0A0A0A',
                  marginBottom: '20px'
                }}>
                  Contexto del área
                </h3>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                  <div>
                    <label style={{
                      display: 'block',
                      fontFamily: 'var(--font-body)',
                      fontSize: 'var(--font-size-body-sm)',
                      fontWeight: 'var(--font-weight-medium)',
                      color: '#0A0A0A',
                      marginBottom: '8px'
                    }}>
                      Población aproximada
                    </label>
                    <input
                      type="text"
                      value={formData.approximatePopulation}
                      onChange={(e) => handleInputChange('approximatePopulation', e.target.value)}
                      placeholder="Ej: 5000"
                      className="w-full px-4 py-3 rounded-lg transition-all"
                      style={{
                        backgroundColor: '#FFFFFF',
                        border: '1px solid #DEDEDE',
                        fontFamily: 'var(--font-body)',
                        fontSize: 'var(--font-size-body-sm)',
                        color: '#0A0A0A',
                        outline: 'none'
                      }}
                    />
                  </div>

                  <div>
                    <label style={{
                      display: 'block',
                      fontFamily: 'var(--font-body)',
                      fontSize: 'var(--font-size-body-sm)',
                      fontWeight: 'var(--font-weight-medium)',
                      color: '#0A0A0A',
                      marginBottom: '8px'
                    }}>
                      Actividades principales
                    </label>
                    <input
                      type="text"
                      value={formData.mainActivities}
                      onChange={(e) => handleInputChange('mainActivities', e.target.value)}
                      placeholder="Ej: Agricultura, turismo"
                      className="w-full px-4 py-3 rounded-lg transition-all"
                      style={{
                        backgroundColor: '#FFFFFF',
                        border: '1px solid #DEDEDE',
                        fontFamily: 'var(--font-body)',
                        fontSize: 'var(--font-size-body-sm)',
                        color: '#0A0A0A',
                        outline: 'none'
                      }}
                    />
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* Paso 5: Parcelas del proyecto */}
          {currentStep === 5 && (
            <div className="space-y-6">
              <div className="p-6 rounded-xl bg-background" style={{ border: '1px solid var(--border)' }}>
                <h3 style={{
                  fontFamily: 'var(--font-heading)',
                  fontSize: 'var(--font-size-h4)',
                  fontWeight: 'var(--font-weight-semibold)',
                  color: '#0A0A0A',
                  marginBottom: '20px'
                }}>
                  Parcelas del proyecto
                </h3>

                {/* Acciones */}
                <div className="flex flex-wrap items-center gap-3 mb-6">
                  <button
                    onClick={handleImportPlots}
                    className="flex items-center gap-2 px-4 py-2.5 rounded-lg transition-all"
                    style={{
                      backgroundColor: '#006B4E',
                      color: '#FFFFFF',
                      fontFamily: 'var(--font-body)',
                      fontSize: 'var(--font-size-body-sm)',
                      fontWeight: 'var(--font-weight-medium)',
                      border: 'none'
                    }}
                  >
                    <Download className="w-4 h-4" />
                    <span>Importar parcelas</span>
                  </button>

                  <button
                    onClick={handleAddPlot}
                    className="flex items-center gap-2 px-4 py-2.5 rounded-lg transition-all"
                    style={{
                      backgroundColor: '#FFFFFF',
                      color: '#0A0A0A',
                      fontFamily: 'var(--font-body)',
                      fontSize: 'var(--font-size-body-sm)',
                      fontWeight: 'var(--font-weight-medium)',
                      border: '1px solid #DEDEDE'
                    }}
                  >
                    <Plus className="w-4 h-4" />
                    <span>Agregar parcela</span>
                  </button>

                  {/* Input file oculto para importar Excel */}
                  <input
                    ref={excelInputRef}
                    type="file"
                    accept=".xlsx, .xls, .csv"
                    onChange={handleExcelFileChange}
                    style={{ display: 'none' }}
                  />

                  <div className="flex-1 min-w-[200px]">
                    <div className="relative">
                      <Search className="w-4 h-4 absolute left-3 top-1/2 -translate-y-1/2" style={{ color: '#737373' }} />
                      <input
                        type="text"
                        value={searchPlot}
                        onChange={(e) => setSearchPlot(e.target.value)}
                        placeholder="Buscar parcela..."
                        className="w-full pl-10 pr-4 py-2.5 rounded-lg transition-all"
                        style={{
                          backgroundColor: '#FFFFFF',
                          border: '1px solid #DEDEDE',
                          fontFamily: 'var(--font-body)',
                          fontSize: 'var(--font-size-body-sm)',
                          color: '#0A0A0A',
                          outline: 'none'
                        }}
                      />
                    </div>
                  </div>
                </div>

                {/* Tabla */}
                <div className="overflow-x-auto rounded-lg" style={{ border: '1px solid var(--border)' }}>
                  <div className="max-h-96 overflow-y-auto">
                    <table className="w-full">
                      <thead style={{ backgroundColor: '#FAFAFA', position: 'sticky', top: 0 }}>
                        <tr>
                          <th style={{
                            padding: '12px 16px',
                            textAlign: 'left',
                            fontFamily: 'var(--font-body)',
                            fontSize: 'var(--font-size-body-xs)',
                            fontWeight: 'var(--font-weight-semibold)',
                            color: '#737373',
                            borderBottom: '1px solid var(--border)'
                          }}>
                            Parcela
                          </th>
                          <th style={{
                            padding: '12px 16px',
                            textAlign: 'left',
                            fontFamily: 'var(--font-body)',
                            fontSize: 'var(--font-size-body-xs)',
                            fontWeight: 'var(--font-weight-semibold)',
                            color: '#737373',
                            borderBottom: '1px solid var(--border)'
                          }}>
                            Superficie m²
                          </th>
                          <th style={{
                            padding: '12px 16px',
                            textAlign: 'left',
                            fontFamily: 'var(--font-body)',
                            fontSize: 'var(--font-size-body-xs)',
                            fontWeight: 'var(--font-weight-semibold)',
                            color: '#737373',
                            borderBottom: '1px solid var(--border)'
                          }}>
                            Servidumbre m²
                          </th>
                          <th style={{
                            padding: '12px 16px',
                            textAlign: 'left',
                            fontFamily: 'var(--font-body)',
                            fontSize: 'var(--font-size-body-xs)',
                            fontWeight: 'var(--font-weight-semibold)',
                            color: '#737373',
                            borderBottom: '1px solid var(--border)'
                          }}>
                            Precio
                          </th>
                          <th style={{
                            padding: '12px 16px',
                            textAlign: 'left',
                            fontFamily: 'var(--font-body)',
                            fontSize: 'var(--font-size-body-xs)',
                            fontWeight: 'var(--font-weight-semibold)',
                            color: '#737373',
                            borderBottom: '1px solid var(--border)'
                          }}>
                            Estado
                          </th>
                          <th style={{
                            padding: '12px 16px',
                            textAlign: 'left',
                            fontFamily: 'var(--font-body)',
                            fontSize: 'var(--font-size-body-xs)',
                            fontWeight: 'var(--font-weight-semibold)',
                            color: '#737373',
                            borderBottom: '1px solid var(--border)'
                          }}>
                            Moneda
                          </th>
                          <th style={{
                            padding: '12px 16px',
                            textAlign: 'right',
                            fontFamily: 'var(--font-body)',
                            fontSize: 'var(--font-size-body-xs)',
                            fontWeight: 'var(--font-weight-semibold)',
                            color: '#737373',
                            borderBottom: '1px solid var(--border)'
                          }}>
                            Acciones
                          </th>
                        </tr>
                      </thead>
                      <tbody>
                        {filteredPlots.length === 0 ? (
                          <tr>
                            <td colSpan={7} style={{ padding: '40px', textAlign: 'center' }}>
                              <p style={{
                                fontFamily: 'var(--font-body)',
                                fontSize: 'var(--font-size-body-sm)',
                                color: '#737373'
                              }}>
                                No hay parcelas agregadas. Hacé clic en "Agregar parcela" o "Importar parcelas"
                              </p>
                            </td>
                          </tr>
                        ) : (
                          filteredPlots.map((plot) => (
                            <tr key={plot.id} style={{ borderBottom: '1px solid var(--border)' }}>
                              <td style={{ padding: '12px 16px' }}>
                                <input
                                  type="text"
                                  value={plot.name}
                                  onChange={(e) => handleEditPlot(plot.id, 'name', e.target.value)}
                                  className="w-full px-2 py-1 rounded"
                                  style={{
                                    backgroundColor: '#FAFAFA',
                                    border: '1px solid #DEDEDE',
                                    fontFamily: 'var(--font-body)',
                                    fontSize: 'var(--font-size-body-sm)',
                                    color: '#0A0A0A'
                                  }}
                                />
                              </td>
                              <td style={{ padding: '12px 16px' }}>
                                <input
                                  type="text"
                                  value={plot.surface}
                                  onChange={(e) => handleEditPlot(plot.id, 'surface', e.target.value)}
                                  className="w-full px-2 py-1 rounded"
                                  style={{
                                    backgroundColor: '#FAFAFA',
                                    border: '1px solid #DEDEDE',
                                    fontFamily: 'var(--font-body)',
                                    fontSize: 'var(--font-size-body-sm)',
                                    color: '#0A0A0A'
                                  }}
                                />
                              </td>
                              <td style={{ padding: '12px 16px' }}>
                                <input
                                  type="text"
                                  value={plot.servitude}
                                  onChange={(e) => handleEditPlot(plot.id, 'servitude', e.target.value)}
                                  className="w-full px-2 py-1 rounded"
                                  style={{
                                    backgroundColor: '#FAFAFA',
                                    border: '1px solid #DEDEDE',
                                    fontFamily: 'var(--font-body)',
                                    fontSize: 'var(--font-size-body-sm)',
                                    color: '#0A0A0A'
                                  }}
                                />
                              </td>
                              <td style={{ padding: '12px 16px' }}>
                                <input
                                  type="text"
                                  value={plot.price}
                                  onChange={(e) => handleEditPlot(plot.id, 'price', e.target.value)}
                                  className="w-full px-2 py-1 rounded"
                                  style={{
                                    backgroundColor: '#FAFAFA',
                                    border: '1px solid #DEDEDE',
                                    fontFamily: 'var(--font-body)',
                                    fontSize: 'var(--font-size-body-sm)',
                                    color: '#0A0A0A'
                                  }}
                                />
                              </td>
                              <td style={{ padding: '12px 16px' }}>
                                <select
                                  value={plot.status}
                                  onChange={(e) => handleEditPlot(plot.id, 'status', e.target.value)}
                                  className="w-full px-2 py-1 rounded"
                                  style={{
                                    backgroundColor: '#FAFAFA',
                                    border: '1px solid #DEDEDE',
                                    fontFamily: 'var(--font-body)',
                                    fontSize: 'var(--font-size-body-sm)',
                                    color: '#0A0A0A'
                                  }}
                                >
                                  <option value="disponible">Disponible</option>
                                  <option value="reservado">Reservado</option>
                                  <option value="vendido">Vendido</option>
                                </select>
                              </td>
                              <td style={{ padding: '12px 16px' }}>
                                <select
                                  value={plot.currency}
                                  onChange={(e) => handleEditPlot(plot.id, 'currency', e.target.value)}
                                  className="w-full px-2 py-1 rounded"
                                  style={{
                                    backgroundColor: '#FAFAFA',
                                    border: '1px solid #DEDEDE',
                                    fontFamily: 'var(--font-body)',
                                    fontSize: 'var(--font-size-body-sm)',
                                    color: '#0A0A0A'
                                  }}
                                >
                                  <option value="CLP">CLP</option>
                                  <option value="USD">USD</option>
                                  <option value="UF">UF</option>
                                </select>
                              </td>
                              <td style={{ padding: '12px 16px' }}>
                                <div className="flex items-center justify-end gap-2">
                                  <button
                                    onClick={() => handleDuplicatePlot(plot.id)}
                                    className="p-1.5 rounded transition-all hover:bg-muted"
                                  >
                                    <Copy className="w-4 h-4" style={{ color: '#006B4E' }} />
                                  </button>
                                  <button
                                    onClick={() => handleDeletePlot(plot.id)}
                                    className="p-1.5 rounded transition-all hover:bg-muted"
                                  >
                                    <Trash2 className="w-4 h-4" style={{ color: '#DC2626' }} />
                                  </button>
                                </div>
                              </td>
                            </tr>
                          ))
                        )}
                      </tbody>
                    </table>
                  </div>
                </div>

                {/* Resumen */}
                {plots.length > 0 && (
                  <div className="mt-6 p-4 rounded-lg" style={{ backgroundColor: '#FAFAFA' }}>
                    <div className="grid grid-cols-2 md:grid-cols-5 gap-4">
                      <div>
                        <p style={{
                          fontFamily: 'var(--font-body)',
                          fontSize: 'var(--font-size-body-xs)',
                          color: '#737373',
                          marginBottom: '4px'
                        }}>
                          Total parcelas
                        </p>
                        <p style={{
                          fontFamily: 'var(--font-body)',
                          fontSize: 'var(--font-size-h4)',
                          fontWeight: 'var(--font-weight-semibold)',
                          color: '#0A0A0A'
                        }}>
                          {plotStats.total}
                        </p>
                      </div>
                      <div>
                        <p style={{
                          fontFamily: 'var(--font-body)',
                          fontSize: 'var(--font-size-body-xs)',
                          color: '#737373',
                          marginBottom: '4px'
                        }}>
                          Cargadas
                        </p>
                        <p style={{
                          fontFamily: 'var(--font-body)',
                          fontSize: 'var(--font-size-h4)',
                          fontWeight: 'var(--font-weight-semibold)',
                          color: '#0A0A0A'
                        }}>
                          {plotStats.total}
                        </p>
                      </div>
                      <div>
                        <p style={{
                          fontFamily: 'var(--font-body)',
                          fontSize: 'var(--font-size-body-xs)',
                          color: '#737373',
                          marginBottom: '4px'
                        }}>
                          Disponibles
                        </p>
                        <p style={{
                          fontFamily: 'var(--font-body)',
                          fontSize: 'var(--font-size-h4)',
                          fontWeight: 'var(--font-weight-semibold)',
                          color: '#647E3F'
                        }}>
                          {plotStats.available}
                        </p>
                      </div>
                      <div>
                        <p style={{
                          fontFamily: 'var(--font-body)',
                          fontSize: 'var(--font-size-body-xs)',
                          color: '#737373',
                          marginBottom: '4px'
                        }}>
                          Reservadas
                        </p>
                        <p style={{
                          fontFamily: 'var(--font-body)',
                          fontSize: 'var(--font-size-h4)',
                          fontWeight: 'var(--font-weight-semibold)',
                          color: '#7D460D'
                        }}>
                          {plotStats.reserved}
                        </p>
                      </div>
                      <div>
                        <p style={{
                          fontFamily: 'var(--font-body)',
                          fontSize: 'var(--font-size-body-xs)',
                          color: '#737373',
                          marginBottom: '4px'
                        }}>
                          Vendidas
                        </p>
                        <p style={{
                          fontFamily: 'var(--font-body)',
                          fontSize: 'var(--font-size-h4)',
                          fontWeight: 'var(--font-weight-semibold)',
                          color: '#737373'
                        }}>
                          {plotStats.sold}
                        </p>
                      </div>
                    </div>
                  </div>
                )}
              </div>
            </div>
          )}

          {/* Paso 6: Documentación */}
          {currentStep === 6 && (
            <div className="space-y-6">
              {/* Masterplan */}
              <div className="p-6 rounded-xl bg-background" style={{ border: '1px solid var(--border)' }}>
                <h3 style={{
                  fontFamily: 'var(--font-heading)',
                  fontSize: 'var(--font-size-h4)',
                  fontWeight: 'var(--font-weight-semibold)',
                  color: '#0A0A0A',
                  marginBottom: '20px'
                }}>
                  Masterplan
                </h3>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                  {/* Imagen del masterplan */}
                  <div>
                    <label style={{
                      display: 'block',
                      fontFamily: 'var(--font-body)',
                      fontSize: 'var(--font-size-body-sm)',
                      fontWeight: 'var(--font-weight-medium)',
                      color: '#0A0A0A',
                      marginBottom: '8px'
                    }}>
                      Imagen del masterplan
                    </label>
                    
                    <input
                      ref={masterplanImageInputRef}
                      type="file"
                      accept="image/*"
                      onChange={handleMasterplanImageUpload}
                      className="hidden"
                    />
                    
                    {!masterplanImagePreview ? (
                      <button
                        type="button"
                        onClick={() => masterplanImageInputRef.current?.click()}
                        className="w-full px-6 py-8 rounded-lg transition-all flex flex-col items-center gap-3"
                        style={{
                          backgroundColor: '#FAFAFA',
                          border: '2px dashed #DEDEDE'
                        }}
                      >
                        <ImageIcon className="w-8 h-8" style={{ color: '#006B4E' }} />
                        <div className="text-center">
                          <p style={{
                            fontFamily: 'var(--font-body)',
                            fontSize: 'var(--font-size-body-sm)',
                            fontWeight: 'var(--font-weight-medium)',
                            color: '#0A0A0A'
                          }}>
                            Subir imagen
                          </p>
                        </div>
                      </button>
                    ) : (
                      <div className="relative">
                        <img
                          src={masterplanImagePreview}
                          alt="Masterplan"
                          className="w-full h-48 object-cover rounded-lg"
                        />
                        <button
                          onClick={() => {
                            setMasterplanImagePreview('');
                            setFormData({ ...formData, masterplanImage: null });
                          }}
                          className="absolute top-2 right-2 p-2 rounded-lg transition-all"
                          style={{
                            backgroundColor: 'rgba(255, 255, 255, 0.9)',
                            border: '1px solid #DEDEDE'
                          }}
                        >
                          <Trash2 className="w-4 h-4" style={{ color: '#DC2626' }} />
                        </button>
                      </div>
                    )}
                  </div>

                  {/* PDF del plano */}
                  <div>
                    <label style={{
                      display: 'block',
                      fontFamily: 'var(--font-body)',
                      fontSize: 'var(--font-size-body-sm)',
                      fontWeight: 'var(--font-weight-medium)',
                      color: '#0A0A0A',
                      marginBottom: '8px'
                    }}>
                      PDF del plano
                    </label>
                    
                    <input
                      ref={masterplanPdfInputRef}
                      type="file"
                      accept=".pdf"
                      className="hidden"
                    />
                    
                    <button
                      type="button"
                      onClick={() => masterplanPdfInputRef.current?.click()}
                      className="w-full px-6 py-8 rounded-lg transition-all flex flex-col items-center gap-3"
                      style={{
                        backgroundColor: '#FAFAFA',
                        border: '2px dashed #DEDEDE'
                      }}
                    >
                      <FileText className="w-8 h-8" style={{ color: '#006B4E' }} />
                      <div className="text-center">
                        <p style={{
                          fontFamily: 'var(--font-body)',
                          fontSize: 'var(--font-size-body-sm)',
                          fontWeight: 'var(--font-weight-medium)',
                          color: '#0A0A0A'
                        }}>
                          Subir PDF
                        </p>
                      </div>
                    </button>
                  </div>
                </div>
              </div>

              {/* Estado legal */}
              <div className="p-6 rounded-xl bg-background" style={{ border: '1px solid var(--border)' }}>
                <h3 style={{
                  fontFamily: 'var(--font-heading)',
                  fontSize: 'var(--font-size-h4)',
                  fontWeight: 'var(--font-weight-semibold)',
                  color: '#0A0A0A',
                  marginBottom: '20px'
                }}>
                  Estado legal
                </h3>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                  <div>
                    <label style={{
                      display: 'block',
                      fontFamily: 'var(--font-body)',
                      fontSize: 'var(--font-size-body-sm)',
                      fontWeight: 'var(--font-weight-medium)',
                      color: '#0A0A0A',
                      marginBottom: '8px'
                    }}>
                      Rol de avalúo
                    </label>
                    <input
                      type="text"
                      value={formData.taxRoll}
                      onChange={(e) => handleInputChange('taxRoll', e.target.value)}
                      placeholder="Ej: 123-456-789"
                      className="w-full px-4 py-3 rounded-lg transition-all"
                      style={{
                        backgroundColor: '#FFFFFF',
                        border: '1px solid #DEDEDE',
                        fontFamily: 'var(--font-body)',
                        fontSize: 'var(--font-size-body-sm)',
                        color: '#0A0A0A',
                        outline: 'none'
                      }}
                    />
                  </div>

                  <div>
                    <label style={{
                      display: 'block',
                      fontFamily: 'var(--font-body)',
                      fontSize: 'var(--font-size-body-sm)',
                      fontWeight: 'var(--font-weight-medium)',
                      color: '#0A0A0A',
                      marginBottom: '8px'
                    }}>
                      Estado legal
                    </label>
                    <select
                      value={formData.legalStatus}
                      onChange={(e) => handleInputChange('legalStatus', e.target.value)}
                      className="w-full px-4 py-3 rounded-lg transition-all"
                      style={{
                        backgroundColor: '#FFFFFF',
                        border: '1px solid #DEDEDE',
                        fontFamily: 'var(--font-body)',
                        fontSize: 'var(--font-size-body-sm)',
                        color: '#0A0A0A',
                        outline: 'none'
                      }}
                    >
                      <option value="">Seleccionar</option>
                      <option value="al-dia">Al día</option>
                      <option value="en-tramite">En trámite</option>
                      <option value="pendiente">Pendiente</option>
                    </select>
                  </div>

                  <div className="md:col-span-2">
                    <label className="flex items-center gap-3 cursor-pointer">
                      <div
                        className="w-5 h-5 rounded flex items-center justify-center"
                        style={{
                          backgroundColor: formData.documentationVerified ? '#647E3F' : '#FFFFFF',
                          border: `2px solid ${formData.documentationVerified ? '#647E3F' : '#DEDEDE'}`
                        }}
                        onClick={() => handleInputChange('documentationVerified', !formData.documentationVerified)}
                      >
                        {formData.documentationVerified && (
                          <Check className="w-3 h-3" style={{ color: '#FFFFFF' }} />
                        )}
                      </div>
                      <span style={{
                        fontFamily: 'var(--font-body)',
                        fontSize: 'var(--font-size-body-sm)',
                        color: '#0A0A0A',
                        fontWeight: 'var(--font-weight-medium)'
                      }}>
                        Documentación verificada
                      </span>
                    </label>
                  </div>
                </div>
              </div>

              {/* Documentos */}
              <div className="p-6 rounded-xl bg-background" style={{ border: '1px solid var(--border)' }}>
                <h3 style={{
                  fontFamily: 'var(--font-heading)',
                  fontSize: 'var(--font-size-h4)',
                  fontWeight: 'var(--font-weight-semibold)',
                  color: '#0A0A0A',
                  marginBottom: '20px'
                }}>
                  Documentos
                </h3>

                <button
                  type="button"
                  className="w-full px-6 py-6 rounded-lg transition-all flex items-center justify-center gap-2"
                  style={{
                    backgroundColor: '#FAFAFA',
                    border: '2px dashed #DEDEDE'
                  }}
                >
                  <Upload className="w-5 h-5" style={{ color: '#006B4E' }} />
                  <span style={{
                    fontFamily: 'var(--font-body)',
                    fontSize: 'var(--font-size-body-sm)',
                    fontWeight: 'var(--font-weight-medium)',
                    color: '#0A0A0A'
                  }}>
                    Subir escritura, documentos legales y archivos adicionales
                  </span>
                </button>
              </div>
            </div>
          )}
        </div>

        {/* Footer con botones de navegación */}
        <div 
          className="fixed bottom-0 left-0 right-0 z-40"
          style={{ 
            backgroundColor: '#FFFFFF',
            borderTop: '1px solid var(--border)'
          }}
        >
          <div className="max-w-[1000px] mx-auto px-6 py-5">
            <div className="flex items-center justify-between gap-4">
              <button
                onClick={handleBack}
                disabled={currentStep === 1}
                className="flex items-center gap-2 px-6 py-3 rounded-full transition-all"
                style={{
                  backgroundColor: 'transparent',
                  color: currentStep === 1 ? '#C3C3C3' : '#0A0A0A',
                  border: `1px solid ${currentStep === 1 ? '#E5E5E5' : '#DEDEDE'}`,
                  fontFamily: 'var(--font-body)',
                  fontSize: 'var(--font-size-body-sm)',
                  fontWeight: 'var(--font-weight-medium)',
                  cursor: currentStep === 1 ? 'not-allowed' : 'pointer',
                  letterSpacing: 'var(--letter-spacing-wide)'
                }}
                onMouseEnter={(e) => {
                  if (currentStep !== 1) {
                    e.currentTarget.style.borderColor = '#006B4E';
                    e.currentTarget.style.color = '#006B4E';
                  }
                }}
                onMouseLeave={(e) => {
                  if (currentStep !== 1) {
                    e.currentTarget.style.borderColor = '#DEDEDE';
                    e.currentTarget.style.color = '#0A0A0A';
                  }
                }}
              >
                <ChevronLeft size={16} />
                <span>Volver</span>
              </button>

              <div className="flex items-center gap-3">
                {currentStep < 6 ? (
                  <button
                    onClick={handleNext}
                    className="px-8 py-3 rounded-full transition-all"
                    style={{
                      backgroundColor: '#006B4E',
                      color: '#FFFFFF',
                      fontFamily: 'var(--font-body)',
                      fontSize: 'var(--font-size-body-sm)',
                      fontWeight: 'var(--font-weight-medium)',
                      border: 'none',
                      letterSpacing: 'var(--letter-spacing-wide)'
                    }}
                    onMouseEnter={(e) => e.currentTarget.style.backgroundColor = '#0F3A42'}
                    onMouseLeave={(e) => e.currentTarget.style.backgroundColor = '#006B4E'}
                  >
                    Siguiente
                  </button>
                ) : (
                  <>
                    <button
                      onClick={() => setShowPreview(true)}
                      className="flex items-center gap-2 px-6 py-3 rounded-full transition-all"
                      style={{
                        backgroundColor: 'transparent',
                        border: '1px solid #DEDEDE',
                        color: '#0A0A0A',
                        fontFamily: 'var(--font-body)',
                        fontSize: 'var(--font-size-body-sm)',
                        fontWeight: 'var(--font-weight-medium)',
                        letterSpacing: 'var(--letter-spacing-wide)'
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
                      <Eye size={16} />
                      Vista previa
                    </button>
                    <button
                      onClick={handlePublishProject}
                      className="px-8 py-3 rounded-full transition-all"
                      style={{
                        backgroundColor: '#647E3F',
                        color: '#FFFFFF',
                        fontFamily: 'var(--font-body)',
                        fontSize: 'var(--font-size-body-sm)',
                        fontWeight: 'var(--font-weight-medium)',
                        border: 'none',
                        letterSpacing: 'var(--letter-spacing-wide)'
                      }}
                      onMouseEnter={(e) => e.currentTarget.style.backgroundColor = '#546A35'}
                      onMouseLeave={(e) => e.currentTarget.style.backgroundColor = '#647E3F'}
                    >
                      Publicar proyecto
                    </button>
                  </>
                )}
              </div>
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
                  Así es como verán tu proyecto los usuarios
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
              {/* Tarjeta principal del proyecto */}
              <div 
                className="rounded-xl overflow-hidden"
                style={{ 
                  border: '1px solid var(--border)',
                  backgroundColor: '#FFFFFF'
                }}
              >
                {/* Imagen principal */}
                {formData.mainImage && (
                  <div style={{ position: 'relative', height: '400px' }}>
                    <img 
                      src={URL.createObjectURL(formData.mainImage)} 
                      alt="Imagen principal del proyecto"
                      style={{
                        width: '100%',
                        height: '100%',
                        objectFit: 'cover',
                      }}
                    />
                    {/* Badge de estado */}
                    <div 
                      className="absolute top-4 right-4 px-4 py-2 rounded-lg"
                      style={{
                        backgroundColor: 'rgba(0, 107, 78, 0.95)',
                        backdropFilter: 'blur(8px)',
                      }}
                    >
                      <p style={{
                        fontFamily: 'var(--font-body)',
                        fontSize: 'var(--font-size-body-sm)',
                        fontWeight: 'var(--font-weight-semibold)',
                        color: '#FFFFFF',
                        textTransform: 'capitalize'
                      }}>
                        {formData.projectStatus === 'en-venta' ? 'En Venta' : formData.projectStatus === 'preventa' ? 'Preventa' : 'Vendido'}
                      </p>
                    </div>
                  </div>
                )}

                {/* Información */}
                <div className="p-6 space-y-4">
                  <div>
                    <div className="flex items-center gap-2 mb-2">
                      <span 
                        className="px-3 py-1 rounded-full"
                        style={{
                          backgroundColor: '#E8F4F6',
                          fontFamily: 'var(--font-body)',
                          fontSize: 'var(--font-size-xs)',
                          fontWeight: 'var(--font-weight-medium)',
                          color: '#006B4E'
                        }}
                      >
                        Proyecto
                      </span>
                    </div>
                    <h3 style={{
                      fontFamily: 'var(--font-heading)',
                      fontSize: 'var(--font-size-h3)',
                      fontWeight: 'var(--font-weight-regular)',
                      color: '#0A0A0A',
                      marginBottom: '8px',
                    }}>
                      {formData.projectName || 'Nombre del proyecto'}
                    </h3>
                    <div className="flex items-center gap-2">
                      <MapPin size={16} style={{ color: '#737373' }} />
                      <p style={{
                        fontFamily: 'var(--font-body)',
                        fontSize: 'var(--font-size-body-sm)',
                        color: '#737373',
                      }}>
                        {formData.address ? `${formData.address}, ${formData.city}, ${formData.region}` : 'Ubicación no especificada'}
                      </p>
                    </div>
                  </div>

                  {/* Información destacada */}
                  <div 
                    className="grid grid-cols-3 gap-4 p-4 rounded-lg"
                    style={{ backgroundColor: '#FAFAFA' }}
                  >
                    <div>
                      <p style={{
                        fontFamily: 'var(--font-body)',
                        fontSize: 'var(--font-size-xs)',
                        color: '#737373',
                        marginBottom: '4px',
                      }}>
                        Total parcelas
                      </p>
                      <p style={{
                        fontFamily: 'var(--font-body)',
                        fontSize: 'var(--font-size-body-base)',
                        fontWeight: 'var(--font-weight-semibold)',
                        color: '#0A0A0A',
                      }}>
                        {formData.totalPlots || '0'}
                      </p>
                    </div>
                    <div>
                      <p style={{
                        fontFamily: 'var(--font-body)',
                        fontSize: 'var(--font-size-xs)',
                        color: '#737373',
                        marginBottom: '4px',
                      }}>
                        Desde
                      </p>
                      <p style={{
                        fontFamily: 'var(--font-body)',
                        fontSize: 'var(--font-size-body-base)',
                        fontWeight: 'var(--font-weight-semibold)',
                        color: '#0A0A0A',
                      }}>
                        {formData.minSurface ? `${formData.minSurface} m²` : '-'}
                      </p>
                    </div>
                    <div>
                      <p style={{
                        fontFamily: 'var(--font-body)',
                        fontSize: 'var(--font-size-xs)',
                        color: '#737373',
                        marginBottom: '4px',
                      }}>
                        Hasta
                      </p>
                      <p style={{
                        fontFamily: 'var(--font-body)',
                        fontSize: 'var(--font-size-body-base)',
                        fontWeight: 'var(--font-weight-semibold)',
                        color: '#0A0A0A',
                      }}>
                        {formData.maxSurface ? `${formData.maxSurface} m²` : '-'}
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
                        fontSize: 'var(--font-size-body-sm)',
                        color: '#525252',
                        lineHeight: 'var(--line-height-body)',
                      }}>
                        {formData.description}
                      </p>
                    </div>
                  )}

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
                      {formData.hasWater && (
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
                      {formData.hasElectricity && (
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
                            Electricidad cercana
                          </span>
                        </div>
                      )}
                      {formData.hasPavedRoad && (
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
                      {formData.hasPerimeterFence && (
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
                            Cierre perimetral
                          </span>
                        </div>
                      )}
                      {formData.hasVehicleAccess && (
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
                            Acceso vehicular
                          </span>
                        </div>
                      )}
                    </div>
                  </div>
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
                    handlePublishProject();
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
                  Publicar proyecto
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
