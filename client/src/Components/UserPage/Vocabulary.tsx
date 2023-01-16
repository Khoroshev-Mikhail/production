import { Button, Dropdown, TextInput } from "flowbite-react"
import { useState } from "react"
import { sortWordByEng, sortWordById, sortWordByRus } from "../../app/fns/comparators"
import { useGetWordsFromVocabularyQuery } from "../../app/API/vocabularyRTKAPI"
import { exitThunk, getUser, getUserId } from "../../app/clientAPI/userSliceAPI"
import { useAppDispatch, useAppSelector } from "../../app/hooks/hooks"
import GroupAllWords_word from "../Groups/GroupAllWords_word"
import { skipToken } from "@reduxjs/toolkit/dist/query"
import { Word } from "../../app/types/types"

export default function UserVocabularyPage(){
    const id_user = useAppSelector(getUserId)
    const [ limit, setLimit ] = useState<number>(10)
    const [ search, setSearch ] = useState<string>('')
    const [ deleted, setDeleted ] = useState<Word[]>([])
    const [ comparator, setComparator ] = useState<{fn: any, increase: boolean}>({ fn: sortWordById, increase: true })

    const { data, isSuccess } = useGetWordsFromVocabularyQuery( id_user ? { id_user, limit, str: search } : skipToken)
    const sorted = isSuccess ? 
        comparator.increase 
            ? [...data].concat(deleted).sort(comparator.fn)
            : [...data].concat(deleted).sort(comparator.fn).reverse()
        : []
    function toggleComparator(currentComparator: any){
        setComparator(({fn, increase}) => {
            return {
                fn: currentComparator,
                increase: fn === currentComparator ? !increase : true
            };
        })
    }
    return(
        <>
        <div className="my-4 grid grid-cols-12 gap-4">
            <div className="col-span-2">
                <Dropdown label={`Вывод по ${limit} слов:`} inline={true}>
                    <Dropdown.Item onClick={()=>setLimit(10)}>
                        10
                    </Dropdown.Item>
                    <Dropdown.Item onClick={()=>setLimit(20)}>
                        20
                    </Dropdown.Item>
                    <Dropdown.Item onClick={()=>setLimit(30)}>
                        30
                    </Dropdown.Item>
                    <Dropdown.Item onClick={()=>setLimit(50)}>
                        50
                    </Dropdown.Item>
                    <Dropdown.Item onClick={()=>setLimit(100)}>
                        100
                    </Dropdown.Item>
                </Dropdown>
            </div>
            <div className="col-span-10">
                <TextInput placeholder="Поиск слов в вашем словаре..." value={search.toLowerCase()} onChange={(e)=>setSearch(e.target.value)} />
            </div>
        </div>
         <div className="my-4 grid grid-cols-8 gap-4">
            <div className="col-span-2 cursor-pointer" onClick={()=>toggleComparator(sortWordByEng)}>Английский</div>
            <div className="col-span-2 cursor-pointer" onClick={()=>toggleComparator(sortWordByRus)}>Русский</div>
            <div className="col-span-4 grid grid-cols-4 gap-4">
                <div className="col-span-1 text-center">Английский</div>
                <div className="col-span-1 text-center">Русский</div>
                <div className="col-span-1 text-center">По буквам</div>
                <div className="col-span-1 text-center">Аудирование</div>
            </div>
        </div>
        {isSuccess &&
            <div>
                {sorted.map((el, i: number) => {
                    return <GroupAllWords_word word={el} setDeleted={setDeleted} key={i} />
                })}
            </div>
        }
        </>
    )
}