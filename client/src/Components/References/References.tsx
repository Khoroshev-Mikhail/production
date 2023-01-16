import { useEffect, useState } from "react";
import { ReferencesCard } from "../../app/types/types";
import { SERVER_URL } from "../../app/variables/dbVariables";
import GroupCard from "../Groups/GroupCard";
import TextCard from "../Texts/TextCard";

export function References(props : { id_group?: number | string, id_text?: number | string, id_audio?: number | string, id_video?: number | string}){
    const [ references, setReferences ] = useState<ReferencesCard>({ group: null, text: null, audio: null, video: null })
    useEffect(()=>{
        if(props.id_group || props.id_text || props.id_audio || props.id_video){
            let url = ''
            if(props.id_group){
                url = `/groups/${props.id_group}`
            } else if(props.id_text) {
                url = `/texts/${props.id_text}`
            } else if(props.id_video) {
                url = `/audios/${props.id_audio}`
            } else if(props.id_video) {
                url = `/videos/${props.id_video}`
            }
            fetch(SERVER_URL + url + '/references')
            .then( response => {
                return response.json()
            })
            .then((response: ReferencesCard) =>{
                if(response.hasOwnProperty('group')){
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
            { 
                (references.group || references.text || references.audio || references.video) &&  
                <h1 className="m-4">С этим контентом связаны:</h1>
            }   
            <div className='my-4 grid grid-cols-1 gap-4 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 2xl:grid-cols-5'> 
                {! props.id_text && references.text && <TextCard {...references.text}/>}
                {! props.id_group && references.text && <GroupCard {...references.text}/>}
            </div>
        </>
        // Здесь отдельно карточки с грамматикой если есть
    )
}