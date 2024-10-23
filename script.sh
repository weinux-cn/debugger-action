const core = require('@actions/core');
const { execSync } = require('child_process');
const path = require('path');

function run() {
  try {
    // 获取脚本路径
    const script = path.resolve(__dirname, 'script.sh');
    console.log(`Running script: ${script}`);

    // 同步执行脚本，并捕获输出
    const output = execSync(`bash ${script}`, { stdio: 'inherit' });

    // 输出执行结果
    console.log(`Script executed successfully: ${output}`);

  } catch (error) {
    // 如果执行失败，捕获并报告错误
    core.setFailed(`Script failed with error: ${error.message}`);
  }
}

run();
