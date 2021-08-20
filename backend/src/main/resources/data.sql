INSERT INTO tb_user (name, email, password) VALUES ('Steve', 'steve@gmail.com', '$2y$12$wgBjsT.juFAaNekT2Ew5D.vro7GsQzpD68Mgf2olZ4obuuKmjDECC');
INSERT INTO tb_user (name, email, password) VALUES ('Stephanie', 'stephanie@gmail.com', '$2y$12$wXWkVqb1UypvmVdUCQ88b.cKrsP59bbjol5Wx4.2Uxvb/7kbFUekq');

INSERT INTO tb_role (authority) VALUES ('ROLE_USER');
INSERT INTO tb_role (authority) VALUES ('ROLE_ADMIN');

INSERT INTO tb_user_role (user_id, role_id) VALUES (1, 1);
INSERT INTO tb_user_role (user_id, role_id) VALUES (2, 2);