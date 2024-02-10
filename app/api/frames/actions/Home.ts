
import { FrameMetadataType } from "@coinbase/onchainkit";


export default class Home {
  

  constructor() {}

    generateFrameMetadata = (): FrameMetadataType => {
        return{
            buttons: [
                {
                    label: 'Earthbound Remnants',
                },
                {
                    label: 'Star Pilgrims',
                },
                {
                    label: 'Techno-Covenant',
                },
                {
                    label: 'Time Weavers',
                },
            ],
                image: `${process.env.NEXT_PUBLIC_URL}/home-image.png`,
                post_url: `${process.env.NEXT_PUBLIC_URL}/api/frames?actionName=SelectAffiliation`,
            }
    }
        
}