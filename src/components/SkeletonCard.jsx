export function SkeletonCard() {
  return (
    <div className="sk-card" aria-hidden="true">
      <div className="sk-block sk-img" />
      <div className="sk-body">
        <div className="sk-block sk-line sk-line--lg" />
        <div className="sk-block sk-line" />
        <div className="sk-block sk-line sk-line--sm" />
        <div className="sk-foot">
          <div className="sk-block sk-line--price" />
          <div className="sk-block sk-btn" />
        </div>
      </div>
    </div>
  );
}
