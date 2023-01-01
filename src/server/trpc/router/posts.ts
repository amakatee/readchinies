import { z } from "zod";
import { router , publicProcedure} from "../trpc"


export const postsRouter = router({
    newPost: publicProcedure
    .input(z.object({
        title: z
        .string()
        .min(1, {message: "must be at least 5 characters"}),
        text: z
        .string()
    }))
    .mutation(async({ctx, input}) => {
        try{ 
            return await ctx?.prisma?.post?.create({
                data: {
                    title: input.title,
                    text: input.text
                }
              
            })
        }catch(err){
            console.log(err)

        }

    }),
    detailPost:publicProcedure.input(z.object({
        id: z.string()
    })).query( async({ctx, input}) => {
        const { id } = input
        try {
            return await ctx?.prisma?.post?.findUnique({
                where: {
                    id
                },
            }) 
        } catch(err) {
            console.log(err)
        }
    })
    ,
    allPosts:publicProcedure.query(async({ctx}) =>{
        try{
             return await ctx?.prisma?.post?.findMany({
                 select: {
                     title: true,
                     id: true
                 },
                 orderBy: {
                     createdAt: 'desc'
                 }
             })
            
            // return await ctx?.prisma?.post?.findMany({
            //     select: {
            //         title: true,
            //         id: true
            //     },
            //     // orderBy:{
            //     //     createdAt: "desc",
            //     // }
            // })

        } catch(err){
            console.log(err)
        }
        
        
    }),

  


          

})