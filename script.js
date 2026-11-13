const $ = (id) => document.getElementById(id);

// Mobile navigation
$("menuToggle").addEventListener("click", () => $("nav").classList.toggle("open"));
document.querySelectorAll("#nav a").forEach(a => a.addEventListener("click", () => $("nav").classList.remove("open")));

// Image upload and clearly labelled simulated environmental analysis
let selectedImage = null;
$("imageUpload").addEventListener("change", event => {
  const file = event.target.files?.[0];
  if (!file) return;
  if (!file.type.startsWith("image/")) { alert("Please choose an image file."); return; }
  selectedImage = file;
  $("preview").src = URL.createObjectURL(file);
  $("filename").textContent = file.name;
  $("previewArea").classList.remove("hidden");
  $("analyseBtn").disabled = false;
});
$("analyseBtn").addEventListener("click", () => {
  if (!selectedImage) return;
  $("analyseBtn").disabled = true;
  $("analyseBtn").textContent = "Analysing demo...";
  setTimeout(() => {
    const outcomes = [
      {title:"Potential waste / plastic indicators",desc:"This is a sample result to demonstrate how a computer-vision report could be displayed. The uploaded image has not been processed by a trained model.",metrics:[["Waste indicator (demo score)",78],["Water / land concern (demo score)",42],["Image review confidence (illustrative)",91]],advice:"Review the area for litter, segregate recyclable materials, and dispose of waste through an authorised collection system."},
      {title:"Potential vegetation / land indicators",desc:"This is a simulated environmental assessment. It does not identify real objects or environmental conditions in your photo.",metrics:[["Vegetation indicator (demo score)",82],["Land disturbance (demo score)",26],["Image review confidence (illustrative)",88]],advice:"Protect native vegetation, avoid unnecessary land disturbance, and support local habitat restoration."},
      {title:"Potential water pollution indicators",desc:"This is a prototype report layout with illustrative scores, not a genuine water-quality test or AI prediction.",metrics:[["Visible pollution concern (demo score)",65],["Waste indicator (demo score)",54],["Image review confidence (illustrative)",86]],advice:"Do not discharge waste into drains or water bodies. Report suspected contamination to the relevant local authority."}
    ];
    const result = outcomes[Math.floor(Math.random() * outcomes.length)];
    $("emptyReport").classList.add("hidden");
    $("analysisReport").classList.remove("hidden");
    $("resultTitle").textContent = result.title;
    $("resultDescription").textContent = result.desc;
    $("resultAdvice").textContent = result.advice;
    $("resultMetrics").innerHTML = result.metrics.map(([label,value]) => `<div class="metric-row"><div><span>${label}</span><b>${value}%</b></div><div class="progress"><i style="width:${value}%"></i></div></div>`).join("");
    $("analyseBtn").disabled = false;
    $("analyseBtn").textContent = "Analyse again ↗";
  }, 900);
});

// EcoBot: educational predefined responses, no external AI service
const answers = [
  {keys:["climate","global warming","temperature"],text:"Climate change refers to long-term shifts in temperatures and weather patterns. Human activities, especially burning fossil fuels, are the main driver of recent global warming. Helpful actions include saving energy, choosing lower-carbon transport and supporting climate solutions."},
  {keys:["plastic","waste","recycle","recycling"],text:"Reduce single-use products first, reuse items where possible, and separate recyclable materials according to your local waste rules. Carry a reusable bottle and bag, and avoid unnecessary packaging."},
  {keys:["renewable","solar","wind","energy"],text:"Renewable energy comes from naturally replenished sources such as sunlight, wind and flowing water. It can reduce dependence on fossil fuels and lower greenhouse-gas emissions when planned responsibly."},
  {keys:["water","river","ocean","sea"],text:"Water pollution can come from untreated sewage, industrial discharge, agricultural runoff and litter. Conserve water, never dump waste into drains, and support proper wastewater treatment."},
  {keys:["forest","tree","deforestation","biodiversity","animal"],text:"Forests provide habitats, store carbon, protect soil and help regulate water cycles. Protecting native habitats, restoring degraded land and choosing responsibly sourced products can help."},
  {keys:["air","pollution","aqi"],text:"Air pollution includes harmful gases and particles from transport, industry, burning and other sources. Cleaner transport, clean energy, waste-burning prevention and urban greenery can help reduce exposure and emissions."},
  {keys:["carbon","footprint","emission"],text:"A carbon footprint estimates greenhouse-gas emissions associated with activities such as transport, electricity, food and products. Try using public transport, reducing energy use and avoiding food waste."},
  {keys:["hello","hi","hey"],text:"Hello! 🌿 I'm happy to help you explore sustainability. Ask me about climate change, air and water pollution, forests, renewable energy or reducing waste."}
];
function botReply(question) {
  const q = question.toLowerCase();
  const match = answers.find(item => item.keys.some(key => q.includes(key)));
  return match ? match.text : "That's an interesting environmental question. I can help with climate change, pollution, water conservation, forests, recycling, renewable energy and carbon footprints. Try asking about one of these topics. 🌱";
}
function sendMessage(question) {
  const text = question.trim();
  if (!text) return;
  const user = document.createElement("div"); user.className = "message user"; user.textContent = text; $("chatLog").appendChild(user);
  const reply = document.createElement("div"); reply.className = "message bot"; reply.textContent = botReply(text); $("chatLog").appendChild(reply);
  $("chatLog").scrollTop = $("chatLog").scrollHeight;
  $("chatInput").value = "";
}
$("chatForm").addEventListener("submit", e => { e.preventDefault(); sendMessage($("chatInput").value); });
document.querySelectorAll("[data-question]").forEach(button => button.addEventListener("click", () => sendMessage(button.dataset.question)));

// Carbon footprint estimate: transparent illustrative factors, not official audited factors
$("carbonForm").addEventListener("submit", e => {
  e.preventDefault();
  const distance = Math.max(0, Number($("distance").value) || 0);
  const electricity = Math.max(0, Number($("electricity").value) || 0);
  const water = Math.max(0, Number($("water").value) || 0);
  const plastic = Math.max(0, Number($("plastic").value) || 0);
  const transport = Number($("transport").value);
  const food = Number($("food").value);
  if (distance > 500 || electricity > 100 || water > 1000 || plastic > 100) { alert("Please check the entered values and stay within the displayed limits."); return; }
  // Simplified teaching/demo factors only.
  const total = distance * transport + electricity * .7 + water * .0003 + food + plastic * .05;
  const monthly = total * 30;
  const category = total < 3 ? {name:"Lower demo range",width:30} : total < 6 ? {name:"Moderate demo range",width:60} : {name:"Higher demo range",width:90};
  $("carbonTotal").innerHTML = `${total.toFixed(2)} <small>kg CO₂e/day</small>`;
  $("monthly").textContent = monthly.toFixed(1);
  $("impactLabel").textContent = category.name;
  $("impactBar").style.width = `${category.width}%`;
  let advice = "Consider reducing avoidable journeys, switching off unused devices and planning meals to reduce waste.";
  if (distance * transport > 1) advice = "Transport contributes noticeably in this estimate. Consider walking, cycling, carpooling or public transport for suitable journeys.";
  else if (electricity * .7 > 2) advice = "Electricity is a significant part of this estimate. Switch off idle devices and use efficient lighting and appliances.";
  else if (food > 2) advice = "Try more plant-rich meals and plan portions to avoid food waste.";
  $("carbonAdvice").textContent = advice;
});

// Eco challenge progress saved locally
const challengePoints = {tree:50,plastic:30,water:25,green:75};
let completed = {};
try { completed = JSON.parse(localStorage.getItem("ecoaiChallenges") || "{}") || {}; } catch { completed = {}; }
function renderChallenges() {
  let points = 0;
  Object.keys(challengePoints).forEach(id => {
    const card = document.querySelector(`.challenge[data-id="${id}"]`);
    const button = card.querySelector("button");
    const done = Boolean(completed[id]);
    card.classList.toggle("completed", done);
    button.textContent = done ? "✓ Completed" : "Mark complete";
    button.disabled = done;
    if (done) points += challengePoints[id];
  });
  const count = Object.keys(challengePoints).filter(id => completed[id]).length;
  $("pointsTag").textContent = `${points} POINTS`;
  $("progressText").textContent = `${count} / 4 completed`;
  $("progressBar").style.width = `${count * 25}%`;
}
document.querySelectorAll("[data-complete]").forEach(button => button.addEventListener("click", () => {
  const id = button.dataset.complete;
  completed[id] = true;
  try { localStorage.setItem("ecoaiChallenges", JSON.stringify(completed)); } catch {}
  renderChallenges();
}));
renderChallenges();
