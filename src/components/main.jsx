import axios from 'axios';
import { useState } from 'react';
import { motion } from 'framer-motion';
import { useEffect } from 'react';
import Nav from './nav';
import { getDatabase, ref, get } from 'firebase/database';
import { app } from './FireBase';
import Loader from './loader';
function Main(props) {


  const [prompt, setPrompt] = useState('');
  const [updated, setUpdated] = useState('');
  const [prearray,setPreArray] = useState([]);
  const [loader,setLoader] = useState(false);

  const handler = (e) => {
    setPrompt(e.target.value);
  }


  const data = async function data() {

    setLoader(true);
    document.querySelector('#greet').style.display = 'none';
    document.querySelector('.paragraph').style.display = 'flex'
    document.querySelector('.prompt').style.display = 'flex'
    const response = await axios({
      url: 'https://generativelanguage.googleapis.com/v1beta/models/gemini-pro:generateContent?key=AIzaSyDdERGCkujR4KDx-Pxri4eDZxvBNyR0B2A',
      method: 'post',
      data: { contents: [{ parts: [{ text: prompt }] }] }
    })

    setLoader(false);
  
   

    const paragraphs = response.data.candidates[0].content.parts[0].text.split('\n\n');

    const newpara = paragraphs.map((paragraph, index) => {

      if (paragraph.startsWith('**') && paragraph.endsWith('**')) {

        return <h2 className='updatedhead' key={index} style={{ fontWeight: '700', fontSize: '1.3rem' }}>{paragraph.replace(/\*\*/g, '')}</h2>;
      } else {

        return <p className='updatedpara' key={index} style={{ marginBottom: '1rem' }}>{paragraph.replace(/\*\*/g, '')}</p>;
      }

    })
    setUpdated(newpara)

   




    const res = fetch("https://gemini-clone-b1e11-default-rtdb.firebaseio.com/user.json", {
      method: "POST",

      body: JSON.stringify(
        {
          prompts: prompt,
          answer: response.data.candidates[0].content.parts[0].text,
        }
      )
    })

   
 
   
  };


  function fetcheddata(){
  
        const db = getDatabase(app);
        const refer = ref(db,'user');
        get(refer).then((snapshot) => {
          const array = Object.values(snapshot.val());
         
            setPreArray(array)
           
          
          
          
        })
          
    
  } 



  useEffect(()=>{
    fetcheddata()

  },[])

  return (


    <div className="  w-[100vw] h-[87.5vh]  flex flex-col items-center justify-center  m-[0px] p-[0px] gap-[0%] max-sm:h-[80vh] max-sm:gap-[0vh] max-lg:h-[80vh]" >
      <div className='-green-200 flex flex-row w-auto h-[70vh] gap-[0vw] p-2'>
     
        <div id="greet" className=" w-[100vw] h-[63vh] flex flex-col items-center  justify-center  m-[0px] p-[0px]  max-sm:h-[65vh] max-lg:h-[60vh] ">
          <div className=" flex flex-col m-[0px] w-auto h-auto items-center justfy-center ">
            <motion.h1 animate={{ x: [0, -40, 0] }} transition={{ duration: "3", delay: "0" }} className="text-[4.5vw] font-bold text-white max-sm:text-[4.5vh]  h-auto max-sm:w-[35vh] text-left  w-[57vw] max-lg:text-[50px]" id="text-gradient  ">Hello,</motion.h1>
            <motion.h1 animate={{ x: [0, -40, 0] }} transition={{ duration: "4", delay: "0" }} className=" text-[4.5vw] font-bold text-[#444746] max-sm:text-[4.5vh]  h-auto  max-sm:w-[35vh] max-lg:text-[50px]">How can I help you today?</motion.h1>
          </div>

        </div> 

      <div className=' flex flex-col items-center justify-center w-auto h-auto mt-[0vw]'>
          <motion.div animate={{ y: [0, -10, 0] }} transition={{ duration: "3", delay: "0" }} className=' prompt h-[15%] w-[75vw]   hidden flex max-sm:w-[45vh] max-sm:h-[5vh] max-sm:mt-[2vh]'>
            <strong><h1 className='h-auto w-auto text-[1.4rem] max-sm:text-[2.5vh] '>{prompt}</h1></strong>
          </motion.div>

          <motion.div animate={{ y: [0, -10, 0] }} transition={{ duration: "4", delay: "0" }} className=' paragraph overflow-scroll h-[63vh] w-[75vw] text-[3.2vh] gap-[0vw]  flex flex-col   hidden  max-sm:w-[45vh]  max-sm:h-[60vh] max-lg:h-[60vh] '>
          {loader ? 
               ( <Loader/> )
               : updated
              }
          </motion.div>
        </div> 
      </div>
      <div className=' border-t h-[17vh] w-[100vw] flex flex-row items-center justify-center max-sm:h-[15vh] max-lg:h-[100px]  '>
        < motion.input animate={{ y: [0, -20, 0] }} transition={{ duration: "4", delay: "0" }} type="text" className="text -none w-[45vw] h-[3.5rem]  bg-[#444746] text-[#b5b9be] outline-none p-[1.5vw] max-sm:h-[7vh] max-sm:w-[36vh] max-sm:p-[2vh] max-lg:h-[54px]" onChange={handler} placeholder="Enter a prompt here" />
        <motion.button type='submit' animate={{ y: [0, -20, 0] }} transition={{ duration: "4", delay: "0" }} className="btn  w-[5rem] bg-white text-black h-[3.5rem]  max-sm:h-[7vh] max-sm:p-[2vh] max-sm:w-[10vh] max-lg:h-[54px]" onClick={data}> submit</motion.button> 
      </div>

    </div>
  )
}

export default Main;
