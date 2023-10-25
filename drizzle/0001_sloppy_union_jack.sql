ALTER TABLE `tickets` RENAME COLUMN `date` TO `created_at`;--> statement-breakpoint
ALTER TABLE `tickets` MODIFY COLUMN `created_at` timestamp NOT NULL DEFAULT (now());--> statement-breakpoint
ALTER TABLE `tickets` ADD `updated_at` timestamp NOT NULL ON UPDATE CURRENT_TIMESTAMP;