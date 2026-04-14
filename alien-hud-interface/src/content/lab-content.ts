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

export type HudControl = {
  label: string;
  hint: string;
  state: 'armed' | 'standby' | 'locked';
};

export type SurfaceTreatment = {
  name: string;
  code: string;
  note: string;
  tone: 'warning' | 'cool' | 'dim';
};

export type DisplayCarrier = {
  name: string;
  code: string;
  mode: 'corridor' | 'scan' | 'route' | 'terminal';
  lines: string[];
};

export type HardwareShell = {
  name: string;
  code: string;
  kind: 'well' | 'plate' | 'cassette' | 'frame';
  note: string;
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
    title: 'Recovered Console Fragments',
    tag: 'utility / telemetry / containment',
    intro: 'Recovered operational fragments from Quarantine Mission Console surfaces.',
    summary: 'Panel housings, utility strips, readout wells, and warning logic.',
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
    name: 'Diagnostic Housing',
    label: 'Housing',
    description: 'Primary shell for embedded feeds and telemetry wells.',
    variant: 'standard',
  },
  {
    name: 'Warning Strip',
    label: 'Strip',
    description: 'Escalation shell for containment faults and procedural lockouts.',
    variant: 'warning',
  },
  {
    name: 'Service Plate',
    label: 'Plate',
    description: 'Low-energy cover plate for legends, residue, and support channels.',
    variant: 'ghost',
  },
];

export const hudLabels = [
  'BAY A-17',
  'SYN RELAY',
  'PRESSURE GATE',
  'FEED CHANNEL',
  'SHUTTER LOCK',
  'THERMAL TRACE',
] as const;

export const hudButtons: HudButton[] = [
  { label: 'Arm Seal', variant: 'primary' },
  { label: 'Cycle Grid', variant: 'secondary' },
  { label: 'Purge Bay', variant: 'danger' },
];

export const hudControls: HudControl[] = [
  {
    label: 'Containment Latch',
    hint: 'Inner corridor access',
    state: 'armed',
  },
  {
    label: 'Observer Relay',
    hint: 'Remote synthetic uplink',
    state: 'standby',
  },
  {
    label: 'Manual Override',
    hint: 'Dual-operator authorization',
    state: 'locked',
  },
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
    label: 'Nominal Window',
    description: 'Quiet systems. Edges stay calm, glow stays buried, and text carries the load.',
    level: 'nominal',
  },
  {
    label: 'Containment Warning',
    description: 'Localized risk. Surfaces sharpen, amber channels rise, and pulse is permitted.',
    level: 'warning',
  },
  {
    label: 'Critical Breach',
    description: 'Escalation state. Red logic takes over and framing compresses toward intervention.',
    level: 'critical',
  },
];

export const surfaceTreatments: SurfaceTreatment[] = [
  {
    name: 'Worn Outer Rail',
    code: 'FRM-01',
    note: 'Segmented perimeter seam with softened abrasion and low amber bleed.',
    tone: 'warning',
  },
  {
    name: 'Cold Inset Well',
    code: 'MAT-04',
    note: 'Deep internal cavity for telemetry blocks and scanner wells.',
    tone: 'cool',
  },
  {
    name: 'Ghost Annotation Strip',
    code: 'AUX-02',
    note: 'Low-priority surface for legends, calibration marks, and crew residue.',
    tone: 'dim',
  },
];

export const hardwareShells: HardwareShell[] = [
  {
    name: 'Monitor Well',
    code: 'HW-11',
    kind: 'well',
    note: 'Deep-set carrier for phosphor displays and clipped visual channels.',
  },
  {
    name: 'Hatch Latch Plate',
    code: 'HW-03',
    kind: 'plate',
    note: 'Procedural shell with seam weight and mechanical lock emphasis.',
  },
  {
    name: 'Relay Cassette',
    code: 'HW-27',
    kind: 'cassette',
    note: 'Swappable control block for narrow service functions and line switching.',
  },
  {
    name: 'Utility Frame',
    code: 'HW-08',
    kind: 'frame',
    note: 'Structural channel used to bind smaller console fragments into one housing.',
  },
] as const;

export const displayCarriers: DisplayCarrier[] = [
  {
    name: 'Corridor Feed',
    code: 'FD-A17',
    mode: 'corridor',
    lines: ['corridor a-17', 'feed stable', 'minor luminance drift'],
  },
  {
    name: 'Contamination Scan',
    code: 'SC-04',
    mode: 'scan',
    lines: ['air trace low', 'particulate sweep live', 'amber band reserved'],
  },
  {
    name: 'Route Schematic',
    code: 'RT-9',
    mode: 'route',
    lines: ['bay > shutter > lock', 'manual path degraded', 'aux route sealed'],
  },
  {
    name: 'Maintenance Terminal',
    code: 'MT-02',
    mode: 'terminal',
    lines: ['service prompt open', 'cursor awaiting', 'uplink intermittent'],
  },
] as const;

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
