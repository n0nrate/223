export default function Message({ user, text }) {
  return (
    <div className="flex gap-2 items-start">
      <div className="w-9 h-9 bg-[#4e5058] rounded-full"></div>
      <div>
        <div className="font-semibold">{user}</div>
        <div className="text-gray-300">{text}</div>
      </div>
    </div>
  );
}
