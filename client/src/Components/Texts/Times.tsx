import { useState } from "react";
import { useGetAllTimesQuery } from "../../app/API/timesRTKAPI";
import { Text_bodyJSON } from "../../app/types/types";

export default function Times(props: Text_bodyJSON){
    const { data, isSuccess } = useGetAllTimesQuery()
    const [ visible, setVisible ] = useState<boolean>(false)
    return (
        <span style={{position: 'relative'}}> 
        { isSuccess && data &&
            <span className="cursor-pointer" onMouseOver={ ()=>setVisible(!visible) } onMouseLeave={()=>setVisible(false)}>
                {`${props.eng}. `}   
            </span>
        }
        {visible && 
        //НАСТРОЙ БЛОК ДЛЯ МОБИЛЬНЫХ УСТРОЙСТВ
            <span className="p-2 rounded-lg border border-gray-200 bg-white" style={{position: 'absolute', top: '20px', left: '0px', width: '400px'}}>
                {props.time && `${props.time}: `}
                {props.rus}
            </span>
        } 
        </span>
    )
}