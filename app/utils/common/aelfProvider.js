import AElf from 'aelf-sdk';
import config from '../../config';
import {getContract, getContractAddresses} from './getContract';

const {contractAddresses} = config;

// link to Blockchain
const aelf = new AElf(new AElf.providers.HttpProvider(config.httpProvider));

async function initContracts(privateKey) {
  const chainStatus = await aelf.chain.getChainStatus();
  const {
    // directly accessible information
    GenesisContractAddress,
  } = chainStatus;
  const wallet = AElf.wallet.getWalletByPrivateKey(privateKey);
  const zeroC = await aelf.chain.contractAt(GenesisContractAddress, wallet);
  const contractNameAddressSets = await getContractAddresses(zeroC);
  return await getContract(aelf, wallet, {
    ...contractNameAddressSets,
    ...contractAddresses,
  });
}

async function appInit(privateKeyInput) {
  const privateKey = privateKeyInput || config.commonPrivateKey;
  try {
    return await initContracts(privateKey);
  } catch (error) {
    // TODO: show Error message
    console.warn('appInit: ', error);
  }
}
const aelfInstance = aelf;

export {appInit, aelfInstance};
