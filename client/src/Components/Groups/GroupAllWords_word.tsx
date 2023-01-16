import { skipToken } from "@reduxjs/toolkit/dist/query"
import { Checkbox } from "flowbite-react"
import { useEffect } from "react"
import { useDeleteVocabularyMutation, useGetVocabularyQuery, useSetVocabularyMutation } from "../../app/API/vocabularyRTKAPI"
import { getUserId } from "../../app/clientAPI/userSliceAPI"
import { useAppSelector } from "../../app/hooks/hooks"
import { Vocabulary, Word } from "../../app/types/types"

export default function GroupAllWords_word(props: { word: Word, setDeleted: any}){
    const id_user = useAppSelector(getUserId)
    const { data, isSuccess } = useGetVocabularyQuery(id_user ?? skipToken)
    const [ setVocabulary ] = useSetVocabularyMutation()
    const [ deleteVocabulary ] = useDeleteVocabularyMutation()

    function checkboxHandler(e: any, method: string, word_id: number){
        if(id_user){
            if(e.target.checked){
                setVocabulary( {method, word_id, id_user} )
                props.setDeleted((state: Word[]) => state.filter(el => el.id !== props.word.id))
            } else{
                deleteVocabulary( {method, word_id, id_user} ).unwrap()
                    .then( res => {
                        if(isForgot(res, props.word.id)){
                            props.setDeleted((state: Word[]) => state.concat(props.word))
                        }
                    })
            }
        }
    }
    function isForgot(vocabulary: Vocabulary, id_word: number): boolean {
        return !(vocabulary.english.includes(id_word) || vocabulary.russian.includes(id_word) || vocabulary.spelling.includes(id_word) || vocabulary.auding.includes(id_word)) 
    }

    return (
        <div className="my-4 grid grid-cols-8 gap-4 border-b border-gray-200">
            <div className="col-span-2">{props.word.eng}</div>
            <div className="col-span-2">{props.word.rus}</div>
            { isSuccess &&
            <div className="col-span-4 grid grid-cols-4 gap-4">
                <div className="col-span-1 text-center"><Checkbox checked={data.english.includes(props.word.id)} onChange={(e)=>checkboxHandler(e, 'english', props.word.id) } /></div>
                <div className="col-span-1 text-center"><Checkbox checked={data.russian.includes(props.word.id)} onChange={(e)=>checkboxHandler(e, 'russian', props.word.id)} /></div>
                <div className="col-span-1 text-center"><Checkbox checked={data.spelling.includes(props.word.id)} onChange={(e)=>checkboxHandler(e, 'spelling', props.word.id)} /></div>
                <div className="col-span-1 text-center"><Checkbox checked={data.auding.includes(props.word.id)} onChange={(e)=>checkboxHandler(e, 'auding', props.word.id)} /></div>
            </div>
            }
        </div>
    )
}