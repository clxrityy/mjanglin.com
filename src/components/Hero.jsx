import React from 'react';
import styled from '/styled-components';
import Navbar from './Navbar';
import { AiOutlineArrowDown } from '/react-icons/ai';
import { Canvas } from '/@react-three/fiber';
import { MeshDistortMaterial, OrbitControls, Sphere } from '/@react-three/drei';

const Section = styled.div`
    height: 100vh;
    scroll-snap-align: center;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: space-between;
`;

const Container = styled.div`
    height: 100vh;
    scroll-snap-align: center;
    width: 1400px;
    display: flex;
    justify-content: space-between;
`;

{/* LEFT */ }
const Left = styled.div`
    flex: 2;
    display: flex;
    flex-direction: column;
    justify-content: center;
    gap: 20px;
`;

const Title = styled.h1`
    font-size: 74px;
`;

const WhoAmI = styled.div`
    display: flex;
    align-items: center;
    gap: 10px;
`;

const Subtitle = styled.h2`
    color: #56d1ac;
`;

const Desc = styled.p`
    font-size: 24px;
    color: lightgray;
`;

const Button = styled.button`
    background-color: #56d1ac;
    color: white;
    font-weight: 500;
    width: 100px;
    padding: 10px;
    border: none;
    border-radius: 5px;
    cursor: pointer;
    font-size: 30px;
    &:hover {
        transition: all 200ms ease-out;
        transform: scale(1.1);
    }
`;

{ /* RIGHT */ }
const Right = styled.div`
    flex: 3;
    position: relative;
`;
const Img = styled.img`
    height: 500px;
    width: 700px;
    object-fit: contain;
    position: absolute;
    top: 0;
    bottom: 0;
    left: 0;
    right: 0;
    margin: auto;
    animation: animate 2s infinite ease alternate;

    @keyframes animate {
        100% {
            transform: translateY(20px)
        }
    }
`;

const Hero = () => {
    return (
        <Section id='home'>
            <Navbar />
            <Container>
                <Left>
                    <Title>
                        MJ Anglin
                    </Title>
                    <WhoAmI>
                        —
                        <Subtitle>
                            Front-End Web Developer
                        </Subtitle>
                    </WhoAmI>
                    <Desc>
                        I'm an aspiring web & game developer while I pursue my degree as a Network Specialist.
                    </Desc>
                    <a href='/#about'>
                        <Button>
                            <AiOutlineArrowDown />
                        </Button>
                    </a>
                </Left>
                <Right>
                    {/* 3D MODEL */}
                    <Canvas camera={{ fov: 25, position: [5, 5, 5] }}>
                        <OrbitControls enableZoom={false} autoRotate />
                        <ambientLight intensity={0.4} />
                        <directionalLight position={[3, 2, 1]} />
                        <Sphere args={[1, 100, 200]} scale={1.3}>
                            <MeshDistortMaterial color="#7e36af" attach='material' distort={0.5} speed={2} />
                        </Sphere>
                    </Canvas>
                    <Img src='./img/heroWebDev.png' />
                </Right>
            </Container>
        </Section>
    );
}

export default Hero;