import img1 from './logo.png'
import React, { useRef } from 'react';
import {motion} from 'framer-motion';
import Main from './main';
function Nav(props){
 
    return(
        <div className=" border-b  h-[4.5rem] w-[100vw] mt-[0vh]  flex items-center p-[4vh] max-sm:h-[3vh] max-sm:mt-[0vh] gap-[2vh] max-lg:h-[60px] max-lg:mt-[0px] " >

            <motion.div  animate ={{y:[0,-15,0]}} transition={{duration:"3", delay:"0"}} className=" w-auto h-auto">
     
                <img src={img1} alt="" className='w-[6rem] max-sm:w-[9vh]' />
            </motion.div>
           
        </div>
    )
}

export default Nav;