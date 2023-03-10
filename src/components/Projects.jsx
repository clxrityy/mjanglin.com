import React from 'react';
import collabrity from '../assets/projects/collabrity.gif';
import uoraty from '../assets/projects/uoraty.gif';
import clxrityxyz from '../assets/projects/clxrityxyz.gif';
import pacman from '../assets/projects/pacman.gif';
import ProjectItem from './ProjectItem';

const Projects = () => {
    return (
        <div id='projects' className='w-full'>
            <div className='max-w-[1240px] mx-auto py-16'>
                <p className='text-xl tracking-widest uppercase text-[#4b9084]'>
                    Projects
                </p>
                <h2 className='py-4'>
                    My Favorite Websites I&#39;ve Built
                </h2>
                <div className='grid md:grid-cols-2 gap-8'>
                    <ProjectItem

                        title='collabrity.xyz'
                        backgroundImg={collabrity}
                        projectUrl='https://www.collabrity.xyz'
                        tool='Vite JS'
                        description='A concept for the homepage of a collaborative music site.'
                    />
                    <ProjectItem

                        title='uoraty'
                        backgroundImg={uoraty}
                        projectUrl='https://clxrityy.github.io/uoraty'
                        tool='React JS'
                        description="A dashboard containing multiple features with the ability to change the website's theme and color scheme."
                    />
                    <ProjectItem

                        title='clxrity.xyz'
                        backgroundImg={clxrityxyz}
                        projectUrl='https://www.clxrity.xyz'
                        tool='React JS'
                        description="A simple mobile-friendly site with small animations to link my social platforms."
                    />
                    <ProjectItem

                        title='Pac-Man'
                        backgroundImg={pacman}
                        projectUrl='https://clxrityy.github.io/pacman/'
                        tool='JavaScript'
                        description="A replication of the classic Pac-Man game. Play using the arrow keys."
                    />

                </div>
            </div>
        </div>
    );
};

export default Projects;