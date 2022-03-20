import axiod from 'https://deno.land/x/axiod@0.24/mod.ts';

export * from 'https://deno.land/x/discord_api_types@0.29.0/v9.ts';
export * from 'https://deno.land/x/event_emitter@1.0.0/mod.ts';
export type option = { [key: string]: string | number | boolean };
export { axiod };

declare global {
  interface ReadableStream<R> {
    getIterator(): any;
  }
}
