import { skipToken } from "@reduxjs/toolkit/dist/query"
import { Button } from "flowbite-react"
import { Link } from "react-router-dom"
import { useGetVocabularyQuery } from "../../app/API/vocabularyRTKAPI"
import { exitThunk, getUser, getUserId } from "../../app/clientAPI/userSliceAPI"
import { useAppDispatch, useAppSelector } from "../../app/hooks/hooks"
import UserPageCard from "./Card"

export default function UserPage(){
    const id_user = useAppSelector(getUserId)
    const { data, isSuccess } = useGetVocabularyQuery(id_user || skipToken)
    const dispatch = useAppDispatch()
    console.log(data)
    return(
        <div className='grid grid-cols-1 gap-4 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 2xl:grid-cols-5'>
            <Link to={`/userpage/vocabulary`} className="block p-6 bg-white rounded-lg border border-gray-200 shadow-md hover:bg-gray-100 dark:bg-gray-800 dark:border-gray-700 dark:hover:bg-gray-700">
                <h6 className="break-words !text-lg text-center mb-2 text-2xl font-bold tracking-tight text-gray-900 dark:text-white">
                    {/* ДОБАВЬ ПРОГРЕСС от общего количества и для этого сделай отдельный апи, */}Выученные слова {isSuccess && `(Всего: ${(data.english.length + data.russian.length + data.auding.length + data.spelling.length)} шт.)` }
                </h6>
            </Link>    
            <UserPageCard title="#" title_rus="Управлять текстами"/>
            <UserPageCard title="#" title_rus="Управлять данными"/>
            <Button type="button" onClick={()=>dispatch(exitThunk())}>Exit</Button>
        </div>
    )
}