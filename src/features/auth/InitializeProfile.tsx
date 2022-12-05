import { useSession } from "next-auth/react";
import { trpc } from "../../utils/trpc";

export const InitializeProfile = () => {
  const { data: session } = useSession();
  const { mutateAsync: createProfile } = trpc.user.create.useMutation();
  const queryClient = trpc.useContext();

  return (
    <button
      onClick={async () => {
        if (!session?.user)
          throw new Error("must be authenticated to create a profile");

        await createProfile({
          userId: session.user.id,
          username: "dereklance",
        });

        queryClient.user.me.invalidate();
      }}
    >
      Initialize Profile
    </button>
  );
};
