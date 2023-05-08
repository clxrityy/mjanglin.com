import React from 'react';
import styled from '../styled-components';
import { AiOutlineMail } from '../react-icons/ai';
import { AiFillInstagram, AiFillGithub } from '../react-icons/ai';
import { SiTwitter } from '../react-icons/si';
import { ImSoundcloud2, ImSpotify } from '../react-icons/im';
import { BsLinkedin } from '../react-icons/bs';

const Section = styled.div`
    height: 100vh;
    scroll-snap-align: center;
`;

const Container = styled.div`
    width: 100%;
    height: 100%;
    display: flex;
    justify-content: space-between;
    gap: 50px;
`;

const Left = styled.div`
    flex: 1;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    gap: 20px;
`;

const Title = styled.h1`
    font-weight: 200;
`;

const Right = styled.div`
    flex: 1;
    width: 100%;
    height: 100%;
    display: flex;
    flex-direction: row;
    justify-content: center;
    align-items: center;
    gap: 20px;
`;

const EmailLink = styled.a`
    text-decoration: none;
    color: #56d1ac;
    cursor: pointer;
    display: flex;
    justify-content: center;
    align-items: center;
    gap: 6px;
    font-size: 28px;
    
    &:hover {
        text-decoration: underline;
        text-underline-offset: 3px;
        letter-spacing: 2px;
        transition: all 500ms ease;
    }
`;

const List = styled.ul`
    list-style: none;
    display: flex;
    flex-direction: column;
    gap: 20px;
`;

const ListItem = styled.li`
`;

const Icon = styled.a`
    font-size: 50px;
    color: #56d1ac;

    &:hover {
        transform: scale(1.3);
        transition: all 200ms ease;
    }
`;


const Contact = () => {
    
    return (
        <Section id='contact'>
            <Container>
                <Left>
                    <Title>
                        Contact me
                    </Title>
                    <List>
                        <ListItem>
                            <EmailLink href='mailto:contact@mjanglin.com'>
                                <AiOutlineMail />
                                contact@mjanglin.com
                            </EmailLink>
                        </ListItem>
                    </List>
                </Left>
                <Right>
                    <Icon href='https://instagram.com/mjxnglin'>
                        <AiFillInstagram />
                    </Icon>
                    <Icon href='https://twitter.com/yourclxrity'>
                        <SiTwitter />
                    </Icon>
                    <Icon href='https://soundcloud.com/clxrityy'>
                        <ImSoundcloud2 />
                    </Icon>
                    <Icon href='https://open.spotify.com/user/mjanglin'>
                        <ImSpotify />
                    </Icon>
                    <Icon href='https://github.com/clxrityy'>
                        <AiFillGithub />
                    </Icon>
                    <Icon href='https://www.linkedin.com/in/mj-anglin-264473267/'>
                        <BsLinkedin />
                    </Icon>
                </Right>
            </Container>
        </Section>
    )
}

export default Contact;