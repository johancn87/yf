//https://developer.yahoo.com/yql/console/?q=show%20tables&env=store://datatables.org/alltableswithkeys
var http = require('http');

var YahooApi = function () {
    var self = this;
    self.diagnostics = false;
    var baseUrlStart = 'http://query.yahooapis.com/v1/public/yql?q=';
    var baseUrlEnd = '&format=json&env=store://datatables.org/alltableswithkeys';

    function getUrl(query) {
        //env=http://datatables.org/alltables.env
        //env=store://datatables.org/alltableswithkeys
        var url = `${baseUrlStart}${encodeURIComponent(query)}${baseUrlEnd}`;
        if (self.diagnostics) {
            url += '&diagnostics=true';
        }
        return url;
    }

    function convertResult(data) {
        data = JSON.parse(data);
        var results = data.query.results;
        if (!results || !results.quote) {
            return null;
        }
        if (!Array.isArray(results.quote)) {
            return [results.quote];
        }

        return results.quote;
    }

    self._request = function (query, callback) {
        var url = getUrl(query);

        http.get(url, res => {
            res.setEncoding('utf8');
            var data = '';
            res.on('data', chunk => {
                data += chunk;
            });
            res.on('end', () => {
                try {
                    var converted = convertResult(data);
                    callback(null, converted);
                } catch (e) {
                    callback(e);
                }
            });
            // consume response body
            res.resume();
        }).on('error', e => {
            callback(e);
        });
    };

    self.getQuotes = function (symbol, callback) {
        var commaSymbols = symbol;
        if (Array.isArray(symbol)) {
            commaSymbols = symbol.join(',');
        }
        this._request(`select * from yahoo.finance.quotes where symbol in ('${commaSymbols}')`, callback);
    };

    self.getHistorical = function (symbol, startDate, endDate, callback) {
        this._request(`select * from yahoo.finance.historicaldata where symbol = '${symbol}' and startDate = '${startDate}' and endDate = '${endDate}'`, callback);
    };

    self.getDividendHistory = function (symbol, startDate, endDate, callback) {
        this._request(`select * from yahoo.finance.dividendhistory where symbol = '${symbol}' and startDate = '${startDate}' and endDate = '${endDate}'`, callback);
    };
};

module.exports = new YahooApi();
