'use strict';
function computed(avartar) {
  if (Array.isArray(avartar)) {
    return avartar[0].response.data.url;
  }
  return avartar;
}

module.exports = computed;
