import React from 'react';
import styled from '/styled-components';

const Section = styled.div`
    height: 100vh;
    scroll-snap-align: center;
    display: flex;
    justify-content: center;
`;

const Container = styled.div`
    height: 100vh;
    scroll-snap-align: center;
    width: 1400px;
    display: flex;
    justify-content: space-between;
    align-items: center;
    flex-direction: row;
`;

const Title = styled.h1`
    font-size: 74px;
`;

const Right = styled.div`

`;

const Grid = styled.div`
    display: grid;
    gap: 25px;
    background-color: rgba(0, 0, 0, 0.6);
    border-radius: 5px;
    grid-template-columns: auto auto auto;
    padding: 10px;
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
`;

const Txt = styled.h3`
    font-size: 30px;
    color: white;
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
                            <Img src='./img/skills/js.png' />
                            <Txt>
                                JavaScript
                            </Txt>
                        </Box>
                    </GridItem>
                    <GridItem>
                        <Box>
                            <Img src='./img/skills/python.png' />
                            <Txt>
                                Python
                            </Txt>
                        </Box>
                    </GridItem>
                    <GridItem>
                        <Box>
                            <Img src='./img/skills/java.png' />
                            <Txt>
                                Java
                            </Txt>
                        </Box>
                    </GridItem>
                    <GridItem>
                        <Box>
                            <Img src='./img/skills/ts.png' />
                            <Txt>
                                TypeScript
                            </Txt>
                        </Box>
                    </GridItem>
                    <GridItem>
                        <Box>
                            <Img src='./img/skills/react.png' />
                            <Txt>
                                React
                            </Txt>
                        </Box>
                    </GridItem>
                    <GridItem>
                        <Box>
                            <Img src='./img/skills/firebase.png' />
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