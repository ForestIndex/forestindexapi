// // eslint-disable-next-line
// import * as sut from '../../../common/objects/manager';
// // eslint-disable-next-line
// import { __RewireApi__ as rw } from '../../../common/objects/manager';

// describe('Manager class', () => {
//     describe('getDeepValue()', () => {
//         describe('When given an object and a string describing what nested property to return', () => {
//             it('Should return the nested value', () => {
//                 const obj = {
//                     key1: {
//                         key2: {
//                             key3: 'the final value'
//                         }
//                     }
//                 };
//                 const array = ['key1', 'key2', 'key3'];
//                 const val = sut.getDeepValue(obj, array);
//                 expect(val).to.equal('the final value');
//             });
//         });

//         describe('When given a property that does not exist', () => {
//             it('Should return undefined', () => {
//                 const obj = {};
//                 const array = ['key1', 'key2', 'key3'];
//                 const val = sut.getDeepValue(obj, array);
//                 expect(val).to.equal(undefined);
//             });
//         });
//     });
// });
