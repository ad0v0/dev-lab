import type { ConsoleReadout, ConsoleTimeline, ConsoleZone } from '../content/lab-content';

type QuarantineConsoleProps = {
  zones: ConsoleZone[];
  readouts: ConsoleReadout[];
  timeline: readonly ConsoleTimeline[];
};

export function QuarantineConsole({
  zones,
  readouts,
  timeline,
}: QuarantineConsoleProps) {
  return (
    <section className="console-scene" aria-label="Quarantine Mission Console">
      <div className="console-scene__main panel">
        <div className="console-scene__grid" aria-hidden="true" />
        <div className="console-header">
          <div>
            <p className="eyebrow">Scene Build</p>
            <h3>Quarantine Mission Console</h3>
          </div>
          <span className="signal-chip">Observation feed unstable</span>
        </div>

        <div className="console-radar">
          <div className="console-radar__ring console-radar__ring--outer" />
          <div className="console-radar__ring console-radar__ring--inner" />
          <div className="console-radar__sweep" />
          <div className="console-radar__blip console-radar__blip--a" />
          <div className="console-radar__blip console-radar__blip--b" />
        </div>

        <div className="console-zones">
          {zones.map((zone) => (
            <article key={zone.title} className="console-zone">
              <p className="eyebrow">{zone.eyebrow}</p>
              <h4>{zone.title}</h4>
              <ul className="console-zone__list">
                {zone.lines.map((line) => (
                  <li key={line}>{line}</li>
                ))}
              </ul>
            </article>
          ))}
        </div>
      </div>

      <aside className="console-scene__side">
        <section className="panel console-stack">
          <p className="eyebrow">Readouts</p>
          <div className="readout-board">
            {readouts.map((item) => (
              <div key={item.label} className="readout-board__item">
                <span>{item.label}</span>
                <strong>{item.value}</strong>
              </div>
            ))}
          </div>
        </section>

        <section className="panel console-stack console-stack--alert">
          <p className="eyebrow">Containment Advisory</p>
          <h4>Maintain shutter lock until thermal bloom is resolved.</h4>
          <p>
            Exterior access remains disabled. Manual override requires second operator
            verification.
          </p>
        </section>

        <section className="panel console-stack">
          <p className="eyebrow">Event Log</p>
          <ul className="timeline">
            {timeline.map((entry) => (
              <li key={`${entry.stamp}-${entry.event}`} className="timeline__item">
                <span className="timeline__stamp">{entry.stamp}</span>
                <span>{entry.event}</span>
              </li>
            ))}
          </ul>
        </section>
      </aside>
    </section>
  );
}
