import React from 'react';
import shureBeta from '../assets/beta57a.png';
import EquipmentItem from './EquipmentItem';
import scarlett from '../assets/scarlett.png';
import dtPro from '../assets/dt-headphones.png';

const Equipment = () => {
    return (
        <div id='equipment' className='w-full'>
            <div className='max-w-[1240px] mx-auto py-16'>
                <div className='grid md:grid-cols-3 gap-8'>
                    <EquipmentItem item='Shure BETA 57A' image={shureBeta} title='Microphone' rating={5} />
                    <EquipmentItem item='Scarlett Focusrite 1i1' image={scarlett} title='Audio Interface' rating={5} />
                    <EquipmentItem item={`DT 770 PRO` + `\n` + `(32 ohm)`} image={dtPro} title='Headphones' rating={4} />
                </div>
            </div>
        </div>
    );
};

export default Equipment;