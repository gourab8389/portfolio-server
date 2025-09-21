import { Request, Response } from 'express';
import { db } from '../config/database';
import { profiles, education, skills, experiences, projects } from '../models/schema';
import { eq } from 'drizzle-orm';
import {
  CreateProfileRequest,
  CreateEducationRequest,
  CreateSkillRequest,
  CreateExperienceRequest,
  CreateProjectRequest,
} from '../types';

export class PortfolioController {
  // Profile Controllers
  static async createProfile(req: Request, res: Response) {
    try {
      const profileData: CreateProfileRequest = req.body;
      
      const [profile] = await db.insert(profiles).values({
        ...profileData,
        updatedAt: new Date(),
      }).returning();

      res.status(201).json({
        success: true,
        message: 'Profile created successfully',
        data: profile,
      });
    } catch (error) {
      console.error('Create profile error:', error);
      res.status(500).json({
        success: false,
        message: 'Internal server error',
      });
    }
  }

  static async getProfile(req: Request, res: Response) {
    try {
      const [profile] = await db.select().from(profiles).limit(1);

      res.json({
        success: true,
        message: 'Profile fetched successfully',
        data: profile || null,
      });
    } catch (error) {
      console.error('Get profile error:', error);
      res.status(500).json({
        success: false,
        message: 'Internal server error',
      });
    }
  }

  static async updateProfile(req: Request, res: Response) {
    try {
      const { id } = req.params;
      const profileData: Partial<CreateProfileRequest> = req.body;

      const [updatedProfile] = await db
        .update(profiles)
        .set({
          ...profileData,
          updatedAt: new Date(),
        })
        .where(eq(profiles.id, parseInt(id)))
        .returning();

      if (!updatedProfile) {
        return res.status(404).json({
          success: false,
          message: 'Profile not found',
        });
      }

      res.json({
        success: true,
        message: 'Profile updated successfully',
        data: updatedProfile,
      });
    } catch (error) {
      console.error('Update profile error:', error);
      res.status(500).json({
        success: false,
        message: 'Internal server error',
      });
    }
  }

  // Education Controllers
  static async createEducation(req: Request, res: Response) {
    try {
      const educationData: CreateEducationRequest = req.body;
      
      const [newEducation] = await db.insert(education).values({
        ...educationData,
        updatedAt: new Date(),
      }).returning();

      res.status(201).json({
        success: true,
        message: 'Education created successfully',
        data: newEducation,
      });
    } catch (error) {
      console.error('Create education error:', error);
      res.status(500).json({
        success: false,
        message: 'Internal server error',
      });
    }
  }

  static async getEducation(req: Request, res: Response) {
    try {
      const educationList = await db.select().from(education).orderBy(education.startDate);

      res.json({
        success: true,
        message: 'Education fetched successfully',
        data: educationList,
      });
    } catch (error) {
      console.error('Get education error:', error);
      res.status(500).json({
        success: false,
        message: 'Internal server error',
      });
    }
  }

  static async updateEducation(req: Request, res: Response) {
    try {
      const { id } = req.params;
      const educationData: Partial<CreateEducationRequest> = req.body;

      const [updatedEducation] = await db
        .update(education)
        .set({
          ...educationData,
          updatedAt: new Date(),
        })
        .where(eq(education.id, parseInt(id)))
        .returning();

      if (!updatedEducation) {
        return res.status(404).json({
          success: false,
          message: 'Education not found',
        });
      }

      res.json({
        success: true,
        message: 'Education updated successfully',
        data: updatedEducation,
      });
    } catch (error) {
      console.error('Update education error:', error);
      res.status(500).json({
        success: false,
        message: 'Internal server error',
      });
    }
  }

  static async deleteEducation(req: Request, res: Response) {
    try {
      const { id } = req.params;

      const [deletedEducation] = await db
        .delete(education)
        .where(eq(education.id, parseInt(id)))
        .returning();

      if (!deletedEducation) {
        return res.status(404).json({
          success: false,
          message: 'Education not found',
        });
      }

      res.json({
        success: true,
        message: 'Education deleted successfully',
      });
    } catch (error) {
      console.error('Delete education error:', error);
      res.status(500).json({
        success: false,
        message: 'Internal server error',
      });
    }
  }

  // Skills Controllers
  static async createSkill(req: Request, res: Response) {
    try {
      const skillData: CreateSkillRequest = req.body;
      
      const [newSkill] = await db.insert(skills).values({
        ...skillData,
        updatedAt: new Date(),
      }).returning();

      res.status(201).json({
        success: true,
        message: 'Skill created successfully',
        data: newSkill,
      });
    } catch (error) {
      console.error('Create skill error:', error);
      res.status(500).json({
        success: false,
        message: 'Internal server error',
      });
    }
  }

  static async getSkills(req: Request, res: Response) {
    try {
      const skillsList = await db.select().from(skills).orderBy(skills.proficiency);

      res.json({
        success: true,
        message: 'Skills fetched successfully',
        data: skillsList,
      });
    } catch (error) {
      console.error('Get skills error:', error);
      res.status(500).json({
        success: false,
        message: 'Internal server error',
      });
    }
  }

  static async updateSkill(req: Request, res: Response) {
    try {
      const { id } = req.params;
      const skillData: Partial<CreateSkillRequest> = req.body;

      const [updatedSkill] = await db
        .update(skills)
        .set({
          ...skillData,
          updatedAt: new Date(),
        })
        .where(eq(skills.id, parseInt(id)))
        .returning();

      if (!updatedSkill) {
        return res.status(404).json({
          success: false,
          message: 'Skill not found',
        });
      }

      res.json({
        success: true,
        message: 'Skill updated successfully',
        data: updatedSkill,
      });
    } catch (error) {
      console.error('Update skill error:', error);
      res.status(500).json({
        success: false,
        message: 'Internal server error',
      });
    }
  }

  static async deleteSkill(req: Request, res: Response) {
    try {
      const { id } = req.params;

      const [deletedSkill] = await db
        .delete(skills)
        .where(eq(skills.id, parseInt(id)))
        .returning();

      if (!deletedSkill) {
        return res.status(404).json({
          success: false,
          message: 'Skill not found',
        });
      }

      res.json({
        success: true,
        message: 'Skill deleted successfully',
      });
    } catch (error) {
      console.error('Delete skill error:', error);
      res.status(500).json({
        success: false,
        message: 'Internal server error',
      });
    }
  }

  // Experience Controllers
  static async createExperience(req: Request, res: Response) {
    try {
      const experienceData: CreateExperienceRequest = req.body;
      
      const [newExperience] = await db.insert(experiences).values({
        ...experienceData,
        updatedAt: new Date(),
      }).returning();

      res.status(201).json({
        success: true,
        message: 'Experience created successfully',
        data: newExperience,
      });
    } catch (error) {
      console.error('Create experience error:', error);
      res.status(500).json({
        success: false,
        message: 'Internal server error',
      });
    }
  }

  static async getExperiences(req: Request, res: Response) {
    try {
      const experiencesList = await db.select().from(experiences).orderBy(experiences.startDate);

      res.json({
        success: true,
        message: 'Experiences fetched successfully',
        data: experiencesList,
      });
    } catch (error) {
      console.error('Get experiences error:', error);
      res.status(500).json({
        success: false,
        message: 'Internal server error',
      });
    }
  }

  static async updateExperience(req: Request, res: Response) {
    try {
      const { id } = req.params;
      const experienceData: Partial<CreateExperienceRequest> = req.body;

      const [updatedExperience] = await db
        .update(experiences)
        .set({
          ...experienceData,
          updatedAt: new Date(),
        })
        .where(eq(experiences.id, parseInt(id)))
        .returning();

      if (!updatedExperience) {
        return res.status(404).json({
          success: false,
          message: 'Experience not found',
        });
      }

      res.json({
        success: true,
        message: 'Experience updated successfully',
        data: updatedExperience,
      });
    } catch (error) {
      console.error('Update experience error:', error);
      res.status(500).json({
        success: false,
        message: 'Internal server error',
      });
    }
  }

  static async deleteExperience(req: Request, res: Response) {
    try {
      const { id } = req.params;

      const [deletedExperience] = await db
        .delete(experiences)
        .where(eq(experiences.id, parseInt(id)))
        .returning();

      if (!deletedExperience) {
        return res.status(404).json({
          success: false,
          message: 'Experience not found',
        });
      }

      res.json({
        success: true,
        message: 'Experience deleted successfully',
      });
    } catch (error) {
      console.error('Delete experience error:', error);
      res.status(500).json({
        success: false,
        message: 'Internal server error',
      });
    }
  }

  // Project Controllers
  static async createProject(req: Request, res: Response) {
    try {
      const projectData: CreateProjectRequest = req.body;
      
      const [newProject] = await db.insert(projects).values({
        ...projectData,
        updatedAt: new Date(),
      }).returning();

      res.status(201).json({
        success: true,
        message: 'Project created successfully',
        data: newProject,
      });
    } catch (error) {
      console.error('Create project error:', error);
      res.status(500).json({
        success: false,
        message: 'Internal server error',
      });
    }
  }

  static async getProjects(req: Request, res: Response) {
    try {
      const { type } = req.query;
      let projectsList;

      if (type) {
        projectsList = await db.select().from(projects).where(eq(projects.type, type as string)).orderBy(projects.startDate);
      } else {
        projectsList = await db.select().from(projects).orderBy(projects.startDate);
      }

      res.json({
        success: true,
        message: 'Projects fetched successfully',
        data: projectsList,
      });
    } catch (error) {
      console.error('Get projects error:', error);
      res.status(500).json({
        success: false,
        message: 'Internal server error',
      });
    }
  }

  static async getProjectById(req: Request, res: Response) {
    try {
      const { id } = req.params;

      const [project] = await db.select().from(projects).where(eq(projects.id, parseInt(id)));

      if (!project) {
        return res.status(404).json({
          success: false,
          message: 'Project not found',
        });
      }

      res.json({
        success: true,
        message: 'Project fetched successfully',
        data: project,
      });
    } catch (error) {
      console.error('Get project by id error:', error);
      res.status(500).json({
        success: false,
        message: 'Internal server error',
      });
    }
  }

  static async updateProject(req: Request, res: Response) {
    try {
      const { id } = req.params;
      const projectData: Partial<CreateProjectRequest> = req.body;

      const [updatedProject] = await db
        .update(projects)
        .set({
          ...projectData,
          updatedAt: new Date(),
        })
        .where(eq(projects.id, parseInt(id)))
        .returning();

      if (!updatedProject) {
        return res.status(404).json({
          success: false,
          message: 'Project not found',
        });
      }

      res.json({
        success: true,
        message: 'Project updated successfully',
        data: updatedProject,
      });
    } catch (error) {
      console.error('Update project error:', error);
      res.status(500).json({
        success: false,
        message: 'Internal server error',
      });
    }
  }

  static async deleteProject(req: Request, res: Response) {
    try {
      const { id } = req.params;

      const [deletedProject] = await db
        .delete(projects)
        .where(eq(projects.id, parseInt(id)))
        .returning();

      if (!deletedProject) {
        return res.status(404).json({
          success: false,
          message: 'Project not found',
        });
      }

      res.json({
        success: true,
        message: 'Project deleted successfully',
      });
    } catch (error) {
      console.error('Delete project error:', error);
      res.status(500).json({
        success: false,
        message: 'Internal server error',
      });
    }
  }

  // Get all portfolio data (public endpoint)
  static async getPortfolioData(req: Request, res: Response) {
    try {
      const [profile] = await db.select().from(profiles).limit(1);
      const educationList = await db.select().from(education).orderBy(education.startDate);
      const skillsList = await db.select().from(skills).orderBy(skills.proficiency);
      const experiencesList = await db.select().from(experiences).orderBy(experiences.startDate);
      const projectsList = await db.select().from(projects).orderBy(projects.startDate);

      res.json({
        success: true,
        message: 'Portfolio data fetched successfully',
        data: {
          profile: profile || null,
          education: educationList,
          skills: skillsList,
          experiences: experiencesList,
          projects: projectsList,
        },
      });
    } catch (error) {
      console.error('Get portfolio data error:', error);
      res.status(500).json({
        success: false,
        message: 'Internal server error',
        });
    }
  }
}