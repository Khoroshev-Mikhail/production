import { Button, FileInput, Label, Select, Textarea, TextInput } from "flowbite-react";
import { useEffect, useState } from "react";
import { useSetTextMutation } from "../../app/API/textsRTKAPI";
import { useGetAllTimesQuery } from "../../app/API/timesRTKAPI";
import { Text_bodyJSON } from "../../app/types/types";

export default function AdminAddText(){
    //Локальный стейт
    const [ img, setImg ] = useState<any>()
    const [ title, setTitle ] = useState<string>('')
    const [ title_rus, setTitle_rus ] = useState<string>('')
    const [ sentences, setSentences ] = useState<string>('')
    const [ result, setResult ] = useState<Text_bodyJSON[]>([])

    //API
    const { data: dataGrammars, isSuccess } = useGetAllTimesQuery()
    const [ setText ] = useSetTextMutation()

    //Локальные методы
    function handlerSentences(str: string){
        setSentences(str)
        const arrayFromStr = str.replace(/\.\s*$/, '').split(/\.+/) //Можно удалить строки где только пробелы между точками \.\s+\. и заменить их на точку
        if(result.length >= 1){
            setResult(arrayFromStr.map( eng => { 
                const obj = result.filter(el => el.eng === eng)
                if(obj.length > 0){
                    return obj[0]
                }else{
                    return { eng: eng.trim(), rus: '', time: null }
                }  
            })) //может надо здесь .отфильтровать el.eng === \.\s+\.
        } else {
            setResult(arrayFromStr.map(el => ({ eng: el.trim(), rus: '', time: null })))
        }
    }
    function handlerResult(i: number, obj: Text_bodyJSON){
        setResult(state => state.map( (el, index) => index !== i ? el : obj)) //Пересмотри алгоримт, кажется ресурсоемко...
    }
    function handlerEngInput(i: number, obj: Text_bodyJSON){
        setResult(state => {
            const newState = state.map( (el, index) => index !== i ? el : obj)
            setSentences(newState.map(el => el.eng).join('. ') + '.')
            return newState
        })
    }
    function handlerForm(){
        const formData = new FormData();
        formData.append('title', title);
        formData.append('title_rus', title_rus);
        formData.append('text_body', JSON.stringify(result));
        img && formData.append('img', img[0]);
        setText(formData).unwrap().then( text => {
            setTitle('')
            setSentences('')
            setResult([])
            setTitle_rus('')
            setImg(null)
        }).catch(rejected => console.log(rejected))
    }
    
    //Эффекты
    useEffect(()=>{
        console.log(result)
    }, [result])
    return(
        <>
            <div className="grid grid-cols-9  gap-2 rounded-lg">
                <div className="col-span-9">
                    <Label htmlFor="title">Название на английском</Label>
                    <TextInput value={title} onChange={ ({ target: { value } }) => setTitle(value) } id="title" />
                </div>
                <div className="col-span-9">
                    <Label htmlFor="title_rus">Название на русском</Label>
                    <TextInput value={title_rus} onChange={ ({ target: { value } }) => setTitle_rus(value) } id="title_rus" />
                </div>
                <div className="col-span-9">  
                    <Label htmlFor="uploadImage">Изображение</Label>
                    <FileInput id="uploadImage" required name="img" onChange={(e)=>{setImg(e.target.files && e.target.files)}}/>
                </div>
            </div>

            <div className="col-span-9">
                <Label htmlFor="text_body">Текст</Label>
                <Textarea value={sentences} id="text_body" placeholder="Вставьте текст" required={true} rows={3} onChange={ (e) => handlerSentences(e.target.value) }/>
            </div>
            <div className="col-span-9 grid grid-cols-9">
                <div className="col-span-4">Предложение</div>
                <div className="col-span-4">Перевод</div>
                <div className="col-span-1">Время</div>
            </div>
            <div className="col-span-9 grid grid-cols-9">
                {result.map((el, i: number) => {
                    return (
                        <div className="col-span-9 grid grid-cols-9 pt-1" key={i}>
                            <div className="col-span-4">
                                <TextInput value={el.eng.trim()} onChange={({ target : { value }}) => handlerEngInput(i, { eng: value.trim(), time: el.time, rus: el.rus })} />
                            </div>
                            <div className="col-span-4 pl-1 pr-1">
                                <TextInput value={el.rus} onChange={({ target : { value }}) => handlerResult(i, { eng: el.eng, time: el.time, rus: value.trim() })} />
                            </div>
                            <div className="col-span-1">
                                <Select onChange={({target : { value }})=>handlerResult(i, { ...el, time: value})} value={ el.time || undefined } >
                                    <option selected={el.time === null}>
                                        
                                    </option>
                                    {isSuccess && dataGrammars.length >= 1 && 
                                        dataGrammars.map(time => {
                                            return (
                                                <option value={time.title} selected={el.time === time.title}>
                                                    {time.title}
                                                </option>
                                            )
                                        })
                                    }
                                </Select>
                            </div>
                        </div>
                    )
                })}
            </div>
            <div className="col-span-9 grid grid-cols-9 py-2">
                <div className="col-span-4"></div>
                <div className="col-span-4"></div>
                <div className="col-span-1"><Button onClick={handlerForm}>Сохранить</Button></div>
            </div>
        </>
    )
}