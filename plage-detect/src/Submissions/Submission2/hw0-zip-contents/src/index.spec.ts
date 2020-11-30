import {assert} from 'chai';
import { duplicate, sub } from './index';
import { test } from 'mocha';


describe('illustrations of equality', function () {

    it('Compare dup(13) with [13,13] via .equal ==> false,[13, 13]', () => {
        assert.notEqual(duplicate(13),[13,13])
    })
    
    it('Compare dup(13) with [13,13] via (==); result is false', () => {
        assert.isFalse(duplicate(13)==[13, 13])
    })

    it('Compare dup(13) and [13,13] with deepEqual ==> true', () => {
        assert.deepEqual(duplicate(13),[13, 13])
    })

    it('[[12, 12] notEqual [13,13]', function () {
        assert.notEqual(
            [12, 13].map(duplicate),
            [[12, 12], [13, 13]]
        )
    })

    it('[[12, 12], [13,13] using assert.deepEqual', function () {
        assert.deepEqual(
            [12, 13].map(duplicate),
            [[12, 12], [13, 13]]
        )
    })

})


// functions like these are handy in your test files
function testDeepEqual <T> (testname: string,
    actual: T, correct: T,
) {
    it(testname,
        function () { assert.deepEqual(actual, correct) })
}

function testequal <T> (testname: string,
    actual: T, correct: T,
) {
    it(testname,
        function () { assert.equal(actual, correct) })
}


// tests for reduce
describe('illustration of reduce', function () {
    testequal('[3,4,5].reduce(sub,0)=-12', [3,4,5].reduce(sub,0),-12);
    testequal('how did it get that?  Let\'s see', 1, 1);
    testequal('sub(0,3) = -3', sub(0,3),-3);
    testequal('sub(-3,4) = -7', sub(-3,4), -7);
    testequal('sub(-7,5) = -12', sub(-7,5), -12);
    
})

