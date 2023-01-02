import Link from "next/link";
import { useRouter } from "next/router";
import { trpc } from "../utils/trpc";

export default function PostDetail() {
    const router = useRouter()
    const postId = router.query.id as string

    const {data: postData, isLoading} = trpc.posts.detailPost.useQuery({
        id: postId
    }) 
    console.log(postData?.text)
    const deleting = trpc.posts.deletePost.useMutation()
    return (
        <>
          <div> ho </div>
          <div>{postData?.title}</div>
          <div>{postData?.text}</div>
          <div className="flex gap-1 ">
              <div onClick={() => {
                  deleting.mutate({id:postId})
                  router.push('/')
              }}>d</div>
          <Link  href='/'>Delete </Link>
          <Link  href={`/editpost/${postData?.id}`}>Edit </Link>
      
          </div>
        </>
      
    )

}