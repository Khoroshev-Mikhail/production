import { Button, Select, Textarea, TextInput } from "flowbite-react";
import { useEffect, useState } from "react";
import { useGetAllTimesQuery } from "../../app/API/grammarRTKAPI";

type TextJSONString = {
    eng: string,
    rus: string,
    time: string | null, // потом здесь напиши конкретные строки
}


export default function AdminAddText(){
    const [ sentences, setSentences ] = useState<string>('')
    const [ result, setResult ] = useState<TextJSONString[]>([])
    const { data: dataGrammars, isSuccess } = useGetAllTimesQuery()
    
    function handlerSentences(str: string){
        setSentences(str)
        const arrayFromStr = str.replace(/\.$/, '').split('.')
        if(result.length >= 1){
            setResult(arrayFromStr.map( eng => { 
                const obj = result.filter(el => el.eng === eng)
                if(obj.length > 0){
                    return obj[0]
                }else{
                    return { eng, rus: '', time: null }
                }
                 
            }))
        } else {
            setResult(arrayFromStr.map(el => ({ eng: el, rus: '', time: null })))
        }
    }
    function handlerResult(i: number, obj: TextJSONString ){
        setResult(state => state.map( (el, index) => index !== i ? el : obj)) //Пересмотри алгоримт, кажется ресурсоемко...
    }
    useEffect(()=>{
        console.log(result)
    }, [result])
    return(
        <>
            <div className="grid grid-cols-9  gap-2rounded-lg">
                <div className="col-span-9"><Textarea value={sentences} id="comment" placeholder="Вставьте текст" required={true} rows={3} onChange={ (e) => handlerSentences(e.target.value) }/></div>
                {/* <div className="col-span-1"><Button>Форматировать.</Button></div> */}
            </div>
            
            <div className="my-4 p-4 grid grid-cols-9 gap-2 rounded-lg border border-gray-200">
            <div className="col-span-9 grid grid-cols-9">
                    <div className="col-span-4">Предложение</div>
                    <div className="col-span-4">Перевод</div>
                    <div className="col-span-1">Грамматика</div>
                </div>
                {result.map((el, i: number) => {
                    return (
                        <div className="col-span-9 grid grid-cols-9" key={i}>
                            <div className="col-span-4">{el.eng}</div>
                            <div className="col-span-4"><TextInput value={el.rus} onChange={({target : { value }})=>handlerResult(i, { eng: el.eng, time: el.time, rus: value})}/></div>
                            <div className="col-span-1">
                                <Select onChange={({target : { value }})=>handlerResult(i, { ...el, time: value})} value={ el.time || undefined } >
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
        </>
    )
}