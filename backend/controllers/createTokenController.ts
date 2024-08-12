import { publicDecrypt } from "crypto";
import { publicClient, LoyaltyTokenContract } from "./config";
import { Request, Response } from 'express';

/*
 *@params{_name, _symbol, _initialSupply, _owner: string}
 * @event TokenCreated(same params as above)
 */

export const CreateToken = async (req: Request, res: Response) => {
    //destructuring values from the incoming form data 
    const { name, symbol, initialSupply, owner } = req.body;

    if (!name || !symbol || !initialSupply || !owner) {
        return res.status(400).json({ error: 'Missing Required' })
    }

    try {
        await LoyaltyTokenContract.write.createToken([
            name,
            symbol,
            initialSupply,
            owner
        ])

        //Consuming an event to see if it went through  
        const evLogs = await publicClient.getContractEvents({
            address: "paste_contract_event_to_seek",
            abi: wagmiAbi,
            eventName: 'TokenCreated'
        })
        console.log(evLogs)
        res.status(201).json(evLogs);//Refactor this once you can verify input from the events
    } catch (error) {
        res.status(500).json({ error: 'Error Creating DAO' })

    }
}
/**Tokenomics Logic**/

