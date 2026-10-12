"use client";

import Image from "next/image";
import { useState } from "react";
import { ArrowRight, Check, Clock3, Menu as MenuIcon, Minus, Plus, ShoppingBag, Sparkles, Trash2, X } from "lucide-react";
import { ADD_ONS, MENU, pesos, type MenuItem } from "@/lib/menu";
import { cartSubtotal, DELIVERY_FEE, lineUnitTotal, orderTotal, validateCheckout, type CartLine, type CheckoutDetails, type Fulfillment } from "@/lib/order";

const HERO = "/tapa-republic/images/silog-feast.webp";

export function Storefront() {
  const [mobileOpen, setMobileOpen] = useState(false);
  const [selected, setSelected] = useState<MenuItem | null>(null);
  const [cartOpen, setCartOpen] = useState(false);
  const [cart, setCart] = useState<CartLine[]>([]);
  const cartCount = cart.reduce((sum, line) => sum + line.quantity, 0);

  function addToCart(itemId: string, addOnIds: string[], quantity: number) {
    const signature = `${itemId}-${[...addOnIds].sort().join("-")}`;
    setCart((current) => {
      const existing = current.find((line) => line.key === signature);
      if (existing) return current.map((line) => line.key === signature ? { ...line, quantity: line.quantity + quantity } : line);
      return [...current, { key: signature, itemId, addOnIds, quantity }];
    });
    setSelected(null);
    setCartOpen(true);
  }

  return <main>
    <div className="demo-bar"><Sparkles size={14} aria-hidden /> Fictional portfolio demo — ordering is simulated</div>
    <header className="site-header">
      <a className="brand" href="#top" aria-label="Tapa Republic home"><span className="brand-mark">TR</span><span><b>TAPA REPUBLIC</b><small>FILIPINO SILOG HOUSE</small></span></a>
      <nav className={mobileOpen ? "nav open" : "nav"} aria-label="Main navigation">
        {[["Menu","#menu"],["Promos","#promos"],["Our story","#about"],["How to order","#order"]].map(([label, href]) => <a key={href} href={href} onClick={() => setMobileOpen(false)}>{label}</a>)}
      </nav>
      <div className="header-actions">
        <button className="cart-button" onClick={() => setCartOpen(true)} aria-label={`Open cart with ${cartCount} items`}><ShoppingBag size={19}/><span>Cart</span>{cartCount > 0 && <b>{cartCount}</b>}</button>
        <button className="mobile-menu" onClick={() => setMobileOpen(!mobileOpen)} aria-label="Toggle menu">{mobileOpen ? <X/> : <MenuIcon/>}</button>
      </div>
    </header>

    <section className="hero" id="top">
      <Image src={HERO} alt="A feast of beef tapa, garlic rice, fried eggs, longganisa and bangus" fill priority sizes="100vw" />
      <div className="hero-overlay" />
      <div className="hero-copy">
        <span className="eyebrow"><span>●</span> Lutong Pinoy, all day</span>
        <h1>Your new favorite <em>silog</em> spot.</h1>
        <p className="tagline">Silog na Sulit. Sarap na Paulit-ulit.</p>
        <p className="hero-text">Big, comforting Filipino breakfasts—served with crisp edges, garlicky rice, and plenty of good mood.</p>
        <div className="hero-cta"><a className="button primary" href="#menu">Explore the menu <ArrowRight size={18}/></a><a className="button ghost" href="#about">Meet the Republic</a></div>
        <div className="hero-note"><Clock3 size={17}/><span><b>Demo kitchen:</b> Browse anytime. No real orders are placed.</span></div>
      </div>
      <div className="sun-stamp"><span>SILOG</span><b>ALL DAY</b><span>✦ 2026 ✦</span></div>
    </section>

    <section className="ticker" aria-label="Brand highlights"><div>{["GARLICKY SINANGAG","CRISPY-EDGE EGGS","PINOY COMFORT FOOD","MADE FOR SHARING"].map((x)=><span key={x}>✦ {x}</span>)}</div></section>

    <section className="section intro" id="menu">
      <div className="section-heading"><div><span className="kicker">THE REPUBLIC’S PICKS</span><h2>Silog for every kind of craving.</h2></div><p>Every plate comes with garlic rice and a sunny fried egg. Choose your favorite, then make it extra.</p></div>
      <div className="menu-grid">
        {MENU.map((item, index) => <article className={`meal-card ${item.tone}`} key={item.id}>
          <div className="meal-art" aria-hidden><span>{index % 3 === 0 ? "🍳" : index % 3 === 1 ? "🌶️" : "🍚"}</span><i>{String(index + 1).padStart(2,"0")}</i></div>
          <div className="meal-body">{item.tag && <span className="meal-tag">{item.tag}</span>}<div className="meal-title"><h3>{item.name}</h3><b>{pesos(item.price)}</b></div><p>{item.description}</p><button onClick={() => setSelected(item)}>Customize & add <Plus size={17}/></button></div>
        </article>)}
      </div>
    </section>

    <section className="promo-section" id="promos">
      <div className="promo-card mustard"><span className="promo-number">01</span><div><span className="kicker">BARKADA MOVE</span><h2>Mix, match,<br/>and make it extra.</h2><p>Add rice, egg, tapa, atchara, or a cold drink to any plate. Your silog, your rules.</p><a href="#menu">Build your plate <ArrowRight size={18}/></a></div><div className="rice-orbit">🍚<span>+ EGG</span></div></div>
      <div className="promo-card red"><span className="promo-number">02</span><div><span className="kicker">DEMO PROMO</span><h2>Republic<br/>Bundle</h2><p>Try adding four different meals to your cart for the full barkada experience. This is a showcase only—no discount is applied.</p><a href="#menu">Fill the table <ArrowRight size={18}/></a></div><div className="burst">SIMULATED<br/>OFFER</div></div>
    </section>

    <section className="section order-info" id="order">
      <div className="order-title"><span className="kicker">HOW THE DEMO WORKS</span><h2>From craving to confirmation.</h2><p>No sign-up. No payment. No personal details ever leave your browser.</p></div>
      <ol className="steps">
        <li><span>1</span><div><b>Pick your silog</b><p>Browse all eight classics and select a plate.</p></div></li>
        <li><span>2</span><div><b>Make it yours</b><p>Add extras and set the quantity for each meal.</p></div></li>
        <li><span>3</span><div><b>Choose fulfillment</b><p>Pickup is free; sample delivery is a flat ₱49.</p></div></li>
        <li><span>4</span><div><b>See your demo order</b><p>Validate details and get a simulated reference.</p></div></li>
      </ol>
      <button className="button primary dark" onClick={() => document.querySelector("#menu")?.scrollIntoView({ behavior: "smooth" })}>Start a demo order <ArrowRight size={18}/></button>
    </section>

    <section className="about" id="about">
      <div className="about-visual"><div className="plate-graphic"><span>TR</span><small>KAIN TAYO!</small></div><div className="about-label">A FICTIONAL<br/>FILIPINO FOOD<br/>CONCEPT</div></div>
      <div className="about-copy"><span className="kicker">OUR STORY</span><h2>A neighborhood silogan, reimagined.</h2><p>Tapa Republic is a fictional brand inspired by the energy of the classic Filipino tapsilogan: generous plates, familiar flavors, and the easy invitation to stay for one more bite.</p><p>This portfolio concept pairs that neighborhood warmth with a bold, modern identity—and demonstrates what a thoughtful online ordering flow could feel like for a small food business.</p><div className="about-values"><span><b>01</b> Sulit servings</span><span><b>02</b> Familiar flavors</span><span><b>03</b> Warm welcomes</span></div></div>
    </section>

    <footer><div className="footer-brand"><span className="brand-mark">TR</span><div><h2>TAPA REPUBLIC</h2><p>Silog na Sulit. Sarap na Paulit-ulit.</p></div></div><div className="footer-links"><div><b>EXPLORE</b><a href="#menu">Menu</a><a href="#promos">Promos</a><a href="#about">Our story</a></div><div><b>PLEASE NOTE</b><p>Fictional portfolio demo.<br/>No real orders, payments,<br/>or deliveries.</p></div></div><div className="footer-bottom"><span>© 2026 Tapa Republic. Fictional concept only.</span><a href="https://agosyn-digital.netlify.app" target="_blank" rel="noreferrer">Website concept by AGOSYN DIGITAL ↗</a></div></footer>

    {selected && <Customizer item={selected} onClose={() => setSelected(null)} onAdd={addToCart}/>} 
    {cartOpen && <CartDrawer cart={cart} setCart={setCart} onClose={() => setCartOpen(false)}/>} 
    {cartCount > 0 && !cartOpen && <button className="floating-cart" onClick={() => setCartOpen(true)}><ShoppingBag size={19}/><span>View cart</span><b>{cartCount}</b></button>}
  </main>;
}

function Customizer({ item, onClose, onAdd }: { item: MenuItem; onClose: () => void; onAdd: (id: string, adds: string[], qty: number) => void }) {
  const [adds, setAdds] = useState<string[]>([]); const [qty, setQty] = useState(1);
  const unit = item.price + adds.reduce((sum,id)=>sum+(ADD_ONS.find(a=>a.id===id)?.price??0),0);
  return <div className="modal-backdrop" role="presentation" onMouseDown={(e)=>e.target===e.currentTarget&&onClose()}><section className="customizer" role="dialog" aria-modal="true" aria-labelledby="custom-title"><button className="icon-close" onClick={onClose} aria-label="Close"><X/></button><span className="demo-pill">SIMULATED ORDER</span><h2 id="custom-title">Make your {item.name} extra.</h2><p>{item.description}</p><div className="base-line"><span>Base meal</span><b>{pesos(item.price)}</b></div><fieldset><legend>Choose your add-ons <small>Optional</small></legend>{ADD_ONS.map(add=><label className="addon-row" key={add.id}><input type="checkbox" checked={adds.includes(add.id)} onChange={()=>setAdds(x=>x.includes(add.id)?x.filter(i=>i!==add.id):[...x,add.id])}/><span><Check size={14}/></span><b>{add.name}</b><em>+{pesos(add.price)}</em></label>)}</fieldset><div className="custom-bottom"><div className="quantity" aria-label="Quantity"><button onClick={()=>setQty(Math.max(1,qty-1))} aria-label="Decrease quantity"><Minus/></button><b>{qty}</b><button onClick={()=>setQty(Math.min(20,qty+1))} aria-label="Increase quantity"><Plus/></button></div><button className="button primary" onClick={()=>onAdd(item.id,adds,qty)}>Add {qty} · {pesos(unit*qty)}</button></div></section></div>;
}

function CartDrawer({ cart, setCart, onClose }: { cart: CartLine[]; setCart: React.Dispatch<React.SetStateAction<CartLine[]>>; onClose: () => void }) {
  const [step,setStep]=useState<"cart"|"details"|"success">("cart"); const [fulfillment,setFulfillment]=useState<Fulfillment>("pickup");
  const [details,setDetails]=useState<CheckoutDetails>({name:"",contact:"",address:""}); const [errors,setErrors]=useState<Record<string,string>>({}); const [reference,setReference]=useState("");
  const total=orderTotal(cart,fulfillment);
  function checkout(){ const next=validateCheckout(cart,fulfillment,details); setErrors(next); if(Object.keys(next).length) return; setReference(`TR-${new Date().getFullYear()}-${Math.random().toString(36).slice(2,7).toUpperCase()}`); setStep("success"); }
  function reset(){setCart([]);setDetails({name:"",contact:"",address:""});setFulfillment("pickup");setErrors({});setStep("cart");setReference("");}
  return <div className="drawer-backdrop" onMouseDown={(e)=>e.target===e.currentTarget&&onClose()}><aside className="cart-drawer" role="dialog" aria-modal="true" aria-labelledby="cart-title">
    <header><div><span className="demo-pill">SIMULATED / DEMO</span><h2 id="cart-title">{step==="success"?"Order confirmed!":step==="details"?"Almost there.":"Your order"}</h2></div><button className="icon-close" onClick={onClose} aria-label="Close cart"><X/></button></header>
    {step==="success" ? <div className="success-state"><div className="success-icon"><Check/></div><h3>Salamat, {details.name.split(" ")[0]}!</h3><p>Your simulated order has been created. Nothing was submitted or charged.</p><div className="reference"><small>DEMO ORDER REFERENCE</small><b>{reference}</b></div><Summary cart={cart} fulfillment={fulfillment}/><p className="privacy-note">Your details stayed in this browser session and were not sent anywhere.</p><button className="button primary" onClick={reset}>Start another demo order</button></div> : <>
      <div className="drawer-body">{cart.length===0 ? <div className="empty-cart"><ShoppingBag/><h3>Your cart is craving silog.</h3><p>Choose a meal from the menu, add your extras, and it’ll appear here.</p><button className="button primary" onClick={onClose}>Browse the menu</button></div> : step==="cart" ? <><div className="cart-lines">{cart.map(line=><CartRow key={line.key} line={line} setCart={setCart}/>)}</div><div className="fulfillment"><h3>How would you like it?</h3><div>{(["pickup","delivery"] as Fulfillment[]).map(mode=><button key={mode} className={fulfillment===mode?"active":""} onClick={()=>setFulfillment(mode)}><span>{mode==="pickup"?"🏪":"🛵"}</span><b>{mode[0].toUpperCase()+mode.slice(1)}</b><small>{mode==="pickup"?"No fee":"Sample fee · ₱49"}</small></button>)}</div></div><Summary cart={cart} fulfillment={fulfillment}/><p className="privacy-note">Demo only. No payment will be collected.</p></> : <CheckoutForm fulfillment={fulfillment} details={details} setDetails={setDetails} errors={errors}/>}</div>
      {cart.length>0 && <div className="drawer-footer">{step==="cart"?<button className="button primary" onClick={()=>setStep("details")}>Continue · {pesos(total)} <ArrowRight size={18}/></button>:<><button className="back-button" onClick={()=>setStep("cart")}>← Back to cart</button><button className="button primary" onClick={checkout}>Place demo order · {pesos(total)}</button></>}</div>}
    </>}
  </aside></div>;
}

function CartRow({line,setCart}:{line:CartLine;setCart:React.Dispatch<React.SetStateAction<CartLine[]>>}) { const meal=MENU.find(m=>m.id===line.itemId)!; const names=line.addOnIds.map(id=>ADD_ONS.find(a=>a.id===id)?.name).filter(Boolean); return <article className="cart-row"><div><h3>{meal.name}</h3><p>{names.length?names.join(", "):"No add-ons"}</p><b>{pesos(lineUnitTotal(line)*line.quantity)}</b></div><div className="cart-controls"><div className="quantity small"><button onClick={()=>setCart(c=>c.map(x=>x.key===line.key?{...x,quantity:Math.max(1,x.quantity-1)}:x))} aria-label="Decrease"><Minus/></button><b>{line.quantity}</b><button onClick={()=>setCart(c=>c.map(x=>x.key===line.key?{...x,quantity:Math.min(20,x.quantity+1)}:x))} aria-label="Increase"><Plus/></button></div><button className="trash" onClick={()=>setCart(c=>c.filter(x=>x.key!==line.key))} aria-label={`Remove ${meal.name}`}><Trash2/></button></div></article> }

function Summary({cart,fulfillment}:{cart:CartLine[];fulfillment:Fulfillment}) {return <div className="summary"><p><span>Subtotal</span><b>{pesos(cartSubtotal(cart))}</b></p><p><span>{fulfillment==="delivery"?"Sample delivery fee":"Pickup fee"}</span><b>{fulfillment==="delivery"?pesos(DELIVERY_FEE):"Free"}</b></p><p className="total"><span>Total</span><b>{pesos(orderTotal(cart,fulfillment))}</b></p></div>}

function CheckoutForm({fulfillment,details,setDetails,errors}:{fulfillment:Fulfillment;details:CheckoutDetails;setDetails:(x:CheckoutDetails)=>void;errors:Record<string,string>}) {return <form className="checkout-form" onSubmit={e=>e.preventDefault()} noValidate><div className="checkout-banner"><b>{fulfillment==="pickup"?"Pickup demo":"Delivery demo"}</b><span>{fulfillment==="pickup"?"No address needed":"Sample flat fee: ₱49"}</span></div><label>Customer name<input value={details.name} onChange={e=>setDetails({...details,name:e.target.value})} autoComplete="name" aria-invalid={!!errors.name}/>{errors.name&&<small>{errors.name}</small>}</label><label>Contact number<input value={details.contact} onChange={e=>setDetails({...details,contact:e.target.value})} inputMode="tel" placeholder="09XX XXX XXXX" autoComplete="tel" aria-invalid={!!errors.contact}/>{errors.contact&&<small>{errors.contact}</small>}</label>{fulfillment==="delivery"&&<label>Delivery address<textarea value={details.address} onChange={e=>setDetails({...details,address:e.target.value})} rows={3} autoComplete="street-address" aria-invalid={!!errors.address}/>{errors.address&&<small>{errors.address}</small>}</label>}<div className="data-notice"><b>Demo privacy note</b><p>These details are used only to show the confirmation in this browser. They are not saved, transmitted, or shared.</p></div></form>}
