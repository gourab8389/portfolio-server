export interface AdminLoginRequest {
  email: string;
  password: string;
}

export interface ContactRequest {
  name: string;
  email: string;
  message?: string;
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
  proficiency: string;
  category?: string;
}

export interface CreateExperienceRequest {
  organizationName: string;
  organizationImage?: string;
  role: string;
  description: string;
  startDate: string;
  endDate?: string;
  type: ExperienceType;
}

export interface CreateProjectRequest {
  name: string;
  type: ProjectType;
  image?: string;
  description: string;
  githubLinks?: string[];
  isPublic?: boolean;
  projectLinks?: string[];
  hasDeployedLink?: boolean;
  technologies?: string[];
  startDate?: string;
  endDate?: string;
}

export type ProjectType = 'personal' | 'client' | 'academic' | 'internship' | 'freelance' | 'open_source' | 'company';
export type ExperienceType = 'organization' | 'internship' | 'college_event' | 'freelance' | 'full_time';