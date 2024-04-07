const { VM } = require('vm2');
const assert = require('assert');

class TaskController {
  async runTests(req, res) {
    const taskId = req.body.taskId;
    const userCode = req.body.code;

    try {
      const vm = new VM({
        timeout: 1000,
        sandbox: {},
      });

      const testsModule = require(`../tests/task${taskId}.js`);
      const tests = testsModule;
      console.log(tests);
      console.log(userCode);
      vm.run(`function task(arr)${userCode}`);
      console.log(1);
      let success = true;
      let testResults = [];
      for (const testCase of tests) {
        const result = vm.run(
          `function task(arr)${userCode}; task(${JSON.stringify(testCase.arr)})`
        );
        try {
          assert.deepStrictEqual(result, {
            min: testCase.min,
            max: testCase.max,
          });
          testResults.push({ success: true, testCase, result });
          console.log();
        } catch (err) {
          success = false;
          testResults.push({
            success: false,
            testCase,
            result,
            error: err,
          });
        }
      }
      res.status(200).json({ success, testResults });
    } catch (error) {
      res.status(400).json({ success: false, error: error.toString() });
    }
  }
  async getTests(req, res) {
    try {
      const test_id = req.body.testId;
      const tests = require(`../tests/task${test_id}.js`);
      res.status(200).json({ tests: tests });
    } catch (err) {
      res.status(400).json({ error: err });
    }
  }
}

module.exports = new TaskController();
