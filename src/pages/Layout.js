import { Outlet } from "react-router-dom";
import {
  Container,
  StyledSideMenu,
  StyledMenuList,
  StyledMenuItem,
  MenuIcon,
  StyledLink,
  Dummy,
} from "../component/layout/LayoutStyles";
import { UserContext } from "../context/UserStore";
import { useContext, useState } from "react";
import { GiHamburgerMenu, GiCancel } from "react-icons/gi";
import { FiSettings } from "react-icons/fi";
import { LuListTodo } from "react-icons/lu";
import { FaHome, FaClipboardList, FaRegNewspaper } from "react-icons/fa";
import { BiCameraMovie } from "react-icons/bi";
import { CgProfile } from "react-icons/cg";
import { useNavigate } from "react-router-dom";

const Layout = () => {
  const context = useContext(UserContext);
  const { color } = context;
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const navigate = useNavigate();

  const onClickLeft = () => {
    setIsMenuOpen(!isMenuOpen);
  };
  const onClickRight = () => {
    navigate("/setting");
  };

  return (
    <Container color={color}>
      <header className="mainhead">
        <div className="hambeger">
          {isMenuOpen ? (
            <GiCancel size={32} color="white" onClick={onClickLeft} />
          ) : (
            <GiHamburgerMenu size={32} color="white" onClick={onClickLeft} />
          )}
        </div>
        <div className="setting">
          <FiSettings size={32} color="white" onClick={onClickRight} />
        </div>
        <StyledSideMenu
          isOpen={isMenuOpen}
          onClick={() => setIsMenuOpen(false)}
        >
          <StyledMenuList>
            <StyledMenuItem>
              <MenuIcon>
                <FaHome />
              </MenuIcon>
              <StyledLink to="/home">Home</StyledLink>
            </StyledMenuItem>
            <StyledMenuItem>
              <MenuIcon>
                <FaClipboardList />
              </MenuIcon>
              <StyledLink to="/Boards">Boards</StyledLink>
            </StyledMenuItem>
            <StyledMenuItem>
              <MenuIcon>
                <FaRegNewspaper />
              </MenuIcon>
              <StyledLink to="/News">News</StyledLink>
            </StyledMenuItem>
            <StyledMenuItem>
              <MenuIcon>
                <CgProfile />
              </MenuIcon>
              <StyledLink to="/Members">Members</StyledLink>
            </StyledMenuItem>
            <StyledMenuItem>
              <MenuIcon>
                <BiCameraMovie />
              </MenuIcon>
              <StyledLink to="/Movies">Movies</StyledLink>
            </StyledMenuItem>
            <StyledMenuItem>
              <MenuIcon>
                <LuListTodo />
              </MenuIcon>
              <StyledLink to="/ToDos">ToDos</StyledLink>
            </StyledMenuItem>
          </StyledMenuList>
        </StyledSideMenu>
      </header>
      <main onClick={() => setIsMenuOpen(false)}>
        <Dummy />
        <Outlet />
      </main>
      <footer>
        <div className="footer">
          <p>저작권 © KyungSoo. Jeong 모든 권한이 있습니다.</p>
        </div>
      </footer>
    </Container>
  );
};

export default Layout;
