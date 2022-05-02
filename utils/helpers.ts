export const getId = (val: string | string[]) => {
  return typeof val === 'string' ? val : val[0];
}