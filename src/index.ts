export * from './client/Client';

const resolveHexaColor = (color: string) => {
  return parseInt(color.replace('#', ''), 16);
};
export { resolveHexaColor };
