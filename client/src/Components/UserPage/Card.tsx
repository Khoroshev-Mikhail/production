import { Link } from 'react-router-dom'
  
export default function UserPageCard(props: { title: string, title_rus: string}){
    return (
        <Link to={`/userpage/${props.title}`} className="block p-6 bg-white rounded-lg border border-gray-200 shadow-md hover:bg-gray-100 dark:bg-gray-800 dark:border-gray-700 dark:hover:bg-gray-700">
            <h6 className="break-words !text-lg text-center mb-2 text-2xl font-bold tracking-tight text-gray-900 dark:text-white">
                {props.title_rus}
            </h6>
        </Link>    
    )
}