import img1 from './logo.png'
import {motion} from 'framer-motion';
function Nav(){
    return(
        <div className=" border-b h-[11vh] w-auto flex items-center p-[4vh] max-sm:h-[0vh]">
            <motion.h1  animate ={{y:[0,-15,0]}} transition={{duration:"3", delay:"0"}} className=" w-auto h-auto">
                {/* <strong className="text-[1.7vw] ">Gemini</strong>  */}
                <img src={img1} alt="" className='w-[6vw] max-sm:w-[9vh]' />
            </motion.h1>
        </div>
    )
}

export default Nav;