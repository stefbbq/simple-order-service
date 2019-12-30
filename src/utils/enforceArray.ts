export function enforceArray(object: any): string[] {
  if (typeof object === 'string') return [object]
  else return object
}
