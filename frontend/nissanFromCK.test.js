import assert from "assert";
import { countNissansFromCk } from '../backend/nissanFromCk.js';


describe('Nissan from CK', () => {

    it('It should return true if countNissansFromCk',function(){
        assert.equal(countNissansFromCk('Nissan'),true)
    });

    it('It should return false if  countNissansFromCk',function(){
        assert.equal(countNissansFromCk('CJ'),true)
    })
});