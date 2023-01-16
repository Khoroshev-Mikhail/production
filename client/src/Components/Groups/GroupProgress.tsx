import { skipToken } from "@reduxjs/toolkit/dist/query";
import { Progress } from "flowbite-react";
import { useGetGroupProgessQuery } from "../../app/API/vocabularyRTKAPI";
import { getUserId } from "../../app/clientAPI/userSliceAPI";
import { useAppSelector } from "../../app/hooks/hooks";
import { PROGRESS_COLOR } from "../../app/variables/anyVariables";

export default function GroupProgress( props: { id_group: number | string | null, all?: boolean } ){
    const id_user = useAppSelector(getUserId)
    const { data: progress, isSuccess } = useGetGroupProgessQuery( id_user && props.id_group ? { id_group: props.id_group, id_user } : skipToken)
    return (
        <>  
            {isSuccess && <h6 className="break-words !text-lg h-14 text-center text-2xl font-bold tracking-tight text-gray-900 dark:text-white">{progress.total}%</h6>}
            {isSuccess && !props.all && <Progress progress={progress.total} color={progress.total >= 100 ? PROGRESS_COLOR : 'dark'}/>}
            {isSuccess && props.all &&
                <>
                    <div className='pb-1'><Progress progress={progress.english} color={progress.english >= 100 ? PROGRESS_COLOR : 'dark'} /></div>
                    <div className='pb-1'><Progress progress={progress.russian} color={progress.russian >= 100 ? PROGRESS_COLOR : 'dark'} /></div>
                    <div className='pb-1'><Progress progress={progress.spelling} color={progress.spelling >= 100 ? PROGRESS_COLOR : 'dark'} /></div>
                    <div className='pb-1'><Progress progress={progress.auding} color={progress.auding >= 100 ? PROGRESS_COLOR : 'dark'} /></div>
                </>
            }
        </>
    )
}