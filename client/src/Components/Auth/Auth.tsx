import { Button, Label, TextInput } from "flowbite-react";
import { useState } from "react";
import { exitThunk, loginThunk } from "../../app/clientAPI/userSliceAPI";
import { useAppDispatch } from "../../app/hooks/hooks";

export default function Auth(){
    const dispatch = useAppDispatch()
    const [login, setLogin] = useState<string>('')
    const [password, setPassword] = useState<string>('')
    async function formHandler(e: any){
        e.preventDefault()
        dispatch(loginThunk({login, password}))
    }
    async function exit(e: any){
        e.preventDefault()
        dispatch(exitThunk())
    }
    return(
        <div className="w-full sm:w-96 mx-auto p-4 bg-white rounded-lg border border-gray-200 shadow-md dark:bg-gray-800 dark:border-gray-700">
            <form className="flex flex-col gap-4">
                <div>
                    <div className="mb-2 block">
                    <Label
                        htmlFor="email1"
                        value="Your login or email"
                    />
                    </div>
                    <TextInput
                        id="email1"
                        type="email"
                        placeholder="Login"
                        required={true}
                        value={login}
                        onChange={(e)=>setLogin(e.target.value)}
                    />
                </div>
                <div>
                    <div className="mb-2 block">
                    <Label
                        htmlFor="password1"
                        value="Your password"
                    />
                    </div>
                    <TextInput
                        id="password1"
                        type="password"
                        placeholder="Password"
                        required={true}
                        value={password}
                        onChange={(e)=>setPassword(e.target.value)}
                    />
                </div>
                <Button type="submit" onClick={formHandler}>Вход</Button>
                <Button type="button" onClick={exit}>Exit</Button>
            </form>         
        </div>

    )
}