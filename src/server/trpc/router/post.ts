import { protectedProcedure, router } from "../trpc";

export const postRouter = router({
  feed: protectedProcedure.query(async ({ ctx }) => {
    const posts = await ctx.prisma.post.findMany({
      include: {
        author: {
          select: {
            username: true,
            avatarUrl: true,
          },
        },
        comments: {
          take: 2,
          include: {
            author: {
              select: {
                username: true,
              },
            },
          },
        },
        images: true,
      },
    });

    return posts.map((post) => ({
      ...post,
      author: {
        ...post.author,
        avatarUrl:
          post.author.avatarUrl ??
          "https://st3.depositphotos.com/1767687/16607/v/450/depositphotos_166074422-stock-illustration-default-avatar-profile-icon-grey.jpg",
      },
    }));
  }),
});
