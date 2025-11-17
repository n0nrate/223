export default function UserBar() {
  return (
    <div className="h-14 bg-[#2b2d31] border-t border-[#1a1b1e] flex items-center px-4 justify-between">
      <div className="flex items-center gap-2">
        <div className="w-9 h-9 bg-[#4e5058] rounded-full"></div>
        <div>
          <div className="font-semibold">Миша</div>
          <div className="text-xs text-gray-400">online</div>
        </div>
      </div>

      <div className="flex gap-3 text-gray-300">
        <button>🎙️</button>
        <button>🎧</button>
        <button>⚙️</button>
      </div>
    </div>
  );
}
