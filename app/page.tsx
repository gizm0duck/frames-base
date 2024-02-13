import { getFrameMetadata } from '@coinbase/onchainkit';
import type { Metadata } from 'next';
import Home from './api/frames/actions/Home';


const home = new Home()
const frameData = getFrameMetadata(home.generateFrameMetadata())
export const metadata: Metadata = {
  title: 'Echoes of Hyperion',
  description: 'Echoes of Hyperion is an immersive fantasy game where players explore the intertwining fates of four distinct factions: The Time Weavers, The Star Pilgrims, The Techno-Covenant, and The Earthbound Remnants. Each faction offers unique perspectives and abilities, guiding players through a rich narrative that blends mystical time manipulation, interstellar exploration, advanced technology, and the remnants of a shattered Earth.',
  openGraph: {
    title: 'Echoes of Hyperion',
    description: 'Echoes of Hyperion is an immersive fantasy game where players explore the intertwining fates of four distinct factions: The Time Weavers, The Star Pilgrims, The Techno-Covenant, and The Earthbound Remnants. Each faction offers unique perspectives and abilities, guiding players through a rich narrative that blends mystical time manipulation, interstellar exploration, advanced technology, and the remnants of a shattered Earth.',
    images: [`${process.env.NEXT_PUBLIC_URL}/join-the-fight-2.png`],
  },
  other: {
    ...frameData,
  },
};

export default function Page() {
  return (
    <>
      <img src="join-the-fight-2.png" width="100%" />
    </>
  );
}
