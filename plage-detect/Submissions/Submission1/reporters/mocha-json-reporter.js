(function () {
  "use strict";

  const Mocha = require("mocha");
  const fs = require('fs');
  const {
    EVENT_RUN_BEGIN,
    EVENT_RUN_END,
    EVENT_TEST_FAIL,
    EVENT_TEST_PASS,
    EVENT_SUITE_BEGIN,
    EVENT_SUITE_END,
  } = Mocha.Runner.constants;

  class Suite {

    parent = null;

    constructor(parent, title, fullTitle) {
      this.parent = parent;
      this.title = title;
      this.fullTitle = fullTitle;
      this.suites = [];
      this.tests = [];
      this.pass = 0;
      this.fail = 0;
      this.total = 0;
    }

    addTest(test) {
      this.total++;
      if(test.status === 'PASS') {
        this.pass++;
      } else {
        this.fail++
      }
      this.tests.push(test);
    }

    toJSON() {
      return {
        title: this.title,
        fullTitle: this.fullTitle,
        suites: this.suites.map((suite) => suite.toJSON()),
        tests: this.tests.map((test) => test.toJSON()),
        pass: this.pass,
        fail: this.fail
      };
    }

  }

  class Spec {

    constructor(title, fullTitle, status, error) {
      this.title = title;
      this.fullTitle = fullTitle;
      this.status = status;
      this.error = error;
    }

    toJSON() {
      return {
        title: this.title,
        fullTitle: this.fullTitle,
        status: this.status,
        error: this.error
      };
    }

  }

  // this reporter outputs test results, indenting two spaces per suite
  class MyReporter {
    constructor(runner) {
      this._indents = 0;
      const stats = runner.stats;

      let count = 1;
      let mySuite;

      runner
        .once(EVENT_RUN_BEGIN, () => {
          mySuite = new Suite(null, 'root', 'root');
          console.log("Started tests");
        })
        .on(EVENT_SUITE_BEGIN, (suite) => {
          // Hack to drop first empty suite
          if(count) {
            count--;
          } else {
            const newSuite = new Suite(mySuite, suite.title, suite.fullTitle());
            mySuite.suites.push(newSuite);
            mySuite = newSuite;
            this.increaseIndent();
          }
        })
        .on(EVENT_SUITE_END, () => {
          if(mySuite.parent !== null) {
            mySuite = mySuite.parent;
          }
          this.decreaseIndent();
        })
        .on(EVENT_TEST_PASS, (test) => {
          mySuite.addTest(new Spec(test.title, test.fullTitle(), 'PASS', null));
          console.log(`${this.indent()}pass: ${test.fullTitle()}`);
        })
        .on(EVENT_TEST_FAIL, (test, err) => {
          // console.log('mySuite: ', JSON.stringify(mySuite));
          mySuite.addTest(new Spec(test.title, test.fullTitle(), 'FAIL', err.message));
          console.log(
            `${this.indent()}fail: ${test.fullTitle()} - error: ${err.message}`
          );
        })
        .once(EVENT_RUN_END, () => {
          console.log(
            `Tests finished. ${stats.passes}/${stats.passes + stats.failures} ok`
          );
          fs.writeFileSync('results.json', JSON.stringify({suites: mySuite.toJSON(), stats: stats}, null, 2), 'utf8');
        });
    }

    indent() {
      return Array(this._indents).join("  ");
    }

    increaseIndent() {
      this._indents++;
    }

    decreaseIndent() {
      this._indents--;
    }
  }

  module.exports = MyReporter;
})();
