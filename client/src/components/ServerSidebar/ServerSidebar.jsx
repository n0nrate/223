export default function ServerSidebar() {
  const servers = [
    { id: 1, name: "Home", icon: "🏠" },
    { id: 2, name: "Gaming", icon: "🎮" },
    { id: 3, name: "Anime", icon: "🌸" },
    { id: 4, name: "Code", icon: "💻" },
  ];

  return (
    <div className="w-[72px] bg-[#1a1b1e] flex flex-col items-center py-4 gap-3">
      {servers.map((s) => (
        <div
          key={s.id}
          className="w-12 h-12 bg-[#2a2d31] hover:bg-[#5865f2] rounded-2xl cursor-pointer flex items-center justify-center text-xl transition-all duration-300"
        >
          {s.icon}
        </div>
      ))}

      <div className="w-12 h-12 bg-[#2a2d31] hover:bg-[#3ba55d] text-[#3ba55d] hover:text-white rounded-2xl cursor-pointer text-3xl flex items-center justify-center transition-all">
        +
      </div>
    </div>
  );
}
