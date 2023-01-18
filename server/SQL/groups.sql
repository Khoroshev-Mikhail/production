SET standard_conforming_strings = off;
SET check_function_bodies = false;
SET client_min_messages = warning;
SET escape_string_warning = off;

CREATE TABLE groups (
    id SERIAL PRIMARY KEY,
    title VARCHAR (100),
    title_rus VARCHAR (100),
    img VARCHAR (100),
    is_global BOOLEAN DEFAULT true,
    words INTEGER[] DEFAULT array[]::INTEGER[] /*Когда удаляется слово надо автоматически удалять айдишник слова из этого массива. Желательно удалять из массива*/
);

INSERT INTO "groups" ("title", "title_rus") VALUES ('100nouns', 'Топ-100 Существительных');
INSERT INTO "groups" ("title", "title_rus") VALUES ('100adjectives', 'Топ-100 Прилагательных');
INSERT INTO "groups" ("title", "title_rus") VALUES ('100adverbs', 'Топ-100 Наречий');
INSERT INTO "groups" ("title", "title_rus") VALUES ('100verbs', 'Топ-100 Глаголов');


