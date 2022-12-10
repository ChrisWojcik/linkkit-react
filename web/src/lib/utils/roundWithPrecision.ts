type roundingAdjustmentMethod = 'round' | 'floor' | 'ceil';

export function roundWithPrecision(
  num: number,
  precision = 0,
  adjustment: roundingAdjustmentMethod = 'round'
) {
  const multiplier = Math.pow(10, precision);
  return Math[adjustment]((num || 0) * multiplier) / multiplier;
}
