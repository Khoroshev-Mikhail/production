SET standard_conforming_strings = off;
SET check_function_bodies = false;
SET client_min_messages = warning;
SET escape_string_warning = off;

CREATE TABLE texts (
    id SERIAL PRIMARY KEY,
    title VARCHAR(100),
    title_rus VARCHAR(100),
    img VARCHAR(100) DEFAULT null,
    text_translation VARCHAR(100) DEFAULT null,
    text_body TEXT, 
    is_global BOOLEAN DEFAULT true,
    visible BOOLEAN DEFAULT true
);

CREATE TABLE videos (
    id SERIAL PRIMARY KEY,
    title VARCHAR(100),
    title_rus VARCHAR(100),
    img VARCHAR(200) DEFAULT null,
    src VARCHAR(200) DEFAULT null,
    video_description TEXT, 
    is_global BOOLEAN DEFAULT true,
    visible BOOLEAN DEFAULT true
);

CREATE TABLE audios (
    id SERIAL PRIMARY KEY,
    title VARCHAR(100),
    title_rus VARCHAR(100),
    img VARCHAR(100) DEFAULT null,
    src VARCHAR(100) DEFAULT null,
    audio_description TEXT, 
    is_global BOOLEAN DEFAULT true,
    visible BOOLEAN DEFAULT true
);


