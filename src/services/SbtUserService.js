import { SCORE } from "utils/constants";
import { read, callTX } from "./IconService";
class SbtUserService {
  constructor() {
    this.contractAddress = SCORE.SBT_USER;
  }
  async getUser({ address }) {
    return await read({
      from: address,
      methodName: "getUser",
      scoreAddress: SCORE.SBT_USER,
      params: {
        _address: address,
      },
    });
  }
  async registerUser({ from, name, avatar }) {
    return await callTX({
      from: from,
      scoreAddress: this.contractAddress,
      methodName: "registerUser",
      params: { _name: name, _avatar: avatar },
      //stepLimit: xxx,
    });
  }
}

export default new SbtUserService();
