import ServerSidebar from "../components/ServerSidebar/ServerSidebar";
import ChannelList from "../components/ChannelList/ChannelList";
import Chat from "../components/Chat/Chat";
import UserBar from "../components/UserBar/UserBar";

export default function MainLayout() {
  return (
    <div className="flex h-screen text-gray-200 bg-[#1e1f22]">
      <ServerSidebar />
      <ChannelList />

      <div className="flex flex-col flex-1">
        <Chat />
        <UserBar />
      </div>
    </div>
  );
}
