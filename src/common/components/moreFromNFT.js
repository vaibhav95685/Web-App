import React from 'react'
import NftCardsHome from './NftCardsHome';
const MoreFromNFT = (props) => {
  return (
    <div
    className="more-Collection-div"
    style={{ display: props?.moreNft?.length > 0 ? "block" : "none" }}
  >
    <label className="MoreCollection-text">
      More from this collection
    </label>
    <div
      className="nftTileContainer ntf_row scroll-nft-card"
      style={{
        justifyContent: "start",
        overflowX: props?.moreNft?.length > 4 ? "scroll" : "hidden",
      }}
    >
      {props?.moreNft.map((nft) => {
        let mt="mt-0";
        return (
          <>
            <NftCardsHome nft={nft} appearance={props?.appearance} mt={mt} />
          </>
        );
      })}
    </div>
  </div>
  )
}

export default MoreFromNFT