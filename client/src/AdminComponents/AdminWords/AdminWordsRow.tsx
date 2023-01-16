import { Button, Checkbox, FileInput, Label, Table, TextInput } from "flowbite-react"
import { useEffect, useState } from "react"
import { Link } from "react-router-dom"
import { useDeleteWordMutation, usePutWordMutation } from "../../app/API/wordRTKAPI"
import { Word } from "../../app/types/types"
import AdminWordsRowGroups from "./AdminWordRowGroups"

export default function AdminWordsRow(props: Word){
    const [deleteWord] = useDeleteWordMutation()
    const [hidden, setHidden] = useState<boolean>(false)
    return (
        <div className="col-span-9 grid grid-cols-9 gap-x-2 border-b border-gray-200 pb-2">
            <Link to={`/admin/words/${props.id}`} className="col-span-1 cursor-pointer text-center">
                {props.id}
            </Link>
            <Link to={`/admin/words/${props.id}`} className="col-span-3 cursor-pointer">
                {props.eng}
            </Link>
            <Link to={`/admin/words/${props.id}`} className="col-span-3 cursor-pointer">
                {props.rus}
            </Link>
            <div className="col-span-1 text-center">
                <Button color={'light'} onClick={()=>{setHidden(!hidden)}}>Группы</Button>
            </div>
            <div className="col-span-1 text-center">
                <Button color={'failure'} onClick={()=>deleteWord(props.id)}>Del</Button>
            </div>
            {hidden && <AdminWordsRowGroups word_id={props.id}/>}
        </div>
    )
}