import type { CSSProperties } from 'react';
import { useState } from 'react';
import {
  alertStates,
  consoleReadouts,
  consoleTimeline,
  consoleZones,
  hudButtons,
  hudIndicators,
  hudLabels,
  hudReadouts,
  labEffects,
  modeDefinitions,
  panelVariants,
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
        <SignalStage
          mode={mode}
          title={activeMode.title}
          tag={activeMode.tag}
          summary={activeMode.summary}
        />

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
      <section className="design-board">
        <section className="panel board-section">
          <p className="eyebrow">Panel Variants</p>
          <div className="board-grid board-grid--panels">
            {panelVariants.map((variant) => (
              <article
                key={variant.name}
                className={`panel-card panel-card--${variant.variant}`}
              >
                <span className="mini-label">{variant.label}</span>
                <h3>{variant.name}</h3>
                <p>{variant.description}</p>
              </article>
            ))}
          </div>
        </section>

        <section className="panel board-section">
          <p className="eyebrow">Labels</p>
          <div className="label-strip">
            {hudLabels.map((label) => (
              <span key={label} className="mini-label">
                {label}
              </span>
            ))}
          </div>
        </section>

        <section className="panel board-section">
          <p className="eyebrow">Buttons</p>
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
        </section>

        <section className="panel board-section">
          <p className="eyebrow">Indicators</p>
          <div className="indicator-strip">
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
        </section>

        <section className="panel board-section">
          <p className="eyebrow">Readouts</p>
          <div className="readout-grid">
            {hudReadouts.map((readout) => (
              <div key={readout.label} className="readout">
                <span>{readout.label}</span>
                <strong>{readout.value}</strong>
              </div>
            ))}
          </div>
        </section>

        <section className="panel board-section">
          <p className="eyebrow">Alert States</p>
          <div className="alert-grid">
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
