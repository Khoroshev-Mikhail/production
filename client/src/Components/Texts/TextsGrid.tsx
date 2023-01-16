import { useEffect } from "react"
import { getAllGlobalTextsTitlesThunk } from "../../app/clientAPI/textSliceAPI"
import { useAppDispatch, useAppSelector } from "../../app/hooks/hooks"
import { RootState } from "../../app/store"
import { Title } from "../../app/types/types"
import TextCard from "./TextCard"

export default function Texts(){
    const dispatch = useAppDispatch()
    const texts = useAppSelector((state: RootState) => state.texts)
    useEffect(()=>{
        dispatch(getAllGlobalTextsTitlesThunk())
    }, [])
    return (
        <div className='grid grid-cols-1 gap-4 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 2xl:grid-cols-5'>
            {texts && texts.map((el: Title, i: number) => {
                return <TextCard {...el} key={i} />
            })}
            {!texts || texts.length === 0 &&
            <div>
                <h1>Какая-то ошибка...</h1>
            </div>}
        </div>
    )
}