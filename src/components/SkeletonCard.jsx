import { tokens } from "../utils/designTokens";

function SkeletonCardSingle() {
  return (
    <div
      className="sk-card"
      aria-hidden="true"
      style={{
        borderRadius: tokens.radius.lg,
        boxShadow: tokens.shadows.card,
      }}
    >
      <div className="sk-block sk-img" />
      <div className="sk-body">
        <div className="sk-block sk-line sk-line--lg" />
        <div className="sk-block sk-line" />
        <div className="sk-block sk-line sk-line--sm" />
        <div className="sk-foot">
          <div className="sk-block sk-line--price" />
          <div className="sk-block sk-btn" style={{ borderRadius: tokens.radius.md }} />
        </div>
      </div>
    </div>
  );
}

// Accepts optional `count` prop: <SkeletonCard count={8} /> renders a grid of N cards.
export function SkeletonCard({ count }) {
  if (count > 1) {
    return (
      <div className="prod-grid">
        {Array.from({ length: count }, (_, i) => <SkeletonCardSingle key={i} />)}
      </div>
    );
  }
  return <SkeletonCardSingle />;
}
