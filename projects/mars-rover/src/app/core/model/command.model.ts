export const COMMANDS = {
  forward: 'f',
  backward: 'b',
  left: 'l',
  right: 'r',
} as const;

type CommandKeys = keyof typeof COMMANDS;
type WayCommandKeys = keyof Pick<typeof COMMANDS, 'left' | 'right'>;
type MoveCommandKeys = keyof Pick<typeof COMMANDS, 'forward' | 'backward'>;

export type Command = (typeof COMMANDS)[CommandKeys];
export type WayCommand = (typeof COMMANDS)[WayCommandKeys];
export type MoveCommand = (typeof COMMANDS)[MoveCommandKeys];
