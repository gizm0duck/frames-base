import { FrameRequest, getFrameMessage, getFrameHtmlResponse } from '@coinbase/onchainkit';
import { NextRequest, NextResponse } from 'next/server';
import { actions } from './actions';
import ErrorFrame from './actions/ErrorFrame';

async function getResponse(req: NextRequest): Promise<NextResponse> {
  let component:any = undefined;
  let actionName: string;
  const body: FrameRequest = await req.json();
  const { isValid, message } = await getFrameMessage(body, { neynarApiKey: process.env.NEYNAR_KEY });
  

  actionName = <string>req.nextUrl.searchParams.get('actionName');
  if (isValid) {
    component = new actions[actionName.toString()](message, req)
    
  } else {
    component = new ErrorFrame()
  }
  let response = getFrameHtmlResponse(await component.generateFrameMetadata())
    return new NextResponse(
      response
    );
  
}

export async function POST(req: NextRequest): Promise<Response> {
  return getResponse(req);
}

export const dynamic = 'force-dynamic';
