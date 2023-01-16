import { skipToken } from "@reduxjs/toolkit/dist/query"
import { useState } from "react"
import { useParams } from "react-router-dom"
import { useGetWordsFromGroupQuery } from "../../app/API/groupsRTKAPI"
import { Word } from "../../app/types/types"
import GroupAllWords_word from "./GroupAllWords_word"

export default function GroupAllWords(){
    const { id_group } = useParams()
    const { data, isSuccess } = useGetWordsFromGroupQuery(id_group ?? skipToken)
    const [ deleted, setDeleted ] = useState<Word[]>([])
    return (
        <div>
            <div className="my-4 grid grid-cols-8 gap-4">
                <div className="col-span-4">Всего слов в группе: {isSuccess && data.length}</div>
                <div className="col-span-4 text-center">Методы изучения слов</div>
            </div>
            <div className="my-4 grid grid-cols-8 gap-4">
                <div className="col-span-2">Английский</div>
                <div className="col-span-2">Русский</div>
                <div className="col-span-4 grid grid-cols-4 gap-4">
                    <div className="col-span-1 text-center">Английский</div>
                    <div className="col-span-1 text-center">Русский</div>
                    <div className="col-span-1 text-center">По буквам</div>
                    <div className="col-span-1 text-center">Аудирование</div>
                </div>
            </div>
            {isSuccess && data.map((el: Word, i: number) => {
                return (
                    <GroupAllWords_word word={el} setDeleted={setDeleted} key={i}/>
                )
            })}
        </div>
    )
}