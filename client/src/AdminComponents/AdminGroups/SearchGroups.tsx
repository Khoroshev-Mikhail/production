import { useState } from "react"
import { useParams } from "react-router-dom"
import { Button, Dropdown, TextInput } from "flowbite-react"
import AdminOneGroup_WordRow from "./AdminOneGroup_WordRow"
import { Word } from "../../app/types/types"
import {  useGetOneGroupQuery } from "../../app/API/groupsRTKAPI"
import { sortWordByEng, sortWordById, sortWordByRus } from "../../app/fns/comparators"
import { useSearchWordsQuery } from "../../app/API/wordRTKAPI"
import { skipToken } from "@reduxjs/toolkit/dist/query"

export default function SearchGroups(props: any){
    //Подсвети заголовок столбца по которому сортируется вывод
    const { id } = useParams()
    const [ search, setSearch ] = useState<string>('')
    const [ searchCount, setSearchCount ] = useState<number>(3)
    const [ comparator, setComparator ] = useState<{fn: any, increase: boolean}>({ fn: sortWordById, increase: true })

    const { data: dataGroups, isSuccess: isSuccessGroup } = useGetOneGroupQuery( id ?? skipToken) 
    const { data: dataSearch, isSuccess: isSuccessSearch } = useSearchWordsQuery( search ) //перепиши на req.query

    const searchSorted = isSuccessSearch ? 
        comparator.increase 
            ? [...dataSearch].sort(comparator.fn)
            : [...dataSearch].sort(comparator.fn).reverse()
        : []
    function toggleComparator(currentComparator: any){
        setComparator(({fn, increase}) => {
            return {
                fn: currentComparator,
                increase: fn === currentComparator ? !increase : true
            };
        })
    }

    return (
        <>
        <div className="p-2 my-4 grid grid-cols-9 gap-4 rounded-lg border border-gray-200">
            <div className="col-span-9">Добавить в группу существующее слово</div>
            <div className="col-span-9">
            <TextInput addon={ <Dropdown label={`Вывод ${searchCount} слов.`} inline={true} >
                <Dropdown.Item onClick={()=>setSearchCount(3)}>
                    3
                </Dropdown.Item>
                <Dropdown.Item onClick={()=>setSearchCount(10)}>
                    10
                </Dropdown.Item>
                <Dropdown.Item onClick={()=>setSearchCount(15)}>
                    15
                </Dropdown.Item>
                </Dropdown>} 
                placeholder="Поиск по всем словам" 
                value={search.toLowerCase()} 
                onChange={(e)=>setSearch(e.target.value)}
            />
            </div>
            <div className="col-span-1 cursor-pointer text-center" onClick={()=>toggleComparator(sortWordById)}>
                ID
            </div>
            <div className="col-span-3 cursor-pointer" onClick={()=>toggleComparator(sortWordByEng)}>
                Eng
            </div>
            <div className="col-span-3 cursor-pointer" onClick={()=>toggleComparator(sortWordByRus)}>
                Rus
            </div>
            <div className="col-span-2 cursor-pointer text-center">
                В группе?
            </div>
            { isSuccessGroup && isSuccessSearch && searchSorted.slice(0, searchCount).map((word: Word, i: number) => {
                return <AdminOneGroup_WordRow word={word} words_ids={dataGroups.words} setDeletedWords={props.setDeletedWords} key={i} />
            })}
        </div>
        </>
    )
}