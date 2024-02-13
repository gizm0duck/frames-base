# A simple yet opinionated frames framework

This was massively inspired by [A Frame in 100 lines or less](https://github.com/Zizzamia/a-frame-in-100-lines?tab=readme-ov-file) and was built on top of their original repo.

This is an opiniated framework that utilizes action classes to represent each frame that is rendered. Every `post_url` that you render for the frame must include a URL param of `actionID=FrameActionName` where `FrameActionName` corresponds to one of the classes you have created in `api/frames/actions`

There are 3 types of frame classes that you use depending on the situation. 

## Action Class Types

`ErrorFrame` These are rendered by `route.ts` in the case where the message is invalid

`HomeFrame` These do not receive frame message or request object, and are intended to be rendered on a page and shared as the cast

`ActionFrame` These are for all other frames in your app. They receive a message and the request and can encapsulate all of the logic required to render that frame.



## App Structure

- app
  - page.tsx 
  - api/
    - frames/
      - route.ts
      - Home.ts - Base page for your frame
      - ErrorFrame.ts - Will be rendered in the case where the message is invalid
      - actions/
        - index.ts - Registry of all `ActionFrames`
        - SelectAffiliation.ts - This is an `ActionFrame` where the business logic lives
        - RevealRandomCharacters.ts - This is another `ActionFrame` where the business logic lives

<br />

### `app/page.tsx`

```tsx
import { getFrameMetadata } from '@coinbase/onchainkit';
import type { Metadata } from 'next';
import Home from './api/frames/actions/Home';


const home = new Home()
const frameData = getFrameMetadata(home.generateFrameMetadata())
export const metadata: Metadata = {
  title: 'Echoes of Hyperion',
  description: 'Echoes of Hyperion is an immersive fantasy game.',
  openGraph: {
    title: 'Echoes of Hyperion',
    description: 'Echoes of Hyperion is an immersive fantasy game.',
    images: [`${process.env.NEXT_PUBLIC_URL}/join-the-fight-2.png`],
  },
  other: {
    ...frameData,
  },
};

export default function Page() {
  return (
    <>
      <img src="join-the-fight.png" width="100%" />
    </>
  );
}

```

### `app/layout.tsx`

```tsx
export const viewport = {
  width: 'device-width',
  initialScale: 1.0,
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
```

### `app/api/frame/route.ts`

```ts
import { getFaction } from "@/utils/factions";
import { FrameMetadataType, FrameValidationData } from "@coinbase/onchainkit";
import { NextRequest } from "next/server";

export default class CheckAffiliation {
  message: FrameValidationData;
  request: NextRequest;

  constructor(message:FrameValidationData, request:NextRequest ) {
      this.message = message;
      this.request = request;
  }

    factionId = ():number => {
      return this.message.button-1;
    }

    generateFrameMetadata = async (): Promise<FrameMetadataType> => {
      return{
          buttons: [
            {
              label: `Switch Faction`,
          },
          {
            label: `Generate Character`,
          },
          ],
          image: `${process.env.NEXT_PUBLIC_URL}/affiliations/${getFaction(this.factionId())?.image}-affiliation.png`,
          post_url: `${process.env.NEXT_PUBLIC_URL}/api/frames?actionName=RevealRandomCharacter&factionId=${this.factionId()}`,
        }
    }
}
```

### `app/api/frame/route.ts`

```ts
import { FrameRequest, getFrameMessage, getFrameHtmlResponse } from '@coinbase/onchainkit';
import { NextRequest, NextResponse } from 'next/server';
import { actions } from './actions';
import ErrorFrame from './actions/ErrorFrame';

async function getResponse(req: NextRequest): Promise<NextResponse> {
  let component:any = undefined;
  let actionName: string;
  const body: FrameRequest = await req.json();
  const { isValid, message } = await getFrameMessage(body, { neynarApiKey: process.env.NEYNAR_KEY });
  
  // Every frame that you want to render will need a corresponding frame action class
  actionName = <string>req.nextUrl.searchParams.get('actionName');
  if (isValid) {
    component = new actions[actionName.toString()](message, req)
    
  } else {
    // Pass in any image that you want to be rendered into a frame if the message is invalid
    component = new ErrorFrame(`${process.env.NEXT_PUBLIC_URL}/error.png`)
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

```

### `.env.local`
```ts
NEXT_PUBLIC_URL = 'YOUR URL';
NEYNAR_KEY = 'YOUR NEYNAR KEY';
```

<br />

## Resources

- [Official Farcaster Frames documentation](https://docs.farcaster.xyz/learn/what-is-farcaster/frames)
- [Official Farcaster Frame specification](https://docs.farcaster.xyz/reference/frames/spec)
- [OnchainKit documentation](https://github.com/coinbase/onchainkit)

<br />

## License

This project is licensed under the MIT License - see the [LICENSE.md](LICENSE.md) file for details
