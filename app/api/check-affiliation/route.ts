import { FrameRequest, getFrameMessage, getFrameHtmlResponse } from '@coinbase/onchainkit';
import { NextRequest, NextResponse } from 'next/server';
import { factions, Faction } from '../../../utils/factions';

async function getResponse(req: NextRequest): Promise<NextResponse> {
  let accountAddress: string | undefined = '';
  let text: string | undefined = '';
  let fid: number | undefined = 0;
  let factionId: number;

  const body: FrameRequest = await req.json();
  const { isValid, message } = await getFrameMessage(body, { neynarApiKey: '55B533A7-35F1-4AC6-99D2-5013569287D8' });
  
  if (isValid) {
    accountAddress = message.interactor.verified_accounts[0];
    fid = message.interactor.fid
  
    factionId = fid%4;
  }

  
  const getFaction = function():Faction|undefined {
    return factions[factionId]
  }

  const recasted = true; //message?.recasted || process.env.NODE_ENV == "development"

  if(!recasted){
    return new NextResponse(
      getFrameHtmlResponse({
          buttons: [
          {
              label: `Recast before you can join ${getFaction()?.name}!`,
          },
          {
            label: `I've recasted`,
        },
          ],
          image: `${process.env.NEXT_PUBLIC_URL}/affiliations/${getFaction()?.image}-affiliation.png`,
          post_url: `$process.env.NEXT_PUBLIC_URL}/api/check-affiliation`,
      }),
      );
  } else {
    return new NextResponse(
      getFrameHtmlResponse({
        buttons: [
          {
            label: `Mint your faction card to gain access`,
            // action: 'post_redirect'
          },
        ],
        image: `${process.env.NEXT_PUBLIC_URL}/affiliations/${getFaction()?.image}-affiliation.png`,
        post_url: `${process.env.NEXT_PUBLIC_URL}/api/mint-access-card`,
      }),
    );
  }

  
}



export async function POST(req: NextRequest): Promise<Response> {
  return getResponse(req);
}

export const dynamic = 'force-dynamic';
