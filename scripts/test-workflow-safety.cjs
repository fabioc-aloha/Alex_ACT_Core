const assert = require('node:assert/strict');
const fs = require('node:fs');
const path = require('node:path');
const test = require('node:test');
const vm = require('node:vm');
const createDOMPurify = require('dompurify');
const { JSDOM } = require('jsdom');

const repositoryRoot = path.resolve(__dirname, '..');
const sanitizerSkill = path.join(repositoryRoot, '.github', 'skills', 'markdown-sanitization-chain', 'SKILL.md');
const planSkill = path.join(repositoryRoot, '.github', 'skills', 'plan', 'SKILL.md');
const gitSkill = path.join(repositoryRoot, '.github', 'skills', 'git-workflow', 'SKILL.md');

test('sanitizer contract rejects common event-handler attributes and preserves safe content', () => {
    const source = fs.readFileSync(sanitizerSkill, 'utf8');
    const block = source.match(/```javascript\s+(const config = \{[\s\S]*?\};)\s+```/);
    assert.ok(block, 'documented DOMPurify configuration is required');
    const config = vm.runInNewContext(`${block[1]}\nconfig`, {}, { timeout: 1000 });
    assert.deepEqual(Array.from(config.FORBID_ATTR), ['onclick', 'onerror', 'onload']);
    assert.ok(!config.ADD_ATTR.some(attribute => /^on/i.test(attribute)));
    const dom = new JSDOM('');
    try {
        const purifier = createDOMPurify(dom.window);
        for (const attribute of ['onclick', 'onerror', 'onload', 'onfocus', 'ONMOUSEOVER']) {
            const unsafe = `<img src="safe.png" ${attribute}="alert(1)"><p class="safe">Keep</p><a href="javascript:alert(1)">link</a><script>alert(2)</script><mermaid>graph TD</mermaid>`;
            const clean = purifier.sanitize(unsafe, config);
            const container = dom.window.document.createElement('div');
            container.innerHTML = clean;
            assert.equal(container.querySelector('img').getAttribute('src'), 'safe.png');
            assert.equal(container.querySelector('p.safe').textContent, 'Keep');
            assert.equal(container.querySelector('mermaid').textContent, 'graph TD');
            assert.equal(container.querySelector('script'), null);
            assert.equal(container.querySelector('a').hasAttribute('href'), false);
            assert.ok([...container.querySelectorAll('*')].every(element =>
                [...element.attributes].every(entry => !/^on/i.test(entry.name))));
        }
    } finally {
        dom.window.close();
    }
});

test('Core plan and Git guidance keep execution and checkpoint consent separate', () => {
    const plan = fs.readFileSync(planSkill, 'utf8');
    const git = fs.readFileSync(gitSkill, 'utf8');
    assert.match(plan, /explicit user approval in a separate execution turn/i);
    assert.match(plan, /Do not implement code/);
    assert.match(git, /commit or tag only after explicit user approval/i);
    assert.match(git, /Do not stage unrelated work or create a checkpoint by default/i);
});