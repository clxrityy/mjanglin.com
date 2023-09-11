import Link from 'next/link';
import { SlSocialTwitter, SlSocialSpotify, SlSocialSoundcloud, SlSocialInstagram } from 'react-icons/sl';

const Socials = () => {

    return (
        <div className="flex flex-row space-x-4 md:space-x-6 justify-center items-center border-b rounded-sm py-4 px-2">
            <Link href='https://open.spotify.com/artist/0HaFO6TLXEZ2De3d67dThV'>
                <SlSocialSpotify className="social-icon" />
            </Link>
            <Link href='https://soundcloud.com/clxrityy'>
                <SlSocialSoundcloud className="social-icon" />
            </Link>
            <Link href='https://www.instagram.com/mjxnglin/'>
                <SlSocialInstagram className="social-icon" />
            </Link>
            <Link href='https://twitter.com/yourclxrity'>
                <SlSocialTwitter className="social-icon" />
            </Link>
        </div>
    )
}

export default Socials