import { User } from './User.ts';

interface Sticker {
  id: string;
  pack_id?: string;
  name: string;
  description?: string;
  tags: string;
  assest?: string;
  type: StickerType;
  format_type: StickerFormatType;
  available?: boolean;
  guild_id?: string;
  user?: User;
  sort_value?: number;
}

enum StickerType {
  STANDARD = 1,
  GUILD = 2
}

enum StickerFormatType {
  PNG = 1,
  APNG = 2,
  LOTTIE = 3
}

interface StickerItem {
  id: string;
  name: string;
  format_type: StickerFormatType;
}

interface StickerPack {
  id: string;
  stickers: Sticker[];
  name: string;
  sku_id: string;
  cover_sticker_id?: string;
  description: string;
  banner_asset_id?: string;
}

export { StickerType, StickerFormatType };
export type { Sticker, StickerItem, StickerPack };
