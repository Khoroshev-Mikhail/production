import { Link } from "react-router-dom";

export default function AdminTexts(){
    return(
        <>
            <Link to={'add'}>
                Добавить новый текст
            </Link>
        </>
    )
}