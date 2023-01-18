SET standard_conforming_strings = off;
SET check_function_bodies = false;
SET client_min_messages = warning;
SET escape_string_warning = off;

CREATE TABLE user_vocabulary (
    id_user INTEGER REFERENCES users (id) ON DELETE CASCADE,
    spelling INTEGER[] DEFAULT array[]::INTEGER[],
    auding INTEGER[] DEFAULT array[]::INTEGER[],
    english INTEGER[] DEFAULT array[]::INTEGER[],
    russian INTEGER[] DEFAULT array[]::INTEGER[],
    texts INTEGER[] DEFAULT array[]::INTEGER[],
    audios INTEGER[] DEFAULT array[]::INTEGER[],
    videos INTEGER[] DEFAULT array[]::INTEGER[],
    grammar INTEGER[] DEFAULT array[]::INTEGER[]
);

INSERT INTO "user_vocabulary" ("id_user") VALUES (1);

