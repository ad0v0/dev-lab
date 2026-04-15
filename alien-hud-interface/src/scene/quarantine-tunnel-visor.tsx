import { useEffect, useRef, useState } from 'react';

type SceneMode = 'base' | 'detector' | 'mission';
type ScenePhase = 'boot' | 'recovering' | 'live';
type TriggerMode = Exclude<SceneMode, 'base'>;
type GlitchLevel = 'none' | 'light' | 'hard';

const missionStatusRows = [
  ['Sector', 'OBS / A17 / E-LOCK'],
  ['Route Bus', 'SPINE / LOCK-2 / EAST'],
  ['Task', 'HOLD THRESHOLD / NO ADVANCE'],
] as const;

const missionSystemRows = [
  ['Crew Link', 'UNSYNC / 1 OF 4'],
  ['Seal Bus', 'INNER GATE / PARTIAL'],
  ['Bio-Risk', 'AMBER / SPORE TRACE'],
  ['Archive', 'FRAG / CRC LOSS'],
] as const;

const missionArchiveFragments = [
  '00:13:27 // chan-2 break... visual co[tact] lost',
  '00:14:02 // purge req denied // manual auth miss_ing',
] as const;

const modeStatusCopy: Record<SceneMode, string> = {
  base: 'BASE BUS / PASSIVE WATCH',
  detector: 'DETECT BUS / MOTION TRACE',
  mission: 'MISSION BUS / ARCHIVE FEED',
};

const phaseStatusCopy: Record<ScenePhase, string> = {
  boot: 'BOOT',
  recovering: 'RECOVER',
  live: 'LIVE',
};

function toggleMode(currentMode: SceneMode, nextMode: TriggerMode): SceneMode {
  return currentMode === nextMode ? 'base' : nextMode;
}

export function QuarantineTunnelVisor() {
  const [mode, setMode] = useState<SceneMode>('base');
  const [phase, setPhase] = useState<ScenePhase>('boot');
  const [glitchLevel, setGlitchLevel] = useState<GlitchLevel>('none');
  const modeStatus = modeStatusCopy[mode];
  const phaseStatus = phaseStatusCopy[phase];
  const isLive = phase === 'live';
  const glitchTimeoutRef = useRef<number | null>(null);
  const idleGlitchTimeoutRef = useRef<number | null>(null);
  const previousModeRef = useRef<SceneMode>('base');

  function clearGlitchTimers() {
    if (glitchTimeoutRef.current !== null) {
      window.clearTimeout(glitchTimeoutRef.current);
      glitchTimeoutRef.current = null;
    }

    if (idleGlitchTimeoutRef.current !== null) {
      window.clearTimeout(idleGlitchTimeoutRef.current);
      idleGlitchTimeoutRef.current = null;
    }
  }

  function triggerGlitch(level: Exclude<GlitchLevel, 'none'>, durationMs: number) {
    if (glitchTimeoutRef.current !== null) {
      window.clearTimeout(glitchTimeoutRef.current);
    }

    setGlitchLevel(level);
    glitchTimeoutRef.current = window.setTimeout(() => {
      setGlitchLevel('none');
      glitchTimeoutRef.current = null;
    }, durationMs);
  }

  function handleModeToggle(nextMode: TriggerMode) {
    setMode((currentMode) => toggleMode(currentMode, nextMode));
  }

  useEffect(() => {
    const recoveringTimer = window.setTimeout(() => setPhase('recovering'), 750);
    const liveTimer = window.setTimeout(() => setPhase('live'), 2300);

    return () => {
      clearGlitchTimers();
      window.clearTimeout(recoveringTimer);
      window.clearTimeout(liveTimer);
    };
  }, []);

  useEffect(() => {
    if (phase === 'boot') {
      triggerGlitch('hard', 220);
      return;
    }

    if (phase === 'recovering') {
      const timer = window.setTimeout(() => triggerGlitch('hard', 260), 140);
      return () => window.clearTimeout(timer);
    }

    if (phase === 'live') {
      const scheduleIdleGlitch = () => {
        const delay = 7000 + Math.round(Math.random() * 6000);
        idleGlitchTimeoutRef.current = window.setTimeout(() => {
          triggerGlitch('light', 140);
          scheduleIdleGlitch();
        }, delay);
      };

      scheduleIdleGlitch();
      return () => {
        if (idleGlitchTimeoutRef.current !== null) {
          window.clearTimeout(idleGlitchTimeoutRef.current);
          idleGlitchTimeoutRef.current = null;
        }
      };
    }
  }, [phase]);

  useEffect(() => {
    if (!isLive) {
      previousModeRef.current = mode;
      return;
    }

    if (previousModeRef.current !== mode) {
      triggerGlitch('light', 150);
      previousModeRef.current = mode;
    }
  }, [isLive, mode]);

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
      data-glitch={glitchLevel}
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
            <span>QTV / VISOR / {phaseStatus}</span>
            <span>OPTICS / DEGRADED</span>
            <span className="ambient-strip__mode">{modeStatus}</span>
          </div>
          <div className="ambient-strip ambient-strip--bottom">
            <span>REMOTE LINK</span>
            <span>
              {phase === 'boot'
                ? 'FEED / NULL'
                : phase === 'recovering'
                  ? 'SYNC / UNSTABLE'
                  : mode === 'base'
                    ? 'IDLE BUS / HOLD'
                    : 'TOOL BUS / OPEN'}
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
              <p className="eyebrow">Motion Detector</p>
              <span className="mode-panel__state">TRACE BUS / DEGRADED TRACK</span>
            </div>
            <div className="detector-panel">
              <div className="detector-panel__meta" aria-hidden="true">
                <span>Tracker Bus / A17-E</span>
                <span>Conf / 61%</span>
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
                  <strong>24M / ACTIVE</strong>
                </div>
                <div className="detector-readout detector-readout--watch">
                  <span>Echo Return</span>
                  <strong>INTERMIT</strong>
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
              <p className="eyebrow">Mission Archive</p>
              <span className="mode-panel__state">OBJECTIVE BUS / ARCHIVE DEGRADED</span>
            </div>
            <div className="mission-console">
              <header className="mission-console__header">
                <div>
                  <p className="eyebrow">Recovered Op Fragment</p>
                  <h3>Quarantine Tunnel Sweep / Hold Bus</h3>
                </div>
                <span className="mission-console__chip">ARCHIVE / QMC-17A</span>
              </header>

              <div className="mission-console__group">
                {missionStatusRows.map(([label, value]) => (
                  <div key={label} className="mission-console__row">
                    <span>{label}</span>
                    <strong>{value}</strong>
                  </div>
                ))}
              </div>

              <section className="mission-console__objective">
                <span className="mission-console__label">Directive</span>
                <p>Maintain corridor isolation until relay confirm or remote chain restore.</p>
              </section>

              <div className="mission-console__group mission-console__group--dense">
                {missionSystemRows.map(([label, value]) => (
                  <div key={label} className="mission-console__row">
                    <span>{label}</span>
                    <strong>{value}</strong>
                  </div>
                ))}
              </div>

              <section className="mission-console__archive">
                <div className="mission-console__archive-head">
                  <span className="mission-console__label">Archive Fragments</span>
                  <span className="mission-console__archive-state">TIMECODE / INCOMPLETE</span>
                </div>

                <div className="mission-console__fragments">
                  {missionArchiveFragments.map((fragment) => (
                    <p key={fragment} className="mission-console__fragment">
                      {fragment}
                    </p>
                  ))}
                </div>
              </section>
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
              <span className="scene-trigger__label">Detector Bus</span>
              <span className="scene-trigger__state">
                {mode === 'detector' ? 'Latched' : 'Standby'}
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
              <span className="scene-trigger__label">Archive Bus</span>
              <span className="scene-trigger__state">
                {mode === 'mission' ? 'Latched' : 'Standby'}
              </span>
            </button>
          </div>
        </div>
      </div>
    </section>
  );
}
