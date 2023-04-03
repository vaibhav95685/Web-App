import { httpConstants } from '../constants';
import { BASE_URL, BASE_URL2 } from '../reducers/Constants';
import { getParamTenantId } from '../utility/global';
import { AuthToken } from './UserAuthToken';

export const createSingleNft = async data => {
  try {
    const res = fetch(`${BASE_URL2}/api/v1/nft`, {
      method: httpConstants.METHOD_TYPE.POST,
      headers:AuthToken,
      // headers: {
      //   'Content-Type': httpConstants.CONTENT_TYPE.MULTIPART_FORM_DATA,
      // },
      body: data,
    });
    const result = res.json();
    return result;
  } catch (error) {
    
  }
};

export const createCollection = async data => {
  try {
    const res = await fetch(`${BASE_URL2}/api/v1/collections${getParamTenantId()}`, {
      method: httpConstants.METHOD_TYPE.POST,
      // headers: {
      //   'Content-Type': httpConstants.CONTENT_TYPE.APPLICATION_JSON,
      // },
      headers:AuthToken,
      body: JSON.stringify(data),
    });
    const result = await res.json();

    return result;
  } catch (err) {
    return err;
  }
};
export const collectionStatus = async data => {
  try {
    const res = await fetch(`${BASE_URL2}/api/v1/collections/${data._id}/status`, {
      method: httpConstants.METHOD_TYPE.POST,
      // headers: {
      //   'Content-Type': httpConstants.CONTENT_TYPE.APPLICATION_JSON,
      // },
      headers:AuthToken,
      body: JSON.stringify(data),
    });
    const result = await res.json();

    return result;
  } catch (err) {
    return err;
  }
};
