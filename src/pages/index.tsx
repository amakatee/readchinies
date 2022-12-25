import { type NextPage } from "next";
import Head from "next/head";
import Link from "next/link";
import { useState } from "react";
// import ReactHowler from 'react-howler'
import { trpc } from "../utils/trpc";



const Home: NextPage = () => {
  const hello = trpc.example.hello.useQuery({ text: "from tRPC" });
  const [pianyin, setPianYin] = useState('')


  interface charactersArray {
      id: string
      character:string
      pianyin: string
      tone: number,
      audio: string
  }
  const characters : charactersArray[]  = [{
    id: new Date().toString(),
    character: "我",
    pianyin: "Wǒ",
    tone: 3,
    audio: "https://yabla.vo.llnwd.net/media.yabla.com/audio/340410.mp3"
  }, 
  {
    id: new Date().toString(),
    character: "的",
    pianyin: "de",
    tone: 0,
    audio: "https://yabla.vo.llnwd.net/media.yabla.com/audio/340410.mp3"

    
  },
  {
    id: new Date().toString(),
    character: "名",
    pianyin: "míng",
    tone: 2,
    audio: "https://yabla.vo.llnwd.net/media.yabla.com/audio/340410.mp3"

  },
  {
    id: new Date().toString(),
    character: "字",
    pianyin: "zì",
    tone: 4,
    audio: "https://yabla.vo.llnwd.net/media.yabla.com/audio/340410.mp3"

  },
  {
    id: new Date().toString(),
    character: "是",
    pianyin: "shì",
    tone: 4,
    audio: "https://yabla.vo.llnwd.net/media.yabla.com/audio/340410.mp3"

  },
  {
    id: new Date().toString(),
    character: "因",
    pianyin: "yīn",
    tone: 1,
    audio: "https://yabla.vo.llnwd.net/media.yabla.com/audio/340410.mp3"

  }
]
  
   const notExist = {
    id: new Date().toString(),
    character: "&",
    pianyin: "not in db",
    tone: 5,
    audio: "https://yabla.vo.llnwd.net/media.yabla.com/audio/340410.mp3"


   }
   let toneColor:string = ''

   const switchColor = ( char: charactersArray ) => {
   
     if(char.tone === 1) {
       toneColor = "text-[#F977CE]"
       return toneColor
     } else if (char.tone === 2) {
      toneColor = "text-[#20BF55]"
      return toneColor
     } else if (char.tone === 3) {
      toneColor = "text-[#01BAEF]"
      return toneColor 
      }  else if (char.tone === 4) {
        toneColor = "text-[#B8D3FE]"
        return toneColor
      }else if (char.tone === 0) {
        toneColor = "text-[#AF8C9D]"
        return toneColor
    }else if (char.tone === 5) {
      toneColor = "text-[#4062BB]"
      return toneColor
    }
  }
  const text: string = "我的名字 你因为"
  
  const splittedTextArray  = text.split('')
  
  const updatedCharsArray = splittedTextArray.map(letter => {
    return characters.find(char => char.character === letter)
  })

  const seePianYin = (char: charactersArray) => {
    setPianYin(char.pianyin)
    return char.pianyin
  }


  console.log(pianyin)



  return (
    <>
   =
      <main className="w-[100vw] h-[calc(100vh-3rem)]  bg-[#111a30] ">
        hello
        <div className="w-[90vw] m-auto flex text-xl gap-0.5 py-2 pl-2 font-mono  leading-6 text-indigo-600 whitespace-pre dark:text-indigo-300 border-t border-slate-100 dark:border-slate-400/10">

        {updatedCharsArray.map((c,i ) => c ? 
        
          <div key={i} onClick={() => seePianYin(c)} className={`${switchColor(c)}`}>{c.character}</div> :
          <div onClick={() => seePianYin(notExist)} className={`${switchColor(notExist)}`}>{notExist.character}</div>

         
        )
        }
        <div  className="bg-white">{pianyin}</div>
         
        </div>
      </main>
    </>
  );
};

export default Home;
