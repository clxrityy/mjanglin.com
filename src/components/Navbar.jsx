import React from 'react';
import styled from '../styled-components';

const Section = styled.div`
    display: flex;
    justify-content: center;
`
const Container = styled.div`
    width: 1400px;
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: 10px 0px;
`

const Links = styled.div`
    display: flex;
    align-items: center;
    gap: 50px;
`

const Icons = styled.div`
    display: flex;
    align-items: center;
    gap: 20px;
`
const Logo = styled.img`
    height: 50px;
    &:hover {
        transform: scale(1.2);
        cursor: pointer;
        transition: all 300ms ease;
    }
`
const List = styled.div`
    display: flex;
    gap: 20px;
    list-style: none;
`
const ListItem = styled.li`
    cursor: pointer;
    text-transform: uppercase;
    letter-spacing: 2px;
    &:hover {
        letter-spacing: 4px;
        transition: all 600ms ease-in-out;
        text-decoration: underline 1px;
        text-underline-offset: 10px;
    }
`
const Icon = styled.img`
    width: 20px;
    cursor: pointer;
`
const Button = styled.button`
    width: 100px;
    padding: 10px;
    background-color: #56d1ac;
    color: white;
    border: none;
    cursor: pointer;
    border-radius: 5px;
`

const Link = styled.a`
    color: inherit;
    text-decoration: none;
`;


const Navbar = () => {
    return (
        <Section>
            <Container>
                <Links>
                    <Logo src='./img/signature.png' />
                    <List>
                        <Link href='#home'>
                            <ListItem>
                                Home
                            </ListItem>
                        </Link>
                        <Link href='#about'>
                            <ListItem>
                                About
                            </ListItem>
                        </Link>
                        <Link href='#tools'>
                            <ListItem>
                                Tools
                            </ListItem>
                        </Link>
                        <Link href='#projects'>
                            <ListItem>
                                Projects
                            </ListItem>
                        </Link>
                        <Link href='#contact'>
                            <ListItem>
                                Contact
                            </ListItem>
                        </Link>
                    </List>
                </Links>
                <Icons>
                    <Icon src='./img/search.png' />
                    <Button>
                        Unknown
                    </Button>
                </Icons>
            </Container>
        </Section>
    )
}

export default Navbar