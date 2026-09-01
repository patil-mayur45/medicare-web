export default function CardSkeleton() {
  return (
    <div className="card p-5 animate-pulse">
      <div className="h-10 w-10 rounded-full bg-gray-200 mb-4" />
      <div className="h-4 bg-gray-200 rounded w-3/4 mb-2" />
      <div className="h-3 bg-gray-200 rounded w-full mb-1" />
      <div className="h-3 bg-gray-200 rounded w-5/6" />
    </div>
  );
}
