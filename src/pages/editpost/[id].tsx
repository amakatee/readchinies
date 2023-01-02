import Link from "next/link";
import { useRouter } from "next/router";
import { trpc } from "../../utils/trpc";
import next, { type NextPage } from "next";
import { useEffect, useState } from "react";

interface FormData {
    title: string;
    text :string;
    id: string
}
const EditPage: NextPage = () => {
    const utils = trpc.useContext()
    const [data, setData] = useState<FormData>({
        title: '',
        text: '',
        id: ''
    })

    const router = useRouter()
    const postId = router.query.id as string

    const {data: postDetail , isLoading} = trpc.posts.detailPost.useQuery({
        id: postId
    })

    useEffect(() => {
    
        setData({
            title : postDetail?.title as string,
            text: postDetail?.text as string,
            id: postDetail?.id as string
        })

    }, [])

    const updatePost  = trpc.posts.updatePost.useMutation({
        onMutate: () => {
            utils.posts.allPosts.cancel()
            const optimisticUpdate = utils.posts.allPosts.getData()

            // if(optimisticUpdate) {
            //     utils.posts.allPosts.setData(optimisticUpdate)
            // }
        },
        onSettled: () => {
            utils.posts.allPosts.invalidate()
            utils.posts.detailPost.invalidate()

        }

    })
    console.log(data)

    return(
        <div>
            <h1>hi</h1>
            <Link href='/'>Back</Link>

            <form onSubmit={(e) => {
                e.preventDefault()
                updatePost.mutate({
                    title: data?.title,
                    text: data?.text,
                    id: data?.id
                })


            }}>
                <input
                value={data?.title}
                placeholder =  'title'
                onChange={e => setData({...data, title: e.target.value})}
                 />
                 <input
                value={data?.text}
                placeholder =  'title'
                onChange={e => setData({...data, text: e.target.value})}
                 />
                 <button type="submit">Submit</button>
            </form>
        </div>
    )
} 

export default EditPage