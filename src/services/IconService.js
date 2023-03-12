// Ref my html code: https://github.com/tiennt0212/devera-nft-presale/blob/master/presale-nft/exampleHTML.html
// Ref ICONex doc: https://github.com/icon-project/iconex_chrome_extension/tree/master/docs/iconex_connect
// Ref icon-sdk-js doc: https://github.com/icon-project/icon-sdk-js
// Ref ICON Dev Portal doc: https://docs.icon.community/icon-stack/client-apis/javascript-sdk/examples
import IconService from "icon-sdk-js";
// import HttpProvider from "icon-sdk-js/build/transport/http/HttpProvider";
import { LISBON, STEP } from "utils/constants";

const { HttpProvider, IconConverter } = IconService;
const { CallBuilder, CallTransactionBuilder } = IconService.IconBuilder;

const httpProvider = new HttpProvider(LISBON.RPC);
const iconService = new IconService(httpProvider);

const getTotalSupply = async () => {
  return await iconService.getTotalSupply().execute();
};

const getBalance = async (address) => {
  return await iconService.getBalance(address).execute();
};

const getLastBlock = async () => {
  return await iconService.getLastBlock().execute();
};

const getScoreApi = async (scoreAddress) => {
  const apiList = await iconService.getScoreApi(scoreAddress).execute();
  return apiList;
};

const getTransactionResult = async (txHash) => {
  return await iconService.getTransactionResult(txHash).execute();
};

const traceTransaction = async (txHash) => {
  return await iconService.getTrace(txHash).execute();
};

const dispatchEvent = (type, payload) => {
  const customEvent = new CustomEvent("ICONEX_RELAY_REQUEST", {
    detail: {
      type,
      payload,
    },
  });
  window.dispatchEvent(customEvent);
};

const handleEvent = (event) => {
  const { type, payload } = event?.detail;
  switch (type) {
    case "RESPONSE_ADDRESS":
      console.log("Get address successfully");
      console.log(payload);
      break;

    default:
      break;
  }
};

const getWallet = () => dispatchEvent("REQUEST_ADDRESS");

const callTransactionBuilder = new CallTransactionBuilder()
  .nid(IconConverter.toBigNumber(LISBON.NID))
  .version(IconConverter.toBigNumber(LISBON.VER));

const callTX = async ({
  from,
  scoreAddress,
  methodName,
  params,
  stepLimit,
}) => {
  // CallTransactionBuilder
  const tx = callTransactionBuilder
    .from(from)
    .to(scoreAddress)
    .method(methodName)
    .params({ ...params }.stepLimit(stepLimit || STEP.MEDIUM))
    .build();
  return await iconService.call(tx).execute();
};

const read = async ({ from, scoreAddress, methodName, params }) => {
  // CallBuilder
  // For invoking read-only function of SCORE
  const tx = new CallBuilder()
    .from(from)
    .to(scoreAddress)
    .method(methodName)
    .params({ ...params })
    .build();
  return await iconService.call(tx).execute();
};
export { dispatchEvent, handleEvent, getWallet, read, callTX };
