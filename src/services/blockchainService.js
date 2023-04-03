import { ethers, BigNumber } from "ethers";
import contractABI from "../assets/abi/abi.json";
import contractPolygonABI from "../assets/abi/abi.json";
import contractbuyAndRemoveABI from "../assets/abi/removeSaleAndBuy.json";
import contractCollectionABI from "../assets/abi/collectionAbi.json";

import { toast } from "react-toastify";

import Utils from "../utility";

// let signer;
// let provider;
// if (!window.ethereum) {
//     // toast.error("Please install metamask ext otherwise you will not able to do tx");
//     //  alert("")
//     Utils.apiFailureToast("Please install metamask ext otherwise you will not able to do tx");
// } else {
//     provider = new ethers.providers.Web3Provider(window.ethereum);
//     signer = provider.getSigner();
// }
// const contractAddress = process.env.REACT_APP_CONTRACT_ADDRESS

// const contractAddress = "0xd3E390083BC66d87aFD1457879A2fDDfBBe16e06";
const BlockchainServices = {
  mintNFT,
  changeListedPrice,
  buyNFT,
  removeFromSaleNft,
  putOnSaleNft,
  createCollections,
  signcheck,
  batchMintNFT,
  makeOffer,
  acceptOffer,
  lazyMinting,
};

export default BlockchainServices;



async function mintNFT({
  tokenURI,
  price,
  tokenId,
  contractAddress,
  royalty,
  blockchain,
  ipfsUrl,
}) {
  const accounts = await window.ethereum.request({
    method: "eth_requestAccounts",
  });
  

  if (!window.ethereum) return Promise.reject("Please install metamask");

  if (window.ethereum.networkVersion == 80001 && blockchain == "Polygon") {
    //polygon
    const provider = new ethers.providers.Web3Provider(window.ethereum);
    const signer = provider.getSigner();
    const contractData = new ethers.Contract(
      contractAddress,
      contractPolygonABI,
      signer
    );
    const result = await contractData.mint(
      ipfsUrl,
      tokenId,
      ethers.utils.parseEther("0"),
      royalty,
      accounts[0],
    );
    let res = await result.wait();
    return {
      ...res,
      chainId: provider?._network?.chainId || "",
      name: provider?._network?.name || "",
    };
  } else if (window.ethereum.networkVersion == 4 && blockchain == "Ethereum") {
    //etherum
    const provider = new ethers.providers.Web3Provider(window.ethereum);
    const signer = provider.getSigner();
    const contractData = new ethers.Contract(
      contractAddress,
      contractABI,
      signer
    );
    const result = await contractData.mint(
      ipfsUrl,
      // tokenURI,
      // accounts[0],
      tokenId,
      // 20,
     ethers.utils.parseEther("0"),
      royalty,
      accounts[0]
    );
    let res = await result.wait();
    return {
      ...res,
      chainId: provider?._network?.chainId || "",
      name: provider?._network?.name || "",
    };
  } else if (window.ethereum.networkVersion == 97 && blockchain == "Binance") {
    //etherum
    console.log(contractAddress)
    const provider = new ethers.providers.Web3Provider(window.ethereum);
    const signer = provider.getSigner();
    const contractData = new ethers.Contract(
      contractAddress,
      contractABI,
      signer
    );
    const result = await contractData.mint(
      ipfsUrl,
      tokenId,
      ethers.utils.parseEther("0"),
      royalty,
      accounts[0]
    );
    let res = await result.wait();
    return {
      ...res,
      chainId: provider?._network?.chainId || "",
      name: provider?._network?.name || "",
    };
  } else return Promise.reject("Please Select Valid Network in the metamask");
  // ("kkkkkkkkkkkkkkkkkkkkkk network swutch")
}

async function lazyMinting({
  tokenURI,
  tokenId,
  price,
  royality,
  contractAddress,
  receiverAddress,
  signature,
  signMsg,
  blockchain
}) {

  if (window.ethereum.networkVersion == 4 && blockchain == "Ethereum") {

  let RinkebyAddress = "0x5ba6fcE01dB0f23695a5e86fA46a767671349AaB";

  const provider = new ethers.providers.Web3Provider(window.ethereum);
  const signer = provider.getSigner();

  const contractData = new ethers.Contract(
    RinkebyAddress,
    contractbuyAndRemoveABI,
    signer
  );
  const result = await contractData.mintAndBuy(
    tokenURI.toString(),
    tokenId,
    ethers.utils.parseEther(price.toString()),
    royality,
    signMsg.toString(),
    signature.toString(),
    contractAddress,
    receiverAddress,
    { value: ethers.utils.parseEther(price.toString()) }
    
  );
  let res = await result.wait();
  return {
    ...res,
    chainId: provider?._network?.chainId || "",
    name: provider?._network?.name || "",
  };
  }  else return Promise.reject("Please Select Valid Network in the metamask");
}

async function batchMintNFT({
  tokenId,
  amount,
  data,
  contractAddress,
  blockchain,
}) {
  let ArrayTokenID = [];
  for (let i = 0; i < 5; i++) {
    tokenId = tokenId + 1;
    ArrayTokenID.push(tokenId);
  }

  let ArrayAmount = Array(5).fill(amount);



  const accounts = await window.ethereum.request({
    method: "eth_requestAccounts",
  });

  if (!window.ethereum) return Promise.reject("Please install metamask");
  if (window.ethereum.networkVersion == 4 && blockchain == "Ethereum") {
    //etherum
    const provider = new ethers.providers.Web3Provider(window.ethereum);
    const signer = provider.getSigner();
    const contractData = new ethers.Contract(
      contractAddress,
      contractABI,
      signer
    );
    const result = await contractData.mintBatch(
      //tokenURI,
      accounts[0],
      ArrayTokenID,
      ArrayAmount,
      // ethers.utils.parseEther(price.toString()),
      // royalty,
      accounts[0]
    );
    let res = await result.wait();
    return {
      ...res,
      chainId: provider?._network?.chainId || "",
      name: provider?._network?.name || "",
    };
  } else return Promise.reject("Please Select Valid Network in the metamask");
}
async function makeOffer({ price ,blockchain}) {


  if (!window.ethereum) return Promise.reject("Please install metamask");
  if (window.ethereum.networkVersion == 4 && blockchain == "Ethereum") {
    const accounts = await window.ethereum.request({
      method: "eth_requestAccounts",
    });
    
  
    if (!window.ethereum) return Promise.reject("Please install metamask");
  
 
  
    const provider = new ethers.providers.Web3Provider(window.ethereum);
    const signer = provider.getSigner();
    const contractData = new ethers.Contract(
      "0x1a1Af51744b38E90aA413D5a4C590037273C10Ba",
      contractbuyAndRemoveABI,
      signer
    );
    const result = await contractData.makeOffer(
      { value: ethers.utils.parseEther(price.toString()) }
      // accounts[0]
    );
    let res = await result.wait();
    return {
      ...res,
      chainId: provider?._network?.chainId || "",
      name: provider?._network?.name || "",
      creatorWalletAddress: accounts[0],
    };


  }else return Promise.reject("Please Select Valid Network in the metamask");



 
  // return {
  //   tx,
  //   walletAddress,
  //   walletPrivateKey,
  //   walletMnemonicPhrase,
  //   creatorWalletAddress,
  // };
}
async function acceptOffer({
  signMsg,
  tokenId,
  contractAddress,
  receiverAddress,
  price,
  privateKey,
}) {
  let inializeContract = "0x1a1Af51744b38E90aA413D5a4C590037273C10Ba";

  try {
    if (!window.ethereum) return Promise.reject("Please install metamask");
    await window.ethereum.send("eth_requestAccounts");
    const provider = new ethers.providers.Web3Provider(window.ethereum);
    const signer = provider.getSigner();
    const signature = await signer.signMessage(signMsg);
    const address = await signer.getAddress();

    
    const contractData = new ethers.Contract(
      inializeContract,
      contractbuyAndRemoveABI,
      signer
    );
    const result = await contractData.acceptOffer(
      // ipfsUrl,
      // // tokenURI,
      // // accounts[0],
      tokenId,
      signMsg,
      signature,
      contractAddress,
      receiverAddress,
      {gasLimit:100000}

      // // 20,
      // ethers.utils.parseEther(price.toString()),
      // royalty
      // // accounts[0]
    );
    let res = await result.wait();
    return {
      ...res,
      chainId: provider?._network?.chainId || "",
      name: provider?._network?.name || "",
    };

 
  } catch (err) {
    Promise.reject(err);
  }
}

async function signcheck({ signMsg,blockchain }) {
  try {
  


    if (!window.ethereum) return Promise.reject("Please install metamask");

    if (window.ethereum.networkVersion == 4 && blockchain == "Ethereum") {
    await window.ethereum.send("eth_requestAccounts");
    const provider = new ethers.providers.Web3Provider(window.ethereum);
    const signer = provider.getSigner();
    const signature = await signer.signMessage(signMsg);
    const address = await signer.getAddress();
    return {
      signMsg,
      signature,
      address,
    };

  }
  else if (window.ethereum.networkVersion == 80001 && blockchain == "Polygon") {
    await window.ethereum.send("eth_requestAccounts");
    const provider = new ethers.providers.Web3Provider(window.ethereum);
    const signer = provider.getSigner();
    const signature = await signer.signMessage(signMsg);
    const address = await signer.getAddress();
    return {
      signMsg,
      signature,
      address,
    };

  }
  else if (window.ethereum.networkVersion == 97 && blockchain == "Binance") {
    await window.ethereum.send("eth_requestAccounts");
    const provider = new ethers.providers.Web3Provider(window.ethereum);
    const signer = provider.getSigner();
    const signature = await signer.signMessage(signMsg);
    const address = await signer.getAddress();
    return {
      signMsg,
      signature,
      address,
    };

  }
  else return Promise.reject("Please Select Valid Network in the metamask");

    

  } catch (err) {
    Promise.reject(err);
  }

}

async function signverfiy({ message, address, signature }) {
  try {
    if (!window.ethereum) return Promise.reject("Please install metamask");
    const signerAddr = await ethers.utils.verifyMessage(message, signature);
    if (signerAddr !== address) {
      return false;
    }
    return true;
  } catch (err) {
    Promise.reject(err);
  }
}

//price should be in wei
async function changeListedPrice({ tokenId, price, contractAddress }) {
  if (!window.ethereum) return Promise.reject("Please install metamask");
  if (window.ethereum.networkVersion == 80001) {
  } else return Promise.reject("Switch this network into Rinkeby");
  const provider = new ethers.providers.Web3Provider(window.ethereum);
  const signer = provider.getSigner();
  const contractData = new ethers.Contract(
    contractAddress,
    contractABI,
    signer
  );
  const result = await contractData.updatePrice(
    tokenId,
    ethers.utils.parseEther(price.toString())
  );
  let res = await result.wait();

  return {
    ...res,
    chainId: provider?._network?.chainId || "",
    name: provider?._network?.name || "",
  };
}

async function removeFromSaleNft({
  tokenId,
  contractAddress,
  blockchain,
  message,
  address,
  signature,
}) {
  let Ethereum = "0x3124f1f72eca189b7fd5EE602F3ADFEb7a83763f";
  let Polygon = "0xE5680E66c19bAfc10F4B24b4188677a58fD5fC50";
  let Binance = "0x6C626D2226C2415Ab32989660ea7f2C6265f230c";

  if (!window.ethereum) return Promise.reject("Please install metamask");
  if (window.ethereum.networkVersion == 80001 && blockchain == "Polygon") {
    const provider = new ethers.providers.Web3Provider(window.ethereum);
    const signer = provider.getSigner();
    const contractData = new ethers.Contract(
      Polygon,
      contractbuyAndRemoveABI,
      signer
    );
    const result = await contractData.cancel(
      tokenId,
      message,
      signature,
      contractAddress
    );
    let res = await result.wait();
    return {
      ...res,
      chainId: provider?._network?.chainId || "",
      name: provider?._network?.name || "",
    };
  } else if (window.ethereum.networkVersion == 4 && blockchain == "Ethereum") {
    const provider = new ethers.providers.Web3Provider(window.ethereum);
    const signer = provider.getSigner();
    const contractData = new ethers.Contract(
      Ethereum,
      contractbuyAndRemoveABI,
      signer
    );
    const result = await contractData.cancel(
      tokenId,
      message,
      signature,
      contractAddress
    );
    let res = await result.wait();
    return {
      ...res,
      chainId: provider?._network?.chainId || "",
      name: provider?._network?.name || "",
    };
  } else if (window.ethereum.networkVersion == 97 && blockchain == "Binance") {
    const provider = new ethers.providers.Web3Provider(window.ethereum);
    const signer = provider.getSigner();
    const contractData = new ethers.Contract(
      Binance,
      contractbuyAndRemoveABI,
      signer
    );
    const result = await contractData.cancel( 
      tokenId,
      message,
      signature,
      contractAddress);
    let res = await result.wait();
    return {
      ...res,
      chainId: provider?._network?.chainId || "",
      name: provider?._network?.name || "",
    };
  } else return Promise.reject("Please Select Valid Network in the metamask");
}

// async function putOnSaleNft({tokenId}) {
//     const contractData = new ethers.Contract(contractAddress, contractABI, signer);
//     ("blockchain fn",contractData)

//     const result = await contractData.updateListingStatus(tokenId,true)

//     let res = await result.wait();
//     return {
//         ...res,
//         chainId: provider?._network?.chainId || '',
//         name: provider?._network?.name || '',
//     }
// }

//1bnb=0.136ether
async function buyNFT({
  tokenId,
  price,
  contractAddress,
  message,
  signature,
  receiverAddress,
}) {

  let RinkebyAddress = "0xf7AC24823B0B31d05631850B5Ab45A9Cb79D7a34";
  let PolygonAddress = "0xE5680E66c19bAfc10F4B24b4188677a58fD5fC50";
  let BinanceAddress = "0x6C626D2226C2415Ab32989660ea7f2C6265f230c";


  const receiver = await window.ethereum.request({
    method: "eth_requestAccounts",
  });
  if (!window.ethereum) return Promise.reject("Please install metamask");
  if (window.ethereum.networkVersion == 80001) {
    const provider = new ethers.providers.Web3Provider(window.ethereum);
    const signer = provider.getSigner();
    const contractData = new ethers.Contract(
      PolygonAddress,
      contractbuyAndRemoveABI,
      signer
    );

    const resultBuy = await contractData.buy(
      tokenId,
      message.toString(),
      signature.toString(),
      contractAddress,
      receiver[0],
      { value: ethers.utils.parseEther(price.toString()) }
    );
    // const finalResult = await signer.sendTransaction(resultBuy);
    // const amount = ethers.utils.parseUnits(price.toString(), 18);
    //  const accounts = await provider.send("eth_requestAccounts", []);

    // const balance = await provider.getBalance(accounts[0]);
    // if (
    //   ethers.utils.formatUnits(balance, 18) <
    //   ethers.utils.formatUnits(amount, 18)
    // )
    //   return Promise.reject("Insufficient fund");

    // const options = { value: ethers.utils.parseEther(price.toString()) };

    // const result = await contractData.buy(tokenId, options);


    let res = await resultBuy.wait();

    return {
      ...res,
      chainId: provider?._network?.chainId || "",
      name: provider?._network?.name || "",
    };
  } else if (window.ethereum.networkVersion == 4) {
    const provider = new ethers.providers.Web3Provider(window.ethereum);

    const signer = provider.getSigner();
    const contractData = new ethers.Contract(
      RinkebyAddress,
      contractbuyAndRemoveABI,
      signer
    );
    const resultBuy = await contractData.buy(
      tokenId,
      message.toString(),
      signature.toString(),
      contractAddress,
      receiver[0],
      { value: ethers.utils.parseEther(price.toString()) }
    );
    // ("<<<resultBuy",resultBuy)

    // const amount = ethers.utils.parseUnits(price.toString(), 18);
    // const accounts = await provider.send("eth_requestAccounts", []);

    // const balance = await provider.getBalance(accounts[0]);
    // if (
    //   ethers.utils.formatUnits(balance, 18) <
    //   ethers.utils.formatUnits(amount, 18)
    // )
    //   return Promise.reject("Insufficient fund");

    // const options = { value: ethers.utils.parseEther(price.toString()) };

    // const result = await contractData.buy(tokenId, options);
    // (
    //   "jjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjj",
    //   result
    // );

    let res = await resultBuy.wait();

    return {
      ...res,
      chainId: provider?._network?.chainId || "",
      name: provider?._network?.name || "",
    };
  } else if (window.ethereum.networkVersion == 97) {
    const provider = new ethers.providers.Web3Provider(window.ethereum);

    const signer = provider.getSigner();
    const contractData = new ethers.Contract(
      BinanceAddress,
      contractbuyAndRemoveABI,
      signer
    );
    const resultBuy = await contractData.buy(
      tokenId,
      message.toString(),
      signature.toString(),
      contractAddress,
      receiver[0],
      { value: ethers.utils.parseEther(price.toString()) }
    );
    const amount = ethers.utils.parseUnits(price.toString(), 18);
    const accounts = await provider.send("eth_requestAccounts", []);

    const balance = await provider.getBalance(accounts[0]);
    if (
      ethers.utils.formatUnits(balance, 18) <
      ethers.utils.formatUnits(amount, 18)
    )
      return Promise.reject("Insufficient fund");

    // const options = { value: ethers.utils.parseEther(price.toString()) };

    // const result = await contractData.buy(tokenId, options);
   

    let res = await resultBuy.wait();

    return {
      ...res,
      chainId: provider?._network?.chainId || "",
      name: provider?._network?.name || "",
    };
  } else return Promise.reject("Please Select Valid Network in the metamask");
  
}

async function putOnSaleNft({ tokenId, contractAddress }) {
  if (!window.ethereum) return Promise.reject("Please install metamask");

  if (window.ethereum.networkVersion == 80001) {
    const provider = new ethers.providers.Web3Provider(window.ethereum);
    const signer = provider.getSigner();
    const contractData = new ethers.Contract(
      contractAddress,
      contractABI,
      signer
    );
    const result = await contractData.updateListingStatus(tokenId, true);

    let res = await result.wait();
    return {
      ...res,
      chainId: provider?._network?.chainId || "",
      name: provider?._network?.name || "",
    };
  } else if (window.ethereum.networkVersion == 4) {
    const provider = new ethers.providers.Web3Provider(window.ethereum);
    const signer = provider.getSigner();
    const contractData = new ethers.Contract(
      contractAddress,
      contractABI,
      signer
    );
    const result = await contractData.updateListingStatus(tokenId, true);

    let res = await result.wait();
    return {
      ...res,
      chainId: provider?._network?.chainId || "",
      name: provider?._network?.name || "",
    };
  } else return Promise.reject("Please Select Valid Network in the metamask");
  // const provider = new ethers.providers.Web3Provider(window.ethereum);
  // const signer = provider.getSigner();
  // const contractData = new ethers.Contract(
  //     contractAddress,
  //     contractABI,
  //     signer
  // );
  // const result = await contractData.updateListingStatus(tokenId, true);

  // let res = await result.wait();
  // return {
  //     ...res,
  //     chainId: provider?._network?.chainId || "",
  //     name: provider?._network?.name || "",
  // };
}
// for create collections
async function createCollections({ name, symbol, blockchain }) {
  let contractCollectionAddress;
  if (blockchain === "Polygon")
    contractCollectionAddress =
      process.env.REACT_APP_CONTRACT_COLLECTION_ADDRESS_POLYGON;
  else if (blockchain == "Ethereum")
    contractCollectionAddress =
      process.env.REACT_APP_CONTRACT_COLLECTION_ADDRESS;
  else if (blockchain === "Binance")
    contractCollectionAddress =
      process.env.REACT_APP_CONTRACT_COLLECTION_ADDRESS_BINANCE;

  if (!window.ethereum) return Promise.reject("Please install metamask");
  if (window.ethereum.networkVersion == 80001 && blockchain === "Polygon") {
    const provider = new ethers.providers.Web3Provider(window.ethereum);
    const signer = provider.getSigner();
    const contractData = new ethers.Contract(
      contractCollectionAddress,
      contractCollectionABI,
      signer
    );
    const result = await contractData.createCollection(name, symbol);

    let res = await result.wait();

    const getReceipt = await provider.getTransactionReceipt(
      res.transactionHash
    );

    return {
      ...res,
      contract_address: getReceipt.logs[0].address,
      chainId: provider?._network?.chainId || "",
      name: provider?._network?.name || "",
    };
  } else if (window.ethereum.networkVersion == 4 && blockchain === "Ethereum") {
    const provider = new ethers.providers.Web3Provider(window.ethereum);
    const signer = provider.getSigner();
    const contractData = new ethers.Contract(
      contractCollectionAddress,
      contractCollectionABI,
      signer
    );
    const result = await contractData.createCollection(name, symbol);

    let res = await result.wait();

    const getReceipt = await provider.getTransactionReceipt(
      res.transactionHash
    );

    return {
      ...res,
      contract_address: getReceipt.logs[0].address,
      chainId: provider?._network?.chainId || "",
      name: provider?._network?.name || "",
    };
  } else if (window.ethereum.networkVersion == 97 && blockchain === "Binance") {
    const provider = new ethers.providers.Web3Provider(window.ethereum);
    const signer = provider.getSigner();
    const contractData = new ethers.Contract(
      contractCollectionAddress,
      contractCollectionABI,
      signer
    );
    const result = await contractData.createCollection(name, symbol);

    let res = await result.wait();

    const getReceipt = await provider.getTransactionReceipt(
      res.transactionHash
    );
    return {
      ...res,
      contract_address: getReceipt.logs[0].address,
      chainId: provider?._network?.chainId || "",
      name: provider?._network?.name || "",
    };
  } else return Promise.reject("Please Select Valid Network in the metamask");
}
