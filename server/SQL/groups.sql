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
    words INTEGER[] /*Когда удаляется слово надо автоматически удалять айдишник слова из этого массива. Желательно удалять из массива*/
);

INSERT INTO "groups" ("title", "title_rus", "words") VALUES ('100nouns', 'Топ-100 Существительных', ARRAY[]);
INSERT INTO "groups" ("title", "title_rus", "words") VALUES ('100adjectives', 'Топ-100 Прилагательных', ARRAY[]);
INSERT INTO "groups" ("title", "title_rus", "words") VALUES ('100adverbs', 'Топ-100 Наречий', ARRAY[]);
INSERT INTO "groups" ("title", "title_rus", "words") VALUES ('100verbs', 'Топ-100 Глаголов', ARRAY[]);


