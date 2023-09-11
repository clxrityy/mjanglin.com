import { Inter, Roboto_Mono } from 'next/font/google';

export const inter = Inter({
    weight: ['200', '300', '400', '500', '600', '700', '800', '900'],
    display: "swap",
    preload: true,
    style: ['normal'],
    subsets: ['latin']
});

export const robotoMono = Roboto_Mono({
    weight: ['100', '200', '300', '400', '500', '600', '700'],
    display: 'swap',
    preload: true,
    style: 'normal',
    subsets: ['latin']
})