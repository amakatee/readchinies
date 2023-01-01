import { type NextPage } from "next";
import { useState } from "react";
// import ReactHowler from 'react-howler'
import { trpc } from "../utils/trpc";

import Link from "next/link";



const Home: NextPage = () => {
  const utils = trpc.useContext()
  const {data: Allposts, isLoading } = trpc.posts?.allPosts.useQuery() 
  console.log(Allposts)

  const charts = trpc.char.chars.useQuery({text: "kkkk"})
  // const hello = trpc.example.hello.useQuery({ text: "from tRPC" });
  const [pianyin, setPianYin] = useState('')
  console.log(charts.data)
  const [desc, setDesc] = useState({
    pianyin:'',
    rus:'',
    eng:'',
    show: false
   
  })


  interface charactersArray {
      id: string
      character:string
      pianyin: string,
      rus: string,
      eng: string,
      tone: number,
      audio: string,
      visible: boolean
  }
  const characters : charactersArray[]  = [{
    id: new Date().toString(),
    character: "我",
    pianyin: "Wǒ",
    rus: "местоим я, мне, мой; мы, нам, наш; кто-то, любой; сам, себя",
    eng: "pro. I, me, my; we, us, our; one, anyone; oneself",
    tone: 3,
    audio: "https://yabla.vo.llnwd.net/media.yabla.com/audio/340410.mp3",
    visible: false
  }, 
  {
    id: new Date().toString(),
    character: "的",
    pianyin: "de",
    rus: "местоим я, мне, мой; мы, нам, наш; кто-то, любой; сам, себя",
    eng: "pro. I, me, my; we, us, our; one, anyone; oneself",
    tone: 0,
    audio: "https://yabla.vo.llnwd.net/media.yabla.com/audio/340410.mp3",
    visible: false

    
  },
  {
    id: new Date().toString(),
    character: "名",
    pianyin: "míng",
    rus: "сущ/глаг имя; называться, носить имя",
    eng: "n./v. name; be called, have the name of",
    tone: 2,
    audio: "https://yabla.vo.llnwd.net/media.yabla.com/audio/340410.mp3",
    visible: false

  },
  {
    id: new Date().toString(),
    character: "字",
    pianyin: "zì",
    rus: "сущ иероглиф; произношение (слова или иероглифа); имя; квитанция, расписка; слова, выражения; стиль каллиграфии; письмена",
    eng: "n. character; pronunciation (of a word or character); name; receipt, IOU; wording; style of calligraphy; scripts",
    tone: 4,
    audio: "https://yabla.vo.llnwd.net/media.yabla.com/audio/340410.mp3",
    visible: false

  },
  {
    id: new Date().toString(),
    character: "是",
    pianyin: "shì",
    rus: "глаг/прил быть; правильный, верный",
    eng: "v./adj. to be; correct, right",
    tone: 4,
    audio: "https://yabla.vo.llnwd.net/media.yabla.com/audio/340410.mp3",
    visible: false

  },
  {
    id: new Date().toString(),
    character: "因",
    pianyin: "yīn",
    rus: "графема причина, повод; следовать (чему-л.), продолжать",
    eng: "char. reason, cause; to carry on, to continue",
    tone: 1,
    audio: "https://yabla.vo.llnwd.net/media.yabla.com/audio/340410.mp3",
    visible: false

  }
]
  
   const notExist = {
    id: new Date().toString(),
    character: "&",
    pianyin: "not in db",
    rus: "-",
    eng: "-",
    tone: 5,
    audio: "https://yabla.vo.llnwd.net/media.yabla.com/audio/340410.mp3",
    visible: false


   }
   let toneColor = ''

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
  const text = "我的名字 你因为"
  
  const splittedTextArray  = text.split('')
 
  const updatedCharsArray = splittedTextArray.map(letter => {
    return characters.find(char => char.character === letter)
  })

  const seePianYin = (char: charactersArray) => {
    // setPianYin(char.pianyin)
    const currentChar = characters.find(c => c.character === char.character)
    console.log(currentChar)
    currentChar && 
    setDesc(prev => ({
      ...prev,
      pianyin: currentChar.pianyin,
      rus:currentChar.rus,
      eng:currentChar.eng,
      show: !currentChar.visible


    }))
    // return char.pianyin
  }


  console.log(pianyin)



  return (
    <>
   =
      <main className="w-[100vw] h-[calc(100vh-3rem)]  bg-[#111a30] ">
        hello
        <div className="w-[90vw] m-auto flex text-xl gap-0.5 py-2 pl-2 font-mono  leading-6 text-indigo-600 whitespace-pre dark:text-indigo-300 border-t border-slate-100 dark:border-slate-400/10">

        {updatedCharsArray.map((c,i ) =>  (
           c ? 
           <div key={i} onClick={() => seePianYin(c)} className={`${switchColor(c)}`}>{c.character}
          </div> :
           <div key={i} onClick={() => seePianYin(notExist)} className={`${switchColor(notExist)}`}>{notExist.character}</div>
        )
  
       )
        }

         {desc.show && <div><div>{desc.pianyin} </div></div>}
  
        
        </div>
      </main>
      <div>
        {Allposts?.map((post:any, i: any) => <div key={i} > <Link href={post.id}>{post.title}</Link> </div>)}
      </div>
      <Link href='/createpost'>create text</Link>
      {charts.data ? <div className="text-[#AF8C9D]"> {charts.data.pleaseSub} k</div> : 'Loading'}
    </>
  );
};

export default Home;
