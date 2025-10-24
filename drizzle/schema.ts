import { pgTable, integer, varchar, text, boolean, timestamp, unique, jsonb, pgSequence } from "drizzle-orm/pg-core"
import { sql } from "drizzle-orm"


export const contactsIdSeq = pgSequence("contacts_id_seq", {  startWith: "1", increment: "1", minValue: "1", maxValue: "2147483647", cache: "1", cycle: false })
export const educationIdSeq = pgSequence("education_id_seq", {  startWith: "1", increment: "1", minValue: "1", maxValue: "2147483647", cache: "1", cycle: false })
export const experiencesIdSeq = pgSequence("experiences_id_seq", {  startWith: "1", increment: "1", minValue: "1", maxValue: "2147483647", cache: "1", cycle: false })
export const profilesIdSeq = pgSequence("profiles_id_seq", {  startWith: "1", increment: "1", minValue: "1", maxValue: "2147483647", cache: "1", cycle: false })
export const projectsIdSeq = pgSequence("projects_id_seq", {  startWith: "1", increment: "1", minValue: "1", maxValue: "2147483647", cache: "1", cycle: false })
export const skillsIdSeq = pgSequence("skills_id_seq", {  startWith: "1", increment: "1", minValue: "1", maxValue: "2147483647", cache: "1", cycle: false })

export const contacts = pgTable("contacts", {
	id: integer().default(sql`nextval('contacts_id_seq'::regclass)`).primaryKey().notNull(),
	name: varchar({ length: 255 }).notNull(),
	email: varchar({ length: 255 }).notNull(),
	message: text(),
	isRead: boolean("is_read").default(false),
	createdAt: timestamp("created_at", { mode: 'string' }).defaultNow(),
});

export const education = pgTable("education", {
	id: integer().default(sql`nextval('education_id_seq'::regclass)`).primaryKey().notNull(),
	name: varchar({ length: 255 }).notNull(),
	stream: varchar({ length: 255 }).notNull(),
	grade: varchar({ length: 50 }).notNull(),
	degree: varchar({ length: 255 }).notNull(),
	startDate: timestamp("start_date", { mode: 'string' }),
	endDate: timestamp("end_date", { mode: 'string' }),
	createdAt: timestamp("created_at", { mode: 'string' }).defaultNow(),
	updatedAt: timestamp("updated_at", { mode: 'string' }).defaultNow(),
});

export const experiences = pgTable("experiences", {
	id: integer().default(sql`nextval('experiences_id_seq'::regclass)`).primaryKey().notNull(),
	organizationName: varchar("organization_name", { length: 255 }).notNull(),
	organizationImage: varchar("organization_image", { length: 500 }),
	role: varchar({ length: 255 }).notNull(),
	description: text().notNull(),
	startDate: timestamp("start_date", { mode: 'string' }).notNull(),
	endDate: timestamp("end_date", { mode: 'string' }),
	type: varchar({ length: 50 }).notNull(),
	createdAt: timestamp("created_at", { mode: 'string' }).defaultNow(),
	updatedAt: timestamp("updated_at", { mode: 'string' }).defaultNow(),
});

export const profiles = pgTable("profiles", {
	id: integer().default(sql`nextval('profiles_id_seq'::regclass)`).primaryKey().notNull(),
	email: varchar({ length: 255 }).notNull(),
	name: varchar({ length: 255 }).notNull(),
	phoneNumber: varchar("phone_number", { length: 20 }),
	address: text(),
	bio: text(),
	createdAt: timestamp("created_at", { mode: 'string' }).defaultNow(),
	updatedAt: timestamp("updated_at", { mode: 'string' }).defaultNow(),
}, (table) => [
	unique("profiles_email_unique").on(table.email),
]);

export const projects = pgTable("projects", {
	id: integer().default(sql`nextval('projects_id_seq'::regclass)`).primaryKey().notNull(),
	name: varchar({ length: 255 }).notNull(),
	type: varchar({ length: 50 }).notNull(),
	image: varchar({ length: 500 }),
	description: text().notNull(),
	githubLinks: jsonb("github_links").notNull(),
	projectLinks: jsonb("project_links").notNull(),
	technologies: jsonb(),
	startDate: timestamp("start_date", { mode: 'string' }),
	endDate: timestamp("end_date", { mode: 'string' }),
	createdAt: timestamp("created_at", { mode: 'string' }).defaultNow(),
	updatedAt: timestamp("updated_at", { mode: 'string' }).defaultNow(),
});

export const skills = pgTable("skills", {
	id: integer().default(sql`nextval('skills_id_seq'::regclass)`).primaryKey().notNull(),
	name: varchar({ length: 255 }).notNull(),
	proficiency: integer().notNull(),
	icon: varchar({ length: 500 }),
	category: varchar({ length: 100 }),
	createdAt: timestamp("created_at", { mode: 'string' }).defaultNow(),
	updatedAt: timestamp("updated_at", { mode: 'string' }).defaultNow(),
});
