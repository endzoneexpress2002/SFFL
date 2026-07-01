import { readdir, readFile, stat } from 'node:fs/promises';
import { join, dirname } from 'node:path';
const root = new URL('../', import.meta.url);
async function walk(dir){ const out=[]; for (const ent of await readdir(dir,{withFileTypes:true})){ const p=join(dir, ent.name); if(ent.isDirectory()) out.push(...await walk(p)); else out.push(p);} return out;}
const files = await walk(root.pathname);
const html = files.filter(f=>f.endsWith('.html'));
const missing=[];
for (const file of html){ const txt=await readFile(file,'utf8'); for (const m of txt.matchAll(/(?:href|src)=['"]([^'"]+)['"]/g)){ const ref=m[1]; if(ref.startsWith('http')||ref.startsWith('#')||ref.startsWith('mailto:')) continue; const target=join(dirname(file), ref.split('#')[0]); try{await stat(target)}catch{missing.push({file:file.replace(root.pathname,''), ref})} } }
console.log(JSON.stringify({htmlPages:html.length, checkedAt:new Date().toISOString(), missing}, null, 2));
if(missing.length) process.exit(1);
