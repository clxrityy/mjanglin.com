import React, { useState } from 'react';
import styled from 'styled-components';
import WebDevelopment from './WebDevelopment';
import Networking from './Networking';
import Music from './Music';
import Writing from './Writing';

const Section = styled.div`
    height: 100vh;
    scroll-snap-align: center;
    display: flex;
    justify-content: center;
`;

const Container = styled.div`
    width: 1400px;
    display: flex;
    justify-content: space-between;
`;

const Left = styled.div`
    flex: 1;
    display: flex;
    align-items: center;
    justify-content: center;
`;

const List = styled.ul`
    list-style: none;
    display: flex;
    flex-direction: column;
    gap: 20px;
`;

const ListTitle = styled.h1`
    font-size: 40px;
    letter-spacing: 2px;
    text-shadow: 1px 1px 15px #000;
    -webkit-text-stroke: 1.5px white;
    padding: 15px 0px;
    color: transparent;
    -webkit-text-stroke: 0.8px rgba(255, 255, 255, 0.5);
    text-shadow: 1px 1px 5px #fff;
    position: relative;
    text-underline-offset: 15px;
    text-decoration: underline 2px;

    &:hover {
        text-shadow: 0.5px 0.5px 1px #fff;
        transition: all 500ms ease-in-out;
    }
`;

const ListItem = styled.li`
    font-size: 70px;
    font-weight: bold;
    cursor: pointer;
    color: transparent;
    -webkit-text-stroke: 1px rgba(255, 255, 255, 0.5);
    position: relative;

    ::after {
        content: "${(props) => props.text}";
        position: absolute;
        top: 0;
        left: 0;
        color: #56b8d1;
        width: 0px;
        overflow: hidden;
        white-space: nowrap;
    }
    &:hover {
        ::after {
            animation: moveText 0.5s linear both;

            @keyframes moveText {
                to {
                    width: 100%;
                }
            }
        }
    }
`;

const Right = styled.div`
    flex: 1;
`;

const listData = [
    "Web development",
    "Networking",
    "Music",
    "Writing",
];

const Interests = () => {

    const [interest, setInterest] = useState("Web development");

    return (
        <Section id='interests'>
            <Container>
                <Left>
                    <List>
                        <ListTitle>
                            Do what you love...
                        </ListTitle>
                        {listData.map((item, idx) => (
                            <ListItem text={item} key={idx} onClick={() => setInterest(item)}>
                                {item}
                            </ListItem>
                        ))}
                    </List>
                </Left>
                <Right>
                    {
                        interest === "Web development" ?
                            <WebDevelopment />
                            : interest === "Networking" ?
                                <Networking />
                                : interest === "Music" ?
                                    <Music />
                                    :
                                    <Writing />
                    }
                </Right>
            </Container>
        </Section>
    )
}

export default Interests;