import request from 'superagent';

const scatter = window.scatter;

const networkSetting = {
  mainnet: {
    rpcApi: 'https://mainnet.nebulas.io',
  },
  testnet: {
    rpcApi: 'https://testnet.nebulas.io',
  },
};

export default class Contract {
  constructor({ network = 'mainnet', contractAddress }) {
    this.api = networkSetting[network].rpcApi;
    this.contractAddress = contractAddress;
  }

  /**
     * callContractMethod({from, functionName, args})
     * Call a smart contract function.
     * The smart contract must have been submited.
     * Method calls are run only on the current node, not broadcast.
     * @param: from - User that send Request
     * @param: functionName - The name of the function
     * @param: args - Function arguement, please enter arguement in ordered array
     */
  async call({
    from = 'n1Z6SbjLuAEXfhX1UJvXT6BB5osWYxVg3F3', //
    functionName,
    value = '0',
    args = [],
  }) {
    const { contractAddress, api } = this;
    const to = contractAddress;
    const txParams = {
      value,
      nonce: 0,
      gasPrice: '1000000',
      gasLimit: '2000000',
      contract: { function: functionName, args: JSON.stringify(args) },
    };
    const { body } = await request
      .post(`${api}/v1/user/call`)
      .send(Object.assign({ from, to }, txParams));

    return body.result.result;
  }
  /**
     * send({ functionName, value = 0, data, options = { listener: undefined } }})
     * Send tx to a smart contract function.
     * The smart contract must have been submited.
     * @param: functionName - The name of the function
     * @param: value - How many nebulas NAS should cost
     * @param: data - Function arguement, please enter arguement in ordered array
     * @param: options - please check https://github.com/nebulasio/scatter/blob/master/doc/NebPay%E4%BB%8B%E7%BB%8D.md#options
     */
  async send({ functionName, value = 0, data = [], options = { undefined } }) {
    const resp = await scatter.call(
      this.contractAddress,
      value,
      functionName,
      JSON.stringify(data),
      options);
    return resp;
  }
}
