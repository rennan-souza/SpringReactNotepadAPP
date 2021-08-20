INSERT INTO tb_user (name, email, password) VALUES ('Steve', 'steve@gmail.com', '$2y$12$wgBjsT.juFAaNekT2Ew5D.vro7GsQzpD68Mgf2olZ4obuuKmjDECC');
INSERT INTO tb_user (name, email, password) VALUES ('Stephanie', 'stephanie@gmail.com', '$2y$12$wXWkVqb1UypvmVdUCQ88b.cKrsP59bbjol5Wx4.2Uxvb/7kbFUekq');

INSERT INTO tb_role (authority) VALUES ('ROLE_USER');
INSERT INTO tb_role (authority) VALUES ('ROLE_ADMIN');

INSERT INTO tb_user_role (user_id, role_id) VALUES (1, 1);
INSERT INTO tb_user_role (user_id, role_id) VALUES (2, 2);

INSERT INTO tb_note(title, content, user_id) VALUES ('Compras', 'Lista de comparas', 1);
INSERT INTO tb_note(title, content, user_id) VALUES ('Curso', 'Estudar aula 1 do curso de Java', 1);
INSERT INTO tb_note(title, content, user_id) VALUES ('Trabalho', 'Criar a landing page e fazer a API', 1);
INSERT INTO tb_note(title, content, user_id) VALUES ('Freela', 'Lorem ipsum dolor sit amet consectetur adipisicing elit. Rerum ratione eveniet commodi architecto et eaque cumque sapiente explicabo laudantium aspernatur quos harum voluptate vitae unde voluptatum amet natus, perspiciatis repudiandae. Lorem ipsum dolor sit amet consectetur adipisicing elit. Rerum ratione eveniet commodi architecto et eaque cumque sapiente explicabo laudantium aspernatur quos harum voluptate vitae unde voluptatum amet natus, perspiciatis repudiandae.', 1);

INSERT INTO tb_note(title, content, user_id) VALUES ('Mercado', 'Lista de compras do mercado', 2);