import { useEffect } from "react"
import { useParams } from "react-router-dom"
import { getReferences } from "../../app/clientAPI/referencesSliceAPI"
import { getOneTextThunk } from "../../app/clientAPI/textSliceAPI"
import { useAppDispatch, useAppSelector } from "../../app/hooks/hooks"
import { RootState } from "../../app/store"
import { Text_bodyJSON } from "../../app/types/types"
import { References } from "../References/References"

export default function TextPage(){
    const dispatch = useAppDispatch()
    const { id_text } = useParams()
    const text = useAppSelector((state: RootState) => state.oneText)
    useEffect(()=>{
        if(id_text){
            dispatch(getOneTextThunk(id_text))
            dispatch(getReferences({item: 'texts', id: id_text}))
        }
    }, [])
    return(
        <>  
            {!text &&
            <div>
                <h1>Какая-то ошибка...</h1>
            </div>
            }
            <References id_text={id_text} />
            {text &&
            <div className="my-4">
                <h1>{text.title}</h1>
                <div>{text.text_body && JSON.parse(text.text_body).map((el: Text_bodyJSON) => el.eng).join('. ')}</div>
            </div>
            }
        </>
    )
}