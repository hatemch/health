import { TestBed } from '@angular/core/testing';
import { ConectionsService } from './conections.service';
describe('ConectionsService', function () {
    beforeEach(function () { return TestBed.configureTestingModule({}); });
    it('should be created', function () {
        var service = TestBed.get(ConectionsService);
        expect(service).toBeTruthy();
    });
});
//# sourceMappingURL=conections.service.spec.js.map