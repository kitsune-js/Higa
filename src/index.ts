export * from './client';
export * from 'discord-api-types/v9';

/**
 * Given a string representing a color in hexadecimal format, return the corresponding integer value
 * @param {string} color - The color to be converted to a hexadecimal value.
 * @returns The hexadecimal value of the color.
 */
const resolveHexaColor = (color: string) => {
  return parseInt(color.replace('#', ''), 16);
};

export { resolveHexaColor };
