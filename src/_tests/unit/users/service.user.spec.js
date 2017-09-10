// eslint-disable-next-line
import * as sut from '../../../users/library/service.users';
// eslint-disable-next-line
import { __RewireAPI__ as rw } from '../../../users/library/service.users';
// import users from '../../../_db/data/dev.user';

describe('service.users', () => {
    describe('filterUsersCounties()', () => {
        describe('When given two arrays', () => {
            it('Should filter and return the first array based off second conditions', () => {
                const users = [
                    {
                        info: {
                            operationalCounties: [2419]
                        }
                    },
                    {
                        info: {
                            operationalCounties: [2319]
                        }
                    }
                ];
                const counties = [2319];
                const filterResults = sut.filterUsersCounties(users, counties);
                expect(filterResults.length).to.equal(1);
            });
        });
    });

    describe('.filterUsersCategories()', () => {
        describe('When given two arrays', () => {
            it('Should filter the first  by the second', () => {
                const users = [
                    { _category: 1 },
                    { _category: 2 }
                ];
                const categories = [2, 5, 6];

                const results = sut.filterUsersCategories(users, categories);
                expect(results.length).to.equal(1);
            });
        });
    });
});
