import { getNft } from "../../services/webappMicroservice";
import React from "react";
import BaseComponent from "../baseComponent";
import Sale from "./sale";
import {toast} from "react-toastify";
import moment from "moment";
import Utils from "../../utility";
import ContentService from "../../services/contentMicroservice";
import BlockchainService from "../../services/blockchainService";


export default class SaleNFT extends BaseComponent {
    constructor(props) {
      super(props);
      this.state = {
        isNftValid: true,
        responseData: [],
        nftDetails: null,
        loaderState: true,
        saleSuccess: false,
      };
    }

    componentDidMount(){
        this.getNftDetail();

    }
  
    
    getNftDetail = async () => {
      const { pathname } = window.location;
      const pathArray = pathname.split("/");
      const id = pathArray[3];
      const currency=pathArray[4];
      console.log(id,pathArray,"sf")
  
      await getNft(id, (response) => {
        if (response.success) {
          this.setState({
            responseData: response?.responseData[0],
            isNftValid: true,
            // createdBy: "61de9sf37905a9s3863300611d",
          });
          console.log(response?.responseData[0].currency);
          if(response?.responseData[0]?.salesInfo?.currency !==currency){
            this.setState({isNftValid:false})
          }
        } else {
          this.setState({
            isNftValid: false,
          });
        }
  
      });
    };

    sellNowNft = async ({ blockchain, expiryTime, expiryDate, price }) => {
        const { pathname } = window.location;
        const pathArray = pathname.split("/");
        const id = pathArray[3];

        let dateTimeFormat = moment().format(`${expiryDate+","+expiryTime}`);
        let unixTimeZone = moment(dateTimeFormat).unix();
        let finalresult=unixTimeZone.toString()+"000";
        let px=Number(finalresult);

    
      
    
        var signMsg = "";
        var characters =
          "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
        var charactersLength = characters.length;
        for (var i = 0; i < 32; i++) {
          signMsg += characters.charAt(
            Math.floor(Math.random() * charactersLength)
          );
        }
    
        let newPrice=price* Math.pow(10,18)
        signMsg += "!" + px+"!"+newPrice;
    
        const [signError, signRes] = await Utils.parseResponse(
          BlockchainService.signcheck({
            signMsg: signMsg,
            blockchain: this?.state?.responseData?.blockchain,
          })
        );
        if (signError || !signRes) {
          this.setState({ loaderState: false,saleSuccess:false });
        } else {
            let requestData = {
                _id: this.state?.responseData?._id,
                signature: signRes.signature,
                message: signRes.signMsg,
                address: signRes.address,
                expiryDateTime: px,
                price: price,
              };
              
      
              if (!this.state?.responseData?._id) return;
              let [error, result] = await Utils.parseResponse(
                ContentService.openForSale(requestData)
              );
              if (error || !result) {
                this.setState({ loaderState: false,saleSuccess:false});
                Utils.apiFailureToast(error || "Unable to update Nft content");
              } else {
                this.setState({ loaderState: false,saleSuccess:true,nftDetails:result });
                return result;
              }
            
        }
    
        
      };

    render(){
        return (
            <>
            <Sale
              isNftValid={this.state.isNftValid}
              getNftDetail={this.getNftDetail}
              sellNowNft={this.sellNowNft}
              responseData={this.state.responseData}
              saleSuccess={this.state.saleSuccess}
            />
          </>
        );
      
    }
}  