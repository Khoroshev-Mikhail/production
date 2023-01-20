import { skipToken } from '@reduxjs/toolkit/dist/query'
import { useParams } from 'react-router-dom'
import { useGetUnlernedQuery, useSetVocabularyMutation } from '../../app/API/vocabularyRTKAPI'
import { getUser, getUserId } from '../../app/clientAPI/userSliceAPI'
import { useAppSelector } from '../../app/hooks/hooks'
import { Word } from '../../app/types/types'
import Completed from '../StaticPages/Completed'
export default function English(){
    const id_user = useAppSelector(getUserId)
    const { id_group } = useParams()
    const { data, isSuccess, isError, refetch } = useGetUnlernedQuery(id_user && id_group ? { id_user, method: 'english', id_group } : skipToken)
    const [ setVocabulary ] = useSetVocabularyMutation()
    const defaultImg = '51_ccc.jpeg'
    const answer = (word_id: number) => {
        if(isSuccess && data !== null && id_user && data.trueVariant.id === word_id ){
            setVocabulary({ id_user, method: 'english', word_id })
        } else{
            if(id_user && id_group){
                refetch()
            }
        }
    }
    const baseAudio = new Audio(`http://localhost:3002/words/audio/${data?.trueVariant?.audio}`)
    baseAudio.play()
    return(
        <>  
            { isSuccess && data !== null && data.trueVariant && data.falseVariant &&
            <div className="w-full sm:w-96 mx-auto bg-white rounded-lg border border-gray-200 shadow-md dark:bg-gray-800 dark:border-gray-700">
                <div className="sm:h-72 rounded-t-lg" style={{backgroundImage: `url(http://localhost:3002/words/img/${data.trueVariant.img || defaultImg})`, backgroundPosition: 'center center', backgroundSize: 'cover'}}></div>
                <div className="p-5">
                    <h5 className="mb-2 text-center text-2xl font-bold tracking-tight text-gray-900 dark:text-white">
                        {data.trueVariant.eng}
                    </h5>
                    { data.falseVariant.map((el: Word, i: number) => {
                        return (
                            <button onClick={()=>answer(el.id)} key={i} type="button" className="text-green-700 py-4 my-4 w-full hover:text-white border border-green-700 hover:bg-green-800 focus:ring-4 focus:outline-none focus:ring-green-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center mr-2 mb-2 dark:border-green-500 dark:text-green-500 dark:hover:text-white dark:hover:bg-green-600 dark:focus:ring-green-800">
                                {el.rus}
                            </button>
                        )
                    })} 
                </div>
            </div>
            }
            {/* пересмотри нулл */}
            { data === null &&  <Completed />}
            { isError &&  <div>Ошибка</div> }
        </>
    )
}