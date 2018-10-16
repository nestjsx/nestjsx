import { apprc } from '../../../packages/common/src/rc/rc-parser';

describe('common', () => {
  describe('rc', () => {
    describe('rc-parser', () => {
      describe('apprc', () => {
        it('should be an object with defaults', () => {
          expect(apprc).toHaveProperty('bootstrap');
          expect(apprc).toHaveProperty('packages');
        });
      });
    });
  });
});
