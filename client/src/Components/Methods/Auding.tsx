import { skipToken } from "@reduxjs/toolkit/dist/query"
import { Button, Label, TextInput } from "flowbite-react"
import { useEffect, useState } from "react"
import { useParams } from "react-router-dom"
import { useGetUnlernedQuery, useSetVocabularyMutation } from "../../app/API/vocabularyRTKAPI"
import { getUserId } from "../../app/clientAPI/userSliceAPI"
import { useAppSelector } from "../../app/hooks/hooks"
import Completed from "../StaticPages/Completed"

export default function Auding(){
    const id_user = useAppSelector(getUserId)
    const { id_group } = useParams()
    const { data, isSuccess, isError, refetch } = useGetUnlernedQuery(id_user && id_group ? { id_user, method: 'auding', id_group } : skipToken)
    const [ setVocabulary ] = useSetVocabularyMutation()
    const [ answer, setAnswer ] = useState<string>('')

    const baseAudio = new Audio(`http://localhost:3002/audio/${data?.trueVariant.audio}`)
    useEffect(()=>{
        baseAudio.play()
    }, [data])
    useEffect(()=>{
        if(data && id_user && answer === data.trueVariant.eng){
            setVocabulary({id_user, method: 'auding', word_id: data.trueVariant.id}).unwrap()
                .then((payload) => {
                    setAnswer('')
                })
        }
    }, [answer])
    return (
        <> 
        { isSuccess && data !== null && data.trueVariant &&
        <div>
            <div className="grid grid-cols-12 ">
                <div className="col-span-3">
                    <Button color="gray" onClick={()=>{
                        baseAudio.play()
                    }}>
                        Прослушать ещё раз {data.trueVariant.eng}
                    </Button>
                </div>
                <div className="col-span-3">
                    <Button onClick={refetch}>
                        Следущее слово
                    </Button>
                </div>
                <div className="col-span-8">
                    <Label htmlFor="answer" value="Введите слово которое только что прослушали"/>
                    <TextInput id="answer" placeholder="" value={answer} onChange={(e)=>setAnswer(e.target.value)} />
                </div>  
            </div>
            <div>
                
            </div>
        </div>
        }
        { data === null &&  <Completed /> }
        { isError && <div>Ошибка</div> }
        </>
        
    )
}