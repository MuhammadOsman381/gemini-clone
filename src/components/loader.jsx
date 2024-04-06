
const Loader = () =>{
    return(
        <div className="w-auto h-auto flex items-center justify-center ">
            <div className=" h-[59vh] w-[72vw] relative flex justify-center items-center">
            <div className="absolute animate-spin rounded-full h-32 w-32 border-t-4 border-b-4 border-purple-500"></div>
            <img src="https://www.svgrepo.com/show/509001/avatar-thinking-9.svg"  class="rounded-full h-28 w-28"/>
        </div>
        </div>
    )
}

export default Loader;