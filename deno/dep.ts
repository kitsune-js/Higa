import axiod from 'https://deno.land/x/axiod@0.24/mod.ts';
import WS from 'https://deno.land/x/deno_ws@0.1.4/mod.ts';

export * from 'https://deno.land/x/discord_api_types@0.29.0/v9.ts';
export * from 'https://deno.land/x/event_emitter@1.0.0/mod.ts';
export type option = { [key: string]: string | number | boolean };
export { WS, axiod };

declare global {
  interface ReadableStream<R> {
    getIterator(): any;
  }
}
