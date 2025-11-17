import Message from "./Message";
import MessageInput from "./MessageInput";

export default function Chat() {
  const messages = [
    { id: 1, user: "Миша", text: "Йоу, как дела?" },
    { id: 2, user: "Бот", text: "Всё огонь, братик 😎" },
  ];

  return (
    <div className="flex-1 flex flex-col bg-[#313338]">
      <div className="flex-1 overflow-y-auto p-4 space-y-2">
        {messages.map((m) => (
          <Message key={m.id} user={m.user} text={m.text} />
        ))}
      </div>

      <MessageInput />
    </div>
  );
}
