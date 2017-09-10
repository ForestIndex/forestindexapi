import * as sut from '../../../common/library/tokens';

describe('tokens', () => {
    describe('.create()', () => {
        describe('When given a string', () => {
            it('Should return a token', () => {
                sut.create('some string')
                .then((token) => {
                    expect(typeof token === 'string');
                })
            });
        });
    });

    describe('.extractCookie()', () => {
        describe('When given a request object', () => {
            it('Should extract the token', () => {
                // const token = 'eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJ1c2VybmFtZSI6WyJiaWxsZm9yZXN0QGdtYWlsLmNvbSJdfQ.lF2QMwvK6ny5xLrOj1Azlh8gXRvBBIE8udOyz9afo8o'
                // const cookie = `forrestryservices=${token}`;
                // const req = {
                //     headers: {
                //         cookie: cookie,
                //     },
                // };
                // const tok = sut.extractCookie(req);
                // expect(tok).to.eventually.equal(token);
            });
        });
    });
});
