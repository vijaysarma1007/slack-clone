import { useCurrentMember } from "@/features/members/api/use-current-memeber";
import { useGetWorkspace } from "@/features/workspaces/api/use-get-workspace";
import { useWorkspaceId } from "@/hooks/use-workspace-id";
import {
  AlertTriangle,
  HashIcon,
  Loader,
  MessageSquareText,
  SendHorizonal,
} from "lucide-react";
import { WorkspaceHeader } from "./workspace-header";
import { SidebarItem } from "./sidebar-item";
import { useCreateChannelModal } from "@/features/channels/store/use-create-channel-model";
import { useGetChannels } from "@/features/channels/api/use-get-channels";
import { WorkspaceSection } from "./workspace-section";
import { useGetMembers } from "@/features/members/api/use-get-members";
import { UserItem } from "./user-item";
import { useChannelId } from "@/hooks/use-channel-id";
import { useMemberId } from "@/hooks/use-member-id";

export const WorkspaceSidebar = () => {
  const workspaceId = useWorkspaceId();
  const memberId = useMemberId();
  const channelId = useChannelId();

  const [_open, setOpen] = useCreateChannelModal();

  const { data: memeber, isLoading: memberLoading } =
    useCurrentMember({ workspaceId });
  const { data: workspace, isLoading: workspaceLoading } =
    useGetWorkspace({ id: workspaceId });
  const { data: channels, isLoading: channelsLoading } =
    useGetChannels({ workspaceId });
  const { data: members, isLoading: membersLoading } = useGetMembers({
    workspaceId,
  });

  if (workspaceLoading || memberLoading) {
    return (
      <div className="flex flex-col bg-[#5E2C5F] h-full items-center justify-center">
        <Loader className="size-5 animate-spin text-white" />
      </div>
    );
  }

  if (!workspace || !memeber) {
    return (
      <div className="flex flex-col gap-y-2 bg-[#5E2C5F] h-full items-center justify-center">
        <AlertTriangle className="size-5  text-white" />
        <p className="text-white text-sm">Workspace not found</p>
      </div>
    );
  }

  return (
    <div className="flex flex-col bg-[#5E2C5F] h-full ">
      <WorkspaceHeader
        workspace={workspace}
        isAdmin={memeber.role === "admin"}
      />
      <div className="flex flex-col px-2 mt-3">
        <SidebarItem
          label="Threads"
          icon={MessageSquareText}
          id="threads"
          variant={"active"}
        />
        <SidebarItem
          label="Drafts & Sent"
          icon={SendHorizonal}
          id="draft"
        />
      </div>
      <WorkspaceSection
        label="Channels"
        hint="New channel"
        onNew={
          memeber.role === "admin" ? () => setOpen(true) : undefined
        }
      >
        {channels?.map((item) => {
          return (
            <SidebarItem
              key={item._id}
              icon={HashIcon}
              label={item.name}
              id={item._id}
              variant={channelId === item._id ? "active" : "default"}
            />
          );
        })}
      </WorkspaceSection>

      <WorkspaceSection
        label="Direct Messages"
        hint="New Direct Messages"
        onNew={() => {}}
      >
        {members?.map((item) => {
          console.log(members);
          return (
            <UserItem
              key={item._id}
              id={item._id}
              label={item.user.name}
              image={item.user.image}
              variant={item._id === memberId ? "active" : "default"}
            />
          );
        })}
      </WorkspaceSection>
    </div>
  );
};
