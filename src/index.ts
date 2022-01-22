export * from './client';

const resolveHexaColor = (color: string) => {
  return parseInt(color.replace('#', ''), 16);
};
export { resolveHexaColor };
