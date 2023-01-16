import { Checkbox } from "flowbite-react"
import { useParams } from "react-router-dom"
import { useDeleteWordFromGroupMutation, useSetWordToGroupMutation } from "../../app/API/groupsRTKAPI"
import { Word } from "../../app/types/types"

export default function AdminOneGroup_WordRow(props: { word: Word, words_ids: number[], setDeletedWords: any }){
    const { id } = useParams()
    const [ deleteWordFromGroup ] = useDeleteWordFromGroupMutation()
    const [ setWordToGroup ] = useSetWordToGroupMutation()
    const isChecked = props.words_ids.includes(props.word.id)
    function handlerCheck(){
        if(id){
            if(isChecked){
                deleteWordFromGroup({ id, word_id: props.word.id })
                props.setDeletedWords( (state: Word[]) => {
                    state.push(props.word)
                    return state
                })
            } else{
                setWordToGroup({ id, word_id: props.word.id })
                props.setDeletedWords( (state: Word[]) => {
                    return state.filter(el => el.id !== props.word.id)
                })
            }
        }
    }
    return (
        <>
            <div className="col-span-1 text-center border-b border-gray-200">
                {props.word.id}
            </div>
            <div className="col-span-3 border-b border-gray-200">
                {props.word.eng}
            </div>
            <div className="col-span-3 border-b border-gray-200">
                {props.word.rus}
            </div>
            <div className="col-span-2 text-center border-b border-gray-200">
                <Checkbox checked={isChecked} onChange={handlerCheck} />
            </div>
        </>
    )
}