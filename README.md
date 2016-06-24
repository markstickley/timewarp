Timewarp
========

Formats the contents of HTML `<time>` elements based on the contents of their `data-timewarp-format` attribute.


Usage
-----

Let's say you have a date / time in a `<time>` element and it looks something like

``` html
<time datetime="2016-05-19">2016-05-19</time>
```

which is perfectly servicable (until perhaps you start adding the time as well: `2016-05-19T15:07:01Z+01:00`) and people will know what you mean but you just fancy making it a little... nicer. You would change the HTML but you know the date comes from a database or file and you can't just change the format it comes back in or duplicate the value while transforming it (you still need the proper `datetime` format for the datetime attribute after all) because of... reasons.

Simply add an attribute `data-timewarp-format` to the element and include `timewarp.js` just before the closing `</body>` tag and the job's a good 'un.


``` html
<time datetime="2016-05-19" data-timewarp-format="MMM YYYY">May 2016</time>
```


Formatting options
------------------

Formatting just as you would [format the date using moment.js](http://momentjs.com/docs/#/displaying/format/).

If you want to use relative time (to now), just use `'R'` 


Getting Timewarp
----------------

You could just download one of the files in the `dist` folder, or if you like to keep track of version numbers etc then...

Bower: `bower install timewarp`


Contributing to Timewarp
------------------------

Contributions welcome! Please add tests :)

### Testing

``` bash
gulp test
```

### Building

``` bash
gulp build
```

(will also run tests on built code)