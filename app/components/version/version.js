'use strict';

angular.module('subtierranean.version', [
  'subtierranean.version.interpolate-filter',
  'subtierranean.version.version-directive'
])

.value('version', '1.3');
