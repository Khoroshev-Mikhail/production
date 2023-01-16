import { Button, Checkbox, FileInput, Label, TextInput } from "flowbite-react"
import { useState } from "react"
import { useSetWordToGroupMutation, useGetGroupsQuery } from "../../app/API/groupsRTKAPI"
import { useGetAllWordsQuery, useSearchWordsQuery, useSetWordMutation } from "../../app/API/wordRTKAPI"
import { sortWordByEng, sortWordById, sortWordByRus } from "../../app/fns/comparators"
import { Group, Word } from "../../app/types/types"
import AdminWordsRow from "./AdminWordsRow"

//Ошибка при сортировке по ид. попробуй и все увидишь
export default function AdminWords(){
    const [eng, setEng] = useState<string>('')
    const [rus, setRus] = useState<string>('')
    const [img, setImg] = useState<any>()
    const [audio, setAudio] = useState<any>()
    const [includesGroup, setIncludesGroup] = useState<number[]>([])
    const [comparator, setComparator] = useState<{fn: any, increase: boolean}>({fn: sortWordById, increase: true})
    const [filter, setFilter] = useState<string>('')

    // const {data: dataWords, isSuccess: isSuccessWords} = useGetAllWordsQuery()
    const {data: dataWords, isSuccess: isSuccessWords} = useSearchWordsQuery(filter)
    const {data: dataGroups, isSuccess: isSuccessGroups} = useGetGroupsQuery()
    const [ setWord ] = useSetWordMutation()
    const [addWordToGroup] = useSetWordToGroupMutation()

    const sorted = isSuccessWords 
        ? comparator.increase 
            ? [...dataWords].sort(comparator.fn).filter(el => el.eng?.toLowerCase().includes(filter.toLowerCase()) || el.rus?.toLowerCase().includes(filter.toLowerCase())) 
            : [...dataWords].sort(comparator.fn).filter(el => el.eng?.toLowerCase().includes(filter.toLowerCase()) || el.rus?.toLowerCase().includes(filter.toLowerCase())).reverse()
        : []
    function toggleComparator(currentComparator: any){
        setComparator(({fn, increase}) => {
            return {
                fn: currentComparator,
                increase: fn === currentComparator ? !increase : true
            };
        })
    }
    function addNewWord(){
        if(eng === '' || rus === ''){
            return;
        }
        const formData = new FormData();
        formData.append('eng', eng);
        formData.append('rus', rus);
        img && formData.append('img', img[0]);
        audio && formData.append('audio', audio[0]);
        setWord(formData).unwrap().then(word => {
            includesGroup.forEach((id: number) => addWordToGroup({ id, word_id: word.id }) )
            setEng('')
            setRus('')
            setImg(null) //Нада очистить
            setAudio(null)
            setIncludesGroup([])
        }).catch(rejected => console.log(rejected))
    }
    function setIncludes(id: number){
        includesGroup.includes(id) 
            ? setIncludesGroup((state: number[]) => state.filter((el: number) => el !== id)) 
            : setIncludesGroup((state: number[]) => state.concat([id]))
    }
    return (
        <div> 
            <div className="p-2 my-4 grid grid-cols-9 gap-4 rounded-lg border border-gray-200">
                <div className="col-span-4">
                    <TextInput placeholder="English" value={eng} onChange={(e)=>{setEng(e.target.value)}}/>
                </div>
                <div className="col-span-4">
                    <TextInput placeholder="Русский" value={rus} onChange={(e)=>setRus(e.target.value)}/>
                </div>
                <div className="col-span-1">
                    <Button onClick={()=>{ addNewWord() }}>Добавить</Button>
                </div>
                <div className="col-span-9">  
                    <Label htmlFor="uploadImage">Изображение</Label>
                    <FileInput id="uploadImage" required name="img" onChange={(e)=>{setImg(e.target.files && e.target.files)}}/>
                </div>

                <div className="col-span-9">  
                    <Label htmlFor="uploadImage">Аудио</Label>
                    <FileInput id="uploadAudio" required name="audio" onChange={(e)=>{setAudio(e.target.files && e.target.files)}}/>    
                </div>

                <div className="col-span-9"> 
                    {isSuccessGroups && dataGroups.map((group: Group, i: number) => {
                        return (
                            <div key={i}>
                                <Checkbox checked={includesGroup.includes(group.id)} id={`addGroup${i}`} value={group.id} onChange={()=>setIncludes(group.id)}/>
                                <Label htmlFor={`addGroup${i}`}>{group.title_rus}</Label>
                            </div>
                        )
                    })}
                </div>
            </div>
            
            <div>
                <h1>Поиск слов</h1>
            </div>
            <div className="p-2 my-4 rounded-lg border border-gray-200">
                <TextInput placeholder="Поиск..." value={filter} onChange={(e)=>setFilter(e.target.value)}/>
            </div>

            <div>
                <h1>Список всех слов</h1>
            </div>
            <div className="my-4 grid grid-cols-9 gap-2 rounded-lg border border-gray-200">
                <div className="col-span-9 grid grid-cols-9 border-b py-2">
                    <div className="col-span-1 text-center">ID</div>
                    <div className="col-span-3 cursor-pointer" onClick={()=>toggleComparator(sortWordByEng)}>English</div>
                    <div className="col-span-3 cursor-pointer" onClick={()=>toggleComparator(sortWordByRus)}>Russian</div>
                    <div className="col-span-1 text-center">Группы</div>
                    <div className="col-span-1 text-center">Delete</div>
                </div>
                {/* удаленные так же храни в локалсторайдж */}
                {isSuccessWords && sorted.map((word: Word, i: number) => {
                        return (
                            <AdminWordsRow key={i} {...word}/>
                        )
                    })
                }
            </div>
        </div>
    )
}