import React from 'react';
import styled from 'styled-components';
import { OrbitControls, Stage } from '@react-three/drei';
import { Canvas } from '@react-three/fiber';
import { Saturn } from './models/Saturn';

const Section = styled.div`
    height: 100vh;
    scroll-snap-align: center;
    display: flex;
    justify-content: center;
    @media only screen and (max-width: 768px) {
        margin-top: 50px;
    }
`;

const Container = styled.div`
    height: 100vh;
    scroll-snap-align: center;
    width: 1400px;
    display: flex;
    justify-content: space-between;
`;

const Left = styled.div`
    flex: 1;

    @media only screen and (max-width: 768px) {
        display: none;
    }

    @media only screen and (max-width: 1200px) {
        display: none;
    }
`;

const Title = styled.h1`
    font-size: 74px;
`;

const Txt = styled.div`
    display: flex;
    align-items: center;
    gap: 10px;

    @media only screen and (max-width: 768px) {
        display: inline-block;
    }

    
`;

const Subtitle = styled.h2`
    color: #56d1ac;
`;

const Desc = styled.p`
    font-size: 24px;
    color: lightgray;

    @media only screen and (max-width: 768px) {
        padding: 5px 10px;
    }

    @media only screen and (max-width: 1200px) {
        padding: 5px 20px;
    }
`;

const Heading = styled.h4`
    color: #fff;
    font-size: 14px;
    text-transform: uppercase;
    letter-spacing: 2px;
    margin-bottom: 8px;
    margin-top: 8px;
    padding: 10px 0px;
`;

const Paragraph = styled.p`
    padding: 12px 0px 0px 0px;
`

const Button = styled.button`
    background-color: #56d1ac;
    color: white;
    font-weight: 500;
    width: 120px;
    padding: 10px;
    border: none;
    border-radius: 5px;
    cursor: pointer;
`;

const Right = styled.div`
    flex: 1;
    display: flex;
    flex-direction: column;
    justify-content: center;
    gap: 20px;

    @media only screen and (max-width: 768px) {
        align-items: center;
        text-align: center;
    }

    @media only screen and (max-width: 1200px) {
        text-align: center;
        align-items: center;
    }
`;

const About = () => {
    return (
        <Section id='about'>
            <Container>
                <Left>
                    {/* 3D MODEL */}
                    <Canvas>
                        <Stage environment='city' intensity={0.6}>
                            <Saturn />
                        </Stage>
                        <OrbitControls enableZoom={false} />
                    </Canvas>
                </Left>
                <Right>
                    <Title>
                        Who am I?
                    </Title>
                    <Txt>
                        —
                        <Subtitle>
                            I aspire to do the things that I enjoy
                        </Subtitle>
                    </Txt>
                    <Desc>
                        <Paragraph>
                            <Heading>
                                Education
                            </Heading>
                            In 2020, I attended Augusta University to pursue a degree in Social Work. I transferred to the University of Georgia the following year and switched my major to Computer Science.
                        </Paragraph>
                        <Paragraph>
                            <Heading>
                                History
                            </Heading>
                            My debut into web development included building simple static HTML/CSS websites and publishing them to GitHub pages.
                            <Paragraph>
                                Later I started learning Python and built my first Discord bot for listening to music with friends.
                            </Paragraph>
                        </Paragraph>
                        <Paragraph>
                            <Heading>
                                Interests
                            </Heading>
                            Lately I've found myself interested JavaScript frameworks such as React and Nextjs to build appealing and interactive back-end + font-end websites.
                        </Paragraph>
                    </Desc>
                    <Button>
                        Read more
                    </Button>
                </Right>
            </Container>
        </Section>
    );
}

export default About;