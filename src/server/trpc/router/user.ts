import { z } from "zod";
import { protectedProcedure, router } from "../trpc";

export const userRouter = router({
  get: protectedProcedure.input(z.string()).query(({ ctx, input }) => {
    return ctx.prisma.user.findUnique({
      where: { username: input },
      include: {
        posts: true,
      },
    });
  }),
});
