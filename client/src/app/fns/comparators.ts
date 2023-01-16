import { Word } from "../types/types"
//перепиши типы чтобы был обязательным было наличие id, остальное может быть каким угодно
export const sortWordById = (a: Word, b: Word) => Number(a.id) - Number(b.id)
export const sortWordByEng = (a: Word, b: Word) => a.eng.localeCompare(b.eng)
export const sortWordByRus = (a: Word, b: Word) => a.rus.localeCompare(b.rus)