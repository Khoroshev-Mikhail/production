import { skipToken } from "@reduxjs/toolkit/dist/query"
import { Button, Checkbox, FileInput, Label, Table, TextInput } from "flowbite-react"
import { useEffect, useState } from "react"
import { useParams } from "react-router-dom"
import { useDeleteWordMutation, useGetOneWordQuery, usePutWordMutation } from "../../app/API/wordRTKAPI"

export default function AdminOneWord(){
    const { id } = useParams()
    //добавить проверку чтобы в русских вводились только русские, в английских английские
    const { data: word, isSuccess } = useGetOneWordQuery(id ?? skipToken)
    const [putWord] = usePutWordMutation()
    const [eng, setEng] = useState<string>('')
    const [rus, setRus] = useState<string>('')
    const [audio, setAudio] = useState<any>(null)
    const [img, setImg] = useState<any>(null)
    function updateWord(){
        if(eng === '' || rus === ''){
            return;
        }
        const formData = new FormData();
        formData.append('id', `${id}`);
        formData.append('eng', eng);
        formData.append('rus', rus);
        img && formData.append('img', img[0]);
        audio && formData.append('audio', audio[0]);
        putWord(formData)
    }
    useEffect(()=>{
        if(isSuccess && word){
            setEng(word.eng)
            setRus(word.rus)
        }
    }, [isSuccess, word])
    const baseAudio = new Audio(`http://localhost:3002/audio/${word?.audio}`)
    baseAudio.play()
    return (
        <>
            {isSuccess && <div className="w-full sm:w-96 mx-auto bg-white rounded-lg border border-gray-200 shadow-md dark:bg-gray-800 dark:border-gray-700">
                <div className="sm:h-72 rounded-t-lg" style={{background: (img && img[0]) ? `url(${img && URL.createObjectURL(img[0])})` : `url(http://localhost:3002/img/${word.img})`, backgroundPosition: 'center center', backgroundSize: 'cover'}}></div>
                <div className="p-2 pt-4 col-span-2 cursor-pointer">
                    <TextInput placeholder="Word" value={eng} onChange={(e)=>setEng(e.target.value)} />
                </div>
                <div className="p-2 col-span-2 cursor-pointer">
                    <TextInput placeholder="Слово" value={rus} onChange={(e)=>setRus(e.target.value)} />
                </div>
                <div className="p-2 col-span-2 cursor-pointer">
                    <Label htmlFor="uploadImage">Изображение (4:3)</Label>
                    <FileInput id="uploadImage" required name="img" onChange={(e)=>{setImg(e.target.files && e.target.files)}}/> 
                </div>
                <div className="p-2 col-span-2 cursor-pointer">
                    <Label htmlFor="uploadImage">Аудио</Label>
                    <FileInput id="uploadAudio" required name="audio" onChange={(e)=>{setAudio(e.target.files && e.target.files)}}/>
                </div>
                <div className="p-2 col-span-2 cursor-pointer">
                    <Button color={'dark'} onClick={()=>{updateWord()}}>Сохранить изменения</Button>
                </div>
                {/* <div className="p-2 col-span-2 cursor-pointer">
                    <h1>Группы (сохраняются автоматически):</h1>
                    <AdminWordsRowGroups word_id={Number(id)} />
                </div> */}
                <div className="p-2 col-span-2 cursor-pointer">
                    <Button color={'failure'} onClick={()=>{}}>Удалить слово навсегда</Button>
                </div>
            </div>}
        </>   
    )
}