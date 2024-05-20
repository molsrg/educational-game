const { VM } = require('vm2');
const assert = require('assert');

class TaskController {
  async runTests(req, res) {
    const taskId = req.body.taskId;
    const userCode = req.body.code;
    const testsJson = require('../tests/tests.json');
    const task = testsJson.find(t => t.id === taskId);

    if (!task) {
      return res.status(404).json({ success: false, error: 'Task not found' });
    }

    try {
      const vm = new VM({
        timeout: 1000,
        sandbox: {},
      });

      vm.run(`function task(input)${userCode}`);

      let success = true;
      let testResults = [];

      for (const testCase of task.examples) {
        const result = vm.run(`function task(input)${userCode};task(${JSON.stringify(testCase.input)})`);

        try {
          console.log(testCase.input);
          assert.deepStrictEqual(result, testCase.output);
          testResults.push({ success: true, testCase, result });
        } catch (err) {
          success = false;
          testResults.push({
            success: false,
            testCase,
            result: result,
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
      const testsJson = require('../tests/tests.json');
      const test_id = req.body.testId;
      const test = testsJson.find(t => t.id === test_id);
      if (test) {
        res.status(200).json({ tests: test });
      } else {
        res.status(404).json({ error: 'Test not found' });
      }
    } catch (err) {
      res.status(400).json({ error: err.message });
    }
  }
}

module.exports = new TaskController();
