DO $$ BEGIN
 CREATE TYPE "criticality" AS ENUM('low', 'medium', 'high');
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
DO $$ BEGIN
 CREATE TYPE "role" AS ENUM('client', 'admin', 'technician');
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
DO $$ BEGIN
 CREATE TYPE "status" AS ENUM('waiting', 'in_progress', 'stopped', 'finished');
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "tickets" (
	"id" varchar(191) PRIMARY KEY NOT NULL,
	"client_id" varchar(191) NOT NULL,
	"subject" varchar(191) NOT NULL,
	"criticality" "criticality" NOT NULL,
	"status" "status" NOT NULL,
	"created_at" timestamp DEFAULT now() NOT NULL,
	"updated_at" timestamp
);
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "users" (
	"id" varchar(191) PRIMARY KEY NOT NULL,
	"name" varchar(191) NOT NULL,
	"company" varchar(191) NOT NULL,
	"email" varchar(191) NOT NULL,
	"document" varchar(191) NOT NULL,
	"phone" varchar(11) NOT NULL,
	"role" "role",
	"username" varchar(191) NOT NULL,
	"password" varchar(191) NOT NULL,
	CONSTRAINT "users_username_unique" UNIQUE("username")
);
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "tickets" ADD CONSTRAINT "tickets_client_id_users_id_fk" FOREIGN KEY ("client_id") REFERENCES "users"("id") ON DELETE no action ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
