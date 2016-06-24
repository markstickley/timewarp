describe('TimeWarp', function() {

    var momentReturnValue;

    beforeEach(function() {
        document.getElementsByTagName('body')[0].innerHTML = '<div id="timewarp-test"></div>';

        momentReturnValue = {
            format: jasmine.createSpy('format').and.callFake(function() {
                return 'FORMATTED_DATE';
            })
        };

        window.moment = jasmine.createSpy('moment').and.returnValue(momentReturnValue);

        spyOn(window.console, 'error');
    });

    afterEach(function() {
        var element = document.getElementById('timewarp-test');
        element && element.remove();

        window.console.error = window.console.error.originalValue;
    });

    it('should automatically instantiate and run a new instance', function () {
        expect(TimeWarp.hasRun).toBe(true);
    });

    describe('[Methods]', function() {
        var tw;

        beforeEach(function() {
            tw = new TimeWarp();
        });

        describe('#run', function() {

            it('should set hasRun to true on both instance and class', function() {
                TimeWarp.hasRun = false;
                tw.hasRun = false;

                tw.run();

                expect(TimeWarp.hasRun).toBe(true);
                expect(tw.hasRun).toBe(true);
            });

        });

        describe('#getTimeElements', function() {

            it('should return an empty array if there are no time elements', function () {
                var elements = tw.getTimeElements();
                expect(elements instanceof Array).toBe(true);
                expect(elements.length).toBe(0);
            });

            it('should return an array containing HTMLElements equal to the number of <time> elements in the DOM (n <= 1)', function () {
                document.getElementById('timewarp-test').innerHTML += '<time datetime="2013-11-14" data-timewarp-format="dd-mm-yyyy"></time><time datetime="2013-11-14" data-timewarp-format="dd-mm-yyyy"></time>';
                var elements = tw.getTimeElements();
                expect(elements instanceof Array).toBe(true);
                expect(elements.length).toBe(2);
            });

            it('should ignore <time> elements that do not have the data-timewarp-format attribute', function () {
                document.getElementById('timewarp-test').innerHTML += '<time datetime="2013-11-14" data-timewarp-format="dd-mm-yyyy"></time><time datetime="2013-11-14"></time>';
                var elements = tw.getTimeElements();
                expect(elements.length).toBe(1);
            });

        });

        describe('#applyTimeFormat', function () {

            it('should not error if the wrong kind of element is passed into it', function () {
                expect(function() {
                    tw.applyTimeFormat(document.getElementsByTagName('body')[0]);
                }).not.toThrow();
            });

            it('should not error if no element or a non-element is passed into it', function () {
                expect(function() {
                    tw.applyTimeFormat();
                }).not.toThrow();

                expect(function() {
                    tw.applyTimeFormat('Not an element');
                }).not.toThrow();
            });

            it('should not error if the time element passed into it has no data-timewarp-format attribute', function () {
                document.getElementById('timewarp-test').innerHTML += '<time datetime="2013-11-14"></time>';
                expect(function() {
                    tw.applyTimeFormat(document.getElementsByTagName('time')[0]);
                }).not.toThrow();
            });

            it('should not error if Moment is not detected, but instead log an error in the console', function () {
                delete window.moment;
                document.getElementById('timewarp-test').innerHTML += '<time datetime="2013-11-14" data-timewarp-format="dd-mm-yyyy"></time>';

                expect(function() {
                    tw.applyTimeFormat(document.getElementsByTagName('time')[0]);
                }).not.toThrow();

                expect(window.console.error).toHaveBeenCalled();
            });

            it('should call Moment with the value of the data-timewarp-format attribute', function() {
                document.getElementById('timewarp-test').innerHTML += '<time datetime="2013-11-14" data-timewarp-format="dd-mm-yyyy"></time>';

                tw.applyTimeFormat(document.getElementsByTagName('time')[0]);

                expect(window.moment.calls.first().args[0]).toBe('2013-11-14');

                expect(momentReturnValue.format).toHaveBeenCalledWith('dd-mm-yyyy');
            });

            it('should apply the value given by Moment to the innerHTML of the time element, replacing all other content', function() {
                document.getElementById('timewarp-test').innerHTML += '<time datetime="2013-11-14" data-timewarp-format="dd-mm-yyyy">foobar</time>';

                expect(document.getElementsByTagName('time')[0].innerHTML).toBe('foobar');

                tw.applyTimeFormat(document.getElementsByTagName('time')[0]);

                expect(document.getElementsByTagName('time')[0].innerHTML).toBe('FORMATTED_DATE');
            });

        });

    });

  // it('')
});