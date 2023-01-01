import { router , publicProcedure} from "../trpc"
import { z } from "zod"

export const chartRouter = router({
    chars: publicProcedure
    .input(z.object({text: z.string().min(1, {message: "must be at least 5 characters"})}))
    .query(({input})=>{
        return {
            pleaseSub : ` Please do ${input?.text}` 
        }
    })
})

