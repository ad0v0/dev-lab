import type { LabMode, ModeDefinitionMap } from '../content/lab-content';
import { classNames } from '../utils/class-names';

type ModeSwitchProps = {
  currentMode: LabMode;
  modes: ModeDefinitionMap;
  onChange: (mode: LabMode) => void;
};

export function ModeSwitch({ currentMode, modes, onChange }: ModeSwitchProps) {
  return (
    <div className="mode-switch" aria-label="Presentation mode">
      {(Object.keys(modes) as LabMode[]).map((mode) => (
        <button
          key={mode}
          type="button"
          className={classNames(
            'mode-switch__button',
            currentMode === mode && 'mode-switch__button--active'
          )}
          onClick={() => onChange(mode)}
          aria-pressed={currentMode === mode}
        >
          {modes[mode].label}
        </button>
      ))}
    </div>
  );
}
