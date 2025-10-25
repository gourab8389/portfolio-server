export interface AdminLoginRequest {
  email: string;
  password: string;
}

export interface ContactRequest {
  name: string;
  email: string;
  message?: string;
}

export interface ProjectLink {
  name: string;
  url: string;
}

export interface CreateProfileRequest {
  email: string;
  name: string;
  phoneNumber?: string;
  address?: string;
  bio?: string;
  location?: string;
  website?: string;
  linkedinUrl?: string;
  githubUrl?: string;
  twitterUrl?: string;
  profileImage?: string;
  resume?: string;
}

export interface CreateEducationRequest {
  name: string;
  stream: string;
  grade: string;
  degree: string;
  startDate?: string;
  endDate?: string;
}

export interface CreateSkillRequest {
  name: string;
  proficiency: number;
  icon?: string;
  category?: string;
}

export interface CreateExperienceRequest {
  organizationName: string;
  organizationImage?: string;
  role: string;
  description: string;
  startDate: Date;
  endDate?: Date;
  type: 'organization' | 'internship' | 'college_event';
}

export interface CreateProjectRequest {
  name: string;
  type: 'personal' | 'client' | 'academic' | 'internship';
  image?: string;
  description: string;
  githubLinks: ProjectLink[];
  projectLinks: ProjectLink[];
  technologies?: string[];
  startDate?: Date;
  endDate?: Date;
}

export type ProjectType = 'personal' | 'client' | 'academic' | 'internship';
export type ExperienceType = 'organization' | 'internship' | 'college_event';