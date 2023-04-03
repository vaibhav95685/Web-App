import React from "react";
import { useEffect } from "react";
import styled from "styled-components";
import Utils from "../../utility";
import PageNotFound from "../../common/components/pageNotFound";
import { useNavigate, useParams } from "react-router-dom";
import { useState } from "react";
import NftLoader from "../../common/components/NftLoader";
import success from "../../assets/images/Check.svg";
import ContentService from "../../services/contentMicroservice";
import { useSelector } from "react-redux";
import { utils } from "ethers";

const UpperDiv = styled.div`
  position: relative;
`;

const HeaderDiv = styled.div`
  background-color: white;
  height: 100%;
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
  margin-top: 169px;
  margin-bottom: 439px;
`;

const ParentSaleDiv = styled.div`
  max-width: 710px;
  display: flex;
  justify-content: center;
  flex-direction: column;
  align-items: center;
`;

const SaleDiv = styled.div`
  font: normal normal bold 32px/48px Poppins;
  letter-spacing: 0px;
  color: #191919;
`;
const PriceDiv = styled.div`
  margin-top: 32px;
  width: 100%;
`;
const CommonText = styled.label`
  font: normal normal bold 16px/25px Poppins;
  letter-spacing: 0px;
  color: #191919;
`;
const PriceInputDiv = styled.div`
  margin-top: 13px;
  width: 100%;
  height: 42px;
  /* UI Properties */
  background: #ffffff 0% 0% no-repeat padding-box;
  border: 1px solid #c8c8c8;
  border-radius: 7px;
  display: flex;
  align-items: center;
`;
const InputDiv = styled.input`
  max-width: 620px;
  width: 68vw;
  padding-left: 14px;
  outline: none;
  border: none;
`;
const Line = styled.div`
  width: 0px;
  height: 100%;
  outline: 1px solid #707070;
  /* UI Properties */
`;
const CurrencyDiv = styled.div`
  text-align: center;
  font: normal normal normal 16px/25px Poppins-medium;
  letter-spacing: 0px;
  color: #366eef;

  margin: auto;
  width: 89.49px;
`;

const ScheduleDiv = styled.div`
  margin-top: 28px;
  width: 100%;
`;
const DesPrice = styled.label`
  font: normal normal normal 14px/21px Poppins;
  letter-spacing: 0px;
  color: #707070;
  margin-top: 20px;
  @media only screen and (max-width: 365px) {
    font-size: 3.5vw;
  }
`;
const DateTimeDiv = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
  margin-top: 13px;
  @media only screen and (max-width: 365px) {
    flex-direction: column;
  }
`;
const DateTimeInputField = styled.input`
  background: #ffffff 0% 0% no-repeat padding-box;
  border: 1px solid #c8c8c8;
  border-radius: 7px;
  max-width: 313px;
  width: 100%;
  height: 42px;
  padding-left: 7px;
  padding-right: 7px;
`;
const At = styled.label`
  font: normal normal medium 16px/25px Poppins;
  color: #828282;
  margin: 0px 10px;
`;
const Button = styled.button`
  width: 100%;
  height: 42px;
  margin-top: 28px;
  background: #366eef 0% 0% no-repeat padding-box;
  border: none;
  font: normal normal 600 16px/19px Segoe UI;
  color: #ffffff;
  border-radius: 8px;
`;
const Error = styled.div`
  margin-top: 20px;
  color: red;
`;

const PutItonSale = (props) => {
  const { id, currency } = useParams();
  let nft = props?.responseData;
  const [cryptoPriceUSD, setCryptoPrice] = useState({});
  const [dateTimeValue, setDateTimeValue] = useState({
    date: "",
    time: "",
  });
  const [salePrice, setSalePrice] = useState("");
  const [error, setError] = useState("");
  const [putOnSaleModal, setPutOnSaleModal] = useState(false);
  const appearance = useSelector((state) => state.customize.appearance);

  const navigate = useNavigate();
  let period = {
    expiryDate: dateTimeValue.date,
    expiryTime: dateTimeValue.time,
    price: salePrice,
  };

  useEffect(() => {
    async function cryptodata() {
      if (nft.salesInfo.currency != undefined) {
        const [error, res] = await Utils.parseResponse(
          ContentService.cryptoPrice(nft?.salesInfo?.currency)
        );
        if (res.success) {
          setCryptoPrice(res.responseData);
        } else {
          setCryptoPrice("");
        }
      }
    }
    cryptodata();
  }, [nft]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    valueCheck(name, value);
  };

  const valueCheck = (name, value) => {
    switch (name) {
      case "date":
        setDateTimeValue({ ...dateTimeValue, date: value });
        break;
      case "time":
        setDateTimeValue({ ...dateTimeValue, time: value });
        break;
      default:
        break;
    }
  };

  const priceValidation = (nftPrice) => {
    if (nftPrice.length == 0) {
      setError("( price is required)");
      return false;
    } else if (nft.blockchain === "Ethereum" && nftPrice < 0.004) {
      setError(
        "( Minimum listing price for an NFT should be more than 0.004 ETH )"
      );
      return false;
    } else if (nft.blockchain === "Polygon" && nftPrice < 11.71) {
      setError(
        "( Minimum listing price for an NFT should be more than 11.71 MATIC )"
      );
      return false;
    } else if (nft.blockchain === "Binance" && nftPrice < 0.027) {
      setError(
        "( Minimum listing price for an NFT should be more than 0.027 BNB )"
      );
      return false;
    } else if (nft.blockchain === "Ethereum" && nftPrice > 1000000000) {
      setError(
        "( Maximum listing price for an NFT should be less than 1,000,000,000 ETH )"
      );
      return false;
    } else if (nft.blockchain === "Polygon" && nftPrice > 2929880265000) {
      setError(
        "( Maximum listing price for an NFT should be less than 2,929,880,265,000 MATIC )"
      );
      return false;
    } else if (nft.blockchain === "Binance" && nftPrice > 6841316000) {
      setError(
        "( Maximum listing price for an NFT should be less than 6,841,316,000 BNB )"
      );
      return false;
    } else {
      setError("");
      return true;
    }
  };

  const putNftOnSale = async () => {
    let price = priceValidation(period.price);
    console.log(price,PutItonSale);
    if (price) {
      setPutOnSaleModal(true);
      let [failure, success] = await Utils.parseResponse(
        props.sellNowNft({
          blockchain: nft?.blockchain,
          expiryTime: period.expiryTime,
          expiryDate: period.expiryDate,
          price: period.price,
        })
      );
      if (failure || !success) {
        window.location.reload();
        Utils.apiFailureToast("Unable to generate signature");
      } else {
        Utils.apiSuccessToast("NFT has been put on sale");
        setPutOnSaleModal(false);
        setTimeout(() => {
          window.location.replace(`/nft-information/${id}`);
        }, 2000);
      }
    } else {
      setPutOnSaleModal(false);
    }
  };

  let enabled=dateTimeValue.date !="" && dateTimeValue.time!="" && error=="";

  return (
    <>
      {props.isNftValid ? (
        <>
          <HeaderDiv>
            <UpperDiv>
              <ParentSaleDiv>
                <SaleDiv>Sell NFT</SaleDiv>
                <PriceDiv>
                  <CommonText>Price*</CommonText>
                  <PriceInputDiv>
                    <InputDiv
                      type="number"
                      title=" "
                      placeholder="0"
                      autoComplete="off"
                      value={salePrice}
                      onWheel={(e) => e.target.blur()}
                      onChange={(e) => {
                        setSalePrice(e.target.value);
                        setError("");
                      }}
                    />
                    <Line />
                    <CurrencyDiv>{currency}</CurrencyDiv>
                  </PriceInputDiv>
                  {error != "" ? <Error> {error}</Error> : <></>}

                  <DesPrice>
                    Will be on sale until you transfer or cancel the item
                  </DesPrice>
                </PriceDiv>

                <ScheduleDiv>
                  <CommonText>Schedule for Future time</CommonText>
                  <DateTimeDiv>
                    <DateTimeInputField
                      type={"date"}
                      name="date"
                      min={Utils.disablePastDate()}
                      placeholder=""
                      onChange={handleChange}
                    />
                    <At>at</At>
                    <DateTimeInputField
                      name="time"
                      onChange={handleChange}
                      type={"time"}
                    />
                  </DateTimeDiv>
                </ScheduleDiv>

                <Button onClick={putNftOnSale} disabled={!enabled} style={{ opacity: !enabled ? 0.6 : 1}} >Post</Button>
              </ParentSaleDiv>
            </UpperDiv>
          </HeaderDiv>
          <NftLoader
            title={"Complete Your Listing"}
            nft={nft}
            display={putOnSaleModal}
            successImg={success}
            palletsColor={appearance.colorPalette}
            success={props?.saleSuccess}
            firstHeading={"initializing Wallet"}
            heading={`Confirm ${salePrice} ${nft.salesInfo?.currency} listing`}
            usdPrice={cryptoPriceUSD}
            putSalePrice={salePrice}
          />
        </>
      ) : (
        <PageNotFound />
      )}
    </>
  );
};

export default PutItonSale;
