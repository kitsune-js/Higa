export * from './client';
export * from 'discord-api-types/v9';

/**
 * @param color - A color in Hexadecimal
 * @returns - Color code for Discord
 */
const resolveHexaColor = (color: string) => {
  return parseInt(color.replace('#', ''), 16);
};
export { resolveHexaColor };
