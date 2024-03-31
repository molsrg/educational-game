const { VM } = require('vm2');
const assert = require('assert');
class TaskController {
  async task1(req, res) {
    const userCode = req.body.code;
    try {
      const vm = new VM({
        timeout: 1000,
        sandbox: {},
      });

      vm.run(`function task1(arr)${userCode}`);

      const tests = [
        { arr: [1, 2, 3, 4, 5], min: 1, max: 5 },
        { arr: [-1, 0, 1, 2], min: -1, max: 2 },
        { arr: [100, 20, 300, 40], min: 20, max: 300 },
        { arr: [3, 3, 3, 3], min: 3, max: 3 },
        { arr: [], min: null, max: null },
      ];
      let success = true;
      let testResults = [];
      for (const testCase of tests) {
        const result = vm.run(
          `function task1(arr)${userCode}; task1(${JSON.stringify(
            testCase.arr
          )})`
        );
        try {
          assert.deepStrictEqual(result, {
            min: testCase.min,
            max: testCase.max,
          });
          testResults.push({ success: true, testCase, result });
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
}

module.exports = new TaskController();
