import img1 from './logo.png'

function Nav(){
    return(
        <div className=" border-b h-[11vh] w-auto flex items-center p-[4vh] max-sm:h-[0vh]">
            <h1 className=" w-auto h-auto">
                {/* <strong className="text-[1.7vw] ">Gemini</strong>  */}
                <img src={img1} alt="" className='w-[7vw] max-sm:w-[9vh]' />
            </h1>
        </div>
    )
}

export default Nav;