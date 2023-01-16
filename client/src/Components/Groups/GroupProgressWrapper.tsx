import { useEffect, useState } from "react";
import { SERVER_URL } from "../../app/variables/dbVariables";
import GroupProgress from "./GroupProgress";

/**
 * (HOC) Компонента для отображения прогресса изучения слов из группы слов принадлежащей к какому-либо тексту, видео или аудио.
 * Для каждого вида контента(текст, аудио, видео) разный url поэтому указывается один из четырех параметров (id_group | id_text | id_auido | id_video)
 * @param props.all - необязательный. Если указан значит в прогрессе будут отображены progressbars для каждого метода изучения
 * @param props.id_group - Необязательный. Надо указать один из четырех.
 * @param props.id_text - Необязательный. Надо указать один из четырех.
 * @param props.id_audio - Необязательный. Надо указать один из четырех.
 * @param props.id_video - Необязательный. Надо указать один из четырех.
 * @returns 
 */
export default function GroupProgressWrapper( props: { all?: boolean, id_group?: number | string, id_text?: number | string, id_audio?: number | string, id_video?: number | string} ){
    const [id_group, setId_group] = useState<number | string | null>(null)
    useEffect(()=>{
        if(props.id_group){
            setId_group(props.id_group)
        }
        
        if(props.id_text || props.id_audio || props.id_video){
            let url = ''
            if(props.id_text){
                url = `/texts/${props.id_text}`
            } else if(props.id_audio) {
                url = `/audios/${props.id_audio}`
            } else if(props.id_video) {
                url = `/videos/${props.id_video}`
            }
            fetch(SERVER_URL + url + '/ref-id-group')
            .then( response => {
                return response.json()
            })
            .then(response =>{
                if(response.id_group){
                    setId_group(response.id_group)
                }
            })
            .catch(err => {
                setId_group(null)
            })
        }
        
    }, [props])
    return (
       < GroupProgress all={props.all} id_group={id_group} />
    )
}