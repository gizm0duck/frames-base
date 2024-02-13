import { getFrameMetadata } from '@coinbase/onchainkit';
import type { Metadata } from 'next';
import Home from './api/frames/Home';


const home = new Home()
const frameData = getFrameMetadata(home.generateFrameMetadata())
export const metadata: Metadata = {
  title: 'Echoes of Hyperion',
  description: 'Echoes of Hyperion is an immersive fantasy game.',
  openGraph: {
    title: 'Echoes of Hyperion',
    description: 'Echoes of Hyperion is an immersive fantasy game.',
    images: [`${process.env.NEXT_PUBLIC_URL}/join-the-fight.png`],
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
