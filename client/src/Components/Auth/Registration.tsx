import { Button, Label, TextInput } from "flowbite-react";
import { useState } from "react";
import { exitThunk, loginThunk } from "../../app/clientAPI/userSliceAPI";
import { useAppDispatch } from "../../app/hooks/hooks";

export default function Registration(){
    const dispatch = useAppDispatch()
    const [login, setLogin] = useState<string>('')
    const [password, setPassword] = useState<string>('')
    const [name, setName] = useState<string>('')
    const [email, setEmail] = useState<string>('')
    const [birth, setBirth] = useState<string>('')
    const [error, setError] = useState<string>('err')
    async function formHandler(e: any){
        //лушче сделать через санки потому что проще будет обработать ошибку или вообще поставь потом либу какуюнибудь
        e.preventDefault()
        fetch('http://localhost:3002/user/registration', {
            method: 'POST',            
            headers: {
                'Content-Type': 'application/json;charset=utf-8'
            }, 
            body: JSON.stringify({ login, password, })
        })
        .then(response => {
            if(response.ok){
                dispatch(loginThunk({login, password}))
            } 
            if(! response.ok){
            //Обработай ошибки
            }
        })
        .catch(error => {
            //Обработай ошибки
            console.log('oshibka', error)
        })
    }
    return(
        <div className="w-full sm:w-96 mx-auto p-4 bg-white rounded-lg border border-gray-200 shadow-md dark:bg-gray-800 dark:border-gray-700">
            <form className="flex flex-col gap-4">
                <h1>{error}</h1>
                <div>
                    <div className="mb-2 block">
                    <Label
                        htmlFor="name"
                        value="Добро пожаловать. Как вас зовут?"
                    />
                    </div>
                    <TextInput
                        id="name"
                        type="text"
                        placeholder="Имя"
                        required={false}
                        value={name}
                        onChange={(e)=>setName(e.target.value)}
                    />
                </div>
                <div>
                    <div className="mb-2 block">
                    <Label
                        htmlFor="email1"
                        value="Ваш email (не обязательно, но если укажете подтверждать не придется)"
                    />
                    </div>
                    <TextInput
                        id="email1"
                        type="email"
                        placeholder="email@mail.ru"
                        required={false}
                        value={email}
                        onChange={(e)=>setEmail(e.target.value)}
                    />
                </div>
                <div>
                    <div className="mb-2 block">
                    <Label
                        htmlFor="login"
                        value="Логин на английском, по нему будет осуществляться вход. *"
                    />
                    </div>
                    <TextInput
                        id="login"
                        type="text"
                        placeholder="Login"
                        required={true}
                        value={login}
                        onChange={(e)=>setLogin(e.target.value)}
                    />
                </div>
                <div>
                    <div className="mb-2 block">
                    <Label
                        htmlFor="password"
                        value="Пароль*"
                    />
                    </div>
                    <TextInput
                        id="password"
                        type="password"
                        placeholder="Пароль"
                        required={true}
                        value={password}
                        onChange={(e)=>setPassword(e.target.value)}
                    />
                </div>
                {/* <div>
                    <div className="mb-2 block">
                    <Label
                        htmlFor="password2"
                        value="Подтверждение пароля*"
                    />
                    </div>
                    <TextInput
                        id="password2"
                        type="password"
                        placeholder="Пароль"
                        required={true}
                        value={password}
                        onChange={(e)=>setPassword(e.target.value)}
                    />
                </div> */}
                <Button type="submit" onClick={formHandler}>Зарегистрироваться и войти</Button>
            </form>         
        </div>

    )
}