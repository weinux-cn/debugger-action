const core = require('@actions/core');
const { spawn } = require('child_process');
const path = require('path');

function run() {
  try {
    // 解析脚本路径
    const script = path.resolve(__dirname, 'script.sh');
    console.log(`Running script: ${script}`);

    // 使用 spawn 而不是 execFile，捕获标准输出和错误输出
    const child = spawn(script, [], {
      stdio: 'inherit'  // 继承主进程的标准输入输出
    });

    // 监听子进程关闭事件，输出退出码
    child.on('close', (code) => {
      console.log(`Child process exited with code ${code}`);
      process.exit(code);
    });

  } catch (error) {
    core.setFailed(error.message);
  }
}

run();
