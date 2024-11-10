import {
  Avatar,
  AvatarFallback,
  AvatarImage,
} from "@/components/ui/avatar";
import { useCurrentUser } from "@/features/auth/api/use-current-user";

interface ConversationHeroProps {
  name?: string;
  image?: string;
}

export const ConversationHero = ({
  name = "Member",
  image,
}: ConversationHeroProps) => {
  const avatarFallback = name?.charAt(0).toUpperCase();
  const { data: currentUser } = useCurrentUser();

  const conversationHeroText =
    currentUser?.name === name
      ? "private to you"
      : ` just between you and
        ${name}`;

  return (
    <div className="mt-[88px] mx-5 mb-4">
      <div className="flex items-center gap-x-1 mb-2">
        <Avatar className="size-14 mr-2">
          <AvatarImage src={image} />
          <AvatarFallback>{avatarFallback}</AvatarFallback>
        </Avatar>
        <p className="text-2xl font-bold">{name}</p>
      </div>
      <p className="font-normal text-slate-600 mb-4">
        This conversation is {conversationHeroText}
      </p>
    </div>
  );
};
