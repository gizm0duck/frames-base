import { getRandomCharacter } from "@/utils/characters";

import { FrameMetadataType, FrameValidationData } from "@coinbase/onchainkit";
import { NextRequest } from "next/server";
import Home from "./Home";

export default class RevealRandomCharacter {
    message: FrameValidationData;
    request: NextRequest;

    constructor(message:FrameValidationData, request:NextRequest ) {
        this.message = message;
        this.request = request;
    }

    factionId = ():any => {
        return this.request.nextUrl.searchParams.get('factionId')
    }

    generateFrameMetadata = async (): Promise<FrameMetadataType> => {
        if (this.message.button == 1) {
            const home = new Home()
            return home.generateFrameMetadata()
        } else {
            return{
                buttons: [
                  {
                      label: `Switch Faction`,
                  },
                  {
                    label: `Generate Character`,
                  },
                ],
                image: {
                  src: `${process.env.NEXT_PUBLIC_URL}/characters/${getRandomCharacter(this.factionId())}-frame.png`,
                  aspectRatio: '1:1',
                },
                post_url: `${process.env.NEXT_PUBLIC_URL}/api/frames?actionName=RevealRandomCharacter&factionId=${this.factionId()}`,
            }
        }
      
    }
}