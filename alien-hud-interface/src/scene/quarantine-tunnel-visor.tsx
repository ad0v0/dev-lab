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
            <div className="world-placeholder__light" />

            <div className="world-placeholder__far">
              <span className="world-placeholder__aperture" />
              <span className="world-placeholder__light-core" />
              <span className="world-placeholder__ceiling" />
            </div>

            <div className="world-placeholder__mid">
              <span className="world-placeholder__rib world-placeholder__rib--left world-placeholder__rib--a" />
              <span className="world-placeholder__rib world-placeholder__rib--right world-placeholder__rib--a" />
              <span className="world-placeholder__rib world-placeholder__rib--left world-placeholder__rib--b" />
              <span className="world-placeholder__rib world-placeholder__rib--right world-placeholder__rib--b" />
              <span className="world-placeholder__wall world-placeholder__wall--left" />
              <span className="world-placeholder__wall world-placeholder__wall--right" />
            </div>

            <div className="world-placeholder__near">
              <span className="world-placeholder__frame world-placeholder__frame--left" />
              <span className="world-placeholder__frame world-placeholder__frame--right" />
              <span className="world-placeholder__floor" />
              <span className="world-placeholder__floor-line world-placeholder__floor-line--left" />
              <span className="world-placeholder__floor-line world-placeholder__floor-line--right" />
              <span className="world-placeholder__threshold" />
            </div>

            <div className="world-placeholder__fog">
              <span className="world-placeholder__fog-band world-placeholder__fog-band--far" />
              <span className="world-placeholder__fog-band world-placeholder__fog-band--near" />
            </div>
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
            <span className="hud-shell-frame__edge hud-shell-frame__edge--top-left" />
            <span className="hud-shell-frame__edge hud-shell-frame__edge--top-center" />
            <span className="hud-shell-frame__edge hud-shell-frame__edge--top-right" />
            <span className="hud-shell-frame__edge hud-shell-frame__edge--bottom-left" />
            <span className="hud-shell-frame__edge hud-shell-frame__edge--bottom-center" />
            <span className="hud-shell-frame__edge hud-shell-frame__edge--bottom-right" />
            <span className="hud-shell-frame__corner hud-shell-frame__corner--top-left" />
            <span className="hud-shell-frame__corner hud-shell-frame__corner--top-right" />
            <span className="hud-shell-frame__corner hud-shell-frame__corner--bottom-left" />
            <span className="hud-shell-frame__corner hud-shell-frame__corner--bottom-right" />
            <span className="hud-shell-frame__delimiter hud-shell-frame__delimiter--left" />
            <span className="hud-shell-frame__delimiter hud-shell-frame__delimiter--right" />
            <span className="hud-shell-frame__rail hud-shell-frame__rail--left" />
            <span className="hud-shell-frame__rail hud-shell-frame__rail--right" />
            <span className="hud-shell-frame__rail-cap hud-shell-frame__rail-cap--left" />
            <span className="hud-shell-frame__rail-cap hud-shell-frame__rail-cap--right" />
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
