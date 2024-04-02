import axios from 'axios';
import { useState } from 'react';
import {motion} from 'framer-motion';
import { useEffect } from 'react';

function Main(props){
    
    const [isLoading, setIsLoading] = useState(true);
    const [prompt, setPrompt] = useState(null);
    const [updated,setUpdated] = useState('');
    
    const handler = (e) =>{
        setPrompt(e.target.value);
    }

    
      const data = async function data() {

     
       
        const response = await axios({
            url:'https://generativelanguage.googleapis.com/v1beta/models/gemini-pro:generateContent?key=AIzaSyDdERGCkujR4KDx-Pxri4eDZxvBNyR0B2A',
            method:'post',
            data:{contents:[{parts:[{text:prompt}]}]}
         })

       
    
      
        
           document.querySelector('#greet').style.display = 'none';
         document.querySelector('.paragraph').style.display = 'flex'
         document.querySelector('.prompt').style.display = 'flex'

         const paragraphs = response.data.candidates[0].content.parts[0].text.split('\n\n');
        
         const newpara = paragraphs.map((paragraph, index) => {
          
            if (paragraph.startsWith('**') && paragraph.endsWith('**')) {
            
              return <h2 className='updatedhead' key={index} style={{ fontWeight: 'bold', fontSize: '1.3rem' }}>{paragraph.replace(/\*\*/g, '')}</h2>;
            } else {
            
              return <p className='updatedpara' key={index} style={{ marginBottom: '1rem' }}>{paragraph.replace(/\*\*/g, '')}</p>;
            }
          
          })

          setUpdated(newpara)
          setIsLoading(false);
      };

     useEffect(()=>{
        data();
     },[])
      
    
   
    return(
        
        <div className="  w-[100vw] h-[89vh]  flex flex-col  items-center justify-center  m-[0px] p-[0px] gap-[1vw] max-sm:h-[80vh] max-sm:gap-[1vh]">
             
             <div id="greet" className="  w-[100vw] h-[70vh] flex flex-col items-left  justify-center  m-[0px] p-[0px]  max-sm:h-[65vh] ">
            <div className=" flex flex-col m-[0px] w-auto h-[28vh] items-center justfy-center ">
            <motion.h1 animate ={{x:[0,-40,0]}} transition={{duration:"3", delay:"0"}} className="text-[4.5vw] font-bold text-white max-sm:text-[4.5vh]  h-auto max-sm:w-[35vh] text-left  w-[57vw]" id="text-gradient  ">Hello,</motion.h1>
            <motion.h1 animate ={{x:[0,-40,0]}} transition={{duration:"4", delay:"0"}} className=" text-[4.5vw] font-bold text-[#444746] max-sm:text-[4.5vh]  h-auto  max-sm:w-[35vh]">How can I help you today?</motion.h1>
            </div>
            
        </div>
           
        <motion.div animate ={{y:[0,-10,0]}} transition={{duration:"3", delay:"0"}} className=' prompt h-[7vh] w-[50vw]   hidden flex max-sm:w-[45vh] max-sm:h-[5vh] max-sm:mt-[2vh]'>
            <strong><h1 className='h-auto w-auto text-[1.7vw] max-sm:text-[2.5vh] '>{prompt}</h1></strong>
        </motion.div>

        <div className='loader h-[60vh] w-[100vw]  hidden '>
        <h1>loading</h1>
        </div>
         <motion.div animate ={{y:[0,-10,0]}} transition={{duration:"4", delay:"0"}}  className=' paragraph overflow-scroll h-[60vh] w-[50vw] text-[3.2vh] gap-[0vw] mt-[0vw] flex flex-col   hidden  max-sm:w-[45vh]  max-sm:h-[60vh] '>
                        
                { isLoading ? 
                <p>Loading...</p>
            :  updated}
           
        

         </motion.div>
    
        <div className=' border-t h-[20vh] w-[100vw] flex flex-row items-center justify-center max-sm:h-[15vh]'>
        < motion.input animate ={{y:[0,-20,0]}} transition={{duration:"4", delay:"0"}} type="text" className="text -none w-[45vw] h-[9vh]  bg-[#444746] text-[#b5b9be] outline-none p-[1.5vw] max-sm:h-[7vh] max-sm:w-[36vh] max-sm:p-[2vh]" onChange={handler} placeholder="Enter a prompt here" />
           <motion.button animate ={{y:[0,-20,0]}} transition={{duration:"4", delay:"0"}} className="btn  w-[14vh] bg-white text-black h-[9vh]  max-sm:h-[7vh] max-sm:p-[2vh] max-sm:w-[10vh]"  onClick={data}> submit</motion.button>
        </div>
        
        </div>
    )
}

export default Main;