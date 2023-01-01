import { type NextPage } from 'next'
import React, {useState} from 'react'
import { trpc} from '../utils/trpc'

interface FormData  {
    title: string,
    text: string,
}

const NewPost : NextPage = () => {
    const utils = trpc.useContext()

    const addNewPost = trpc.posts.newPost.useMutation({
        onMutate: () => {
            console.log('mutated')

        }
    })
    
    const [data, setData] = useState<FormData>({
        title: '',
        text: ''
    })

    return (
        <form
        onSubmit={(event) => {
            event.preventDefault()
            console.log(data.title, data.text)
            addNewPost.mutate({
                title: data.title,
                text: data.text
            })
            setData({
                title:'',
                text:''
            })
        }}
        >
            <input 
            type='text'
            required
            value={data.title}
            placeholder='title'
            name='title'
            onChange={event => setData({...data, title:event.target.value})}

            />

            <input
            type='text'
            required
            value={data.text}
            placeholder='text'
            name='text'
            onChange={event => setData({...data, text:event.target.value})}
             />

             <button type='submit' >Submit</button>
        </form>
    )
}

export default NewPost