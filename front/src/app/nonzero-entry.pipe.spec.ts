import { NonzeroEntryPipe } from './nonzero-entry.pipe';

describe('NonzeroEntryPipe', () => {
  it('create an instance', () => {
    const pipe = new NonzeroEntryPipe();
    expect(pipe).toBeTruthy();
  });
});
