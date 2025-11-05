"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.contacts = exports.projects = exports.experiences = exports.skills = exports.education = exports.profiles = void 0;
const pg_core_1 = require("drizzle-orm/pg-core");
exports.profiles = (0, pg_core_1.pgTable)('profiles', {
    id: (0, pg_core_1.serial)('id').primaryKey(),
    email: (0, pg_core_1.varchar)('email').notNull().unique(),
    name: (0, pg_core_1.varchar)('name').notNull(),
    phoneNumber: (0, pg_core_1.varchar)('phone_number', { length: 20 }),
    address: (0, pg_core_1.text)('address'),
    bio: (0, pg_core_1.text)('bio'),
    location: (0, pg_core_1.varchar)('location'),
    website: (0, pg_core_1.varchar)('website'),
    linkedinUrl: (0, pg_core_1.varchar)('linkedin_url'),
    githubUrl: (0, pg_core_1.varchar)('github_url'),
    twitterUrl: (0, pg_core_1.varchar)('twitter_url'),
    profileImage: (0, pg_core_1.varchar)('profile_image'),
    resume: (0, pg_core_1.varchar)('resume'),
    createdAt: (0, pg_core_1.timestamp)('created_at').defaultNow(),
    updatedAt: (0, pg_core_1.timestamp)('updated_at').defaultNow(),
});
exports.education = (0, pg_core_1.pgTable)('education', {
    id: (0, pg_core_1.serial)('id').primaryKey(),
    name: (0, pg_core_1.varchar)('name').notNull(),
    stream: (0, pg_core_1.varchar)('stream').notNull(),
    grade: (0, pg_core_1.varchar)('grade', { length: 50 }).notNull(),
    degree: (0, pg_core_1.varchar)('degree').notNull(),
    startDate: (0, pg_core_1.varchar)('start_date'),
    endDate: (0, pg_core_1.varchar)('end_date'),
    createdAt: (0, pg_core_1.timestamp)('created_at').defaultNow(),
    updatedAt: (0, pg_core_1.timestamp)('updated_at').defaultNow(),
});
exports.skills = (0, pg_core_1.pgTable)('skills', {
    id: (0, pg_core_1.serial)('id').primaryKey(),
    name: (0, pg_core_1.varchar)('name').notNull(),
    proficiency: (0, pg_core_1.integer)('proficiency').notNull(),
    icon: (0, pg_core_1.varchar)('icon', { length: 500 }),
    category: (0, pg_core_1.varchar)('category', { length: 100 }),
    createdAt: (0, pg_core_1.timestamp)('created_at').defaultNow(),
    updatedAt: (0, pg_core_1.timestamp)('updated_at').defaultNow(),
});
exports.experiences = (0, pg_core_1.pgTable)('experiences', {
    id: (0, pg_core_1.serial)('id').primaryKey(),
    organizationName: (0, pg_core_1.varchar)('organization_name').notNull(),
    organizationImage: (0, pg_core_1.varchar)('organization_image', { length: 500 }),
    role: (0, pg_core_1.varchar)('role').notNull(),
    description: (0, pg_core_1.text)('description').notNull(),
    startDate: (0, pg_core_1.varchar)('start_date').notNull(),
    endDate: (0, pg_core_1.varchar)('end_date'),
    type: (0, pg_core_1.varchar)('type').notNull(),
    createdAt: (0, pg_core_1.timestamp)('created_at').defaultNow(),
    updatedAt: (0, pg_core_1.timestamp)('updated_at').defaultNow(),
});
exports.projects = (0, pg_core_1.pgTable)('projects', {
    id: (0, pg_core_1.serial)('id').primaryKey(),
    name: (0, pg_core_1.varchar)('name').notNull(),
    type: (0, pg_core_1.varchar)('type').notNull(),
    image: (0, pg_core_1.varchar)('image', { length: 500 }),
    description: (0, pg_core_1.text)('description').notNull(),
    githubLinks: (0, pg_core_1.jsonb)('github_links').notNull(),
    projectLinks: (0, pg_core_1.jsonb)('project_links').notNull(),
    technologies: (0, pg_core_1.jsonb)('technologies'),
    startDate: (0, pg_core_1.varchar)('start_date'),
    endDate: (0, pg_core_1.varchar)('end_date'),
    createdAt: (0, pg_core_1.timestamp)('created_at').defaultNow(),
    updatedAt: (0, pg_core_1.timestamp)('updated_at').defaultNow(),
});
exports.contacts = (0, pg_core_1.pgTable)('contacts', {
    id: (0, pg_core_1.serial)('id').primaryKey(),
    name: (0, pg_core_1.varchar)('name').notNull(),
    email: (0, pg_core_1.varchar)('email').notNull(),
    message: (0, pg_core_1.text)('message'),
    isRead: (0, pg_core_1.boolean)('is_read').default(false),
    createdAt: (0, pg_core_1.timestamp)('created_at').defaultNow(),
});
