SET standard_conforming_strings = off;
SET check_function_bodies = false;
SET client_min_messages = warning;
SET escape_string_warning = off;

CREATE TABLE words (
    id SERIAL PRIMARY KEY,
    eng VARCHAR(25),
    rus VARCHAR(25),
    img VARCHAR(100) DEFAULT null,
    audio VARCHAR(100) DEFAULT null
);

