import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import TopMenu from './Components/TopMenu/TopMenu';
import Groups from './Components/Groups/Groups';
import Grammar from "./Components/Grammar/Grammar";
import Texts from "./Components/Texts/TextsGrid";
import GroupPage from "./Components/Groups/GroupPage";
import English from "./Components/Methods/English";
import Russian from "./Components/Methods/Russian";
import Spelling from "./Components/Methods/Spelling";
import Auding from "./Components/Methods/Auding";
import { useEffect } from 'react';
import Footer from './Components/Footer/Footer';
import AdminMenu from './AdminComponents/AdminMenu/AdminMenu';
import AdminWords from './AdminComponents/AdminWords/AdminWords';
import AdminGroups from './AdminComponents/AdminGroups/AdminGroups';
import BreadCrumb from './Components/BreadCrumbp/BreadCrumb';
import Auth from './Components/Auth/Auth';
import { useAppDispatch, useAppSelector } from './app/hooks/hooks';
import { getUserId, refreshTokensThunk } from './app/clientAPI/userSliceAPI';
import TextPage from "./Components/Texts/TextPage";
import { getVocabularyThunk } from "./app/clientAPI/vocabularySliceAPI";
import UserPage from "./Components/UserPage/UserPage";
import Registration from "./Components/Auth/Registration";
import GroupAllWords from "./Components/Groups/GroupAllWords";
import AdminOneGroup from "./AdminComponents/AdminGroups/AdminOneGroup";
import AdminOneWord from "./AdminComponents/AdminWords/AdminOneWord";
import UserVocabularyPage from "./Components/UserPage/Vocabulary";
import AdminTexts from "./AdminComponents/AdminTexts/AdminTexts";
import AdminAddText from "./AdminComponents/AdminTexts/AdminAddText";

function App() {
    const dispatch = useAppDispatch()
    const userId = useAppSelector(getUserId)
    useEffect(()=>{
        //Добавь проверку авторизован ли юзер на сервере фетчем и только после этого реавторизируйся
        dispatch(refreshTokensThunk())
    }, [])
    const admin = userId === 1
    return (
        <div className='container mx-auto px-4 py-4 max-w-7xl'>
            <Router>
                {admin && <AdminMenu />}
                <TopMenu />
                <BreadCrumb />
                <Routes>
                    {admin && <>
                        <Route path="/admin/words" element={ <AdminWords /> } />
                        <Route path="/admin/words/:id" element={ <AdminOneWord /> } />
                        <Route path="/admin/groups" element={ <AdminGroups /> } />
                        <Route path="/admin/groups/:id" element={ <AdminOneGroup /> } />
                        <Route path="/admin/texts/" element={ <AdminTexts /> } />
                        <Route path="/admin/texts/add" element={ <AdminAddText /> } />
                        {/* <Route path="/admin/texts/:id" element={ <AdminOneGroup /> } /> */}
                    </> }
                    
                    <Route path="/" element={<Groups />} />
                    <Route path="/userpage" element={<UserPage />} />
                    <Route path="/userpage/vocabulary" element={<UserVocabularyPage />} />
                    <Route path="/registration" element={<Registration />} />
                    <Route path="/authorization" element={<Auth />} />
                    <Route path="/grammar" element={<Grammar />} />
                    <Route path="/texts" element={<Texts />} />
                    <Route path="/texts/:id_text" element={<TextPage />} />
                    <Route path="/groups" element={<Groups />} />
                    <Route path="/groups/:id_group" element={<GroupPage />} />
                    <Route path="/groups/:id_group/all" element={<GroupAllWords />} />
                    <Route path={`/groups/:id_group/english`} element={<English />} />
                    <Route path={`/groups/:id_group/russian`} element={<Russian  />} />
                    <Route path={`/groups/:id_group/spelling`} element={<Spelling />} />
                    <Route path={`/groups/:id_group/auding`} element={<Auding />} />
                    
                </Routes>
            </Router>
            <Footer />
        </div>
  )
}

export default App;
