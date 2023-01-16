import { Button, TextInput } from "flowbite-react"
import { useState } from "react"
import { useGetGroupsQuery, useSetGroupMutation } from "../../app/API/groupsRTKAPI"
import { Group } from "../../app/types/types"
import AdminGroupsRow from "./AdminGroupsRow"

const sortById = (a: Group, b: Group) => a.id - b.id
const sortByEng = (a: Group, b: Group) => a.title.localeCompare(b.title)
const sortByRus = (a: Group, b: Group) => a.title_rus.localeCompare(b.title_rus)

export default function AdminGroups(){
    const { data, isSuccess} = useGetGroupsQuery()
    const [ setGroup ] = useSetGroupMutation()
    const [title, setTitle] = useState<string>('')
    const [title_rus, setTitleRus] = useState<string>('')
    const [comparator, setComparator] = useState<{ fn: any, increase: boolean }>({ fn: sortById, increase: true })
    const [filter, setFilter] = useState<string>('')
    const sorted = 
        isSuccess && data ?
            comparator.increase 
            ? [...data].sort(comparator.fn).filter(el => el.title.toLowerCase().includes(filter.toLowerCase()) || el.title_rus.toLowerCase().includes(filter.toLowerCase())) 
            : [...data].sort(comparator.fn).filter(el => el.title.toLowerCase().includes(filter.toLowerCase()) || el.title_rus.toLowerCase().includes(filter.toLowerCase())).reverse()
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
        <div> 
            <div className="my-4 grid grid-cols-9 gap-4">
                <div className="col-span-4">
                    <TextInput placeholder="English" value={title} onChange={(e)=>setTitle(e.target.value)}/>
                </div>
                <div className="col-span-4">
                    <TextInput placeholder="Русский" value={title_rus} onChange={(e)=>setTitleRus(e.target.value)}/>
                </div>
                <div className="col-span-1">
                    <Button onClick={ () => setGroup({ title, title_rus }) }>Добавить</Button>
                </div>
            </div>
            <div className="my-4">
                <TextInput placeholder="Поиск..." value={filter} onChange={(e)=>setFilter(e.target.value)}/>
            </div>
            <div className="my-4 grid grid-cols-9 gap-2 rounded-lg border border-gray-200">
                <div className="col-span-9 grid grid-cols-8 border-b py-2">
                    <div className="col-span-1 cursor-pointer text-center" onClick={()=>toggleComparator(sortById)}>ID</div>
                    <div className="col-span-3 cursor-pointer" onClick={()=>toggleComparator(sortByEng)}>English</div>
                    <div className="col-span-3 cursor-pointer" onClick={()=>toggleComparator(sortByRus)}>Русский</div>
                    <div className="col-span-1 cursor-pointer text-center">Количество слов</div>
                </div>
                {sorted.map((group: Group, i: number) => {
                        return (
                            <AdminGroupsRow key={i} {...group}/>
                        )
                    })
                }
            </div>
        </div>
    )
}