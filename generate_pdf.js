const { spawnSync } = require('child_process');
const fs = require('fs');
const path = require('path');

const chrome = 'C:\\Program Files\\Google\\Chrome\\Application\\chrome.exe';
const html = path.resolve(__dirname, 'PROJECT_REPORT_PRINTABLE.html');
const pdf = path.resolve(__dirname, 'PROJECT_REPORT_BCA_QUANTUM_UNIVERSITY.pdf');

console.log('Target HTML:', html);
console.log('Target PDF:', pdf);

const res = spawnSync(chrome, [
  '--headless=new',
  '--disable-gpu',
  '--no-sandbox',
  '--no-pdf-header-footer',
  `--print-to-pdf=${pdf}`,
  html
], { encoding: 'utf8' });

console.log('Exit code:', res.status);
if (res.stdout) console.log('stdout:', res.stdout);
if (res.stderr) console.log('stderr:', res.stderr);

if (fs.existsSync(pdf)) {
  const stats = fs.statSync(pdf);
  console.log('SUCCESS! PDF generated with size:', stats.size, 'bytes');
} else {
  console.log('PDF was not generated.');
}
