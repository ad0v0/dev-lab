type SignalStageProps = {
  title: string;
  tag: string;
  summary: string;
  mode: 'lab' | 'design-system' | 'scene';
};

export function SignalStage({ title, tag, summary, mode }: SignalStageProps) {
  return (
    <section className={`panel signal-stage signal-stage--${mode}`}>
      <div className="signal-stage__header">
        <div>
          <p className="eyebrow">Mode Focus</p>
          <h2>{title}</h2>
        </div>
        <span className="signal-chip">{tag}</span>
      </div>

      <p className="signal-stage__summary">{summary}</p>

      <div className="beam-grid" aria-hidden="true">
        <span className="beam beam--a" />
        <span className="beam beam--b" />
        <span className="beam beam--c" />
      </div>
    </section>
  );
}
