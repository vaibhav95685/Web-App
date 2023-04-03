import banner from "../../assets/images/Banner.png";
import * as React from "react";
import Paper from "@mui/material/Paper";
import "../../assets/styles/Leader.css";
import styled from "styled-components";
import { useSelector } from "react-redux";
import { fetchPalletsColor } from "../../utility/global";
import Skeleton from "react-loading-skeleton";
import parse from 'html-react-parser';

const PrivacyContainer = styled.div`
max-width: 74%;
margin: 0 auto;
margin-top: 42px;
margin-bottom: 64px;
`;
const PrivacyHeading = styled.div`

`;
const Heading = styled.h1`
text-align: left;
font: normal normal 600 22px/33px Poppins;
color: #333333;
opacity: 1;
margin-bottom: 8px;
`;
const Text = styled.p`
text-align: left;
color: #585858;
font-size:14px;
line-height: 21px;
font-family: Poppins;
opacity: 1;
margin-bottom: 26px;
`;

export default function PrivacyPage({ loader }) {

  const customize = useSelector(state => state.customize);

  return (
    <>
      <div>
        {
          loader ? <Skeleton height="300px" /> :
            <div className="hero-image" style={{ background: `${fetchPalletsColor(customize?.appearance?.colorPalette)}` }}>
              <div className="hero-text">
                <p style={{ marginBottom: "0px" }}>
                  {
                    customize?.privacyPolicy.title!="" ? customize?.privacyPolicy?.title : 'Privacy'
                  }
                </p>
              </div>
            </div>
        }

        <PrivacyContainer>

          {
            loader ? <Skeleton count={5} height="150px" style={{marginBottom: '20px'}} /> :
              customize?.privacyPolicy?.descriptions!="" ? parse(customize?.privacyPolicy?.descriptions) :
              <>
                <PrivacyHeading>
                  <Heading>Privacy Policy</Heading>
                  <Text>
                    Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
                    eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut
                    enim ad minim veniam, quis nostrud exercitation ullamco laboris
                    nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in
                    reprehenderit in voluptate velit esse cillum dolore eu fugiat
                    nulla pariatur. Excepteur sint occaecat cupidatat non proident,
                    sunt in culpa qui officia deserunt mollit anim id est laborum
                  </Text>
                </PrivacyHeading>

                <PrivacyHeading>
                  <Heading>Heading</Heading>
                  <Text>
                    Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
                    eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut
                    enim ad minim veniam, quis nostrud exercitation ullamco laboris
                    nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in
                    reprehenderit in voluptate velit esse cillum dolore eu fugiat
                    nulla pariatur. Excepteur sint occaecat cupidatat non proident,
                    sunt in culpa qui officia deserunt mollit anim id est laborum
                  </Text>
                </PrivacyHeading>

                <PrivacyHeading>
                  <Heading>Heading</Heading>
                  <Text>
                    Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
                    eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut
                    enim ad minim veniam, quis nostrud exercitation ullamco laboris
                    nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in
                    reprehenderit in voluptate velit esse cillum dolore eu fugiat
                    nulla pariatur. Excepteur sint occaecat cupidatat non proident,
                    sunt in culpa qui officia deserunt mollit anim id est laborum
                  </Text>
                </PrivacyHeading>
              </>
          }

        </PrivacyContainer>
      </div>
    </>
  );
}
