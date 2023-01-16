import { Link } from 'react-router-dom'
import { Title } from '../../app/types/types';
import GroupProgress from '../Groups/GroupProgress';
import GroupProgressWrapper from '../Groups/GroupProgressWrapper';
  
export default function TextCard(props: Title){
    return (
        <Link to={`/texts/${props.id}`} className="block p-6 bg-white rounded-lg border border-gray-200 shadow-md hover:bg-gray-100 dark:bg-gray-800 dark:border-gray-700 dark:hover:bg-gray-700">
            <h6 className="break-words !text-lg h-16 text-center mb-2 text-2xl font-bold tracking-tight text-gray-900 dark:text-white">
                {props.title}
            </h6>
            <GroupProgressWrapper id_group={props.id} />
        </Link>    
    )
}