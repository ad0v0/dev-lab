import { useEffect, useState } from 'react';

type SceneMode = 'base' | 'detector' | 'mission';
type ScenePhase = 'boot' | 'recovering' | 'live';
type TriggerMode = Exclude<SceneMode, 'base'>;

const missionRows = [
  ['Route', 'Tunnel A-17'],
  ['Seal', 'HOLD / PARTIAL'],
  ['Channel', 'REMOTE // DEGRADED'],
] as const;

const modeStatusCopy: Record<SceneMode, string> = {
  base: 'MODE BASE // PASSIVE WATCH',
  detector: 'MODE DETECTOR // MOTION TRACE',
  mission: 'MODE MISSION // OBJECTIVE BUS',
};

const phaseStatusCopy: Record<ScenePhase, string> = {
  boot: 'BOOTING',
  recovering: 'RECOVERING',
  live: 'LIVE',
};

function toggleMode(currentMode: SceneMode, nextMode: TriggerMode): SceneMode {
  return currentMode === nextMode ? 'base' : nextMode;
}

export function QuarantineTunnelVisor() {
  const [mode, setMode] = useState<SceneMode>('base');
  const [phase, setPhase] = useState<ScenePhase>('boot');
  const modeStatus = modeStatusCopy[mode];
  const phaseStatus = phaseStatusCopy[phase];
  const isLive = phase === 'live';

  function handleModeToggle(nextMode: TriggerMode) {
    setMode((currentMode) => toggleMode(currentMode, nextMode));
  }

  useEffect(() => {
    const recoveringTimer = window.setTimeout(() => setPhase('recovering'), 750);
    const liveTimer = window.setTimeout(() => setPhase('live'), 2300);

    return () => {
      window.clearTimeout(recoveringTimer);
      window.clearTimeout(liveTimer);
    };
  }, []);

  useEffect(() => {
    function handleKeyDown(event: KeyboardEvent) {
      if (!isLive || event.altKey || event.ctrlKey || event.metaKey) {
        return;
      }

      if (event.key === 'ArrowLeft' || event.key.toLowerCase() === 'a') {
        event.preventDefault();
        handleModeToggle('detector');
      }

      if (event.key === 'ArrowRight' || event.key.toLowerCase() === 'd') {
        event.preventDefault();
        handleModeToggle('mission');
      }
    }

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isLive]);

  return (
    <section
      className="visor-scene"
      aria-label="Quarantine Tunnel Visor scene"
      data-phase={phase}
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
            <span className="optics-frame__vignette" />
            <span className="optics-frame__veil" />
            <span className="optics-frame__grime optics-frame__grime--left" />
            <span className="optics-frame__grime optics-frame__grime--right" />
            <span className="optics-frame__ghost" />
            <span className="optics-frame__scan" />
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
            <span>QTV / POV / {phaseStatus}</span>
            <span>OPTICS DEGRADED</span>
            <span className="ambient-strip__mode">{modeStatus}</span>
          </div>
          <div className="ambient-strip ambient-strip--bottom">
            <span>REMOTE VISOR</span>
            <span>
              {phase === 'boot'
                ? 'FEED UNAVAILABLE'
                : phase === 'recovering'
                  ? 'SIGNAL STABILIZING'
                  : mode === 'base'
                    ? 'LOW LATENCY HOLD'
                    : 'TOOL CHANNEL ACTIVE'}
            </span>
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
              <span className="mode-panel__state">MOTION TRACE // DEGRADED TRACK</span>
            </div>
            <div className="detector-panel">
              <div className="detector-panel__meta" aria-hidden="true">
                <span>Tracker Bus / A17</span>
                <span>CONF 61%</span>
              </div>

              <div className="detector-screen" aria-hidden="true">
                <span className="detector-screen__frame detector-screen__frame--outer" />
                <span className="detector-screen__frame detector-screen__frame--inner" />
                <span className="detector-screen__grid detector-screen__grid--x" />
                <span className="detector-screen__grid detector-screen__grid--y" />
                <span className="detector-screen__ring detector-screen__ring--a" />
                <span className="detector-screen__ring detector-screen__ring--b" />
                <span className="detector-screen__ring detector-screen__ring--c" />
                <span className="detector-screen__noise" />
                <span className="detector-screen__sweep" />
                <span className="detector-screen__beam" />
                <span className="detector-screen__blip detector-screen__blip--primary" />
                <span className="detector-screen__blip detector-screen__blip--secondary" />
                <span className="detector-screen__guide detector-screen__guide--left" />
                <span className="detector-screen__guide detector-screen__guide--right" />
                <span className="detector-screen__trace detector-screen__trace--a" />
                <span className="detector-screen__trace detector-screen__trace--b" />
              </div>

              <div className="detector-panel__readout">
                <div className="detector-readout">
                  <span>Range Gate</span>
                  <strong>24M / SWEEP</strong>
                </div>
                <div className="detector-readout detector-readout--watch">
                  <span>Trace Echo</span>
                  <strong>INTERMITTENT</strong>
                </div>
              </div>
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
              aria-label="Toggle motion detector overlay"
              disabled={!isLive}
              onClick={() => handleModeToggle('detector')}
            >
              <span className="scene-trigger__eyebrow">Left Trigger</span>
              <span className="scene-trigger__label">Motion Detector</span>
              <span className="scene-trigger__state">
                {mode === 'detector' ? 'Engaged' : 'Standby'}
              </span>
            </button>

            <button
              type="button"
              className="scene-trigger scene-trigger--mission"
              aria-pressed={mode === 'mission'}
              aria-label="Toggle mission console overlay"
              disabled={!isLive}
              onClick={() => handleModeToggle('mission')}
            >
              <span className="scene-trigger__eyebrow">Right Trigger</span>
              <span className="scene-trigger__label">Mission Console</span>
              <span className="scene-trigger__state">
                {mode === 'mission' ? 'Engaged' : 'Standby'}
              </span>
            </button>
          </div>
        </div>
      </div>
    </section>
  );
}
