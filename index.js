#!/usr/bin/env node

var _ = require('lodash');
var fs = require('fs');
var async = require('async');
var debug = require('debug')('wptgo');

var figc = require('figc');
var config = figc(__dirname + '/config.json');
var argv = require('minimist')(process.argv.slice(2));

var apiKey = process.env.WPT_API_KEY || config.apiKey;

var WebPageTest = require('webpagetest');
var wpt = new WebPageTest('www.webpagetest.org', apiKey);

function urlsToTest () {
  if (argv.batchFile) {
    return fs.readFileSync(argv.batchFile, 'utf-8')
      .split('\n')
      .filter(function (line) { return line && line.trim().length > 0; })
      .map(function (line) { return line.trim(); })
      .filter(function (line) { return line[0] !== '#'; });
  }

  return argv._.length > 0 ? argv._ : ['http://www.webpagetest.org'];
}

var defaultOpts = {
  affinity: 'wptgo'
};

var opts = _.defaults(config, defaultOpts);

debug('config', config);
debug('opts', opts);

function testUrl (url, cb) {
  console.log(url);
  wpt.runTest(url, opts, cb);
}

function testResults (err, results) {
  if (err) {
    console.log('Error: ', err);
    return;
  }

  var testIds = results.map(function (result) { return result.data.testId; });
  var detailUrlTemplate = 'http://www.webpagetest.org/result/%s/1/details/';
  console.log('\nTest details:');
  testIds.forEach(function (id) {
    console.log(detailUrlTemplate.replace('%s', id));
  });

  var compareUrlTemplate1 = 'http://www.webpagetest.org/video/compare.php?tests=';
  var compareUrlTemplate2 = '&thumbSize=200&ival=100&end=visual';
  var compareUrl = compareUrlTemplate1 + testIds.join(',') + compareUrlTemplate2;
  console.log('\nComparison url:');
  console.log(compareUrl);
}

console.log('Starting tests: ');
async.map(urlsToTest(), testUrl, testResults);
