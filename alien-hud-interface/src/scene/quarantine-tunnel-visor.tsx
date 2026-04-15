import { useEffect, useState } from 'react';

type SceneMode = 'base' | 'detector' | 'mission';

const missionRows = [
  ['Route', 'Tunnel A-17'],
  ['Seal', 'HOLD / PARTIAL'],
  ['Channel', 'REMOTE // DEGRADED'],
] as const;

function toggleMode(currentMode: SceneMode, nextMode: Exclude<SceneMode, 'base'>): SceneMode {
  return currentMode === nextMode ? 'base' : nextMode;
}

export function QuarantineTunnelVisor() {
  const [mode, setMode] = useState<SceneMode>('base');

  useEffect(() => {
    function handleKeyDown(event: KeyboardEvent) {
      if (event.altKey || event.ctrlKey || event.metaKey) {
        return;
      }

      if (event.key === 'ArrowLeft') {
        event.preventDefault();
        setMode((currentMode) => toggleMode(currentMode, 'detector'));
      }

      if (event.key === 'ArrowRight') {
        event.preventDefault();
        setMode((currentMode) => toggleMode(currentMode, 'mission'));
      }
    }

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, []);

  return (
    <section
      className="visor-scene"
      aria-label="Quarantine Tunnel Visor scene"
      data-phase="live"
      data-mode={mode}
    >
      <div className="visor-scene__camera">
        <div className="visor-scene__layer visor-scene__world" aria-hidden="true">
          <div className="world-placeholder">
            <span className="world-placeholder__horizon" />
            <span className="world-placeholder__vanish" />
          </div>
        </div>

        <div className="visor-scene__layer visor-scene__optics" aria-hidden="true">
          <div className="optics-frame">
            <span className="optics-frame__ring optics-frame__ring--outer" />
            <span className="optics-frame__ring optics-frame__ring--inner" />
            <span className="optics-frame__glint optics-frame__glint--left" />
            <span className="optics-frame__glint optics-frame__glint--right" />
          </div>
        </div>

        <div className="visor-scene__layer visor-scene__hud-shell" aria-hidden="true">
          <div className="hud-shell-frame">
            <span className="hud-shell-frame__edge hud-shell-frame__edge--top" />
            <span className="hud-shell-frame__edge hud-shell-frame__edge--bottom" />
            <span className="hud-shell-frame__corner hud-shell-frame__corner--left" />
            <span className="hud-shell-frame__corner hud-shell-frame__corner--right" />
          </div>
        </div>

        <div className="visor-scene__layer visor-scene__ambient-ui" aria-hidden="true">
          <div className="ambient-strip ambient-strip--top">
            <span>QTV / POV / LIVE</span>
            <span>OPTICS DEGRADED</span>
            <span>MODE {mode.toUpperCase()}</span>
          </div>
          <div className="ambient-strip ambient-strip--bottom">
            <span>REMOTE VISOR</span>
            <span>LOW LATENCY HOLD</span>
          </div>
        </div>

        <div className="visor-scene__layer visor-scene__mode-layer">
          <section
            className="mode-panel mode-panel--detector"
            aria-label="Motion detector panel"
            aria-hidden={mode !== 'detector'}
          >
            <div className="mode-panel__header">
              <p className="eyebrow">Detector</p>
              <span className="mode-panel__state">MOTION TRACE // PLACEHOLDER</span>
            </div>
            <div className="detector-placeholder" aria-hidden="true">
              <span className="detector-placeholder__arc detector-placeholder__arc--a" />
              <span className="detector-placeholder__arc detector-placeholder__arc--b" />
              <span className="detector-placeholder__sweep" />
            </div>
          </section>

          <section
            className="mode-panel mode-panel--mission"
            aria-label="Mission console panel"
            aria-hidden={mode !== 'mission'}
          >
            <div className="mode-panel__header">
              <p className="eyebrow">Mission Console</p>
              <span className="mode-panel__state">OBJECTIVE BUS // PLACEHOLDER</span>
            </div>
            <div className="mission-list" role="presentation">
              {missionRows.map(([label, value]) => (
                <div key={label} className="mission-list__row">
                  <span>{label}</span>
                  <strong>{value}</strong>
                </div>
              ))}
            </div>
          </section>
        </div>

        <div className="visor-scene__layer visor-scene__controls">
          <div className="scene-triggers" aria-label="Scene mode controls">
            <button
              type="button"
              className="scene-trigger scene-trigger--detector"
              aria-pressed={mode === 'detector'}
              onClick={() => setMode((currentMode) => toggleMode(currentMode, 'detector'))}
            >
              <span className="scene-trigger__eyebrow">Left Trigger</span>
              <span className="scene-trigger__label">Motion Detector</span>
            </button>

            <button
              type="button"
              className="scene-trigger scene-trigger--mission"
              aria-pressed={mode === 'mission'}
              onClick={() => setMode((currentMode) => toggleMode(currentMode, 'mission'))}
            >
              <span className="scene-trigger__eyebrow">Right Trigger</span>
              <span className="scene-trigger__label">Mission Console</span>
            </button>
          </div>
        </div>
      </div>
    </section>
  );
}
