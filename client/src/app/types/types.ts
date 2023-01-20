import { STATUS_PENDING } from "../variables/statusVariables";

export type UserVocabular = {
    english: number[],
    russian: number[],
    auding: number[],
    spelling: number[],
};
export type Word = {
    id: number, 
    eng: string,
    rus: string,
    img: string | null,
    audio: string | null
};
export type Group = {
    id: number, 
    title: string,
    title_rus: string,
    img: string,
    words: number[],
    is_global?: boolean,
    visible?: boolean
};
export type Times = {
    id: number, 
    title: string,
    title_rus: string,
    short_description: string,
    full_description: string, 
    statement_formula: string,
    negation_formula: string, 
    question_formula: string
};
export type Audio = {
    id: number, 
    title: string,
    title_rus?: string,
    img: string,
    src: string,
    audio_description: string,
    is_global?: boolean,
    visible?: boolean,
};
export type Video = {
    id: number, 
    title: string,
    title_rus?: string,
    img: string,
    src: string,
    video_description: string,
    is_global?: boolean,
    visible?: boolean,
};
export type GroupTitle = {
    id: number, 
    title: string,
    title_rus: string
};
export type Text = {
    id: number, 
    title: string,
    title_rus: string,
    img: string,
    text_body: string,
    is_global?: boolean,
    visible?: boolean,
};

export type Text_bodyJSON = {
    eng: string,
    rus: string,
    time: string | null, // потом здесь напиши конкретные строки
}

export type User = {
    id: number | null,
    email?: string | null,
    user_login?: string | null,
    user_name?: string | null,
    token?: string | null,
    refresh_token?: string | null,
};
export type Content_references = {
    id_text: number | null,
    id_group: number | null,
    id_audio: number | null,
    id_video: number | null
} | null;
export type Progress = {
    english: number, 
    russian: number, 
    spelling: number, 
    auding: number, 
    total: number
};
export type References = {
    group: Title | null,
    text: Title | null,
    audio: Audio | null,
    video: Video | null,
}
export type Title = {
    id: number,
    title: string,
    title_rus: string,
    img: string,
}
export type ReferencesCard = {
    group: Title | null,
    text: Title | null,
    audio: Title | null,
    video: Title | null,
}
export type Vocabulary = {
    english: number[],
    russian: number[],
    spelling:  number[],
    auding: number[],
    texts: number[],
    audios: number[],
    videos: number[]
}
export type Unlerned = {
    trueVariant: ''
}
export type Learning = {
    status: 'pending' | 'fulfilled' | 'rejected' | 'error' | 'completed',
    trueVariant: Word,
    falseVariant: Word[],
}
export type TrueAndFalseVariants = {
    trueVariant: Word,
    falseVariant: Word[],
} | null
export type Method = 'english' | 'russian' | 'spelling' | 'auding';