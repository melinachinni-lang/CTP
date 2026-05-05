import React, { useState, useEffect } from 'react';
import { ChevronLeft, ChevronRight, Upload, X, Check, FileText, AlertCircle, Save, Plus, Trash2, Edit2 } from 'lucide-react';
import { VambeChat } from '@/app/components/VambeChat';

// Tipos de estados de publicación
export type PublicationStatus = 'draft' | 'published' | 'paused' | 'unpublished';

// Tipo para unidades/parcelas en stock
export interface StockUnit {
  id: string;
  code: string;
  surface: string;
  price: string;
  status: 'available' | 'reserved' | 'sold';
  terrainType?: 'flat' | 'gentle-slopes' | 'mixed' | 'slope-views';
}

export interface PublicationData {
  id?: string;
  status: PublicationStatus;
  publisherType?: 'inmobiliaria' | 'broker' | 'vendedor_particular';
  publisherId?: string;
  
  // Paso 1: Datos básicos
  title: string;
  lotNumber: string;
  surface: string;
  typology: string;
  price: string;
  priceType: 'fixed' | 'from' | 'consult';
  availability: 'available' | 'reserved' | 'sold';
  
  // Paso 2: Ubicación y características
  region: string;
  comuna: string;
  sector: string;
  hasApprovedRole: boolean;
  readyForDeed: boolean;
  roadExecuted: boolean;
  hasGate: boolean;
  
  // Paso 3: Imágenes y descripción
  mainImage: File | string | null;
  galleryImages: (File | string)[];
  description: string;
  documents: (File | string)[];
  
  // Paso 4: Stock y disponibilidad
  stockUnits: StockUnit[];
}

interface PublicationWizardProps {
  onClose: () => void;
  onSave: (data: PublicationData, status: PublicationStatus) => void;
  initialData?: PublicationData;
  mode: 'create' | 'edit';
  publisherType?: 'inmobiliaria' | 'broker' | 'vendedor_particular';
  publisherId?: string;
}

export function PublicationWizard({ onClose, onSave, initialData, mode, publisherType, publisherId }: PublicationWizardProps) {
  const [currentStep, setCurrentStep] = useState(1);
  const [formData, setFormData] = useState<PublicationData>(initialData || {
    status: 'draft',
    publisherType: publisherType,
    publisherId: publisherId,
    title: '',
    lotNumber: '',
    surface: '',
    typology: '',
    price: '',
    priceType: 'fixed',
    availability: 'available',
    region: '',
    comuna: '',
    sector: '',
    hasApprovedRole: false,
    readyForDeed: false,
    roadExecuted: false,
    hasGate: false,
    mainImage: null,
    galleryImages: [],
    description: '',
    documents: [],
    stockUnits: [],
  });

  const [imagePreview, setImagePreview] = useState<string>('');
  const [galleryPreviews, setGalleryPreviews] = useState<string[]>([]);
  const [documentPreviews, setDocumentPreviews] = useState<Array<{ name: string; file: File | string }>>([]);
  const [validationErrors, setValidationErrors] = useState<string[]>([]);
  const [editingUnit, setEditingUnit] = useState<StockUnit | null>(null);
  const [showAddUnitForm, setShowAddUnitForm] = useState(false);

  useEffect(() => {
    // Si hay una imagen principal inicial (modo edición), cargar el preview
    if (initialData?.mainImage && typeof initialData.mainImage === 'string') {
      setImagePreview(initialData.mainImage);
    }
    // Si hay galería inicial (modo edición), cargar los previews
    if (initialData?.galleryImages) {
      const previews = initialData.galleryImages.filter((img): img is string => typeof img === 'string');
      setGalleryPreviews(previews);
    }
    // Si hay documentos iniciales (modo edición), cargar los previews
    if (initialData?.documents) {
      const docPreviews = initialData.documents.map((doc, index) => ({
        name: typeof doc === 'string' ? `Documento ${index + 1}.pdf` : doc.name,
        file: doc
      }));
      setDocumentPreviews(docPreviews);
    }
  }, [initialData]);

  const steps = [
    { number: 1, label: 'Datos de la parcela' },
    { number: 2, label: 'Ubicación y características' },
    { number: 3, label: 'Imágenes y descripción' },
    { number: 4, label: 'Stock y disponibilidad' },
    { number: 5, label: 'Revisión y publicación' },
  ];

  // Validar campos obligatorios
  const validateForPublish = (): string[] => {
    const errors: string[] = [];
    
    if (!formData.title.trim()) errors.push('Título de la publicación');
    if (!formData.surface.trim()) errors.push('Superficie');
    if (!formData.price.trim()) errors.push('Precio');
    if (!formData.region.trim()) errors.push('Región');
    if (!formData.comuna.trim()) errors.push('Comuna');
    if (!formData.mainImage) errors.push('Imagen principal');
    if (!formData.description.trim()) errors.push('Descripción');
    
    return errors;
  };

  const canPublish = validateForPublish().length === 0;

  const handleNext = () => {
    if (currentStep < 5) {
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

  const goToStep = (step: number) => {
    setCurrentStep(step);
    window.scrollTo(0, 0);
  };

  const handleMainImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      const file = e.target.files[0];
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
      setFormData({ ...formData, galleryImages: [...formData.galleryImages, ...files] });
      
      files.forEach(file => {
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

  const handleDocumentUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      const files = Array.from(e.target.files);
      setFormData({ ...formData, documents: [...formData.documents, ...files] });
      
      const newPreviews = files.map(file => ({
        name: file.name,
        file: file
      }));
      setDocumentPreviews([...documentPreviews, ...newPreviews]);
    }
  };

  const removeDocument = (index: number) => {
    const newDocuments = formData.documents.filter((_, i) => i !== index);
    const newPreviews = documentPreviews.filter((_, i) => i !== index);
    setFormData({ ...formData, documents: newDocuments });
    setDocumentPreviews(newPreviews);
  };

  const handleAddStockUnit = (unit: Omit<StockUnit, 'id'>) => {
    const newUnit: StockUnit = {
      ...unit,
      id: `unit-${Date.now()}-${Math.random().toString(36).substr(2, 9)}`,
    };
    setFormData({
      ...formData,
      stockUnits: [...formData.stockUnits, newUnit],
    });
    setShowAddUnitForm(false);
  };

  const handleUpdateStockUnit = (id: string, updatedUnit: Omit<StockUnit, 'id'>) => {
    setFormData({
      ...formData,
      stockUnits: formData.stockUnits.map(unit =>
        unit.id === id ? { ...updatedUnit, id } : unit
      ),
    });
    setEditingUnit(null);
  };

  const handleDeleteStockUnit = (id: string) => {
    setFormData({
      ...formData,
      stockUnits: formData.stockUnits.filter(unit => unit.id !== id),
    });
  };

  const handlePublish = () => {
    const errors = validateForPublish();
    if (errors.length > 0) {
      setValidationErrors(errors);
      return;
    }
    onSave({ ...formData, status: 'published' }, 'published');
  };

  const handleSaveDraft = () => {
    setValidationErrors([]);
    onSave({ ...formData, status: 'draft' }, 'draft');
  };

  const getStatusBadge = () => {
    const statusConfig: Record<PublicationStatus, { label: string; bgColor: string; textColor: string }> = {
      draft: { label: 'BORRADOR', bgColor: '#F5F5F5', textColor: '#737373' },
      published: { label: 'PUBLICADA', bgColor: '#DCFCE7', textColor: '#166534' },
      paused: { label: 'PAUSADA', bgColor: '#FEF3C7', textColor: '#92400E' },
      unpublished: { label: 'DESPUBLICADA', bgColor: '#FEE2E2', textColor: '#991B1B' },
    };
    
    const config = statusConfig[formData.status];
    return (
      <span 
        className="px-3 py-1.5 rounded-full"
        style={{ 
          backgroundColor: config.bgColor,
          color: config.textColor,
          fontFamily: 'var(--font-body)',
          fontWeight: 'var(--font-weight-medium)',
          fontSize: 'var(--font-size-xs)',
          letterSpacing: 'var(--letter-spacing-wide)',
          lineHeight: 'var(--line-height-ui)'
        }}
      >
        {config.label}
      </span>
    );
  };

  return (
    <div className="min-h-screen" style={{ backgroundColor: '#FFFFFF' }}>
      {/* Header */}
      <div className="sticky top-0 z-30" style={{ borderBottom: '1px solid #DEDEDE', backgroundColor: '#FFFFFF' }}>
        <div className="max-w-5xl mx-auto px-6 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-4">
              <button
                onClick={onClose}
                className="p-2 hover:bg-gray-100 transition-colors rounded-lg"
              >
                <X className="w-5 h-5" style={{ color: '#737373' }} />
              </button>
              <div className="flex items-center gap-3">
                <div>
                  <h1 style={{
                    fontFamily: 'var(--font-heading)',
                    fontSize: 'var(--font-size-h3)',
                    fontWeight: 'var(--font-weight-semibold)',
                    color: '#0A0A0A',
                    lineHeight: 'var(--line-height-heading)'
                  }}>
                    {mode === 'create' ? 'Nueva publicación de parcela' : 'Editar publicación'}
                  </h1>
                  <p style={{
                    fontFamily: 'var(--font-body)',
                    fontSize: 'var(--font-size-body-sm)',
                    color: '#737373',
                    lineHeight: 'var(--line-height-ui)'
                  }}>
                    Paso {currentStep} de 5
                  </p>
                </div>
                {getStatusBadge()}
              </div>
            </div>
            <button
              onClick={handleSaveDraft}
              className="flex items-center gap-2 px-4 py-2.5 transition-all rounded-full"
              style={{
                border: '1px solid #DEDEDE',
                backgroundColor: '#FFFFFF',
                color: '#0A0A0A',
                fontFamily: 'var(--font-body)',
                fontSize: 'var(--font-size-body-sm)',
                fontWeight: 'var(--font-weight-medium)',
                lineHeight: 'var(--line-height-ui)'
              }}
              onMouseEnter={(e) => { e.currentTarget.style.backgroundColor = '#F5F5F5'; }}
              onMouseLeave={(e) => { e.currentTarget.style.backgroundColor = '#FFFFFF'; }}
            >
              <Save className="w-4 h-4" />
              Guardar borrador
            </button>
          </div>
        </div>
      </div>

      {/* Progress Bar */}
      <div style={{ borderBottom: '1px solid #DEDEDE', backgroundColor: '#FAFAFA' }}>
        <div className="max-w-5xl mx-auto px-6 py-6">
          <div className="flex items-center justify-between">
            {steps.map((step, index) => (
              <React.Fragment key={step.number}>
                <button 
                  onClick={() => goToStep(step.number)}
                  className="flex flex-col items-center flex-1 cursor-pointer group"
                >
                  <div
                    className="w-10 h-10 rounded-full flex items-center justify-center transition-all"
                    style={{
                      backgroundColor: currentStep > step.number ? '#111' : '#FFFFFF',
                      border: currentStep === step.number ? '2px solid #111' : '2px solid #DEDEDE',
                      color: currentStep > step.number ? '#FFFFFF' : currentStep === step.number ? '#0A0A0A' : '#A3A3A3',
                      fontFamily: 'var(--font-body)',
                      fontSize: 'var(--font-size-body-sm)',
                      fontWeight: 'var(--font-weight-bold)'
                    }}
                  >
                    {currentStep > step.number ? (
                      <Check className="w-5 h-5" />
                    ) : (
                      step.number
                    )}
                  </div>
                  <span
                    className="mt-2 text-center group-hover:opacity-70 transition-opacity"
                    style={{
                      fontFamily: 'var(--font-body)',
                      fontSize: 'var(--font-size-xs)',
                      fontWeight: 'var(--font-weight-medium)',
                      color: currentStep >= step.number ? '#0A0A0A' : '#A3A3A3',
                      lineHeight: 'var(--line-height-ui)'
                    }}
                  >
                    {step.label}
                  </span>
                </button>
                {index < steps.length - 1 && (
                  <div
                    className="flex-1 h-0.5 mx-2 mb-6 transition-colors"
                    style={{
                      backgroundColor: currentStep > step.number ? '#111' : '#DEDEDE'
                    }}
                  />
                )}
              </React.Fragment>
            ))}
          </div>
        </div>
      </div>

      {/* Form Content */}
      <div className="max-w-4xl mx-auto px-6 py-8">
        {/* Paso 1: Datos de la parcela */}
        {currentStep === 1 && (
          <div className="space-y-8">
            <div>
              <h2 style={{
                fontFamily: 'var(--font-heading)',
                fontSize: 'var(--font-size-h2)',
                fontWeight: 'var(--font-weight-semibold)',
                color: '#0A0A0A',
                lineHeight: 'var(--line-height-heading)',
                marginBottom: '8px'
              }}>
                Datos básicos de la parcela
              </h2>
              <p style={{
                fontFamily: 'var(--font-body)',
                fontSize: 'var(--font-size-body-sm)',
                color: '#737373',
                lineHeight: 'var(--line-height-ui)'
              }}>
                Ingresa la información principal que los compradores verán primero
              </p>
            </div>

            <div className="space-y-6">
              {/* Título */}
              <div>
                <label 
                  className="block mb-2"
                  style={{
                    fontFamily: 'var(--font-body)',
                    fontSize: 'var(--font-size-body-sm)',
                    fontWeight: 'var(--font-weight-medium)',
                    color: '#0A0A0A',
                    lineHeight: 'var(--line-height-ui)'
                  }}
                >
                  Título de la publicación <span style={{ color: '#DC2626' }}>*</span>
                </label>
                <input
                  type="text"
                  value={formData.title}
                  onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                  placeholder="Ej: Parcela con vista al valle en Pirque"
                  className="w-full px-4 py-3 rounded-lg transition-all"
                  style={{
                    border: '1px solid #DEDEDE',
                    fontFamily: 'var(--font-body)',
                    fontSize: 'var(--font-size-body-sm)',
                    color: '#0A0A0A',
                    lineHeight: 'var(--line-height-ui)'
                  }}
                  onFocus={(e) => { e.currentTarget.style.borderColor = '#0A0A0A'; }}
                  onBlur={(e) => { e.currentTarget.style.borderColor = '#DEDEDE'; }}
                />
              </div>

              <div className="grid grid-cols-2 gap-4">
                {/* Número de lote */}
                <div>
                  <label 
                    className="block mb-2"
                    style={{
                      fontFamily: 'var(--font-body)',
                      fontSize: 'var(--font-size-body-sm)',
                      fontWeight: 'var(--font-weight-medium)',
                      color: '#0A0A0A',
                      lineHeight: 'var(--line-height-ui)'
                    }}
                  >
                    Número de lote/parcela
                  </label>
                  <input
                    type="text"
                    value={formData.lotNumber}
                    onChange={(e) => setFormData({ ...formData, lotNumber: e.target.value })}
                    placeholder="Ej: Lote 23"
                    className="w-full px-4 py-3 rounded-lg transition-all"
                    style={{
                      border: '1px solid #DEDEDE',
                      fontFamily: 'var(--font-body)',
                      fontSize: 'var(--font-size-body-sm)',
                      color: '#0A0A0A',
                      lineHeight: 'var(--line-height-ui)'
                    }}
                    onFocus={(e) => { e.currentTarget.style.borderColor = '#0A0A0A'; }}
                    onBlur={(e) => { e.currentTarget.style.borderColor = '#DEDEDE'; }}
                  />
                </div>

                {/* Superficie */}
                <div>
                  <label 
                    className="block mb-2"
                    style={{
                      fontFamily: 'var(--font-body)',
                      fontSize: 'var(--font-size-body-sm)',
                      fontWeight: 'var(--font-weight-medium)',
                      color: '#0A0A0A',
                      lineHeight: 'var(--line-height-ui)'
                    }}
                  >
                    Superficie (m²) <span style={{ color: '#DC2626' }}>*</span>
                  </label>
                  <input
                    type="text"
                    value={formData.surface}
                    onChange={(e) => setFormData({ ...formData, surface: e.target.value })}
                    placeholder="Ej: 5000"
                    className="w-full px-4 py-3 rounded-lg transition-all"
                    style={{
                      border: '1px solid #DEDEDE',
                      fontFamily: 'var(--font-body)',
                      fontSize: 'var(--font-size-body-sm)',
                      color: '#0A0A0A',
                      lineHeight: 'var(--line-height-ui)'
                    }}
                    onFocus={(e) => { e.currentTarget.style.borderColor = '#0A0A0A'; }}
                    onBlur={(e) => { e.currentTarget.style.borderColor = '#DEDEDE'; }}
                  />
                </div>
              </div>

              {/* Tipología */}
              <div>
                <label 
                  className="block mb-2"
                  style={{
                    fontFamily: 'var(--font-body)',
                    fontSize: 'var(--font-size-body-sm)',
                    fontWeight: 'var(--font-weight-medium)',
                    color: '#0A0A0A',
                    lineHeight: 'var(--line-height-ui)'
                  }}
                >
                  Tipología
                </label>
                <select
                  value={formData.typology}
                  onChange={(e) => setFormData({ ...formData, typology: e.target.value })}
                  className="w-full px-4 py-3 rounded-lg transition-all"
                  style={{
                    border: '1px solid #DEDEDE',
                    fontFamily: 'var(--font-body)',
                    fontSize: 'var(--font-size-body-sm)',
                    color: formData.typology ? '#0A0A0A' : '#A3A3A3',
                    lineHeight: 'var(--line-height-ui)'
                  }}
                  onFocus={(e) => { e.currentTarget.style.borderColor = '#0A0A0A'; }}
                  onBlur={(e) => { e.currentTarget.style.borderColor = '#DEDEDE'; }}
                >
                  <option value="">Selecciona una tipología</option>
                  <option value="residencial">Residencial</option>
                  <option value="agricola">Agrícola</option>
                  <option value="forestal">Forestal</option>
                  <option value="mixta">Mixta</option>
                  <option value="recreacional">Recreacional</option>
                </select>
              </div>

              <div className="grid grid-cols-2 gap-4">
                {/* Precio */}
                <div>
                  <label 
                    className="block mb-2"
                    style={{
                      fontFamily: 'var(--font-body)',
                      fontSize: 'var(--font-size-body-sm)',
                      fontWeight: 'var(--font-weight-medium)',
                      color: '#0A0A0A',
                      lineHeight: 'var(--line-height-ui)'
                    }}
                  >
                    Precio (CLP) <span style={{ color: '#DC2626' }}>*</span>
                  </label>
                  <input
                    type="text"
                    value={formData.price}
                    onChange={(e) => setFormData({ ...formData, price: e.target.value })}
                    placeholder="Ej: 120000000"
                    className="w-full px-4 py-3 rounded-lg transition-all"
                    style={{
                      border: '1px solid #DEDEDE',
                      fontFamily: 'var(--font-body)',
                      fontSize: 'var(--font-size-body-sm)',
                      color: '#0A0A0A',
                      lineHeight: 'var(--line-height-ui)'
                    }}
                    onFocus={(e) => { e.currentTarget.style.borderColor = '#0A0A0A'; }}
                    onBlur={(e) => { e.currentTarget.style.borderColor = '#DEDEDE'; }}
                  />
                </div>

                {/* Tipo de precio */}
                <div>
                  <label 
                    className="block mb-2"
                    style={{
                      fontFamily: 'var(--font-body)',
                      fontSize: 'var(--font-size-body-sm)',
                      fontWeight: 'var(--font-weight-medium)',
                      color: '#0A0A0A',
                      lineHeight: 'var(--line-height-ui)'
                    }}
                  >
                    Tipo de precio
                  </label>
                  <select
                    value={formData.priceType}
                    onChange={(e) => setFormData({ ...formData, priceType: e.target.value as 'fixed' | 'from' | 'consult' })}
                    className="w-full px-4 py-3 rounded-lg transition-all"
                    style={{
                      border: '1px solid #DEDEDE',
                      fontFamily: 'var(--font-body)',
                      fontSize: 'var(--font-size-body-sm)',
                      color: '#0A0A0A',
                      lineHeight: 'var(--line-height-ui)'
                    }}
                    onFocus={(e) => { e.currentTarget.style.borderColor = '#0A0A0A'; }}
                    onBlur={(e) => { e.currentTarget.style.borderColor = '#DEDEDE'; }}
                  >
                    <option value="fixed">Precio fijo</option>
                    <option value="from">Desde (precio mínimo)</option>
                    <option value="consult">Consultar</option>
                  </select>
                </div>
              </div>

              {/* Disponibilidad */}
              <div>
                <label 
                  className="block mb-2"
                  style={{
                    fontFamily: 'var(--font-body)',
                    fontSize: 'var(--font-size-body-sm)',
                    fontWeight: 'var(--font-weight-medium)',
                    color: '#0A0A0A',
                    lineHeight: 'var(--line-height-ui)'
                  }}
                >
                  Disponibilidad
                </label>
                <select
                  value={formData.availability}
                  onChange={(e) => setFormData({ ...formData, availability: e.target.value as 'available' | 'reserved' | 'sold' })}
                  className="w-full px-4 py-3 rounded-lg transition-all"
                  style={{
                    border: '1px solid #DEDEDE',
                    fontFamily: 'var(--font-body)',
                    fontSize: 'var(--font-size-body-sm)',
                    color: '#0A0A0A',
                    lineHeight: 'var(--line-height-ui)'
                  }}
                  onFocus={(e) => { e.currentTarget.style.borderColor = '#0A0A0A'; }}
                  onBlur={(e) => { e.currentTarget.style.borderColor = '#DEDEDE'; }}
                >
                  <option value="available">Disponible</option>
                  <option value="reserved">Reservada</option>
                  <option value="sold">Vendida</option>
                </select>
              </div>
            </div>
          </div>
        )}

        {/* Paso 2: Ubicación y características */}
        {currentStep === 2 && (
          <div className="space-y-8">
            <div>
              <h2 style={{
                fontFamily: 'var(--font-heading)',
                fontSize: 'var(--font-size-h2)',
                fontWeight: 'var(--font-weight-semibold)',
                color: '#0A0A0A',
                lineHeight: 'var(--line-height-heading)',
                marginBottom: '8px'
              }}>
                Ubicación y características
              </h2>
              <p style={{
                fontFamily: 'var(--font-body)',
                fontSize: 'var(--font-size-body-sm)',
                color: '#737373',
                lineHeight: 'var(--line-height-ui)'
              }}>
                Especifica dónde se encuentra la parcela y sus características legales
              </p>
            </div>

            <div className="space-y-6">
              <div className="grid grid-cols-2 gap-4">
                {/* Región */}
                <div>
                  <label 
                    className="block mb-2"
                    style={{
                      fontFamily: 'var(--font-body)',
                      fontSize: 'var(--font-size-body-sm)',
                      fontWeight: 'var(--font-weight-medium)',
                      color: '#0A0A0A',
                      lineHeight: 'var(--line-height-ui)'
                    }}
                  >
                    Región <span style={{ color: '#DC2626' }}>*</span>
                  </label>
                  <select
                    value={formData.region}
                    onChange={(e) => setFormData({ ...formData, region: e.target.value })}
                    className="w-full px-4 py-3 rounded-lg transition-all"
                    style={{
                      border: '1px solid #DEDEDE',
                      fontFamily: 'var(--font-body)',
                      fontSize: 'var(--font-size-body-sm)',
                      color: formData.region ? '#0A0A0A' : '#A3A3A3',
                      lineHeight: 'var(--line-height-ui)'
                    }}
                    onFocus={(e) => { e.currentTarget.style.borderColor = '#0A0A0A'; }}
                    onBlur={(e) => { e.currentTarget.style.borderColor = '#DEDEDE'; }}
                  >
                    <option value="">Selecciona una región</option>
                    <option value="metropolitana">Región Metropolitana</option>
                    <option value="valparaiso">Valparaíso</option>
                    <option value="ohiggins">O'Higgins</option>
                    <option value="maule">Maule</option>
                  </select>
                </div>

                {/* Comuna */}
                <div>
                  <label 
                    className="block mb-2"
                    style={{
                      fontFamily: 'var(--font-body)',
                      fontSize: 'var(--font-size-body-sm)',
                      fontWeight: 'var(--font-weight-medium)',
                      color: '#0A0A0A',
                      lineHeight: 'var(--line-height-ui)'
                    }}
                  >
                    Comuna <span style={{ color: '#DC2626' }}>*</span>
                  </label>
                  <input
                    type="text"
                    value={formData.comuna}
                    onChange={(e) => setFormData({ ...formData, comuna: e.target.value })}
                    placeholder="Ej: Pirque"
                    className="w-full px-4 py-3 rounded-lg transition-all"
                    style={{
                      border: '1px solid #DEDEDE',
                      fontFamily: 'var(--font-body)',
                      fontSize: 'var(--font-size-body-sm)',
                      color: '#0A0A0A',
                      lineHeight: 'var(--line-height-ui)'
                    }}
                    onFocus={(e) => { e.currentTarget.style.borderColor = '#0A0A0A'; }}
                    onBlur={(e) => { e.currentTarget.style.borderColor = '#DEDEDE'; }}
                  />
                </div>
              </div>

              {/* Sector */}
              <div>
                <label 
                  className="block mb-2"
                  style={{
                    fontFamily: 'var(--font-body)',
                    fontSize: 'var(--font-size-body-sm)',
                    fontWeight: 'var(--font-weight-medium)',
                    color: '#0A0A0A',
                    lineHeight: 'var(--line-height-ui)'
                  }}
                >
                  Sector o localidad
                </label>
                <input
                  type="text"
                  value={formData.sector}
                  onChange={(e) => setFormData({ ...formData, sector: e.target.value })}
                  placeholder="Ej: El Principal, Camino al Volcán"
                  className="w-full px-4 py-3 rounded-lg transition-all"
                  style={{
                    border: '1px solid #DEDEDE',
                    fontFamily: 'var(--font-body)',
                    fontSize: 'var(--font-size-body-sm)',
                    color: '#0A0A0A',
                    lineHeight: 'var(--line-height-ui)'
                  }}
                  onFocus={(e) => { e.currentTarget.style.borderColor = '#0A0A0A'; }}
                  onBlur={(e) => { e.currentTarget.style.borderColor = '#DEDEDE'; }}
                />
              </div>

              {/* Características legales */}
              <div>
                <label 
                  className="block mb-4"
                  style={{
                    fontFamily: 'var(--font-body)',
                    fontSize: 'var(--font-size-body-sm)',
                    fontWeight: 'var(--font-weight-medium)',
                    color: '#0A0A0A',
                    lineHeight: 'var(--line-height-ui)'
                  }}
                >
                  Características legales y de infraestructura
                </label>
                <div className="space-y-3">
                  <label className="flex items-center gap-3 cursor-pointer">
                    <input
                      type="checkbox"
                      checked={formData.hasApprovedRole}
                      onChange={(e) => setFormData({ ...formData, hasApprovedRole: e.target.checked })}
                      className="w-5 h-5 rounded"
                      style={{ accentColor: '#111' }}
                    />
                    <span style={{
                      fontFamily: 'var(--font-body)',
                      fontSize: 'var(--font-size-body-sm)',
                      color: '#0A0A0A',
                      lineHeight: 'var(--line-height-ui)'
                    }}>
                      Rol aprobado
                    </span>
                  </label>
                  <label className="flex items-center gap-3 cursor-pointer">
                    <input
                      type="checkbox"
                      checked={formData.readyForDeed}
                      onChange={(e) => setFormData({ ...formData, readyForDeed: e.target.checked })}
                      className="w-5 h-5 rounded"
                      style={{ accentColor: '#111' }}
                    />
                    <span style={{
                      fontFamily: 'var(--font-body)',
                      fontSize: 'var(--font-size-body-sm)',
                      color: '#0A0A0A',
                      lineHeight: 'var(--line-height-ui)'
                    }}>
                      Lista para escriturar
                    </span>
                  </label>
                  <label className="flex items-center gap-3 cursor-pointer">
                    <input
                      type="checkbox"
                      checked={formData.roadExecuted}
                      onChange={(e) => setFormData({ ...formData, roadExecuted: e.target.checked })}
                      className="w-5 h-5 rounded"
                      style={{ accentColor: '#111' }}
                    />
                    <span style={{
                      fontFamily: 'var(--font-body)',
                      fontSize: 'var(--font-size-body-sm)',
                      color: '#0A0A0A',
                      lineHeight: 'var(--line-height-ui)'
                    }}>
                      Camino ejecutado
                    </span>
                  </label>
                  <label className="flex items-center gap-3 cursor-pointer">
                    <input
                      type="checkbox"
                      checked={formData.hasGate}
                      onChange={(e) => setFormData({ ...formData, hasGate: e.target.checked })}
                      className="w-5 h-5 rounded"
                      style={{ accentColor: '#111' }}
                    />
                    <span style={{
                      fontFamily: 'var(--font-body)',
                      fontSize: 'var(--font-size-body-sm)',
                      color: '#0A0A0A',
                      lineHeight: 'var(--line-height-ui)'
                    }}>
                      Portería / Control de acceso
                    </span>
                  </label>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Paso 3: Imágenes y descripción */}
        {currentStep === 3 && (
          <div className="space-y-8">
            <div>
              <h2 style={{
                fontFamily: 'var(--font-heading)',
                fontSize: 'var(--font-size-h2)',
                fontWeight: 'var(--font-weight-semibold)',
                color: '#0A0A0A',
                lineHeight: 'var(--line-height-heading)',
                marginBottom: '8px'
              }}>
                Imágenes y descripción
              </h2>
              <p style={{
                fontFamily: 'var(--font-body)',
                fontSize: 'var(--font-size-body-sm)',
                color: '#737373',
                lineHeight: 'var(--line-height-ui)'
              }}>
                Agrega imágenes atractivas y una descripción completa de la parcela
              </p>
            </div>

            <div className="space-y-6">
              {/* Imagen principal */}
              <div>
                <label 
                  className="block mb-2"
                  style={{
                    fontFamily: 'var(--font-body)',
                    fontSize: 'var(--font-size-body-sm)',
                    fontWeight: 'var(--font-weight-medium)',
                    color: '#0A0A0A',
                    lineHeight: 'var(--line-height-ui)'
                  }}
                >
                  Imagen principal <span style={{ color: '#DC2626' }}>*</span>
                </label>
                {imagePreview ? (
                  <div className="relative w-full h-64 rounded-lg overflow-hidden" style={{ border: '1px solid #DEDEDE' }}>
                    <img src={imagePreview} alt="Preview" className="w-full h-full object-cover" />
                    <button
                      onClick={() => {
                        setFormData({ ...formData, mainImage: null });
                        setImagePreview('');
                      }}
                      className="absolute top-2 right-2 p-2 rounded-full transition-colors"
                      style={{ backgroundColor: 'rgba(0,0,0,0.5)' }}
                      onMouseEnter={(e) => { e.currentTarget.style.backgroundColor = 'rgba(0,0,0,0.7)'; }}
                      onMouseLeave={(e) => { e.currentTarget.style.backgroundColor = 'rgba(0,0,0,0.5)'; }}
                    >
                      <X className="w-4 h-4" style={{ color: '#FFFFFF' }} />
                    </button>
                  </div>
                ) : (
                  <label className="w-full h-64 flex flex-col items-center justify-center rounded-lg cursor-pointer transition-colors"
                    style={{ border: '2px dashed #DEDEDE', backgroundColor: '#FAFAFA' }}
                    onMouseEnter={(e) => { e.currentTarget.style.backgroundColor = '#F5F5F5'; }}
                    onMouseLeave={(e) => { e.currentTarget.style.backgroundColor = '#FAFAFA'; }}
                  >
                    <Upload className="w-12 h-12 mb-4" style={{ color: '#A3A3A3' }} />
                    <p style={{
                      fontFamily: 'var(--font-body)',
                      fontSize: 'var(--font-size-body-sm)',
                      fontWeight: 'var(--font-weight-medium)',
                      color: '#0A0A0A',
                      lineHeight: 'var(--line-height-ui)'
                    }}>
                      Click para subir imagen principal
                    </p>
                    <p style={{
                      fontFamily: 'var(--font-body)',
                      fontSize: 'var(--font-size-xs)',
                      color: '#737373',
                      lineHeight: 'var(--line-height-ui)',
                      marginTop: '4px'
                    }}>
                      JPG, PNG o WEBP (máx. 10MB)
                    </p>
                    <input
                      type="file"
                      accept="image/*"
                      onChange={handleMainImageUpload}
                      className="hidden"
                    />
                  </label>
                )}
              </div>

              {/* Galería de imágenes */}
              <div>
                <label 
                  className="block mb-2"
                  style={{
                    fontFamily: 'var(--font-body)',
                    fontSize: 'var(--font-size-body-sm)',
                    fontWeight: 'var(--font-weight-medium)',
                    color: '#0A0A0A',
                    lineHeight: 'var(--line-height-ui)'
                  }}
                >
                  Galería de imágenes
                </label>
                <div className="grid grid-cols-3 gap-4">
                  {galleryPreviews.map((preview, index) => (
                    <div key={index} className="relative aspect-square rounded-lg overflow-hidden" style={{ border: '1px solid #DEDEDE' }}>
                      <img src={preview} alt={`Gallery ${index + 1}`} className="w-full h-full object-cover" />
                      <button
                        onClick={() => removeGalleryImage(index)}
                        className="absolute top-2 right-2 p-1.5 rounded-full transition-colors"
                        style={{ backgroundColor: 'rgba(0,0,0,0.5)' }}
                        onMouseEnter={(e) => { e.currentTarget.style.backgroundColor = 'rgba(0,0,0,0.7)'; }}
                        onMouseLeave={(e) => { e.currentTarget.style.backgroundColor = 'rgba(0,0,0,0.5)'; }}
                      >
                        <X className="w-3.5 h-3.5" style={{ color: '#FFFFFF' }} />
                      </button>
                    </div>
                  ))}
                  {galleryPreviews.length < 9 && (
                    <label className="aspect-square flex flex-col items-center justify-center rounded-lg cursor-pointer transition-colors"
                      style={{ border: '2px dashed #DEDEDE', backgroundColor: '#FAFAFA' }}
                      onMouseEnter={(e) => { e.currentTarget.style.backgroundColor = '#F5F5F5'; }}
                      onMouseLeave={(e) => { e.currentTarget.style.backgroundColor = '#FAFAFA'; }}
                    >
                      <Upload className="w-8 h-8 mb-2" style={{ color: '#A3A3A3' }} />
                      <p style={{
                        fontFamily: 'var(--font-body)',
                        fontSize: 'var(--font-size-xs)',
                        color: '#737373',
                        lineHeight: 'var(--line-height-ui)',
                        textAlign: 'center'
                      }}>
                        Agregar<br />imagen
                      </p>
                      <input
                        type="file"
                        accept="image/*"
                        multiple
                        onChange={handleGalleryUpload}
                        className="hidden"
                      />
                    </label>
                  )}
                </div>
                <p style={{
                  fontFamily: 'var(--font-body)',
                  fontSize: 'var(--font-size-xs)',
                  color: '#737373',
                  lineHeight: 'var(--line-height-ui)',
                  marginTop: '8px'
                }}>
                  Puedes agregar hasta 9 imágenes adicionales
                </p>
              </div>

              {/* Descripción */}
              <div>
                <label 
                  className="block mb-2"
                  style={{
                    fontFamily: 'var(--font-body)',
                    fontSize: 'var(--font-size-body-sm)',
                    fontWeight: 'var(--font-weight-medium)',
                    color: '#0A0A0A',
                    lineHeight: 'var(--line-height-ui)'
                  }}
                >
                  Descripción de la parcela <span style={{ color: '#DC2626' }}>*</span>
                </label>
                <textarea
                  value={formData.description}
                  onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                  placeholder="Describe las características principales, el entorno, accesos, servicios cercanos, etc."
                  rows={8}
                  className="w-full px-4 py-3 rounded-lg transition-all resize-none"
                  style={{
                    border: '1px solid #DEDEDE',
                    fontFamily: 'var(--font-body)',
                    fontSize: 'var(--font-size-body-sm)',
                    color: '#0A0A0A',
                    lineHeight: 'var(--line-height-ui)'
                  }}
                  onFocus={(e) => { e.currentTarget.style.borderColor = '#0A0A0A'; }}
                  onBlur={(e) => { e.currentTarget.style.borderColor = '#DEDEDE'; }}
                />
              </div>

              {/* Documentos */}
              <div>
                <label 
                  className="block mb-2"
                  style={{
                    fontFamily: 'var(--font-body)',
                    fontSize: 'var(--font-size-body-sm)',
                    fontWeight: 'var(--font-weight-medium)',
                    color: '#0A0A0A',
                    lineHeight: 'var(--line-height-ui)'
                  }}
                >
                  Documentos (opcional)
                </label>

                {/* Lista de documentos cargados */}
                {documentPreviews.length > 0 && (
                  <div className="space-y-2 mb-3">
                    {documentPreviews.map((doc, index) => (
                      <div 
                        key={index}
                        className="flex items-center justify-between px-4 py-3 rounded-lg"
                        style={{ border: '1px solid #DEDEDE', backgroundColor: '#FAFAFA' }}
                      >
                        <div className="flex items-center gap-3">
                          <FileText className="w-5 h-5" style={{ color: '#737373' }} />
                          <span style={{
                            fontFamily: 'var(--font-body)',
                            fontSize: 'var(--font-size-body-sm)',
                            color: '#0A0A0A',
                            lineHeight: 'var(--line-height-ui)'
                          }}>
                            {doc.name}
                          </span>
                        </div>
                        <button
                          onClick={() => removeDocument(index)}
                          className="p-1.5 rounded transition-colors"
                          style={{ color: '#737373' }}
                          onMouseEnter={(e) => { 
                            e.currentTarget.style.backgroundColor = '#FEE2E2';
                            e.currentTarget.style.color = '#DC2626';
                          }}
                          onMouseLeave={(e) => { 
                            e.currentTarget.style.backgroundColor = 'transparent';
                            e.currentTarget.style.color = '#737373';
                          }}
                        >
                          <X className="w-4 h-4" />
                        </button>
                      </div>
                    ))}
                  </div>
                )}

                {/* Botón para agregar documentos */}
                <label className="flex items-center justify-center gap-2 px-4 py-3 rounded-lg cursor-pointer transition-colors"
                  style={{ border: '2px dashed #DEDEDE', backgroundColor: '#FAFAFA' }}
                  onMouseEnter={(e) => { e.currentTarget.style.backgroundColor = '#F5F5F5'; }}
                  onMouseLeave={(e) => { e.currentTarget.style.backgroundColor = '#FAFAFA'; }}
                >
                  <Plus className="w-5 h-5" style={{ color: '#737373' }} />
                  <span style={{
                    fontFamily: 'var(--font-body)',
                    fontSize: 'var(--font-size-body-sm)',
                    fontWeight: 'var(--font-weight-medium)',
                    color: '#0A0A0A',
                    lineHeight: 'var(--line-height-ui)'
                  }}>
                    Agregar documento PDF
                  </span>
                  <input
                    type="file"
                    accept=".pdf"
                    multiple
                    onChange={handleDocumentUpload}
                    className="hidden"
                  />
                </label>
                <p style={{
                  fontFamily: 'var(--font-body)',
                  fontSize: 'var(--font-size-xs)',
                  color: '#737373',
                  lineHeight: 'var(--line-height-ui)',
                  marginTop: '8px'
                }}>
                  Puedes agregar brochures, planos, certificados, etc. (máx. 10MB por archivo)
                </p>
              </div>
            </div>
          </div>
        )}

        {/* Paso 4: Stock y disponibilidad */}
        {currentStep === 4 && (
          <div className="space-y-8">
            <div>
              <h2 style={{
                fontFamily: 'var(--font-heading)',
                fontSize: 'var(--font-size-h2)',
                fontWeight: 'var(--font-weight-semibold)',
                color: '#0A0A0A',
                lineHeight: 'var(--line-height-heading)',
                marginBottom: '8px'
              }}>
                Stock y disponibilidad
              </h2>
              <p style={{
                fontFamily: 'var(--font-body)',
                fontSize: 'var(--font-size-body-sm)',
                color: '#737373',
                lineHeight: 'var(--line-height-ui)'
              }}>
                Agrega múltiples parcelas o unidades si tu publicación incluye más de una
              </p>
            </div>

            <div className="p-6 rounded-xl" style={{ border: '1px solid #DEDEDE', backgroundColor: '#FAFAFA' }}>
              <div className="flex items-center justify-between mb-4">
                <p style={{
                  fontFamily: 'var(--font-body)',
                  fontSize: 'var(--font-size-body-sm)',
                  color: '#0A0A0A',
                  lineHeight: 'var(--line-height-ui)'
                }}>
                  {formData.stockUnits.length === 0 
                    ? 'No hay unidades agregadas. Esta publicación tendrá una sola parcela.' 
                    : `${formData.stockUnits.length} unidad${formData.stockUnits.length > 1 ? 'es' : ''} agregada${formData.stockUnits.length > 1 ? 's' : ''}`
                  }
                </p>
                <button
                  onClick={() => setShowAddUnitForm(true)}
                  className="flex items-center gap-2 px-4 py-2 rounded-lg transition-colors"
                  style={{
                    backgroundColor: '#111',
                    color: '#FFFFFF',
                    fontFamily: 'var(--font-body)',
                    fontSize: 'var(--font-size-body-sm)',
                    fontWeight: 'var(--font-weight-medium)',
                    lineHeight: 'var(--line-height-ui)'
                  }}
                  onMouseEnter={(e) => { e.currentTarget.style.backgroundColor = '#303030'; }}
                  onMouseLeave={(e) => { e.currentTarget.style.backgroundColor = '#111'; }}
                >
                  <Plus className="w-4 h-4" />
                  Agregar unidad
                </button>
              </div>

              {/* Tabla de unidades */}
              {formData.stockUnits.length > 0 && (
                <div className="rounded-lg overflow-hidden" style={{ border: '1px solid #DEDEDE' }}>
                  <table className="w-full">
                    <thead style={{ backgroundColor: '#F5F5F5' }}>
                      <tr>
                        <th className="px-4 py-3 text-left" style={{
                          fontFamily: 'var(--font-body)',
                          fontSize: 'var(--font-size-xs)',
                          fontWeight: 'var(--font-weight-medium)',
                          color: '#737373',
                          lineHeight: 'var(--line-height-ui)'
                        }}>
                          Código/Nombre
                        </th>
                        <th className="px-4 py-3 text-left" style={{
                          fontFamily: 'var(--font-body)',
                          fontSize: 'var(--font-size-xs)',
                          fontWeight: 'var(--font-weight-medium)',
                          color: '#737373',
                          lineHeight: 'var(--line-height-ui)'
                        }}>
                          Superficie
                        </th>
                        <th className="px-4 py-3 text-left" style={{
                          fontFamily: 'var(--font-body)',
                          fontSize: 'var(--font-size-xs)',
                          fontWeight: 'var(--font-weight-medium)',
                          color: '#737373',
                          lineHeight: 'var(--line-height-ui)'
                        }}>
                          Precio
                        </th>
                        <th className="px-4 py-3 text-left" style={{
                          fontFamily: 'var(--font-body)',
                          fontSize: 'var(--font-size-xs)',
                          fontWeight: 'var(--font-weight-medium)',
                          color: '#737373',
                          lineHeight: 'var(--line-height-ui)'
                        }}>
                          Estado
                        </th>
                        <th className="px-4 py-3 text-right" style={{
                          fontFamily: 'var(--font-body)',
                          fontSize: 'var(--font-size-xs)',
                          fontWeight: 'var(--font-weight-medium)',
                          color: '#737373',
                          lineHeight: 'var(--line-height-ui)'
                        }}>
                          Acciones
                        </th>
                      </tr>
                    </thead>
                    <tbody style={{ backgroundColor: '#FFFFFF' }}>
                      {formData.stockUnits.map((unit) => (
                        <tr key={unit.id} style={{ borderTop: '1px solid #DEDEDE' }}>
                          <td className="px-4 py-3" style={{
                            fontFamily: 'var(--font-body)',
                            fontSize: 'var(--font-size-body-sm)',
                            color: '#0A0A0A',
                            lineHeight: 'var(--line-height-ui)'
                          }}>
                            {unit.code}
                          </td>
                          <td className="px-4 py-3" style={{
                            fontFamily: 'var(--font-body)',
                            fontSize: 'var(--font-size-body-sm)',
                            color: '#0A0A0A',
                            lineHeight: 'var(--line-height-ui)'
                          }}>
                            {unit.surface} m²
                          </td>
                          <td className="px-4 py-3" style={{
                            fontFamily: 'var(--font-body)',
                            fontSize: 'var(--font-size-body-sm)',
                            color: '#0A0A0A',
                            lineHeight: 'var(--line-height-ui)'
                          }}>
                            ${parseInt(unit.price).toLocaleString('es-CL')}
                          </td>
                          <td className="px-4 py-3">
                            <span className="px-2 py-1 rounded" style={{
                              fontFamily: 'var(--font-body)',
                              fontSize: 'var(--font-size-xs)',
                              fontWeight: 'var(--font-weight-medium)',
                              color: unit.status === 'available' ? '#166534' : unit.status === 'reserved' ? '#92400E' : '#991B1B',
                              backgroundColor: unit.status === 'available' ? '#DCFCE7' : unit.status === 'reserved' ? '#FEF3C7' : '#FEE2E2',
                              lineHeight: 'var(--line-height-ui)'
                            }}>
                              {unit.status === 'available' ? 'Disponible' : unit.status === 'reserved' ? 'Reservada' : 'Vendida'}
                            </span>
                          </td>
                          <td className="px-4 py-3 text-right">
                            <div className="flex items-center justify-end gap-2">
                              <button
                                onClick={() => setEditingUnit(unit)}
                                className="p-2 rounded transition-colors"
                                style={{ color: '#737373' }}
                                onMouseEnter={(e) => { e.currentTarget.style.backgroundColor = '#F5F5F5'; }}
                                onMouseLeave={(e) => { e.currentTarget.style.backgroundColor = 'transparent'; }}
                              >
                                <Edit2 className="w-4 h-4" />
                              </button>
                              <button
                                onClick={() => handleDeleteStockUnit(unit.id)}
                                className="p-2 rounded transition-colors"
                                style={{ color: '#DC2626' }}
                                onMouseEnter={(e) => { e.currentTarget.style.backgroundColor = '#FEF2F2'; }}
                                onMouseLeave={(e) => { e.currentTarget.style.backgroundColor = 'transparent'; }}
                              >
                                <Trash2 className="w-4 h-4" />
                              </button>
                            </div>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              )}
            </div>

            {/* Modal para agregar/editar unidad */}
            {(showAddUnitForm || editingUnit) && (
              <StockUnitForm
                unit={editingUnit}
                onSave={(unit) => {
                  if (editingUnit) {
                    handleUpdateStockUnit(editingUnit.id, unit);
                  } else {
                    handleAddStockUnit(unit);
                  }
                }}
                onCancel={() => {
                  setShowAddUnitForm(false);
                  setEditingUnit(null);
                }}
              />
            )}
          </div>
        )}

        {/* Paso 5: Revisión y publicación */}
        {currentStep === 5 && (
          <div className="space-y-8">
            <div>
              <h2 style={{
                fontFamily: 'var(--font-heading)',
                fontSize: 'var(--font-size-h2)',
                fontWeight: 'var(--font-weight-semibold)',
                color: '#0A0A0A',
                lineHeight: 'var(--line-height-heading)',
                marginBottom: '8px'
              }}>
                Revisión y publicación
              </h2>
              <p style={{
                fontFamily: 'var(--font-body)',
                fontSize: 'var(--font-size-body-sm)',
                color: '#737373',
                lineHeight: 'var(--line-height-ui)'
              }}>
                Revisa la información antes de publicar
              </p>
            </div>

            {/* Alerta de campos faltantes */}
            {!canPublish && validationErrors.length > 0 && (
              <div className="p-4 rounded-lg flex gap-3" style={{ backgroundColor: '#FEF2F2', border: '1px solid #FCA5A5' }}>
                <AlertCircle className="w-5 h-5 flex-shrink-0" style={{ color: '#DC2626' }} />
                <div>
                  <p style={{
                    fontFamily: 'var(--font-body)',
                    fontSize: 'var(--font-size-body-sm)',
                    fontWeight: 'var(--font-weight-medium)',
                    color: '#991B1B',
                    lineHeight: 'var(--line-height-ui)',
                    marginBottom: '4px'
                  }}>
                    Faltan campos obligatorios para publicar:
                  </p>
                  <ul className="list-disc list-inside space-y-1">
                    {validationErrors.map((error, index) => (
                      <li key={index} style={{
                        fontFamily: 'var(--font-body)',
                        fontSize: 'var(--font-size-body-sm)',
                        color: '#991B1B',
                        lineHeight: 'var(--line-height-ui)'
                      }}>
                        {error}
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            )}

            {/* Resumen de la publicación */}
            <div className="p-6 rounded-lg space-y-4" style={{ border: '1px solid #DEDEDE', backgroundColor: '#FAFAFA' }}>
              <h3 style={{
                fontFamily: 'var(--font-heading)',
                fontSize: 'var(--font-size-h4)',
                fontWeight: 'var(--font-weight-semibold)',
                color: '#0A0A0A',
                lineHeight: 'var(--line-height-heading)'
              }}>
                Resumen de la publicación
              </h3>
              
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <p style={{
                    fontFamily: 'var(--font-body)',
                    fontSize: 'var(--font-size-xs)',
                    color: '#737373',
                    lineHeight: 'var(--line-height-ui)'
                  }}>
                    Título
                  </p>
                  <p style={{
                    fontFamily: 'var(--font-body)',
                    fontSize: 'var(--font-size-body-sm)',
                    fontWeight: 'var(--font-weight-medium)',
                    color: '#0A0A0A',
                    lineHeight: 'var(--line-height-ui)'
                  }}>
                    {formData.title || '-'}
                  </p>
                </div>
                <div>
                  <p style={{
                    fontFamily: 'var(--font-body)',
                    fontSize: 'var(--font-size-xs)',
                    color: '#737373',
                    lineHeight: 'var(--line-height-ui)'
                  }}>
                    Precio
                  </p>
                  <p style={{
                    fontFamily: 'var(--font-body)',
                    fontSize: 'var(--font-size-body-sm)',
                    fontWeight: 'var(--font-weight-medium)',
                    color: '#0A0A0A',
                    lineHeight: 'var(--line-height-ui)'
                  }}>
                    {formData.price ? `$${parseInt(formData.price).toLocaleString('es-CL')}` : '-'}
                  </p>
                </div>
                <div>
                  <p style={{
                    fontFamily: 'var(--font-body)',
                    fontSize: 'var(--font-size-xs)',
                    color: '#737373',
                    lineHeight: 'var(--line-height-ui)'
                  }}>
                    Superficie
                  </p>
                  <p style={{
                    fontFamily: 'var(--font-body)',
                    fontSize: 'var(--font-size-body-sm)',
                    fontWeight: 'var(--font-weight-medium)',
                    color: '#0A0A0A',
                    lineHeight: 'var(--line-height-ui)'
                  }}>
                    {formData.surface ? `${formData.surface} m²` : '-'}
                  </p>
                </div>
                <div>
                  <p style={{
                    fontFamily: 'var(--font-body)',
                    fontSize: 'var(--font-size-xs)',
                    color: '#737373',
                    lineHeight: 'var(--line-height-ui)'
                  }}>
                    Ubicación
                  </p>
                  <p style={{
                    fontFamily: 'var(--font-body)',
                    fontSize: 'var(--font-size-body-sm)',
                    fontWeight: 'var(--font-weight-medium)',
                    color: '#0A0A0A',
                    lineHeight: 'var(--line-height-ui)'
                  }}>
                    {formData.comuna && formData.region ? `${formData.comuna}, ${formData.region}` : '-'}
                  </p>
                </div>
              </div>

              {formData.stockUnits.length > 0 && (
                <div>
                  <p style={{
                    fontFamily: 'var(--font-body)',
                    fontSize: 'var(--font-size-xs)',
                    color: '#737373',
                    lineHeight: 'var(--line-height-ui)',
                    marginBottom: '8px'
                  }}>
                    Unidades en stock
                  </p>
                  <p style={{
                    fontFamily: 'var(--font-body)',
                    fontSize: 'var(--font-size-body-sm)',
                    fontWeight: 'var(--font-weight-medium)',
                    color: '#0A0A0A',
                    lineHeight: 'var(--line-height-ui)'
                  }}>
                    {formData.stockUnits.length} unidad{formData.stockUnits.length > 1 ? 'es' : ''} agregada{formData.stockUnits.length > 1 ? 's' : ''}
                  </p>
                </div>
              )}

              {formData.mainImage && (
                <div>
                  <p style={{
                    fontFamily: 'var(--font-body)',
                    fontSize: 'var(--font-size-xs)',
                    color: '#737373',
                    lineHeight: 'var(--line-height-ui)',
                    marginBottom: '8px'
                  }}>
                    Imagen principal
                  </p>
                  <div className="w-full h-48 rounded-lg overflow-hidden" style={{ border: '1px solid #DEDEDE' }}>
                    <img src={imagePreview} alt="Preview" className="w-full h-full object-cover" />
                  </div>
                </div>
              )}

              {formData.description && (
                <div>
                  <p style={{
                    fontFamily: 'var(--font-body)',
                    fontSize: 'var(--font-size-xs)',
                    color: '#737373',
                    lineHeight: 'var(--line-height-ui)',
                    marginBottom: '4px'
                  }}>
                    Descripción
                  </p>
                  <p style={{
                    fontFamily: 'var(--font-body)',
                    fontSize: 'var(--font-size-body-sm)',
                    color: '#0A0A0A',
                    lineHeight: 'var(--line-height-ui)'
                  }}>
                    {formData.description.substring(0, 200)}{formData.description.length > 200 ? '...' : ''}
                  </p>
                </div>
              )}
            </div>
          </div>
        )}

        {/* Navigation Buttons */}
        <div className="flex justify-between pt-8" style={{ borderTop: '1px solid #DEDEDE' }}>
          <button
            onClick={handleBack}
            disabled={currentStep === 1}
            className="flex items-center gap-2 px-5 py-2.5 rounded-full transition-all"
            style={{
              border: '1px solid #DEDEDE',
              backgroundColor: '#FFFFFF',
              color: currentStep === 1 ? '#A3A3A3' : '#0A0A0A',
              fontFamily: 'var(--font-body)',
              fontSize: 'var(--font-size-body-sm)',
              fontWeight: 'var(--font-weight-medium)',
              lineHeight: 'var(--line-height-ui)',
              cursor: currentStep === 1 ? 'not-allowed' : 'pointer'
            }}
            onMouseEnter={(e) => { 
              if (currentStep !== 1) e.currentTarget.style.backgroundColor = '#F5F5F5'; 
            }}
            onMouseLeave={(e) => { 
              if (currentStep !== 1) e.currentTarget.style.backgroundColor = '#FFFFFF'; 
            }}
          >
            <ChevronLeft className="w-4 h-4" />
            Anterior
          </button>

          {currentStep < 5 ? (
            <button
              onClick={handleNext}
              className="flex items-center gap-2 px-5 py-2.5 rounded-full transition-all"
              style={{
                backgroundColor: '#111',
                color: '#FFFFFF',
                fontFamily: 'var(--font-body)',
                fontSize: 'var(--font-size-body-sm)',
                fontWeight: 'var(--font-weight-medium)',
                letterSpacing: 'var(--letter-spacing-wide)',
                lineHeight: 'var(--line-height-ui)'
              }}
              onMouseEnter={(e) => { e.currentTarget.style.backgroundColor = '#303030'; }}
              onMouseLeave={(e) => { e.currentTarget.style.backgroundColor = '#111'; }}
            >
              Siguiente
              <ChevronRight className="w-4 h-4" />
            </button>
          ) : (
            <button
              onClick={handlePublish}
              disabled={!canPublish}
              className="flex items-center gap-2 px-5 py-2.5 rounded-full transition-all"
              style={{
                backgroundColor: canPublish ? '#111' : '#F5F5F5',
                color: canPublish ? '#FFFFFF' : '#A3A3A3',
                fontFamily: 'var(--font-body)',
                fontSize: 'var(--font-size-body-sm)',
                fontWeight: 'var(--font-weight-medium)',
                letterSpacing: 'var(--letter-spacing-wide)',
                lineHeight: 'var(--line-height-ui)',
                cursor: canPublish ? 'pointer' : 'not-allowed'
              }}
              onMouseEnter={(e) => { 
                if (canPublish) e.currentTarget.style.backgroundColor = '#303030'; 
              }}
              onMouseLeave={(e) => { 
                if (canPublish) e.currentTarget.style.backgroundColor = '#111'; 
              }}
            >
              <Check className="w-4 h-4" />
              {mode === 'edit' && initialData?.status !== 'draft' ? 'Guardar cambios' : 'Publicar'}
            </button>
          )}
        </div>
      </div>

      {/* Asistente Virtual - Apoyo discreto en flujo de publicación */}
      <VambeChat context="publicar-parcela" subtle />
    </div>
  );
}

// Componente para formulario de agregar/editar unidad de stock
interface StockUnitFormProps {
  unit: StockUnit | null;
  onSave: (unit: Omit<StockUnit, 'id'>) => void;
  onCancel: () => void;
}

function StockUnitForm({ unit, onSave, onCancel }: StockUnitFormProps) {
  const [formData, setFormData] = useState({
    code: unit?.code || '',
    surface: unit?.surface || '',
    price: unit?.price || '',
    status: (unit?.status || 'available') as 'available' | 'reserved' | 'sold',
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (formData.code && formData.surface && formData.price) {
      onSave(formData);
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center" style={{ backgroundColor: 'rgba(0, 0, 0, 0.5)' }}>
      <div className="w-full max-w-md p-6 rounded-xl" style={{ backgroundColor: '#FFFFFF', border: '1px solid #DEDEDE' }}>
        <h3 style={{
          fontFamily: 'var(--font-heading)',
          fontSize: 'var(--font-size-h4)',
          fontWeight: 'var(--font-weight-semibold)',
          color: '#0A0A0A',
          lineHeight: 'var(--line-height-heading)',
          marginBottom: '16px'
        }}>
          {unit ? 'Editar unidad' : 'Agregar unidad'}
        </h3>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label 
              className="block mb-2"
              style={{
                fontFamily: 'var(--font-body)',
                fontSize: 'var(--font-size-body-sm)',
                fontWeight: 'var(--font-weight-medium)',
                color: '#0A0A0A',
                lineHeight: 'var(--line-height-ui)'
              }}
            >
              Código o nombre
            </label>
            <input
              type="text"
              value={formData.code}
              onChange={(e) => setFormData({ ...formData, code: e.target.value })}
              placeholder="Ej: Lote A-1"
              className="w-full px-4 py-3 rounded-lg transition-all"
              style={{
                border: '1px solid #DEDEDE',
                fontFamily: 'var(--font-body)',
                fontSize: 'var(--font-size-body-sm)',
                color: '#0A0A0A',
                lineHeight: 'var(--line-height-ui)'
              }}
              required
            />
          </div>

          <div>
            <label 
              className="block mb-2"
              style={{
                fontFamily: 'var(--font-body)',
                fontSize: 'var(--font-size-body-sm)',
                fontWeight: 'var(--font-weight-medium)',
                color: '#0A0A0A',
                lineHeight: 'var(--line-height-ui)'
              }}
            >
              Superficie (m²)
            </label>
            <input
              type="text"
              value={formData.surface}
              onChange={(e) => setFormData({ ...formData, surface: e.target.value })}
              placeholder="Ej: 5000"
              className="w-full px-4 py-3 rounded-lg transition-all"
              style={{
                border: '1px solid #DEDEDE',
                fontFamily: 'var(--font-body)',
                fontSize: 'var(--font-size-body-sm)',
                color: '#0A0A0A',
                lineHeight: 'var(--line-height-ui)'
              }}
              required
            />
          </div>

          <div>
            <label 
              className="block mb-2"
              style={{
                fontFamily: 'var(--font-body)',
                fontSize: 'var(--font-size-body-sm)',
                fontWeight: 'var(--font-weight-medium)',
                color: '#0A0A0A',
                lineHeight: 'var(--line-height-ui)'
              }}
            >
              Precio (CLP)
            </label>
            <input
              type="text"
              value={formData.price}
              onChange={(e) => setFormData({ ...formData, price: e.target.value })}
              placeholder="Ej: 120000000"
              className="w-full px-4 py-3 rounded-lg transition-all"
              style={{
                border: '1px solid #DEDEDE',
                fontFamily: 'var(--font-body)',
                fontSize: 'var(--font-size-body-sm)',
                color: '#0A0A0A',
                lineHeight: 'var(--line-height-ui)'
              }}
              required
            />
          </div>

          <div>
            <label 
              className="block mb-2"
              style={{
                fontFamily: 'var(--font-body)',
                fontSize: 'var(--font-size-body-sm)',
                fontWeight: 'var(--font-weight-medium)',
                color: '#0A0A0A',
                lineHeight: 'var(--line-height-ui)'
              }}
            >
              Estado
            </label>
            <select
              value={formData.status}
              onChange={(e) => setFormData({ ...formData, status: e.target.value as 'available' | 'reserved' | 'sold' })}
              className="w-full px-4 py-3 rounded-lg transition-all"
              style={{
                border: '1px solid #DEDEDE',
                fontFamily: 'var(--font-body)',
                fontSize: 'var(--font-size-body-sm)',
                color: '#0A0A0A',
                lineHeight: 'var(--line-height-ui)'
              }}
            >
              <option value="available">Disponible</option>
              <option value="reserved">Reservada</option>
              <option value="sold">Vendida</option>
            </select>
          </div>

          <div className="flex gap-3 pt-4">
            <button
              type="button"
              onClick={onCancel}
              className="flex-1 px-4 py-2.5 rounded-lg transition-colors"
              style={{
                border: '1px solid #DEDEDE',
                backgroundColor: '#FFFFFF',
                color: '#0A0A0A',
                fontFamily: 'var(--font-body)',
                fontSize: 'var(--font-size-body-sm)',
                fontWeight: 'var(--font-weight-medium)',
                lineHeight: 'var(--line-height-ui)'
              }}
            >
              Cancelar
            </button>
            <button
              type="submit"
              className="flex-1 px-4 py-2.5 rounded-lg transition-colors"
              style={{
                backgroundColor: '#111',
                color: '#FFFFFF',
                fontFamily: 'var(--font-body)',
                fontSize: 'var(--font-size-body-sm)',
                fontWeight: 'var(--font-weight-medium)',
                lineHeight: 'var(--line-height-ui)'
              }}
            >
              {unit ? 'Guardar cambios' : 'Agregar'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
