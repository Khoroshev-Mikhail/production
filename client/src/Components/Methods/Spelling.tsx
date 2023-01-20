import { skipToken } from "@reduxjs/toolkit/dist/query"
import { Button } from "flowbite-react"
import { useEffect, useState } from "react"
import { useParams } from "react-router-dom"
import { useGetUnlernedQuery, useSetVocabularyMutation } from "../../app/API/vocabularyRTKAPI"
import { getUserId } from "../../app/clientAPI/userSliceAPI"
import { useAppSelector } from "../../app/hooks/hooks"
import Completed from "../StaticPages/Completed"

export default function Spelling(props: any){
    const { id_group } = useParams()
    const id_user = useAppSelector(getUserId)

    const { data, isSuccess, isError, refetch } = useGetUnlernedQuery(id_user && id_group ? { id_user, method: 'spelling', id_group } : skipToken)
    const [ setVocabulary ] = useSetVocabularyMutation()
    const defaultImg = '51_ccc.jpeg'
    const [answer, setAnswer] = useState<string>('')
    const [eng, setEng] = useState<string>('')
    const baseAudio = new Audio(`http://localhost:3002/words/audio/${data?.trueVariant.audio}`)

    function clickEng(i: number){
        setEng(state => {
            const arr = state.split('')
            const currentLetter = arr.splice(i, 1)[0]
            setAnswer(state => {
                if(data && (state + currentLetter).toUpperCase() === data.trueVariant.eng.toUpperCase() && id_user){
                    setVocabulary({id_user, method: 'spelling', word_id: data.trueVariant.id})
                    setAnswer('')
                }
                return state + currentLetter
            })
            return arr.join('')
        })
    }
    function clickAnswer(i: number){
        setAnswer(state => {
            const arr = state.split('')
            const currentLetter = arr.splice(i, 1)[0]
            setEng(state => state + currentLetter)
            return arr.join('')
        })
    }
    useEffect(()=>{
        data && setEng( data.trueVariant.eng.toUpperCase().split('').sort( () => Math.random() - 0.5 ).join('') )
        baseAudio.play()
    }, [data])

    return (
        <>
        { isSuccess && data !== null && data.trueVariant &&
        <div className="w-full p-2 sm:w-96 mx-auto bg-white rounded-lg border border-gray-200 shadow-md dark:bg-gray-800 dark:border-gray-700">
            <div className="sm:h-72 rounded-t-lg" style={{backgroundImage: `url(http://localhost:3002/words/img/${data.trueVariant.img || defaultImg})`, backgroundPosition: 'center center', backgroundSize: 'cover'}}></div>
            <div className="p-5">
                <h5 className="mb-2 text-center text-2xl font-bold tracking-tight text-gray-900 dark:text-white">{data.trueVariant.rus}</h5>
                <div className="flex flex-wrap gap-1 justify-center mb-10 p-2 rounded-lg border border-gray-200 shadow-md dark:bg-gray-800 dark:border-gray-700">
                    {answer.split('').map((el: string, i: number) => {
                        return (
                            <div key={i} className="font-bold">
                                <Button color="gray" onClick={()=>clickAnswer(i)}>
                                    {el}
                                </Button>
                            </div>
                        )
                    })}
                </div>
                <div className="flex flex-wrap gap-1 justify-center mb-10 p-2 rounded-lg border border-gray-200 shadow-md dark:bg-gray-800 dark:border-gray-700">
                    { eng.split('').map((el: string, i: number) => {
                        return (
                            <div key={i}>
                                <Button color="gray" onClick={()=>clickEng(i)}>
                                    {el}
                                </Button>
                            </div>
                        )
                    })}
                </div>
                <div className="flex flex-wrap gap-1 justify-center mb-10 p-2 rounded-lg border border-gray-200 shadow-md dark:bg-gray-800 dark:border-gray-700">
                    <Button onClick={refetch}>Другое слово {'->'}</Button>
                </div>
            </div>
        </div>
        }
        { data === null &&  <Completed /> }
        { isError && <div>Ошибка</div> }
        </>
    )
}