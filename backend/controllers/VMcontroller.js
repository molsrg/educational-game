const { VM } = require('vm2');
class VMcontroller {
  async runCode(req, res) {
    const userCode = req.body.code;
    try {
      const vm = new VM({
        timeout: 1000,
        sandbox: {},
      });

      const result = vm.run(userCode);
      res.status(200).json({ success: true, result });
    } catch (error) {
      res.status(400).json({ success: false, error: error.toString() });
    }
  }
}

module.exports = new VMcontroller();
