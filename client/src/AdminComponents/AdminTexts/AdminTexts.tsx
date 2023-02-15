import { Button } from "flowbite-react";
import { Link } from "react-router-dom";
import { useGetTextsQuery, useHideTextMutation } from "../../app/API/textsRTKAPI";

export default function AdminTexts(){
    const { data, isSuccess } = useGetTextsQuery()
    const [ hideText ] = useHideTextMutation()
    return(
        <div>
            <div className="p-2 my-4 grid grid-cols-9 gap-4 rounded-lg border border-gray-200">
                <Link to={'add'}>
                Добавить новый текст
                </Link>
            </div>
            <div className="p-2 my-4 grid grid-cols-9 gap-4 rounded-lg border border-gray-200">
                <div className="col-span-9 grid grid-cols-9 border-b py-2">
                    <div className="col-span-1 text-center">ID</div>
                    <div className="col-span-3 cursor-pointer">English</div>
                    <div className="col-span-3 cursor-pointer">Russian</div>
                    <div className="col-span-1 text-center">Группа слов</div>
                    <div className="col-span-1 text-center">Видимость</div>
                </div>
                { isSuccess && data &&
                    data.map(el => {
                        const link = `/admin/texts/${el.id}`
                        return (
                            <div className={`col-span-9 grid grid-cols-9 gap-x-2 border-b border-gray-200 py-1 ${! el.visible && 'bg-slate-200 text-slate-400'}`}>
                                <Link to={link} className="col-span-1 cursor-pointer text-center">
                                    {el.id}
                                </Link>
                                <Link to={link} className="col-span-3 cursor-pointer">
                                    {el.title}
                                </Link>
                                <Link to={link} className="col-span-3 cursor-pointer">
                                    {el.title_rus}
                                </Link>
                                <div className="col-span-1 text-center">
                                    <Button color={'info'}>Группа слов</Button>
                                </div>
                                <div className="col-span-1 text-center">
                                    <Button color={ el.visible ? 'failure' : 'success'} onClick={()=>hideText(el.id)}>{ el.visible ? 'Скрыть' : 'Отобразить'}</Button>
                                </div>
                            </div>
                        )
                    })
                }
            </div>
        </div>
    )
}