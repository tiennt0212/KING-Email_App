import { SCORE } from "utils/constants";
import { read, callTX } from "./IconService";
class StampService {
  constructor() {
    this.contractAddress = SCORE.STAMP;
  }
  async publishStamp({ stampImage }) {
    return await callTX({
      from: localStorage.getItem("address"),
      scoreAddress: this.contractAddress,
      methodName: "publishStamp",
      params: { _image: stampImage },
    });
  }
  async buyStamp({ stampId }) {
    return await callTX({
      from: localStorage.getItem("address"),
      scoreAddress: this.contractAddress,
      methodName: "buyStamp",
      params: { _tokenId: stampId },
    });
  }
  async sendMail({ stampId, receiver, title, content }) {
    return await callTX({
      from: localStorage.getItem("address"),
      scoreAddress: this.contractAddress,
      methodName: "sendMail",
      params: {
        _tokenId: stampId,
        _receiver: receiver,
        _title: title,
        _content: content,
      },
    });
  }
  async getWorldOfStamps() {
    return await read({
      from: localStorage.getItem("address"),
      methodName: "getUnmintedStamp",
      scoreAddress: this.contractAddress,
      params: {},
    });
  }
  async getUserStamp({ expired }) {
    return await read({
      from: localStorage.getItem("address"),
      methodName: "getUserStamp",
      scoreAddress: this.contractAddress,
      params: {
        _expired: expired,
      },
    });
  }
  async getUserSentEmail() {
    return await read({
      from: localStorage.getItem("address"),
      methodName: "getSentEmail",
      scoreAddress: this.contractAddress,
      params: {},
    });
  }
}

export default new StampService();
