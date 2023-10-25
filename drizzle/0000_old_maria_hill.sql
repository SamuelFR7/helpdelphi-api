CREATE TABLE `tickets` (
	`id` varchar(191) NOT NULL,
	`date` date NOT NULL,
	`client_id` varchar(191) NOT NULL,
	`subject` varchar(191) NOT NULL,
	`criticality` varchar(191) NOT NULL,
	`status` enum('OPEN','CLOSED') NOT NULL,
	CONSTRAINT `tickets_id` PRIMARY KEY(`id`)
);
--> statement-breakpoint
CREATE TABLE `users` (
	`id` varchar(191) NOT NULL,
	`name` varchar(191) NOT NULL,
	`company` varchar(191) NOT NULL,
	`email` varchar(191) NOT NULL,
	`document` varchar(191) NOT NULL,
	`phone` varchar(11) NOT NULL,
	`role` enum('TECNICO','CLIENTE') NOT NULL,
	`username` varchar(191) NOT NULL,
	`password` varchar(191) NOT NULL,
	CONSTRAINT `users_id` PRIMARY KEY(`id`),
	CONSTRAINT `users_username_unique` UNIQUE(`username`)
);
--> statement-breakpoint
ALTER TABLE `tickets` ADD CONSTRAINT `tickets_client_id_users_id_fk` FOREIGN KEY (`client_id`) REFERENCES `users`(`id`) ON DELETE no action ON UPDATE no action;