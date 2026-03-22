/* ═══════════════════════════════════════════════════════
   CODURO — app.js   (Vanilla JS, zero dependencies)
   Works by opening index.html directly — no build needed.
═══════════════════════════════════════════════════════ */

/* ─────────────────────────────────────────────────────
   LEVELS
───────────────────────────────────────────────────── */
const LEVELS = [
  /* ── HTML ── */
  {
    id:1, chapter:"HTML Basics", icon:"🏷️",
    title:"Say Hello to the World",
    goal:'Select "Hello, World!" from the dropdown to change the heading',
    type:"dropdown", xp:30,
    controls:[
      { label:"heading text:", prop:"TEXT",
        options:["Welcome","Hello, World!","My First Page","Greetings"] }
    ],
    buildCode(v){
      return `<h1 style="font-family:sans-serif; color:#3de8c4; text-align:center;\n        margin-top:80px; font-size:30px">\n  ${v.TEXT||"Welcome"}\n</h1>`;
    },
    validate(doc){
      const h = doc.querySelector("h1");
      return h && h.textContent.trim() === "Hello, World!";
    },
    diagnose(doc){
      const h = doc.querySelector("h1");
      if(!h) return "No <h1> found — something went wrong.";
      return `Heading says "${h.textContent.trim()}" — use the dropdown to select 'Hello, World!'.`;
    },
    hints:[
      "Use the dropdown labeled 'heading text' above the editor.",
      "The h1 tag shows whatever text you pick. Try each option.",
      "Select 'Hello, World!' — that exact string is the goal."
    ]
  },
  {
    id:2, chapter:"HTML Basics", icon:"🎨",
    title:"Pick the Right Color",
    goal:"Change the box color to blue by selecting #0066ff from the dropdown",
    type:"dropdown", xp:30,
    controls:[
      { label:"background color:", prop:"COLOR",
        options:["red","green","#0066ff","orange"] }
    ],
    buildCode(v){
      const c = v.COLOR||"red";
      return `<div style="width:120px; height:120px; background:${c};\n     border-radius:16px; margin:80px auto;\n     box-shadow:0 8px 24px rgba(0,0,200,0.25)">\n</div>\n<p style="text-align:center; font-family:sans-serif;\n   color:#888; margin-top:12px; font-size:14px">\n  The box\n</p>`;
    },
    validate(doc){
      const d = doc.querySelector("div");
      if(!d) return false;
      const bg = d.style.background || d.style.backgroundColor;
      return bg==="#0066ff" || bg==="rgb(0, 102, 255)";
    },
    diagnose(doc){
      const d = doc.querySelector("div");
      if(!d) return "No box found.";
      const bg = d.style.background || d.style.backgroundColor || "none";
      return `Box color is "${bg}" — select '#0066ff' from the dropdown to make it blue.`;
    },
    hints:[
      "Use the 'background color' dropdown above the editor.",
      "CSS hex colors start with # — #0066ff is the hex code for blue.",
      "Pick '#0066ff' from the dropdown!"
    ]
  },
  {
    id:3, chapter:"HTML Basics", icon:"📝",
    title:"Add a Paragraph",
    goal:"Type a <p> tag with any text inside the dashed card",
    type:"editor", xp:40,
    starter:`<div style="font-family:sans-serif;max-width:360px;margin:40px auto;padding:24px;border:2px dashed #3de8c4;border-radius:16px">
  <h2 style="color:#3de8c4;margin-bottom:16px">My First Card</h2>
  <!-- Add your paragraph below -->

</div>`,
    validate(doc){
      const p = doc.querySelector("p");
      return p && p.textContent.trim().length > 0;
    },
    diagnose(doc){
      const p = doc.querySelector("p");
      if(!p) return "No <p> tag found yet — add one inside the card, after the comment.";
      if(!p.textContent.trim()) return "<p> tag exists but it's empty — put some text between <p> and </p>.";
      return "Almost! Make sure your <p> tag is inside the card div.";
    },
    hints:[
      "A paragraph uses the <p> tag: <p>your text here</p>",
      "Place your <p> tag after the <!-- comment -->, before </div>.",
      "Try: <p>This is my first paragraph!</p>"
    ]
  },
  {
    id:4, chapter:"HTML Basics", icon:"🔗",
    title:"Fix the Broken Link",
    goal:'Fix 2 bugs so the link shows "Visit Google" correctly',
    type:"editor", xp:50,
    starter:`<div style="font-family:sans-serif;padding:60px;text-align:center">
  <a href="https://google.com" style="color:#3de8c4;font-size:22px;text-decoration:none">
    Viit Googl
  <a>
</div>`,
    validate(doc){
      const a = doc.querySelector("a");
      return a && a.textContent.trim() === "Visit Google";
    },
    diagnose(doc){
      const a = doc.querySelector("a");
      if(!a) return "No <a> tag found — check you haven't deleted it.";
      const txt = a.textContent.trim();
      if(txt !== "Visit Google") return `Link text is "${txt}" — fix the spelling to "Visit Google" exactly.`;
      return 'Text looks right but something else is off. Make sure the closing tag is </a> with a forward slash.';
    },
    hints:[
      "Two bugs: the visible text is misspelled, and the closing tag is wrong.",
      "Fix 'Viit Googl' → 'Visit Google'. Closing tags need a slash: </a>.",
      "Fix the text AND change the bottom <a> to </a>."
    ]
  },
  {
    id:5, chapter:"HTML Basics", icon:"🖼️",
    title:"Add an Image",
    goal:'Add <img src="https://picsum.photos/200" alt="photo"> to the gallery',
    type:"editor", xp:50,
    starter:`<div style="font-family:sans-serif;text-align:center;padding:40px">
  <h3 style="color:#333;margin-bottom:20px">My Gallery</h3>
  <!-- Add your img tag here -->
</div>`,
    validate(doc){
      const i = doc.querySelector("img");
      return i && i.src && i.alt;
    },
    diagnose(doc){
      const i = doc.querySelector("img");
      if(!i) return "No <img> tag found — add one after the <!-- comment -->.";
      if(!i.src) return "<img> is missing a src attribute — add src=\"https://picsum.photos/200\".";
      if(!i.alt) return "<img> is missing an alt attribute — add alt=\"photo\" for accessibility.";
      return "Check your <img> tag — both src and alt need to have values.";
    },
    hints:[
      "Images use the self-closing <img> tag — no </img> needed.",
      "You need two attributes: src (the URL) and alt (description).",
      'Try: <img src="https://picsum.photos/200" alt="photo" style="border-radius:12px">'
    ]
  },
  /* ── CSS ── */
  {
    id:6, chapter:"CSS Basics", icon:"📐",
    title:"Give It Room to Breathe",
    goal:"Change padding from 4px to 40px to give the card more space",
    type:"editor", xp:50,
    starter:`<style>
.card {
  font-family: sans-serif;
  background: white;
  border: 2px solid #ddd;
  border-radius: 16px;
  max-width: 300px;
  margin: 40px auto;
  padding: 4px; /* change 4 to 40 */
}
</style>
<div class="card">
  <h3 style="color:#3de8c4">Hello Card</h3>
  <p style="color:#666">I need more space!</p>
</div>`,
    validate(doc){
      const c = doc.querySelector(".card");
      return c && parseInt(getComputedStyle(c).paddingTop) >= 36;
    },
    diagnose(doc){
      const c = doc.querySelector(".card");
      if(!c) return "No .card element found — check you haven't removed the class.";
      const p = parseInt(getComputedStyle(c).paddingTop);
      return `Current padding is ${p}px — it needs to be at least 36px. Change 'padding: 4px' to 'padding: 40px'.`;
    },
    hints:[
      "Padding is space INSIDE an element, between content and border.",
      "Find 'padding: 4px' and change only the number.",
      "Change 'padding: 4px' to 'padding: 40px'."
    ]
  },
  {
    id:7, chapter:"CSS Basics", icon:"🌈",
    title:"Paint the Box",
    goal:"Change background-color from gray to #e8ff47",
    type:"editor", xp:50,
    starter:`<style>
.box {
  width: 150px; height: 150px;
  border-radius: 20px;
  margin: 60px auto;
  background-color: gray; /* change to #e8ff47 */
  transition: background-color 0.4s;
}
</style>
<div class="box"></div>
<p style="text-align:center;font-family:sans-serif;color:#888;margin-top:16px">Paint me!</p>`,
    validate(doc){
      const b = doc.querySelector(".box");
      return b && getComputedStyle(b).backgroundColor === "rgb(232, 255, 71)";
    },
    diagnose(doc){
      const b = doc.querySelector(".box");
      if(!b) return "No .box element found.";
      const bg = getComputedStyle(b).backgroundColor;
      return `Box color is "${bg}" — change 'background-color: gray' to 'background-color: #e8ff47'.`;
    },
    hints:[
      "background-color sets the fill color of a CSS element.",
      "Find 'gray' and replace it with a hex color code.",
      "Change 'background-color: gray' to 'background-color: #e8ff47'."
    ]
  },
  /* ── FLEXBOX ── */
  {
    id:8, chapter:"CSS Flexbox", icon:"📦",
    title:"Center the Box",
    goal:"Set both dropdowns to 'center' to center the box horizontally AND vertically",
    type:"dropdown", xp:70,
    controls:[
      { label:"justify-content:", prop:"JC", options:["flex-start","flex-end","center","space-between"] },
      { label:"align-items:",     prop:"AI", options:["flex-start","flex-end","center","stretch"] }
    ],
    buildCode(v){
      const jc = v.JC||"flex-start", ai = v.AI||"flex-start";
      return `<style>\n* { margin:0; padding:0; box-sizing:border-box; }\n.container {\n  display: flex;\n  justify-content: ${jc};\n  align-items: ${ai};\n  width: 100%; height: 100vh;\n  background: #f5f5ff;\n}\n.box {\n  width: 100px; height: 100px;\n  background: #e8ff47;\n  border-radius: 16px;\n  box-shadow: 0 6px 20px rgba(232,255,71,0.4);\n}\n</style>\n<div class="container">\n  <div class="box"></div>\n</div>`;
    },
    validate(doc){
      const c = doc.querySelector(".container"), b = doc.querySelector(".box");
      if(!c||!b) return false;
      const cr=c.getBoundingClientRect(), br=b.getBoundingClientRect();
      return Math.abs((cr.left+cr.width/2)-(br.left+br.width/2))<25 &&
             Math.abs((cr.top+cr.height/2)-(br.top+br.height/2))<25;
    },
    diagnose(doc){
      const c = doc.querySelector(".container"), b = doc.querySelector(".box");
      if(!c||!b) return "Layout elements missing.";
      const cr=c.getBoundingClientRect(), br=b.getBoundingClientRect();
      const offH = Math.abs((cr.left+cr.width/2)-(br.left+br.width/2));
      const offV = Math.abs((cr.top+cr.height/2)-(br.top+br.height/2));
      if(offH>=25 && offV>=25) return "Box isn't centered yet — set BOTH dropdowns to 'center'.";
      if(offH>=25) return "Horizontally off — set justify-content to 'center'.";
      if(offV>=25) return "Vertically off — set align-items to 'center'.";
      return "Almost there — try adjusting both dropdowns.";
    },
    hints:[
      "justify-content = horizontal position; align-items = vertical position.",
      "To center in BOTH directions, both properties need the same value.",
      "Set BOTH dropdowns to 'center'."
    ]
  },
  {
    id:9, chapter:"CSS Flexbox", icon:"📊",
    title:"Space Them Out",
    goal:"Select 'space-between' to spread the boxes across the full row",
    type:"dropdown", xp:60,
    controls:[
      { label:"justify-content:", prop:"JC", options:["flex-start","center","space-between","space-around"] }
    ],
    buildCode(v){
      const jc = v.JC||"flex-start";
      return `<style>\n* { margin:0; box-sizing:border-box; }\n.row {\n  display: flex;\n  justify-content: ${jc};\n  align-items: center;\n  padding: 40px;\n  height: 100vh;\n  background: #f5f5ff;\n}\n.item {\n  width: 80px; height: 80px;\n  border-radius: 14px;\n  display: flex;\n  align-items: center;\n  justify-content: center;\n  font-size: 28px;\n}\n.item:nth-child(1) { background: #e8ff47; }\n.item:nth-child(2) { background: #3de8c4; }\n.item:nth-child(3) { background: #ff6b6b; }\n</style>\n<div class="row">\n  <div class="item">🎮</div>\n  <div class="item">🎨</div>\n  <div class="item">🚀</div>\n</div>`;
    },
        validate(doc){
      const row = doc.querySelector(".row");
      if (!row) return false;
      const jc = getComputedStyle(row).justifyContent;
      return jc.includes("space-between");
    },
    diagnose(doc){
      const row = doc.querySelector(".row");
      if(!row) return "No .row element found.";
      const jc = getComputedStyle(row).justifyContent;
      return `justify-content is currently '${jc}' — select 'space-between' from the dropdown.`;
    },
    hints:[
      "justify-content controls distribution of flex children along the row.",
      "'space-between' puts equal gaps BETWEEN items, touching the edges.",
      "Choose 'space-between' from the dropdown!"
    ]
  },
  {
    id:10, chapter:"CSS Flexbox", icon:"🔧",
    title:"Fix the Layout Bug",
    goal:"Change 'display: block' to 'display: flex' so cards appear in a row",
    type:"editor", xp:70,
    starter:`<style>
body{font-family:sans-serif;background:#f5f5ff;margin:0;padding:20px}
.row {
  display: block; /* BUG: change to flex */
  gap: 14px;
}
.card{background:white;border-radius:14px;padding:20px;border:2px solid #e0e0e0;flex:1}
</style>
<div class="row">
  <div class="card"><h3 style="color:#3de8c4">Card 1</h3><p>HTML</p></div>
  <div class="card"><h3 style="color:#e8ff47">Card 2</h3><p>CSS</p></div>
  <div class="card"><h3 style="color:#ff6b6b">Card 3</h3><p>JS</p></div>
</div>`,
    validate(doc){
      const cards = doc.querySelectorAll(".card");
      if(cards.length<3) return false;
      const r0=cards[0].getBoundingClientRect(), r1=cards[1].getBoundingClientRect();
      return Math.abs(r0.top-r1.top)<20 && r1.left>r0.right-5;
    },
    diagnose(doc){
      const row = doc.querySelector(".row");
      const cards = doc.querySelectorAll(".card");
      if(!row) return "No .row element found — check you haven't removed it.";
      if(cards.length<3) return "Some cards are missing — check you haven't deleted any.";
      const display = getComputedStyle(row).display;
      return `'.row' has display:'${display}' — change it from 'block' to 'flex' so cards sit side by side.`;
    },
    hints:[
      "'display: block' stacks elements vertically. You need a different value.",
      "To make elements sit side-by-side in a row, use 'display: flex'.",
      "Change 'display: block' to 'display: flex' on .row."
    ]
  },
  /* ── JAVASCRIPT ── */
  {
    id:11, chapter:"JavaScript", icon:"⚡",
    title:"Make the Button Work",
    goal:'Change onclick="" to onclick="handleClick()" to wire up the button',
    type:"editor", xp:80,
    starter:`<div style="font-family:sans-serif;text-align:center;padding:60px">
  <button id="myBtn" onclick=""
    style="padding:12px 28px;background:#e8ff47;color:#111;border:none;border-radius:10px;font-size:16px;font-weight:bold;cursor:pointer">
    Click Me!
  </button>
  <div id="msg" style="margin-top:20px;font-size:18px;color:#3de8c4;font-weight:bold"></div>
</div>
<script>
function handleClick() {
  document.getElementById('msg').textContent = 'You clicked me!';
}
</script>`,
    validateAdv:true,
    validateFn:`var btn=document.getElementById('myBtn');var msg=document.getElementById('msg');if(!btn||!msg)return false;btn.click();return msg.textContent.trim()==='You clicked me!';`,
    diagnoseFn:`var btn=document.getElementById('myBtn');if(!btn)return'Button #myBtn not found.';var attr=btn.getAttribute('onclick')||'';if(attr.trim()==='')return'onclick is still empty — change onclick="" to onclick="handleClick()".';if(!attr.includes('handleClick'))return'onclick calls "'+attr+'" but should call handleClick().';return'Button looks wired up but message did not appear. Check the spelling of handleClick().';`,
    hints:[
      "The button has onclick=\"\" — empty. It needs to call a function.",
      "There's already a function called handleClick() in the script.",
      "Change onclick=\"\" to onclick=\"handleClick()\"."
    ]
  },
  {
    id:12, chapter:"JavaScript", icon:"🔄",
    title:"Toggle the Color",
    goal:"Replace '___' with '#e8ff47' so clicking the box toggles its color",
    type:"editor", xp:90,
    starter:`<div style="font-family:sans-serif;text-align:center;padding:40px">
  <div id="box" onclick="toggleColor()"
    style="width:120px;height:120px;background:#3de8c4;border-radius:16px;margin:0 auto;cursor:pointer;transition:background 0.3s">
  </div>
  <p style="color:#888;margin-top:16px;font-size:14px">Click the box!</p>
</div>
<script>
var isLime = false;
function toggleColor() {
  var box = document.getElementById('box');
  if (!isLime) {
    box.style.background = '___'; /* lime color */
    isLime = true;
  } else {
    box.style.background = '#3de8c4';
    isLime = false;
  }
}
</script>`,
    validateAdv:true,
    validateFn:`var box=document.getElementById('box');if(!box)return false;box.click();return box.style.backgroundColor==="rgb(232, 255, 71)";`,
    diagnoseFn:`var src=document.documentElement.innerHTML;if(src.includes("'___'"))return"Still has the placeholder '___' — replace it with '#e8ff47' (keep the quotes).";var box=document.getElementById('box');if(!box)return"Box element not found.";return"The color isn't toggling correctly. Make sure you replaced only '___' and kept the surrounding single quotes.";`,
    hints:[
      "Find the '___' placeholder inside toggleColor.",
      "You need a hex color string for lime yellow, inside the existing quotes.",
      "Replace '___' with '#e8ff47' (keep the quotes)."
    ]
  },

  {
    id:13, chapter:"JavaScript", icon:"📋",
    title:"Build a List",
    goal:"Replace '___' with 'li' so clicking Add creates real list items",
    type:"editor", xp:100,
    starter:`<div style="font-family:sans-serif;max-width:280px;margin:40px auto;padding:20px">
  <button onclick="addItem()"
    style="width:100%;padding:10px;background:#e8ff47;color:#111;border:none;border-radius:10px;cursor:pointer;font-size:15px;font-weight:bold">
    + Add Item
  </button>
  <ul id="list" style="margin-top:16px;padding-left:20px;color:#333"></ul>
</div>
<script>
function addItem() {
  var list = document.getElementById('list');
  var item = document.createElement('___');
  item.textContent = 'New Item';
  list.appendChild(item);
}
</script>`,
    validateAdv:true,
    validateFn:`var list=document.getElementById('list');var btn=document.querySelector('button');if(!list||!btn)return false;btn.click();return list.querySelectorAll('li').length>0;`,
    diagnoseFn:`var src=document.documentElement.innerHTML;if(src.includes("createElement('___')"))return"Still has the placeholder — replace '___' with 'li' (keep the quotes).";var list=document.getElementById('list');var btn=document.querySelector('button');if(!btn)return"Button not found.";btn.click();return list&&list.querySelectorAll('li').length===0?"Items aren't appearing. Check createElement has 'li' in lowercase with quotes.":'';`,
    hints:[
      "document.createElement() takes an HTML tag name as a string.",
      "You're adding items to a <ul>. What tag lives inside a ul?",
      "Replace '___' with 'li' (keep the quotes)."
    ]
  },
  {
    id:14, chapter:"JavaScript", icon:"⏱️",
    title:"Build a Counter",
    goal:"Write 2 lines inside increment() to add 1 to count and update the display",
    type:"editor", xp:110,
    starter:`<div style="font-family:sans-serif;text-align:center;padding:40px">
  <div id="count" style="font-size:80px;font-weight:900;color:#e8ff47;line-height:1">0</div>
  <p style="color:#888;margin:6px 0 24px;font-size:14px">clicks</p>
  <button onclick="increment()"
    style="padding:14px 36px;background:#e8ff47;color:#111;border:none;border-radius:50px;cursor:pointer;font-size:18px;font-weight:bold">
    Count!
  </button>
</div>
<script>
var count = 0;
function increment() {
  /* 1. add 1 to count */
  /* 2. update the #count element's text */
}
</script>`,
    validateAdv:true,
    validateFn:`var d=document.getElementById('count');var b=document.querySelector('button');if(!d||!b)return false;b.click();b.click();b.click();return parseInt(d.textContent)>=3;`,
    diagnoseFn:`var d=document.getElementById('count');var b=document.querySelector('button');if(!d||!b)return"Elements missing — check you haven't removed #count or the button.";var before=parseInt(d.textContent)||0;b.click();var after=parseInt(d.textContent)||0;if(after===before)return"Clicking Count! does nothing yet. Add 'count++' inside increment().";if(isNaN(parseInt(d.textContent)))return"count is changing but the display isn't updating. Add: document.getElementById('count').textContent = count;";return"Counter isn't incrementing correctly — make sure you have both count++ and the textContent update.";`,
    hints:[
      "You need two lines: change the variable, then update the DOM.",
      "count++ adds 1. Then update the element's textContent.",
      "Add: count++;  then:  document.getElementById('count').textContent = count;"
    ]
  },
  {
    id:15, chapter:"JavaScript", icon:"🎮",
    title:"Mini Project: Click Game",
    goal:"Replace '___' with any victory message string to complete the game",
    type:"editor", xp:150,
    starter:`<style>
*{box-sizing:border-box}body{font-family:sans-serif;background:#f5f5ff;margin:0}
.game{text-align:center;padding:32px}
#score{font-size:60px;font-weight:900;color:#3de8c4}
#target{width:110px;height:110px;background:#e8ff47;border-radius:50%;margin:20px auto;cursor:pointer;transition:transform 0.1s;display:flex;align-items:center;justify-content:center;font-size:38px;user-select:none;border:none;font-family:sans-serif}
#target:active{transform:scale(0.88)}
#msg{font-size:22px;color:#ff6b6b;font-weight:900;min-height:32px;margin-top:10px}
</style>
<div class="game">
  <div id="score">0</div>
  <p style="color:#888;font-size:13px">Hit 10 to win!</p>
  <button id="target" onclick="hit()">🎯</button>
  <div id="msg"></div>
</div>
<script>
var score = 0;
function hit() {
  score++;
  document.getElementById('score').textContent = score;
  if (score >= 10) {
    document.getElementById('msg').textContent = '___';
    document.getElementById('target').onclick = null;
  }
}
</script>`,
    validateAdv:true,
    validateFn:`var t=document.getElementById('target');var m=document.getElementById('msg');if(!t||!m)return false;for(var i=0;i<10;i++)t.click();var txt=m.textContent.trim();return txt.length>0&&txt!=='___';`,
    diagnoseFn:`var src=document.documentElement.innerHTML;if(src.includes("'___'"))return"Still has the placeholder '___' — replace it with any win message like 'You Win! 🎉' (keep the quotes).";return"Message isn't showing after 10 clicks. Make sure you only replaced '___' and kept the surrounding single quotes.";`,
    hints:[
      "The game logic works — just find the '___' placeholder.",
      "When score hits 10, the code sets msg text. It needs a real string.",
      "Replace '___' with any text like 'You Win! 🎉' (keep the quotes)."
    ]
  },
  /* ── CSS GRID ── */
  {
    id:16, chapter:"CSS Grid", icon:"🔲",
    title:"Create a 3-Column Grid",
    goal:"Change grid-template-columns to repeat(3, 1fr) for 3 equal columns",
    type:"editor", xp:80,
    starter:`<style>
body{font-family:sans-serif;padding:16px;background:#f5f5ff}
.grid {
  display: grid;
  grid-template-columns: 1fr; /* change to 3 equal columns */
  gap: 14px;
}
.cell{background:white;border:2px solid #3de8c4;border-radius:12px;padding:20px;text-align:center;color:#3de8c4;font-weight:800;font-size:20px}
</style>
<div class="grid">
  <div class="cell">1</div><div class="cell">2</div><div class="cell">3</div>
  <div class="cell">4</div><div class="cell">5</div><div class="cell">6</div>
</div>`,
    validate(doc){
      const cells = doc.querySelectorAll(".cell");
      if(cells.length<6) return false;
      const r0=cells[0].getBoundingClientRect(), r1=cells[1].getBoundingClientRect(), r3=cells[3].getBoundingClientRect();
      return Math.abs(r0.top-r1.top)<10 && r3.top>r0.bottom-5;
    },
    diagnose(doc){
      const cells = doc.querySelectorAll(".cell");
      if(cells.length<6) return "Some cells are missing — check you haven't deleted any divs.";
      const r0=cells[0].getBoundingClientRect(), r1=cells[1].getBoundingClientRect();
      if(Math.abs(r0.top-r1.top)>=10) return "Cells are still stacking vertically — change grid-template-columns from '1fr' to 'repeat(3, 1fr)'.";
      return "Cells are in a row but not 3 equal columns. Use exactly repeat(3, 1fr).";
    },
    hints:[
      "grid-template-columns defines column count and width.",
      "repeat(N, size) creates N equal columns. 1fr = equal share of space.",
      "Change '1fr' to 'repeat(3, 1fr)'."
    ]
  },
  {
    id:17, chapter:"CSS Grid", icon:"🃏",
    title:"Two-Column Card Grid",
    goal:"Change display:flex to display:grid and add grid-template-columns + gap",
    type:"editor", xp:90,
    starter:`<style>
body{font-family:sans-serif;background:#f0f0ff;margin:0;padding:18px}
.cards {
  display: flex; /* change to grid */
  /* add: grid-template-columns: repeat(2, 1fr); */
  /* add: gap: 18px; */
}
.card{background:white;border-radius:16px;padding:22px;box-shadow:0 4px 14px rgba(0,0,0,0.07)}
.card h3{margin:0 0 6px} .card p{color:#888;margin:0;font-size:13px}
</style>
<div class="cards">
  <div class="card"><h3 style="color:#3de8c4">🏷️ HTML</h3><p>Structure</p></div>
  <div class="card"><h3 style="color:#e8ff47">🎨 CSS</h3><p>Style</p></div>
  <div class="card"><h3 style="color:#ff6b6b">⚡ JS</h3><p>Behavior</p></div>
  <div class="card"><h3 style="color:#a78bfa">🚀 Ship</h3><p>Deploy</p></div>
</div>`,
    validate(doc){
      const cards = doc.querySelectorAll(".card");
      if(cards.length<4) return false;
      const r0=cards[0].getBoundingClientRect(), r1=cards[1].getBoundingClientRect(), r2=cards[2].getBoundingClientRect();
      return Math.abs(r0.top-r1.top)<20 && r1.left>r0.right-5 && r2.top>r0.bottom-5;
    },
    diagnose(doc){
      const cards = doc.querySelectorAll(".card");
      if(cards.length<4) return "Some cards are missing — check you haven't deleted any divs.";
      const container = doc.querySelector(".cards");
      if(!container) return "No .cards container found.";
      const display = getComputedStyle(container).display;
      if(display !== "grid") return `'.cards' has display:'${display}' — change it to 'grid' first.`;
      const cols = getComputedStyle(container).gridTemplateColumns;
      if(!cols.includes(" ")) return "Only 1 column defined — add 'grid-template-columns: repeat(2, 1fr);' to .cards.";
      return "Layout is close — make sure you have display:grid, repeat(2, 1fr) columns, and gap:18px.";
    },
    hints:[
      "Change 'display: flex' to 'display: grid' first.",
      "Then add 'grid-template-columns: repeat(2, 1fr);' for 2 equal columns.",
      "Full fix: display:grid; grid-template-columns:repeat(2,1fr); gap:18px;"
    ]
  },
  /* ── ADVANCED JS ── */
  {
    id:18, chapter:"Advanced JS", icon:"🎭",
    title:"Add a CSS Class with JS",
    goal:"Replace '___' with '.card' so querySelectorAll finds the right elements",
    type:"editor", xp:120,
    starter:`<style>
body{font-family:sans-serif;background:#f0f0ff;margin:0}
.card{background:white;border-radius:16px;padding:28px;margin:16px;box-shadow:0 4px 20px rgba(0,0,0,0.08);opacity:0;transform:translateY(28px);transition:opacity 0.5s,transform 0.5s}
.card.visible{opacity:1;transform:translateY(0)}
</style>
<div class="card"><h2>Card 1 🎨</h2><p>Fade me in!</p></div>
<div class="card"><h2>Card 2 🚀</h2><p>Me too!</p></div>
<div class="card"><h2>Card 3 ⚡</h2><p>And me!</p></div>
<script>
var cards = document.querySelectorAll('___');
cards.forEach(function(card) { card.classList.add('visible'); });
</script>`,
    validateAdv:true,
    validateFn:`var cards=document.querySelectorAll('.card');return Array.prototype.every.call(cards,function(c){return c.classList.contains('visible');});`,
    diagnoseFn:`var src=document.documentElement.innerHTML;if(src.includes("querySelectorAll('___')"))return"Still has the placeholder '___' — replace it with '.card' (keep the quotes).";var cards=document.querySelectorAll('.card');var hidden=Array.prototype.filter.call(cards,function(c){return!c.classList.contains('visible');});if(hidden.length>0)return hidden.length+" card(s) still hidden. Make sure the selector is '.card' with a dot before card.";return"Cards aren't becoming visible. Check the querySelector argument has a dot: '.card'.";`,
    hints:[
      "querySelectorAll takes a CSS selector string. Class selectors start with a dot.",
      "To select elements with class 'card', the selector is '.card'.",
      "Replace '___' with '.card' (keep the quotes)."
    ]
  },
  {
    id:19, chapter:"Advanced JS", icon:"📡",
    title:"Fetch Data from an API",
    goal:"Replace '___' with 'json' to parse the fetch response",
    type:"editor", xp:130,
    starter:`<div style="font-family:sans-serif;max-width:360px;margin:40px auto;text-align:center;padding:20px">
  <h2 style="color:#3de8c4;margin-bottom:16px">😂 Random Joke</h2>
  <div id="joke" style="font-size:15px;color:#333;line-height:1.6;padding:20px;background:white;border-radius:14px;margin-bottom:16px;min-height:60px;border:2px solid #e0e0e0">
    Click to load!
  </div>
  <button onclick="loadJoke()"
    style="padding:12px 28px;background:#e8ff47;color:#111;border:none;border-radius:10px;cursor:pointer;font-size:15px;font-weight:bold">
    Load Joke 🎲
  </button>
</div>
<script>
async function loadJoke() {
  var res = await fetch('https://v2.jokeapi.dev/joke/Programming?type=single');
  var data = await res.___();
  document.getElementById('joke').textContent = data.joke;
}
</script>`,
    validateAdv:true,
    validateFn:`var el=document.getElementById('joke');if(!el)return false;var src=document.documentElement.innerHTML;if(src.includes('res.___()'))return false;return el.textContent.trim()!=='Click to load!';`,
    diagnoseFn:`var src=document.documentElement.innerHTML;if(src.includes("res.___()"))return"Still has the placeholder — replace '___' with 'json' so it reads: res.json()";return"Joke isn't loading. Make sure you wrote res.json() — the method that parses the API response as JSON.";`,
    hints:[
      "After fetch(), you need to read the response body.",
      "The Response object has a method specifically for parsing JSON.",
      "Replace '___' with 'json' — res.json() parses the response."
    ]
  },
  {
    id:20, chapter:"Mini Project", icon:"🏆",
    title:"Final Boss: Debug the Todo App",
    goal:"Fix 3 bugs: broken Add button, broken delete, and wrong counter",
    type:"editor", xp:200,
    starter:`<style>
*{box-sizing:border-box}body{font-family:sans-serif;background:#f0f0ff;margin:0}
.app{max-width:360px;margin:24px auto;background:white;border-radius:20px;padding:22px;box-shadow:0 8px 32px rgba(0,0,0,0.1)}
h1{color:#3de8c4;margin:0 0 6px;font-size:20px}
#counter{font-size:12px;color:#999;margin-bottom:14px}
.row{display:flex;gap:8px;margin-bottom:14px}
input[type="text"]{flex:1;padding:10px 14px;border:2px solid #e0e0e0;border-radius:10px;font-size:14px;outline:none;font-family:inherit}
input[type="text"]:focus{border-color:#3de8c4}
.add-btn{padding:10px 16px;background:#e8ff47;color:#111;border:none;border-radius:10px;cursor:pointer;font-size:14px;font-weight:bold;font-family:inherit}
#list{list-style:none;padding:0;margin:0}
#list li{display:flex;align-items:center;gap:10px;padding:9px 0;border-bottom:1px solid #f0f0f0;font-size:14px}
#list li:last-child{border-bottom:none}
#list span{flex:1;color:#333}
.done-text{text-decoration:line-through;color:#bbb}
.del-btn{background:none;border:none;color:#ff6b6b;cursor:pointer;font-size:16px;padding:0 4px;font-family:inherit}
.check{width:16px;height:16px;cursor:pointer;accent-color:#3de8c4}
</style>
<div class="app">
  <h1>✅ My Todos</h1>
  <div id="counter">0 tasks</div>
  <div class="row">
    <input type="text" id="inp" placeholder="Add a task...">
    <button class="add-btn" onclick="addTodo()">Add</button>
  </div>
  <ul id="list"></ul>
</div>
<script>
var todos = [];

function addTodo() {
  var input = document.getElementById('inp');
  var text = input.value.trim();
  if (!text) return;

  /* BUG 1: push is called with wrong property name */
  todos.push({ txt: text, done: flase });

  input.value = '';
  render();
}

function deleteTodo(i) {
  /* BUG 2: splice removes wrong number of items */
  todos.splice(i, 0);
  render();
}

function toggleTodo(i) {
  todos[i].done = !todos[i].done;
  render();
}

function render() {
  var list = document.getElementById('list');
  list.innerHTML = '';

  todos.forEach(function(todo, i) {
    var li = document.createElement('li');

    var cb = document.createElement('input');
    cb.type = 'checkbox';
    cb.className = 'check';
    cb.checked = todo.done;
    cb.onchange = function() { toggleTodo(i); };

    var span = document.createElement('span');
    span.textContent = todo.txt;
    if (todo.done) span.className = 'done-text';

    var del = document.createElement('button');
    del.className = 'del-btn';
    del.textContent = '✕';
    del.onclick = function() { deleteTodo(i); };

    li.appendChild(cb);
    li.appendChild(span);
    li.appendChild(del);
    list.appendChild(li);
  });

  /* BUG 3: counter shows total instead of remaining (not done) tasks */
  var count = todos.length;
  document.getElementById('counter').textContent = count + ' tasks';
}
</script>`,
    validateAdv:true,
    validateFn:`
      var inp = document.getElementById('inp');
      var list = document.getElementById('list');
      var counter = document.getElementById('counter');
      if (!inp || !list || !counter) return false;
      // Test Bug 1: add a todo
      inp.value = 'Buy milk';
      document.querySelector('.add-btn').click();
      var items = list.querySelectorAll('li');
      if (items.length === 0) return false;
      // Test Bug 2: delete works
      var delBtn = list.querySelector('.del-btn');
      if (!delBtn) return false;
      inp.value = 'Walk dog';
      document.querySelector('.add-btn').click();
      list.querySelector('.del-btn').click();
      if (list.querySelectorAll('li').length !== 1) return false;
      // Test Bug 3: counter shows remaining not total
      var cb = list.querySelector('.check');
      if (!cb) return false;
      cb.onchange && cb.onchange();
      var txt = document.getElementById('counter').textContent;
      return txt.includes('0') || txt.toLowerCase().includes('remain') || txt.includes('left');
    `,
    diagnoseFn:`
      var inp = document.getElementById('inp');
      var list = document.getElementById('list');
      if (!inp || !list) return "App elements missing — check you haven't removed key HTML.";
      // Check Bug 1
      try {
        inp.value = 'Test';
        document.querySelector('.add-btn').click();
      } catch(e) {
        return "Bug 1: addTodo() crashed — 'flase' is a typo, change it to false.";
      }
      if (list.querySelectorAll('li').length === 0) return "Bug 1 not fixed yet — check addTodo(). Hint: look for a typo in the push() call.";
      // Check Bug 2
      var before = list.querySelectorAll('li').length;
      list.querySelector('.del-btn').click();
      var after = list.querySelectorAll('li').length;
      if (after === before) return "Bug 2 not fixed — deleteTodo() isn't removing the item. Check the second argument of splice().";
      // Check Bug 3
      inp.value = 'Done task';
      document.querySelector('.add-btn').click();
      var cb = list.querySelector('.check');
      if (cb) { cb.checked = true; cb.onchange && cb.onchange(); }
      var txt = document.getElementById('counter').textContent;
      if (!txt.includes('0') && !txt.toLowerCase().includes('remain') && !txt.includes('left')) return "Bug 3 not fixed — counter should show remaining (not done) tasks, not the total length.";
      return "";
    `,
    hints:[
      "There are 3 bugs. Start with addTodo() — look very carefully at the push() call for a typo.",
      "Bug 2 is in deleteTodo() — splice(i, 0) removes 0 items. How many should it remove?",
      "Bug 3: the counter shows todos.length (total). Change it to count only todos where done is false."
    ]
  }
];

/* ─────────────────────────────────────────────────────
   STATE  (plain object — mutate then call render())
───────────────────────────────────────────────────── */
const S = {
  lvIdx:     0,
  xp:        0,
  streak:    0,
  completed: [],   // array of completed level indices
  solved:    false,
  hintIdx:   0,    // how many hints revealed so far (0 = none shown yet)
  isLight:   false,
  dropVals:  {},   // { PROP: "value" } for current dropdown level
};

/* ─────────────────────────────────────────────────────
   STORAGE
───────────────────────────────────────────────────── */
function saveState() {
  try {
    localStorage.setItem("codura_v2", JSON.stringify({
      lvIdx: S.lvIdx, xp: S.xp, streak: S.streak, completed: S.completed
    }));
  } catch(e) {}
}
function loadState() {
  try {
    const raw = localStorage.getItem("codura_v2");
    if (!raw) return;
    const saved = JSON.parse(raw);
    S.lvIdx     = saved.lvIdx     ?? 0;
    S.xp        = saved.xp        ?? 0;
    S.streak    = saved.streak    ?? 0;
    S.completed = saved.completed ?? [];
  } catch(e) {}
}

/* ─────────────────────────────────────────────────────
   DOM REFS  (grabbed once after DOMContentLoaded)
───────────────────────────────────────────────────── */
let DOM = {};
function grabDOM() {
  DOM = {
    splash:       document.getElementById("splash"),
    app:          document.getElementById("app"),
    lvBadge:      document.getElementById("lv-badge"),
    xpPill:       document.getElementById("xp-pill"),
    streakPill:   document.getElementById("streak-pill"),
    btnTheme:     document.getElementById("btn-theme"),
    goalText:     document.getElementById("goal-text"),
    stars:        [document.getElementById("star1"), document.getElementById("star2"), document.getElementById("star3")],
    progFill:     document.getElementById("prog-fill"),
    progLabel:    document.getElementById("prog-label"),
    frame:        document.getElementById("preview-frame"),
    successOverlay: document.getElementById("success-overlay"),
    successXp:    document.getElementById("success-xp"),
    controlsPane: document.getElementById("controls-pane"),
    controlsInner:document.getElementById("controls-inner"),
    fileLabel:    document.getElementById("file-label"),
    btnMap:       document.getElementById("btn-map"),
    btnHint:      document.getElementById("btn-hint"),
    btnRun:       document.getElementById("btn-run"),
    btnNext:      document.getElementById("btn-next"),
    lineNums:     document.getElementById("line-nums"),
    editor:       document.getElementById("code-editor"),
    hintPanel:    document.getElementById("hint-panel"),
    hintHead:     document.getElementById("hint-head"),
    hintBody:     document.getElementById("hint-body"),
    hdots:        [document.getElementById("hdot0"), document.getElementById("hdot1"), document.getElementById("hdot2")],
    modalBg:      document.getElementById("modal-bg"),
    modalClose:   document.getElementById("modal-close"),
    mapContent:   document.getElementById("map-content"),
    toast:        document.getElementById("toast"),
    feedbackPanel:document.getElementById("feedback-panel"),
    feedbackText: document.getElementById("feedback-text"),
    completionBg: document.getElementById("completion-bg"),
  };
}

/* ─────────────────────────────────────────────────────
   IFRAME HELPERS
───────────────────────────────────────────────────── */
function wrapHTML(src) {
  return `<!DOCTYPE html><html><head><meta charset="UTF-8">
<style>*{margin:0;padding:0;box-sizing:border-box}body{font-family:sans-serif}</style>
</head><body>${src}</body></html>`;
}

// Write to iframe and call cb once it has loaded
function loadFrame(src, cb) {
  const frame = DOM.frame;
  frame.onload = null; // clear any previous handler
  if (cb) {
    frame.onload = () => { frame.onload = null; cb(); };
  }
  frame.srcdoc = wrapHTML(src);
}

/* ─────────────────────────────────────────────────────
   VALIDATE
───────────────────────────────────────────────────── */
function validate() {
  if (S.solved) return;
  const lv = LEVELS[S.lvIdx];
  const frame = DOM.frame;
  try {
    let passed = false;
    let feedbackMsg = "";
    if (lv.validateAdv) {
      const win = frame.contentWindow;
      if (!win) return;
      passed = win.eval(`(function(){${lv.validateFn}})()`);
      if (!passed && lv.diagnoseFn) {
        try { feedbackMsg = win.eval(`(function(){${lv.diagnoseFn}})()`) || ""; } catch(e) {}
      }
    } else {
      const doc = frame.contentDocument || frame.contentWindow.document;
      passed = lv.validate(doc);
      if (!passed && lv.diagnose) {
        try { feedbackMsg = lv.diagnose(doc) || ""; } catch(e) {}
      }
    }
    if (passed) {
      DOM.feedbackPanel.style.display = "none";
      triggerWin();
    } else if (feedbackMsg) {
      DOM.feedbackText.textContent = "❌ " + feedbackMsg;
      DOM.feedbackPanel.style.display = "block";
    }
  } catch(e) { /* not solved yet */ }
}

/* ─────────────────────────────────────────────────────
   PREVIEW  — update iframe without validating (auto-run)
───────────────────────────────────────────────────── */
function preview(srcOverride) {
  const src = srcOverride !== undefined ? srcOverride : DOM.editor.value;
  loadFrame(src); // no validate — just show the result
}

/* ─────────────────────────────────────────────────────
   RUN  — load iframe then validate (▶ Run button only)
───────────────────────────────────────────────────── */
function run(srcOverride) {
  const src = srcOverride !== undefined ? srcOverride : DOM.editor.value;
  loadFrame(src, validate);
}

/* ─────────────────────────────────────────────────────
   WIN
───────────────────────────────────────────────────── */
function triggerWin() {
  if (S.solved) return;
  S.solved = true;

  const lv = LEVELS[S.lvIdx];
  const isNew = !S.completed.includes(S.lvIdx);

  if (isNew) {
    S.xp += lv.xp;
    S.completed.push(S.lvIdx);
    saveState();
    renderTopbar();
    spawnXP(lv.xp);
    spawnConfetti();
  }

  // stars: 3 minus how many hints were used
  const starsEarned = Math.max(1, 3 - S.hintIdx);
  renderStars(starsEarned);

  DOM.successXp.textContent = `+${lv.xp} XP`;
  DOM.successOverlay.style.display = "flex";
  // Overlay stays visible until user clicks "Next →"

  // unlock Next button
  DOM.btnNext.classList.add("unlocked");
}

/* ─────────────────────────────────────────────────────
   LOAD LEVEL
───────────────────────────────────────────────────── */
function loadLevel(idx) {
  idx = Math.max(0, Math.min(idx, LEVELS.length - 1));
  S.lvIdx   = idx;
  S.solved  = false;
  S.hintIdx = 0;
  S.dropVals = {};

  const lv = LEVELS[idx];

  // reset UI
  DOM.hintPanel.style.display = "none";
  DOM.successOverlay.style.display = "none";
  DOM.btnNext.classList.remove("unlocked");
  DOM.feedbackPanel.style.display = "none";
  DOM.feedbackText.textContent = "";
  renderStars(0);
  renderTopbar();

  // goal + progress
  DOM.goalText.textContent = lv.goal;
  const pct = ((idx + 1) / LEVELS.length * 100).toFixed(0);
  DOM.progFill.style.width = pct + "%";
  DOM.progLabel.textContent = `${idx + 1}/${LEVELS.length}`;

  if (lv.type === "dropdown") {
    // Build initial drop values from first option of each control
    lv.controls.forEach(c => { S.dropVals[c.prop] = c.options[0]; });
    buildDropdownControls(lv);
    DOM.controlsPane.style.display = "block";
    DOM.fileLabel.textContent = "🎛️  controls";
    const initialCode = lv.buildCode(S.dropVals);
    DOM.editor.value = initialCode;
    DOM.editor.readOnly = true;
    DOM.editor.style.opacity = "0.5";
    updateLineNums();
    loadFrame(initialCode); // no validate on initial load
  } else {
    DOM.controlsPane.style.display = "none";
    DOM.fileLabel.textContent = "📝  code.html";
    DOM.editor.value = lv.starter;
    DOM.editor.readOnly = false;
    DOM.editor.style.opacity = "1";
    updateLineNums();
    loadFrame(lv.starter); // no validate on initial load
  }
}

/* ─────────────────────────────────────────────────────
   DROPDOWN CONTROLS
───────────────────────────────────────────────────── */
function buildDropdownControls(lv) {
  DOM.controlsInner.innerHTML = "";
  lv.controls.forEach(ctrl => {
    const row = document.createElement("div");
    row.className = "ctrl-row";

    const lbl = document.createElement("div");
    lbl.className = "ctrl-label";
    lbl.textContent = ctrl.label;

    const sel = document.createElement("select");
    sel.className = "ctrl-select";
    ctrl.options.forEach(opt => {
      const o = document.createElement("option");
      o.value = opt;
      o.textContent = opt;
      sel.appendChild(o);
    });

    sel.addEventListener("change", () => {
      S.dropVals[ctrl.prop] = sel.value;
      const newCode = lv.buildCode(S.dropVals);
      DOM.editor.value = newCode;
      updateLineNums();
      preview(newCode);  // show result, no auto-validate
    });

    row.appendChild(lbl);
    row.appendChild(sel);
    DOM.controlsInner.appendChild(row);
  });
}

/* ─────────────────────────────────────────────────────
   RENDER HELPERS
───────────────────────────────────────────────────── */
function renderTopbar() {
  const lv = LEVELS[S.lvIdx];
  DOM.lvBadge.textContent = `Lv ${lv.id}/${LEVELS.length}`;
  DOM.xpPill.textContent  = `⚡ ${S.xp}`;
  DOM.streakPill.textContent = `🔥 ${S.streak}`;
}

function renderStars(n) {
  DOM.stars.forEach((el, i) => {
    el.classList.toggle("lit", i < n);
  });
}

function updateLineNums() {
  const lines = DOM.editor.value.split("\n").length;
  DOM.lineNums.textContent = Array.from({length: lines}, (_, i) => i + 1).join("\n");
}

/* ─────────────────────────────────────────────────────
   HINT
───────────────────────────────────────────────────── */
function showHint() {
  const lv = LEVELS[S.lvIdx];
  const hints = lv.hints;

  // If panel is hidden, just show it (starts at hint 0)
  if (DOM.hintPanel.style.display === "none") {
    DOM.hintPanel.style.display = "block";
  } else {
    // If already visible, advance to the next hint
    if (S.hintIdx < hints.length - 1) S.hintIdx++;
  }

  const i = S.hintIdx;
  DOM.hintHead.textContent = `💡 Hint ${i + 1}/${hints.length}`;
  DOM.hintBody.textContent = hints[i];

  // dots
  DOM.hdots.forEach((d, di) => d.classList.toggle("on", di <= i));
}


/* ─────────────────────────────────────────────────────
   LEVEL MAP
───────────────────────────────────────────────────── */
function renderMap() {
  DOM.mapContent.innerHTML = "";

  // Group by chapter
  const chapters = {};
  LEVELS.forEach((lv, i) => {
    if (!chapters[lv.chapter]) chapters[lv.chapter] = [];
    chapters[lv.chapter].push({ lv, i });
  });

  Object.entries(chapters).forEach(([ch, items]) => {
    const head = document.createElement("div");
    head.className = "ch-head";
    head.textContent = ch;
    DOM.mapContent.appendChild(head);

    const grid = document.createElement("div");
    grid.className = "level-grid";

    items.forEach(({ lv, i }) => {
      const card = document.createElement("div");
      const isDone   = S.completed.includes(i);
      const isCurr   = i === S.lvIdx;
      const isLocked = i > S.lvIdx && !isDone;

      card.className = ["lcard", isCurr?"current":"", isDone?"done":"", isLocked?"locked":""]
                        .filter(Boolean).join(" ");

      if (isDone) {
        const check = document.createElement("div");
        check.className = "lcard-check";
        check.textContent = "✓";
        card.appendChild(check);
      }

      card.innerHTML += `<div class="lcard-icon">${lv.icon}</div>
        <div class="lcard-num">${lv.id}</div>
        <div class="lcard-name">${lv.title}</div>`;

      if (!isLocked) {
        card.addEventListener("click", () => {
          DOM.modalBg.style.display = "none";
          loadLevel(i);
        });
      }
      grid.appendChild(card);
    });
    DOM.mapContent.appendChild(grid);
  });
}

/* ─────────────────────────────────────────────────────
   TOAST
───────────────────────────────────────────────────── */
let toastTimer = null;
function showToast(msg, type = "") {
  clearTimeout(toastTimer);
  DOM.toast.textContent = msg;
  DOM.toast.className = "toast show" + (type ? " " + type : "");
  toastTimer = setTimeout(() => { DOM.toast.className = "toast"; }, 3000);
}

/* ─────────────────────────────────────────────────────
   DOM EFFECTS
───────────────────────────────────────────────────── */
function spawnXP(amount) {
  const el = document.createElement("div");
  el.textContent = `+${amount} XP`;
  el.style.cssText = `position:fixed;z-index:9999;pointer-events:none;
    font-family:'Syne',sans-serif;font-size:22px;font-weight:800;color:#fbbf24;
    left:${20 + Math.random()*60}%;top:40%;animation:xpFloat 1.5s ease-out forwards;`;
  document.body.appendChild(el);
  setTimeout(() => el.remove(), 1600);
}
function spawnConfetti() {
  const colors = ["#e8ff47","#3de8c4","#ff6b6b","#a78bfa","#fbbf24"];
  for (let i = 0; i < 36; i++) {
    const el = document.createElement("div");
    el.style.cssText = `position:fixed;z-index:9999;pointer-events:none;
      width:8px;height:8px;border-radius:2px;
      background:${colors[i % colors.length]};
      left:${Math.random()*100}vw;top:-10px;
      animation:confettiFall ${0.9+Math.random()*0.8}s ease-out ${Math.random()*0.5}s forwards;`;
    document.body.appendChild(el);
    setTimeout(() => el.remove(), 2000);
  }
}

/* ─────────────────────────────────────────────────────
   AUTO-RUN (editor levels only, debounced)
───────────────────────────────────────────────────── */
let autoRunTimer = null;
function onEditorInput() {
  updateLineNums();
  const lv = LEVELS[S.lvIdx];
  if (lv.type === "dropdown") return;
  clearTimeout(autoRunTimer);
  autoRunTimer = setTimeout(() => preview(), 900);
}

/* ─────────────────────────────────────────────────────
   STREAK
───────────────────────────────────────────────────── */
function updateStreak() {
  const today = new Date().toDateString();
  const last  = localStorage.getItem("codura_last");
  if (last !== today) {
    const yesterday = new Date(Date.now() - 86400000).toDateString();
    S.streak = (last === yesterday) ? S.streak + 1 : 1;
    localStorage.setItem("codura_last", today);
    saveState();
  }
}

/* ─────────────────────────────────────────────────────
   BOOT
───────────────────────────────────────────────────── */
document.addEventListener("DOMContentLoaded", () => {
  grabDOM();
  loadState();
  updateStreak();

  // ── Splash → App ──
  document.getElementById("btn-start").addEventListener("click", () => {
    DOM.splash.style.display = "none";
    DOM.app.style.display    = "flex";
    loadLevel(S.lvIdx);
  });

  // ── Theme toggle ──
  DOM.btnTheme.addEventListener("click", () => {
    S.isLight = !S.isLight;
    document.body.classList.toggle("light-mode", S.isLight);
    DOM.btnTheme.textContent = S.isLight ? "🌙" : "☀️";
  });

  // ── Run button ──
  DOM.btnRun.addEventListener("click", () => {
    const lv = LEVELS[S.lvIdx];
    if (lv.type === "dropdown") {
      validate(); // iframe already shows current state, just validate
    } else {
      run();
    }
  });

  // ── Hint button ──
  DOM.btnHint.addEventListener("click", showHint);

  // ── Hint close ──
  document.getElementById("hint-close").addEventListener("click", () => {
    DOM.hintPanel.style.display = "none";
  });

  // ── Feedback close ──
  document.getElementById("feedback-close").addEventListener("click", () => {
    DOM.feedbackPanel.style.display = "none";
  });

  // ── Next button ──
  DOM.btnNext.addEventListener("click", () => {
    if (!S.solved) { showToast("Finish the challenge first! ⚡", "err"); return; }
    DOM.successOverlay.style.display = "none";
    const next = S.lvIdx + 1;
    if (next >= LEVELS.length) {
      document.getElementById("completion-xp").textContent = `⚡ ${S.xp} XP earned`;
      document.getElementById("completion-streak").textContent = `🔥 ${S.streak} day streak`;
      DOM.completionBg.style.display = "flex";
      return;
    }
    loadLevel(next);
  });

  // ── Completion close ──
  document.getElementById("btn-completion-close").addEventListener("click", () => {
    DOM.completionBg.style.display = "none";
  });

  // ── Map button ──
  DOM.btnMap.addEventListener("click", () => {
    renderMap();
    DOM.modalBg.style.display = "flex";
  });
  DOM.modalClose.addEventListener("click", () => { DOM.modalBg.style.display = "none"; });
  DOM.modalBg.addEventListener("click", (e) => {
    if (e.target === DOM.modalBg) DOM.modalBg.style.display = "none";
  });

  // ── Editor input ──
  DOM.editor.addEventListener("input", onEditorInput);

  // ── Tab key in editor ──
  DOM.editor.addEventListener("keydown", (e) => {
    if (e.key === "Tab") {
      e.preventDefault();
      const s = e.target.selectionStart;
      const v = e.target.value;
      e.target.value = v.slice(0, s) + "  " + v.slice(e.target.selectionEnd);
      e.target.selectionStart = e.target.selectionEnd = s + 2;
      updateLineNums();
    }
    if ((e.ctrlKey || e.metaKey) && e.key === "Enter") {
      e.preventDefault();
      run();
    }
  });
});
