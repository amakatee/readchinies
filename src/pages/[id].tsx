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
    return (
        <>
          <div> ho </div>
          <div>{postData?.title}</div>
          <div>{postData?.text}</div>
          <div className="flex gap-1 ">
          <Link  href='/'>Delete </Link>
          <Link  href='/'>Edit </Link>
      
          </div>
        </>
      
    )

}