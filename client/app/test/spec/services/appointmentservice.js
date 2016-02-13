'use strict';

describe('Service: AppointmentService', function () {

  // load the service's module
  beforeEach(module('clientApp'));

  // instantiate service
  var AppointmentService;
  beforeEach(inject(function (_AppointmentService_) {
    AppointmentService = _AppointmentService_;
  }));

  it('should do something', function () {
    expect(!!AppointmentService).toBe(true);
  });

});
