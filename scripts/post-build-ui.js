const { execSync } = require('child_process');
const fs = require('fs');
const path = require('path');

const workspaceRoot = path.resolve(__dirname, '..');
const distUi = path.join(workspaceRoot, 'dist', 'ui');
const packagesDir = path.join(workspaceRoot, 'packages');

// حذف فایل‌های tgz قدیمی از dist/ui
fs.readdirSync(distUi)
  .filter(file => file.endsWith('.tgz'))
  .forEach(file => {
    fs.unlinkSync(path.join(distUi, file));
  });

console.log('yalc push ...');

// yalc
execSync('yalc push', {
  cwd: distUi,
  stdio: 'inherit'
});

console.log('Packing ui...');

// ساخت package
execSync('npm pack', {
  cwd: distUi,
  stdio: 'inherit'
});

// اگر پوشه packages وجود ندارد، بساز
if (!fs.existsSync(packagesDir)) {
  fs.mkdirSync(packagesDir, { recursive: true });
}

// حذف فایل‌های tgz قدیمی از packages
fs.readdirSync(packagesDir)
  .filter(file => file.endsWith('.tgz'))
  .forEach(file => {
    fs.unlinkSync(path.join(packagesDir, file));
  });

// پیدا کردن فایل جدید
const tgzFile = fs.readdirSync(distUi)
  .find(file => file.endsWith('.tgz'));

if (!tgzFile) {
  throw new Error('Package (.tgz) was not generated.');
}

// کپی فایل به packages
fs.copyFileSync(
  path.join(distUi, tgzFile),
  path.join(packagesDir, tgzFile)
);

console.log(`✅ Package copied to: ${path.join(packagesDir, tgzFile)}`);

// ...

console.log('Adding package to git...');
execSync('git add packages', {
  cwd: workspaceRoot,
  stdio: 'inherit'
});

console.log('Committing changes...');
execSync('git commit -m "build(ui): publish new package"', {
  cwd: workspaceRoot,
  stdio: 'inherit'
});

console.log('Pushing changes...');
execSync('git push', {
  cwd: workspaceRoot,
  stdio: 'inherit'
});