// We use keyStore to store the private key and use information
// You can custom your keyStore config for different device.
const keystoreOptions = {
  ios: {
    dklen: 32,
    n: 2048, // 2048 4096 8192 16384
    r: 8,
    p: 1,
    cipher: 'aes-128-ctr',
  },
  android: {
    dklen: 32,
    n: 2048, // 2048 4096 8192 16384
    r: 8,
    p: 1,
    cipher: 'aes-128-ctr',
  },
};

const explorerURL = 'https://explorer-test-side01.aelf.io';
const walletURL = 'https://tdvv-wallet-test.aelf.io';
export default {
  commonPrivateKey:
    'b7a6b643f2a66848cb2229bf26c8330d5384e0eac325709a66f4baacc89d3108',
  customerAddress: '2hxkDg6Pd2d4yU1A16PTZVMMrEDYEPR8oQojMDwWdax5LsBaxX',
  customerTel: 'Just a dev show case, you can input a phone number here.',
  // You can change the params for keyStore here
  keystoreOptions,
  httpProvider: `${walletURL}/chain`,
  walletURL,
  explorerURL,
  contractExplorerURL: `${explorerURL}/contract?#http%3A%2F%2F1.119.195.50%3A11104%2Fviewer%2Faddress.html%23%2Fcontract%2Finfo%3Faddress%3D`,
  // contractNames & contractAddresses will be init by appInit of `/common/utils/aelfProvider`;
  contractNames: {
    consensusContract: 'AElf.ContractNames.Consensus',
    tokenContract: 'AElf.ContractNames.Token',
  },
  // You want to init in the app
  contractAddresses: [
    {
      name: 'bingoGame',
      contractAdress: '2wRDbyVF28VBQoSPgdSEFaL4x7CaXz8TCBujYhgWc9qTMxBE3n',
      contractName: 'bingoGameContract',
    },
    {
      name: 'App',
      contractAdress: '2wRDbyVF28VBQoSPgdSEFaL4x7CaXz8TCBujYhgWc9qTMxBE3n',
      contractName: 'appContract',
    },
  ],
  contractNameAddressSets: {
    consensusContract: 'BNPFPPwQ3DE9rwxzdY61Q2utU9FZx9KYUnrYHQqCR6N4LLhUE',
    tokenContract: '7RzVGiuVWkvL4VfVHdZfQF2Tri3sgLe9U991bohHFfSRZXuGX',
  },
  address: {
    prefix: 'ELF',
    // suffix: 'AELF'
    suffix: 'tDVV',
  },
  startPeriod: 0,
  tokenSymbol: 'AEUSD',
  tokenDecimal: 3,
  tokenDecimalFormat: 10 ** 3,
  feeTokenSymbol: 'AEUSD',
  feeTokenDecimal: 3,
  feeTokenDecimalFormat: 10 ** 3,
  passwordReg: /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)[^]{12,}$/,
  balanceRefreshInterval: 30000,
  splashScreenShowTime: 3000,
  fetchTimeout: 10000,
};
