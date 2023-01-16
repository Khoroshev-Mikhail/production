import GroupCard from './GroupCard'
import { Title } from '../../app/types/types'
import { useGetGroupsTitlesQuery } from '../../app/API/groupsRTKAPI'

export default function Groups(){
    const { data, isSuccess } = useGetGroupsTitlesQuery()
    return (
        <>
        <h1>Кнопки сортировки: по прогрессу, по алфавиту, по уровню A B C</h1>
        <div className='grid grid-cols-1 gap-4 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 2xl:grid-cols-5'>
            {isSuccess && data.map((el: Title, i: number) => {
                return <GroupCard key={i} {...el} />
            })}
        </div>
        </>
    )
}