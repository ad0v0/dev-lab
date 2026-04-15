import type {
  CommandDatum,
  ConsoleReadout,
  ConsoleTimeline,
  ConsoleZone,
  InterventionAction,
  ResidueTrace,
  TelemetryThread,
} from '../content/lab-content';

type QuarantineConsoleProps = {
  scar: readonly CommandDatum[];
  zones: ConsoleZone[];
  readouts: ConsoleReadout[];
  timeline: readonly ConsoleTimeline[];
  telemetry: readonly TelemetryThread[];
  actions: readonly InterventionAction[];
  residue: readonly ResidueTrace[];
};

export function QuarantineConsole({
  scar,
  zones,
  readouts,
  timeline,
  telemetry,
  actions,
  residue,
}: QuarantineConsoleProps) {
  return (
    <section className="console-face" aria-label="Quarantine Mission Console">
      <div className="console-face__shell panel">
        <div className="console-face__grid" aria-hidden="true" />
        <div className="console-face__ribs" aria-hidden="true">
          <span />
          <span />
          <span />
        </div>

        <header className="command-scar" aria-label="Command scar">
          {scar.map((item) => (
            <div
              key={item.label}
              className={`command-scar__cell command-scar__cell--${item.state ?? 'neutral'}`}
            >
              <span className="command-scar__label">{item.label}</span>
              <strong className="command-scar__value">{item.value}</strong>
            </div>
          ))}
        </header>

        <div className="console-body">
          <section className="observation-deck housing" aria-label="Observation deck">
            <div className="housing__frame" aria-hidden="true" />
            <div className="housing__clamps" aria-hidden="true">
              <span />
              <span />
              <span />
              <span />
            </div>
            <div className="observation-deck__seam" aria-hidden="true" />

            <section className="containment-aperture" aria-labelledby="aperture-title">
              <div className="aperture-heading">
                <p className="eyebrow">Primary Containment Aperture</p>
                <h2 id="aperture-title">Corridor A-17 Remote Observation</h2>
              </div>

              <div className="aperture-window">
                <div className="aperture-window__scanlines" aria-hidden="true" />
                <div className="aperture-window__crawl" aria-hidden="true" />
                <div className="aperture-window__ghost" aria-hidden="true" />
                <div className="corridor-perspective" aria-hidden="true">
                  <span className="corridor-perspective__rail corridor-perspective__rail--left" />
                  <span className="corridor-perspective__rail corridor-perspective__rail--right" />
                  <span className="corridor-perspective__ceiling" />
                  <span className="corridor-perspective__floor" />
                  <span className="corridor-perspective__partition" />
                  <span className="corridor-perspective__grid corridor-perspective__grid--a" />
                  <span className="corridor-perspective__grid corridor-perspective__grid--b" />
                  <span className="corridor-perspective__hotzone" />
                </div>

                <div className="aperture-overlays">
                  {zones.map((zone) => (
                    <article key={zone.title} className="aperture-overlays__block">
                      <p className="eyebrow">{zone.eyebrow}</p>
                      <h3>{zone.title}</h3>
                      <ul>
                        {zone.lines.map((line) => (
                          <li key={line}>{line}</li>
                        ))}
                      </ul>
                    </article>
                  ))}
                </div>
              </div>
            </section>

            <aside className="diagnostic-tower" aria-label="Diagnostic tower">
              <section className="tower-module tower-module--scan">
                <div className="tower-module__head">
                  <p className="eyebrow">Contamination Sweep</p>
                  <span className="mini-label">TRACE MAP INCOMPLETE</span>
                </div>
                <div className="scan-field">
                  <div className="scan-field__sweep" aria-hidden="true" />
                  <div className="scan-field__band scan-field__band--a" aria-hidden="true" />
                  <div className="scan-field__band scan-field__band--b" aria-hidden="true" />
                  <div className="scan-field__residue" aria-hidden="true" />
                </div>
              </section>

              <section className="tower-module tower-module--route">
                <div className="tower-module__head">
                  <p className="eyebrow">Route Lockdown Schematic</p>
                  <span className="mini-label">SEALED // REMOTE ACTUATION</span>
                </div>
                <div className="route-schematic">
                  <span className="route-schematic__trunk" aria-hidden="true" />
                  <span className="route-schematic__branch route-schematic__branch--a" aria-hidden="true" />
                  <span className="route-schematic__branch route-schematic__branch--b" aria-hidden="true" />
                  <span className="route-schematic__branch route-schematic__branch--c" aria-hidden="true" />
                  <div className="route-schematic__labels">
                    <span>OBS FEED</span>
                    <span className="route-schematic__labels--sealed">INNER GATE SEALED</span>
                    <span className="route-schematic__labels--ghost">AUX BRANCH GREYED</span>
                  </div>
                </div>
              </section>

              <section className="tower-module tower-module--risk">
                <div className="tower-module__head">
                  <p className="eyebrow">Localized Risk Assessment</p>
                </div>
                <div className="risk-block">
                  {readouts.map((item) => (
                    <div key={item.label} className="risk-block__row">
                      <span>{item.label}</span>
                      <strong>{item.value}</strong>
                    </div>
                  ))}
                </div>
              </section>
            </aside>
          </section>

          <section className="control-bed housing" aria-label="Lower control bed">
            <div className="housing__frame" aria-hidden="true" />
            <div className="control-bed__seam control-bed__seam--a" aria-hidden="true" />
            <div className="control-bed__seam control-bed__seam--b" aria-hidden="true" />

            <section className="intervention-cradle" aria-label="Intervention cradle">
              <div className="intervention-cradle__header">
                <div>
                  <p className="eyebrow">Intervention Cradle</p>
                  <h3>Manual control remains subordinate to quarantine logic</h3>
                </div>
                <span className="warning-strip">DUAL AUTH REQUIRED // LOCAL KEY ABSENT</span>
              </div>

              <div className="intervention-controls">
                {actions.map((action) => (
                  <article
                    key={action.label}
                    className={`interlock interlock--${action.state}`}
                  >
                    <div className="interlock__lamp" aria-hidden="true" />
                    <div className="interlock__slot" aria-hidden="true">
                      <span className="interlock__guard" />
                    </div>
                    <div>
                      <p className="interlock__label">{action.label}</p>
                      <p className="interlock__detail">{action.detail}</p>
                    </div>
                  </article>
                ))}
              </div>
            </section>

            <aside className="telemetry-vertebra" aria-label="Telemetry vertebra">
              <p className="eyebrow">Telemetry Vertebra</p>
              <div className="telemetry-vertebra__rows">
                {telemetry.map((item) => (
                  <article
                    key={item.label}
                    className={`telemetry-thread telemetry-thread--${item.state}`}
                  >
                    <span className="telemetry-thread__label">{item.label}</span>
                    <strong className="telemetry-thread__value">{item.value}</strong>
                    <span className="telemetry-thread__note">{item.note}</span>
                  </article>
                ))}
              </div>
            </aside>

            <section className="residue-shelf" aria-label="Operator residue shelf">
              <p className="eyebrow">Residue Shelf</p>
              <div className="residue-shelf__body">
                <ul className="residue-list">
                  {residue.map((item) => (
                    <li key={`${item.stamp}-${item.text}`} className="residue-list__item">
                      <span className="residue-list__stamp">{item.stamp}</span>
                      <span>{item.text}</span>
                    </li>
                  ))}
                </ul>

                <div className="maintenance-line">
                  <span className="maintenance-line__label">MAINT</span>
                  <span className="maintenance-line__text">svc diag --relay --chan=a17 --hold</span>
                  <span className="maintenance-line__cursor" aria-hidden="true" />
                </div>

                <ul className="timeline">
                  {timeline.map((entry) => (
                    <li key={`${entry.stamp}-${entry.event}`} className="timeline__item">
                      <span className="timeline__stamp">{entry.stamp}</span>
                      <span>{entry.event}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </section>

            <section className="dead-field" aria-hidden="true">
              <div className="dead-field__plate dead-field__plate--a" />
              <div className="dead-field__plate dead-field__plate--b" />
              <div className="dead-field__stencil">OBS UNIT ADAPTED / NOT FOR PRIMARY COMMAND</div>
            </section>
          </section>
        </div>
      </div>
    </section>
  );
}
