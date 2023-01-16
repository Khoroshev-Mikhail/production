import { Progress, Vocabulary } from "../types/types";

export default function getGroupProgress(vocabulary: Vocabulary, word_ids: number[] = []): Progress {
    if(! vocabulary || ! word_ids || ! Array.isArray(word_ids)){
        return {
            english: 0,
            russian: 0,
            spelling: 0,
            auding: 0,
            total: 0,
        }
    }
    const count = word_ids.length === 0 ? 1 : word_ids.length;  
    const { english, russian, spelling, auding } = vocabulary
    const englishProgress = word_ids.filter(id => english.includes(id))
    const russianProgress = word_ids.filter(id => russian.includes(id))
    const spellingProgress = word_ids.filter(id => spelling.includes(id))
    const audingProgress = word_ids.filter(id => auding.includes(id))
    const totalProgress = word_ids.filter(id => englishProgress.includes(id) && russian.includes(id) && spelling.includes(id) && auding.includes(id))
    return { 
        english: Math.round(englishProgress.length / count * 100),
        russian: Math.round(russianProgress.length / count * 100),
        spelling: Math.round(spellingProgress.length / count * 100),
        auding: Math.round(audingProgress.length / count * 100),
        total: Math.round(totalProgress.length / count * 100),
    }
}