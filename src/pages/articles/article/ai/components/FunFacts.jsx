import React from 'react';
import { HiLightBulb } from 'react-icons/hi';

const FunFacts = () => {
    return (
        <div className='flex flex-col space-y-5'>
            <h4 className='uppercase flex flex-row justify-center items-center'>
                A.I. FUN FACTS <HiLightBulb size={20} className='ml-2' />
            </h4>
            <ul className='list-disc space-y-4 list-inside text-sm'>
                <li className='italic cursor-default'>
                    &#34;Already approximately 77% of the devices that we use feature AI in one form or another.&#34;
                    <p className='text-xs not-italic'>
                        (<a href='https://creativestrategies.com/' className='text-[#4b9084]'>https://creativestrategies.com/</a>)
                    </p>
                </li>
                <li className='italic cursor-default'>
                    Google CEO <b>Sundar Pichai</b> claimed that artificial intelligence (AI) would be more transformative to humanity as a species than electricity and fire.
                    <p className='text-xs not-italic'>
                        (<a href='https://www.forbes.com/sites/bernardmarr/2021/09/24/the-7-biggest-artificial-intelligence-ai-trends-in-2022/?sh=514f839e2015' className='text-[#4b9084]'>https://forbes.com/</a>)
                    </p>
                </li>
            </ul>
        </div>
    );
};

export default FunFacts;