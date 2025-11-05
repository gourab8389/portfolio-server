"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.PortfolioController = void 0;
const database_1 = require("../config/database");
const schema_1 = require("../models/schema");
const drizzle_orm_1 = require("drizzle-orm");
class PortfolioController {
    static async createProfile(req, res) {
        try {
            const profileData = req.body;
            const [profile] = await database_1.db.insert(schema_1.profiles).values({
                ...profileData,
                updatedAt: new Date(),
            }).returning();
            res.status(201).json({
                success: true,
                message: 'Profile created successfully',
                data: profile,
            });
        }
        catch (error) {
            console.error('Create profile error:', error);
            res.status(500).json({
                success: false,
                message: 'Internal server error',
            });
        }
    }
    static async getProfile(req, res) {
        try {
            const [profile] = await database_1.db.select().from(schema_1.profiles).limit(1);
            res.json({
                success: true,
                message: 'Profile fetched successfully',
                data: profile || null,
            });
        }
        catch (error) {
            console.error('Get profile error:', error);
            res.status(500).json({
                success: false,
                message: 'Internal server error',
            });
        }
    }
    static async updateProfile(req, res) {
        try {
            const { id } = req.params;
            const profileData = req.body;
            const [updatedProfile] = await database_1.db
                .update(schema_1.profiles)
                .set({
                ...profileData,
                updatedAt: new Date(),
            })
                .where((0, drizzle_orm_1.eq)(schema_1.profiles.id, parseInt(id)))
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
        }
        catch (error) {
            console.error('Update profile error:', error);
            res.status(500).json({
                success: false,
                message: 'Internal server error',
            });
        }
    }
    static async createEducation(req, res) {
        try {
            const educationData = req.body;
            const [newEducation] = await database_1.db.insert(schema_1.education).values({
                ...educationData,
                updatedAt: new Date(),
            }).returning();
            res.status(201).json({
                success: true,
                message: 'Education created successfully',
                data: newEducation,
            });
        }
        catch (error) {
            console.error('Create education error:', error);
            res.status(500).json({
                success: false,
                message: 'Internal server error',
            });
        }
    }
    static async getEducation(req, res) {
        try {
            const educationList = await database_1.db.select().from(schema_1.education).orderBy(schema_1.education.startDate);
            res.json({
                success: true,
                message: 'Education fetched successfully',
                data: educationList,
            });
        }
        catch (error) {
            console.error('Get education error:', error);
            res.status(500).json({
                success: false,
                message: 'Internal server error',
            });
        }
    }
    static async updateEducation(req, res) {
        try {
            const { id } = req.params;
            const educationData = req.body;
            const [updatedEducation] = await database_1.db
                .update(schema_1.education)
                .set({
                ...educationData,
                updatedAt: new Date(),
            })
                .where((0, drizzle_orm_1.eq)(schema_1.education.id, parseInt(id)))
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
        }
        catch (error) {
            console.error('Update education error:', error);
            res.status(500).json({
                success: false,
                message: 'Internal server error',
            });
        }
    }
    static async deleteEducation(req, res) {
        try {
            const { id } = req.params;
            const [deletedEducation] = await database_1.db
                .delete(schema_1.education)
                .where((0, drizzle_orm_1.eq)(schema_1.education.id, parseInt(id)))
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
        }
        catch (error) {
            console.error('Delete education error:', error);
            res.status(500).json({
                success: false,
                message: 'Internal server error',
            });
        }
    }
    static async createSkill(req, res) {
        try {
            const skillData = req.body;
            const [newSkill] = await database_1.db.insert(schema_1.skills).values({
                ...skillData,
                updatedAt: new Date(),
            }).returning();
            res.status(201).json({
                success: true,
                message: 'Skill created successfully',
                data: newSkill,
            });
        }
        catch (error) {
            console.error('Create skill error:', error);
            res.status(500).json({
                success: false,
                message: 'Internal server error',
            });
        }
    }
    static async getSkills(req, res) {
        try {
            const skillsList = await database_1.db.select().from(schema_1.skills).orderBy(schema_1.skills.proficiency);
            res.json({
                success: true,
                message: 'Skills fetched successfully',
                data: skillsList,
            });
        }
        catch (error) {
            console.error('Get skills error:', error);
            res.status(500).json({
                success: false,
                message: 'Internal server error',
            });
        }
    }
    static async updateSkill(req, res) {
        try {
            const { id } = req.params;
            const skillData = req.body;
            const [updatedSkill] = await database_1.db
                .update(schema_1.skills)
                .set({
                ...skillData,
                updatedAt: new Date(),
            })
                .where((0, drizzle_orm_1.eq)(schema_1.skills.id, parseInt(id)))
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
        }
        catch (error) {
            console.error('Update skill error:', error);
            res.status(500).json({
                success: false,
                message: 'Internal server error',
            });
        }
    }
    static async deleteSkill(req, res) {
        try {
            const { id } = req.params;
            const [deletedSkill] = await database_1.db
                .delete(schema_1.skills)
                .where((0, drizzle_orm_1.eq)(schema_1.skills.id, parseInt(id)))
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
        }
        catch (error) {
            console.error('Delete skill error:', error);
            res.status(500).json({
                success: false,
                message: 'Internal server error',
            });
        }
    }
    static async createExperience(req, res) {
        try {
            const experienceData = req.body;
            const [newExperience] = await database_1.db.insert(schema_1.experiences).values({
                ...experienceData,
                updatedAt: new Date(),
            }).returning();
            res.status(201).json({
                success: true,
                message: 'Experience created successfully',
                data: newExperience,
            });
        }
        catch (error) {
            console.error('Create experience error:', error);
            res.status(500).json({
                success: false,
                message: 'Internal server error',
            });
        }
    }
    static async getExperiences(req, res) {
        try {
            const experiencesList = await database_1.db.select().from(schema_1.experiences).orderBy(schema_1.experiences.startDate);
            res.json({
                success: true,
                message: 'Experiences fetched successfully',
                data: experiencesList,
            });
        }
        catch (error) {
            console.error('Get experiences error:', error);
            res.status(500).json({
                success: false,
                message: 'Internal server error',
            });
        }
    }
    static async updateExperience(req, res) {
        try {
            const { id } = req.params;
            const experienceData = req.body;
            const [updatedExperience] = await database_1.db
                .update(schema_1.experiences)
                .set({
                ...experienceData,
                updatedAt: new Date(),
            })
                .where((0, drizzle_orm_1.eq)(schema_1.experiences.id, parseInt(id)))
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
        }
        catch (error) {
            console.error('Update experience error:', error);
            res.status(500).json({
                success: false,
                message: 'Internal server error',
            });
        }
    }
    static async deleteExperience(req, res) {
        try {
            const { id } = req.params;
            const [deletedExperience] = await database_1.db
                .delete(schema_1.experiences)
                .where((0, drizzle_orm_1.eq)(schema_1.experiences.id, parseInt(id)))
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
        }
        catch (error) {
            console.error('Delete experience error:', error);
            res.status(500).json({
                success: false,
                message: 'Internal server error',
            });
        }
    }
    static async createProject(req, res) {
        try {
            const projectData = req.body;
            const [newProject] = await database_1.db.insert(schema_1.projects).values({
                ...projectData,
                updatedAt: new Date(),
            }).returning();
            res.status(201).json({
                success: true,
                message: 'Project created successfully',
                data: newProject,
            });
        }
        catch (error) {
            console.error('Create project error:', error);
            res.status(500).json({
                success: false,
                message: 'Internal server error',
            });
        }
    }
    static async getProjects(req, res) {
        try {
            const { type } = req.query;
            let projectsList;
            if (type) {
                projectsList = await database_1.db.select().from(schema_1.projects).where((0, drizzle_orm_1.eq)(schema_1.projects.type, type)).orderBy(schema_1.projects.startDate);
            }
            else {
                projectsList = await database_1.db.select().from(schema_1.projects).orderBy(schema_1.projects.startDate);
            }
            res.json({
                success: true,
                message: 'Projects fetched successfully',
                data: projectsList,
            });
        }
        catch (error) {
            console.error('Get projects error:', error);
            res.status(500).json({
                success: false,
                message: 'Internal server error',
            });
        }
    }
    static async getProjectById(req, res) {
        try {
            const { id } = req.params;
            const [project] = await database_1.db.select().from(schema_1.projects).where((0, drizzle_orm_1.eq)(schema_1.projects.id, parseInt(id)));
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
        }
        catch (error) {
            console.error('Get project by id error:', error);
            res.status(500).json({
                success: false,
                message: 'Internal server error',
            });
        }
    }
    static async updateProject(req, res) {
        try {
            const { id } = req.params;
            const projectData = req.body;
            const [updatedProject] = await database_1.db
                .update(schema_1.projects)
                .set({
                ...projectData,
                updatedAt: new Date(),
            })
                .where((0, drizzle_orm_1.eq)(schema_1.projects.id, parseInt(id)))
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
        }
        catch (error) {
            console.error('Update project error:', error);
            res.status(500).json({
                success: false,
                message: 'Internal server error',
            });
        }
    }
    static async deleteProject(req, res) {
        try {
            const { id } = req.params;
            const [deletedProject] = await database_1.db
                .delete(schema_1.projects)
                .where((0, drizzle_orm_1.eq)(schema_1.projects.id, parseInt(id)))
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
        }
        catch (error) {
            console.error('Delete project error:', error);
            res.status(500).json({
                success: false,
                message: 'Internal server error',
            });
        }
    }
    static async getPortfolioData(req, res) {
        try {
            const [profile] = await database_1.db.select().from(schema_1.profiles).limit(1);
            const educationList = await database_1.db.select().from(schema_1.education).orderBy(schema_1.education.startDate);
            const skillsList = await database_1.db.select().from(schema_1.skills).orderBy(schema_1.skills.proficiency);
            const experiencesList = await database_1.db.select().from(schema_1.experiences).orderBy(schema_1.experiences.startDate);
            const projectsList = await database_1.db.select().from(schema_1.projects).orderBy(schema_1.projects.startDate);
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
        }
        catch (error) {
            console.error('Get portfolio data error:', error);
            res.status(500).json({
                success: false,
                message: 'Internal server error',
            });
        }
    }
}
exports.PortfolioController = PortfolioController;
