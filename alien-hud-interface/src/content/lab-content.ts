export type LabMode = 'lab' | 'design-system' | 'scene';

type ModeDefinition = {
  label: string;
  title: string;
  tag: string;
  intro: string;
  summary: string;
};

export type ModeDefinitionMap = Record<LabMode, ModeDefinition>;

export type LabEffect = {
  name: string;
  description: string;
  tone: string;
  treatment:
    | 'glow'
    | 'masks'
    | 'borders'
    | 'clip-path'
    | 'noise'
    | 'scanlines'
    | 'signal-pulse'
    | 'state-variations';
};

export type PanelVariant = {
  name: string;
  label: string;
  description: string;
  variant: 'standard' | 'warning' | 'ghost';
};

export type HudButton = {
  label: string;
  variant: 'primary' | 'secondary' | 'danger';
};

export type HudIndicator = {
  label: string;
  state: 'stable' | 'watch' | 'critical';
};

export type Readout = {
  label: string;
  value: string;
};

export type AlertState = {
  label: string;
  description: string;
  level: 'nominal' | 'warning' | 'critical';
};

export type ConsoleZone = {
  title: string;
  eyebrow: string;
  lines: string[];
};

export type ConsoleReadout = {
  label: string;
  value: string;
};

export type ConsoleTimeline = {
  stamp: string;
  event: string;
};

export const modeDefinitions: ModeDefinitionMap = {
  lab: {
    label: 'Lab',
    title: 'Visual Test Chamber',
    tag: 'Effects / motion / material',
    intro:
      'A testbench for glow, signal timing, edge treatment, and texture studies before they graduate into a composed scene.',
    summary:
      'Each panel here isolates one effect family so the visual language can be tuned deliberately instead of getting lost inside a larger layout.',
  },
  'design-system': {
    label: 'Design System',
    title: 'HUD Component Language',
    tag: 'Panels / controls / readouts',
    intro:
      'A curated board of reusable interface language: not enterprise UI, but a disciplined toolkit for building retro-futuristic compositions.',
    summary:
      'This mode focuses on the small recurring ingredients that make the world legible: panels, labels, buttons, indicators, readouts, and alert treatment.',
  },
  scene: {
    label: 'Scene',
    title: 'Quarantine Mission Console',
    tag: 'Composition / atmosphere / narrative',
    intro:
      'A staged interface frame that combines the lab’s fragments into a tense, cinematic console with enough structure to feel inhabited.',
    summary:
      'The goal is one strong frame: layered surfaces, credible telemetry, sparse warning signals, and enough narrative residue to imply recent human use.',
  },
};

export const labEffects: LabEffect[] = [
  {
    name: 'Glow',
    description: 'Warm edge bloom for active surfaces and illuminated seams.',
    tone: '#f2ae49',
    treatment: 'glow',
  },
  {
    name: 'Masks',
    description: 'Gradient cuts and falloff windows that reveal data selectively.',
    tone: '#a5d3bf',
    treatment: 'masks',
  },
  {
    name: 'Borders',
    description: 'Inset panel rails and segmented frames for mechanical tension.',
    tone: '#b9985f',
    treatment: 'borders',
  },
  {
    name: 'Clip-Path',
    description: 'Angular crops that stop the interface from feeling too clean.',
    tone: '#7bb9a7',
    treatment: 'clip-path',
  },
  {
    name: 'Noise',
    description: 'Subtle grit and atmospheric interference to age the surface.',
    tone: '#7b8b83',
    treatment: 'noise',
  },
  {
    name: 'Scanlines',
    description: 'Thin frequency lines to hint at old-display behavior.',
    tone: '#91a586',
    treatment: 'scanlines',
  },
  {
    name: 'Signal Pulse',
    description: 'Tight pulse accents for active beacon moments and warnings.',
    tone: '#8cd8b9',
    treatment: 'signal-pulse',
  },
  {
    name: 'State Variations',
    description: 'Stable, armed, and alert states with restrained visual drift.',
    tone: '#ff7f6a',
    treatment: 'state-variations',
  },
];

export const panelVariants: PanelVariant[] = [
  {
    name: 'Containment Panel',
    label: 'Standard',
    description: 'Default structural surface for grouped content.',
    variant: 'standard',
  },
  {
    name: 'Hazard Panel',
    label: 'Warning',
    description: 'Use when the surface needs extra urgency or escalation.',
    variant: 'warning',
  },
  {
    name: 'Ghost Panel',
    label: 'Ghost',
    description: 'Low-emphasis shell for supporting cues and annotations.',
    variant: 'ghost',
  },
];

export const hudLabels = [
  'Dock A-17',
  'Synthetic Relay',
  'Pressure Gate',
  'Observation Feed',
] as const;

export const hudButtons: HudButton[] = [
  { label: 'Arm Seal', variant: 'primary' },
  { label: 'Cycle Grid', variant: 'secondary' },
  { label: 'Purge Bay', variant: 'danger' },
];

export const hudIndicators: HudIndicator[] = [
  { label: 'Containment', state: 'stable' },
  { label: 'Motion Trace', state: 'watch' },
  { label: 'Hull Breach', state: 'critical' },
];

export const hudReadouts: Readout[] = [
  { label: 'Atmosphere', value: '0.21 BAR' },
  { label: 'Seal Temp', value: '-17 C' },
  { label: 'Signal Drift', value: '0.03 RAD' },
  { label: 'Grid Load', value: '71%' },
];

export const alertStates: AlertState[] = [
  {
    label: 'Nominal',
    description: 'System is quiet, responsive, and visually restrained.',
    level: 'nominal',
  },
  {
    label: 'Warning',
    description: 'Localized hazard detected. Surfaces intensify and pulse briefly.',
    level: 'warning',
  },
  {
    label: 'Critical',
    description: 'Containment risk is escalating. The interface hardens and reddens.',
    level: 'critical',
  },
];

export const consoleZones: ConsoleZone[] = [
  {
    eyebrow: 'Bay Status',
    title: 'Quarantine Corridor A-17',
    lines: [
      'Primary shutters locked',
      'Atmosphere stable but cold',
      'Synthetic observer relay remains online',
    ],
  },
  {
    eyebrow: 'Live Directive',
    title: 'Stabilize observation feed',
    lines: [
      'Realign sensor mast to corridor centerline',
      'Verify vibration drift under threshold',
      'Do not open inner gate without second operator',
    ],
  },
];

export const consoleReadouts: ConsoleReadout[] = [
  { label: 'Pressure', value: 'STABLE' },
  { label: 'Core Load', value: '71%' },
  { label: 'Sweep Arc', value: '128 DEG' },
  { label: 'Bio Trace', value: 'LOW' },
];

export const consoleTimeline: ConsoleTimeline[] = [
  { stamp: '02:14', event: 'Seal integrity confirmed by night shift' },
  { stamp: '02:27', event: 'Observation feed drift exceeds preferred tolerance' },
  { stamp: '02:42', event: 'Remote relay correction queued' },
  { stamp: '03:03', event: 'Unverified thermal bloom near outer hatch' },
] as const;
