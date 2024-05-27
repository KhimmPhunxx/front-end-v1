
INSERT INTO `permission`(`name`, `code`, `group`)
VALUES 
('Create' , 'create.laptop', 'laptop'),
('Read' , 'read.laptop', 'laptop'),
('Update' , 'update.laptop', 'laptop'),
('Delete' , 'delete.laptop', 'laptop')



INSERT INTO `role_permission`(`role_id`, `permission_id`) 
VALUES 
(1 ,33),
(1 ,34),
(1 ,35),
(1 ,35)


INSERT INTO `permission`(`name`, `code`, `group`)
VALUES 
('Create' , 'create.categorylt', 'laptop_category'),

