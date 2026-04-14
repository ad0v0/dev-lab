import type { CSSProperties } from 'react';
import { useState } from 'react';
import {
  alertStates,
  consoleReadouts,
  consoleTimeline,
  consoleZones,
  displayCarriers,
  hardwareShells,
  hudButtons,
  hudControls,
  hudIndicators,
  hudLabels,
  hudReadouts,
  labEffects,
  modeDefinitions,
  panelVariants,
  surfaceTreatments,
  type LabEffect,
  type LabMode,
} from './content/lab-content';
import { ModeSwitch } from './modules/mode-switch';
import { StoryCard } from './primitives/story-card';
import { QuarantineConsole } from './scene/quarantine-console';
import { SignalStage } from './scene/signal-stage';
import { Reticle } from './svg/reticle';
import './styles/index.css';

export default function App() {
  const [mode, setMode] = useState<LabMode>('scene');
  const activeMode = modeDefinitions[mode];

  return (
    <div className={`lab-shell lab-shell--${mode}`}>
      <div className="lab-shell__noise" aria-hidden="true" />
      <Reticle />

      <header className="masthead">
        <div className="masthead__copy">
          <p className="eyebrow">Creative Frontend Lab // CSS + SVG Storytelling</p>
          <h1>Alien HUD Interface</h1>
          <p className="masthead__lede">{activeMode.intro}</p>
        </div>

        <ModeSwitch currentMode={mode} modes={modeDefinitions} onChange={setMode} />
      </header>

      <main className="composition">
        {mode === 'design-system' ? (
          <section className="utility-strip panel" aria-label="Recovered console header">
            <span className="mini-label">QMC / SYS / DS1</span>
            <span className="utility-strip__divider" aria-hidden="true" />
            <span className="utility-strip__text">{activeMode.title}</span>
            <span className="utility-strip__divider" aria-hidden="true" />
            <span className="utility-strip__text utility-strip__text--live">
              {activeMode.tag}
            </span>
          </section>
        ) : (
          <SignalStage
            mode={mode}
            title={activeMode.title}
            tag={activeMode.tag}
            summary={activeMode.summary}
          />
        )}

        {mode === 'lab' ? <LabModeBoard effects={labEffects} /> : null}
        {mode === 'design-system' ? (
          <DesignSystemBoard />
        ) : null}
        {mode === 'scene' ? (
          <SceneModeBoard />
        ) : null}
      </main>
    </div>
  );
}

function LabModeBoard({ effects }: { effects: LabEffect[] }) {
  return (
    <>
      <section className="module-band module-band--lab" aria-label="Visual experiments">
        {effects.map((effect) => (
          <article
            key={effect.name}
            className={`panel effect-panel effect-panel--${effect.treatment}`}
            style={{ '--effect-tone': effect.tone } as CSSProperties}
          >
            <p className="eyebrow">Effect Study</p>
            <h3>{effect.name}</h3>
            <p>{effect.description}</p>
            <div className="effect-panel__sample" aria-hidden="true">
              <span className="effect-panel__mark effect-panel__mark--primary" />
              <span className="effect-panel__mark effect-panel__mark--secondary" />
            </div>
          </article>
        ))}
      </section>

      <section className="layout-strip">
        <StoryCard
          kicker="Testbench"
          title="Isolation first"
          body="Each tile exists to tune one effect family before it gets mixed into a denser composition."
        />
        <StoryCard
          kicker="Discipline"
          title="Atmosphere with restraint"
          body="The lab mode should stay analytical. Strong effects are useful only when their failure modes stay visible."
        />
      </section>
    </>
  );
}

function DesignSystemBoard() {
  return (
    <>
      <section className="specimen-board panel" aria-label="HUD specimen board">
        <div className="specimen-board__grid" aria-hidden="true" />
        <div className="specimen-board__spine" aria-hidden="true" />
        <div className="specimen-board__ticks" aria-hidden="true">
          <span />
          <span />
          <span />
          <span />
        </div>

        <header className="specimen-board__header">
          <div>
            <p className="eyebrow">Recovered System Board</p>
            <h3>Quarantine Console Language Extract</h3>
          </div>
          <div className="specimen-board__meta">
            <span className="mini-label">Specimen QMC-DS1</span>
            <span className="signal-chip">Curated for corridor operations</span>
          </div>
        </header>

        <div className="specimen-board__columns">
          <aside className="specimen-board__rail">
            <section className="board-section board-section--ghost">
              <div className="board-title">
                <p className="eyebrow">Frame Materials</p>
                <h4>Outer shell specimens</h4>
              </div>
              <div className="treatment-stack">
                {surfaceTreatments.map((treatment) => (
                  <article
                    key={treatment.code}
                    className={`treatment-card treatment-card--${treatment.tone}`}
                  >
                    <span className="mini-label">{treatment.code}</span>
                    <h4>{treatment.name}</h4>
                    <p>{treatment.note}</p>
                  </article>
                ))}
              </div>
            </section>

            <section className="board-section board-section--ghost">
              <div className="board-title">
                <p className="eyebrow">Service Plates</p>
                <h4>Residual hardware labels</h4>
              </div>
              <div className="hardware-shell-stack">
                {hardwareShells.slice(1, 3).map((shell) => (
                  <article
                    key={shell.code}
                    className={`hardware-shell hardware-shell--${shell.kind}`}
                  >
                    <span className="mini-label">{shell.code}</span>
                    <h4>{shell.name}</h4>
                    <p>{shell.note}</p>
                  </article>
                ))}
              </div>
            </section>
          </aside>

          <div className="specimen-board__core">
            <section className="board-section board-section--monitorbank">
              <div className="board-title">
                <p className="eyebrow">Display Carriers</p>
                <h4>Recovered phosphor surfaces</h4>
              </div>
              <div className="monitor-bank">
                {displayCarriers.map((carrier) => (
                  <article
                    key={carrier.code}
                    className={`monitor-carrier monitor-carrier--${carrier.mode}`}
                  >
                    <div className="monitor-carrier__header">
                      <span className="mini-label">{carrier.code}</span>
                      <span className="monitor-carrier__name">{carrier.name}</span>
                    </div>
                    <div className="monitor-window">
                      <div className="monitor-window__scan" aria-hidden="true" />
                      <div className="monitor-window__mask" aria-hidden="true" />
                      <div className="monitor-window__content">
                        <div className="terminal-slab">
                          <span className="terminal-slab__label">
                            {carrier.lines[0]}
                          </span>
                          <span className="terminal-slab__cursor" aria-hidden="true" />
                        </div>
                        <div className="monitor-grid">
                          <div className="monitor-grid__main">
                            <span className="monitor-grid__line monitor-grid__line--strong" />
                            <span className="monitor-grid__line" />
                            <span className="monitor-grid__line monitor-grid__line--short" />
                          </div>
                          <div className="monitor-grid__side">
                            <span className="monitor-grid__pulse" />
                            <span className="monitor-grid__line monitor-grid__line--short" />
                          </div>
                        </div>
                        <div className="monitor-carrier__rows">
                          {carrier.lines.slice(1).map((line) => (
                            <span key={line} className="monitor-carrier__row">
                              {line}
                            </span>
                          ))}
                        </div>
                      </div>
                    </div>
                  </article>
                ))}
              </div>
            </section>

            <section className="board-section board-section--main">
              <div className="board-title">
                <p className="eyebrow">Hardware Shells</p>
                <h4>Wells / latches / cassettes / frames</h4>
              </div>
              <div className="hardware-shell-grid">
                {hardwareShells.map((shell) => (
                  <article
                    key={shell.code}
                    className={`hardware-shell hardware-shell--${shell.kind}`}
                  >
                    <span className="mini-label">{shell.code}</span>
                    <h4>{shell.name}</h4>
                    <p>{shell.note}</p>
                  </article>
                ))}
              </div>
            </section>

            <section className="board-section board-section--main">
              <div className="board-title">
                <p className="eyebrow">Control Surfaces</p>
                <h4>Gate logic / manual intervention</h4>
              </div>

              <div className="control-surface">
                <div className="control-surface__frame" aria-hidden="true" />
                <div className="button-strip">
                  {hudButtons.map((button) => (
                    <button
                      key={button.label}
                      type="button"
                      className={`hud-button hud-button--${button.variant}`}
                    >
                      {button.label}
                    </button>
                  ))}
                </div>

                <div className="control-strip">
                  {hudControls.map((control) => (
                    <article
                      key={control.label}
                      className={`control-chip control-chip--${control.state}`}
                    >
                      <div className="control-chip__switch" aria-hidden="true">
                        <span className="control-chip__thumb" />
                      </div>
                      <div>
                        <span className="control-chip__state">{control.state}</span>
                        <p className="control-chip__label">{control.label}</p>
                        <p className="control-chip__hint">{control.hint}</p>
                      </div>
                    </article>
                  ))}
                </div>
              </div>
            </section>
          </div>

          <aside className="specimen-board__stack">
            <section className="board-section board-section--tight">
              <div className="board-title">
                <p className="eyebrow">Status Logic</p>
                <h4>Integrity bus / telemetry rows</h4>
              </div>
              <div className="status-ribbon">
                <span className="status-ribbon__label">Corridor integrity bus</span>
                <span className="status-ribbon__value">NOMINAL / WATCH / BREACH</span>
              </div>
              <div className="indicator-strip indicator-strip--stacked">
                {hudIndicators.map((indicator) => (
                  <span
                    key={indicator.label}
                    className={`indicator indicator--${indicator.state}`}
                  >
                    <span className="indicator__dot" aria-hidden="true" />
                    {indicator.label}
                  </span>
                ))}
              </div>

              <div className="readout-grid">
                {hudReadouts.map((readout) => (
                  <div key={readout.label} className="readout">
                    <span>{readout.label}</span>
                    <strong>{readout.value}</strong>
                  </div>
                ))}
              </div>
            </section>

            <section className="board-section board-section--alert">
              <div className="board-title">
                <p className="eyebrow">Warning Logic</p>
                <h4>Escalation strip</h4>
              </div>
              <div className="alert-headerline">
                <span>amber channel reserved for localized containment faults</span>
              </div>
              <div className="alert-grid alert-grid--stacked">
                {alertStates.map((alert) => (
                  <article
                    key={alert.label}
                    className={`alert-card alert-card--${alert.level}`}
                  >
                    <h3>{alert.label}</h3>
                    <p>{alert.description}</p>
                  </article>
                ))}
              </div>
            </section>

            <section className="board-section board-section--ghost">
              <div className="board-title">
                <p className="eyebrow">Utility Fragments</p>
                <h4>Tags / strips / operator residue</h4>
              </div>
              <div className="label-strip label-strip--dense">
                {hudLabels.map((label) => (
                  <span key={label} className="mini-label">
                    {label}
                  </span>
                ))}
              </div>
            </section>
          </aside>
        </div>

        <footer className="specimen-board__footer">
          <p>
            This board collects the surfaces, marks, controls, and warning logic
            most likely to recur across the future Quarantine Mission Console.
          </p>
        </footer>
      </section>
    </>
  );
}

function SceneModeBoard() {
  return (
    <>
      <QuarantineConsole
        zones={consoleZones}
        readouts={consoleReadouts}
        timeline={consoleTimeline}
      />

      <section className="layout-strip">
        <StoryCard
          kicker="Narrative"
          title="Recent human presence"
          body="The copy and logs imply an active operational space rather than a decorative sci-fi screen."
        />
        <StoryCard
          kicker="Composition"
          title="Controlled asymmetry"
          body="A large radar field carries the frame while the right stack compresses urgency into readouts, alerts, and incident history."
        />
      </section>
    </>
  );
}
