import { pgTable, serial, varchar, text, timestamp, integer, jsonb, boolean, decimal } from 'drizzle-orm/pg-core';

export const profiles = pgTable('profiles', {
  id: serial('id').primaryKey(),
  email: varchar('email', { length: 255 }).notNull().unique(),
  name: varchar('name', { length: 255 }).notNull(),
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
  name: varchar('name', { length: 255 }).notNull(),
  stream: varchar('stream', { length: 255 }).notNull(),
  grade: varchar('grade', { length: 50 }).notNull(),
  degree: varchar('degree', { length: 255 }).notNull(),
  startDate: varchar('start_date'),
  endDate: varchar('end_date'),
  createdAt: timestamp('created_at').defaultNow(),
  updatedAt: timestamp('updated_at').defaultNow(),
});

export const skills = pgTable('skills', {
  id: serial('id').primaryKey(),
  name: varchar('name', { length: 255 }).notNull(),
  proficiency: integer('proficiency').notNull(),
  icon: varchar('icon', { length: 500 }),
  category: varchar('category', { length: 100 }),
  createdAt: timestamp('created_at').defaultNow(),
  updatedAt: timestamp('updated_at').defaultNow(),
});

export const experiences = pgTable('experiences', {
  id: serial('id').primaryKey(),
  organizationName: varchar('organization_name', { length: 255 }).notNull(),
  organizationImage: varchar('organization_image', { length: 500 }),
  role: varchar('role', { length: 255 }).notNull(),
  description: text('description').notNull(),
  startDate: timestamp('start_date').notNull(),
  endDate: timestamp('end_date'),
  type: varchar('type', { length: 50 }).notNull(),
  createdAt: timestamp('created_at').defaultNow(),
  updatedAt: timestamp('updated_at').defaultNow(),
});

export const projects = pgTable('projects', {
  id: serial('id').primaryKey(),
  name: varchar('name', { length: 255 }).notNull(),
  type: varchar('type', { length: 50 }).notNull(),
  image: varchar('image', { length: 500 }),
  description: text('description').notNull(),
  githubLinks: jsonb('github_links').notNull(),
  projectLinks: jsonb('project_links').notNull(),
  technologies: jsonb('technologies'),
  startDate: timestamp('start_date'),
  endDate: timestamp('end_date'),
  createdAt: timestamp('created_at').defaultNow(),
  updatedAt: timestamp('updated_at').defaultNow(),
});

export const contacts = pgTable('contacts', {
  id: serial('id').primaryKey(),
  name: varchar('name', { length: 255 }).notNull(),
  email: varchar('email', { length: 255 }).notNull(),
  message: text('message'),
  isRead: boolean('is_read').default(false),
  createdAt: timestamp('created_at').defaultNow(),
});