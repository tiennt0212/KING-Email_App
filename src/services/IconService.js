import IconService from "icon-sdk-js";
// import HttpProvider from "icon-sdk-js/build/transport/http/HttpProvider";

const { HttpProvider } = IconService;

const httpProvider = new HttpProvider("https://ctz.solidwallet.io/api/v3");
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

const dispatchEvent = (type) => {
  const customEvent = new CustomEvent("ICONEX_RELAY_REQUEST", {
    detail: {
      type,
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

export { dispatchEvent, handleEvent, getWallet };
