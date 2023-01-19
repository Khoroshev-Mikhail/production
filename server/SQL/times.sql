SET standard_conforming_strings = off;
SET check_function_bodies = false;
SET client_min_messages = warning;
SET escape_string_warning = off;

CREATE TABLE times (
    id SERIAL PRIMARY KEY,
    title VARCHAR(100),
    title_rus VARCHAR(100),
    short_description TEXT,
    full_description TEXT,
    statement_formula VARCHAR(50),
    negation_formula VARCHAR(50),
    question_formula VARCHAR(50)
);

INSERT INTO "times" ("title", "title_rus") VALUES ('Present simple', 'Настоящее простое');
INSERT INTO "times" ("title", "title_rus") VALUES ('Present continuous', 'Настоящее длительное');
INSERT INTO "times" ("title", "title_rus") VALUES ('Present perfect', 'Настоящее совершённое');
INSERT INTO "times" ("title", "title_rus") VALUES ('Present perfect contionious', 'Настоящее совершённое длительное время');

INSERT INTO "times" ("title", "title_rus") VALUES ('Past simple', 'Прошедшее простое');
INSERT INTO "times" ("title", "title_rus") VALUES ('Past continuous', 'Прошедшее длительное');
INSERT INTO "times" ("title", "title_rus") VALUES ('Past perfect', 'Прошедшее совершённое');
INSERT INTO "times" ("title", "title_rus") VALUES ('Past perfect contionious', 'Прошедшее совершённое длительное');

INSERT INTO "times" ("title", "title_rus") VALUES ('Future simple', 'Будущее простое');
INSERT INTO "times" ("title", "title_rus") VALUES ('Future continuous', 'Будущее длительное');
INSERT INTO "times" ("title", "title_rus") VALUES ('Future perfect', 'Будущее совершённое');
INSERT INTO "times" ("title", "title_rus") VALUES ('Future perfect contionious', 'Будущее совершённое длительное');

