const roundWithPrecision = (num, precision = 0, adjustment = 'round') => {
  if (
    adjustment !== 'round' &&
    adjustment !== 'floor' &&
    adjustment !== 'ceil'
  ) {
    throw new Error('Unrecognized adjustment type: ' + adjustment);
  }

  const multiplier = Math.pow(10, precision);
  return Math[adjustment]((num || 0) * multiplier) / multiplier;
};

export default roundWithPrecision;
