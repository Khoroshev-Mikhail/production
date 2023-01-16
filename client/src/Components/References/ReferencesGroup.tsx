import { useEffect, useState } from "react";
import { ReferencesCard } from "../../app/types/types";
import TextCard from "../Texts/TextCard";

export function ReferencesGroup(props : { groupId?: number }){
    const [ references, setReferences ] = useState<ReferencesCard>({ group: null, text: null, audio: null, video: null })
    useEffect(()=>{
        if(typeof props.groupId === 'number' && props.groupId > 0){
            fetch(`http://localhost:3002/groups/${props.groupId}/references`)
            .then( response => {
                return response.json()
            })
            .then((response: ReferencesCard ) =>{
                if(response.group || response.text || response.video || response.audio){
                    setReferences(response)
                }
            })
            .catch(err => {
               setReferences({ group: null, text: null, audio: null, video: null })
            })
        }
    }, [ props ])
    return (
        <>
            {references.text && <TextCard {...references.text}/>}
        </>
        // Здесь отдельно карточки с грамматикой если есть
    )
}