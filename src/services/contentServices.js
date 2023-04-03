import { httpConstants } from "../constants";
import { BASE_URL2 } from "../reducers/Constants";
import { getParamTenantId } from "../utility/global";
import { AuthToken } from "./UserAuthToken";

export const uploadDocs = async (data) => {
  const form_data = new FormData();

  form_data.append("folderName", data.folderName);
  form_data.append("createdBy", data.createdBy);
  form_data.append("attachment", data.attachment);

  const res = await fetch(`${BASE_URL2}/api/v1/upload-documents${getParamTenantId()}`, {
    method: httpConstants.METHOD_TYPE.POST,
    // headers: {
    //   'Content-Type': httpConstants.CONTENT_TYPE.MULTIPART_FORM_DATA,
    // },
    body: form_data,
  });
  const result = await res.json();
};

export const getCollection = async () => {
  try {
    const res = await fetch(`${BASE_URL2}/api/v1/collections${getParamTenantId()}`);
    const result = await res.json();
    const collectionData = result.responseData;
    return collectionData;
  } catch (err) {
    console.log(err);
  }
};

export const getCollectionBySingleUser = async (userId,tenantWallet) => {
  try {
    const res = await fetch(`${BASE_URL2}/api/v1/users/${userId}/collections${getParamTenantId()}&walletAddress=${tenantWallet}`);
    const result = await res.json();
    const collectionData = result.responseData;
    return collectionData;
  } catch (err) {
    console.log(err);
  }
};

export const put_NftOpenForSale = async (_id) => {
  try {
    const res = await fetch(`${BASE_URL2}/api/v1/open-for-sale${getParamTenantId()}`, {
      method: httpConstants.METHOD_TYPE.PUT,
      headers: {
        "Content-Type": httpConstants.CONTENT_TYPE.APPLICATION_JSON,
      },
      body: JSON.stringify({ _id }),
    });
    const result = await res.json();
    return result;
  } catch (err) {
    console.log(err);
  }
};
export const RemoveNftFromSale = async (_id) => {
  try {
    const res = await fetch(`${BASE_URL2}/api/v1/remove-nft-from-sale${getParamTenantId()}`, {
      method: httpConstants.METHOD_TYPE.PUT,
      headers: AuthToken,
      // headers: {
      //   'Content-Type': httpConstants.CONTENT_TYPE.APPLICATION_JSON,
      // },
      body: JSON.stringify({ _id }),
    });
    const result = await res.json();

    return result;
  } catch (err) {
    console.log(err);
  }
};
