export const getLinearBg = (
  color: string,
  progress: number,
  baseColor = "rgba(255,255,255,.15)"
) => {
  return `linear-gradient(to right, ${color} ${progress}%, ${baseColor} ${progress}%, ${baseColor}`;
};
export const sleep = async (delay: number) => new Promise((rs) => setTimeout(rs, delay));
