import { z } from "zod";
import { protectedProcedure, router } from "../trpc";

export const userRouter = router({
  me: protectedProcedure.query(({ ctx }) => {
    console.log(ctx.session.user.id);

    return ctx.prisma.userProfile.findUnique({
      where: { userId: ctx.session.user.id },
    });
  }),
  create: protectedProcedure
    .input(
      z.object({
        username: z.string(),
        userId: z.string(),
      })
    )
    .mutation(({ ctx, input }) => {
      return ctx.prisma.userProfile.create({
        data: {
          username: input.username,
          userId: input.userId,
        },
      });
    }),
});
