import { router } from "../trpc";
import { authRouter } from "./auth";
import { exampleRouter } from "./example";
import { postRouter } from "./post";
import { userRouter } from "./user";

export const appRouter = router({
  example: exampleRouter,
  auth: authRouter,
  post: postRouter,
  user: userRouter,
});

// export type definition of API
export type AppRouter = typeof appRouter;
