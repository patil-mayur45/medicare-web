export default function GridSkeleton({ Component, count = 6, className = "" }) {
  return (
    <div className={className}>
      {Array.from({ length: count }).map((_, i) => (
        <Component key={i} />
      ))}
    </div>
  );
}
