import { Textarea, TextInput } from "flowbite-react";
import { useEffect, useState } from "react";

type TextJSONString = {
    eng: string,
    rus: string,
    time: string | null, // потом здесь напиши конкретные строки
}

export default function AdminAddText(){
    const [ sentences, setSentences ] = useState<string>('')
    const [ result, setResult ] = useState<TextJSONString[]>([])
    
    function handlerSentences(str: string){
        setSentences(str)
        setResult(str.split('.').map(el => ({ eng: el, rus: '', time: null }))) //убери последнюю точку
    }
    function handlerResult(){
        
    }


    return(
        <>
            <Textarea id="comment" placeholder="Вставьте текст" required={true} rows={10} onChange={ (e) => handlerSentences(e.target.value) }/>
            <div className="my-4 p-4 grid grid-cols-9 gap-2 rounded-lg border border-gray-200">
            <div className="col-span-9 grid grid-cols-9">
                    <div className="col-span-4">Предложение</div>
                    <div className="col-span-4">Перевод</div>
                    <div className="col-span-1">Грамматика</div>
                </div>
                {result.map((el, i: number) => {
                    return (
                        <div className="col-span-9 grid grid-cols-9">
                            <div className="col-span-4">{el.eng}</div>
                            <div className="col-span-4"><TextInput value={el.rus}/></div>
                            <div className="col-span-1"></div>
                        </div>
                    )
                })}
            </div>
        </>
    )
}