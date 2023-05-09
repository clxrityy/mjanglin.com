import React from 'react';
import styled from 'styled-components';
import IMAGES from '../lib/images';

const Section = styled.div`
    height: 100vh;
    scroll-snap-align: center;
    display: flex;
    justify-content: center;

    @media only screen and (max-width: 768px) {
        margin-top: 250px;
    }
`;

const Container = styled.div`
    height: 100vh;
    scroll-snap-align: center;
    width: 1400px;
    display: flex;
    justify-content: space-between;
    align-items: center;
    flex-direction: row;

    @media screen and (max-width: 768px) {
        width: 100%;
        flex-direction: column;
        justify-content: center;
        gap: 40px;
    }
    @media screen and (max-width: 1200px) {
        width: 100%;
        flex-direction: column;
        justify-content: center;
        gap: 60px;
    }
`;

const Title = styled.h1`
    font-size: 74px;

    @media screen and (max-width: 600px) {
        text-align: center;
    }
`;


const Grid = styled.div`
    display: grid;
    gap: 25px;
    background-color: rgba(0, 0, 0, 0.6);
    border-radius: 5px;
    grid-template-columns: auto auto auto;
    padding: 10px;

    @media screen and (max-width: 768px) {
        grid-template-rows: repeat(1, 1fr);
        grid-template-columns: repeat(1, 1fr);
        background-color: transparent;
    }

    @media screen and (max-width: 1200px) {
        background-color: transparent;
        gap: 50px;
    }
`;

const GridItem = styled.div`
    padding: 5px 10px;
`;

const Box = styled.div`
    padding: 10px 5px;
    background-color: rgba(0, 0, 0, 0.3);
    display: flex;
    justify-content: center;
    align-items: center;
    text-align: center;
    flex-direction: row;
    border-radius: 7px;
    gap: 10px;
    &:hover {
        transform: scale(1.1);
        cursor: pointer;
        background-color: rgba(0, 0, 0, 0.1);
        transition: 500ms;
        box-shadow: 5px 8px 18px #fff;
    }

    @media screen and (max-width: 768px) {
        background-color: rgba(0, 0, 0, 0);

        &:hover {
            transform: scale(1.3);
            background-color: transparent;
            transition: 300ms;
            box-shadow: none;
        }
    }

    @media screen and (max-width: 1200px) {
        background-color: rgba(0, 0, 0, 0);

        &:hover {
            transform: scale(1.3);
            background-color: transparent;
            transition: 300ms;
            box-shadow: none;
        }
    }
`;

const Txt = styled.h3`
    font-size: 30px;
    color: white;

    @media screen and (max-width: 768px) {
        color: rgba(255, 255, 255, 0.75);
    }
`;

const Img = styled.img`
    height: 50px;
    width: 50px;
    border-radius: 5px;
    transform:
    rotate3d(.5,-.966,0,15deg)
    rotate(360deg);
    box-shadow:
    2em 4em 6em -2em rgba(0,0,0,.5),
    1em 2em 3.5em -2.5em rgba(0,0,0,.5);
    transition:
    transform .9s ease,
    box-shadow .4s ease;
    border-radius: .5em;

    &:hover {
        transform:
            rotate3d(0,0,0,0deg)
            rotate(0deg);
    }
`;


const Tools = () => {
    return (
        <Section id='tools'>
            <Container>
                <Title>
                    My tools
                </Title>
                <Grid>
                    <GridItem>
                        <Box>
                            <Img src={IMAGES.SKILLS.js} />
                            <Txt>
                                JavaScript
                            </Txt>
                        </Box>
                    </GridItem>
                    <GridItem>
                        <Box>
                            <Img src={IMAGES.SKILLS.python} />
                            <Txt>
                                Python
                            </Txt>
                        </Box>
                    </GridItem>
                    <GridItem>
                        <Box>
                            <Img src={IMAGES.SKILLS.java} />
                            <Txt>
                                Java
                            </Txt>
                        </Box>
                    </GridItem>
                    <GridItem>
                        <Box>
                            <Img src={IMAGES.SKILLS.ts} />
                            <Txt>
                                TypeScript
                            </Txt>
                        </Box>
                    </GridItem>
                    <GridItem>
                        <Box>
                            <Img src={IMAGES.SKILLS.react} />
                            <Txt>
                                React
                            </Txt>
                        </Box>
                    </GridItem>
                    <GridItem>
                        <Box>
                            <Img src={IMAGES.SKILLS.firebase} />
                            <Txt>
                                Firebase
                            </Txt>
                        </Box>
                    </GridItem>
                </Grid>
            </Container>
        </Section>
    );
}

export default Tools;