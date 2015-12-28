import test from 'ava';
import iora from '../dist';

test('shorthand server creation', ({ true: tru }) => {
  const app = iora();
  tru(app instanceof iora.Server, 'shorthand');
});
