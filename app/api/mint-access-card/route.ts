import { FrameRequest, getFrameMessage, getFrameHtmlResponse } from '@coinbase/onchainkit';
import { NextRequest, NextResponse } from 'next/server';
import { privateKeyToAccount } from 'viem/accounts';
import { localhost, base } from 'viem/chains';
import { createWalletClient, http, createPublicClient } from 'viem';
import { factions, Faction } from '@/utils/factions';

import FactionAffiliation from '@/contracts/artifacts/contracts/FactionAffiliation.sol/FactionAffiliation.json'

const WALLET_PRIVATE_KEY = process.env.WALLET_PRIVATE_KEY;
const PROVIDER_URL = process.env.PROVIDER_URL;
const chain = process.env.NODE_ENV == "development" ? localhost : base
const nftOwnerAccount = privateKeyToAccount(WALLET_PRIVATE_KEY as `0x${string}`);
const nftOwnerClient = createWalletClient({
  account: nftOwnerAccount,
  chain: chain,
  transport: http(PROVIDER_URL as string),
});

const publicClient = createPublicClient({
  chain: chain,
  transport: http(PROVIDER_URL as string),
});

async function getResponse(req: NextRequest): Promise<NextResponse> {
    let minted = false;
    let imageUrl: string = "";
    let factionId: number = 1;
    let fid: number | undefined = 0;
    let accountAddress: string | undefined = '';  
    console.log("CHAIN", chain)
    const body: FrameRequest = await req.json();
    const { isValid, message } = await getFrameMessage(body, { neynarApiKey: '55B533A7-35F1-4AC6-99D2-5013569287D8' });
    
    const getFaction = function():Faction|undefined {
        return factions[factionId]
      }


    if (isValid) {
        accountAddress = message.interactor.verified_accounts[0];
        fid = message.interactor.fid
    
        factionId = fid%4;
        imageUrl = `${process.env.NEXT_PUBLIC_URL}/affiliations/${getFaction()?.image}-access-card.png`
    }

    try {
        minted = !!(await publicClient.readContract({
            address: process.env.NFT_CONTRACT_ADDRESS as `0x${string}`,
            abi: FactionAffiliation.abi,
            functionName: 'balanceOf',
            args: [accountAddress],
        }));
        
    } catch (err) {
        console.error(err);
    }


    if (minted) {
        return new NextResponse(
            getFrameHtmlResponse({
                buttons: [
                {
                    label: "You've joined your faction! Characters will be available soon",
                },
                ],
                image: imageUrl,
            }),
        );
    } else {
        // Try to mint and airdrop the NFT
        try {
            const { request } = await publicClient.simulateContract({
            account: nftOwnerAccount,
            address: process.env.NFT_CONTRACT_ADDRESS as `0x${string}`,
            abi: FactionAffiliation.abi,
            functionName: 'safeMint',
            args: [accountAddress, getFaction()?.ipfs, getFaction()?.id],
            });
            await nftOwnerClient.writeContract(request);
            minted = true;
        } catch (err) {
            console.error(err);
        }
        
        return new NextResponse(
            getFrameHtmlResponse({
            buttons: [
                {
                label: "You're in! Characters will be available soon",
                },
            ],
            image: imageUrl,
            }),
        );
        
    }
};



export async function POST(req: NextRequest): Promise<Response> {
  return getResponse(req);
}

export const dynamic = 'force-dynamic';
