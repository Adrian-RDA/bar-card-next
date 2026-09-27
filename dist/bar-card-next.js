//#region node_modules/.pnpm/@lit+reactive-element@2.1.2/node_modules/@lit/reactive-element/css-tag.js
var e = globalThis, t = e.ShadowRoot && (e.ShadyCSS === void 0 || e.ShadyCSS.nativeShadow) && "adoptedStyleSheets" in Document.prototype && "replace" in CSSStyleSheet.prototype, n = Symbol(), r = /* @__PURE__ */ new WeakMap(), i = class {
	constructor(e, t, r) {
		if (this._$cssResult$ = !0, r !== n) throw Error("CSSResult is not constructable. Use `unsafeCSS` or `css` instead.");
		this.cssText = e, this.t = t;
	}
	get styleSheet() {
		let e = this.o, n = this.t;
		if (t && e === void 0) {
			let t = n !== void 0 && n.length === 1;
			t && (e = r.get(n)), e === void 0 && ((this.o = e = new CSSStyleSheet()).replaceSync(this.cssText), t && r.set(n, e));
		}
		return e;
	}
	toString() {
		return this.cssText;
	}
}, a = (e) => new i(typeof e == "string" ? e : e + "", void 0, n), o = (e, ...t) => new i(e.length === 1 ? e[0] : t.reduce((t, n, r) => t + ((e) => {
	if (!0 === e._$cssResult$) return e.cssText;
	if (typeof e == "number") return e;
	throw Error("Value passed to 'css' function must be a 'css' function result: " + e + ". Use 'unsafeCSS' to pass non-literal values, but take care to ensure page security.");
})(n) + e[r + 1], e[0]), e, n), s = (n, r) => {
	if (t) n.adoptedStyleSheets = r.map((e) => e instanceof CSSStyleSheet ? e : e.styleSheet);
	else for (let t of r) {
		let r = document.createElement("style"), i = e.litNonce;
		i !== void 0 && r.setAttribute("nonce", i), r.textContent = t.cssText, n.appendChild(r);
	}
}, c = t ? (e) => e : (e) => e instanceof CSSStyleSheet ? ((e) => {
	let t = "";
	for (let n of e.cssRules) t += n.cssText;
	return a(t);
})(e) : e, { is: l, defineProperty: u, getOwnPropertyDescriptor: d, getOwnPropertyNames: f, getOwnPropertySymbols: p, getPrototypeOf: m } = Object, h = globalThis, g = h.trustedTypes, _ = g ? g.emptyScript : "", v = h.reactiveElementPolyfillSupport, y = (e, t) => e, b = {
	toAttribute(e, t) {
		switch (t) {
			case Boolean:
				e = e ? _ : null;
				break;
			case Object:
			case Array: e = e == null ? e : JSON.stringify(e);
		}
		return e;
	},
	fromAttribute(e, t) {
		let n = e;
		switch (t) {
			case Boolean:
				n = e !== null;
				break;
			case Number:
				n = e === null ? null : Number(e);
				break;
			case Object:
			case Array: try {
				n = JSON.parse(e);
			} catch {
				n = null;
			}
		}
		return n;
	}
}, x = (e, t) => !l(e, t), S = {
	attribute: !0,
	type: String,
	converter: b,
	reflect: !1,
	useDefault: !1,
	hasChanged: x
};
Symbol.metadata ??= Symbol("metadata"), h.litPropertyMetadata ??= /* @__PURE__ */ new WeakMap();
var C = class extends HTMLElement {
	static addInitializer(e) {
		this._$Ei(), (this.l ??= []).push(e);
	}
	static get observedAttributes() {
		return this.finalize(), this._$Eh && [...this._$Eh.keys()];
	}
	static createProperty(e, t = S) {
		if (t.state && (t.attribute = !1), this._$Ei(), this.prototype.hasOwnProperty(e) && ((t = Object.create(t)).wrapped = !0), this.elementProperties.set(e, t), !t.noAccessor) {
			let n = Symbol(), r = this.getPropertyDescriptor(e, n, t);
			r !== void 0 && u(this.prototype, e, r);
		}
	}
	static getPropertyDescriptor(e, t, n) {
		let { get: r, set: i } = d(this.prototype, e) ?? {
			get() {
				return this[t];
			},
			set(e) {
				this[t] = e;
			}
		};
		return {
			get: r,
			set(t) {
				let a = r?.call(this);
				i?.call(this, t), this.requestUpdate(e, a, n);
			},
			configurable: !0,
			enumerable: !0
		};
	}
	static getPropertyOptions(e) {
		return this.elementProperties.get(e) ?? S;
	}
	static _$Ei() {
		if (this.hasOwnProperty(y("elementProperties"))) return;
		let e = m(this);
		e.finalize(), e.l !== void 0 && (this.l = [...e.l]), this.elementProperties = new Map(e.elementProperties);
	}
	static finalize() {
		if (this.hasOwnProperty(y("finalized"))) return;
		if (this.finalized = !0, this._$Ei(), this.hasOwnProperty(y("properties"))) {
			let e = this.properties, t = [...f(e), ...p(e)];
			for (let n of t) this.createProperty(n, e[n]);
		}
		let e = this[Symbol.metadata];
		if (e !== null) {
			let t = litPropertyMetadata.get(e);
			if (t !== void 0) for (let [e, n] of t) this.elementProperties.set(e, n);
		}
		this._$Eh = /* @__PURE__ */ new Map();
		for (let [e, t] of this.elementProperties) {
			let n = this._$Eu(e, t);
			n !== void 0 && this._$Eh.set(n, e);
		}
		this.elementStyles = this.finalizeStyles(this.styles);
	}
	static finalizeStyles(e) {
		let t = [];
		if (Array.isArray(e)) {
			let n = new Set(e.flat(1 / 0).reverse());
			for (let e of n) t.unshift(c(e));
		} else e !== void 0 && t.push(c(e));
		return t;
	}
	static _$Eu(e, t) {
		let n = t.attribute;
		return !1 === n ? void 0 : typeof n == "string" ? n : typeof e == "string" ? e.toLowerCase() : void 0;
	}
	constructor() {
		super(), this._$Ep = void 0, this.isUpdatePending = !1, this.hasUpdated = !1, this._$Em = null, this._$Ev();
	}
	_$Ev() {
		this._$ES = new Promise((e) => this.enableUpdating = e), this._$AL = /* @__PURE__ */ new Map(), this._$E_(), this.requestUpdate(), this.constructor.l?.forEach((e) => e(this));
	}
	addController(e) {
		(this._$EO ??= /* @__PURE__ */ new Set()).add(e), this.renderRoot !== void 0 && this.isConnected && e.hostConnected?.();
	}
	removeController(e) {
		this._$EO?.delete(e);
	}
	_$E_() {
		let e = /* @__PURE__ */ new Map(), t = this.constructor.elementProperties;
		for (let n of t.keys()) this.hasOwnProperty(n) && (e.set(n, this[n]), delete this[n]);
		e.size > 0 && (this._$Ep = e);
	}
	createRenderRoot() {
		let e = this.shadowRoot ?? this.attachShadow(this.constructor.shadowRootOptions);
		return s(e, this.constructor.elementStyles), e;
	}
	connectedCallback() {
		this.renderRoot ??= this.createRenderRoot(), this.enableUpdating(!0), this._$EO?.forEach((e) => e.hostConnected?.());
	}
	enableUpdating(e) {}
	disconnectedCallback() {
		this._$EO?.forEach((e) => e.hostDisconnected?.());
	}
	attributeChangedCallback(e, t, n) {
		this._$AK(e, n);
	}
	_$ET(e, t) {
		let n = this.constructor.elementProperties.get(e), r = this.constructor._$Eu(e, n);
		if (r !== void 0 && !0 === n.reflect) {
			let i = (n.converter?.toAttribute === void 0 ? b : n.converter).toAttribute(t, n.type);
			this._$Em = e, i == null ? this.removeAttribute(r) : this.setAttribute(r, i), this._$Em = null;
		}
	}
	_$AK(e, t) {
		let n = this.constructor, r = n._$Eh.get(e);
		if (r !== void 0 && this._$Em !== r) {
			let e = n.getPropertyOptions(r), i = typeof e.converter == "function" ? { fromAttribute: e.converter } : e.converter?.fromAttribute === void 0 ? b : e.converter;
			this._$Em = r;
			let a = i.fromAttribute(t, e.type);
			this[r] = a ?? this._$Ej?.get(r) ?? a, this._$Em = null;
		}
	}
	requestUpdate(e, t, n, r = !1, i) {
		if (e !== void 0) {
			let a = this.constructor;
			if (!1 === r && (i = this[e]), n ??= a.getPropertyOptions(e), !((n.hasChanged ?? x)(i, t) || n.useDefault && n.reflect && i === this._$Ej?.get(e) && !this.hasAttribute(a._$Eu(e, n)))) return;
			this.C(e, t, n);
		}
		!1 === this.isUpdatePending && (this._$ES = this._$EP());
	}
	C(e, t, { useDefault: n, reflect: r, wrapped: i }, a) {
		n && !(this._$Ej ??= /* @__PURE__ */ new Map()).has(e) && (this._$Ej.set(e, a ?? t ?? this[e]), !0 !== i || a !== void 0) || (this._$AL.has(e) || (this.hasUpdated || n || (t = void 0), this._$AL.set(e, t)), !0 === r && this._$Em !== e && (this._$Eq ??= /* @__PURE__ */ new Set()).add(e));
	}
	async _$EP() {
		this.isUpdatePending = !0;
		try {
			await this._$ES;
		} catch (e) {
			Promise.reject(e);
		}
		let e = this.scheduleUpdate();
		return e != null && await e, !this.isUpdatePending;
	}
	scheduleUpdate() {
		return this.performUpdate();
	}
	performUpdate() {
		if (!this.isUpdatePending) return;
		if (!this.hasUpdated) {
			if (this.renderRoot ??= this.createRenderRoot(), this._$Ep) {
				for (let [e, t] of this._$Ep) this[e] = t;
				this._$Ep = void 0;
			}
			let e = this.constructor.elementProperties;
			if (e.size > 0) for (let [t, n] of e) {
				let { wrapped: e } = n, r = this[t];
				!0 !== e || this._$AL.has(t) || r === void 0 || this.C(t, void 0, n, r);
			}
		}
		let e = !1, t = this._$AL;
		try {
			e = this.shouldUpdate(t), e ? (this.willUpdate(t), this._$EO?.forEach((e) => e.hostUpdate?.()), this.update(t)) : this._$EM();
		} catch (t) {
			throw e = !1, this._$EM(), t;
		}
		e && this._$AE(t);
	}
	willUpdate(e) {}
	_$AE(e) {
		this._$EO?.forEach((e) => e.hostUpdated?.()), this.hasUpdated || (this.hasUpdated = !0, this.firstUpdated(e)), this.updated(e);
	}
	_$EM() {
		this._$AL = /* @__PURE__ */ new Map(), this.isUpdatePending = !1;
	}
	get updateComplete() {
		return this.getUpdateComplete();
	}
	getUpdateComplete() {
		return this._$ES;
	}
	shouldUpdate(e) {
		return !0;
	}
	update(e) {
		this._$Eq &&= this._$Eq.forEach((e) => this._$ET(e, this[e])), this._$EM();
	}
	updated(e) {}
	firstUpdated(e) {}
};
C.elementStyles = [], C.shadowRootOptions = { mode: "open" }, C[y("elementProperties")] = /* @__PURE__ */ new Map(), C[y("finalized")] = /* @__PURE__ */ new Map(), v?.({ ReactiveElement: C }), (h.reactiveElementVersions ??= []).push("2.1.2");
//#endregion
//#region node_modules/.pnpm/lit-html@3.3.3/node_modules/lit-html/lit-html.js
var w = globalThis, T = (e) => e, E = w.trustedTypes, ee = E ? E.createPolicy("lit-html", { createHTML: (e) => e }) : void 0, D = "$lit$", O = `lit$${Math.random().toFixed(9).slice(2)}$`, te = "?" + O, ne = `<${te}>`, k = document, A = () => k.createComment(""), j = (e) => e === null || typeof e != "object" && typeof e != "function", M = Array.isArray, re = (e) => M(e) || typeof e?.[Symbol.iterator] == "function", N = "[ 	\n\f\r]", P = /<(?:(!--|\/[^a-zA-Z])|(\/?[a-zA-Z][^>\s]*)|(\/?$))/g, ie = /-->/g, ae = />/g, F = RegExp(`>|${N}(?:([^\\s"'>=/]+)(${N}*=${N}*(?:[^ \t\n\f\r"'\`<>=]|("|')|))|$)`, "g"), oe = /'/g, se = /"/g, ce = /^(?:script|style|textarea|title)$/i, I = ((e) => (t, ...n) => ({
	_$litType$: e,
	strings: t,
	values: n
}))(1), L = Symbol.for("lit-noChange"), R = Symbol.for("lit-nothing"), le = /* @__PURE__ */ new WeakMap(), z = k.createTreeWalker(k, 129);
function ue(e, t) {
	if (!M(e) || !e.hasOwnProperty("raw")) throw Error("invalid template strings array");
	return ee === void 0 ? t : ee.createHTML(t);
}
var de = (e, t) => {
	let n = e.length - 1, r = [], i, a = t === 2 ? "<svg>" : t === 3 ? "<math>" : "", o = P;
	for (let t = 0; t < n; t++) {
		let n = e[t], s, c, l = -1, u = 0;
		for (; u < n.length && (o.lastIndex = u, c = o.exec(n), c !== null);) u = o.lastIndex, o === P ? c[1] === "!--" ? o = ie : c[1] === void 0 ? c[2] === void 0 ? c[3] !== void 0 && (o = F) : (ce.test(c[2]) && (i = RegExp("</" + c[2], "g")), o = F) : o = ae : o === F ? c[0] === ">" ? (o = i ?? P, l = -1) : c[1] === void 0 ? l = -2 : (l = o.lastIndex - c[2].length, s = c[1], o = c[3] === void 0 ? F : c[3] === "\"" ? se : oe) : o === se || o === oe ? o = F : o === ie || o === ae ? o = P : (o = F, i = void 0);
		let d = o === F && e[t + 1].startsWith("/>") ? " " : "";
		a += o === P ? n + ne : l >= 0 ? (r.push(s), n.slice(0, l) + D + n.slice(l) + O + d) : n + O + (l === -2 ? t : d);
	}
	return [ue(e, a + (e[n] || "<?>") + (t === 2 ? "</svg>" : t === 3 ? "</math>" : "")), r];
}, B = class e {
	constructor({ strings: t, _$litType$: n }, r) {
		let i;
		this.parts = [];
		let a = 0, o = 0, s = t.length - 1, c = this.parts, [l, u] = de(t, n);
		if (this.el = e.createElement(l, r), z.currentNode = this.el.content, n === 2 || n === 3) {
			let e = this.el.content.firstChild;
			e.replaceWith(...e.childNodes);
		}
		for (; (i = z.nextNode()) !== null && c.length < s;) {
			if (i.nodeType === 1) {
				if (i.hasAttributes()) for (let e of i.getAttributeNames()) if (e.endsWith(D)) {
					let t = u[o++], n = i.getAttribute(e).split(O), r = /([.?@])?(.*)/.exec(t);
					c.push({
						type: 1,
						index: a,
						name: r[2],
						strings: n,
						ctor: r[1] === "." ? pe : r[1] === "?" ? me : r[1] === "@" ? he : U
					}), i.removeAttribute(e);
				} else e.startsWith(O) && (c.push({
					type: 6,
					index: a
				}), i.removeAttribute(e));
				if (ce.test(i.tagName)) {
					let e = i.textContent.split(O), t = e.length - 1;
					if (t > 0) {
						i.textContent = E ? E.emptyScript : "";
						for (let n = 0; n < t; n++) i.append(e[n], A()), z.nextNode(), c.push({
							type: 2,
							index: ++a
						});
						i.append(e[t], A());
					}
				}
			} else if (i.nodeType === 8) {
				if (i.data === te) c.push({
					type: 2,
					index: a
				});
				else {
					let e = -1;
					for (; (e = i.data.indexOf(O, e + 1)) !== -1;) c.push({
						type: 7,
						index: a
					}), e += O.length - 1;
				}
			}
			a++;
		}
	}
	static createElement(e, t) {
		let n = k.createElement("template");
		return n.innerHTML = e, n;
	}
};
function V(e, t, n = e, r) {
	if (t === L) return t;
	let i = r === void 0 ? n._$Cl : n._$Co?.[r], a = j(t) ? void 0 : t._$litDirective$;
	return i?.constructor !== a && (i?._$AO?.(!1), a === void 0 ? i = void 0 : (i = new a(e), i._$AT(e, n, r)), r === void 0 ? n._$Cl = i : (n._$Co ??= [])[r] = i), i !== void 0 && (t = V(e, i._$AS(e, t.values), i, r)), t;
}
var fe = class {
	constructor(e, t) {
		this._$AV = [], this._$AN = void 0, this._$AD = e, this._$AM = t;
	}
	get parentNode() {
		return this._$AM.parentNode;
	}
	get _$AU() {
		return this._$AM._$AU;
	}
	u(e) {
		let { el: { content: t }, parts: n } = this._$AD, r = (e?.creationScope ?? k).importNode(t, !0);
		z.currentNode = r;
		let i = z.nextNode(), a = 0, o = 0, s = n[0];
		for (; s !== void 0;) {
			if (a === s.index) {
				let t;
				s.type === 2 ? t = new H(i, i.nextSibling, this, e) : s.type === 1 ? t = new s.ctor(i, s.name, s.strings, this, e) : s.type === 6 && (t = new ge(i, this, e)), this._$AV.push(t), s = n[++o];
			}
			a !== s?.index && (i = z.nextNode(), a++);
		}
		return z.currentNode = k, r;
	}
	p(e) {
		let t = 0;
		for (let n of this._$AV) n !== void 0 && (n.strings === void 0 ? n._$AI(e[t]) : (n._$AI(e, n, t), t += n.strings.length - 2)), t++;
	}
}, H = class e {
	get _$AU() {
		return this._$AM?._$AU ?? this._$Cv;
	}
	constructor(e, t, n, r) {
		this.type = 2, this._$AH = R, this._$AN = void 0, this._$AA = e, this._$AB = t, this._$AM = n, this.options = r, this._$Cv = r?.isConnected ?? !0;
	}
	get parentNode() {
		let e = this._$AA.parentNode, t = this._$AM;
		return t !== void 0 && e?.nodeType === 11 && (e = t.parentNode), e;
	}
	get startNode() {
		return this._$AA;
	}
	get endNode() {
		return this._$AB;
	}
	_$AI(e, t = this) {
		e = V(this, e, t), j(e) ? e === R || e == null || e === "" ? (this._$AH !== R && this._$AR(), this._$AH = R) : e !== this._$AH && e !== L && this._(e) : e._$litType$ === void 0 ? e.nodeType === void 0 ? re(e) ? this.k(e) : this._(e) : this.T(e) : this.$(e);
	}
	O(e) {
		return this._$AA.parentNode.insertBefore(e, this._$AB);
	}
	T(e) {
		this._$AH !== e && (this._$AR(), this._$AH = this.O(e));
	}
	_(e) {
		this._$AH !== R && j(this._$AH) ? this._$AA.nextSibling.data = e : this.T(k.createTextNode(e)), this._$AH = e;
	}
	$(e) {
		let { values: t, _$litType$: n } = e, r = typeof n == "number" ? this._$AC(e) : (n.el === void 0 && (n.el = B.createElement(ue(n.h, n.h[0]), this.options)), n);
		if (this._$AH?._$AD === r) this._$AH.p(t);
		else {
			let e = new fe(r, this), n = e.u(this.options);
			e.p(t), this.T(n), this._$AH = e;
		}
	}
	_$AC(e) {
		let t = le.get(e.strings);
		return t === void 0 && le.set(e.strings, t = new B(e)), t;
	}
	k(t) {
		M(this._$AH) || (this._$AH = [], this._$AR());
		let n = this._$AH, r, i = 0;
		for (let a of t) i === n.length ? n.push(r = new e(this.O(A()), this.O(A()), this, this.options)) : r = n[i], r._$AI(a), i++;
		i < n.length && (this._$AR(r && r._$AB.nextSibling, i), n.length = i);
	}
	_$AR(e = this._$AA.nextSibling, t) {
		for (this._$AP?.(!1, !0, t); e !== this._$AB;) {
			let t = T(e).nextSibling;
			T(e).remove(), e = t;
		}
	}
	setConnected(e) {
		this._$AM === void 0 && (this._$Cv = e, this._$AP?.(e));
	}
}, U = class {
	get tagName() {
		return this.element.tagName;
	}
	get _$AU() {
		return this._$AM._$AU;
	}
	constructor(e, t, n, r, i) {
		this.type = 1, this._$AH = R, this._$AN = void 0, this.element = e, this.name = t, this._$AM = r, this.options = i, n.length > 2 || n[0] !== "" || n[1] !== "" ? (this._$AH = Array(n.length - 1).fill(/* @__PURE__ */ new String()), this.strings = n) : this._$AH = R;
	}
	_$AI(e, t = this, n, r) {
		let i = this.strings, a = !1;
		if (i === void 0) e = V(this, e, t, 0), a = !j(e) || e !== this._$AH && e !== L, a && (this._$AH = e);
		else {
			let r = e, o, s;
			for (e = i[0], o = 0; o < i.length - 1; o++) s = V(this, r[n + o], t, o), s === L && (s = this._$AH[o]), a ||= !j(s) || s !== this._$AH[o], s === R ? e = R : e !== R && (e += (s ?? "") + i[o + 1]), this._$AH[o] = s;
		}
		a && !r && this.j(e);
	}
	j(e) {
		e === R ? this.element.removeAttribute(this.name) : this.element.setAttribute(this.name, e ?? "");
	}
}, pe = class extends U {
	constructor() {
		super(...arguments), this.type = 3;
	}
	j(e) {
		this.element[this.name] = e === R ? void 0 : e;
	}
}, me = class extends U {
	constructor() {
		super(...arguments), this.type = 4;
	}
	j(e) {
		this.element.toggleAttribute(this.name, !!e && e !== R);
	}
}, he = class extends U {
	constructor(e, t, n, r, i) {
		super(e, t, n, r, i), this.type = 5;
	}
	_$AI(e, t = this) {
		if ((e = V(this, e, t, 0) ?? R) === L) return;
		let n = this._$AH, r = e === R && n !== R || e.capture !== n.capture || e.once !== n.once || e.passive !== n.passive, i = e !== R && (n === R || r);
		r && this.element.removeEventListener(this.name, this, n), i && this.element.addEventListener(this.name, this, e), this._$AH = e;
	}
	handleEvent(e) {
		typeof this._$AH == "function" ? this._$AH.call(this.options?.host ?? this.element, e) : this._$AH.handleEvent(e);
	}
}, ge = class {
	constructor(e, t, n) {
		this.element = e, this.type = 6, this._$AN = void 0, this._$AM = t, this.options = n;
	}
	get _$AU() {
		return this._$AM._$AU;
	}
	_$AI(e) {
		V(this, e);
	}
}, _e = {
	M: D,
	P: O,
	A: te,
	C: 1,
	L: de,
	R: fe,
	D: re,
	V,
	I: H,
	H: U,
	N: me,
	U: he,
	B: pe,
	F: ge
}, ve = w.litHtmlPolyfillSupport;
ve?.(B, H), (w.litHtmlVersions ??= []).push("3.3.3");
var ye = (e, t, n) => {
	let r = n?.renderBefore ?? t, i = r._$litPart$;
	if (i === void 0) {
		let e = n?.renderBefore ?? null;
		r._$litPart$ = i = new H(t.insertBefore(A(), e), e, void 0, n ?? {});
	}
	return i._$AI(e), i;
}, W = globalThis, G = class extends C {
	constructor() {
		super(...arguments), this.renderOptions = { host: this }, this._$Do = void 0;
	}
	createRenderRoot() {
		let e = super.createRenderRoot();
		return this.renderOptions.renderBefore ??= e.firstChild, e;
	}
	update(e) {
		let t = this.render();
		this.hasUpdated || (this.renderOptions.isConnected = this.isConnected), super.update(e), this._$Do = ye(t, this.renderRoot, this.renderOptions);
	}
	connectedCallback() {
		super.connectedCallback(), this._$Do?.setConnected(!0);
	}
	disconnectedCallback() {
		super.disconnectedCallback(), this._$Do?.setConnected(!1);
	}
	render() {
		return L;
	}
};
G._$litElement$ = !0, G.finalized = !0, W.litElementHydrateSupport?.({ LitElement: G });
var be = W.litElementPolyfillSupport;
be?.({ LitElement: G }), (W.litElementVersions ??= []).push("4.2.2");
//#endregion
//#region node_modules/.pnpm/@lit+reactive-element@2.1.2/node_modules/@lit/reactive-element/decorators/custom-element.js
var xe = (e) => (t, n) => {
	n === void 0 ? customElements.define(e, t) : n.addInitializer(() => {
		customElements.define(e, t);
	});
}, Se = {
	attribute: !0,
	type: String,
	converter: b,
	reflect: !1,
	hasChanged: x
}, Ce = (e = Se, t, n) => {
	let { kind: r, metadata: i } = n, a = globalThis.litPropertyMetadata.get(i);
	if (a === void 0 && globalThis.litPropertyMetadata.set(i, a = /* @__PURE__ */ new Map()), r === "setter" && ((e = Object.create(e)).wrapped = !0), a.set(n.name, e), r === "accessor") {
		let { name: r } = n;
		return {
			set(n) {
				let i = t.get.call(this);
				t.set.call(this, n), this.requestUpdate(r, i, e, !0, n);
			},
			init(t) {
				return t !== void 0 && this.C(r, void 0, e, t), t;
			}
		};
	}
	if (r === "setter") {
		let { name: r } = n;
		return function(n) {
			let i = this[r];
			t.call(this, n), this.requestUpdate(r, i, e, !0, n);
		};
	}
	throw Error("Unsupported decorator location: " + r);
};
function K(e) {
	return (t, n) => typeof n == "object" ? Ce(e, t, n) : ((e, t, n) => {
		let r = t.hasOwnProperty(n);
		return t.constructor.createProperty(n, e), r ? Object.getOwnPropertyDescriptor(t, n) : void 0;
	})(e, t, n);
}
//#endregion
//#region node_modules/.pnpm/@lit+reactive-element@2.1.2/node_modules/@lit/reactive-element/decorators/state.js
function q(e) {
	return K({
		...e,
		state: !0,
		attribute: !1
	});
}
//#endregion
//#region node_modules/.pnpm/lit-html@3.3.3/node_modules/lit-html/directive.js
var we = {
	ATTRIBUTE: 1,
	CHILD: 2,
	PROPERTY: 3,
	BOOLEAN_ATTRIBUTE: 4,
	EVENT: 5,
	ELEMENT: 6
}, Te = (e) => (...t) => ({
	_$litDirective$: e,
	values: t
}), Ee = class {
	constructor(e) {}
	get _$AU() {
		return this._$AM._$AU;
	}
	_$AT(e, t, n) {
		this._$Ct = e, this._$AM = t, this._$Ci = n;
	}
	_$AS(e, t) {
		return this.update(e, t);
	}
	update(e, t) {
		return this.render(...t);
	}
}, De = "important", Oe = " !" + De, J = Te(class extends Ee {
	constructor(e) {
		if (super(e), e.type !== we.ATTRIBUTE || e.name !== "style" || e.strings?.length > 2) throw Error("The `styleMap` directive must be used in the `style` attribute and must be the only part in the attribute.");
	}
	render(e) {
		return Object.keys(e).reduce((t, n) => {
			let r = e[n];
			return r == null ? t : t + `${n = n.includes("-") ? n : n.replace(/(?:^(webkit|moz|ms|o)|)(?=[A-Z])/g, "-$&").toLowerCase()}:${r};`;
		}, "");
	}
	update(e, [t]) {
		let { style: n } = e.element;
		if (this.ft === void 0) return this.ft = new Set(Object.keys(t)), this.render(t);
		for (let e of this.ft) t[e] ?? (this.ft.delete(e), e.includes("-") ? n.removeProperty(e) : n[e] = null);
		for (let e in t) {
			let r = t[e];
			if (r != null) {
				this.ft.add(e);
				let t = typeof r == "string" && r.endsWith(Oe);
				e.includes("-") || t ? n.setProperty(e, t ? r.slice(0, -11) : r, t ? De : "") : n[e] = r;
			}
		}
		return L;
	}
}), { I: ke } = _e, Ae = {}, je = (e, t = Ae) => e._$AH = t, Me = Te(class extends Ee {
	constructor() {
		super(...arguments), this.key = R;
	}
	render(e, t) {
		return this.key = e, t;
	}
	update(e, [t, n]) {
		return t !== this.key && (je(e), this.key = t), n;
	}
}), Ne = {
	icon: "outside",
	indicator: "outside",
	name: "inside",
	minmax: "off",
	value: "inside"
}, Y = {
	color: "var(--bar-card-color, var(--ha-progress-bar-indicator-color, var(--primary-color)))",
	min: 0,
	max: 100,
	direction: "right",
	animation: {
		state: "on",
		speed: 5,
		duration: .7,
		mode: "change"
	}
};
function Pe(e) {
	if (!e || typeof e != "object") throw Error("Invalid bar-card configuration");
	let t = e.entities ?? (e.entity ? [e.entity] : []);
	if (!Array.isArray(t) || !t.length) throw Error("Choose at least one entity");
	if (t.some((e) => !(typeof e == "string" && e || typeof e == "object" && e?.entity))) throw Error("Every bar needs an entity");
	if (e.columns !== void 0 && (!Number.isInteger(Number(e.columns)) || Number(e.columns) < 1)) throw Error("Columns must be a positive integer");
}
function Fe(e, t) {
	let n = e.entities ?? (e.entity ? [e.entity] : []), { entities: r, columns: i, stack: a, title: o, type: s, ...c } = e;
	return n.map((n) => {
		let r = typeof n == "string" ? { entity: n } : n, i = t[r.entity ?? ""], a = (c.entity_config || r.entity_config) && i ? i.attributes : {}, o = {};
		for (let e of Object.keys(Y).concat([
			"name",
			"icon",
			"unit_of_measurement",
			"target",
			"decimal",
			"height",
			"width",
			"positions",
			"severity"
		])) e in a && (o[e] = a[e]);
		let s = {
			...c,
			...o,
			...r
		};
		return {
			...Y,
			...s,
			entity: r.entity ?? e.entity ?? "",
			color: s.color || Y.color,
			min: Number(s.min ?? Y.min),
			max: Number(s.max ?? Y.max),
			direction: s.direction || Y.direction,
			positions: {
				...Ne,
				...c.positions,
				...o.positions,
				...r.positions
			},
			animation: {
				...Y.animation,
				...c.animation,
				...o.animation,
				...r.animation
			}
		};
	});
}
function X(e) {
	if (e == null || e === "" || e === "unknown" || e === "unavailable") return;
	let t = typeof e == "number" ? e : Number(e);
	return Number.isFinite(t) ? t : void 0;
}
function Ie(e, t, n) {
	return e === void 0 || !Number.isFinite(t) || !Number.isFinite(n) || n <= t ? 0 : Math.max(0, Math.min(100, (e - t) / (n - t) * 100));
}
function Le(e, t) {
	if (e !== void 0 && t !== void 0 && t !== e) return t > e ? "increase" : "decrease";
}
function Re(e, t) {
	let n = X(e);
	return [...t ?? []].reverse().find((t) => n === void 0 ? t.text !== void 0 && t.text === String(e) : t.from !== void 0 && t.to !== void 0 && n >= Number(t.from) && n <= Number(t.to));
}
function ze(e, t, n) {
	let r = X(e);
	if (r === void 0) return String(e ?? "unknown");
	let i = t.complementary ? t.max - r : r, a = t.decimal === void 0 ? void 0 : Math.max(0, Math.min(10, Number(t.decimal)));
	return `${a === void 0 ? String(Math.round(i * 1e3) / 1e3) : i.toFixed(a)}${n ? ` ${n}` : ""}`;
}
//#endregion
//#region src/styles.ts
var Be = o`
  :host {
    display: block;
    --bar-radius: var(
      --bar-card-border-radius,
      var(--ha-progress-bar-border-radius, var(--ha-card-border-radius, 12px))
    );
  }
  ha-card {
    display: block;
    background: var(--ha-card-background, var(--card-background-color, var(--ha-color-surface-default, #fff)));
    border-radius: var(--bar-card-card-radius, var(--ha-card-border-radius, 12px));
    box-shadow: var(--ha-card-box-shadow, var(--ha-box-shadow-s, 0 2px 8px #0002));
    overflow: hidden;
  }
  ha-card.square {
    border-radius: 0;
  }
  ha-card.entity-row {
    background: transparent;
    box-shadow: none;
    border: 0;
  }
  .card-title {
    padding: 18px 18px 0;
    font-size: 1.05rem;
    font-weight: 600;
    color: var(--primary-text-color);
  }
  .bars {
    display: grid;
    grid-template-columns: repeat(var(--columns), minmax(0, 1fr));
    gap: 12px 16px;
    padding: 16px;
  }
  .entity-row .bars {
    padding: 0;
  }
  .bar-error {
    grid-column: 1 / -1;
    padding: 10px 12px;
    border-radius: 10px;
    background: var(--warning-color, #a65f00);
    color: white;
  }
  bar-card-card {
    display: flex;
    align-items: center;
    gap: 8px;
    min-width: 0;
    color: var(--primary-text-color);
    cursor: pointer;
    border-radius: var(--bar-radius);
    outline: 0;
  }
  bar-card-card:focus-visible {
    box-shadow: 0 0 0 3px var(--primary-color);
  }
  bar-card-card.vertical {
    flex-direction: column;
    min-height: var(--bar-height);
  }
  .outside {
    display: flex;
    align-items: center;
    gap: 7px;
    min-width: 0;
  }
  .outside:empty {
    display: none;
  }
  .leading ha-icon {
    --mdc-icon-size: 22px;
    color: var(--bar-color);
  }
  .name {
    min-width: 0;
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
    font-weight: 500;
  }
  .value {
    white-space: nowrap;
    font-weight: 650;
    font-variant-numeric: tabular-nums;
  }
  .indicator {
    font-size: 0.8rem;
    color: var(--bar-color);
  }
  .minmax {
    font-size: 0.72rem;
    opacity: 0.8;
    white-space: nowrap;
  }
  bar-card-background {
    display: block;
    position: relative;
    flex: 1;
    min-width: 0;
    width: var(--bar-width);
    height: var(--bar-height);
    border-radius: var(--bar-radius);
    isolation: isolate;
  }
  .vertical bar-card-background {
    width: min(var(--bar-width), 100%);
    min-height: var(--bar-height);
  }
  bar-card-backgroundbar,
  bar-card-currentbar,
  bar-card-change {
    display: block;
    position: absolute;
    inset: 0;
    border-radius: inherit;
  }
  bar-card-backgroundbar {
    background: var(--ha-progress-bar-track-color, color-mix(in srgb, var(--bar-color) 16%, transparent));
  }
  bar-card-currentbar {
    background: var(--bar-color);
    width: var(--bar-progress);
  }
  .motion-change bar-card-currentbar {
    transition:
      width var(--change-duration) ease,
      height var(--change-duration) ease;
  }
  bar-card-change {
    pointer-events: none;
    z-index: 2;
    background: linear-gradient(
      100deg,
      transparent 15%,
      color-mix(in srgb, var(--bar-color) 25%, white) 50%,
      transparent 85%
    );
    opacity: 0;
    animation: bar-change var(--change-duration) ease-out 1;
  }
  @keyframes bar-change {
    20% {
      opacity: 0.55;
    }
    100% {
      opacity: 0;
    }
  }
  .horizontal.reverse bar-card-currentbar {
    left: auto;
    right: 0;
  }
  .vertical bar-card-currentbar {
    top: auto;
    bottom: 0;
    width: 100%;
    height: var(--bar-progress);
  }
  .vertical.reverse bar-card-currentbar {
    top: 0;
    bottom: auto;
  }
  bar-card-currentbar.animated {
    animation: bar-pulse var(--animation-speed) ease-in-out infinite;
  }
  @keyframes bar-pulse {
    50% {
      opacity: 0.65;
    }
  }
  bar-card-markerbar {
    display: block;
    position: absolute;
    z-index: 2;
    left: var(--bar-target);
    top: 0;
    bottom: 0;
    width: 2px;
    background: var(--primary-text-color);
    opacity: 0.8;
  }
  .horizontal.reverse bar-card-markerbar {
    left: auto;
    right: var(--bar-target);
  }
  .vertical bar-card-markerbar {
    left: 0;
    right: 0;
    top: auto;
    bottom: var(--bar-target);
    width: auto;
    height: 2px;
  }
  .vertical.reverse bar-card-markerbar {
    top: var(--bar-target);
    bottom: auto;
  }
  bar-card-contentbar {
    position: absolute;
    z-index: 3;
    inset: 0;
    display: flex;
    align-items: center;
    gap: 8px;
    padding: 0 10px;
    min-width: 0;
  }
  bar-card-contentbar .value {
    margin-left: auto;
  }
  bar-card-contentbar ha-icon {
    --mdc-icon-size: 20px;
    flex: none;
  }
  .vertical bar-card-contentbar {
    flex-direction: column;
    justify-content: space-between;
    padding: 10px 4px;
    text-align: center;
  }
  .vertical bar-card-contentbar .value {
    margin: 0;
    padding: 3px 6px;
    border-radius: 6px;
    color: var(--primary-text-color);
    background: var(--card-background-color, var(--ha-color-surface-default, #fff));
    box-shadow: var(--ha-box-shadow-s, 0 1px 4px #0002);
  }
  .vertical .outside {
    justify-content: center;
  }
  @media (max-width: 520px) {
    .bars {
      grid-template-columns: 1fr;
    }
  }
  @media (prefers-reduced-motion: reduce) {
    bar-card-currentbar {
      transition: none;
      animation: none !important;
    }
    bar-card-change {
      animation: none !important;
      display: none;
    }
  }
`, Ve = { de: {
	Entities: "Entitäten",
	Appearance: "Darstellung",
	Values: "Werte",
	Rules: "Regeln",
	Actions: "Aktionen",
	"All bars": "Alle Balken",
	"Editing:": "Bearbeitung:",
	"Build clear, useful bars for your dashboard.": "Erstelle übersichtliche Balken für dein Dashboard.",
	"Add, arrange, and customize each bar.": "Balken hinzufügen, sortieren und einzeln anpassen.",
	"Add entity": "Entität hinzufügen",
	"Move up": "Nach oben",
	"Move down": "Nach unten",
	Remove: "Entfernen",
	"Remove rule": "Regel entfernen",
	"Editor sections": "Editorbereiche",
	"Choose an entity": "Entität auswählen",
	"Selected entity": "Ausgewählte Entität",
	"Choose an entity using Home Assistant’s entity picker.": "Entität mit dem nativen Home-Assistant-Entitätsauswahlfeld auswählen.",
	"Choose an icon from Home Assistant’s icon picker.": "Icon mit dem nativen Home-Assistant-Icon-Picker auswählen.",
	"Layout, color, and visible labels.": "Layout, Farbe und sichtbare Beschriftungen.",
	"Card title": "Kartentitel",
	Columns: "Spalten",
	Stack: "Anordnung",
	Name: "Name",
	Icon: "Icon",
	Color: "Farbe",
	Shape: "Form",
	theme: "Home-Assistant-Design",
	square: "Eckig",
	Direction: "Richtung",
	Height: "Höhe",
	Width: "Breite",
	"Use in an entities card": "In einer Entitätenkarte verwenden",
	"Removes the card background and outer spacing.": "Entfernt Kartenhintergrund und äußeren Abstand.",
	"Border radius": "Eckenradius",
	"Bar radius": "Balken-Eckenradius",
	"Card radius": "Container-Eckenradius",
	"Example: 12px; empty uses the Home Assistant theme.": "Beispiel: 12px; leer verwendet das Home-Assistant-Theme.",
	Bar: "Balken",
	"Use entity attributes as options": "Entitätsattribute als Optionen verwenden",
	"Element positions": "Positionen der Elemente",
	Indicator: "Indikator",
	Minmax: "Minimum/Maximum",
	Value: "Wert",
	"Choose color": "Farbe wählen",
	"Choose a color or enter a theme variable.": "Farbe wählen oder Theme-Variable eingeben.",
	"Set the range, number format, and animation.": "Bereich, Zahlenformat und Animation festlegen.",
	Attribute: "Attribut",
	Minimum: "Minimum",
	Maximum: "Maximum",
	"Target marker": "Zielmarkierung",
	Decimals: "Nachkommastellen",
	Unit: "Einheit",
	"Limit displayed value to range": "Angezeigten Wert auf den Bereich begrenzen",
	"Show complementary value": "Komplementärwert anzeigen",
	Animation: "Animation",
	"Animated bar": "Balken animieren",
	"Animation mode": "Animationsart",
	"Default (change)": "Standard (Wertwechsel)",
	change: "Wertwechsel",
	pulse: "Pulsieren",
	both: "Beides",
	"Change duration in seconds": "Dauer des Wertwechsels in Sekunden",
	"Pulse speed in seconds": "Pulsdauer in Sekunden",
	"Speed in seconds": "Geschwindigkeit in Sekunden",
	"Severity rules": "Schwellenwertregeln",
	"Choose a color or icon for ranges and text states.": "Farbe oder Icon für Wertebereiche und Textzustände wählen.",
	"Add rule": "Regel hinzufügen",
	Rule: "Regel",
	From: "Von",
	To: "Bis",
	"Text state": "Textzustand",
	"Hide bar": "Balken ausblenden",
	"No rules yet. Add one to change the bar based on its value.": "Noch keine Regeln. Füge eine hinzu, um den Balken abhängig vom Wert zu ändern.",
	"What happens when someone taps, holds, or double taps a bar.": "Aktionen beim Tippen, Gedrückthalten und Doppeltippen.",
	Tap: "Tippen",
	Hold: "Gedrückthalten",
	"Double tap": "Doppeltippen",
	Action: "Aktion",
	"Default / inherit": "Standard / geerbt",
	Default: "Standard",
	"Theme color or CSS value": "Theme-Farbe oder CSS-Wert",
	"Navigation path": "Navigationspfad",
	URL: "URL",
	"Service / action": "Dienst / Aktion",
	"Target entity ID": "Ziel-Entitäts-ID",
	"Entity ID (optional)": "Entitäts-ID (optional)",
	"Replace browser history": "Browserverlauf ersetzen",
	"Start listening": "Spracherkennung starten",
	"Pipeline ID (optional)": "Pipeline-ID (optional)",
	"Ask for confirmation": "Bestätigung anfordern",
	"Action data (JSON object)": "Aktionsdaten (JSON-Objekt)",
	"Action data must be a valid JSON object.": "Aktionsdaten müssen ein gültiges JSON-Objekt sein.",
	Inherited: "Geerbt",
	Automatic: "Automatisch",
	inside: "Innen",
	outside: "Außen",
	off: "Aus",
	right: "Rechts",
	left: "Links",
	up: "Oben",
	down: "Unten",
	horizontal: "Horizontal",
	"Entity not available": "Entität nicht verfügbar",
	Increasing: "Steigend",
	Decreasing: "Fallend",
	"Example: mdi:lightning-bolt": "Beispiel: mdi:lightning-bolt",
	"Example: 40px or 180px for vertical bars": "Beispiel: 40px oder 180px für vertikale Balken",
	"Example: 100% or 240px": "Beispiel: 100% oder 240px",
	"Leave blank for entity state": "Leer lassen für den Entitätszustand",
	"Zero is a valid target": "Null ist ein gültiger Zielwert"
} };
function He(e, t) {
	return Ve[e?.toLowerCase().split(/[-_]/)[0] ?? ""]?.[t] ?? t;
}
//#endregion
//#region \0@oxc-project+runtime@0.151.0/helpers/esm/decorate.js
function Z(e, t, n, r) {
	var i = arguments.length, a = i < 3 ? t : r === null ? r = Object.getOwnPropertyDescriptor(t, n) : r, o;
	if (typeof Reflect == "object" && typeof Reflect.decorate == "function") a = Reflect.decorate(e, t, n, r);
	else for (var s = e.length - 1; s >= 0; s--) (o = e[s]) && (a = (i < 3 ? o(a) : i > 3 ? o(t, n, a) : o(t, n)) || a);
	return i > 3 && a && Object.defineProperty(t, n, a), a;
}
//#endregion
//#region src/editor.ts
var Q = class extends G {
	constructor(...e) {
		super(...e), this.selected = -1, this.tab = "entities", this.error = "";
	}
	t(e) {
		return He(this.hass?.locale?.language ?? this.hass?.language, e);
	}
	setConfig(e) {
		this.config = structuredClone(e);
		let t = this.entries().length;
		this.selected >= t && (this.selected = -1);
	}
	entries() {
		return this.config ? this.config.entities ?? (this.config.entity ? [this.config.entity] : []) : [];
	}
	normalized() {
		let e = structuredClone(this.config ?? {});
		return e.entities || (e.entities = e.entity ? [{ entity: e.entity }] : [], delete e.entity), e.entities = e.entities.map((e) => typeof e == "string" ? { entity: e } : e), e;
	}
	scope() {
		if (this.selected === -1) return this.config ?? {};
		let e = this.entries()[this.selected];
		return typeof e == "string" ? { entity: e } : e ?? {};
	}
	selectedLabel() {
		let e = this.scope().entity ?? "";
		return this.hass?.states[e]?.attributes.friendly_name || e || `Bar ${this.selected + 1}`;
	}
	edit(e) {
		let t = this.normalized();
		e(t, this.selected === -1 ? t : t.entities[this.selected]), this.config = t, this.error = "", this.dispatchEvent(new CustomEvent("config-changed", {
			detail: { config: t },
			bubbles: !0,
			composed: !0
		}));
	}
	change(e, t) {
		this.edit((n, r) => {
			t === "" || t === void 0 ? delete r[e] : r[e] = t;
		});
	}
	addEntity() {
		let e = Object.keys(this.hass?.states ?? {})[0] ?? "", t = this.normalized();
		t.entities.push({ entity: e }), this.config = t, this.selected = t.entities.length - 1, this.emit(t);
	}
	moveEntity(e, t) {
		let n = this.normalized(), r = e + t;
		r < 0 || r >= n.entities.length || ([n.entities[e], n.entities[r]] = [n.entities[r], n.entities[e]], this.config = n, this.selected = r, this.emit(n));
	}
	removeEntity(e) {
		let t = this.normalized();
		t.entities.splice(e, 1), t.entities.length && (this.config = t, this.selected = -1, this.emit(t));
	}
	emit(e) {
		this.dispatchEvent(new CustomEvent("config-changed", {
			detail: { config: e },
			bubbles: !0,
			composed: !0
		}));
	}
	field(e, t, n = "text", r = [], i = "") {
		let a = this.scope()[t], o = this.selected !== -1 && a === void 0, s = o ? `${this.t("Inherited")}: ${String(this.config?.[t] ?? "default")}` : "";
		return I`<label class="field">
      <span>${this.t(e)}</span>
      ${n === "checkbox" ? I`<ha-switch
              .checked=${!!(a ?? this.config?.[t])}
              @change=${(e) => this.change(t, e.target.checked)}
            ></ha-switch>` : n === "select" ? I`<ha-select
                .options=${[...o ? [{
			value: "",
			label: this.t("Inherited")
		}] : [], ...r.map((e) => ({
			value: e,
			label: this.t(e)
		}))]}
                .value=${String(a ?? "")}
                @selected=${(e) => this.change(t, e.detail.value ?? "")}
              ></ha-select>` : I`<ha-input
                .type=${n === "number" ? "number" : "text"}
                .value=${a === void 0 ? "" : String(a)}
                placeholder=${s || R}
                @change=${(e) => {
			let r = e.target.value;
			this.change(t, n === "number" && r !== "" ? Number(r) : r);
		}}
              ></ha-input>`}
      ${i ? I`<small>${this.t(i)}</small>` : R}
    </label>`;
	}
	globalField(e, t, n = "text", r = []) {
		let i = this.config?.[t];
		return I`<label class="field"
      ><span>${this.t(e)}</span>
      ${n === "checkbox" ? I`<ha-switch
              .checked=${!!i}
              @change=${(e) => this.edit((n) => {
			n[t] = e.target.checked;
		})}
            ></ha-switch>` : n === "select" ? I`<ha-select
              .options=${r.map((e) => ({
			value: e,
			label: e ? this.t(e) : this.t("Automatic")
		}))}
              .value=${String(i ?? "")}
              @selected=${(e) => this.edit((n) => {
			n[t] = e.detail.value ?? "";
		})}
            ></ha-select>` : I`<ha-input
              .type=${n === "number" ? "number" : "text"}
              .value=${i === void 0 ? "" : String(i)}
              @change=${(e) => this.edit((r) => {
			let i = e.target.value;
			i ? r[t] = n === "number" ? Number(i) : i : delete r[t];
		})}
            ></ha-input>`}
    </label>`;
	}
	renderEntities() {
		let e = this.entries();
		return I`<section class="panel">
      <div class="section-head">
        <div>
          <h3>${this.t("Entities")}</h3>
          <p>${this.t("Add, arrange, and customize each bar.")}</p>
        </div>
        <button class="primary" type="button" @click=${this.addEntity}>+ ${this.t("Add entity")}</button>
      </div>
      <div class="entity-list">
        ${e.map((t, n) => {
			let r = typeof t == "string" ? t : t.entity ?? "";
			return I`<div class="entity-row ${this.selected === n ? "active" : ""}">
            <button
              type="button"
              class="entity-select"
              @click=${() => {
				this.selected = n, this.tab = "appearance";
			}}
            >
              <span class="entity-index" aria-hidden="true">${n + 1}</span>
              <span class="entity-copy">
                <span class="entity-name"
                  >${this.hass?.states[r]?.attributes.friendly_name || r || this.t("Choose an entity")}</span
                >
                <small>${r}</small>
              </span>
            </button>
            <div class="row-actions">
              <button
                type="button"
                aria-label=${this.t("Move up")}
                ?disabled=${n === 0}
                @click=${() => this.moveEntity(n, -1)}
              >
                ↑
              </button>
              <button
                type="button"
                aria-label=${this.t("Move down")}
                ?disabled=${n === e.length - 1}
                @click=${() => this.moveEntity(n, 1)}
              >
                ↓
              </button>
              <button
                type="button"
                aria-label=${this.t("Remove")}
                ?disabled=${e.length === 1}
                @click=${() => this.removeEntity(n)}
              >
                ×
              </button>
            </div>
          </div>`;
		})}
      </div>
      ${this.selected >= 0 ? I`<div class="divider"></div>
              ${this.entityPicker()}` : R}
    </section>`;
	}
	entityPicker() {
		let e = this.scope().entity ?? "";
		return I`<label class="field"
      ><span>${this.t("Selected entity")}</span>
      <ha-entity-picker
        .hass=${this.hass}
        .value=${e}
        allow-custom-entity
        @value-changed=${(e) => this.change("entity", e.detail.value ?? "")}
      ></ha-entity-picker>
      <small>${this.t("Choose an entity using Home Assistant’s entity picker.")}</small>
    </label>`;
	}
	renderAppearance() {
		return I`<section class="panel">
      <h3>${this.t("Appearance")}</h3>
      <p>${this.t("Layout, color, and visible labels.")}</p>
      ${this.selected === -1 ? I`<div class="fields">
              ${this.globalField("Card title", "title")}
              ${this.globalField("Columns", "columns", "number")}
              ${this.globalField("Stack", "stack", "select", ["", "horizontal"])}
              ${this.globalField("Card radius", "card_radius")}
              ${this.globalField("Use in an entities card", "entity_row", "checkbox")}
            </div>` : this.entityPicker()}
      <div class="fields appearance-fields">
        ${this.field("Name", "name")}${this.iconField()}
        <div class="field-stack">
          ${this.colorField()}
          ${this.field("Shape", "shape", "select", ["theme", "square"])}
        </div>
        ${this.field("Direction", "direction", "select", [
			"right",
			"left",
			"up",
			"down"
		])}
        ${this.field("Height", "height", "text", [], "Example: 40px or 180px for vertical bars")}
        ${this.field("Width", "width", "text", [], "Example: 100% or 240px")}
        ${this.field("Bar radius", "border_radius", "text", [], "Example: 12px; empty uses the Home Assistant theme.")}
        ${this.field("Use entity attributes as options", "entity_config", "checkbox")}
      </div>
      <h4>${this.t("Element positions")}</h4>
      <div class="fields">
        ${Object.keys(Ne).map((e) => this.positionField(e))}
      </div>
    </section>`;
	}
	positionField(e) {
		let t = this.scope().positions?.[e];
		return I`<label class="field"
      ><span>${this.t(e[0].toUpperCase() + e.slice(1))}</span>
      <ha-select
        .options=${[{
			value: "",
			label: this.selected === -1 ? `${this.t("Default")} (${this.t(Ne[e])})` : this.t("Inherited")
		}, ...[
			"inside",
			"outside",
			"off"
		].map((e) => ({
			value: e,
			label: this.t(e)
		}))]}
        .value=${String(t ?? "")}
        @selected=${(t) => this.edit((n, r) => {
			let i = { ...r.positions }, a = t.detail.value ?? "";
			a ? i[e] = a : delete i[e], r.positions = i;
		})}
      >
      ></ha-select></label
    >`;
	}
	colorField() {
		let e = this.scope().color ?? "", t = /^#[0-9a-fA-F]{6}$/.test(e) ? e : "#0d8ac7";
		return I`<label class="field"
      ><span>${this.t("Color")}</span
      ><span class="color-control">
        <ha-input
          type="color"
          .value=${t}
          aria-label=${this.t("Choose color")}
          @change=${(e) => this.change("color", e.target.value)}
        ></ha-input>
        <ha-input
          type="text"
          .value=${e}
          placeholder=${this.t("Theme color or CSS value")}
          @change=${(e) => this.change("color", e.target.value)}
        ></ha-input> </span
      ><small>${this.t("Choose a color or enter a theme variable.")}</small></label
    >`;
	}
	iconField() {
		let e = this.scope().icon ?? "";
		return I`<label class="field"
      ><span>${this.t("Icon")}</span>
      <ha-icon-picker
        .value=${e}
        .placeholder=${this.t("Example: mdi:lightning-bolt")}
        @value-changed=${(e) => this.change("icon", e.detail.value ?? "")}
      ></ha-icon-picker>
      <small>${this.t("Choose an icon from Home Assistant’s icon picker.")}</small>
    </label>`;
	}
	renderValues() {
		let e = this.scope().animation ?? {}, t = e.mode ?? this.config?.animation?.mode ?? "change", n = (e.state ?? this.config?.animation?.state ?? "on") !== "off";
		return I`<section class="panel">
      <h3>${this.t("Values")}</h3>
      <p>${this.t("Set the range, number format, and animation.")}</p>
      <div class="fields">
        ${this.field("Attribute", "attribute", "text", [], "Leave blank for entity state")}
        ${this.field("Minimum", "min", "number")}${this.field("Maximum", "max", "number")}
        ${this.field("Target marker", "target", "number", [], "Zero is a valid target")}
        ${this.field("Decimals", "decimal", "number")}${this.field("Unit", "unit_of_measurement")}
        ${this.field("Limit displayed value to range", "limit_value", "checkbox")}
        ${this.field("Show complementary value", "complementary", "checkbox")}
      </div>
      <h4>${this.t("Animation")}</h4>
      <div class="fields">
        <label class="field"
          ><span>${this.t("Animated bar")}</span
          ><ha-switch
            .checked=${n}
            @change=${(e) => this.edit((t, n) => {
			n.animation = {
				...n.animation,
				state: e.target.checked ? "on" : "off"
			};
		})}
        ></ha-switch></label>
        <label class="field"
          ><span>${this.t("Animation mode")}</span>
          <ha-select
            .options=${[{
			value: "",
			label: this.selected === -1 ? this.t("Default (change)") : this.t("Inherited")
		}, ...[
			"change",
			"pulse",
			"both"
		].map((e) => ({
			value: e,
			label: this.t(e)
		}))]}
            .value=${String(e.mode ?? "")}
            @selected=${(e) => this.edit((t, n) => {
			let r = e.detail.value ?? "";
			n.animation = {
				...n.animation,
				mode: r || void 0
			};
		})}
          >
          ></ha-select></label
        >
        ${t === "change" || t === "both" ? I`<label class="field"
                ><span>${this.t("Change duration in seconds")}</span>
                <ha-input
                  type="number"
                  min="0.1"
                  max="5"
                  step="0.1"
                  .value=${String(e.duration ?? "")}
                  placeholder="0.7"
                  @change=${(e) => this.edit((t, n) => {
			let r = e.target.value;
			n.animation = {
				...n.animation,
				duration: r ? Number(r) : void 0
			};
		})}
                ></ha-input></label>` : R}
        ${t === "pulse" || t === "both" ? I`<label class="field"
                ><span>${this.t("Pulse speed in seconds")}</span>
                <ha-input
                  type="number"
                  min="0.2"
                  step="0.1"
                  .value=${String(e.speed ?? "")}
                  placeholder="5"
                  @change=${(e) => this.edit((t, n) => {
			let r = e.target.value;
			n.animation = {
				...n.animation,
				speed: r ? Number(r) : void 0
			};
		})}
                ></ha-input></label>` : R}
      </div>
    </section>`;
	}
	renderRules() {
		let e = this.scope().severity ?? [];
		return I`<section class="panel">
      <div class="section-head">
        <div>
          <h3>${this.t("Severity rules")}</h3>
          <p>${this.t("Choose a color or icon for ranges and text states.")}</p>
        </div>
        <button
          type="button"
          class="primary"
          @click=${() => this.edit((e, t) => {
			t.severity = [...t.severity ?? [], {
				from: 0,
				to: 100,
				color: "#4caf50"
			}];
		})}
        >
          + ${this.t("Add rule")}
        </button>
      </div>
      ${e.length ? e.map((e, t) => I`<div class="rule">
                  <div class="rule-head">
                    <strong>${this.t("Rule")} ${t + 1}</strong>
                    <button
                      type="button"
                      aria-label=${this.t("Remove rule")}
                      @click=${() => this.edit((e, n) => {
			n.severity = n.severity?.filter((e, n) => n !== t);
		})}
                    >
                      ×
                    </button>
                  </div>
                  <div class="fields">
                    ${this.ruleField(t, e, "from", "From", "number")}${this.ruleField(t, e, "to", "To", "number")}
                    ${this.ruleField(t, e, "text", "Text state")}${this.ruleField(t, e, "color", "Color")}
                    ${this.ruleField(t, e, "icon", "Icon")}${this.ruleField(t, e, "hide", "Hide bar", "checkbox")}
                  </div>
                </div>`) : I`<p class="empty">
              ${this.t("No rules yet. Add one to change the bar based on its value.")}
            </p>`}
    </section>`;
	}
	ruleField(e, t, n, r, i = "text") {
		return I`<label class="field"
      ><span>${this.t(r)}</span>
      ${i === "checkbox" ? I`<ha-switch
            .checked=${!!t[n]}
            @change=${(t) => this.edit((r, i) => {
			let a = [...i.severity ?? []];
			a[e] = {
				...a[e],
				[n]: t.target.checked
			}, i.severity = a;
		})}
          ></ha-switch>` : I`<ha-input
            .type=${i === "number" ? "number" : "text"}
            .value=${String(t[n] ?? "")}
            @change=${(t) => this.edit((r, a) => {
			let o = [...a.severity ?? []], s = t.target.value, c = { ...o[e] };
			s === "" ? delete c[n] : c[n] = i === "number" ? Number(s) : s, o[e] = c, a.severity = o;
		})}
          ></ha-input>`}</label>`;
	}
	renderActions() {
		return I`<section class="panel">
      <h3>${this.t("Actions")}</h3>
      <p>${this.t("What happens when someone taps, holds, or double taps a bar.")}</p>
      ${this.actionEditor("tap_action", "Tap")}${this.actionEditor("hold_action", "Hold")}${this.actionEditor("double_tap_action", "Double tap")}
    </section>`;
	}
	actionEditor(e, t) {
		let n = this.scope()[e], r = n?.action ?? "", i = (t, i, a = "text") => I`<label class="field"
        ><span>${this.t(t)}</span>
        <ha-input
          .type=${a === "number" ? "number" : "text"}
          .value=${String(n?.[i] ?? "")}
          @change=${(t) => this.edit((n, a) => {
			let o = { ...a[e] ?? { action: r } }, s = t.target.value;
			s ? o[i] = s : delete o[i], a[e] = o;
		})}
        ></ha-input></label>`, a = n?.target, o = n?.service_data, s = String(a?.entity_id ?? o?.entity_id ?? "");
		return I`<div class="action-block">
      <h4>${this.t(t)}</h4>
      <div class="fields">
        <label class="field"
          ><span>${this.t("Action")}</span
          ><ha-select
            .options=${[
			"",
			"more-info",
			"toggle",
			"navigate",
			"url",
			"perform-action",
			"call-service",
			"assist",
			"none"
		].map((e) => ({
			value: e,
			label: e || this.t("Default / inherit")
		}))}
            .value=${r}
            @selected=${(t) => this.edit((n, r) => {
			let i = t.detail.value ?? "";
			i ? r[e] = { action: i } : delete r[e];
		})}
          ></ha-select></label
        >
        ${r === "navigate" ? i("Navigation path", "navigation_path") : R}
        ${r === "url" ? i("URL", "url_path") : R}
        ${r === "perform-action" || r === "call-service" ? I` ${i("Service / action", r === "perform-action" ? "perform_action" : "service")}
                <label class="field"
                  ><span>${this.t("Target entity ID")}</span
                  ><ha-input
                    type="text"
                    .value=${s}
                    @change=${(t) => this.edit((n, i) => {
			let a = { ...i[e] ?? { action: r } }, o = t.target.value;
			r === "call-service" ? a.service_data = {
				...a.service_data ?? {},
				entity_id: o
			} : a.target = {
				...a.target ?? {},
				entity_id: o
			}, i[e] = a;
		})}
                  ></ha-input></label>` : R}
        ${r === "more-info" || r === "toggle" || r === "assist" ? i("Entity ID (optional)", "entity") : R}
        ${r === "navigate" ? I`<label class="field"
                ><span>${this.t("Replace browser history")}</span
                ><ha-switch
                  .checked=${!!n?.navigation_replace}
                  @change=${(t) => this.edit((n, i) => {
			i[e] = {
				...i[e] ?? { action: r },
				navigation_replace: t.target.checked
			};
		})}
                ></ha-switch></label>` : R}
        ${r === "assist" ? I`<label class="field"
                ><span>${this.t("Start listening")}</span
                ><ha-switch
                  .checked=${!!n?.start_listening}
                  @change=${(t) => this.edit((n, i) => {
			i[e] = {
				...i[e] ?? { action: r },
				start_listening: t.target.checked
			};
		})}
                ></ha-switch></label>` : R}
        ${r === "assist" ? i("Pipeline ID (optional)", "pipeline_id") : R}
        ${r ? I`<label class="field"
                ><span>${this.t("Ask for confirmation")}</span
                ><ha-switch
                  .checked=${!!n?.confirmation}
                  @change=${(t) => this.edit((n, i) => {
			i[e] = {
				...i[e] ?? { action: r },
				confirmation: t.target.checked
			};
		})}
                ></ha-switch></label>` : R}
      </div>
      ${r === "perform-action" || r === "call-service" ? I`<label class="field full"
              ><span>${this.t("Action data (JSON object)")}</span>
              <ha-textarea
                rows="3"
                .value=${JSON.stringify(n?.data ?? n?.service_data ?? {}, null, 2)}
                @change=${(t) => {
			try {
				let n = JSON.parse(t.target.value);
				if (typeof n != "object" || Array.isArray(n) || n === null) throw Error("Enter a JSON object");
				this.edit((t, i) => {
					i[e] = {
						...i[e] ?? { action: r },
						[r === "call-service" ? "service_data" : "data"]: n
					};
				});
			} catch {
				this.error = this.t("Action data must be a valid JSON object.");
			}
		}}
              ></ha-textarea>
            </label>` : R}
    </div>`;
	}
	render() {
		return this.config ? I`<div class="editor" style=${J({ "--editor-card-radius": this.config.shape === "square" ? "0px" : this.config.card_radius === void 0 ? void 0 : `${this.config.card_radius}${typeof this.config.card_radius == "number" ? "px" : ""}` })}>
      <header>
        <div>
          <h2>Bar Card Next</h2>
          <p>${this.t("Build clear, useful bars for your dashboard.")}</p>
        </div>
        <span class="scope"
          >${this.t("Editing:")}
          ${this.selected === -1 ? this.t("All bars") : this.selectedLabel()}</span
        >
      </header>
      <div class="scope-switch">
        <button
          type="button"
          class=${this.selected === -1 ? "active" : ""}
          @click=${() => {
			this.selected = -1;
		}}
        >
          ${this.t("All bars")}
        </button>
        ${this.entries().map((e, t) => I`<button
              type="button"
              class=${this.selected === t ? "active" : ""}
              aria-label=${`${this.t("Bar")} ${t + 1}`}
              @click=${() => {
			this.selected = t;
		}}
            >
              ${t + 1}
            </button>`)}
      </div>
      <nav aria-label=${this.t("Editor sections")}>
        ${[
			["entities", "Entities"],
			["appearance", "Appearance"],
			["values", "Values"],
			["rules", "Rules"],
			["actions", "Actions"]
		].map(([e, t]) => I`<button
              type="button"
              class=${this.tab === e ? "active" : ""}
              @click=${() => {
			this.tab = e;
		}}
            >
              ${this.t(t)}
            </button>`)}
      </nav>
      ${this.error ? I`<div class="error" role="alert">${this.error}</div>` : R}
      ${this.tab === "entities" ? this.renderEntities() : this.tab === "appearance" ? this.renderAppearance() : this.tab === "values" ? this.renderValues() : this.tab === "rules" ? this.renderRules() : this.renderActions()}
    </div>` : I``;
	}
	static {
		this.styles = o`
    :host {
      display: block;
      color: var(--primary-text-color);
      font-family: var(--paper-font-body1_-_font-family, sans-serif);
    }
    * {
      box-sizing: border-box;
    }
    .editor {
      background: var(--card-background-color, #fff);
      border: 1px solid var(--divider-color, #ddd);
      border-radius: var(--editor-card-radius, var(--ha-card-border-radius, 12px));
      overflow: hidden;
    }
    header {
      display: flex;
      align-items: center;
      justify-content: space-between;
      gap: 12px;
      padding: 22px 22px 14px;
    }
    h2,
    h3,
    h4,
    p {
      margin: 0;
    }
    h2 {
      font-size: 1.25rem;
    }
    h3 {
      font-size: 1.05rem;
    }
    h4 {
      font-size: 0.9rem;
      margin: 22px 0 12px;
    }
    p,
    small {
      color: var(--secondary-text-color);
    }
    p {
      margin-top: 4px;
      font-size: 0.88rem;
    }
    .scope {
      background: var(--secondary-background-color, #eee);
      padding: 7px 10px;
      border-radius: 99px;
      font-size: 0.8rem;
      white-space: nowrap;
    }
    .scope-switch {
      display: flex;
      gap: 6px;
      overflow-x: auto;
      padding: 0 22px 14px;
    }
    .scope-switch button {
      border-radius: 99px;
      white-space: nowrap;
    }
    nav {
      display: flex;
      gap: 4px;
      overflow-x: auto;
      border-top: 1px solid var(--divider-color, #ddd);
      border-bottom: 1px solid var(--divider-color, #ddd);
      padding: 5px 14px;
    }
    button {
      font: inherit;
      color: inherit;
      background: transparent;
      border: 0;
      cursor: pointer;
      padding: 8px 10px;
    }
    button:hover {
      background: var(--secondary-background-color, #eee);
    }
    button:focus-visible,
    ha-input:focus-visible,
    ha-select:focus-visible,
    ha-icon-picker:focus-visible,
    ha-textarea:focus-visible,
    ha-switch:focus-visible {
      outline: 2px solid var(--primary-color);
      outline-offset: 2px;
    }
    button:disabled {
      opacity: 0.35;
      cursor: default;
    }
    nav button {
      white-space: nowrap;
      border-radius: 8px;
      font-size: 0.88rem;
    }
    nav button.active,
    .scope-switch button.active {
      color: var(--primary-color);
      background: var(--secondary-background-color, #eee);
      font-weight: 600;
    }
    .panel {
      padding: 22px;
    }
    .section-head {
      display: flex;
      align-items: center;
      justify-content: space-between;
      gap: 12px;
      margin-bottom: 16px;
    }
    .primary {
      background: var(--primary-color);
      color: var(--text-primary-color, white);
      border-radius: 9px;
      white-space: nowrap;
    }
    .primary:hover {
      filter: brightness(1.08);
      background: var(--primary-color);
    }
    .fields {
      display: grid;
      grid-template-columns: repeat(2, minmax(0, 1fr));
      column-gap: 24px;
      row-gap: 22px;
      margin-top: 20px;
    }
    .field {
      display: flex;
      flex-direction: column;
      gap: 7px;
      min-width: 0;
      font-size: 0.86rem;
      font-weight: 600;
    }
    .field-stack {
      display: grid;
      gap: 22px;
      min-width: 0;
    }
    .field small {
      font-size: 0.74rem;
      font-weight: 400;
    }
    ha-input,
    ha-select {
      display: block;
      width: 100%;
    }
    ha-icon-picker,
    ha-textarea {
      display: block;
      width: 100%;
    }
    .color-control {
      display: flex;
      align-items: center;
      gap: 8px;
    }
    .color-control ha-input[type='color'] {
      width: 44px;
      min-width: 44px;
      height: 40px;
      cursor: pointer;
    }
    .full {
      margin-top: 12px;
    }
    .entity-list {
      display: grid;
      gap: 6px;
    }
    .entity-row {
      display: flex;
      align-items: center;
      justify-content: space-between;
      border: 1px solid var(--divider-color, #ddd);
      border-radius: 10px;
    }
    .entity-row.active {
      border-color: var(--primary-color);
    }
    .entity-select {
      flex: 1;
      display: flex;
      align-items: center;
      gap: 10px;
      min-width: 0;
      text-align: left;
    }
    .entity-copy {
      display: flex;
      flex-direction: column;
      min-width: 0;
    }
    .entity-index {
      flex: none;
      display: inline-grid;
      place-items: center;
      width: 24px;
      height: 24px;
      margin: 0 0 0 8px;
      border-radius: 50%;
      background: var(--secondary-background-color, #eee);
      color: var(--primary-color);
      font-size: 0.78rem;
      font-weight: 700;
    }
    .entity-select small,
    .entity-name {
      overflow: hidden;
      text-overflow: ellipsis;
      white-space: nowrap;
      max-width: 100%;
    }
    .row-actions {
      display: flex;
    }
    .row-actions button {
      font-size: 1.15rem;
    }
    .divider {
      border-top: 1px solid var(--divider-color, #ddd);
      margin: 20px 0;
    }
    .rule,
    .action-block {
      border: 1px solid var(--divider-color, #ddd);
      border-radius: 12px;
      padding: 16px;
      margin-top: 14px;
    }
    .rule-head {
      display: flex;
      justify-content: space-between;
      align-items: center;
    }
    .empty {
      padding: 24px;
      text-align: center;
      background: var(--secondary-background-color, #eee);
      border-radius: 10px;
    }
    .error {
      margin: 14px 22px 0;
      color: var(--error-color, #b00020);
    }
    @media (max-width: 560px) {
      header {
        align-items: flex-start;
        flex-direction: column;
      }
      .fields {
        grid-template-columns: 1fr;
      }
      .section-head {
        align-items: flex-start;
        flex-direction: column;
      }
    }
    @media (min-width: 561px) and (max-width: 720px) {
      .fields {
        grid-template-columns: 1fr;
      }
    }
  `;
	}
};
Z([K({ attribute: !1 })], Q.prototype, "hass", void 0), Z([q()], Q.prototype, "config", void 0), Z([q()], Q.prototype, "selected", void 0), Z([q()], Q.prototype, "tab", void 0), Z([q()], Q.prototype, "error", void 0), Q = Z([xe("bar-card-next-editor")], Q);
//#endregion
//#region src/bar-card.ts
var Ue = "4.0.0", $ = class extends G {
	constructor(...e) {
		super(...e), this.previous = /* @__PURE__ */ new Map(), this.changeVersion = /* @__PURE__ */ new Map(), this.held = !1, this.onPointerEnd = (e) => {
			(this.activePointer === void 0 || e.pointerId === this.activePointer) && (window.clearTimeout(this.holdTimer), this.activePointer = void 0);
		};
	}
	static {
		this.styles = Be;
	}
	static getConfigElement() {
		return document.createElement("bar-card-next-editor");
	}
	static getStubConfig() {
		return { entity: "sun.sun" };
	}
	setConfig(e) {
		Pe(e), this.previous.clear(), this.changeVersion.clear(), this.config = structuredClone(e);
	}
	getCardSize() {
		let e = this.config?.entities?.length ?? 1, t = this.config?.stack === "horizontal" ? e : Math.max(1, Number(this.config?.columns ?? 1)), n = Math.ceil(e / t), r = Number.parseInt(String(this.config?.height ?? "40"), 10);
		return Math.max(1, Math.ceil((n * (Number.isFinite(r) ? r + 16 : 56) + (this.config?.title ? 44 : 0)) / 50));
	}
	getGridOptions() {
		return {
			columns: 6,
			min_columns: 3,
			rows: Math.max(1, this.getCardSize()),
			min_rows: 1
		};
	}
	render() {
		if (!this.config || !this.hass) return I``;
		let e = Fe(this.config, this.hass.states), t = this.config.stack === "horizontal" ? e.length : Math.max(1, Number(this.config.columns ?? 1)), n = this.config.entity_row, r = J({ "--bar-card-card-radius": this.config.card_radius === void 0 ? void 0 : `${this.config.card_radius}${typeof this.config.card_radius == "number" ? "px" : ""}` });
		return I`
      <ha-card
        class=${`${n ? "entity-row" : ""} ${this.config.shape === "square" ? "square" : ""}`}
        style=${r}
      >
        ${this.config.title && !n ? I`<div class="card-title">${this.config.title}</div>` : R}
        <div id="states" class="bars" style=${J({ "--columns": String(t) })}>
          ${e.map((e, t) => this.renderBar(e, t))}
        </div>
      </ha-card>
    `;
	}
	renderBar(e, t) {
		let n = this.hass?.states[e.entity];
		if (!n) return I`<div class="bar-error" role="status">
        ${He(this.hass?.locale?.language ?? this.hass?.language, "Entity not available")}:
        ${e.entity}
      </div>`;
		let r = e.attribute ? n.attributes[e.attribute] : n.state, i = X(r), a = Re(r, e.severity);
		if (a?.hide) return R;
		let o = i === void 0 ? void 0 : e.limit_value ? Math.max(e.min, Math.min(e.max, i)) : i, s = Ie(o, e.min, e.max), c = e.target === void 0 ? void 0 : Ie(X(e.target), e.min, e.max), l = a?.color || (i === void 0 ? "var(--bar-card-disabled-color, var(--disabled-text-color))" : e.color), u = a?.icon || e.icon || n.attributes.icon, d = e.name || n.attributes.friendly_name || e.entity, f = e.unit_of_measurement ?? n.attributes.unit_of_measurement ?? "", p = ze(o ?? r, e, String(f)), m = Le(this.previous.get(t), i), h = m === "increase" ? "▲" : m === "decrease" ? "▼" : "";
		i !== void 0 && this.previous.set(t, i), m && this.changeVersion.set(t, (this.changeVersion.get(t) ?? 0) + 1);
		let g = e.animation.state !== "off", _ = e.animation.mode ?? "change", v = g && (_ === "change" || _ === "both"), y = g && (_ === "pulse" || _ === "both"), b = [
			"up",
			"down",
			"up-reverse",
			"down-reverse"
		].includes(e.direction), x = [
			"left",
			"down",
			"right-reverse",
			"up-reverse"
		].includes(e.direction), S = I`<span class="minmax">${e.min} / ${e.max}${f ? ` ${f}` : ""}</span>`, C = u ? I`<ha-icon .icon=${String(u)} aria-hidden="true"></ha-icon>` : R, w = h ? I`<span
          class="indicator"
          aria-label=${He(this.hass?.locale?.language ?? this.hass?.language, h === "▲" ? "Increasing" : "Decreasing")}
          >${h}</span
        >` : R, T = J({
			"--bar-color": l,
			"--bar-progress": `${s}%`,
			"--bar-target": `${c ?? 0}%`,
			"--bar-height": typeof e.height == "number" ? `${e.height}px` : e.height || "40px",
			"--bar-width": e.width || "100%",
			"--bar-card-border-radius": e.border_radius === void 0 ? void 0 : `${e.border_radius}${typeof e.border_radius == "number" ? "px" : ""}`,
			"--bar-radius": e.shape === "square" ? "0px" : "var(--bar-card-border-radius, var(--ha-progress-bar-border-radius, var(--ha-card-border-radius, 12px)))",
			"--animation-speed": `${Math.max(.2, Number(e.animation.speed) || 5)}s`,
			"--change-duration": `${Math.max(.1, Math.min(5, Number(e.animation.duration) || .7))}s`
		});
		return I`
      <bar-card-card
        class=${`${b ? "vertical" : "horizontal"} ${x ? "reverse" : ""} ${v ? "motion-change" : ""}`}
        style=${T}
        role="button"
        tabindex="0"
        aria-label=${`${d}, ${p}`}
        @click=${(t) => this.onClick(t, e)}
        @dblclick=${(t) => this.onDoubleClick(t, e)}
        @keydown=${(t) => this.onKeydown(t, e)}
        @pointerdown=${(t) => this.onPointerDown(t, e)}
        @pointerup=${this.onPointerEnd}
        @pointercancel=${this.onPointerEnd}
        @pointerleave=${this.onPointerEnd}
      >
        <div class="outside leading">
          ${e.positions.icon === "outside" ? C : R}
          ${e.positions.name === "outside" ? I`<span class="name">${d}</span>` : R}
        </div>
        <bar-card-background
          role="progressbar"
          aria-label=${String(d)}
          aria-valuemin=${String(e.min)}
          aria-valuemax=${String(e.max)}
          aria-valuenow=${i === void 0 ? R : String(Math.max(e.min, Math.min(e.max, i)))}
          aria-valuetext=${p}
        >
          <bar-card-backgroundbar></bar-card-backgroundbar>
          <bar-card-currentbar class=${y ? "animated" : ""}></bar-card-currentbar>
          ${m && v ? Me(`${t}-${this.changeVersion.get(t)}`, I`<bar-card-change></bar-card-change>`) : R}
          ${c === void 0 ? R : I`<bar-card-markerbar></bar-card-markerbar>`}
          <bar-card-contentbar>
            ${e.positions.icon === "inside" ? C : R}
            ${e.positions.name === "inside" ? I`<span class="name">${d}</span>` : R}
            ${e.positions.minmax === "inside" ? S : R}
            ${e.positions.value === "inside" ? I`<span class="value">${p}</span>` : R}
            ${e.positions.indicator === "inside" ? w : R}
          </bar-card-contentbar>
        </bar-card-background>
        <div class="outside trailing">
          ${e.positions.indicator === "outside" ? w : R}
          ${e.positions.minmax === "outside" ? S : R}
          ${e.positions.value === "outside" ? I`<span class="value">${p}</span>` : R}
        </div>
      </bar-card-card>
    `;
	}
	dispatchAction(e, t) {
		this.dispatchEvent(new CustomEvent("hass-action", {
			bubbles: !0,
			composed: !0,
			detail: {
				config: t === "tap" && !e.tap_action ? {
					...e,
					tap_action: { action: "more-info" }
				} : e,
				action: t
			}
		}));
	}
	onClick(e, t) {
		if (this.held) {
			this.held = !1;
			return;
		}
		t.double_tap_action ? (window.clearTimeout(this.tapTimer), this.tapTimer = window.setTimeout(() => this.dispatchAction(t, "tap"), 250)) : this.dispatchAction(t, "tap"), e.stopPropagation();
	}
	onDoubleClick(e, t) {
		t.double_tap_action && (window.clearTimeout(this.tapTimer), this.dispatchAction(t, "double_tap"), e.stopPropagation());
	}
	onKeydown(e, t) {
		(e.key === "Enter" || e.key === " ") && (e.preventDefault(), e.repeat || this.dispatchAction(t, "tap"));
	}
	onPointerDown(e, t) {
		t.hold_action && e.button === 0 && (this.activePointer = e.pointerId, this.held = !1, this.holdTimer = window.setTimeout(() => {
			this.held = !0, this.dispatchAction(t, "hold");
		}, 500));
	}
	disconnectedCallback() {
		super.disconnectedCallback(), window.clearTimeout(this.holdTimer), window.clearTimeout(this.tapTimer);
	}
};
Z([K({ attribute: !1 })], $.prototype, "hass", void 0), Z([q()], $.prototype, "config", void 0), $ = Z([xe("bar-card-next")], $), window.customCards = window.customCards || [], window.customCards.some((e) => e.type === "bar-card-next") || window.customCards.push({
	type: "bar-card-next",
	name: "Bar Card Next",
	description: "Modern, configurable bars for entity values",
	preview: !0,
	documentationURL: "https://github.com/Adrian-RDA/bar-card-next"
}), console.info(`BAR-CARD ${Ue}`);
//#endregion
export { $ as BarCard };
