import axios from 'axios';
import { useState } from 'react';
// import Input from './input';
import { useEffect } from 'react';
// import Input from './input';
// import Greeting from './greeting';

function Main(props){
    
    const [para,setPara] = useState('');
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

        //  console.log(response.data);

         setPara(response.data.candidates[0].content.parts[0].text);
         
            console.log(response.data.candidates[0].content.parts[0].text)
    
         document.querySelector('#greet').style.display = 'none';
         document.querySelector('.paragraph').style.display = 'flex'
         document.querySelector('.prompt').style.display = 'flex'

         const paragraphs = response.data.candidates[0].content.parts[0].text.split('\n\n');
        //  alert('Please wait a moment until the data has been fetched.');
         const u = paragraphs.map((paragraph, index) => {
            // Check if the paragraph contains a heading (marked with "**")
            if (paragraph.startsWith('**') && paragraph.endsWith('**')) {
              // Render heading with bold and larger font size
              return <h2 className='updatedhead' key={index} style={{ fontWeight: 'bold', fontSize: '1.3rem' }}>{paragraph.replace(/\*\*/g, '')}</h2>;
            } else {
              // Render regular paragraph with space between paragraphs
            //   if(paragraph.endsWith('*')){
                
            //   }
              return <p className='updatedpara' key={index} style={{ marginBottom: '1rem' }}>{paragraph.replace(/\*\*/g, '')}</p>;
            }
          
          })

          setUpdated(u)
      };

     useEffect(()=>{
        data();
     },[])
      
    
   
    return(
        
        <div className=" w-[100vw] h-[86vh]  flex flex-col  items-center justify-center  m-[0px] p-[0px] gap-[1vw] max-sm:h-[80vh] max-sm:gap-[1vh]">
             
             <div id="greet" className="  w-[100vw] h-[75vh] flex flex-col  items-center justify-center  m-[0px] p-[0px]  max-sm:h-[65vh] ">
            <div className=" flex flex-col m-[0px] w-auto h-[28vh] items-center justfy-center ">
            <h1 className="text-[4.5vw] font-bold text-white max-sm:text-[4.5vh]  h-auto max-sm:w-[35vh] " id="text-gradient  ">Hello,</h1>
            <h1 className=" text-[4.5vw] font-bold text-[#444746] max-sm:text-[4.5vh]  h-auto  max-sm:w-[35vh]">How can I help you today?</h1>
            </div>
            
        </div>
           
        <div className='prompt h-[7vh] w-[50vw]  hidden flex max-sm:w-[45vh] max-sm:h-[5vh]'>
            <strong><h1 className='h-auto w-auto text-[1.7vw] max-sm:text-[2.5vh] '>{prompt}</h1></strong>
        </div>
         <div className='paragraph overflow-scroll h-[70vh] w-[50vw] text-[3.2vh] gap-[0vw] mt-[0vw] flex flex-col   hidden  max-sm:w-[45vh] max-sm:h-[60vh] '>
                  
            {updated}
        

         </div>
    
        <div className=' h-auto w-auto'>
        <input type="text" className="text border-none w-[45vw] h-[9vh]  bg-[#444746] text-[#b5b9be] outline-none p-[1.5vw] max-sm:h-[7vh] max-sm:w-[36vh] max-sm:p-[2vh]" onChange={handler} placeholder="Enter a prompt here" />
           <button className="btn  w-[14vh] bg-white text-black h-[9vh] rounded-[30px] max-sm:h-[7vh] max-sm:p-[2vh] max-sm:w-[10vh]"  onClick={data}> submit</button>
        </div>
        
        </div>
    )
}

export default Main;