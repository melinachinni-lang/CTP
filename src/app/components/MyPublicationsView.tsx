import React, { useState, useEffect } from 'react';
import { Plus, MoreVertical, Edit2, Share2, Trash2, Calendar, MapPin, Maximize2, Eye, Link as LinkIcon, Check, Copy, FileText, Building2, CheckCircle2, X, Pause, Play } from 'lucide-react';
import { PublicationWizard, PublicationData, PublicationStatus, StockUnit } from '@/app/components/PublicationWizard';
import { PublicacionPublicaView } from '@/app/components/PublicacionPublicaView';
import { NewListingFlow } from '@/app/components/NewListingFlow';
import { NewProjectFlow } from '@/app/components/NewProjectFlow';
import { AddProjectPlotsFlow } from '@/app/components/AddProjectPlotsFlow';

interface Publication extends PublicationData {
  id: string;
  lastEdited: string;
  views?: number;
  inquiries?: number;
}

interface MyPublicationsViewProps {
  userType: 'inmobiliaria' | 'broker' | 'vendedor_particular';
  userId: string;
  onNavigate?: (screen: string, id?: number) => void;
  onNavigateToSection?: (section: string) => void;
  autoOpenModal?: boolean | number;
}

export function MyPublicationsView({ userType, userId, onNavigate, onNavigateToSection, autoOpenModal = false }: MyPublicationsViewProps) {
  const [showWizard, setShowWizard] = useState(false);
  const [showTypeSelectionModal, setShowTypeSelectionModal] = useState(false);
  const [showListingFlow, setShowListingFlow] = useState(false);
  const [showProjectFlow, setShowProjectFlow] = useState(false);
  const [showAddPlotsFlow, setShowAddPlotsFlow] = useState(false);
  const [selectedProject, setSelectedProject] = useState<Publication | null>(null);
  const [editingPublication, setEditingPublication] = useState<Publication | undefined>();
  const [activeMenu, setActiveMenu] = useState<string | null>(null);
  const [showDeleteConfirm, setShowDeleteConfirm] = useState<string | null>(null);
  const [showShareModal, setShowShareModal] = useState<Publication | null>(null);
  const [viewingPublicPublication, setViewingPublicPublication] = useState<Publication | null>(null);
  const [linkCopied, setLinkCopied] = useState(false);
  const [filterStatus, setFilterStatus] = useState<'all' | PublicationStatus>('all');
  const [showSuccessModal, setShowSuccessModal] = useState(false);
  const [newlyPublishedId, setNewlyPublishedId] = useState<string | null>(null);
  const [successLinkCopied, setSuccessLinkCopied] = useState(false);
  const [publishedType, setPublishedType] = useState<'parcela' | 'proyecto'>('parcela');
  const [showPublicationLimitModal, setShowPublicationLimitModal] = useState(false);

  // Efecto para abrir el modal cuando cambia autoOpenModal
  useEffect(() => {
    if (autoOpenModal && autoOpenModal !== 0) {
      // Solo inmobiliarias ven el modal de selección, otros van directo a parcela individual
      if (userType === 'inmobiliaria') {
        setShowTypeSelectionModal(true);
      } else {
        setShowListingFlow(true);
      }
    }
  }, [autoOpenModal, userType]);

  // Mock data - datos de ejemplo (solo 1 parcela para dashboard personal)
  const [publications, setPublications] = useState<Publication[]>([
    {
      id: 'pub-1',
      status: 'published',
      publisherType: userType,
      publisherId: userId,
      title: 'Parcela Vista Cordillera con acceso pavimentado',
      lotNumber: 'Lote 23',
      surface: '12000',
      typology: 'residencial',
      price: '120000000',
      priceType: 'fixed',
      availability: 'available',
      region: 'Región Metropolitana',
      comuna: 'Lo Barnechea',
      sector: 'Camino El Alto',
      hasApprovedRole: true,
      readyForDeed: true,
      roadExecuted: true,
      hasGate: true,
      mainImage: 'https://images.unsplash.com/photo-1500382017468-9049fed747ef?w=800',
      galleryImages: [],
      description: 'Hermosa parcela con vista panorámica a la cordillera.',
      documents: [],
      stockUnits: [],
      lastEdited: '2025-03-15',
      views: 234,
      inquiries: 12,
    },
  ]);

  const handleNewPublication = () => {
    // Verificar si ya tiene una publicación ACTIVA (status 'published') - límite para vendedor_particular
    if (userType === 'vendedor_particular') {
      const hasActivePublication = publications.some(pub => pub.status === 'published');
      if (hasActivePublication) {
        setShowPublicationLimitModal(true);
        return;
      }
    }
    
    // Solo inmobiliarias ven el modal de selección, otros van directo a parcela individual
    if (userType === 'inmobiliaria') {
      setShowTypeSelectionModal(true);
    } else {
      setShowListingFlow(true);
    }
  };

  const handlePublishListing = () => {
    setShowListingFlow(false);
    const isProject = showProjectFlow;
    setShowProjectFlow(false);
    setPublishedType(isProject ? 'proyecto' : 'parcela');
    
    // Crear nueva publicación de ejemplo
    const newPublicationId = `pub-new-${Date.now()}`;
    const newPublication: Publication = {
      id: newPublicationId,
      status: 'published',
      publisherType: userType,
      publisherId: userId,
      title: 'Parcela Vista Cordillera con acceso pavimentado',
      lotNumber: 'Lote 45',
      surface: '8500',
      typology: 'residencial',
      price: '75000000',
      location: 'Cajón del Maipo, Región Metropolitana',
      images: ['https://images.unsplash.com/photo-1500382017468-9049fed747ef?w=800&q=80'],
      description: 'Hermosa parcela con vista a la cordillera.',
      lastEdited: new Date().toISOString(),
      views: 0,
      inquiries: 0,
    };
    
    // Agregar a la lista de publicaciones
    setPublications(prev => [newPublication, ...prev]);
    
    // Abrir la vista pública y el modal de éxito
    setNewlyPublishedId(newPublicationId);
    setViewingPublicPublication(newPublication);
    setShowSuccessModal(true);
  };

  const handleShareWhatsApp = (publicationId: string) => {
    const url = `${window.location.origin}/publicacion/${publicationId}`;
    const text = encodeURIComponent('¡Mirá esta parcela que encontré en CompraTuParcela!');
    window.open(`https://wa.me/?text=${text}%20${encodeURIComponent(url)}`, '_blank');
  };

  const handleShareFacebook = (publicationId: string) => {
    const url = `${window.location.origin}/publicacion/${publicationId}`;
    window.open(`https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(url)}`, '_blank');
  };

  const handleShareInstagram = () => {
    // Instagram no permite compartir links directamente desde web
    // Copiamos el link y mostramos un mensaje
    alert('El enlace ha sido copiado. Podés pegarlo en tu historia o publicación de Instagram.');
  };

  const handleCopySuccessLink = (publicationId: string) => {
    const url = `${window.location.origin}/publicacion/${publicationId}`;
    navigator.clipboard.writeText(url);
    setSuccessLinkCopied(true);
    setTimeout(() => setSuccessLinkCopied(false), 2000);
  };

  const handleAddPlotsToProject = (project: Publication) => {
    setSelectedProject(project);
    setShowAddPlotsFlow(true);
  };

  const handleSavePlots = (plots: StockUnit[]) => {
    if (selectedProject) {
      setPublications(publications.map(pub => 
        pub.id === selectedProject.id 
          ? { ...pub, stockUnits: [...pub.stockUnits, ...plots] }
          : pub
      ));
    }
    setShowAddPlotsFlow(false);
    setSelectedProject(null);
  };

  const handleEditPublication = (pub: Publication) => {
    setEditingPublication(pub);
    setShowWizard(true);
  };

  const handleSavePublication = (data: PublicationData, status: PublicationStatus) => {
    if (editingPublication) {
      // Actualizar publicación existente
      setPublications(publications.map(pub => 
        pub.id === editingPublication.id 
          ? { ...pub, ...data, status, lastEdited: new Date().toISOString().split('T')[0] }
          : pub
      ));
    } else {
      // Crear nueva publicación
      const newPub: Publication = {
        ...data,
        id: `pub-${Date.now()}`,
        lastEdited: new Date().toISOString().split('T')[0],
      };
      setPublications([newPub, ...publications]);
    }
    setShowWizard(false);
    setEditingPublication(undefined);
  };

  const handleDeletePublication = (id: string) => {
    setPublications(publications.filter(pub => pub.id !== id));
    setShowDeleteConfirm(null);
    setActiveMenu(null);
  };

  const handleTogglePublicationStatus = (id: string) => {
    setPublications(publications.map(pub => {
      if (pub.id === id) {
        const newStatus = pub.status === 'published' ? 'paused' : 'published';
        return { ...pub, status: newStatus, lastEdited: new Date().toISOString().split('T')[0] };
      }
      return pub;
    }));
    setActiveMenu(null);
  };

  const handleSharePublication = (pub: Publication) => {
    setShowShareModal(pub);
    setActiveMenu(null);
  };

  const handleViewPublicPublication = (pub: Publication) => {
    setViewingPublicPublication(pub);
    setActiveMenu(null);
  };

  const getStatusConfig = (status: PublicationStatus) => {
    const configs = {
      draft: {
        label: 'BORRADOR',
        bgColor: '#F5F5F5',
        textColor: '#737373',
        borderColor: '#DEDEDE',
      },
      published: {
        label: 'PUBLICADA',
        bgColor: '#DCFCE7',
        textColor: '#166534',
        borderColor: '#86EFAC',
      },
      paused: {
        label: 'PAUSADA',
        bgColor: '#FEF3C7',
        textColor: '#92400E',
        borderColor: '#FCD34D',
      },
      unpublished: {
        label: 'DESPUBLICADA',
        bgColor: '#FEE2E2',
        textColor: '#991B1B',
        borderColor: '#FCA5A5',
      },
    };
    return configs[status];
  };

  const getAvailabilityLabel = (availability: string) => {
    const labels = {
      available: 'Disponible',
      reserved: 'Reservada',
      sold: 'Vendida',
    };
    return labels[availability as keyof typeof labels] || availability;
  };

  const filteredPublications = filterStatus === 'all' 
    ? publications 
    : publications.filter(pub => pub.status === filterStatus);

  if (showWizard) {
    return (
      <PublicationWizard
        onClose={() => {
          setShowWizard(false);
          setEditingPublication(undefined);
        }}
        onSave={handleSavePublication}
        initialData={editingPublication}
        mode={editingPublication ? 'edit' : 'create'}
        publisherType={userType}
        publisherId={userId}
      />
    );
  }

  if (viewingPublicPublication) {
    return (
      <>
        <PublicacionPublicaView
          onClose={() => {
            setViewingPublicPublication(null);
            setShowSuccessModal(false);
            setNewlyPublishedId(null);
          }}
          publication={viewingPublicPublication}
        />
        
        {/* Modal de éxito de publicación */}
        {showSuccessModal && newlyPublishedId && (
          <div className="fixed inset-0 z-[60] flex items-center justify-center" style={{ backgroundColor: 'rgba(0, 0, 0, 0.5)' }}>
            <div className="w-full max-w-md p-8 rounded-xl bg-background mx-4" style={{ border: '1px solid var(--border)' }}>
              {/* Icono de éxito */}
              <div className="flex justify-center mb-6">
                <div className="w-16 h-16 rounded-full flex items-center justify-center" style={{ backgroundColor: '#E8F3E9' }}>
                  <CheckCircle2 className="w-10 h-10" style={{ color: '#647E3F' }} />
                </div>
              </div>
              
              {/* Título */}
              <h3 style={{
                fontFamily: 'var(--font-heading)',
                fontSize: 'var(--font-size-h3)',
                fontWeight: 'var(--font-weight-semibold)',
                color: '#0A0A0A',
                lineHeight: 'var(--line-height-heading)',
                marginBottom: '8px',
                textAlign: 'center'
              }}>
                ¡{publishedType === 'proyecto' ? 'Proyecto' : 'Parcela'} publicad{publishedType === 'proyecto' ? 'o' : 'a'} exitosamente!
              </h3>
              
              {/* Descripción */}
              <p style={{
                fontFamily: 'var(--font-body)',
                fontSize: 'var(--font-size-body-sm)',
                color: '#737373',
                lineHeight: 'var(--line-height-body)',
                marginBottom: '32px',
                textAlign: 'center'
              }}>
                Tu publicación ya está activa. Compartila para llegar a más interesados
              </p>
              
              {/* Botones de compartir */}
              <div className="space-y-3 mb-6">
                {/* WhatsApp */}
                <button
                  onClick={() => handleShareWhatsApp(newlyPublishedId)}
                  className="w-full flex items-center gap-3 px-4 py-3 transition-all rounded-lg"
                  style={{
                    backgroundColor: '#FFFFFF',
                    border: '1px solid #DEDEDE',
                    fontFamily: 'var(--font-body)',
                    fontSize: 'var(--font-size-body-sm)',
                    fontWeight: 'var(--font-weight-medium)',
                    color: '#0A0A0A',
                    lineHeight: 'var(--line-height-ui)'
                  }}
                  onMouseEnter={(e) => { e.currentTarget.style.backgroundColor = '#F5F9FA'; }}
                  onMouseLeave={(e) => { e.currentTarget.style.backgroundColor = '#FFFFFF'; }}
                >
                  <svg className="w-5 h-5" viewBox="0 0 24 24" fill="none">
                    <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347z" fill="#25D366"/>
                    <path d="M20.52 3.449C18.24 1.245 15.24 0 12.045 0 5.463 0 .104 5.334.101 11.893c0 2.096.548 4.14 1.588 5.945L0 24l6.335-1.652c1.746.943 3.71 1.444 5.71 1.447h.006c6.585 0 11.946-5.336 11.949-11.896 0-3.176-1.24-6.165-3.48-8.4zm-8.475 18.297c-1.775 0-3.513-.477-5.03-1.377l-.36-.214-3.742.977 1.002-3.63-.235-.373c-.99-1.568-1.512-3.383-1.512-5.247.003-5.447 4.467-9.88 9.954-9.88 2.66 0 5.16 1.031 7.043 2.905 1.883 1.874 2.922 4.363 2.919 7.014-.003 5.447-4.467 9.88-9.954 9.88z" fill="#25D366"/>
                  </svg>
                  <span>Compartir en WhatsApp</span>
                </button>
                
                {/* Facebook */}
                <button
                  onClick={() => handleShareFacebook(newlyPublishedId)}
                  className="w-full flex items-center gap-3 px-4 py-3 transition-all rounded-lg"
                  style={{
                    backgroundColor: '#FFFFFF',
                    border: '1px solid #DEDEDE',
                    fontFamily: 'var(--font-body)',
                    fontSize: 'var(--font-size-body-sm)',
                    fontWeight: 'var(--font-weight-medium)',
                    color: '#0A0A0A',
                    lineHeight: 'var(--line-height-ui)'
                  }}
                  onMouseEnter={(e) => { e.currentTarget.style.backgroundColor = '#F5F9FA'; }}
                  onMouseLeave={(e) => { e.currentTarget.style.backgroundColor = '#FFFFFF'; }}
                >
                  <svg className="w-5 h-5" viewBox="0 0 24 24" fill="none">
                    <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z" fill="#1877F2"/>
                  </svg>
                  <span>Compartir en Facebook</span>
                </button>
                
                {/* Instagram */}
                <button
                  onClick={() => {
                    handleCopySuccessLink(newlyPublishedId);
                    handleShareInstagram();
                  }}
                  className="w-full flex items-center gap-3 px-4 py-3 transition-all rounded-lg"
                  style={{
                    backgroundColor: '#FFFFFF',
                    border: '1px solid #DEDEDE',
                    fontFamily: 'var(--font-body)',
                    fontSize: 'var(--font-size-body-sm)',
                    fontWeight: 'var(--font-weight-medium)',
                    color: '#0A0A0A',
                    lineHeight: 'var(--line-height-ui)'
                  }}
                  onMouseEnter={(e) => { e.currentTarget.style.backgroundColor = '#F5F9FA'; }}
                  onMouseLeave={(e) => { e.currentTarget.style.backgroundColor = '#FFFFFF'; }}
                >
                  <svg className="w-5 h-5" viewBox="0 0 24 24" fill="none">
                    <defs>
                      <radialGradient id="instagram-gradient" cx="30%" cy="107%">
                        <stop offset="0%" stopColor="#fdf497" />
                        <stop offset="5%" stopColor="#fdf497" />
                        <stop offset="45%" stopColor="#fd5949" />
                        <stop offset="60%" stopColor="#d6249f" />
                        <stop offset="90%" stopColor="#285AEB" />
                      </radialGradient>
                    </defs>
                    <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zM12 0C8.741 0 8.333.014 7.053.072 2.695.272.273 2.69.073 7.052.014 8.333 0 8.741 0 12c0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98C8.333 23.986 8.741 24 12 24c3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98C15.668.014 15.259 0 12 0zm0 5.838a6.162 6.162 0 100 12.324 6.162 6.162 0 000-12.324zM12 16a4 4 0 110-8 4 4 0 010 8zm6.406-11.845a1.44 1.44 0 100 2.881 1.44 1.44 0 000-2.881z" fill="url(#instagram-gradient)"/>
                  </svg>
                  <span>Compartir en Instagram</span>
                </button>
                
                {/* Copiar enlace */}
                <button
                  onClick={() => handleCopySuccessLink(newlyPublishedId)}
                  className="w-full flex items-center gap-3 px-4 py-3 transition-all rounded-lg"
                  style={{
                    backgroundColor: '#FFFFFF',
                    border: '1px solid #DEDEDE',
                    fontFamily: 'var(--font-body)',
                    fontSize: 'var(--font-size-body-sm)',
                    fontWeight: 'var(--font-weight-medium)',
                    color: '#0A0A0A',
                    lineHeight: 'var(--line-height-ui)'
                  }}
                  onMouseEnter={(e) => { e.currentTarget.style.backgroundColor = '#F5F9FA'; }}
                  onMouseLeave={(e) => { e.currentTarget.style.backgroundColor = '#FFFFFF'; }}
                >
                  {successLinkCopied ? (
                    <>
                      <Check className="w-5 h-5" style={{ color: '#647E3F' }} />
                      <span>¡Enlace copiado!</span>
                    </>
                  ) : (
                    <>
                      <LinkIcon className="w-5 h-5" style={{ color: '#124854' }} />
                      <span>Copiar enlace</span>
                    </>
                  )}
                </button>
              </div>
              
              {/* Botón cerrar */}
              <button
                onClick={() => setShowSuccessModal(false)}
                className="w-full px-6 py-3 transition-all rounded-lg"
                style={{
                  backgroundColor: '#124854',
                  color: '#FFFFFF',
                  fontFamily: 'var(--font-body)',
                  fontSize: 'var(--font-size-body-sm)',
                  fontWeight: 'var(--font-weight-medium)',
                  letterSpacing: 'var(--letter-spacing-wide)',
                  lineHeight: 'var(--line-height-ui)',
                  border: 'none'
                }}
                onMouseEnter={(e) => { e.currentTarget.style.backgroundColor = '#0F3A42'; }}
                onMouseLeave={(e) => { e.currentTarget.style.backgroundColor = '#124854'; }}
              >
                Cerrar
              </button>
            </div>
          </div>
        )}
      </>
    );
  }

  return (
    <div className="min-h-screen bg-input-background">
      {/* Header */}
      <div className="px-6 py-6 space-y-6 bg-background" style={{ borderBottom: '1px solid var(--border)' }}>
        <div className="flex items-center justify-between">
          <div>
            <h2 className="text-foreground">
              Mis publicaciones
            </h2>
            <p style={{
              fontFamily: 'var(--font-body)',
              fontSize: 'var(--font-size-body-sm)',
              color: '#737373',
              lineHeight: 'var(--line-height-body)',
              marginTop: '4px'
            }}>
              Gestiona tus parcelas publicadas y borradores
            </p>
          </div>
          <button
            onClick={handleNewPublication}
            className="flex items-center gap-2 px-5 py-3 transition-all"
            style={{
              backgroundColor: '#124854',
              color: '#FFFFFF',
              borderRadius: '200px',
              fontFamily: 'var(--font-body)',
              fontSize: 'var(--font-size-body-sm)',
              fontWeight: 'var(--font-weight-medium)',
              letterSpacing: 'var(--letter-spacing-wide)',
              lineHeight: 'var(--line-height-ui)'
            }}
            onMouseEnter={(e) => { e.currentTarget.style.backgroundColor = '#0D3640'; }}
            onMouseLeave={(e) => { e.currentTarget.style.backgroundColor = '#124854'; }}
          >
            <Plus className="w-5 h-5" />
            Nueva publicación
          </button>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-4 gap-6">
          {/* Total publicaciones */}
          <div className="rounded-2xl p-6 flex flex-col" style={{ backgroundColor: '#FFFFFF', border: '1px solid #E5E5E5', boxShadow: '0 1px 2px 0 rgba(0, 0, 0, 0.05)' }}>
            <div className="flex items-center justify-between mb-3">
              <div className="w-10 h-10 rounded-xl flex items-center justify-center" style={{ backgroundColor: '#F5F5F5' }}>
                <Edit2 className="w-5 h-5" style={{ color: '#0A0A0A' }} />
              </div>
            </div>
            <div className="flex-1 flex flex-col justify-between">
              <div style={{ 
                fontFamily: 'var(--font-body)',
                fontSize: 'var(--font-size-xs)',
                fontWeight: 'var(--font-weight-medium)',
                color: '#6B6B6B',
                textTransform: 'uppercase',
                letterSpacing: '0.06em',
                lineHeight: '1.4'
              }}>
                Total publicaciones
              </div>
              <div style={{ 
                fontFamily: 'var(--font-heading)',
                fontSize: 'var(--font-size-h2)',
                fontWeight: 'var(--font-weight-semibold)',
                lineHeight: '1',
                color: '#0A0A0A',
                marginTop: '12px',
                marginBottom: '8px'
              }}>
                {publications.length}
              </div>
            </div>
          </div>

          {/* Publicadas */}
          <div className="rounded-2xl p-6 flex flex-col" style={{ backgroundColor: '#FFFFFF', border: '1px solid #E5E5E5', boxShadow: '0 1px 2px 0 rgba(0, 0, 0, 0.05)' }}>
            <div className="flex items-center justify-between mb-3">
              <div className="w-10 h-10 rounded-xl flex items-center justify-center" style={{ backgroundColor: '#F5F5F5' }}>
                <Check className="w-5 h-5" style={{ color: '#0A0A0A' }} />
              </div>
            </div>
            <div className="flex-1 flex flex-col justify-between">
              <div style={{ 
                fontFamily: 'var(--font-body)',
                fontSize: 'var(--font-size-xs)',
                fontWeight: 'var(--font-weight-medium)',
                color: '#6B6B6B',
                textTransform: 'uppercase',
                letterSpacing: '0.06em',
                lineHeight: '1.4'
              }}>
                Publicadas
              </div>
              <div style={{ 
                fontFamily: 'var(--font-heading)',
                fontSize: 'var(--font-size-h2)',
                fontWeight: 'var(--font-weight-semibold)',
                lineHeight: '1',
                color: '#0A0A0A',
                marginTop: '12px',
                marginBottom: '8px'
              }}>
                {publications.filter(p => p.status === 'published').length}
              </div>
            </div>
          </div>

          {/* Borradores */}
          <div className="rounded-2xl p-6 flex flex-col" style={{ backgroundColor: '#FFFFFF', border: '1px solid #E5E5E5', boxShadow: '0 1px 2px 0 rgba(0, 0, 0, 0.05)' }}>
            <div className="flex items-center justify-between mb-3">
              <div className="w-10 h-10 rounded-xl flex items-center justify-center" style={{ backgroundColor: '#F5F5F5' }}>
                <Edit2 className="w-5 h-5" style={{ color: '#0A0A0A' }} />
              </div>
            </div>
            <div className="flex-1 flex flex-col justify-between">
              <div style={{ 
                fontFamily: 'var(--font-body)',
                fontSize: 'var(--font-size-xs)',
                fontWeight: 'var(--font-weight-medium)',
                color: '#6B6B6B',
                textTransform: 'uppercase',
                letterSpacing: '0.06em',
                lineHeight: '1.4'
              }}>
                Borradores
              </div>
              <div style={{ 
                fontFamily: 'var(--font-heading)',
                fontSize: 'var(--font-size-h2)',
                fontWeight: 'var(--font-weight-semibold)',
                lineHeight: '1',
                color: '#0A0A0A',
                marginTop: '12px',
                marginBottom: '8px'
              }}>
                {publications.filter(p => p.status === 'draft').length}
              </div>
            </div>
          </div>

          {/* Visitas totales */}
          <div className="rounded-2xl p-6 flex flex-col" style={{ backgroundColor: '#FFFFFF', border: '1px solid #E5E5E5', boxShadow: '0 1px 2px 0 rgba(0, 0, 0, 0.05)' }}>
            <div className="flex items-center justify-between mb-3">
              <div className="w-10 h-10 rounded-xl flex items-center justify-center" style={{ backgroundColor: '#F5F5F5' }}>
                <Eye className="w-5 h-5" style={{ color: '#0A0A0A' }} />
              </div>
            </div>
            <div className="flex-1 flex flex-col justify-between">
              <div style={{ 
                fontFamily: 'var(--font-body)',
                fontSize: 'var(--font-size-xs)',
                fontWeight: 'var(--font-weight-medium)',
                color: '#6B6B6B',
                textTransform: 'uppercase',
                letterSpacing: '0.06em',
                lineHeight: '1.4'
              }}>
                Visitas totales
              </div>
              <div style={{ 
                fontFamily: 'var(--font-heading)',
                fontSize: 'var(--font-size-h2)',
                fontWeight: 'var(--font-weight-semibold)',
                lineHeight: '1',
                color: '#0A0A0A',
                marginTop: '12px',
                marginBottom: '8px'
              }}>
                {publications.reduce((acc, pub) => acc + (pub.views || 0), 0)}
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Filters */}
      <div className="px-6 py-4 bg-background" style={{ borderBottom: '1px solid var(--border)' }}>
        <div className="flex items-center gap-2">
          <span style={{
            fontFamily: 'var(--font-body)',
            fontSize: 'var(--font-size-body-sm)',
            fontWeight: 'var(--font-weight-medium)',
            color: 'var(--foreground)',
            lineHeight: 'var(--line-height-ui)',
            marginRight: '8px'
          }}>
            Filtrar por:
          </span>
          {[
            { id: 'all', label: 'Todas' },
            { id: 'published', label: 'Publicadas' },
            { id: 'draft', label: 'Borradores' },
            { id: 'paused', label: 'Pausadas' },
          ].map((filter) => (
            <button
              key={filter.id}
              onClick={() => setFilterStatus(filter.id as any)}
              className="px-4 py-2 rounded-lg transition-colors"
              style={{
                backgroundColor: filterStatus === filter.id ? 'var(--foreground)' : 'var(--background)',
                color: filterStatus === filter.id ? 'var(--background)' : '#737373',
                border: '1px solid var(--border)',
                fontFamily: 'var(--font-body)',
                fontSize: 'var(--font-size-body-sm)',
                fontWeight: 'var(--font-weight-medium)',
                lineHeight: 'var(--line-height-ui)'
              }}
            >
              {filter.label}
            </button>
          ))}
        </div>
      </div>

      {/* Publications Grid */}
      <div className="px-6 py-6">
        {filteredPublications.length === 0 ? (
          <div className="text-center py-16">
            <div className="w-16 h-16 mx-auto mb-4 rounded-full flex items-center justify-center bg-muted">
              <Plus className="w-8 h-8 text-muted-foreground" />
            </div>
            <h3 style={{
              fontFamily: 'var(--font-heading)',
              fontSize: 'var(--font-size-h4)',
              fontWeight: 'var(--font-weight-semibold)',
              color: 'var(--foreground)',
              lineHeight: 'var(--line-height-heading)',
              marginBottom: '8px'
            }}>
              {filterStatus === 'all' ? 'No tienes publicaciones' : `No tienes publicaciones ${filterStatus === 'published' ? 'publicadas' : filterStatus === 'draft' ? 'en borrador' : 'pausadas'}`}
            </h3>
            <p style={{
              fontFamily: 'var(--font-body)',
              fontSize: 'var(--font-size-body-sm)',
              color: '#737373',
              lineHeight: 'var(--line-height-body)',
              marginBottom: '24px'
            }}>
              Crea tu primera publicación para empezar a vender parcelas
            </p>
            <button
              onClick={handleNewPublication}
              className="px-5 py-3 transition-all"
              style={{
                backgroundColor: '#124854',
                color: '#FFFFFF',
                borderRadius: '200px',
                fontFamily: 'var(--font-body)',
                fontSize: 'var(--font-size-body-sm)',
                fontWeight: 'var(--font-weight-medium)',
                letterSpacing: 'var(--letter-spacing-wide)',
                lineHeight: 'var(--line-height-ui)'
              }}
              onMouseEnter={(e) => { e.currentTarget.style.backgroundColor = '#0D3640'; }}
              onMouseLeave={(e) => { e.currentTarget.style.backgroundColor = '#124854'; }}
            >
              Nueva publicación
            </button>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredPublications.map((pub) => {
              const statusConfig = getStatusConfig(pub.status);
              return (
                <div 
                  key={pub.id} 
                  className="rounded-xl overflow-hidden transition-all hover:shadow-lg bg-background"
                  style={{ border: '1px solid var(--border)' }}
                >
                  {/* Image */}
                  <div className="relative aspect-[4/3] overflow-hidden bg-muted">
                    {pub.mainImage ? (
                      <img 
                        src={typeof pub.mainImage === 'string' ? pub.mainImage : ''} 
                        alt={pub.title}
                        className="w-full h-full object-cover"
                      />
                    ) : (
                      <div className="w-full h-full flex items-center justify-center">
                        <Maximize2 className="w-12 h-12" style={{ color: 'var(--border)' }} />
                      </div>
                    )}
                    
                    {/* Status Badge */}
                    <div className="absolute top-3 left-3">
                      <span 
                        className="px-3 py-1.5 rounded-full"
                        style={{
                          backgroundColor: statusConfig.bgColor,
                          color: statusConfig.textColor,
                          border: `1px solid ${statusConfig.borderColor}`,
                          fontFamily: 'var(--font-body)',
                          fontSize: 'var(--font-size-xs)',
                          fontWeight: 'var(--font-weight-medium)',
                          letterSpacing: 'var(--letter-spacing-wide)',
                          lineHeight: 'var(--line-height-ui)'
                        }}
                      >
                        {statusConfig.label}
                      </span>
                    </div>

                    {/* Actions Menu */}
                    <div className="absolute top-3 right-3">
                      <button
                        onClick={() => setActiveMenu(activeMenu === pub.id ? null : pub.id)}
                        className="w-8 h-8 rounded-full flex items-center justify-center transition-colors"
                        style={{ 
                          backgroundColor: 'rgba(255, 255, 255, 0.9)', 
                          border: '1px solid rgba(0,0,0,0.1)' 
                        }}
                      >
                        <MoreVertical className="w-4 h-4 text-foreground" />
                      </button>
                      
                      {activeMenu === pub.id && (
                        <>
                          <div 
                            className="fixed inset-0 z-10" 
                            onClick={() => setActiveMenu(null)}
                          />
                          <div 
                            className="absolute right-0 top-10 z-20 rounded-lg overflow-hidden shadow-lg bg-background"
                            style={{ 
                              border: '1px solid var(--border)',
                              minWidth: '220px'
                            }}
                          >
                            <button
                              onClick={() => {
                                handleEditPublication(pub);
                                setActiveMenu(null);
                              }}
                              className="w-full flex items-center gap-3 px-4 py-3 transition-colors hover:bg-muted"
                            >
                              <Edit2 className="w-4 h-4 flex-shrink-0" style={{ color: '#737373' }} />
                              <span style={{
                                fontFamily: 'var(--font-body)',
                                fontSize: 'var(--font-size-body-sm)',
                                color: 'var(--foreground)',
                                lineHeight: 'var(--line-height-ui)',
                                whiteSpace: 'nowrap'
                              }}>
                                Editar
                              </span>
                            </button>

                            {/* Agregar parcelas - Solo para proyectos */}
                            {pub.stockUnits && pub.stockUnits.length > 0 && (
                              <button
                                onClick={() => {
                                  handleAddPlotsToProject(pub);
                                  setActiveMenu(null);
                                }}
                                className="w-full flex items-center gap-3 px-4 py-3 transition-colors hover:bg-muted"
                                style={{ borderTop: '1px solid var(--border)' }}
                              >
                                <Plus className="w-4 h-4 flex-shrink-0" style={{ color: '#124854' }} />
                                <span style={{
                                  fontFamily: 'var(--font-body)',
                                  fontSize: 'var(--font-size-body-sm)',
                                  color: 'var(--foreground)',
                                  lineHeight: 'var(--line-height-ui)',
                                  whiteSpace: 'nowrap'
                                }}>
                                  Agregar parcelas
                                </span>
                              </button>
                            )}
                            
                            {pub.status === 'published' && (
                              <>
                                <button
                                  onClick={() => handleSharePublication(pub)}
                                  className="w-full flex items-center gap-3 px-4 py-3 transition-colors hover:bg-muted"
                                  style={{ borderTop: '1px solid var(--border)' }}
                                >
                                  <Share2 className="w-4 h-4 flex-shrink-0" style={{ color: '#737373' }} />
                                  <span style={{
                                    fontFamily: 'var(--font-body)',
                                    fontSize: 'var(--font-size-body-sm)',
                                    color: 'var(--foreground)',
                                    lineHeight: 'var(--line-height-ui)',
                                    whiteSpace: 'nowrap'
                                  }}>
                                    Compartir
                                  </span>
                                </button>

                                <button
                                  onClick={() => {
                                    if (onNavigate) {
                                      // Mapear ID de publicación a ID de parcela (usando pub-1 = parcela 1, etc)
                                      const parcelaId = parseInt(pub.id.replace('pub-', '')) || 1;
                                      onNavigate('parcela-detalle', parcelaId);
                                      setActiveMenu(null);
                                    } else {
                                      handleViewPublicPublication(pub);
                                    }
                                  }}
                                  className="w-full flex items-center gap-3 px-4 py-3 transition-colors hover:bg-muted"
                                  style={{ borderTop: '1px solid var(--border)' }}
                                >
                                  <Eye className="w-4 h-4 flex-shrink-0" style={{ color: '#737373' }} />
                                  <span style={{
                                    fontFamily: 'var(--font-body)',
                                    fontSize: 'var(--font-size-body-sm)',
                                    color: 'var(--foreground)',
                                    lineHeight: 'var(--line-height-ui)',
                                    whiteSpace: 'nowrap'
                                  }}>
                                    Ver publicación
                                  </span>
                                </button>
                              </>
                            )}

                            {/* Pausar/Activar publicación */}
                            {(pub.status === 'published' || pub.status === 'paused') && (
                              <button
                                onClick={() => handleTogglePublicationStatus(pub.id)}
                                className="w-full flex items-center gap-3 px-4 py-3 transition-colors hover:bg-muted"
                                style={{ borderTop: '1px solid var(--border)' }}
                              >
                                {pub.status === 'published' ? (
                                  <>
                                    <Pause className="w-4 h-4 flex-shrink-0" style={{ color: '#92400E' }} />
                                    <span style={{
                                      fontFamily: 'var(--font-body)',
                                      fontSize: 'var(--font-size-body-sm)',
                                      color: 'var(--foreground)',
                                      lineHeight: 'var(--line-height-ui)',
                                      whiteSpace: 'nowrap'
                                    }}>
                                      Pausar publicación
                                    </span>
                                  </>
                                ) : (
                                  <>
                                    <Play className="w-4 h-4 flex-shrink-0" style={{ color: '#647E3F' }} />
                                    <span style={{
                                      fontFamily: 'var(--font-body)',
                                      fontSize: 'var(--font-size-body-sm)',
                                      color: 'var(--foreground)',
                                      lineHeight: 'var(--line-height-ui)',
                                      whiteSpace: 'nowrap'
                                    }}>
                                      Activar publicación
                                    </span>
                                  </>
                                )}
                              </button>
                            )}
                            
                            <button
                              onClick={() => {
                                setShowDeleteConfirm(pub.id);
                                setActiveMenu(null);
                              }}
                              className="w-full flex items-center gap-3 px-4 py-3 transition-colors hover:bg-muted"
                              style={{ borderTop: '1px solid var(--border)' }}
                              onMouseEnter={(e) => { 
                                e.currentTarget.style.backgroundColor = '#FEF2F2';
                              }}
                              onMouseLeave={(e) => { 
                                e.currentTarget.style.backgroundColor = 'transparent';
                              }}
                            >
                              <Trash2 className="w-4 h-4 flex-shrink-0" style={{ color: '#DC2626' }} />
                              <span style={{
                                fontFamily: 'var(--font-body)',
                                fontSize: 'var(--font-size-body-sm)',
                                color: '#DC2626',
                                lineHeight: 'var(--line-height-ui)',
                                whiteSpace: 'nowrap'
                              }}>
                                Eliminar
                              </span>
                            </button>
                          </div>
                        </>
                      )}
                    </div>

                    {/* Availability Badge */}
                    {pub.availability === 'reserved' && (
                      <div className="absolute bottom-3 left-3">
                        <span 
                          className="px-3 py-1.5 rounded-full"
                          style={{
                            backgroundColor: 'rgba(254, 243, 199, 0.95)',
                            color: '#92400E',
                            border: '1px solid #FCD34D',
                            fontFamily: 'var(--font-body)',
                            fontSize: 'var(--font-size-xs)',
                            fontWeight: 'var(--font-weight-medium)',
                            lineHeight: 'var(--line-height-ui)'
                          }}
                        >
                          Reservada
                        </span>
                      </div>
                    )}
                    {pub.availability === 'sold' && (
                      <div className="absolute bottom-3 left-3">
                        <span 
                          className="px-3 py-1.5 rounded-full"
                          style={{
                            backgroundColor: 'rgba(220, 252, 231, 0.95)',
                            color: '#166534',
                            border: '1px solid #86EFAC',
                            fontFamily: 'var(--font-body)',
                            fontSize: 'var(--font-size-xs)',
                            fontWeight: 'var(--font-weight-medium)',
                            lineHeight: 'var(--line-height-ui)'
                          }}
                        >
                          Vendida
                        </span>
                      </div>
                    )}
                  </div>

                  {/* Content */}
                  <div className="p-5 space-y-3">
                    {/* Title */}
                    <h4 className="text-foreground" style={{
                      display: '-webkit-box',
                      WebkitLineClamp: 2,
                      WebkitBoxOrient: 'vertical',
                      overflow: 'hidden'
                    }}>
                      {pub.title || 'Sin título'}
                    </h4>

                    {/* Location */}
                    <div className="flex items-center gap-2">
                      <MapPin className="w-4 h-4 flex-shrink-0" style={{ color: '#737373' }} />
                      <span style={{
                        fontFamily: 'var(--font-body)',
                        fontSize: 'var(--font-size-body-sm)',
                        color: '#737373',
                        lineHeight: 'var(--line-height-ui)'
                      }}>
                        {pub.comuna}, {pub.region}
                      </span>
                    </div>

                    {/* Details */}
                    {pub.stockUnits && pub.stockUnits.length > 0 ? (
                      // Vista de proyecto con parcelas
                      <div className="space-y-3">
                        <div className="flex items-center gap-3">
                          <div className="p-2 rounded-lg" style={{ backgroundColor: '#E6F1F3' }}>
                            <Building2 className="w-4 h-4" style={{ color: '#124854' }} />
                          </div>
                          <div>
                            <div style={{
                              fontFamily: 'var(--font-body)',
                              fontSize: 'var(--font-size-xs)',
                              color: '#737373',
                            }}>
                              Proyecto con inventario
                            </div>
                            <div style={{
                              fontFamily: 'var(--font-body)',
                              fontSize: 'var(--font-size-body-sm)',
                              fontWeight: 'var(--font-weight-semibold)',
                              color: '#0A0A0A',
                            }}>
                              {pub.stockUnits.length} {pub.stockUnits.length === 1 ? 'parcela' : 'parcelas'}
                            </div>
                          </div>
                        </div>
                        <div className="flex items-center gap-2 flex-wrap">
                          {(() => {
                            const available = pub.stockUnits.filter(u => u.status === 'available').length;
                            const reserved = pub.stockUnits.filter(u => u.status === 'reserved').length;
                            const sold = pub.stockUnits.filter(u => u.status === 'sold').length;
                            return (
                              <>
                                {available > 0 && (
                                  <span className="px-2 py-1 rounded-full" style={{
                                    backgroundColor: '#E8F3E8',
                                    color: '#647E3F',
                                    fontFamily: 'var(--font-body)',
                                    fontSize: 'var(--font-size-xs)',
                                    fontWeight: 'var(--font-weight-medium)',
                                  }}>
                                    {available} disponible{available > 1 ? 's' : ''}
                                  </span>
                                )}
                                {reserved > 0 && (
                                  <span className="px-2 py-1 rounded-full" style={{
                                    backgroundColor: '#FFF4E6',
                                    color: '#7D460D',
                                    fontFamily: 'var(--font-body)',
                                    fontSize: 'var(--font-size-xs)',
                                    fontWeight: 'var(--font-weight-medium)',
                                  }}>
                                    {reserved} reservada{reserved > 1 ? 's' : ''}
                                  </span>
                                )}
                                {sold > 0 && (
                                  <span className="px-2 py-1 rounded-full" style={{
                                    backgroundColor: '#F5F5F5',
                                    color: '#737373',
                                    fontFamily: 'var(--font-body)',
                                    fontSize: 'var(--font-size-xs)',
                                    fontWeight: 'var(--font-weight-medium)',
                                  }}>
                                    {sold} vendida{sold > 1 ? 's' : ''}
                                  </span>
                                )}
                              </>
                            );
                          })()}
                        </div>
                      </div>
                    ) : (
                      // Vista de parcela individual
                      <div className="flex items-center gap-4">
                        <div>
                          <div style={{
                            fontFamily: 'var(--font-body)',
                            fontSize: 'var(--font-size-xs)',
                            color: '#737373',
                            lineHeight: 'var(--line-height-ui)'
                          }}>
                            Superficie
                          </div>
                          <div style={{
                            fontFamily: 'var(--font-body)',
                            fontSize: 'var(--font-size-body-sm)',
                            fontWeight: 'var(--font-weight-medium)',
                            color: 'var(--foreground)',
                            lineHeight: 'var(--line-height-ui)'
                          }}>
                            {parseInt(pub.surface).toLocaleString('es-CL')} m²
                          </div>
                        </div>
                        <div className="h-8" style={{ width: '1px', backgroundColor: 'var(--border)' }} />
                        <div>
                          <div style={{
                            fontFamily: 'var(--font-body)',
                            fontSize: 'var(--font-size-xs)',
                            color: '#737373',
                            lineHeight: 'var(--line-height-ui)'
                          }}>
                            Precio
                          </div>
                          <div style={{
                            fontFamily: 'var(--font-body)',
                            fontSize: 'var(--font-size-body-sm)',
                            fontWeight: 'var(--font-weight-bold)',
                            color: 'var(--foreground)',
                            lineHeight: 'var(--line-height-ui)'
                          }}>
                            {pub.price ? `$${parseInt(pub.price).toLocaleString('es-CL')}` : '-'}
                          </div>
                        </div>
                      </div>
                    )}

                    {/* Stats - Solo para publicadas */}
                    {pub.status === 'published' && (pub.views || pub.inquiries) && (
                      <div className="pt-3" style={{ borderTop: '1px solid var(--muted)' }}>
                        <div className="flex items-center gap-4">
                          {pub.views !== undefined && (
                            <div className="flex items-center gap-1.5">
                              <Eye className="w-4 h-4" style={{ color: '#737373' }} />
                              <span style={{
                                fontFamily: 'var(--font-body)',
                                fontSize: 'var(--font-size-xs)',
                                color: '#737373',
                                lineHeight: 'var(--line-height-ui)'
                              }}>
                                {pub.views} visitas
                              </span>
                            </div>
                          )}
                          {pub.inquiries !== undefined && (
                            <div className="flex items-center gap-1.5">
                              <LinkIcon className="w-4 h-4" style={{ color: '#737373' }} />
                              <span style={{
                                fontFamily: 'var(--font-body)',
                                fontSize: 'var(--font-size-xs)',
                                color: '#737373',
                                lineHeight: 'var(--line-height-ui)'
                              }}>
                                {pub.inquiries} consultas
                              </span>
                            </div>
                          )}
                        </div>
                      </div>
                    )}

                    {/* Last Edited */}
                    <div className="pt-3 flex items-center gap-1.5" style={{ borderTop: '1px solid var(--muted)' }}>
                      <Calendar className="w-4 h-4" style={{ color: '#737373' }} />
                      <span style={{
                        fontFamily: 'var(--font-body)',
                        fontSize: 'var(--font-size-xs)',
                        color: '#737373',
                        lineHeight: 'var(--line-height-ui)'
                      }}>
                        Última edición: {new Date(pub.lastEdited).toLocaleDateString('es-CL', { day: 'numeric', month: 'short', year: 'numeric' })}
                      </span>
                    </div>

                    {/* Draft Warning */}
                    {pub.status === 'draft' && (
                      <div className="px-3 py-2 rounded-lg" style={{ backgroundColor: '#FEF3C7', border: '1px solid #FCD34D' }}>
                        <p style={{
                          fontFamily: 'var(--font-body)',
                          fontSize: 'var(--font-size-xs)',
                          color: '#92400E',
                          lineHeight: 'var(--line-height-ui)'
                        }}>
                          Esta publicación no es visible en el sitio público
                        </p>
                      </div>
                    )}
                  </div>
                </div>
              );
            })}
          </div>
        )}
      </div>

      {/* Delete Confirmation Modal */}
      {showDeleteConfirm && (
        <div className="fixed inset-0 z-50 flex items-center justify-center" style={{ backgroundColor: 'rgba(0, 0, 0, 0.5)' }}>
          <div className="w-full max-w-md p-6 rounded-xl bg-background" style={{ border: '1px solid var(--border)' }}>
            <h3 style={{
              fontFamily: 'var(--font-heading)',
              fontSize: 'var(--font-size-h4)',
              fontWeight: 'var(--font-weight-semibold)',
              color: 'var(--foreground)',
              lineHeight: 'var(--line-height-heading)',
              marginBottom: '8px'
            }}>
              ¿Eliminar publicación?
            </h3>
            <p style={{
              fontFamily: 'var(--font-body)',
              fontSize: 'var(--font-size-body-sm)',
              color: '#737373',
              lineHeight: 'var(--line-height-body)',
              marginBottom: '24px'
            }}>
              Esta acción no se puede deshacer. La publicación será eliminada permanentemente.
            </p>
            <div className="flex gap-3">
              <button
                onClick={() => setShowDeleteConfirm(null)}
                className="flex-1 px-4 py-2.5 rounded-lg transition-colors bg-background text-foreground hover:bg-muted"
                style={{ border: '1px solid var(--border)' }}
              >
                Cancelar
              </button>
              <button
                onClick={() => handleDeletePublication(showDeleteConfirm)}
                className="flex-1 px-4 py-2.5 rounded-lg transition-colors"
                style={{
                  backgroundColor: '#DC2626',
                  color: '#FFFFFF'
                }}
                onMouseEnter={(e) => { e.currentTarget.style.backgroundColor = '#B91C1C'; }}
                onMouseLeave={(e) => { e.currentTarget.style.backgroundColor = '#DC2626'; }}
              >
                Eliminar
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Share Modal */}
      {showShareModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center" style={{ backgroundColor: 'rgba(0, 0, 0, 0.5)' }}>
          <div className="w-full max-w-md p-6 rounded-xl bg-background" style={{ border: '1px solid var(--border)' }}>
            <h3 style={{
              fontFamily: 'var(--font-heading)',
              fontSize: 'var(--font-size-h4)',
              fontWeight: 'var(--font-weight-semibold)',
              color: 'var(--foreground)',
              lineHeight: 'var(--line-height-heading)',
              marginBottom: '8px'
            }}>
              Compartir publicación
            </h3>
            <p style={{
              fontFamily: 'var(--font-body)',
              fontSize: 'var(--font-size-body-sm)',
              color: '#737373',
              lineHeight: 'var(--line-height-body)',
              marginBottom: '16px'
            }}>
              Copiá el enlace para compartir esta parcela
            </p>
            
            {/* Campo de texto con link */}
            <div className="mb-4">
              <input
                type="text"
                value={`https://compratuparcela.cl/parcelas/${showShareModal.id}`}
                readOnly
                className="w-full px-4 py-2.5 rounded-lg bg-input-background text-foreground"
                style={{ 
                  border: '1px solid var(--border)',
                  fontFamily: 'var(--font-body)',
                  fontSize: 'var(--font-size-body-sm)',
                  lineHeight: 'var(--line-height-ui)'
                }}
              />
            </div>

            {/* Feedback de link copiado */}
            {linkCopied && (
              <div className="mb-4 px-3 py-2 rounded-lg" style={{ backgroundColor: '#DCFCE7', border: '1px solid #86EFAC' }}>
                <div className="flex items-center gap-2">
                  <Check className="w-4 h-4" style={{ color: '#166534' }} />
                  <span style={{
                    fontFamily: 'var(--font-body)',
                    fontSize: 'var(--font-size-xs)',
                    color: '#166534',
                    lineHeight: 'var(--line-height-ui)',
                    fontWeight: 'var(--font-weight-medium)'
                  }}>
                    Link copiado
                  </span>
                </div>
              </div>
            )}

            {/* Botones */}
            <div className="flex gap-3">
              <button
                onClick={() => {
                  navigator.clipboard.writeText(`https://compratuparcela.cl/parcelas/${showShareModal.id}`);
                  setLinkCopied(true);
                }}
                className="flex-1 px-6 py-3 transition-all"
                style={{
                  backgroundColor: '#124854',
                  color: '#FFFFFF',
                  borderRadius: '200px',
                  fontFamily: 'var(--font-body)',
                  fontSize: 'var(--font-size-body-sm)',
                  fontWeight: 'var(--font-weight-medium)',
                  letterSpacing: 'var(--letter-spacing-wide)',
                  lineHeight: 'var(--line-height-ui)'
                }}
                onMouseEnter={(e) => { e.currentTarget.style.backgroundColor = '#0D3640'; }}
                onMouseLeave={(e) => { e.currentTarget.style.backgroundColor = '#124854'; }}
              >
                Copiar link
              </button>
              <button
                onClick={() => {
                  setShowShareModal(null);
                  setLinkCopied(false);
                }}
                className="flex-1 px-6 py-3 transition-all"
                style={{
                  backgroundColor: '#FFFFFF',
                  color: 'var(--foreground)',
                  border: '2px solid #DEDEDE',
                  borderRadius: '200px',
                  fontFamily: 'var(--font-body)',
                  fontSize: 'var(--font-size-body-sm)',
                  fontWeight: 'var(--font-weight-medium)',
                  letterSpacing: 'var(--letter-spacing-wide)',
                  lineHeight: 'var(--line-height-ui)'
                }}
                onMouseEnter={(e) => { e.currentTarget.style.backgroundColor = '#FAFAFA'; }}
                onMouseLeave={(e) => { e.currentTarget.style.backgroundColor = '#FFFFFF'; }}
              >
                Cerrar
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Type Selection Modal - Solo para inmobiliarias */}
      {showTypeSelectionModal && userType === 'inmobiliaria' && (
        <div className="fixed inset-0 z-50 flex items-center justify-center" style={{ backgroundColor: 'rgba(0, 0, 0, 0.5)' }}>
          <div className="w-full max-w-lg p-8 rounded-xl bg-background" style={{ border: '1px solid var(--border)' }}>
            <h3 style={{
              fontFamily: 'var(--font-heading)',
              fontSize: 'var(--font-size-h3)',
              fontWeight: 'var(--font-weight-semibold)',
              color: 'var(--foreground)',
              lineHeight: 'var(--line-height-heading)',
              marginBottom: '12px',
              textAlign: 'center'
            }}>
              ¿Qué querés publicar?
            </h3>
            <p style={{
              fontFamily: 'var(--font-body)',
              fontSize: 'var(--font-size-body-sm)',
              color: '#737373',
              lineHeight: 'var(--line-height-body)',
              marginBottom: '32px',
              textAlign: 'center'
            }}>
              Elegí el tipo de publicación que mejor se ajuste a tu necesidad
            </p>
            
            {/* Opciones */}
            <div className="grid grid-cols-2 gap-4">
              <button
                onClick={() => {
                  setShowTypeSelectionModal(false);
                  setShowListingFlow(true);
                }}
                className="flex flex-col items-center gap-4 px-6 py-8 transition-all rounded-xl"
                style={{
                  backgroundColor: '#FFFFFF',
                  border: '2px solid #DEDEDE',
                  fontFamily: 'var(--font-body)',
                  fontSize: 'var(--font-size-body-sm)',
                  fontWeight: 'var(--font-weight-medium)',
                  lineHeight: 'var(--line-height-ui)'
                }}
                onMouseEnter={(e) => { 
                  e.currentTarget.style.borderColor = '#124854';
                  e.currentTarget.style.backgroundColor = '#F5F9FA';
                }}
                onMouseLeave={(e) => { 
                  e.currentTarget.style.borderColor = '#DEDEDE';
                  e.currentTarget.style.backgroundColor = '#FFFFFF';
                }}
              >
                <div className="w-16 h-16 rounded-xl flex items-center justify-center" style={{ backgroundColor: '#E6F1F3' }}>
                  <FileText className="w-8 h-8" style={{ color: '#124854' }} />
                </div>
                <div className="text-center">
                  <div style={{
                    fontFamily: 'var(--font-heading)',
                    fontSize: 'var(--font-size-body-base)',
                    fontWeight: 'var(--font-weight-semibold)',
                    color: '#0A0A0A',
                    lineHeight: 'var(--line-height-heading)',
                    marginBottom: '4px'
                  }}>
                    Parcela individual
                  </div>
                  <div style={{
                    fontFamily: 'var(--font-body)',
                    fontSize: 'var(--font-size-xs)',
                    color: '#737373',
                    lineHeight: 'var(--line-height-body)'
                  }}>
                    Una sola parcela con sus características
                  </div>
                </div>
              </button>

              <button
                onClick={() => {
                  setShowTypeSelectionModal(false);
                  setShowProjectFlow(true);
                }}
                className="flex flex-col items-center gap-4 px-6 py-8 transition-all rounded-xl"
                style={{
                  backgroundColor: '#FFFFFF',
                  border: '2px solid #DEDEDE',
                  fontFamily: 'var(--font-body)',
                  fontSize: 'var(--font-size-body-sm)',
                  fontWeight: 'var(--font-weight-medium)',
                  lineHeight: 'var(--line-height-ui)'
                }}
                onMouseEnter={(e) => { 
                  e.currentTarget.style.borderColor = '#124854';
                  e.currentTarget.style.backgroundColor = '#F5F9FA';
                }}
                onMouseLeave={(e) => { 
                  e.currentTarget.style.borderColor = '#DEDEDE';
                  e.currentTarget.style.backgroundColor = '#FFFFFF';
                }}
              >
                <div className="w-16 h-16 rounded-xl flex items-center justify-center" style={{ backgroundColor: '#E6F1F3' }}>
                  <Building2 className="w-8 h-8" style={{ color: '#124854' }} />
                </div>
                <div className="text-center">
                  <div style={{
                    fontFamily: 'var(--font-heading)',
                    fontSize: 'var(--font-size-body-base)',
                    fontWeight: 'var(--font-weight-semibold)',
                    color: '#0A0A0A',
                    lineHeight: 'var(--line-height-heading)',
                    marginBottom: '4px'
                  }}>
                    Proyecto
                  </div>
                  <div style={{
                    fontFamily: 'var(--font-body)',
                    fontSize: 'var(--font-size-xs)',
                    color: '#737373',
                    lineHeight: 'var(--line-height-body)'
                  }}>
                    Múltiples parcelas en un desarrollo
                  </div>
                </div>
              </button>
            </div>

            {/* Botón cancelar */}
            <button
              onClick={() => setShowTypeSelectionModal(false)}
              className="w-full mt-6 px-6 py-3 transition-all rounded-lg"
              style={{
                backgroundColor: '#FFFFFF',
                color: 'var(--foreground)',
                border: '1px solid #DEDEDE',
                fontFamily: 'var(--font-body)',
                fontSize: 'var(--font-size-body-sm)',
                fontWeight: 'var(--font-weight-medium)',
                lineHeight: 'var(--line-height-ui)'
              }}
              onMouseEnter={(e) => { e.currentTarget.style.backgroundColor = '#FAFAFA'; }}
              onMouseLeave={(e) => { e.currentTarget.style.backgroundColor = '#FFFFFF'; }}
            >
              Cancelar
            </button>
          </div>
        </div>
      )}

      {/* New Listing Flow */}
      {showListingFlow && (
        <NewListingFlow
          onClose={() => setShowListingFlow(false)}
          onPublish={handlePublishListing}
        />
      )}

      {/* New Project Flow */}
      {showProjectFlow && (
        <NewProjectFlow
          onClose={() => setShowProjectFlow(false)}
          onPublish={handlePublishListing}
        />
      )}

      {/* Add Plots to Project Flow */}
      {showAddPlotsFlow && selectedProject && (
        <AddProjectPlotsFlow
          onClose={() => {
            setShowAddPlotsFlow(false);
            setSelectedProject(null);
          }}
          onSave={handleSavePlots}
          projectId={selectedProject.id}
          projectName={selectedProject.title}
        />
      )}

      {/* Publication Limit Modal - Solo para vendedor particular */}
      {showPublicationLimitModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center" style={{ backgroundColor: 'rgba(0, 0, 0, 0.5)' }}>
          <div className="w-full max-w-md p-8 rounded-xl bg-background mx-4" style={{ border: '1px solid var(--border)' }}>
            {/* Icono */}
            <div className="flex justify-center mb-6">
              <div className="w-16 h-16 rounded-full flex items-center justify-center" style={{ backgroundColor: '#FFF4E6' }}>
                <FileText className="w-8 h-8" style={{ color: '#7D460D' }} />
              </div>
            </div>
            
            {/* Título */}
            <h3 style={{
              fontFamily: 'var(--font-heading)',
              fontSize: 'var(--font-size-h3)',
              fontWeight: 'var(--font-weight-semibold)',
              color: '#0A0A0A',
              lineHeight: 'var(--line-height-heading)',
              marginBottom: '12px',
              textAlign: 'center'
            }}>
              Ya tenés una parcela publicada
            </h3>
            
            {/* Descripción */}
            <p style={{
              fontFamily: 'var(--font-body)',
              fontSize: 'var(--font-size-body-sm)',
              color: '#737373',
              lineHeight: 'var(--line-height-body)',
              marginBottom: '32px',
              textAlign: 'center'
            }}>
              Con tu cuenta actual puedes publicar solo una parcela. Si quieres publicar más propiedades, te invitamos a actualizar a una cuenta inmobiliaria.
            </p>
            
            {/* Botones */}
            <div className="space-y-3">
              {/* Ver planes */}
              <button
                onClick={() => {
                  setShowPublicationLimitModal(false);
                  // Navegar a la sección de planes si existe la función
                  if (onNavigateToSection) {
                    onNavigateToSection('plan');
                  }
                }}
                className="w-full px-6 py-3 transition-all"
                style={{
                  backgroundColor: '#124854',
                  color: '#FFFFFF',
                  borderRadius: '200px',
                  fontFamily: 'var(--font-body)',
                  fontSize: 'var(--font-size-body-sm)',
                  fontWeight: 'var(--font-weight-medium)',
                  letterSpacing: 'var(--letter-spacing-wide)',
                  lineHeight: 'var(--line-height-ui)',
                  border: 'none'
                }}
                onMouseEnter={(e) => { e.currentTarget.style.backgroundColor = '#0F3A42'; }}
                onMouseLeave={(e) => { e.currentTarget.style.backgroundColor = '#124854'; }}
              >
                Ver planes
              </button>
              
              {/* Entendido */}
              <button
                onClick={() => setShowPublicationLimitModal(false)}
                className="w-full px-6 py-3 transition-all"
                style={{
                  backgroundColor: '#FFFFFF',
                  color: 'var(--foreground)',
                  border: '2px solid #DEDEDE',
                  borderRadius: '200px',
                  fontFamily: 'var(--font-body)',
                  fontSize: 'var(--font-size-body-sm)',
                  fontWeight: 'var(--font-weight-medium)',
                  letterSpacing: 'var(--letter-spacing-wide)',
                  lineHeight: 'var(--line-height-ui)'
                }}
                onMouseEnter={(e) => { e.currentTarget.style.backgroundColor = '#FAFAFA'; }}
                onMouseLeave={(e) => { e.currentTarget.style.backgroundColor = '#FFFFFF'; }}
              >
                Entendido
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
