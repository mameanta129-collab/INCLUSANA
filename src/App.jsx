import { useState } from "react";

const C = {
  primary: "#1A6BAD", primaryLight: "#D6EAF8",
  teal: "#0E8F7F", tealLight: "#D1F0EB",
  bg: "#F0F6FF", card: "#FFFFFF",
  text: "#1C2833", muted: "#6B7A8D",
  danger: "#E74C3C", warn: "#F39C12", success: "#27AE60",
  purple: "#8E44AD", purpleLight: "#EAD6F8",
};

// ─── DATA ───────────────────────────────────────────────
const VIDEOS = [
  { id:1, title:"Comprendre le diabète de type 2", author:"Dr. Konaté Fatou", duration:"4:30", views:"12k", category:"Maladies chroniques", certified:true, thumb:"🩺", lang:"FR", offline:true },
  { id:2, title:"Santé mentale : briser le tabou", author:"Psychologue A. Diallo", duration:"6:15", views:"8,4k", category:"Santé mentale", certified:true, thumb:"🧠", lang:"FR", offline:false },
  { id:3, title:"Nutrition équilibrée à petit budget", author:"Diététicienne M. Sow", duration:"3:45", views:"21k", category:"Nutrition", certified:true, thumb:"🥗", lang:"FR", offline:true },
  { id:4, title:"Vie avec le handicap moteur", author:"Association HandiVie", duration:"8:20", views:"5,1k", category:"Handicap", certified:true, thumb:"♿", lang:"FR/LSF", offline:false },
  { id:5, title:"Prévention du paludisme", author:"Dr. B. Traoré", duration:"2:50", views:"34k", category:"Prévention", certified:true, thumb:"🦟", lang:"FR/WOL", offline:true },
  { id:6, title:"Vieillissement actif et bien-être", author:"Gérontologue N. Ba", duration:"5:10", views:"9,7k", category:"Personnes âgées", certified:false, thumb:"👴", lang:"FR", offline:false },
];

const GROUPS = [
  { id:1, name:"Diabète & Entraide", members:1420, active:true, icon:"🩺", desc:"Groupe de soutien pour les personnes diabétiques." },
  { id:2, name:"Santé Mentale Bienveillante", members:876, active:true, icon:"💚", desc:"Espace sécurisé pour parler santé mentale." },
  { id:3, name:"HandiConnect", members:540, active:false, icon:"♿", desc:"Communauté pour les personnes en situation de handicap." },
  { id:4, name:"Mères & Bébés", members:2103, active:true, icon:"👶", desc:"Santé maternelle et périnatalité." },
  { id:5, name:"Seniors Actifs", members:660, active:false, icon:"🌿", desc:"Bien vieillir ensemble." },
];

const POSTS = [
  { id:1, user:"Aminata D.", avatar:"👩🏾", anon:false, group:"Diabète & Entraide", time:"Il y a 2h", text:"J'ai enfin trouvé une recette de thiéboudiène adaptée pour les diabétiques ! Quelqu'un veut que je partage ? 🍚", likes:34, replies:12, liked:false },
  { id:2, user:"Anonyme", avatar:"🕊️", anon:true, group:"Santé Mentale Bienveillante", time:"Il y a 4h", text:"Je me sens très isolée depuis mon diagnostic. Est-ce que c'est normal de ressentir ça au début ?", likes:67, replies:28, liked:true },
  { id:3, user:"Oumar S.", avatar:"👨🏿", anon:false, group:"HandiConnect", time:"Il y a 1j", text:"Quelqu'un a déjà essayé le fauteuil électrique Ottobock ? Retours d'expérience bienvenus.", likes:15, replies:7, liked:false },
];

const HOSPITALS = [
  { id:1, name:"Hôpital Principal de Dakar", dist:"2,3 km", type:"CHU", open:true, phone:"+221 33 839 50 00", icon:"🏥", specialty:"Urgences · Chirurgie · Cardiologie" },
  { id:2, name:"Hôpital Général de Grand Yoff", dist:"5,1 km", type:"Hôpital général", open:true, phone:"+221 33 867 24 24", icon:"🏥", specialty:"Médecine interne · Pédiatrie" },
  { id:3, name:"Clinique du Cap", dist:"3,7 km", type:"Clinique privée", open:false, phone:"+221 33 869 00 00", icon:"🏨", specialty:"Dermatologie · ORL · Ophtalmologie" },
  { id:4, name:"Centre de Santé de Médina", dist:"1,2 km", type:"Centre de santé", open:true, phone:"+221 33 822 11 35", icon:"💊", specialty:"Médecine générale · Vaccination" },
  { id:5, name:"Hôpital Aristide Le Dantec", dist:"4,8 km", type:"CHU", open:true, phone:"+221 33 849 38 00", icon:"🏥", specialty:"Oncologie · Neurologie · Rhumatologie" },
];

const APPOINTMENTS = [
  { id:1, doctor:"Dr. Konaté Fatou", specialty:"Diabétologue", date:"2026-05-15", time:"10h30", status:"confirmé", avatar:"👩🏾‍⚕️", location:"Hôpital Principal" },
  { id:2, doctor:"Dr. Thiaw Marc", specialty:"Cardiologue", date:"2026-05-22", time:"14h00", status:"en attente", avatar:"👨🏿‍⚕️", location:"Clinique du Cap" },
  { id:3, doctor:"Dr. Sall Rokhaya", specialty:"Nutritionniste", date:"2026-04-30", time:"09h00", status:"terminé", avatar:"👩🏽‍⚕️", location:"Centre Médina" },
];

const MESSAGES_MEDECIN = [
  { id:1, from:"doctor", text:"Bonjour Aminata, j'ai bien reçu vos résultats d'analyse. Votre glycémie est légèrement élevée ce mois-ci.", time:"10:32" },
  { id:2, from:"patient", text:"Bonjour Docteur, merci. Est-ce que je dois ajuster mon traitement ?", time:"10:45" },
  { id:3, from:"doctor", text:"Pas encore. Essayez de réduire les sucres rapides cette semaine et envoyez-moi vos lectures de glycémie quotidiennes.", time:"11:02" },
  { id:4, from:"patient", text:"D'accord, je vais surveiller ça. Dois-je également modifier mes horaires de prise du médicament ?", time:"11:15" },
  { id:5, from:"doctor", text:"Non, gardez les mêmes horaires pour l'instant. On réévalue lors de votre consultation du 15 mai 🙂", time:"11:20" },
];

const BANNED_KEYWORDS = ["suicide", "automutilation", "me tuer", "mourir", "overdose", "se blesser"];

const CATS = ["Tout","Maladies chroniques","Santé mentale","Nutrition","Handicap","Prévention","Personnes âgées"];

// ─── COMPONENTS ─────────────────────────────────────────

const Badge = ({ label, color, bg, small }) => (
  <span style={{ background: bg, color, fontSize: small ? 10 : 11, fontWeight: 700, borderRadius: 6, padding: small ? "1px 6px" : "2px 8px", display: "inline-block" }}>{label}</span>
);

const Toggle = ({ on, onToggle }) => (
  <button onClick={onToggle}
    style={{ width:48, height:26, borderRadius:13, background: on ? C.teal : "#ccc", border:"none", cursor:"pointer", position:"relative", transition:"background 0.2s" }}>
    <span style={{ position:"absolute", top:3, left: on ? 25 : 3, width:20, height:20, borderRadius:"50%", background:"#fff", transition:"left 0.2s" }} />
  </button>
);

const Card = ({ children, style={} }) => (
  <div style={{ background:C.card, borderRadius:16, boxShadow:"0 2px 12px rgba(26,107,173,0.08)", border:"1px solid #E8EFF8", ...style }}>{children}</div>
);

function SensitiveAlert({ onClose }) {
  return (
    <div style={{ position:"fixed", inset:0, background:"rgba(0,0,0,0.7)", zIndex:200, display:"flex", alignItems:"center", justifyContent:"center", padding:20 }}>
      <div style={{ background:"#fff", borderRadius:20, padding:28, maxWidth:380, width:"100%", textAlign:"center" }}>
        <div style={{ fontSize:52, marginBottom:12 }}>💙</div>
        <div style={{ fontWeight:900, fontSize:20, color:C.text, marginBottom:10 }}>Nous sommes là pour vous</div>
        <p style={{ color:C.muted, fontSize:14, lineHeight:1.7, marginBottom:20 }}>
          Ce sujet peut être difficile à traverser seul(e). INCLUSANA vous met en relation avec des professionnels bienveillants et une communauté solidaire.
        </p>
        <div style={{ background:"#FFF3F3", borderRadius:12, padding:"12px 16px", marginBottom:18, textAlign:"left" }}>
          <div style={{ fontWeight:800, color:C.danger, marginBottom:6, fontSize:14 }}>🆘 Lignes d'écoute disponibles</div>
          <div style={{ fontSize:13, color:C.text, lineHeight:1.8 }}>
            <div>📞 <strong>SOS Amitié :</strong> 3114</div>
            <div>📞 <strong>Sénégal écoute :</strong> 800 00 00 02</div>
            <div>💬 <strong>Chat confidentiel</strong> disponible ici</div>
          </div>
        </div>
        <button onClick={onClose} style={{ background:C.primary, color:"#fff", border:"none", borderRadius:12, padding:"12px 28px", fontWeight:800, cursor:"pointer", width:"100%" }}>Je suis en sécurité, continuer</button>
      </div>
    </div>
  );
}

function VideoCard({ v, onSelect }) {
  return (
    <div onClick={() => onSelect(v)} style={{ background:C.card, borderRadius:16, overflow:"hidden", cursor:"pointer", boxShadow:"0 2px 12px rgba(26,107,173,0.10)", border:`1px solid ${C.primaryLight}` }}>
      <div style={{ background:`linear-gradient(135deg,${C.primaryLight},${C.tealLight})`, height:100, display:"flex", alignItems:"center", justifyContent:"center", fontSize:44, position:"relative" }}>
        {v.thumb}
        <div style={{ position:"absolute", bottom:6, right:6, background:"rgba(0,0,0,0.6)", color:"#fff", borderRadius:5, padding:"2px 6px", fontSize:11, fontWeight:700 }}>{v.duration}</div>
        {v.offline && <div style={{ position:"absolute", top:6, left:6, background:C.teal, color:"#fff", borderRadius:5, padding:"2px 6px", fontSize:10, fontWeight:700 }}>↓ Hors-ligne</div>}
      </div>
      <div style={{ padding:"10px 12px 12px" }}>
        {v.certified && <Badge label="✓ CERTIFIÉ" color={C.primary} bg={C.primaryLight} small />}
        <div style={{ fontWeight:700, fontSize:13, color:C.text, margin:"4px 0", lineHeight:1.3 }}>{v.title}</div>
        <div style={{ color:C.muted, fontSize:11, marginBottom:5 }}>{v.author}</div>
        <div style={{ display:"flex", justifyContent:"space-between", alignItems:"center" }}>
          <Badge label={v.category} color={C.teal} bg={C.tealLight} small />
          <span style={{ color:C.muted, fontSize:11 }}>{v.views} vues</span>
        </div>
      </div>
    </div>
  );
}

function VideoPlayer({ v, settings, onClose }) {
  return (
    <div style={{ position:"fixed", inset:0, background:"rgba(0,0,0,0.85)", zIndex:100, display:"flex", alignItems:"center", justifyContent:"center", padding:20 }}>
      <div style={{ background:"#fff", borderRadius:20, width:"100%", maxWidth:600, overflow:"hidden" }}>
        <div style={{ background:`linear-gradient(135deg,${C.primary},${C.teal})`, height:220, display:"flex", flexDirection:"column", alignItems:"center", justifyContent:"center", position:"relative" }}>
          <div style={{ fontSize:72 }}>{v.thumb}</div>
          <div style={{ position:"absolute", inset:0, display:"flex", alignItems:"center", justifyContent:"center" }}>
            <div style={{ width:60, height:60, background:"rgba(255,255,255,0.2)", borderRadius:"50%", display:"flex", alignItems:"center", justifyContent:"center", fontSize:26, color:"#fff", cursor:"pointer" }}>▶</div>
          </div>
          <button onClick={onClose} style={{ position:"absolute", top:10, right:10, background:"rgba(0,0,0,0.4)", border:"none", color:"#fff", borderRadius:"50%", width:30, height:30, cursor:"pointer", fontSize:15 }}>✕</button>
          {settings.subtitles && <div style={{ position:"absolute", bottom:10, left:0, right:0, textAlign:"center", background:"rgba(0,0,0,0.7)", color:"#fff", padding:"5px 14px", fontSize:12 }}>[Sous-titres] Bienvenue dans cette vidéo certifiée...</div>}
        </div>
        <div style={{ padding:18 }}>
          {v.certified && <div style={{ color:C.teal, fontWeight:700, fontSize:11, marginBottom:6 }}>✓ Contenu certifié par un professionnel de santé</div>}
          <div style={{ fontWeight:800, fontSize:16, color:C.text, marginBottom:4 }}>{v.title}</div>
          <div style={{ color:C.muted, fontSize:13, marginBottom:12 }}>{v.author} · {v.duration} · {v.views} vues · {v.lang}</div>
          <div style={{ display:"flex", gap:8, flexWrap:"wrap" }}>
            {[["💬 Discuter", C.primary, "#fff"], ["↓ Télécharger", C.tealLight, C.teal], ["🤟 LSF", "#f4f4f4", C.text], ["↗ Partager", "#f4f4f4", C.text]].map(([l,bg,col]) => (
              <button key={l} style={{ background:bg, color:col, border:"none", borderRadius:10, padding:"8px 14px", fontWeight:700, cursor:"pointer", fontSize:12 }}>{l}</button>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

function PostCard({ post }) {
  const [liked, setLiked] = useState(post.liked);
  const [likes, setLikes] = useState(post.likes);
  return (
    <Card style={{ padding:"14px 16px", marginBottom:12 }}>
      <div style={{ display:"flex", alignItems:"center", gap:10, marginBottom:10 }}>
        <div style={{ width:38, height:38, borderRadius:"50%", background:C.primaryLight, display:"flex", alignItems:"center", justifyContent:"center", fontSize:20 }}>{post.avatar}</div>
        <div>
          <div style={{ fontWeight:700, fontSize:13, color:C.text }}>{post.user}</div>
          <div style={{ color:C.muted, fontSize:11 }}>{post.group} · {post.time}</div>
        </div>
        {post.anon && <Badge label="Anonyme" color={C.muted} bg="#f0f0f0" small style={{ marginLeft:"auto" }} />}
      </div>
      <p style={{ color:C.text, fontSize:13, lineHeight:1.6, margin:"0 0 10px" }}>{post.text}</p>
      <div style={{ display:"flex", gap:12 }}>
        <button onClick={() => { setLiked(!liked); setLikes(l => liked ? l-1 : l+1); }}
          style={{ background: liked ? C.primaryLight : "#f4f6f9", color: liked ? C.primary : C.muted, border:"none", borderRadius:20, padding:"5px 12px", cursor:"pointer", fontWeight:700, fontSize:12 }}>
          {liked ? "💙" : "🤍"} {likes}
        </button>
        <button style={{ background:"#f4f6f9", color:C.muted, border:"none", borderRadius:20, padding:"5px 12px", cursor:"pointer", fontWeight:700, fontSize:12 }}>💬 {post.replies}</button>
        <button style={{ background:"#f4f6f9", color:C.muted, border:"none", borderRadius:20, padding:"5px 12px", cursor:"pointer", fontWeight:700, fontSize:12 }}>↗</button>
      </div>
    </Card>
  );
}

// ─── TABS CONTENT ────────────────────────────────────────

function TabAccueil({ setTab }) {
  return (
    <div>
      <div style={{ background:`linear-gradient(135deg,${C.primaryLight},${C.tealLight})`, borderRadius:20, padding:"22px 20px", marginBottom:20, border:`1px solid ${C.primaryLight}` }}>
        <div style={{ fontWeight:900, fontSize:20, color:C.primary, marginBottom:6 }}>Bonjour Aminata 👋</div>
        <p style={{ color:C.text, fontSize:13, lineHeight:1.6, margin:"0 0 14px" }}>Bienvenue sur INCLUSANA — votre réseau social de santé inclusive. Vidéos, groupes, médecin, tout en un.</p>
        <div style={{ display:"flex", gap:8, flexWrap:"wrap" }}>
          <button onClick={() => setTab("videos")} style={{ background:C.primary, color:"#fff", border:"none", borderRadius:12, padding:"9px 16px", fontWeight:800, cursor:"pointer", fontSize:12 }}>▶ Vidéos</button>
          <button onClick={() => setTab("groupes")} style={{ background:C.teal, color:"#fff", border:"none", borderRadius:12, padding:"9px 16px", fontWeight:800, cursor:"pointer", fontSize:12 }}>👥 Groupes</button>
          <button onClick={() => setTab("recherche")} style={{ background:C.purple, color:"#fff", border:"none", borderRadius:12, padding:"9px 16px", fontWeight:800, cursor:"pointer", fontSize:12 }}>🏥 Hôpitaux</button>
        </div>
      </div>
      <div style={{ display:"grid", gridTemplateColumns:"repeat(3,1fr)", gap:10, marginBottom:20 }}>
        {[["500+","Vidéos certifiées",C.primary],["12k+","Membres actifs",C.teal],["10","Langues",C.purple]].map(([v,l,col]) => (
          <Card key={l} style={{ padding:"14px 10px", textAlign:"center" }}>
            <div style={{ fontWeight:900, fontSize:20, color:col }}>{v}</div>
            <div style={{ color:C.muted, fontSize:11, marginTop:3 }}>{l}</div>
          </Card>
        ))}
      </div>
      <div style={{ fontWeight:800, fontSize:15, color:C.text, marginBottom:10 }}>Vidéos recommandées</div>
      <div style={{ display:"grid", gridTemplateColumns:"repeat(auto-fill,minmax(200px,1fr))", gap:12, marginBottom:20 }}>
        {VIDEOS.slice(0,3).map(v => <VideoCard key={v.id} v={v} onSelect={() => {}} />)}
      </div>
      <div style={{ fontWeight:800, fontSize:15, color:C.text, marginBottom:10 }}>Fil communautaire</div>
      {POSTS.slice(0,2).map(p => <PostCard key={p.id} post={p} />)}
    </div>
  );
}

function TabVideos({ settings, setSelectedVideo }) {
  const [cat, setCat] = useState("Tout");
  const [q, setQ] = useState("");
  const filtered = VIDEOS.filter(v => (cat === "Tout" || v.category === cat) && (q === "" || v.title.toLowerCase().includes(q.toLowerCase())));
  return (
    <div>
      <div style={{ fontWeight:900, fontSize:17, color:C.text, marginBottom:14 }}>▶ Vidéothèque inclusive</div>
      <input value={q} onChange={e => setQ(e.target.value)} placeholder="🔍 Rechercher une vidéo..."
        style={{ width:"100%", padding:"11px 14px", borderRadius:12, border:`2px solid ${C.primaryLight}`, fontSize:14, marginBottom:12, outline:"none", color:C.text }} />
      <div style={{ display:"flex", gap:8, flexWrap:"wrap", marginBottom:16 }}>
        {CATS.map(c => (
          <button key={c} onClick={() => setCat(c)}
            style={{ background: cat===c ? C.primary : C.card, color: cat===c ? "#fff" : C.text, border:`2px solid ${cat===c ? C.primary : "#ddd"}`, borderRadius:20, padding:"5px 12px", cursor:"pointer", fontWeight:700, fontSize:11 }}>
            {c}
          </button>
        ))}
      </div>
      <div style={{ display:"grid", gridTemplateColumns:"repeat(auto-fill,minmax(200px,1fr))", gap:14 }}>
        {filtered.map(v => <VideoCard key={v.id} v={v} onSelect={setSelectedVideo} />)}
      </div>
    </div>
  );
}

function TabGroupes() {
  const [q, setQ] = useState("");
  const [newPost, setNewPost] = useState("");
  const [isAnon, setIsAnon] = useState(false);
  const [showAlert, setShowAlert] = useState(false);
  const handlePost = () => {
    const low = newPost.toLowerCase();
    if (BANNED_KEYWORDS.some(k => low.includes(k))) { setShowAlert(true); return; }
    setNewPost("");
  };
  return (
    <div>
      {showAlert && <SensitiveAlert onClose={() => setShowAlert(false)} />}
      <div style={{ fontWeight:900, fontSize:17, color:C.text, marginBottom:14 }}>👥 Communautés & Forum</div>
      {/* Forum composer */}
      <Card style={{ padding:"14px 16px", marginBottom:18 }}>
        <div style={{ fontWeight:700, fontSize:13, color:C.text, marginBottom:10 }}>💬 Nouvelle publication</div>
        <textarea value={newPost} onChange={e => setNewPost(e.target.value)} placeholder="Partagez une question, expérience ou conseil..."
          style={{ width:"100%", minHeight:80, padding:10, borderRadius:10, border:`2px solid ${C.primaryLight}`, resize:"vertical", fontSize:13, color:C.text, fontFamily:"inherit", outline:"none" }} />
        <div style={{ display:"flex", justifyContent:"space-between", alignItems:"center", marginTop:10, flexWrap:"wrap", gap:8 }}>
          <label style={{ display:"flex", alignItems:"center", gap:6, cursor:"pointer", fontSize:12, color:C.muted }}>
            <input type="checkbox" checked={isAnon} onChange={e => setIsAnon(e.target.checked)} /> 🕊️ Anonyme
          </label>
          <button onClick={handlePost}
            style={{ background: newPost.trim() ? C.primary : "#ccc", color:"#fff", border:"none", borderRadius:10, padding:"8px 16px", cursor: newPost.trim() ? "pointer" : "default", fontWeight:800, fontSize:12 }}>
            Publier
          </button>
        </div>
      </Card>
      {/* Groups */}
      <div style={{ fontWeight:800, fontSize:14, color:C.text, marginBottom:10 }}>Groupes disponibles</div>
      <div style={{ display:"flex", flexDirection:"column", gap:10, marginBottom:20 }}>
        {GROUPS.map(g => (
          <Card key={g.id} style={{ padding:"14px 16px", display:"flex", alignItems:"center", gap:12, cursor:"pointer" }}>
            <div style={{ width:46, height:46, borderRadius:12, background:C.primaryLight, display:"flex", alignItems:"center", justifyContent:"center", fontSize:24, flexShrink:0 }}>{g.icon}</div>
            <div style={{ flex:1 }}>
              <div style={{ fontWeight:800, fontSize:13, color:C.text, marginBottom:2, display:"flex", alignItems:"center", gap:6 }}>
                {g.name} {g.active && <Badge label="Actif" color="#fff" bg={C.teal} small />}
              </div>
              <div style={{ color:C.muted, fontSize:11, marginBottom:4 }}>{g.desc}</div>
              <div style={{ color:C.primary, fontSize:11, fontWeight:700 }}>👤 {g.members.toLocaleString()} membres</div>
            </div>
            <button style={{ background:C.primaryLight, color:C.primary, border:"none", borderRadius:10, padding:"7px 12px", cursor:"pointer", fontWeight:800, fontSize:12, flexShrink:0 }}>Rejoindre</button>
          </Card>
        ))}
      </div>
      {/* Feed */}
      <div style={{ fontWeight:800, fontSize:14, color:C.text, marginBottom:10 }}>Fil communautaire</div>
      {POSTS.map(p => <PostCard key={p.id} post={p} />)}
    </div>
  );
}

function TabRecherche() {
  const [subTab, setSubTab] = useState("hopitaux");
  const statusColor = { "confirmé": C.success, "en attente": C.warn, "terminé": C.muted };
  const statusBg = { "confirmé": "#EAF9EE", "en attente": "#FEF9E7", "terminé": "#f4f4f4" };
  return (
    <div>
      <div style={{ fontWeight:900, fontSize:17, color:C.text, marginBottom:14 }}>🔍 Recherche & Santé</div>
      <div style={{ display:"flex", gap:8, marginBottom:18 }}>
        {[["hopitaux","🏥 Hôpitaux"],["rdv","📅 Rendez-vous"]].map(([k,l]) => (
          <button key={k} onClick={() => setSubTab(k)}
            style={{ background: subTab===k ? C.primary : C.card, color: subTab===k ? "#fff" : C.text, border:`2px solid ${subTab===k ? C.primary : "#ddd"}`, borderRadius:12, padding:"8px 16px", cursor:"pointer", fontWeight:700, fontSize:12 }}>
            {l}
          </button>
        ))}
      </div>

      {subTab === "hopitaux" && (
        <div>
          <div style={{ background:`linear-gradient(135deg,${C.purpleLight},${C.tealLight})`, borderRadius:14, padding:"12px 16px", marginBottom:14, display:"flex", alignItems:"center", gap:10 }}>
            <span style={{ fontSize:24 }}>📍</span>
            <div>
              <div style={{ fontWeight:700, fontSize:13, color:C.text }}>Votre position : Dakar, Sénégal</div>
              <div style={{ color:C.muted, fontSize:11 }}>Hôpitaux dans un rayon de 10 km</div>
            </div>
          </div>
          <div style={{ display:"flex", flexDirection:"column", gap:10 }}>
            {HOSPITALS.map(h => (
              <Card key={h.id} style={{ padding:"14px 16px" }}>
                <div style={{ display:"flex", alignItems:"flex-start", gap:12 }}>
                  <div style={{ width:44, height:44, borderRadius:12, background: h.open ? C.tealLight : "#f4f4f4", display:"flex", alignItems:"center", justifyContent:"center", fontSize:22, flexShrink:0 }}>{h.icon}</div>
                  <div style={{ flex:1 }}>
                    <div style={{ display:"flex", alignItems:"center", gap:8, flexWrap:"wrap", marginBottom:3 }}>
                      <div style={{ fontWeight:800, fontSize:13, color:C.text }}>{h.name}</div>
                      <Badge label={h.open ? "Ouvert" : "Fermé"} color="#fff" bg={h.open ? C.success : C.danger} small />
                    </div>
                    <div style={{ color:C.muted, fontSize:11, marginBottom:3 }}>{h.type} · 📍 {h.dist}</div>
                    <div style={{ color:C.primary, fontSize:11, marginBottom:8 }}>🏷 {h.specialty}</div>
                    <div style={{ display:"flex", gap:8 }}>
                      <button style={{ background:C.primaryLight, color:C.primary, border:"none", borderRadius:8, padding:"6px 12px", cursor:"pointer", fontWeight:700, fontSize:11 }}>📞 Appeler</button>
                      <button style={{ background:C.tealLight, color:C.teal, border:"none", borderRadius:8, padding:"6px 12px", cursor:"pointer", fontWeight:700, fontSize:11 }}>📅 RDV</button>
                      <button style={{ background:"#f4f4f4", color:C.text, border:"none", borderRadius:8, padding:"6px 12px", cursor:"pointer", fontWeight:700, fontSize:11 }}>🗺 Itinéraire</button>
                    </div>
                  </div>
                </div>
              </Card>
            ))}
          </div>
        </div>
      )}

      {subTab === "rdv" && (
        <div>
          <div style={{ display:"flex", justifyContent:"space-between", alignItems:"center", marginBottom:12 }}>
            <div style={{ fontWeight:800, fontSize:14, color:C.text }}>Mes consultations</div>
            <button style={{ background:C.primary, color:"#fff", border:"none", borderRadius:10, padding:"7px 14px", fontWeight:800, fontSize:12, cursor:"pointer" }}>+ Nouveau RDV</button>
          </div>
          <div style={{ display:"flex", flexDirection:"column", gap:10 }}>
            {APPOINTMENTS.map(a => (
              <Card key={a.id} style={{ padding:"14px 16px" }}>
                <div style={{ display:"flex", alignItems:"center", gap:12 }}>
                  <div style={{ width:44, height:44, borderRadius:"50%", background:C.primaryLight, display:"flex", alignItems:"center", justifyContent:"center", fontSize:22, flexShrink:0 }}>{a.avatar}</div>
                  <div style={{ flex:1 }}>
                    <div style={{ fontWeight:800, fontSize:13, color:C.text }}>{a.doctor}</div>
                    <div style={{ color:C.muted, fontSize:11, marginBottom:4 }}>{a.specialty} · {a.location}</div>
                    <div style={{ display:"flex", alignItems:"center", gap:8, flexWrap:"wrap" }}>
                      <span style={{ fontSize:12, color:C.text }}>📅 {a.date} à {a.time}</span>
                      <Badge label={a.status} color={statusColor[a.status]} bg={statusBg[a.status]} small />
                    </div>
                  </div>
                  {a.status !== "terminé" && (
                    <div style={{ display:"flex", flexDirection:"column", gap:5 }}>
                      <button style={{ background:C.tealLight, color:C.teal, border:"none", borderRadius:8, padding:"5px 10px", cursor:"pointer", fontWeight:700, fontSize:11 }}>💬</button>
                      <button style={{ background:"#FEF9E7", color:C.warn, border:"none", borderRadius:8, padding:"5px 10px", cursor:"pointer", fontWeight:700, fontSize:11 }}>✏️</button>
                    </div>
                  )}
                </div>
              </Card>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}

function TabProfil({ showAccess, setShowAccess, settings, setSettings }) {
  const [subTab, setSubTab] = useState("info");
  const [msg, setMsg] = useState("");
  const [msgs, setMsgs] = useState(MESSAGES_MEDECIN);
  const [keywords, setKeywords] = useState(BANNED_KEYWORDS);
  const [newKw, setNewKw] = useState("");

  const sendMsg = () => {
    if (!msg.trim()) return;
    setMsgs(m => [...m, { id: m.length+1, from:"patient", text:msg, time: new Date().toLocaleTimeString([], {hour:"2-digit",minute:"2-digit"}) }]);
    setMsg("");
  };

  const profileSubs = [
    { key:"info", label:"👤 Profil" },
    { key:"medecin", label:"👨‍⚕️ Médecin" },
    { key:"medical", label:"🩺 Dossier" },
    { key:"securite", label:"🔐 Sécurité" },
  ];

  return (
    <div>
      {showAccess && (
        <div style={{ position:"fixed", inset:0, background:"rgba(0,0,0,0.5)", zIndex:100, display:"flex", alignItems:"center", justifyContent:"center" }}>
          <div style={{ background:"#fff", borderRadius:20, padding:24, width:340, maxWidth:"90vw" }}>
            <div style={{ display:"flex", justifyContent:"space-between", alignItems:"center", marginBottom:16 }}>
              <span style={{ fontWeight:700, fontSize:17, color:C.primary }}>♿ Accessibilité</span>
              <button onClick={() => setShowAccess(false)} style={{ background:"none", border:"none", fontSize:20, cursor:"pointer" }}>✕</button>
            </div>
            {[["largeFont","Grande police","🔡"],["highContrast","Contraste élevé","◑"],["screenReader","Lecteur d'écran","🔊"],["simplifiedUI","Interface simplifiée","🟦"],["subtitles","Sous-titres","CC"],["signLanguage","Langue des signes","🤟"]].map(([k,l,i]) => (
              <div key={k} style={{ display:"flex", justifyContent:"space-between", alignItems:"center", padding:"10px 0", borderBottom:"1px solid #eee" }}>
                <span style={{ fontSize:14, color:C.text }}>{i} {l}</span>
                <Toggle on={settings[k]} onToggle={() => setSettings(s => ({ ...s, [k]: !s[k] }))} />
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Sub-nav */}
      <div style={{ display:"flex", gap:6, marginBottom:18, overflowX:"auto", paddingBottom:4 }}>
        {profileSubs.map(s => (
          <button key={s.key} onClick={() => setSubTab(s.key)}
            style={{ background: subTab===s.key ? C.primary : C.card, color: subTab===s.key ? "#fff" : C.text, border:`2px solid ${subTab===s.key ? C.primary : "#ddd"}`, borderRadius:12, padding:"7px 14px", cursor:"pointer", fontWeight:700, fontSize:12, whiteSpace:"nowrap" }}>
            {s.label}
          </button>
        ))}
      </div>

      {/* INFO */}
      {subTab === "info" && (
        <div>
          <div style={{ background:`linear-gradient(135deg,${C.primary},${C.teal})`, borderRadius:20, padding:"24px 20px", textAlign:"center", color:"#fff", marginBottom:18 }}>
            <div style={{ width:68, height:68, borderRadius:"50%", background:"rgba(255,255,255,0.2)", margin:"0 auto 10px", display:"flex", alignItems:"center", justifyContent:"center", fontSize:34 }}>👩🏾</div>
            <div style={{ fontWeight:900, fontSize:18 }}>Aminata Diallo</div>
            <div style={{ opacity:.8, fontSize:12, marginTop:3 }}>Membre depuis mars 2026</div>
            <div style={{ display:"flex", justifyContent:"center", gap:20, marginTop:14 }}>
              {[["3","Groupes"],["12","Vidéos"],["47","Posts"]].map(([n,l]) => (
                <div key={l}><div style={{ fontWeight:900, fontSize:18 }}>{n}</div><div style={{ fontSize:11, opacity:.8 }}>{l}</div></div>
              ))}
            </div>
          </div>
          {[["🎯","Intérêts santé","Diabète, Nutrition, Bien-être"],["🌍","Langue","Français"],["📍","Région","Dakar, Sénégal"],["🔔","Notifications","Activées"]].map(([ic,l,v]) => (
            <Card key={l} style={{ padding:"12px 16px", marginBottom:10, display:"flex", alignItems:"center", gap:12 }}>
              <span style={{ fontSize:20 }}>{ic}</span>
              <div style={{ flex:1 }}>
                <div style={{ fontSize:11, color:C.muted }}>{l}</div>
                <div style={{ fontWeight:700, color:C.text, fontSize:13 }}>{v}</div>
              </div>
              <span style={{ color:C.primary, fontWeight:700, fontSize:18 }}>›</span>
            </Card>
          ))}
          <button onClick={() => setShowAccess(true)}
            style={{ width:"100%", background:C.primaryLight, color:C.primary, border:`2px solid ${C.primary}`, borderRadius:14, padding:12, fontWeight:800, cursor:"pointer", fontSize:14, marginTop:6 }}>
            ♿ Paramètres d'accessibilité
          </button>
        </div>
      )}

      {/* MÉDECIN */}
      {subTab === "medecin" && (
        <div style={{ display:"flex", flexDirection:"column", height:"70vh" }}>
          <Card style={{ padding:"12px 16px", marginBottom:12, display:"flex", alignItems:"center", gap:12 }}>
            <div style={{ width:44, height:44, borderRadius:"50%", background:C.tealLight, display:"flex", alignItems:"center", justifyContent:"center", fontSize:22 }}>👩🏾‍⚕️</div>
            <div>
              <div style={{ fontWeight:800, fontSize:13, color:C.text }}>Dr. Konaté Fatou</div>
              <div style={{ color:C.muted, fontSize:11 }}>Diabétologue · Hôpital Principal</div>
              <div style={{ display:"flex", alignItems:"center", gap:4, marginTop:3 }}>
                <div style={{ width:8, height:8, borderRadius:"50%", background:C.success }} />
                <span style={{ color:C.success, fontSize:11, fontWeight:700 }}>En ligne</span>
              </div>
            </div>
            <button style={{ marginLeft:"auto", background:C.tealLight, color:C.teal, border:"none", borderRadius:10, padding:"7px 12px", fontWeight:700, fontSize:12, cursor:"pointer" }}>📹 Appel</button>
          </Card>

          <div style={{ flex:1, overflowY:"auto", display:"flex", flexDirection:"column", gap:10, marginBottom:12 }}>
            {msgs.map(m => (
              <div key={m.id} style={{ display:"flex", justifyContent: m.from==="patient" ? "flex-end" : "flex-start" }}>
                <div style={{ maxWidth:"75%", background: m.from==="patient" ? C.primary : "#f0f4f8", color: m.from==="patient" ? "#fff" : C.text, borderRadius: m.from==="patient" ? "16px 16px 4px 16px" : "16px 16px 16px 4px", padding:"10px 14px", fontSize:13, lineHeight:1.5 }}>
                  {m.text}
                  <div style={{ fontSize:10, opacity:.6, marginTop:4, textAlign:"right" }}>{m.time}</div>
                </div>
              </div>
            ))}
          </div>

          <div style={{ display:"flex", gap:8 }}>
            <input value={msg} onChange={e => setMsg(e.target.value)} onKeyDown={e => e.key==="Enter" && sendMsg()}
              placeholder="Écrire un message..."
              style={{ flex:1, padding:"10px 14px", borderRadius:12, border:`2px solid ${C.primaryLight}`, fontSize:13, outline:"none" }} />
            <button onClick={sendMsg}
              style={{ background:C.primary, color:"#fff", border:"none", borderRadius:12, padding:"10px 16px", fontWeight:800, cursor:"pointer", fontSize:15 }}>↑</button>
          </div>
          <div style={{ fontSize:11, color:C.muted, textAlign:"center", marginTop:6 }}>🔒 Messages chiffrés de bout en bout</div>
        </div>
      )}

      {/* DOSSIER MÉDICAL */}
      {subTab === "medical" && (
        <div>
          <div style={{ fontWeight:800, fontSize:15, color:C.text, marginBottom:14 }}>🩺 Mon dossier médical</div>

          {/* Groupe sanguin */}
          <Card style={{ padding:"14px 16px", marginBottom:12, display:"flex", alignItems:"center", gap:14 }}>
            <div style={{ width:52, height:52, borderRadius:14, background:"#FDECEA", display:"flex", alignItems:"center", justifyContent:"center", fontSize:26 }}>🩸</div>
            <div>
              <div style={{ color:C.muted, fontSize:11 }}>Groupe sanguin</div>
              <div style={{ fontWeight:900, fontSize:22, color:C.danger }}>A+</div>
            </div>
            <button style={{ marginLeft:"auto", background:"#FDECEA", color:C.danger, border:"none", borderRadius:10, padding:"6px 12px", fontWeight:700, fontSize:12, cursor:"pointer" }}>Modifier</button>
          </Card>

          {/* Maladies chroniques */}
          <Card style={{ padding:"14px 16px", marginBottom:12 }}>
            <div style={{ display:"flex", justifyContent:"space-between", alignItems:"center", marginBottom:10 }}>
              <div style={{ fontWeight:700, fontSize:13, color:C.text }}>🏥 Maladies chroniques</div>
              <button style={{ background:C.primaryLight, color:C.primary, border:"none", borderRadius:8, padding:"5px 10px", fontWeight:700, fontSize:11, cursor:"pointer" }}>+ Ajouter</button>
            </div>
            {[["Diabète de type 2",C.warn,"#FEF9E7"],["Hypertension artérielle",C.danger,"#FDECEA"]].map(([name,col,bg]) => (
              <div key={name} style={{ display:"flex", alignItems:"center", gap:8, marginBottom:8 }}>
                <div style={{ background:bg, color:col, borderRadius:8, padding:"5px 12px", fontSize:12, fontWeight:700 }}>🔴 {name}</div>
              </div>
            ))}
          </Card>

          {/* Allergies */}
          <Card style={{ padding:"14px 16px", marginBottom:12 }}>
            <div style={{ display:"flex", justifyContent:"space-between", alignItems:"center", marginBottom:10 }}>
              <div style={{ fontWeight:700, fontSize:13, color:C.text }}>⚠️ Allergies</div>
              <button style={{ background:C.primaryLight, color:C.primary, border:"none", borderRadius:8, padding:"5px 10px", fontWeight:700, fontSize:11, cursor:"pointer" }}>+ Ajouter</button>
            </div>
            <div style={{ display:"flex", gap:8, flexWrap:"wrap" }}>
              {["Pénicilline","Arachides","Latex"].map(a => (
                <div key={a} style={{ background:"#FEF9E7", color:C.warn, borderRadius:20, padding:"5px 12px", fontSize:12, fontWeight:700 }}>⚠️ {a}</div>
              ))}
            </div>
          </Card>

          {/* Contacts d'urgence */}
          <Card style={{ padding:"14px 16px" }}>
            <div style={{ display:"flex", justifyContent:"space-between", alignItems:"center", marginBottom:10 }}>
              <div style={{ fontWeight:700, fontSize:13, color:C.text }}>🆘 Contacts d'urgence</div>
              <button style={{ background:C.primaryLight, color:C.primary, border:"none", borderRadius:8, padding:"5px 10px", fontWeight:700, fontSize:11, cursor:"pointer" }}>+ Ajouter</button>
            </div>
            {[["Mamadou Diallo","Mari","📞 +221 77 123 45 67"],["Fatou Sall","Sœur","📞 +221 76 987 65 43"]].map(([n,rel,tel]) => (
              <div key={n} style={{ display:"flex", alignItems:"center", gap:12, padding:"10px 0", borderBottom:"1px solid #eee" }}>
                <div style={{ width:36, height:36, borderRadius:"50%", background:C.primaryLight, display:"flex", alignItems:"center", justifyContent:"center", fontSize:18 }}>👤</div>
                <div style={{ flex:1 }}>
                  <div style={{ fontWeight:700, fontSize:13, color:C.text }}>{n}</div>
                  <div style={{ color:C.muted, fontSize:11 }}>{rel} · {tel}</div>
                </div>
                <button style={{ background:C.tealLight, color:C.teal, border:"none", borderRadius:8, padding:"6px 10px", fontWeight:700, fontSize:11, cursor:"pointer" }}>📞</button>
              </div>
            ))}
          </Card>
        </div>
      )}

      {/* SÉCURITÉ / MOTS CLÉS */}
      {subTab === "securite" && (
        <div>
          <div style={{ fontWeight:800, fontSize:15, color:C.text, marginBottom:6 }}>🔐 Sécurité & Modération</div>
          <p style={{ color:C.muted, fontSize:12, lineHeight:1.6, marginBottom:14 }}>Les mots-clés ci-dessous déclenchent automatiquement une alerte bienveillante et un lien vers des ressources d'aide, comme TikTok le fait pour certains contenus sensibles.</p>

          <Card style={{ padding:"14px 16px", marginBottom:12 }}>
            <div style={{ fontWeight:700, fontSize:13, color:C.text, marginBottom:10 }}>🚫 Mots-clés sensibles surveillés</div>
            <div style={{ display:"flex", flexWrap:"wrap", gap:8, marginBottom:14 }}>
              {keywords.map(kw => (
                <div key={kw} style={{ background:"#FDECEA", color:C.danger, borderRadius:20, padding:"5px 12px", fontSize:12, fontWeight:700, display:"flex", alignItems:"center", gap:6 }}>
                  {kw}
                  <button onClick={() => setKeywords(k => k.filter(x => x !== kw))} style={{ background:"none", border:"none", color:C.danger, cursor:"pointer", fontSize:14, lineHeight:1 }}>×</button>
                </div>
              ))}
            </div>
            <div style={{ display:"flex", gap:8 }}>
              <input value={newKw} onChange={e => setNewKw(e.target.value)} placeholder="Ajouter un mot-clé..."
                style={{ flex:1, padding:"8px 12px", borderRadius:10, border:`2px solid ${C.primaryLight}`, fontSize:12, outline:"none" }} />
              <button onClick={() => { if(newKw.trim()) { setKeywords(k => [...k, newKw.trim().toLowerCase()]); setNewKw(""); } }}
                style={{ background:C.danger, color:"#fff", border:"none", borderRadius:10, padding:"8px 14px", fontWeight:800, cursor:"pointer", fontSize:12 }}>+ Ajouter</button>
            </div>
          </Card>

          <Card style={{ padding:"14px 16px" }}>
            <div style={{ fontWeight:700, fontSize:13, color:C.text, marginBottom:10 }}>🛡 Autres protections</div>
            {[["Modération automatique des contenus","Activée",C.success],["Signalement anonyme","Activé",C.success],["Filtre de contenu choquant","Activé",C.success],["Protection des données médicales","Chiffrées AES-256",C.teal]].map(([l,v,col]) => (
              <div key={l} style={{ display:"flex", justifyContent:"space-between", padding:"8px 0", borderBottom:"1px solid #eee", alignItems:"center" }}>
                <span style={{ fontSize:12, color:C.text }}>{l}</span>
                <span style={{ fontSize:11, fontWeight:700, color:col }}>{v}</span>
              </div>
            ))}
          </Card>
        </div>
      )}
    </div>
  );
}

// ─── APP ─────────────────────────────────────────────────
export default function INCLUSANA() {
  const [tab, setTab] = useState("accueil");
  const [showAccess, setShowAccess] = useState(false);
  const [selectedVideo, setSelectedVideo] = useState(null);
  const [settings, setSettings] = useState({ largeFont:false, highContrast:false, screenReader:false, simplifiedUI:false, subtitles:false, signLanguage:false });

  const TABS = [
    { key:"accueil", label:"Accueil", icon:"🏠" },
    { key:"videos", label:"Vidéos", icon:"▶" },
    { key:"groupes", label:"Groupes", icon:"👥" },
    { key:"recherche", label:"Recherche", icon:"🔍" },
    { key:"profil", label:"Profil", icon:"👤" },
  ];

  const bg = settings.highContrast ? "#000" : C.bg;
  const textCol = settings.highContrast ? "#fff" : C.text;

  return (
    <div style={{ minHeight:"100vh", background:bg, fontFamily:"'Nunito','Segoe UI',sans-serif", fontSize: settings.largeFont ? 16 : 14, color:textCol }}>
      <style>{`@import url('https://fonts.googleapis.com/css2?family=Nunito:wght@400;600;700;800;900&display=swap'); *{box-sizing:border-box;} ::-webkit-scrollbar{width:6px} ::-webkit-scrollbar-thumb{background:${C.primaryLight};border-radius:3px}`}</style>

      {/* Header */}
      <header style={{ background:`linear-gradient(135deg,${C.primary},${C.teal})`, color:"#fff", padding:"0 18px", height:58, display:"flex", alignItems:"center", justifyContent:"space-between", position:"sticky", top:0, zIndex:50, boxShadow:"0 2px 12px rgba(14,143,127,0.3)" }}>
        <div style={{ display:"flex", alignItems:"center", gap:10 }}>
          <div style={{ width:34, height:34, background:"rgba(255,255,255,0.2)", borderRadius:10, display:"flex", alignItems:"center", justifyContent:"center", fontWeight:900, fontSize:15 }}>IN</div>
          <div>
            <div style={{ fontWeight:900, fontSize:17 }}>INCLUSANA</div>
            <div style={{ fontSize:9, opacity:.8, letterSpacing:1 }}>SANTÉ INCLUSIVE</div>
          </div>
        </div>
        <div style={{ display:"flex", gap:8 }}>
          <button onClick={() => setShowAccess(true)} style={{ background:"rgba(255,255,255,0.2)", border:"none", color:"#fff", borderRadius:10, padding:"6px 11px", cursor:"pointer", fontWeight:700, fontSize:13 }}>♿</button>
          <button style={{ background:"rgba(255,255,255,0.2)", border:"none", color:"#fff", borderRadius:10, padding:"6px 11px", cursor:"pointer", fontWeight:700, fontSize:13 }}>🔔</button>
        </div>
      </header>

      {/* Accessibility bar */}
      {Object.values(settings).some(Boolean) && (
        <div style={{ background:C.teal, color:"#fff", textAlign:"center", padding:"5px 12px", fontSize:11, fontWeight:700, display:"flex", justifyContent:"center", gap:10, flexWrap:"wrap" }}>
          {settings.largeFont && <span>🔡 Grande police</span>}
          {settings.highContrast && <span>◑ Contraste élevé</span>}
          {settings.screenReader && <span>🔊 Lecteur d'écran</span>}
          {settings.subtitles && <span>CC Sous-titres</span>}
          {settings.signLanguage && <span>🤟 LSF</span>}
        </div>
      )}

      <main style={{ maxWidth:860, margin:"0 auto", padding:"18px 14px 90px" }}>
        {tab === "accueil"   && <TabAccueil setTab={setTab} />}
        {tab === "videos"    && <TabVideos settings={settings} setSelectedVideo={setSelectedVideo} />}
        {tab === "groupes"   && <TabGroupes />}
        {tab === "recherche" && <TabRecherche />}
        {tab === "profil"    && <TabProfil showAccess={showAccess} setShowAccess={setShowAccess} settings={settings} setSettings={setSettings} />}
      </main>

      {/* Bottom nav */}
      <nav style={{ position:"fixed", bottom:0, left:0, right:0, background:C.card, borderTop:`2px solid ${C.primaryLight}`, display:"flex", justifyContent:"space-around", padding:"8px 0 10px", zIndex:50, boxShadow:"0 -4px 20px rgba(26,107,173,0.1)" }}>
        {TABS.map(t => (
          <button key={t.key} onClick={() => setTab(t.key)}
            style={{ display:"flex", flexDirection:"column", alignItems:"center", gap:2, background:"none", border:"none", cursor:"pointer", padding:"4px 10px", borderRadius:12 }}>
            <span style={{ fontSize:21, filter: tab===t.key ? "none" : "grayscale(50%)" }}>{t.icon}</span>
            <span style={{ fontSize:9, fontWeight: tab===t.key ? 800 : 600, color: tab===t.key ? C.primary : C.muted }}>{t.label}</span>
            {tab===t.key && <div style={{ width:18, height:3, borderRadius:2, background:C.primary }} />}
          </button>
        ))}
      </nav>

      {selectedVideo && <VideoPlayer v={selectedVideo} settings={settings} onClose={() => setSelectedVideo(null)} />}
    </div>
  );
}
