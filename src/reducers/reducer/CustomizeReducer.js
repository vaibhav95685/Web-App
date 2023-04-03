const initialState = {
    storeName: 'ANFTO',
    storeFee: 0,
    storeLogo: false,
    about: {
        title: "About NFTinger's Marketplace",
        subTitle: "NFT marketplace in numbers",
        description: "",
        contactEmail: ""
    },
    appearance: {
        colorPalette: 1,
        coverImageUrl: false,
        coverPosition: "center",
        heading: false,
        description: false,
        buttons: [],
        featuredAssets: []
    },
    categories: [],
    privacyUrl: false,
    socailMedia: [],
    permissionToUploadNft: false,
    bannerNftData: [],
    privacyPolicy: false,
    termsAndConditions: false,
    id:"",
    walletAddress:""
}


export const CustomizeReducer = (state = initialState, action) => {

    const { type, payload } = action;

    switch (type) {
        case 'ADD_CUSTOMIZE_DATA':
            return {
                ...state,
                storeName: payload.storeName,
                storeFee: payload.storeFee,
                storeLogo: payload.companyLogo,
                about: payload.about,
                appearance: payload.appearance,
                categories: payload.categories,
                privacyUrl: payload.siteUrl,
                socailMedia: payload.socialMediaConnection,
                permissionToUploadNft: payload.permissionToUploadNft,
                privacyPolicy: payload.privacyPolicy,
                termsAndConditions: payload.termsAndConditions,
                id:payload._id,
                walletAddress:payload.wallet
            }

        case 'ADD_BANNER_NFTS':
            return{
                ...state,
                bannerNftData: payload
            }    

        case 'RESET_APPEARENCE':
            return {
                storeName: 'ANFTO',
                storeFee: 0,
                storeLogo: false,
                about: {
                    title: "About Anafto's Marketplace",
                    subTitle: "NFT marketplace in numbers",
                    description: "",
                    contactEmail: ""
                },
                appearance: {
                    colorPalette: 1,
                    coverImageUrl: false,
                    coverPosition: "center",
                    heading: false,
                    description: false,
                    buttons: [],
                    featuredAssets: []
                },
                categories: [],
                privacyUrl: false,
                socailMedia: [],
                permissionToUploadNft: false,
                bannerNftData: []
            }

        default:
            return state
    }

} 