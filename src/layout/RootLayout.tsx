import { signOut, useSession } from "next-auth/react";
import Image from "next/image";
import { useRouter } from "next/router";
import type { HTMLAttributes, PropsWithChildren, ReactElement } from "react";
import { useState } from "react";
import {
  AiFillCompass,
  AiFillHeart,
  AiFillHome,
  AiFillMessage,
  AiFillPlusCircle,
  AiOutlineCompass,
  AiOutlineHeart,
  AiOutlineHome,
  AiOutlineMessage,
  AiOutlinePlusCircle,
  AiOutlineSearch,
} from "react-icons/ai";
import { CreatePostModal } from "../features/create/CreatePostModal";

const NavButton = ({
  FocusIcon,
  BlurIcon,
  focus,
  children,
  ...props
}: {
  FocusIcon: ({ className }: { className: string }) => ReactElement;
  BlurIcon: ({ className }: { className: string }) => ReactElement;
  focus: boolean;
} & HTMLAttributes<HTMLButtonElement>) => {
  const Icon = focus ? FocusIcon : BlurIcon;

  return (
    <button
      className={`flex w-full items-center gap-2 rounded-full py-2 px-4 text-lg hover:bg-black/5 ${
        focus && "font-semibold"
      }`}
      {...props}
    >
      <Icon className="text-3xl" /> {children}
    </button>
  );
};

export const RootLayout = ({ children }: PropsWithChildren) => {
  const { status: sessionStatus, data: session } = useSession();
  const router = useRouter();

  const [createModalOpen, setCreateModalOpen] = useState(false);

  return (
    <div>
      {sessionStatus === "authenticated" && session.user && (
        <div className="fixed flex h-screen w-[344px] flex-col justify-between border-r border-black/25 px-2 py-8">
          <div className="">
            <div className="mb-10 ml-4 text-2xl font-bold">Instagram</div>
            <div className="flex flex-col gap-4">
              <NavButton
                FocusIcon={AiFillHome}
                BlurIcon={AiOutlineHome}
                focus={router.route === "/"}
                onClick={
                  router.route === "/"
                    ? () => {
                        window.scrollTo({
                          top: 0,
                        });
                      }
                    : () => {
                        router.push("/");
                      }
                }
              >
                Home
              </NavButton>
              <NavButton
                FocusIcon={AiOutlineSearch}
                BlurIcon={AiOutlineSearch}
                focus={false}
              >
                Search
              </NavButton>
              <NavButton
                FocusIcon={AiFillCompass}
                BlurIcon={AiOutlineCompass}
                focus={false}
              >
                Explore
              </NavButton>
              <NavButton
                FocusIcon={AiFillMessage}
                BlurIcon={AiOutlineMessage}
                focus={false}
              >
                Messages
              </NavButton>
              <NavButton
                FocusIcon={AiFillHeart}
                BlurIcon={AiOutlineHeart}
                focus={false}
              >
                Notifications
              </NavButton>
              <NavButton
                FocusIcon={AiFillPlusCircle}
                BlurIcon={AiOutlinePlusCircle}
                focus={false}
                onClick={() => setCreateModalOpen(true)}
              >
                Create
              </NavButton>
              <CreatePostModal
                open={createModalOpen}
                onClose={() => setCreateModalOpen(false)}
              />

              <NavButton
                FocusIcon={() => (
                  <div className="relative aspect-square w-[30px]">
                    <Image
                      src="https://st3.depositphotos.com/1767687/16607/v/450/depositphotos_166074422-stock-illustration-default-avatar-profile-icon-grey.jpg"
                      alt="avatar"
                      fill
                      className="rounded-full"
                    />
                  </div>
                )}
                BlurIcon={() => (
                  <div className="relative aspect-square w-[30px]">
                    <Image
                      src="https://st3.depositphotos.com/1767687/16607/v/450/depositphotos_166074422-stock-illustration-default-avatar-profile-icon-grey.jpg"
                      alt="avatar"
                      fill
                      className="rounded-full"
                    />
                  </div>
                )}
                focus={
                  router.route === "/[username]" &&
                  router.query.username === "dereklance"
                }
                // TODO: match session with user model
                onClick={() => router.push(`/dereklance`)}
              >
                <div className="ml-[2px]">Profile</div>
              </NavButton>
            </div>
          </div>

          <button
            className="rounded-full py-2 text-lg hover:bg-black/10"
            onClick={() => signOut()}
          >
            Log Out
          </button>
        </div>
      )}

      <div className="ml-[344px] flex min-h-screen flex-col items-center bg-slate-50 py-12">
        {children}
      </div>
    </div>
  );
};
