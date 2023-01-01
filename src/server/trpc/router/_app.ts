import { router } from "../trpc";
import { chartRouter } from "./char";
import { postsRouter } from "./posts";

export const appRouter = router({
  char: chartRouter,
  posts: postsRouter, 
 
  
});

// export type definition of API
export type AppRouter = typeof appRouter;
