import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';

// English translations
const enTranslations = {
  // General
  appTitle: 'Professional Resume Generator',
  preview: 'Preview',
  fullPreview: 'Full Preview',
  editMode: 'Edit Mode',
  
  // Tabs
  personalInfo: 'Personal Info',
  experience: 'Experience',
  education: 'Education',
  skills: 'Skills',
  template: 'Template',
  
  // Personal Info Form
  fullName: 'Full Name',
  email: 'Email',
  phone: 'Phone',
  address: 'Address',
  title: 'Professional Title',
  summary: 'Professional Summary',
  profilePicture: 'Profile Picture',
  uploadPhoto: 'Upload Photo',
  removePhoto: 'Remove Photo',
  maxFileSize: 'Max file size: 2MB (JPG/PNG)',
  
  // Experience Form
  addExperience: 'Add Experience',
  company: 'Company',
  jobTitle: 'Job Title',
  location: 'Location',
  startDate: 'Start Date',
  endDate: 'End Date',
  current: 'Current',
  description: 'Description',
  save: 'Save',
  cancel: 'Cancel',
  edit: 'Edit',
  delete: 'Delete',
  
  // Education Form
  addEducation: 'Add Education',
  institution: 'Institution',
  degree: 'Degree',
  fieldOfStudy: 'Field of Study',
  
  // Skills Form
  addSkill: 'Add Skill',
  skillName: 'Skill Name',
  skillLevel: 'Skill Level',
  beginner: 'Beginner',
  intermediate: 'Intermediate',
  advanced: 'Advanced',
  expert: 'Expert',
  
  // Template Selector
  selectTemplate: 'Select Template',
  modernTemplate: 'Modern',
  classicTemplate: 'Classic',
  creativeTemplate: 'Creative',
  
  // Export Options
  printPDF: 'Print PDF',
  exportPDF: 'Export PDF',
  exportTXT: 'Export TXT',
  saveDraft: 'Save Draft',
  loadDraft: 'Load Draft',
  
  // Validation
  required: 'Required',
  invalidEmail: 'Invalid email address',
  invalidPhone: 'Invalid phone number',
  
  // Notifications
  draftSaved: 'Draft saved successfully!',
  draftLoaded: 'Draft loaded successfully!',
  invalidDraftFile: 'Invalid draft file!',
  
  // Tips
  nameTip: 'Use your full legal name',
  emailTip: 'Use a professional email address',
  phoneTip: 'Include country code if applying internationally',
  addressTip: 'City and country are sufficient for most applications',
  titleTip: 'E.g., "Senior Software Engineer" or "Marketing Specialist"',
  summaryTip: 'Brief overview of your professional background and key strengths (3-5 sentences)',
  companyTip: 'Include company name and department if relevant',
  jobTitleTip: 'Be specific about your role',
  descriptionTip: 'Focus on achievements and quantifiable results',
  institutionTip: 'Include full name of the institution',
  degreeTip: 'E.g., "Bachelor of Science" or "Master of Arts"',
  fieldTip: 'E.g., "Computer Science" or "Business Administration"',
  skillTip: 'Include both technical and soft skills relevant to the position',
};

// Portuguese translations
const ptTranslations = {
  // General
  appTitle: 'Gerador de Currículos Profissional',
  preview: 'Visualização',
  fullPreview: 'Visualização Completa',
  editMode: 'Modo de Edição',
  
  // Tabs
  personalInfo: 'Dados Pessoais',
  experience: 'Experiência',
  education: 'Formação',
  skills: 'Habilidades',
  template: 'Modelo',
  
  // Personal Info Form
  fullName: 'Nome Completo',
  email: 'E-mail',
  phone: 'Telefone',
  address: 'Endereço',
  title: 'Título Profissional',
  summary: 'Resumo Profissional',
  profilePicture: 'Foto de Perfil',
  uploadPhoto: 'Carregar Foto',
  removePhoto: 'Remover Foto',
  maxFileSize: 'Tamanho máximo: 2MB (JPG/PNG)',
  
  // Experience Form
  addExperience: 'Adicionar Experiência',
  company: 'Empresa',
  jobTitle: 'Cargo',
  location: 'Localização',
  startDate: 'Data de Início',
  endDate: 'Data de Término',
  current: 'Atual',
  description: 'Descrição',
  save: 'Salvar',
  cancel: 'Cancelar',
  edit: 'Editar',
  delete: 'Excluir',
  
  // Education Form
  addEducation: 'Adicionar Formação',
  institution: 'Instituição',
  degree: 'Grau',
  fieldOfStudy: 'Área de Estudo',
  
  // Skills Form
  addSkill: 'Adicionar Habilidade',
  skillName: 'Nome da Habilidade',
  skillLevel: 'Nível',
  beginner: 'Iniciante',
  intermediate: 'Intermediário',
  advanced: 'Avançado',
  expert: 'Especialista',
  
  // Template Selector
  selectTemplate: 'Selecionar Modelo',
  modernTemplate: 'Moderno',
  classicTemplate: 'Clássico',
  creativeTemplate: 'Criativo',
  
  // Export Options
  printPDF: 'Imprimir PDF',
  exportPDF: 'Exportar PDF',
  exportTXT: 'Exportar TXT',
  saveDraft: 'Salvar Rascunho',
  loadDraft: 'Carregar Rascunho',
  
  // Validation
  required: 'Obrigatório',
  invalidEmail: 'Endereço de e-mail inválido',
  invalidPhone: 'Número de telefone inválido',
  
  // Notifications
  draftSaved: 'Rascunho salvo com sucesso!',
  draftLoaded: 'Rascunho carregado com sucesso!',
  invalidDraftFile: 'Arquivo de rascunho inválido!',
  
  // Tips
  nameTip: 'Use seu nome completo legal',
  emailTip: 'Use um endereço de e-mail profissional',
  phoneTip: 'Inclua o código do país se estiver se candidatando internacionalmente',
  addressTip: 'Cidade e país são suficientes para a maioria das candidaturas',
  titleTip: 'Ex.: "Engenheiro de Software Sênior" ou "Especialista em Marketing"',
  summaryTip: 'Breve visão geral de sua experiência profissional e principais pontos fortes (3-5 frases)',
  companyTip: 'Inclua o nome da empresa e departamento, se relevante',
  jobTitleTip: 'Seja específico sobre sua função',
  descriptionTip: 'Concentre-se em realizações e resultados quantificáveis',
  institutionTip: 'Inclua o nome completo da instituição',
  degreeTip: 'Ex.: "Bacharelado em Ciências" ou "Mestrado em Artes"',
  fieldTip: 'Ex.: "Ciência da Computação" ou "Administração de Empresas"',
  skillTip: 'Inclua habilidades técnicas e interpessoais relevantes para a posição',
};

// Spanish translations
const esTranslations = {
  // General
  appTitle: 'Generador de Currículum Profesional',
  preview: 'Vista previa',
  fullPreview: 'Vista previa completa',
  editMode: 'Modo de edición',
  
  // Tabs
  personalInfo: 'Información personal',
  experience: 'Experiencia',
  education: 'Educación',
  skills: 'Habilidades',
  template: 'Plantilla',
  
  // Personal Info Form
  fullName: 'Nombre completo',
  email: 'Correo electrónico',
  phone: 'Teléfono',
  address: 'Dirección',
  title: 'Título profesional',
  summary: 'Resumen profesional',
  profilePicture: 'Foto de perfil',
  uploadPhoto: 'Subir foto',
  removePhoto: 'Eliminar foto',
  maxFileSize: 'Tamaño máximo: 2MB (JPG/PNG)',
  
  // Experience Form
  addExperience: 'Añadir experiencia',
  company: 'Empresa',
  jobTitle: 'Puesto',
  location: 'Ubicación',
  startDate: 'Fecha de inicio',
  endDate: 'Fecha de finalización',
  current: 'Actual',
  description: 'Descripción',
  save: 'Guardar',
  cancel: 'Cancelar',
  edit: 'Editar',
  delete: 'Eliminar',
  
  // Education Form
  addEducation: 'Añadir educación',
  institution: 'Institución',
  degree: 'Título',
  fieldOfStudy: 'Campo de estudio',
  
  // Skills Form
  addSkill: 'Añadir habilidad',
  skillName: 'Nombre de la habilidad',
  skillLevel: 'Nivel',
  beginner: 'Principiante',
  intermediate: 'Intermedio',
  advanced: 'Avanzado',
  expert: 'Experto',
  
  // Template Selector
  selectTemplate: 'Seleccionar plantilla',
  modernTemplate: 'Moderno',
  classicTemplate: 'Clásico',
  creativeTemplate: 'Creativo',
  
  // Export Options
  printPDF: 'Imprimir PDF',
  exportPDF: 'Exportar PDF',
  exportTXT: 'Exportar TXT',
  saveDraft: 'Guardar borrador',
  loadDraft: 'Cargar borrador',
  
  // Validation
  required: 'Obligatorio',
  invalidEmail: 'Dirección de correo electrónico inválida',
  invalidPhone: 'Número de teléfono inválido',
  
  // Notifications
  draftSaved: '¡Borrador guardado con éxito!',
  draftLoaded: '¡Borrador cargado con éxito!',
  invalidDraftFile: '¡Archivo de borrador inválido!',
  
  // Tips
  nameTip: 'Use su nombre legal completo',
  emailTip: 'Use una dirección de correo electrónico profesional',
  phoneTip: 'Incluya el código de país si está aplicando internacionalmente',
  addressTip: 'Ciudad y país son suficientes para la mayoría de las aplicaciones',
  titleTip: 'Ej.: "Ingeniero de Software Senior" o "Especialista en Marketing"',
  summaryTip: 'Breve descripción de su experiencia profesional y fortalezas clave (3-5 frases)',
  companyTip: 'Incluya el nombre de la empresa y departamento si es relevante',
  jobTitleTip: 'Sea específico sobre su rol',
  descriptionTip: 'Concéntrese en logros y resultados cuantificables',
  institutionTip: 'Incluya el nombre completo de la institución',
  degreeTip: 'Ej.: "Licenciatura en Ciencias" o "Maestría en Artes"',
  fieldTip: 'Ej.: "Informática" o "Administración de Empresas"',
  skillTip: 'Incluya habilidades técnicas y blandas relevantes para el puesto',
};

// Initialize i18next
i18n
  .use(initReactI18next)
  .init({
    resources: {
      en: { translation: enTranslations },
      pt: { translation: ptTranslations },
      es: { translation: esTranslations }
    },
    lng: 'pt', // Default language
    fallbackLng: 'en',
    interpolation: {
      escapeValue: false // React already escapes values
    }
  });

export default i18n;