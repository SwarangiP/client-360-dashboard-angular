import { IndianCurrencyPipe } from './indian-currency-pipe';

describe('IndianCurrencyPipe', () => {
  const pipe = new IndianCurrencyPipe();

  it('formats lakhs and crores', () => {
    expect(pipe.transform(1_730_000)).toBe('₹17.30 L');
    expect(pipe.transform(14_700_000)).toBe('₹1.47 Cr');
  });

  it('handles missing values', () => {
    expect(pipe.transform(null)).toBe('—');
  });
});
