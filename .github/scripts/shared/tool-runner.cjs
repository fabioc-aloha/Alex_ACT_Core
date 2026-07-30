// @ts-check
'use strict';

const { execFileSync } = require('node:child_process');

function envKeyForTool(tool) {
    return `ACT_TOOL_${String(tool).replace(/[^a-zA-Z0-9]/g, '_').toUpperCase()}`;
}

function runTool(tool, args, options = {}) {
    const overrideScript = process.env[envKeyForTool(tool)];
    if (overrideScript) {
        return execFileSync(process.execPath, [overrideScript, ...args], options);
    }
    // Windows: npm-installed CLIs (npx, npm, mmdc, svgexport, etc.) are .cmd
    // shims that execFileSync cannot resolve without shell:true. On POSIX these
    // are native executables and shell:true is unnecessary. Args are constructed
    // in-source (not user input) so the shell-concat security caveat does not
    // apply here.
    const isWindows = process.platform === 'win32';
    const runOptions = isWindows ? { ...options, shell: true } : options;
    return execFileSync(tool, args, runOptions);
}

module.exports = { runTool, envKeyForTool };
