import { Checkbox, Label} from "flowbite-react"
import { useSetWordToGroupMutation, useDeleteWordFromGroupMutation, useGetGroupsQuery } from "../../app/API/groupsRTKAPI"
import { Group } from "../../app/types/types"

export default function AdminWordsRowGroups(props: {word_id: number}){
    const {data, isSuccess} = useGetGroupsQuery()
    const [addWordToGroup] = useSetWordToGroupMutation()
    const [deleteWordFromGroup] = useDeleteWordFromGroupMutation()
    return (
        <div className={`p-2 col-span-11 gap-2 grid grid-cols-1`}>
            {isSuccess &&
                data.map((group: Group, i: number) => {
                    return (
                        <div key={i}>
                            <Checkbox
                                checked={group.words.includes(props.word_id)} 
                                onChange={group.words.includes(props.word_id) 
                                    ? ()=>{deleteWordFromGroup({id: group.id, word_id: props.word_id})} 
                                    : ()=>{addWordToGroup({id: group.id, word_id: props.word_id})}
                                }
                                id={`groupCheckBox${i}`}
                            /> 
                            <Label htmlFor={`groupCheckBox${i}`}> {group.title_rus}</Label>
                        </div>
                    )
                })
            }
        </div>
    )
}