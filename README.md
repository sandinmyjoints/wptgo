# wptgo

Super-simple test launcher for Webpagetest (WPT). Frictionless performance
comparisons of multiple pages/sites.

### Example

```
$ WPT_API_KEY=<your_key> wptgo www.github.com www.bitbucket.com
Starting tests:
www.github.com
www.bitbucket.com

Test details:
http://www.webpagetest.org/result/160303_M2_3841ebe1b21b53c566081de32fe91b86/1/details/
http://www.webpagetest.org/result/160303_Y4_69517e5b586cf86e18c742d5609d7c08/1/details/

Comparison url:
http://www.webpagetest.org/video/compare.php?tests=160303_M2_3841ebe1b21b53c566081de32fe91b86,160303_Y4_69517e5b586cf86e18c742d5609d7c08&thumbSize=200&ival=100&end=visual
```

### Configuration

Specify your [api key](http://www.webpagetest.org/getkey.php):

    $ export WPT_API_KEY=<your key>

OR

    $ wptgo --apiKey=<your key>

Launch some tests:

    $ wptgo <url>
    $ wptgo --batchFile [file with one url per line]

[All the options for the 'test' command](https://www.npmjs.com/package/webpagetest)
can be specified as either command line arguments like `--location=<location>`
or in config.json like:

```json
{
  "location": "<location>",
  etc...
}
```

A small, sane set of defaults is provided in config.json:


```json
{
  "affinity": "wptgo",
  "private": true,
  "video": true
}
```

An additional command-line option `batchFile` is available to specify a file of urls to
test, one url per line.
