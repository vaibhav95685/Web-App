import Utils from "../../../utility";
import {
  updateSubscription,
  addTranscation,
  tenantSubscription,
} from "../../../services/clientConfigMicroService";

export async function responseCheck(responseCode) {
  if (responseCode === 401) {
    Utils.apiFailureToast("Something went wrong");
    window.location.reload();
  }
  return;
}

export async function addTranscationSuccess(customize, item) {
  let transctionReqData = {
    subscriptionId: item._id,
    tenantId: customize.id,
    addedBy: customize.id,
    isPaymentSuccess: false,
  };
  const [transcationFailure, transactionSuccess] = await Utils.parseResponse(
    addTranscation(transctionReqData)
  ); //update subscription
  responseCheck(transactionSuccess.responseCode);
}

export async function addTranscationFailure(customize, item) {
  let transctionReqData = {
    subscriptionId: item._id,
    tenantId: customize.id,
    addedBy: customize.id,
    isPaymentSuccess: false,
  };
  const [transcationFailure, transactionSuccess] = await Utils.parseResponse(
    addTranscation(transctionReqData)
  ); //update subscription
  responseCheck(transactionSuccess.responseCode);
}

export const updateSub = async (response, item, customize, user) => {
  let updateSubscriptionRequestData = {
    planName: item.planName,
    planId: item._id,
    billingCycle: item.billingCycle,
    price: item?.price,
    currency: item?.currency,
    walletAddress: customize.walletAddress,
    tenantId: customize.id,
    features: item.feature,
    paymentDetails: {
      orderId: "123456", //pending
      paymentId: response?.razorpay_payment_id,
      price: item.price,
      status: true,
    },
  };
  const [updateSubscriptionError, updateSubscriptionResult] =
    await Utils.parseResponse(
      updateSubscription(
        updateSubscriptionRequestData,
        customize.id,
        user?.token
      )
    ); //update subscription
  responseCheck(updateSubscriptionResult.responseCode);
};

export const tenantSub = async (item, customize, user) => {
  let tenantReqData = {
    subscriptionMeta: {
      subscriptionId: item._id,
      name: item.planName,
      startDate: "123456", //pending
      endDate: "123456", //pending
      numberOfNfts: 100,
    },
  };
  const [tenantSubErr, tenantSub] = await Utils.parseResponse(
    tenantSubscription(tenantReqData, customize.id, user?.token)
  );
  responseCheck(tenantSub.responseCode);
};
