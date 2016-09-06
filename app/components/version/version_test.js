'use strict';

describe('subtierranean.version module', function() {
  beforeEach(module('subtierranean.version'));

  describe('version service', function() {
    it('should return current version', inject(function(version) {
      expect(version).toEqual('1.4');
    }));
  });
});
