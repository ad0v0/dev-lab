type StoryCardProps = {
  kicker: string;
  title: string;
  body: string;
};

export function StoryCard({ kicker, title, body }: StoryCardProps) {
  return (
    <article className="panel story-card">
      <p className="eyebrow">{kicker}</p>
      <h3>{title}</h3>
      <p>{body}</p>
    </article>
  );
}
