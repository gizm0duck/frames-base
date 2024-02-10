import { getFaction } from "@/utils/factions";
import { FrameMetadataType, FrameRequest, FrameValidationData, getFrameHtmlResponse, getFrameMetadata } from "@coinbase/onchainkit";

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