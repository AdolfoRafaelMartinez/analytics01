import * as bitcoin from 'bitcoinjs-lib';

/**
 * Custom network definition for testnet4.
 * This is required for compatibility with certain nodes like QuickNode's testnet4 endpoint.
 */
export const testnet4 = {
  messagePrefix: '\x18Bitcoin Signed Message:\n',
  bech32: 'tb', // testnet4 uses "tb" for Bech32 addresses
  bip32: {
    public: 0x043587cf, // Same as standard testnet
    private: 0x04358394, // Same as standard testnet
  },
  pubKeyHash: 0x6f, // 'm' or 'n' in Base58
  scriptHash: 0xc4, // '2' in Base58
  wif: 0xef,      // 'c' in Base58
};

/**
 * Returns the appropriate bitcoinjs-lib network configuration based on a string name.
 * Defaults to testnet4.
 * @param networkName The name of the network ('mainnet', 'testnet', 'testnet4').
 * @returns The network configuration object.
 */
export const getNetwork = (networkName?: string): bitcoin.networks.Network => {
    switch (networkName) {
        case 'mainnet':
            return bitcoin.networks.bitcoin;
        case 'testnet':
        case 'testnet4':
            return testnet4;
        default:
            return testnet4; // Default to testnet4 for safety
    }
};
