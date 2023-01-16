import { Navbar} from "flowbite-react";
import {useLinkClickHandler, useLocation} from "react-router-dom";
import { getUser, getUserId } from "../../app/clientAPI/userSliceAPI";
import { useAppSelector } from "../../app/hooks/hooks";

export default function TopMenu(){
  const user = useAppSelector(getUser)
  const location = useLocation();
  const goMain = useLinkClickHandler("/");
  const goTexts = useLinkClickHandler("/texts");
  const goAuth = useLinkClickHandler("/authorization");
  const goUserPage = useLinkClickHandler("/userpage");
  const goRegistration = useLinkClickHandler("/registration");
    return (
      <div className="mb-4">
        <Navbar fluid={true} rounded={true}>
            <Navbar.Brand href="/">
                <span onClick={goMain} className="self-center whitespace-nowrap text-xl font-semibold dark:text-white">
                    StudyWord
                </span>
            </Navbar.Brand>
            <Navbar.Toggle />
            <Navbar.Collapse>
              <span onClick={goMain}>
                  <Navbar.Link href="/groups" active={location.pathname === '/'} color='dark'>
                    Слова
                  </Navbar.Link>
              </span>
              <span onClick={goTexts}>
                  <Navbar.Link href="/texts" active={location.pathname === '/texts'} color='dark'>
                    Тексты
                  </Navbar.Link>
              </span>
              {! user.id &&
                <>
                <span onClick={goRegistration}>
                    <Navbar.Link href="/registration" active={location.pathname === '/registration'} color='dark'>
                      Регистрация
                    </Navbar.Link>
                </span>
                <span onClick={goAuth}>
                    <Navbar.Link href='/authorization' active={location.pathname === '/authorization'} color='dark'>
                      Вход
                    </Navbar.Link>
                </span>
                </>
              }
              {user.id &&
              <span onClick={goUserPage}>
                  <Navbar.Link href='/userpage' active={location.pathname === '/userpage'} color='dark'>
                    Профиль
                  </Navbar.Link>
              </span>
              }
              
            </Navbar.Collapse>
        </Navbar>
      </div>
    )
}