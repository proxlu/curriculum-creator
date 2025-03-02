// Types for the resume generator

export type Template = 'modern' | 'classic' | 'creative';

export interface PersonalInfo {
  fullName: string;
  email: string;
  phone: string;
  address: string;
  profilePicture: string | null;
  title: string;
  summary: string;
}

export interface Experience {
  id?: string;
  company: string;
  jobTitle: string;
  location: string;
  startDate: string;
  endDate: string;
  current: boolean;
  description: string;
}

export interface Education {
  id?: string;
  institution: string;
  degree: string;
  fieldOfStudy: string;
  location: string;
  startDate: string;
  endDate: string;
  current: boolean;
  description: string;
}

export interface Skill {
  id?: string;
  name: string;
  level: number; // 1-5
}

export interface ResumeData {
  personalInfo: PersonalInfo;
  experiences: Experience[];
  education: Education[];
  skills: Skill[];
}