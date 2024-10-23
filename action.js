const core = require('@actions/core');
const { spawn } = require('child_process');
const path = require('path');

function run() {
  try {
    // 解析脚本路径
    const script = path.resolve(__dirname, 'script.sh');
    console.log(`Running script: ${script}`);

    // 使用 spawn 并连接 stdout 和 stderr
    const child = spawn(script, [], {
      stdio: ['inherit', 'pipe', 'pipe']  // 让子进程的 stdout 和 stderr 通过 pipe 传递给主进程
    });

    // 捕获标准输出并打印
    child.stdout.on('data', (data) => {
      process.stdout.write(data.toString());
    });

    // 捕获标准错误输出并打印
    child.stderr.on('data', (data) => {
      process.stderr.write(`Error: ${data.toString()}`);
    });

    // 捕获子进程关闭事件
    child.on('close', (code) => {
      if (code === 0) {
        console.log(`Child process exited successfully with code ${code}`);
      } else {
        console.error(`Child process exited with code ${code}`);
        core.setFailed(`Script failed with exit code ${code}`);
      }
    });

  } catch (error) {
    core.setFailed(`Action failed: ${error.message}`);
  }
}

run();
