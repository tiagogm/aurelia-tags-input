// import { bootstrap } from 'aurelia-bootstrapper';
// import { StageComponent } from 'aurelia-testing';
import { AureliaTagsInput } from '../../src/aurelia-tags-input';

//This is where the tests would go, if I could get 'aurelia-testing' to work...
// or even `new AureliaTagsInput()` not to crash...

describe('aurelia-tags-input',() => {
  let component;
  let container;

  beforeEach(() => {
    // component = StageComponent
    //   .withResources('aurelia-tags-input')
    //   .inView(`<aurelia-tags-input></aurelia-tags-input>`)
  })

  it('should exist',done => {
    expect(AureliaTagsInput).toBeDefined();
    done();
    // component.create(bootstrap).then(() => {
    //   expect(false).toBe(true);
    //   done();
    // }).catch(e => { console.log(e.toString()) });
  });

  afterEach(() => {
    // component.dispose();
  })
})
