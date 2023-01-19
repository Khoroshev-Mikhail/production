import { Select } from "flowbite-react";
import { useEffect, useState } from "react";
import { useGetAllTimesQuery } from "../../app/API/grammarRTKAPI";


export default function AdminAddTextSelect(){
    const { data: dataGrammars, isSuccess } = useGetAllTimesQuery()
    const [ selectedValue, setSelectedValue ] = useState<number | string>(1)
    return(
        <Select value={selectedValue} onChange={ ( {target: { value } })=>{setSelectedValue( value )} }>
            {isSuccess && dataGrammars.length >= 1 && dataGrammars.map(el => {
                return (
                    <option value={el.id}>
                        {el.title}
                    </option>
                )
            })
            }
        </Select>
    )
}