import { pgTable, serial, varchar, text, timestamp, integer, jsonb, boolean, decimal } from 'drizzle-orm/pg-core';

export const profiles = pgTable('profiles', {
  id: serial('id').primaryKey(),
  email: varchar('email').notNull().unique(),
  name: varchar('name').notNull(),
  phoneNumber: varchar('phone_number', { length: 20 }),
  address: text('address'),
  bio: text('bio'),
  location: varchar('location'),
  website: varchar('website'),
  linkedinUrl: varchar('linkedin_url'),
  githubUrl: varchar('github_url'),
  twitterUrl: varchar('twitter_url'),
  profileImage: varchar('profile_image'),
  resume: varchar('resume'),
  createdAt: timestamp('created_at').defaultNow(),
  updatedAt: timestamp('updated_at').defaultNow(),
});

export const education = pgTable('education', {
  id: serial('id').primaryKey(),
  name: varchar('name').notNull(),
  stream: varchar('stream').notNull(),
  grade: varchar('grade', { length: 50 }).notNull(),
  degree: varchar('degree').notNull(),
  startDate: varchar('start_date'),
  endDate: varchar('end_date'),
  createdAt: timestamp('created_at').defaultNow(),
  updatedAt: timestamp('updated_at').defaultNow(),
});

export const skills = pgTable('skills', {
  id: serial('id').primaryKey(),
  name: varchar('name').notNull(),
  proficiency: varchar('proficiency'),
  category: varchar('category'),
  createdAt: timestamp('created_at').defaultNow(),
  updatedAt: timestamp('updated_at').defaultNow(),
});

export const experiences = pgTable('experiences', {
  id: serial('id').primaryKey(),
  organizationName: varchar('organization_name').notNull(),
  organizationImage: varchar('organization_image', { length: 500 }),
  role: varchar('role').notNull(),
  description: text('description').notNull(),
  startDate: varchar('start_date').notNull(),
  endDate: varchar('end_date'),
  type: varchar('type').notNull(),
  createdAt: timestamp('created_at').defaultNow(),
  updatedAt: timestamp('updated_at').defaultNow(),
});

export const projects = pgTable('projects', {
  id: serial('id').primaryKey(),
  name: varchar('name').notNull(),
  type: varchar('type').notNull(),
  image: varchar('image'),
  description: text('description').notNull(),
  githubLinks: jsonb('github_links'),
  isPublic: boolean('is_public').default(true),
  projectLinks: jsonb('project_links'),
  hasDeployedLink: boolean('has_deployed_link').default(false),
  technologies: jsonb('technologies'),
  startDate: varchar('start_date'),
  endDate: varchar('end_date'),
  createdAt: timestamp('created_at').defaultNow(),
  updatedAt: timestamp('updated_at').defaultNow(),
});

export const contacts = pgTable('contacts', {
  id: serial('id').primaryKey(),
  name: varchar('name').notNull(),
  email: varchar('email').notNull(),
  message: text('message'),
  isRead: boolean('is_read').default(false),
  createdAt: timestamp('created_at').defaultNow(),
});