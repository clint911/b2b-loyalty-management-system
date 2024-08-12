import { createPublicClient, createWalletClient, custom, getContract, http } from "viem";
import { celoAlfajores, mainnet } from "viem/chains";
import { wagmiAbi } from "../utils/contractAbi/abi";
import { privateKeyToAccount } from "viem/accounts";

import dotenv from 'dotenv';

dotenv.config();


export const publicClient = createPublicClient({
    chain: celoAlfajores,
    transport: http(process.env.API_URL),
})

export const walletClient = createWalletClient({
    account,
    chain: celoAlfajores,
    transport: http(process.env.API_URL),
})


/*
 * The Most important thing is that here, we will set up the contract instance so we can interact with our contract from wherever we import this file from
 */

export const LoyaltyTokenContract = getContract({
    address: '0x8EC4eE1A1aEccE5Df1a630ea50Aa9716549cE9Ff', //WARN: Replace after deployment
    abi: wagmiAbi,
    client: {
        public: publicClient,
        wallet: walletClient,
    }
})   
