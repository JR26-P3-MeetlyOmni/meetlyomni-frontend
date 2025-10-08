export const CDN_URL = process.env.NEXT_PUBLIC_CDN_URL || '';

export const getAssetUrl = (path: string) => {
  // path: "StaticFiles/assets/images/.../XXX.png"
  if (!CDN_URL) return `/${path}`;
  return `${CDN_URL}/${path}`;
};
