export default function ChannelList() {
  const channels = [
    { id: 1, name: "general", type: "text" },
    { id: 2, name: "anime", type: "text" },
    { id: 3, name: "gaming-voice", type: "voice" },
  ];

  return (
    <div className="w-60 bg-[#2b2d31] pt-5 px-4 flex flex-col">
      <h2 className="text-gray-300 text-sm mb-3">CHANNELS</h2>

      {channels.map((c) => (
        <div
          key={c.id}
          className="flex items-center text-gray-400 hover:text-white hover:bg-[#393c41] p-2 rounded cursor-pointer transition-all"
        >
          {c.type === "text" ? "#" : "🔊"} {c.name}
        </div>
      ))}
    </div>
  );
}
