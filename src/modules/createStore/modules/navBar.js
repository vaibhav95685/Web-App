import React, { useEffect, useState } from "react";
import styled from "styled-components";
import { useNavigate } from "react-router-dom";
import { Link } from "react-router-dom";
import HamburgerMenu from "../../../assets/images/IconFeatherMenu.svg";
import NFTinger from "../../../assets/images/NFTinger.svg";
import MenuMob from "./humburgerMenu";

const MainDiv = styled.div`
  width: 100%;
  background: #031527 0% 0% no-repeat padding-box;
  box-shadow: 0px 3px 12px #0000000f;
`;
const Image = styled.img`
  width: ${(props) => props.width};
  height: ${(props) => props.height};
  display: ${(props) => props.display};
  @media (max-width: 600px) {
    width: ${(props) => props.mobWidth};
    height: ${(props) => props.mobHeight};
    display: ${(props) => props.mobDisplay};
    marginleft: ${(props) => props.mobMarginLeft};
  }
`;
const NavDiv = styled.div`
  width: 100%;
  margin-left: 0.6rem;
  height: 70px;
  padding: 34px;
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
  @media (max-width: 767px) {
    margin-left: 0;
    padding-left: 16px;
    padding-top: 8px;
    padding-right: 16px;
    padding-bottom: 12px;
  }
`;
const NavItem = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: space-between;
`;
const LogoDiv = styled.div`
  text-align: left;
  font: normal normal normal 29px/33px Whiskey Girls Condensed;
  letter-spacing: 0px;
  color: #016dd9;
  cursor: pointer;
  opacity: 1;
`;
const ItemsDiv = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  margin-right: 4.5rem;
  @media only screen and (max-width: 767px) {
    margin-right: 0;
  }
  @media only screen and (min-width: 768px) and (max-width: 1024px) {
    margin-right: 25px;
  }
`;
const Item = styled.label`
  text-align: left;
  font: normal normal 600 16px/25px Poppins;
  letter-spacing: 0px;
  color: #8f9ba7;
  opacity: 1;
  margin-right: 2.3rem;
  cursor: pointer;
`;
const CreateStore = styled.button`
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: row;
  text-align: left;
  font: normal normal medium 16px/25px Poppins;
  letter-spacing: 0px;
  color: #031527;
  background: #ffffff 0% 0% no-repeat padding-box;
  border-radius: 6px;
  opacity: 1;
  height: 40px;
  &:hover {
    background-color: #016dd9;
    color: white;
  }
  @media (min-width: 768px) {
    width: 173px;
  }
  @media (max-width: 767px) {
    max-width: 130px;
    font-size: 14px;
    line-height: 21px;
    white-space: nowrap;
    padding-left: 13px;
    padding-right: 12px;
    font-style: normal;
    font-variant: normal;
  }
`;

const ListItem = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  @media (max-width: 600px) {
    display: none;
  }
`;

const Nav = ({ MetaMaskConnector, setModal, loader }) => {
  const navigate = useNavigate();
  const [menu, setMenu] = useState(false);

  
  return (
    <MainDiv>
      <NavDiv>
        <LogoDiv>
          <Image
            onClick={() => navigate("/")}
            src={NFTinger}
            mobWidth="114px"
            mobHeight="25px"
          />
          <Image
            src={HamburgerMenu}
            onClick={() => {
              setMenu(!menu);
              setModal(false);
            }}
            display="none"
            mobDisplay="inline"
            mobMarginLeft="16px"
          />
        </LogoDiv>
        <NavItem>
          <ItemsDiv>
            <ListItem>
              <Item>Pricing</Item>
              <Item>
                <div className="menuin">
                  {/* <h2>Resources</h2> */}
                  <li className="nav-item dropdown list-unstyled">
                    <a
                      className="nav-link c-8f9ba7 font-16 dropdown"
                      href="#"
                      id="navbarDropdown"
                      role="button"
                      data-bs-toggle="dropdown"
                      aria-expanded="false"
                    >
                      Resource
                    </a>
                    <ul
                      className="dropdown-menu bg-031527"
                      aria-labelledby="navbarDropdown"
                    >
                      <li>
                        <Link
                          className="dropdown-item bg-031527"
                          to="/help-center"
                        >
                          Help Center
                        </Link>
                      </li>
                      <li>
                        <Link
                          className="dropdown-item bg-031527"
                          to="/Suggestion"
                        >
                          Suggestions
                        </Link>
                      </li>
                    </ul>
                  </li>
                </div>
              </Item>
              <Item onClick={MetaMaskConnector}>Login</Item>
            </ListItem>
            <CreateStore onClick={MetaMaskConnector}>
              {/* <div className="display-loader-left m-t-2">
                {loader ? <Spinner></Spinner> : ""}
              </div> */}
              Create Store
            </CreateStore>
          </ItemsDiv>
        </NavItem>
      </NavDiv>

      <MenuMob {...{ menu, setMenu, MetaMaskConnector }} />
    </MainDiv>
  );
};

export default Nav;
