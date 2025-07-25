import { useGlobalMessage } from "../context/GlobalMessageContext";

const GlobalMessage = () => {
  const { globalMessage } = useGlobalMessage();

  if (!globalMessage || !globalMessage.text) return null;

  return (
    <div
      className={`text-sm font-medium p-3 rounded text-center mb-4 transition-all ${
        globalMessage.type === "success"
          ? "text-green-700 bg-green-100"
          : "text-red-700 bg-red-100"
      }`}
    >
      {globalMessage.text}
    </div>
  );
};

export default GlobalMessage;
