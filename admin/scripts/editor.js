import {EditorState} from "https://esm.sh/@codemirror/state@6";
import {EditorView, keymap, lineNumbers, highlightActiveLine} from "https://esm.sh/@codemirror/view@6";
import {defaultKeymap, history, historyKeymap} from "https://esm.sh/@codemirror/commands@6";
import {markdown} from "https://esm.sh/@codemirror/lang-markdown@6";
import {oneDark} from "https://esm.sh/@codemirror/theme-one-dark@6";

const KEY = "cc_editor_content_v1";

// Markdown-it（YAMLは自前で除去 → js-yamlで解析）
const md = window.markdownit({
  html:true, linkify:true, typographer:true,
  highlight:(str)=>{ try { return window.hljs.highlightAuto(str).value; } catch { return ""; } }
});

// テンプレ
const today = new Date().toISOString().slice(0,10);
const templates = {
  post: `---\ntitle: "タイトル"\ndate: "${today}"\nslug: "my-article"\ntags: ["ニュース"]\nsummary: "リード文（120字目安）"\ndraft: true\nauthor: "kiws"\nimage: "/images/common/ogp_default.jpg"\n---\n\n# タイトル\n\nここに本文を書きます。\n\n## セクション\n- 箇条書き\n- 箇条書き\n`,
  activity: `---\ntitle: "イベント名"\ndate: "${today}"\nslug: "event-yyyymmdd"\ntags: ["活動報告"]\nsummary: "イベントの概要を短く"\ndraft: true\nhero_image: "/images/common/ogp_default.jpg"\n---\n\n# 活動レポ\n\n- 日時:\n- 場所:\n- 参加者:\n\n## ハイライト\n1. \n2. \n`,
  news: `---\ntitle: "お知らせタイトル"\ndate: "${today}"\nslug: "notice-yyyymmdd"\ntags: ["お知らせ"]\nsummary: "お知らせの要点"\ndraft: true\nimage: "/images/common/ogp_default.jpg"\n---\n\n# お知らせ\n\n本文。\n`
};

// YAML除去＋パース → 本文レンダリング（YAMLは表示しない）
function renderWithHeader(doc){
  const headerEl = document.getElementById("headerPreview");
  const mdEl = document.getElementById("md");

  let body = doc;
  let fm = {};
  const m = doc.match(/^---\n([\s\S]*?)\n---\n?/); // 先頭のfront matterだけ対象
  if(m){
    try { fm = jsyaml.load(m[1]) || {}; } catch(_) { fm = {}; }
    body = doc.slice(m[0].length);
  }

  headerEl.innerHTML = "";
  const hero = fm.image || fm.hero_image;
  const title = fm.title || "";
  if(hero){
    headerEl.innerHTML =
      `<figure style="margin:0 0 1rem 0">
         <img src="${hero}" alt="${String(title).replaceAll('"','&quot;')}"
              style="width:100%;height:auto;border-radius:.5rem;"/>
       </figure>`;
  }
  mdEl.innerHTML = md.render(body);
}

// 初期化
const startDoc = localStorage.getItem(KEY) || templates.post;
const state = EditorState.create({
  doc: startDoc,
  extensions: [
    lineNumbers(), highlightActiveLine(), history(),
    keymap.of([...defaultKeymap, ...historyKeymap]),
    markdown(), oneDark,
    EditorView.updateListener.of(v=>{
      const text = v.state.doc.toString();
      localStorage.setItem(KEY, text);
      // プレビューは常に最新へ（Writeタブ時も更新してOK）
      renderWithHeader(text);
      document.getElementById("status").textContent = "saved (local)";
    })
  ]
});
const view = new EditorView({ state, parent: document.getElementById("editor") });
renderWithHeader(startDoc);

// ボタン（クリックで確実に反応するように素のonclickを使用）
document.getElementById("applyTemplate").onclick = ()=>{
  const sel = document.getElementById("templateSelect").value;
  if(!sel || !templates[sel]) return;
  const content = templates[sel];
  view.dispatch({ changes:{ from:0, to:view.state.doc.length, insert:content }});
  renderWithHeader(content);
  document.getElementById("status").textContent = "template inserted";
};

document.getElementById("downloadMd").onclick = ()=>{
  const blob = new Blob([view.state.doc.toString()], {type:"text/markdown;charset=utf-8"});
  const a = document.createElement("a");
  a.href = URL.createObjectURL(blob);
  a.download = "article.md";
  a.click();
  URL.revokeObjectURL(a.href);
};

document.getElementById("clearLocal").onclick = ()=>{
  localStorage.removeItem(KEY);
  document.getElementById("status").textContent = "local cleared";
};

// タブ切り替え
const tabWrite = document.getElementById("tab-write");
const tabPreview = document.getElementById("tab-preview");
const panelWrite = document.getElementById("panel-write");
const panelPreview = document.getElementById("panel-preview");

function activate(which){
  const isWrite = which === "write";
  tabWrite.setAttribute("aria-selected", String(isWrite));
  tabPreview.setAttribute("aria-selected", String(!isWrite));
  panelWrite.setAttribute("aria-hidden", String(!isWrite));
  panelPreview.setAttribute("aria-hidden", String(isWrite));
  if(!isWrite){ renderWithHeader(view.state.doc.toString()); }
}

tabWrite.onclick = ()=>activate("write");
tabPreview.onclick = ()=>activate("preview");

// ショートカット: Ctrl/Cmd+\ で切替（ここが構文エラーだと全JSが止まるので厳密に）
window.addEventListener("keydown", (e)=>{
  if ((e.ctrlKey || e.metaKey) && (e.key === "\\" || e.code === "Backslash")) {
    e.preventDefault();
    activate(tabWrite.getAttribute("aria-selected") === "true" ? "preview" : "write");
  }
});