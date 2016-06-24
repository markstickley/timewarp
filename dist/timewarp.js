((w, d) => {

    "use strict";

    /**
     * TimeWarp constructor
     * @constructor
     */
    function TimeWarp() {
        this.hasRun = false;
    }

    /**
     * Indicates that an instance of TimeWarp has been run
     * @type {Boolean}
     */
    TimeWarp.hasRun = false;

    /**
     * Runs TimeWarp to parse for <time> elements
     */
    TimeWarp.prototype.run = function() {
        TimeWarp.hasRun = this.hasRun = true;

        this.getTimeElements().forEach(function(element, index) {
            element.innerHTML = this.applyTimeFormat
        });
    };


    /**
     * Gets all the <time> elements in the document
     * @return {HTMLElement[]} An array of <time> elements
     */
    TimeWarp.prototype.getTimeElements = function() {
        var elements = document.getElementsByTagName('time');
        var elementArray = [];

        Array.prototype.forEach.call(elements, function(element, index) {
            if(element.dataset && element.dataset.timewarpFormat) {
                elementArray.push(element);
            }
        });

        return elementArray;
    };


    /**
     * Takes the data-timewarp-format attribute and formats the value of the datetime attribute
     * inserting the result into the body of the time element.
     * @param  {HTMLElement} timeElement A time element
     */
    TimeWarp.prototype.applyTimeFormat = function(timeElement) {
        let moment = w.moment;
        if(moment === undefined) {
            console.error('TimeWarp: Moment is not available');
            return;
        }

        if(!timeElement || !(timeElement instanceof HTMLElement)) {
            console.error('TimeWarp: applyTimeFormat requires an HTML time element');
            return;
        }

        var formattedTime = moment(timeElement.getAttribute('datetime'), "YYYY-MM-DDTHH:mm:ssZZ").format(timeElement.dataset.timewarpFormat);
        timeElement.innerHTML = formattedTime;
    };


    (new TimeWarp()).run();

    /* Export */
    if (typeof exports !== 'undefined') {
        if (typeof module !== 'undefined' && module.exports) {
            exports = module.exports = TimeWarp;
        }
        exports.TimeWarp = TimeWarp;
    }
    else if(w) {
        w.TimeWarp = TimeWarp;
    }

})(window, document);