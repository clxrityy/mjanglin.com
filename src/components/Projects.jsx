import React from 'react';
import styled from 'styled-components';
import IMAGES from '../lib/images';

const Section = styled.div`
    height: 100vh;
    scroll-snap-align: center;
    display: flex;
    justify-content: center;

    @media only screen and (max-width: 768px) {
        height: 200vh;
        align-items: center;
        margin-top: 250px;
    }

    @media only screen and (max-width: 1200px) {
        height: 200vh;
        align-items: center;
    }
`;

const Container = styled.div`
    height: 100vh;
    scroll-snap-align: center;
    width: 1400px;
    display: flex;
    justify-content: space-around;
    
    @media only screen and (max-width: 768px) {
        flex-direction: column;
        align-items: center;
        width: 100%;
    }

    @media only screen and (max-width: 1200px) {
        flex-direction: column;
        justify-content: center;
        align-items: center;
        width: 100%;
        gap: 20px;
    }
`;

const Title = styled.h1`
    font-size: 74px;
    margin-top: 50px;

    @media screen and (max-width: 768px) {
        text-align: center;
    }
`;

const Grid = styled.div`
    display: grid;
    gap: 25px;
    border-radius: 5px;
    padding: 10px;
    grid-template-rows: repeat(2, 1fr);
    grid-template-columns: repeat(2, 1fr);

    @media only screen and (max-width: 768px) {
        grid-template-rows: repeat(2, 1fr);
        grid-template-columns: repeat(2, 1fr);
        
    }

    @media screen and (max-width: 480px) {
        grid-template-rows: repeat(1, 1fr);
        grid-template-columns: repeat(1, 1fr);
    }

    @media only screen and (max-width: 1200px) {
        grid-template-columns: repeat(1, 1fr);
        grid-template-rows: repeat(1, 1fr);
    }
`;

const GridItem = styled.div`
    padding: 25px 10px;
`;

const Parent = styled.div`
    position: relative;
    display: flex;
    align-items: center;
    justify-content: center;
    height: auto;
    width: 100%;
    padding: 4px;
    border-radius: 5px;
    &:hover {
        background: linear-gradient(#56d1ac, #56b0d1);
    }

    @media only screen and (max-width: 768px) {
        background: linear-gradient(#56d1ac, #56b0d1);
    }

    @media only screen and (max-width: 1200px) {
        background: linear-gradient(#56d1ac, #56b0d1);
    }
`;

const Child = styled.div`
    display: hidden;
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    ${GridItem}&:hover {
        display: block;
    }

    @media only screen and (max-width: 768px) {
        display: block;
        position: absolute;
    }

    @media only screen and (max-width: 1200px) {
        display: flex;
        transform: none;
        position: static;
    }
`;

const Txt = styled.p`
    color: rgba(255, 255, 255, 0.7);
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    text-align: center;
    gap: 20px;
    background-color: rgba(0, 0, 0, 0.3);
    padding: 18px 0px;
    border-radius: 8px;
    opacity: 0.1;
    &:hover {
        background-color: rgba(0, 0, 0, 0.7);
        opacity: 0.95;
    }

    @media only screen and (max-width: 768px) {
        opacity: 1;
        background-color: rgba(0, 0, 0, 0.6);
    }

    @media only screen and (max-width: 1200px) {
        opacity: 1;
        background-color: rgba(0, 0, 0, 0.6);
        max-width: 300px;
    }
`;

const TxtTitle = styled.h2`
    font-weight: 600;
    font-size: 2rem;
`;

const TxtDesc = styled.p`
    font-size: 18px;
`;

const TxtTools = styled.p`
    font-size: 12px;
    letter-spacing: 2px;
    color: #ddd;
`;

const TxtButton = styled.button`
    width: 100px;
    padding: 10px;
    background-color: #6b56d1;
    color: #fff;
    font-weight: 700;
    border: none;
    border-radius: 9px;
    &:hover {
        background-color: #5658d1;
        transition: all 400ms ease;
        transform: scale(1.1);
        cursor: pointer;
    }
`;

const Img = styled.img`
    opacity: 0.5;
    border-radius: 5px;
    width: 600px;
    height: 400px;
    &:hover {
        opacity: 1;
        cursor: pointer;
    }

    @media only screen and (max-width: 768px) {
        width: 300px;
        height: 200px;
    }
`;


const Projects = () => {
    return (
        <Section id='projects'>
            <Container>
                <Title>
                    Latest projects
                </Title>
                <Grid>
                    <GridItem>
                        <Parent>
                            <Img src={IMAGES.PROJECTS.chatgptx} />
                            <Child>
                                <Txt>
                                    <TxtTitle>
                                        ChatGPTx
                                    </TxtTitle>
                                    <TxtDesc>
                                        Google authenticated replication of ChatGPT with OpenAI API routes and Firebase storage.
                                    </TxtDesc>
                                    <TxtTools>
                                        Nextjs, Firebase, TypeScript, OpenAI
                                    </TxtTools>
                                    <a href='https://chatgptx-gold.vercel.app/' target='_blank' referrerPolicy='no-referrer'>
                                        <TxtButton>
                                            Check it out
                                        </TxtButton>
                                    </a>
                                </Txt>
                            </Child>
                        </Parent>
                    </GridItem>
                    <GridItem>
                        <Parent>
                            <Img src={IMAGES.PROJECTS.talkn} />
                            <Child>
                                <Txt>
                                    <TxtTitle>
                                        talkn
                                    </TxtTitle>
                                    <TxtDesc>
                                        Real-time web chat application with real-time notifications & database API requests.
                                    </TxtDesc>
                                    <TxtTools>
                                        Nextjs, Upstash, TypeScript, Pusher
                                    </TxtTools>
                                    <a href='https://talkn.vercel.app/' target='_blank' referrerPolicy='no-referrer'>
                                        <TxtButton>
                                            Check it out
                                        </TxtButton>
                                    </a>
                                </Txt>
                            </Child>
                        </Parent>
                    </GridItem>
                    <GridItem>
                    <Parent>
                            <Img src={IMAGES.PROJECTS.buan} />
                            <Child>
                                <Txt>
                                    <TxtTitle>
                                        buan
                                    </TxtTitle>
                                    <TxtDesc>
                                        A simple yet elegant canvas browser game with JavaScript classes.
                                    </TxtDesc>
                                    <TxtTools>
                                        JavaScript, HTML, CSS
                                    </TxtTools>
                                    <a href='https://clxrityy.github.io/baun/' target='_blank' referrerPolicy='no-referrer'>
                                        <TxtButton>
                                            Check it out
                                        </TxtButton>
                                    </a>
                                </Txt>
                            </Child>
                        </Parent>
                    </GridItem>
                    <GridItem>
                    <Parent>
                            <Img src={IMAGES.PROJECTS.uoraty} />
                            <Child>
                                <Txt>
                                    <TxtTitle>
                                        uoraty
                                    </TxtTitle>
                                    <TxtDesc>
                                        A functional React admin dashboard with different color scheme options.
                                    </TxtDesc>
                                    <TxtTools>
                                        React, Syncfusion, Redux, Tailwindcss
                                    </TxtTools>
                                    <a href='https://clxrityy.github.io/uoraty.xyz/' target='_blank' referrerPolicy='no-referrer'>
                                        <TxtButton>
                                            Check it out
                                        </TxtButton>
                                    </a>
                                </Txt>
                            </Child>
                        </Parent>
                    </GridItem>
                </Grid>
            </Container>
        </Section>
    );
}

export default Projects;