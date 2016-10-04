//import assert from 'assert';
import yfinance from '../lib';

describe('yfinance', function () {
    describe('getQuotes', function () {
        it('Single quote!', function (done) {
            yfinance.getQuotes('JNJ', function (err, data) {
                if (!data) {
                    done('Got no data!');
                    return;
                }
                if (data[0].Symbol !== 'JNJ') {
                    done('Incorrect symbol!');
                    return;
                }
                if (!data[0].DaysHigh) {
                    done('No quote data!');
                    return;
                }
                done();
            });
        });

        it('Comma seperated quotes!', function (done) {
            yfinance.getQuotes('JNJ,GOOG', function (err, data) {
                if (!data) {
                    done('Got no data!');
                    return;
                }
                if (!Array.isArray(data)) {
                    done('Did not return array!');
                    return;
                }
                if (data[0].Symbol !== 'JNJ' && data[1].Symbol !== 'JNJ') {
                    done('Missing symbol JNJ!');
                    return;
                }
                if (data[0].Symbol !== 'GOOG' && data[1].Symbol !== 'GOOG') {
                    done('Missing symbol GOOG!');
                    return;
                }
                if (!data[0].DaysHigh || !data[1].DaysHigh) {
                    done('No quote data!');
                    return;
                }
                done();
            });
        });

        it('Array of quotes!', function (done) {
            yfinance.getQuotes(['JNJ', 'GOOG'], function (err, data) {
                if (!data) {
                    done('Got no data!');
                    return;
                }
                if (!Array.isArray(data)) {
                    done('Did not return array!');
                    return;
                }
                if (data[0].Symbol !== 'JNJ' && data[1].Symbol !== 'JNJ') {
                    done('Missing symbol JNJ!');
                    return;
                }
                if (data[0].Symbol !== 'GOOG' && data[1].Symbol !== 'GOOG') {
                    done('Missing symbol GOOG!');
                    return;
                }
                if (!data[0].DaysHigh || !data[1].DaysHigh) {
                    done('No quote data!');
                    return;
                }
                done();
            });
        });
    });

    describe('getHistorical', function () {
        it('Should get some results!', function (done) {
            yfinance.getHistorical('JNJ', '2016-08-01', '2016-08-05', function (err, data) {
                if (!data) {
                    done('Got no data!');
                    return;
                }
                if (data.length !== 5) {
                    done('Incorrect number of results!');
                    return;
                }
                if (data[1].Symbol !== 'JNJ') {
                    done('Incorrect symbol!');
                    return;
                }
                if (!data[1].Close) {
                    done('No quote data!');
                    return;
                }
                done();
            });
        });
    });

    describe('getDividendHistory', function () {
        it('Should get some results!', function (done) {
            yfinance.getDividendHistory('JNJ', '2015-01-01', '2015-12-31', function (err, data) {
                if (!data) {
                    done('Got no data!');
                    return;
                }
                if (data.length !== 7) {
                    done('Incorrect number of results!');
                    return;
                }
                if (data[1].Symbol !== 'JNJ') {
                    done('Incorrect symbol!');
                    return;
                }
                if (!data[1].Dividends) {
                    done('No Dividends data!');
                    return;
                }
                done();
            });
        });
    });
});
