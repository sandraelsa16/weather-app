import axios from "axios";
import React, { useEffect, useState } from "react";

import {
  IoMdSunny,
  IoMdRainy,
  IoMdCloudy,
  IoMdSnow,
  IoMdThunderstorm,
  IoMdSearch,
} from "react-icons/io";

// import { TbMist } from "react-icons/tb";

import {
  BsCloudHaze2Fill,
  
  BsCloudDrizzleFill,
  BsEye,
  BsWater,
  BsThermometer,
  BsWind,
} from "react-icons/bs";

import { TbTemperatureCelsius } from "react-icons/tb";
import { ImSpinner8 } from "react-icons/im";

//api
const APIkey = "50bfc0befe975b75ebedb09eb78194f6";

const App = () => {
  const [data, setData] = useState(null);
  const [location, setLocation] = useState("Kochi");
  const[inputValue,setInputValue]=useState('');
  const[animate,setAnimate]=useState(false);
   const[loading,setLoading]=useState(false);
   const[errMsg,setErrMsg]=useState('');
   const [background, setBackground] = useState("");


  const handleInput = (e)=>{
    setInputValue(e.target.value)
  }

  // console.log(inputValue);

  const handleSubmit = (e)=>{
    // console.log(inputValue);

    //set input
    if(inputValue !== ''){
      setLocation(inputValue)
    }

    const input =document.querySelector('input')
    if(input.value === '') {
      setAnimate(true)

      setTimeout(()=>{
        setAnimate(false);
      },500)
    }
    //if value is empty

    //clear input
    input.value =''
    // preventDefault
    e.preventDefault();
  }
  
  //fetch data

  useEffect(() => {

    setLoading(true)
    const url = `https://api.openweathermap.org/data/2.5/weather?q=${location}&units=metric&appid=${APIkey}`;
    // const url = `https://api.openweathermap.org/data/3.0/weather?q=${location}&exclude={part}&appid=${APIkey}`;

    axios
      .get(url)
      .then((res) => {
        setTimeout(() => {
          setData(res.data);
          setLoading(false)
           // Set background based on weather condition
           switch (res.data.weather[0].main) {
            case "Clouds":
              setBackground("https://i.makeagif.com/media/8-26-2023/cjaI99.gif");
              break;
            case "Haze":
              setBackground("https://media2.giphy.com/media/hsh2YGGyn7en7TcByc/giphy.gif?cid=6c09b9524jiktpdbuziqkfsmzryo086aw6744e57orgrxg3f&ep=v1_internal_gif_by_id&rid=giphy.gif&ct=g");
              break;
            case "Rain":
              setBackground("https://i.gifer.com/origin/dd/dd203721e766161782d5fe3f703407ba_w200.gif");
              break;
            case "Clear":
              setBackground("https://i.pinimg.com/originals/c8/ba/30/c8ba30ee61944cc26dbde4022a0a4b72.gif");
              break;
            case "Snow":
              setBackground("https://i.pinimg.com/originals/54/67/27/546727d1854d11df8c148ecd113a7cfb.gif");
              break;
            case "Mist":
              setBackground("https://media2.giphy.com/media/hsh2YGGyn7en7TcByc/giphy.gif?cid=6c09b9524jiktpdbuziqkfsmzryo086aw6744e57orgrxg3f&ep=v1_internal_gif_by_id&rid=giphy.gif&ct=g");
              break;
            case "Drizzle":
              setBackground("https://media.tenor.com/jEaVOr9rLZQAAAAM/rain.gif");
              break;
            case "Thunderstorm":
              setBackground("https://i.pinimg.com/originals/42/5b/81/425b811084dd2421c1df0fbe7576d883.gif");
              break;
            default:
              setBackground("https://i.imgflip.com/7rhjmg.jpg"); // Fallback image
              break;
          }


        }, 1500);
       
       
      })
      .catch((err) => {
        setLoading(false)
        setErrMsg(err)
      });
  }, [location]);


//error msg
useEffect(()=>{
  const timer = setTimeout(() => {
    setErrMsg('')
  },2000 );

  // clear timer
   return() =>clearTimeout(timer)

},[errMsg])

  if (!data) {
    return (
    <div className="w-full h-screen bg-gradientBg bg-no-repeat bg-cover bg-center flex flex-col justify-center items-center">
      <div>
        <ImSpinner8 className="text-5xl animate-spin text-white" />
      </div>
    </div>
    );
  }

  let icon;
  // console.log(data);
  //  console.log(data.weather[0].main);
   
   switch (data.weather[0].main) {
    case "Clouds":
      icon = <IoMdCloudy/>
      break
    case "Haze":
      icon = <BsCloudHaze2Fill/>
      break
    case "Rain":
      icon = <IoMdRainy/>
      break
    case "Clear":
      icon = <IoMdSunny/>
      break
    case "Snow":
      icon = <IoMdSnow/>
      break
    case "Mist":
      icon = <BsWater/>
      break
    case "Drizzle":
      icon = <BsCloudDrizzleFill/>
      break
    case "Thunderstorm":
      icon = <IoMdThunderstorm/>
      break
      default:
      icon = <IoMdSunny />; // Default icon
      
   }

   //date object

   const date = new Date();

  // console.log(data);
  return (
  <div style={{ backgroundImage: `url(${background})`,backgroundRepeat: "no-repeat",backgroundSize:"cover" }} className="w-full h-screen flex flex-col items-center justify-center px-4 lg:px-0 ">
    {errMsg && <div className="w-full max-w-[90vw] lg:max-w-[450px] bg-red-600 text-white absolute top-2 lg:top-10 p-4 capitalize rounded-md z-10 mt-20">{`${errMsg.response.data.message}`}</div> }
    {/* form */}
    <form className={` ${animate? 'animate-shake':'animate-none'}  h-14 bg-black/30 w-full max-w-[450px] rounded-full backdrop-blur-[32px] mt-4 mb-3`}>
      <div className="h-full relative flex items-center justify-between p-2">
        <input onChange={(e)=>handleInput(e)} className="flex-1 bg-transparent outline-none placeholder:text-white text-white text-[15px] font-light pl-16 h-full " type="text" placeholder="Search by city or country" />
        <button onClick={(e)=>handleSubmit(e)} className="bg-blue-600 hover:bg-blue-400 w-20 h-12 rounded-full flex justify-center items-center transition">
          <IoMdSearch className="text-2xl text-white"/>
          </button>
      </div>
    </form>

    
    <div   className="w-full bg-black/15 max-w-[450px] min-h-[500px] text-white backdrop-blur-[32px] rounded-[32px] py-12 px-6 mb-4">
    
    {loading?( 
      <div className="w-full h-full flex justify-center items-center">
        <ImSpinner8 className="text-white text-5xl animate-spin"/>
      </div>
    ):(
      <div>
      {/* card top */}
      <div className="flex items-center flex-col gap-x-5">
      {/* icon */}
          <div className="text-[87px]">
            {icon}
          </div>
      {/* country name */}
      <div className="text-2xl font-semibold">
        {data.name},{data.sys.country}
      </div>
      {/* date */}
      <div>
        {date.getUTCDate()}/{date.getUTCMonth()+1}/{date.getUTCFullYear()}
      </div>
      </div>
      
      <div className="my-20">
        <div className="flex justify-center items-center">
          <div className="text-[144px] leading-none font-light">
            {parseInt(data.main.temp)}
          </div>
          <div className="text-4xl">
            <TbTemperatureCelsius/>
            </div>
        </div>
        <div className="capitalize text-center">
          {data.weather[0].description}
        </div>
      </div>
      {/* footer */}
      <div className="max-w-[378px] mx-auto flex flex-col gap-y-6">
        <div className="flex justify-between">
          <div className="flex items-center gap-x-2">
            <div className="text-[20px]">
              <BsEye/>
            </div>
            <div>
              Visibility <span className="ml-2">{data.visibility/1000}km</span>
            </div>
          </div>
          <div className="flex items-center gap-x-2">
            <div className="text-[20px]">
              <BsThermometer/>
            </div>
            <div className="flex">
              Feels Like
               <div className="flex ml-2">
                {parseInt(data.main.feels_like)}
                <TbTemperatureCelsius/>
                </div>
            </div>
          </div>
          
        </div>
        <div className="flex justify-between">
          <div className="flex items-center gap-x-2">
            <div className="text-[20px]">
              <BsWater/>
            </div>
            <div>
              Humidity <span className="ml-2">{data.main.humidity}%</span>
            </div>
          </div>
          <div className="flex items-center gap-x-2">
            <div className="text-[20px]">
              <BsWind/>
            </div>
            <div className="flex">
              Wind <span className="ml-3">{data.wind.speed}m/s</span>
            </div>
          </div>
        </div>
      </div> 
      </div>

    )}
      
    </div>
  </div>
  );
}

export default App;
