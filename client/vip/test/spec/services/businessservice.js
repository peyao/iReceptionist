'use strict';

describe('Service: BusinessService', function () {

  // load the service's module
  beforeEach(module('clientApp'));

  // instantiate service
  var BusinessService;
  beforeEach(inject(function (_BusinessService_) {
    BusinessService = _BusinessService_;
  }));

  it('should do something', function () {
    expect(!!BusinessService).toBe(true);
  });

});
