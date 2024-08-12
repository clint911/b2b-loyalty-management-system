import { eventNames } from "process";
import { LoyaltyTokenContract, publicClient } from "./config";
import { Request, Response } from 'express';
import { publicDecrypt } from "crypto";


/**
 *@params {address _from, address _to, uint256 _amount}
 * @event Transfer(above_params)
 */
export async function TransferTokens(req: Request, res: Response) {
    const { from, to, amount } = req.body;
    if (!from || !to || !amount) {
        return res.status(400).json({ error: 'missing required' })
    }
    try {
        await LoyaltyTokenContract.write.transfer([
            from,
            to,
            amount
        ])
        const evLogs = await publicClient.getContractEvents({
            address: 'paste_contract_event',
            abi: wagmiAbi,
            eventName: 'Transfer'
        })
        return res.status(201).json(evLogs);
    } catch (error) {
        return res.status(500).json({ error: 'Error' })


    }

}
