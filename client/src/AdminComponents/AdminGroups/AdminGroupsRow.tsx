import { Link } from "react-router-dom"
import { Group } from "../../app/types/types"

export default function AdminGroupsRow(props: Group){
    return (
        <Link to={`/admin/groups/${props.id}`} className="block cursor-pointer col-span-9 grid grid-cols-8 gap-x-2 border-b border-gray-200 pb-2">
            <div className="pl-2 col-span-1 text-center">
                {props.id}
            </div>
            <div className="pl-2 col-span-3">
                {props.title}
            </div>
            <div className="col-span-3">
                {props.title_rus}
            </div>
            <div className="pr-2 col-span-1 text-center">
                {props.words.length}
            </div>
        </Link>
    )
}