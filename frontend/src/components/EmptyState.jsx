export default function EmptyState({ icon, title, message, action }) {
  return (
    <div className="flex flex-col items-center justify-center text-center py-14 px-6 animate-fade-in">
      <div className="bg-primary-50 text-primary-500 rounded-full p-5 mb-4">{icon}</div>
      <h3 className="text-lg font-semibold text-gray-800 mb-1">{title}</h3>
      <p className="text-gray-500 max-w-sm mb-5">{message}</p>
      {action}
    </div>
  );
}
