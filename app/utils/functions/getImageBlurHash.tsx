import sharp from "sharp";
import { encode } from "blurhash";

export async function getBlurHash(imagePath: string) {
  const image = await sharp(imagePath)
    .resize(32, 32) // Small size for fast processing
    .raw()
    .toBuffer();

  return encode(new Uint8ClampedArray(image), 32, 32, 4, 4);
}
