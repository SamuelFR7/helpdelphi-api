CREATE TABLE `users` (
	`id` int AUTO_INCREMENT NOT NULL,
	`name` varchar(191) NOT NULL,
	`company` varchar(191) NOT NULL,
	`email` varchar(191) NOT NULL,
	`document` varchar(191) NOT NULL,
	`phone` varchar(11) NOT NULL,
	`role` enum('TECNICO','CLIENTE') NOT NULL,
	`username` varchar(191) NOT NULL,
	`password` varchar(191) NOT NULL,
	CONSTRAINT `users_id` PRIMARY KEY(`id`)
);
