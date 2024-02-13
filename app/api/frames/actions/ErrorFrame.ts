import { getRandomCharacter } from "@/utils/characters";

import { FrameMetadataType, FrameRequest, FrameValidationData, getFrameHtmlResponse, getFrameMetadata } from "@coinbase/onchainkit";
import { NextRequest } from "next/server";

export default class ErrorFrame {
    image:string;

    constructor(image: string) {
        this.image = image
    }

    generateFrameMetadata = async (): Promise<FrameMetadataType> => {
        return{
            buttons: [
                {
                    label: `Whoopsies`,
                
                },
            ],
            image: {
                src: this.image,
            },
            
        }
    }
}