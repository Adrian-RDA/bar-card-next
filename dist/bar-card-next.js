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
})(e) : e, { is: l, defineProperty: u, getOwnPropertyDescriptor: d, getOwnPropertyNames: f, getOwnPropertySymbols: p, getPrototypeOf: m } = Object, h = globalThis, g = h.trustedTypes, _ = g ? g.emptyScript : "", ee = h.reactiveElementPolyfillSupport, v = (e, t) => e, y = {
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
}, b = (e, t) => !l(e, t), x = {
	attribute: !0,
	type: String,
	converter: y,
	reflect: !1,
	useDefault: !1,
	hasChanged: b
};
Symbol.metadata ??= Symbol("metadata"), h.litPropertyMetadata ??= /* @__PURE__ */ new WeakMap();
var S = class extends HTMLElement {
	static addInitializer(e) {
		this._$Ei(), (this.l ??= []).push(e);
	}
	static get observedAttributes() {
		return this.finalize(), this._$Eh && [...this._$Eh.keys()];
	}
	static createProperty(e, t = x) {
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
		return this.elementProperties.get(e) ?? x;
	}
	static _$Ei() {
		if (this.hasOwnProperty(v("elementProperties"))) return;
		let e = m(this);
		e.finalize(), e.l !== void 0 && (this.l = [...e.l]), this.elementProperties = new Map(e.elementProperties);
	}
	static finalize() {
		if (this.hasOwnProperty(v("finalized"))) return;
		if (this.finalized = !0, this._$Ei(), this.hasOwnProperty(v("properties"))) {
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
			let i = (n.converter?.toAttribute === void 0 ? y : n.converter).toAttribute(t, n.type);
			this._$Em = e, i == null ? this.removeAttribute(r) : this.setAttribute(r, i), this._$Em = null;
		}
	}
	_$AK(e, t) {
		let n = this.constructor, r = n._$Eh.get(e);
		if (r !== void 0 && this._$Em !== r) {
			let e = n.getPropertyOptions(r), i = typeof e.converter == "function" ? { fromAttribute: e.converter } : e.converter?.fromAttribute === void 0 ? y : e.converter;
			this._$Em = r;
			let a = i.fromAttribute(t, e.type);
			this[r] = a ?? this._$Ej?.get(r) ?? a, this._$Em = null;
		}
	}
	requestUpdate(e, t, n, r = !1, i) {
		if (e !== void 0) {
			let a = this.constructor;
			if (!1 === r && (i = this[e]), n ??= a.getPropertyOptions(e), !((n.hasChanged ?? b)(i, t) || n.useDefault && n.reflect && i === this._$Ej?.get(e) && !this.hasAttribute(a._$Eu(e, n)))) return;
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
S.elementStyles = [], S.shadowRootOptions = { mode: "open" }, S[v("elementProperties")] = /* @__PURE__ */ new Map(), S[v("finalized")] = /* @__PURE__ */ new Map(), ee?.({ ReactiveElement: S }), (h.reactiveElementVersions ??= []).push("2.1.2");
//#endregion
//#region node_modules/.pnpm/lit-html@3.3.3/node_modules/lit-html/lit-html.js
var C = globalThis, w = (e) => e, T = C.trustedTypes, te = T ? T.createPolicy("lit-html", { createHTML: (e) => e }) : void 0, E = "$lit$", D = `lit$${Math.random().toFixed(9).slice(2)}$`, ne = "?" + D, re = `<${ne}>`, O = document, k = () => O.createComment(""), A = (e) => e === null || typeof e != "object" && typeof e != "function", j = Array.isArray, ie = (e) => j(e) || typeof e?.[Symbol.iterator] == "function", M = "[ 	\n\f\r]", N = /<(?:(!--|\/[^a-zA-Z])|(\/?[a-zA-Z][^>\s]*)|(\/?$))/g, ae = /-->/g, oe = />/g, P = RegExp(`>|${M}(?:([^\\s"'>=/]+)(${M}*=${M}*(?:[^ \t\n\f\r"'\`<>=]|("|')|))|$)`, "g"), se = /'/g, ce = /"/g, le = /^(?:script|style|textarea|title)$/i, F = ((e) => (t, ...n) => ({
	_$litType$: e,
	strings: t,
	values: n
}))(1), I = Symbol.for("lit-noChange"), L = Symbol.for("lit-nothing"), ue = /* @__PURE__ */ new WeakMap(), R = O.createTreeWalker(O, 129);
function de(e, t) {
	if (!j(e) || !e.hasOwnProperty("raw")) throw Error("invalid template strings array");
	return te === void 0 ? t : te.createHTML(t);
}
var fe = (e, t) => {
	let n = e.length - 1, r = [], i, a = t === 2 ? "<svg>" : t === 3 ? "<math>" : "", o = N;
	for (let t = 0; t < n; t++) {
		let n = e[t], s, c, l = -1, u = 0;
		for (; u < n.length && (o.lastIndex = u, c = o.exec(n), c !== null);) u = o.lastIndex, o === N ? c[1] === "!--" ? o = ae : c[1] === void 0 ? c[2] === void 0 ? c[3] !== void 0 && (o = P) : (le.test(c[2]) && (i = RegExp("</" + c[2], "g")), o = P) : o = oe : o === P ? c[0] === ">" ? (o = i ?? N, l = -1) : c[1] === void 0 ? l = -2 : (l = o.lastIndex - c[2].length, s = c[1], o = c[3] === void 0 ? P : c[3] === "\"" ? ce : se) : o === ce || o === se ? o = P : o === ae || o === oe ? o = N : (o = P, i = void 0);
		let d = o === P && e[t + 1].startsWith("/>") ? " " : "";
		a += o === N ? n + re : l >= 0 ? (r.push(s), n.slice(0, l) + E + n.slice(l) + D + d) : n + D + (l === -2 ? t : d);
	}
	return [de(e, a + (e[n] || "<?>") + (t === 2 ? "</svg>" : t === 3 ? "</math>" : "")), r];
}, z = class e {
	constructor({ strings: t, _$litType$: n }, r) {
		let i;
		this.parts = [];
		let a = 0, o = 0, s = t.length - 1, c = this.parts, [l, u] = fe(t, n);
		if (this.el = e.createElement(l, r), R.currentNode = this.el.content, n === 2 || n === 3) {
			let e = this.el.content.firstChild;
			e.replaceWith(...e.childNodes);
		}
		for (; (i = R.nextNode()) !== null && c.length < s;) {
			if (i.nodeType === 1) {
				if (i.hasAttributes()) for (let e of i.getAttributeNames()) if (e.endsWith(E)) {
					let t = u[o++], n = i.getAttribute(e).split(D), r = /([.?@])?(.*)/.exec(t);
					c.push({
						type: 1,
						index: a,
						name: r[2],
						strings: n,
						ctor: r[1] === "." ? me : r[1] === "?" ? he : r[1] === "@" ? ge : H
					}), i.removeAttribute(e);
				} else e.startsWith(D) && (c.push({
					type: 6,
					index: a
				}), i.removeAttribute(e));
				if (le.test(i.tagName)) {
					let e = i.textContent.split(D), t = e.length - 1;
					if (t > 0) {
						i.textContent = T ? T.emptyScript : "";
						for (let n = 0; n < t; n++) i.append(e[n], k()), R.nextNode(), c.push({
							type: 2,
							index: ++a
						});
						i.append(e[t], k());
					}
				}
			} else if (i.nodeType === 8) {
				if (i.data === ne) c.push({
					type: 2,
					index: a
				});
				else {
					let e = -1;
					for (; (e = i.data.indexOf(D, e + 1)) !== -1;) c.push({
						type: 7,
						index: a
					}), e += D.length - 1;
				}
			}
			a++;
		}
	}
	static createElement(e, t) {
		let n = O.createElement("template");
		return n.innerHTML = e, n;
	}
};
function B(e, t, n = e, r) {
	if (t === I) return t;
	let i = r === void 0 ? n._$Cl : n._$Co?.[r], a = A(t) ? void 0 : t._$litDirective$;
	return i?.constructor !== a && (i?._$AO?.(!1), a === void 0 ? i = void 0 : (i = new a(e), i._$AT(e, n, r)), r === void 0 ? n._$Cl = i : (n._$Co ??= [])[r] = i), i !== void 0 && (t = B(e, i._$AS(e, t.values), i, r)), t;
}
var pe = class {
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
		let { el: { content: t }, parts: n } = this._$AD, r = (e?.creationScope ?? O).importNode(t, !0);
		R.currentNode = r;
		let i = R.nextNode(), a = 0, o = 0, s = n[0];
		for (; s !== void 0;) {
			if (a === s.index) {
				let t;
				s.type === 2 ? t = new V(i, i.nextSibling, this, e) : s.type === 1 ? t = new s.ctor(i, s.name, s.strings, this, e) : s.type === 6 && (t = new _e(i, this, e)), this._$AV.push(t), s = n[++o];
			}
			a !== s?.index && (i = R.nextNode(), a++);
		}
		return R.currentNode = O, r;
	}
	p(e) {
		let t = 0;
		for (let n of this._$AV) n !== void 0 && (n.strings === void 0 ? n._$AI(e[t]) : (n._$AI(e, n, t), t += n.strings.length - 2)), t++;
	}
}, V = class e {
	get _$AU() {
		return this._$AM?._$AU ?? this._$Cv;
	}
	constructor(e, t, n, r) {
		this.type = 2, this._$AH = L, this._$AN = void 0, this._$AA = e, this._$AB = t, this._$AM = n, this.options = r, this._$Cv = r?.isConnected ?? !0;
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
		e = B(this, e, t), A(e) ? e === L || e == null || e === "" ? (this._$AH !== L && this._$AR(), this._$AH = L) : e !== this._$AH && e !== I && this._(e) : e._$litType$ === void 0 ? e.nodeType === void 0 ? ie(e) ? this.k(e) : this._(e) : this.T(e) : this.$(e);
	}
	O(e) {
		return this._$AA.parentNode.insertBefore(e, this._$AB);
	}
	T(e) {
		this._$AH !== e && (this._$AR(), this._$AH = this.O(e));
	}
	_(e) {
		this._$AH !== L && A(this._$AH) ? this._$AA.nextSibling.data = e : this.T(O.createTextNode(e)), this._$AH = e;
	}
	$(e) {
		let { values: t, _$litType$: n } = e, r = typeof n == "number" ? this._$AC(e) : (n.el === void 0 && (n.el = z.createElement(de(n.h, n.h[0]), this.options)), n);
		if (this._$AH?._$AD === r) this._$AH.p(t);
		else {
			let e = new pe(r, this), n = e.u(this.options);
			e.p(t), this.T(n), this._$AH = e;
		}
	}
	_$AC(e) {
		let t = ue.get(e.strings);
		return t === void 0 && ue.set(e.strings, t = new z(e)), t;
	}
	k(t) {
		j(this._$AH) || (this._$AH = [], this._$AR());
		let n = this._$AH, r, i = 0;
		for (let a of t) i === n.length ? n.push(r = new e(this.O(k()), this.O(k()), this, this.options)) : r = n[i], r._$AI(a), i++;
		i < n.length && (this._$AR(r && r._$AB.nextSibling, i), n.length = i);
	}
	_$AR(e = this._$AA.nextSibling, t) {
		for (this._$AP?.(!1, !0, t); e !== this._$AB;) {
			let t = w(e).nextSibling;
			w(e).remove(), e = t;
		}
	}
	setConnected(e) {
		this._$AM === void 0 && (this._$Cv = e, this._$AP?.(e));
	}
}, H = class {
	get tagName() {
		return this.element.tagName;
	}
	get _$AU() {
		return this._$AM._$AU;
	}
	constructor(e, t, n, r, i) {
		this.type = 1, this._$AH = L, this._$AN = void 0, this.element = e, this.name = t, this._$AM = r, this.options = i, n.length > 2 || n[0] !== "" || n[1] !== "" ? (this._$AH = Array(n.length - 1).fill(/* @__PURE__ */ new String()), this.strings = n) : this._$AH = L;
	}
	_$AI(e, t = this, n, r) {
		let i = this.strings, a = !1;
		if (i === void 0) e = B(this, e, t, 0), a = !A(e) || e !== this._$AH && e !== I, a && (this._$AH = e);
		else {
			let r = e, o, s;
			for (e = i[0], o = 0; o < i.length - 1; o++) s = B(this, r[n + o], t, o), s === I && (s = this._$AH[o]), a ||= !A(s) || s !== this._$AH[o], s === L ? e = L : e !== L && (e += (s ?? "") + i[o + 1]), this._$AH[o] = s;
		}
		a && !r && this.j(e);
	}
	j(e) {
		e === L ? this.element.removeAttribute(this.name) : this.element.setAttribute(this.name, e ?? "");
	}
}, me = class extends H {
	constructor() {
		super(...arguments), this.type = 3;
	}
	j(e) {
		this.element[this.name] = e === L ? void 0 : e;
	}
}, he = class extends H {
	constructor() {
		super(...arguments), this.type = 4;
	}
	j(e) {
		this.element.toggleAttribute(this.name, !!e && e !== L);
	}
}, ge = class extends H {
	constructor(e, t, n, r, i) {
		super(e, t, n, r, i), this.type = 5;
	}
	_$AI(e, t = this) {
		if ((e = B(this, e, t, 0) ?? L) === I) return;
		let n = this._$AH, r = e === L && n !== L || e.capture !== n.capture || e.once !== n.once || e.passive !== n.passive, i = e !== L && (n === L || r);
		r && this.element.removeEventListener(this.name, this, n), i && this.element.addEventListener(this.name, this, e), this._$AH = e;
	}
	handleEvent(e) {
		typeof this._$AH == "function" ? this._$AH.call(this.options?.host ?? this.element, e) : this._$AH.handleEvent(e);
	}
}, _e = class {
	constructor(e, t, n) {
		this.element = e, this.type = 6, this._$AN = void 0, this._$AM = t, this.options = n;
	}
	get _$AU() {
		return this._$AM._$AU;
	}
	_$AI(e) {
		B(this, e);
	}
}, ve = {
	M: E,
	P: D,
	A: ne,
	C: 1,
	L: fe,
	R: pe,
	D: ie,
	V: B,
	I: V,
	H,
	N: he,
	U: ge,
	B: me,
	F: _e
}, ye = C.litHtmlPolyfillSupport;
ye?.(z, V), (C.litHtmlVersions ??= []).push("3.3.3");
var be = (e, t, n) => {
	let r = n?.renderBefore ?? t, i = r._$litPart$;
	if (i === void 0) {
		let e = n?.renderBefore ?? null;
		r._$litPart$ = i = new V(t.insertBefore(k(), e), e, void 0, n ?? {});
	}
	return i._$AI(e), i;
}, U = globalThis, W = class extends S {
	constructor() {
		super(...arguments), this.renderOptions = { host: this }, this._$Do = void 0;
	}
	createRenderRoot() {
		let e = super.createRenderRoot();
		return this.renderOptions.renderBefore ??= e.firstChild, e;
	}
	update(e) {
		let t = this.render();
		this.hasUpdated || (this.renderOptions.isConnected = this.isConnected), super.update(e), this._$Do = be(t, this.renderRoot, this.renderOptions);
	}
	connectedCallback() {
		super.connectedCallback(), this._$Do?.setConnected(!0);
	}
	disconnectedCallback() {
		super.disconnectedCallback(), this._$Do?.setConnected(!1);
	}
	render() {
		return I;
	}
};
W._$litElement$ = !0, W.finalized = !0, U.litElementHydrateSupport?.({ LitElement: W });
var xe = U.litElementPolyfillSupport;
xe?.({ LitElement: W }), (U.litElementVersions ??= []).push("4.2.2");
//#endregion
//#region node_modules/.pnpm/@lit+reactive-element@2.1.2/node_modules/@lit/reactive-element/decorators/custom-element.js
var Se = (e) => (t, n) => {
	n === void 0 ? customElements.define(e, t) : n.addInitializer(() => {
		customElements.define(e, t);
	});
}, Ce = {
	attribute: !0,
	type: String,
	converter: y,
	reflect: !1,
	hasChanged: b
}, we = (e = Ce, t, n) => {
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
function G(e) {
	return (t, n) => typeof n == "object" ? we(e, t, n) : ((e, t, n) => {
		let r = t.hasOwnProperty(n);
		return t.constructor.createProperty(n, e), r ? Object.getOwnPropertyDescriptor(t, n) : void 0;
	})(e, t, n);
}
//#endregion
//#region node_modules/.pnpm/@lit+reactive-element@2.1.2/node_modules/@lit/reactive-element/decorators/state.js
function K(e) {
	return G({
		...e,
		state: !0,
		attribute: !1
	});
}
//#endregion
//#region node_modules/.pnpm/lit-html@3.3.3/node_modules/lit-html/directive.js
var Te = {
	ATTRIBUTE: 1,
	CHILD: 2,
	PROPERTY: 3,
	BOOLEAN_ATTRIBUTE: 4,
	EVENT: 5,
	ELEMENT: 6
}, Ee = (e) => (...t) => ({
	_$litDirective$: e,
	values: t
}), De = class {
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
}, Oe = "important", ke = " !" + Oe, q = Ee(class extends De {
	constructor(e) {
		if (super(e), e.type !== Te.ATTRIBUTE || e.name !== "style" || e.strings?.length > 2) throw Error("The `styleMap` directive must be used in the `style` attribute and must be the only part in the attribute.");
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
				let t = typeof r == "string" && r.endsWith(ke);
				e.includes("-") || t ? n.setProperty(e, t ? r.slice(0, -11) : r, t ? Oe : "") : n[e] = r;
			}
		}
		return I;
	}
}), { I: Ae } = ve, je = {}, Me = (e, t = je) => e._$AH = t, Ne = Ee(class extends De {
	constructor() {
		super(...arguments), this.key = L;
	}
	render(e, t) {
		return this.key = e, t;
	}
	update(e, [t, n]) {
		return t !== this.key && (Me(e), this.key = t), n;
	}
}), Pe = {
	icon: "outside",
	indicator: "outside",
	name: "inside",
	minmax: "off",
	value: "inside"
}, J = {
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
function Fe(e) {
	if (!e || typeof e != "object") throw Error("Invalid bar-card configuration");
	let t = e.entities ?? (e.entity ? [e.entity] : []);
	if (!Array.isArray(t) || !t.length) throw Error("Choose at least one entity");
	if (t.some((e) => !(typeof e == "string" && e || typeof e == "object" && e?.entity))) throw Error("Every bar needs an entity");
	if (e.columns !== void 0 && (!Number.isInteger(Number(e.columns)) || Number(e.columns) < 1)) throw Error("Columns must be a positive integer");
}
function Ie(e, t) {
	let n = e.entities ?? (e.entity ? [e.entity] : []), { entities: r, columns: i, stack: a, title: o, type: s, ...c } = e;
	return n.map((n) => {
		let r = typeof n == "string" ? { entity: n } : n, i = t[r.entity ?? ""], a = (c.entity_config || r.entity_config) && i ? i.attributes : {}, o = {};
		for (let e of Object.keys(J).concat([
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
			...J,
			...s,
			entity: r.entity ?? e.entity ?? "",
			color: s.color || J.color,
			min: Number(s.min ?? J.min),
			max: Number(s.max ?? J.max),
			direction: s.direction || J.direction,
			positions: {
				...Pe,
				...c.positions,
				...o.positions,
				...r.positions
			},
			animation: {
				...J.animation,
				...c.animation,
				...o.animation,
				...r.animation
			}
		};
	});
}
function Y(e) {
	if (e == null || e === "" || e === "unknown" || e === "unavailable") return;
	let t = typeof e == "number" ? e : Number(e);
	return Number.isFinite(t) ? t : void 0;
}
function Le(e, t, n) {
	return e === void 0 || !Number.isFinite(t) || !Number.isFinite(n) || n <= t ? 0 : Math.max(0, Math.min(100, (e - t) / (n - t) * 100));
}
function Re(e, t) {
	if (e !== void 0 && t !== void 0 && t !== e) return t > e ? "increase" : "decrease";
}
function ze(e, t) {
	let n = Y(e);
	return [...t ?? []].reverse().find((t) => n === void 0 ? t.text !== void 0 && t.text === String(e) : t.from !== void 0 && t.to !== void 0 && n >= Number(t.from) && n <= Number(t.to));
}
function Be(e, t, n) {
	let r = Y(e);
	if (r === void 0) return String(e ?? "unknown");
	let i = t.complementary ? t.max - r : r, a = t.decimal === void 0 ? void 0 : Math.max(0, Math.min(10, Number(t.decimal)));
	return `${a === void 0 ? String(Math.round(i * 1e3) / 1e3) : i.toFixed(a)}${n ? ` ${n}` : ""}`;
}
//#endregion
//#region src/styles.ts
var Ve = o`
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
    border-radius: var(--bar-card-border-radius, var(--ha-card-border-radius, 12px));
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
`, He = { de: {
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
	inside: "innen",
	outside: "außen",
	off: "aus",
	right: "rechts",
	left: "links",
	up: "oben",
	down: "unten",
	horizontal: "horizontal",
	"Entity not available": "Entität nicht verfügbar",
	Increasing: "Steigend",
	Decreasing: "Fallend",
	"Example: mdi:lightning-bolt": "Beispiel: mdi:lightning-bolt",
	"Example: 40px or 180px for vertical bars": "Beispiel: 40px oder 180px für vertikale Balken",
	"Example: 100% or 240px": "Beispiel: 100% oder 240px",
	"Leave blank for entity state": "Leer lassen für den Entitätszustand",
	"Zero is a valid target": "Null ist ein gültiger Zielwert"
} };
function X(e, t) {
	return He[e?.toLowerCase().split(/[-_]/)[0] ?? ""]?.[t] ?? t;
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
var Q = class extends W {
	constructor(...e) {
		super(...e), this.selected = -1, this.tab = "entities", this.error = "";
	}
	t(e) {
		return X(this.hass?.locale?.language ?? this.hass?.language, e);
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
		return F`<label class="field">
      <span>${this.t(e)}</span>
      ${n === "checkbox" ? F`<ha-switch
              .checked=${!!(a ?? this.config?.[t])}
              @change=${(e) => this.change(t, e.target.checked)}
            ></ha-switch>` : n === "select" ? F`<ha-select
                .value=${String(a ?? "")}
                @selected=${(e) => this.change(t, e.target.value)}
              >
                ${o ? F`<ha-list-item value="">${this.t("Inherited")}</ha-list-item>` : L}
                ${r.map((e) => F`<ha-list-item value=${e}>${this.t(e)}</ha-list-item>`)}
              </ha-select>` : F`<ha-textfield
                type=${n}
                .value=${a === void 0 ? "" : String(a)}
                placeholder=${s || L}
                @change=${(e) => {
			let r = e.target.value;
			this.change(t, n === "number" && r !== "" ? Number(r) : r);
		}}
              ></ha-textfield>`}
      ${i ? F`<small>${this.t(i)}</small>` : L}
    </label>`;
	}
	globalField(e, t, n = "text", r = []) {
		let i = this.config?.[t];
		return F`<label class="field"
      ><span>${this.t(e)}</span>
      ${n === "select" ? F`<ha-select
              .value=${String(i ?? "")}
              @selected=${(e) => this.edit((n) => {
			n[t] = e.target.value;
		})}
            >
              ${r.map((e) => F`<ha-list-item value=${e}>${e ? this.t(e) : this.t("Automatic")}</ha-list-item>`)}
            </ha-select>` : F`<ha-textfield
              type=${n}
              .value=${i === void 0 ? "" : String(i)}
              @change=${(e) => this.edit((r) => {
			let i = e.target.value;
			i ? r[t] = n === "number" ? Number(i) : i : delete r[t];
		})}
            ></ha-textfield>`}
    </label>`;
	}
	renderEntities() {
		let e = this.entries();
		return F`<section class="panel">
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
			return F`<div class="entity-row ${this.selected === n ? "active" : ""}">
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
      ${this.selected >= 0 ? F`<div class="divider"></div>
              ${this.entityPicker()}` : L}
    </section>`;
	}
	entityPicker() {
		let e = this.scope().entity ?? "";
		return F`<label class="field"
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
		return F`<section class="panel">
      <h3>${this.t("Appearance")}</h3>
      <p>${this.t("Layout, color, and visible labels.")}</p>
      ${this.selected === -1 ? F`<div class="fields">
              ${this.globalField("Card title", "title")}
              ${this.globalField("Columns", "columns", "number")}${this.globalField("Stack", "stack", "select", ["", "horizontal"])}
            </div>` : this.entityPicker()}
      <div class="fields">
        ${this.field("Name", "name")}${this.field("Icon", "icon", "text", [], "Example: mdi:lightning-bolt")}
        ${this.colorField()} ${this.field("Shape", "shape", "select", ["theme", "square"])}
        ${this.field("Direction", "direction", "select", [
			"right",
			"left",
			"up",
			"down"
		])}
        ${this.field("Height", "height", "text", [], "Example: 40px or 180px for vertical bars")}
        ${this.field("Width", "width", "text", [], "Example: 100% or 240px")}
        ${this.field("Use in an entities card", "entity_row", "checkbox", [], "Removes the card background and outer spacing.")}
        ${this.field("Border radius", "border_radius", "text", [], "Example: 12px; empty uses the Home Assistant theme.")}
        ${this.field("Use entity attributes as options", "entity_config", "checkbox")}
      </div>
      <h4>${this.t("Element positions")}</h4>
      <div class="fields">
        ${Object.keys(Pe).map((e) => this.positionField(e))}
      </div>
    </section>`;
	}
	positionField(e) {
		let t = this.scope().positions?.[e];
		return F`<label class="field"
      ><span>${this.t(e[0].toUpperCase() + e.slice(1))}</span>
      <ha-select
        .value=${String(t ?? "")}
        @selected=${(t) => this.edit((n, r) => {
			let i = { ...r.positions }, a = t.target.value;
			a ? i[e] = a : delete i[e], r.positions = i;
		})}
      >
        <ha-list-item value="">
          ${this.selected === -1 ? `${this.t("Default")} (${this.t(Pe[e])})` : this.t("Inherited")}
        </ha-list-item>
        ${[
			"inside",
			"outside",
			"off"
		].map((e) => F`<ha-list-item value=${e}>${this.t(e)}</ha-list-item>`)}
      </ha-select></label
    >`;
	}
	colorField() {
		let e = this.scope().color ?? "", t = /^#[0-9a-fA-F]{6}$/.test(e) ? e : "#0d8ac7";
		return F`<label class="field"
      ><span>${this.t("Color")}</span
      ><span class="color-control">
        <ha-textfield
          type="color"
          .value=${t}
          aria-label=${this.t("Choose color")}
          @change=${(e) => this.change("color", e.target.value)}
        ></ha-textfield>
        <ha-textfield
          type="text"
          .value=${e}
          placeholder=${this.t("Theme color or CSS value")}
          @change=${(e) => this.change("color", e.target.value)}
        ></ha-textfield> </span
      ><small>${this.t("Choose a color or enter a theme variable.")}</small></label
    >`;
	}
	renderValues() {
		let e = this.scope().animation ?? {}, t = e.mode ?? this.config?.animation?.mode ?? "change", n = (e.state ?? this.config?.animation?.state ?? "on") !== "off";
		return F`<section class="panel">
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
            .value=${String(e.mode ?? "")}
            @selected=${(e) => this.edit((t, n) => {
			let r = e.target.value;
			n.animation = {
				...n.animation,
				mode: r || void 0
			};
		})}
          >
            <ha-list-item value="">
              ${this.selected === -1 ? this.t("Default (change)") : this.t("Inherited")}
            </ha-list-item>
            ${[
			"change",
			"pulse",
			"both"
		].map((e) => F`<ha-list-item value=${e}>${this.t(e)}</ha-list-item>`)}
          </ha-select></label
        >
        ${t === "change" || t === "both" ? F`<label class="field"
                ><span>${this.t("Change duration in seconds")}</span>
                <ha-textfield
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
                ></ha-textfield></label>` : L}
        ${t === "pulse" || t === "both" ? F`<label class="field"
                ><span>${this.t("Pulse speed in seconds")}</span>
                <ha-textfield
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
                ></ha-textfield></label>` : L}
      </div>
    </section>`;
	}
	renderRules() {
		let e = this.scope().severity ?? [];
		return F`<section class="panel">
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
      ${e.length ? e.map((e, t) => F`<div class="rule">
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
                </div>`) : F`<p class="empty">
              ${this.t("No rules yet. Add one to change the bar based on its value.")}
            </p>`}
    </section>`;
	}
	ruleField(e, t, n, r, i = "text") {
		return F`<label class="field"
      ><span>${this.t(r)}</span>
      ${i === "checkbox" ? F`<ha-switch
            .checked=${!!t[n]}
            @change=${(t) => this.edit((r, i) => {
			let a = [...i.severity ?? []];
			a[e] = {
				...a[e],
				[n]: t.target.checked
			}, i.severity = a;
		})}
          ></ha-switch>` : F`<ha-textfield
            type=${i}
            .value=${String(t[n] ?? "")}
            @change=${(t) => this.edit((r, a) => {
			let o = [...a.severity ?? []], s = i === "checkbox" ? t.target.checked : t.target.value, c = { ...o[e] };
			s === "" ? delete c[n] : c[n] = i === "number" ? Number(s) : s, o[e] = c, a.severity = o;
		})}
          ></ha-textfield>`}</label>`;
	}
	renderActions() {
		return F`<section class="panel">
      <h3>${this.t("Actions")}</h3>
      <p>${this.t("What happens when someone taps, holds, or double taps a bar.")}</p>
      ${this.actionEditor("tap_action", "Tap")}${this.actionEditor("hold_action", "Hold")}${this.actionEditor("double_tap_action", "Double tap")}
    </section>`;
	}
	actionEditor(e, t) {
		let n = this.scope()[e], r = n?.action ?? "", i = (t, i, a = "text") => F`<label class="field"
        ><span>${this.t(t)}</span>
        <ha-textfield
          type=${a}
          .value=${String(n?.[i] ?? "")}
          @change=${(t) => this.edit((n, a) => {
			let o = { ...a[e] ?? { action: r } }, s = t.target.value;
			s ? o[i] = s : delete o[i], a[e] = o;
		})}
        ></ha-textfield></label>`, a = n?.target, o = n?.service_data, s = String(a?.entity_id ?? o?.entity_id ?? "");
		return F`<div class="action-block">
      <h4>${this.t(t)}</h4>
      <div class="fields">
        <label class="field"
          ><span>${this.t("Action")}</span
          ><ha-select
            .value=${r}
            @selected=${(t) => this.edit((n, r) => {
			let i = t.target.value;
			i ? r[e] = { action: i } : delete r[e];
		})}
          >
            ${[
			"",
			"more-info",
			"toggle",
			"navigate",
			"url",
			"perform-action",
			"call-service",
			"assist",
			"none"
		].map((e) => F`<ha-list-item value=${e}>${e || this.t("Default / inherit")}</ha-list-item>`)}
          </ha-select></label
        >
        ${r === "navigate" ? i("Navigation path", "navigation_path") : L}
        ${r === "url" ? i("URL", "url_path") : L}
        ${r === "perform-action" || r === "call-service" ? F` ${i("Service / action", r === "perform-action" ? "perform_action" : "service")}
                <label class="field"
                  ><span>${this.t("Target entity ID")}</span
                  ><ha-textfield
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
                  ></ha-textfield></label>` : L}
        ${r === "more-info" || r === "toggle" || r === "assist" ? i("Entity ID (optional)", "entity") : L}
        ${r === "navigate" ? F`<label class="field"
                ><span>${this.t("Replace browser history")}</span
                ><ha-switch
                  .checked=${!!n?.navigation_replace}
                  @change=${(t) => this.edit((n, i) => {
			i[e] = {
				...i[e] ?? { action: r },
				navigation_replace: t.target.checked
			};
		})}
                ></ha-switch></label>` : L}
        ${r === "assist" ? F`<label class="field"
                ><span>${this.t("Start listening")}</span
                ><ha-switch
                  .checked=${!!n?.start_listening}
                  @change=${(t) => this.edit((n, i) => {
			i[e] = {
				...i[e] ?? { action: r },
				start_listening: t.target.checked
			};
		})}
                ></ha-switch></label>` : L}
        ${r === "assist" ? i("Pipeline ID (optional)", "pipeline_id") : L}
        ${r ? F`<label class="field"
                ><span>${this.t("Ask for confirmation")}</span
                ><ha-switch
                  .checked=${!!n?.confirmation}
                  @change=${(t) => this.edit((n, i) => {
			i[e] = {
				...i[e] ?? { action: r },
				confirmation: t.target.checked
			};
		})}
                ></ha-switch></label>` : L}
      </div>
      ${r === "perform-action" || r === "call-service" ? F`<label class="field full"
              ><span>${this.t("Action data (JSON object)")}</span>
              <ha-textfield
                multiline
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
              ></ha-textfield>
            </label>` : L}
    </div>`;
	}
	render() {
		return this.config ? F`<div class="editor">
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
        ${this.entries().map((e, t) => F`<button
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
		].map(([e, t]) => F`<button
              type="button"
              class=${this.tab === e ? "active" : ""}
              @click=${() => {
			this.tab = e;
		}}
            >
              ${this.t(t)}
            </button>`)}
      </nav>
      ${this.error ? F`<div class="error" role="alert">${this.error}</div>` : L}
      ${this.tab === "entities" ? this.renderEntities() : this.tab === "appearance" ? this.renderAppearance() : this.tab === "values" ? this.renderValues() : this.tab === "rules" ? this.renderRules() : this.renderActions()}
    </div>` : F``;
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
      border-radius: var(--ha-card-border-radius, 12px);
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
    ha-textfield:focus-visible,
    ha-select:focus-visible,
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
      gap: 14px;
      margin-top: 16px;
    }
    .field {
      display: flex;
      flex-direction: column;
      gap: 5px;
      min-width: 0;
      font-size: 0.86rem;
      font-weight: 600;
    }
    .field small {
      font-size: 0.74rem;
      font-weight: 400;
    }
    ha-textfield,
    ha-select {
      display: block;
      width: 100%;
      --mdc-text-field-fill-color: var(--card-background-color, #fff);
      --mdc-text-field-idle-line-color: var(--divider-color, #bbb);
      --mdc-text-field-hover-line-color: var(--primary-color);
      --mdc-select-fill-color: var(--card-background-color, #fff);
    }
    .color-control {
      display: flex;
      align-items: center;
      gap: 8px;
    }
    .color-control ha-textfield[type='color'] {
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
  `;
	}
};
Z([G({ attribute: !1 })], Q.prototype, "hass", void 0), Z([K()], Q.prototype, "config", void 0), Z([K()], Q.prototype, "selected", void 0), Z([K()], Q.prototype, "tab", void 0), Z([K()], Q.prototype, "error", void 0), Q = Z([Se("bar-card-next-editor")], Q);
//#endregion
//#region src/bar-card.ts
var Ue = "4.0.0", $ = class extends W {
	constructor(...e) {
		super(...e), this.previous = /* @__PURE__ */ new Map(), this.changeVersion = /* @__PURE__ */ new Map(), this.held = !1, this.onPointerEnd = (e) => {
			(this.activePointer === void 0 || e.pointerId === this.activePointer) && (window.clearTimeout(this.holdTimer), this.activePointer = void 0);
		};
	}
	static {
		this.styles = Ve;
	}
	static getConfigElement() {
		return document.createElement("bar-card-next-editor");
	}
	static getStubConfig() {
		return { entity: "sun.sun" };
	}
	setConfig(e) {
		Fe(e), this.previous.clear(), this.changeVersion.clear(), this.config = structuredClone(e);
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
		if (!this.config || !this.hass) return F``;
		let e = Ie(this.config, this.hass.states), t = this.config.stack === "horizontal" ? e.length : Math.max(1, Number(this.config.columns ?? 1)), n = this.config.entity_row, r = q({ "--bar-card-border-radius": this.config.border_radius === void 0 ? void 0 : `${this.config.border_radius}${typeof this.config.border_radius == "number" ? "px" : ""}` });
		return F`
      <ha-card
        class=${`${n ? "entity-row" : ""} ${this.config.shape === "square" ? "square" : ""}`}
        style=${r}
      >
        ${this.config.title && !n ? F`<div class="card-title">${this.config.title}</div>` : L}
        <div id="states" class="bars" style=${q({ "--columns": String(t) })}>
          ${e.map((e, t) => this.renderBar(e, t))}
        </div>
      </ha-card>
    `;
	}
	renderBar(e, t) {
		let n = this.hass?.states[e.entity];
		if (!n) return F`<div class="bar-error" role="status">
        ${X(this.hass?.locale?.language ?? this.hass?.language, "Entity not available")}:
        ${e.entity}
      </div>`;
		let r = e.attribute ? n.attributes[e.attribute] : n.state, i = Y(r), a = ze(r, e.severity);
		if (a?.hide) return L;
		let o = i === void 0 ? void 0 : e.limit_value ? Math.max(e.min, Math.min(e.max, i)) : i, s = Le(o, e.min, e.max), c = e.target === void 0 ? void 0 : Le(Y(e.target), e.min, e.max), l = a?.color || (i === void 0 ? "var(--bar-card-disabled-color, var(--disabled-text-color))" : e.color), u = a?.icon || e.icon || n.attributes.icon, d = e.name || n.attributes.friendly_name || e.entity, f = e.unit_of_measurement ?? n.attributes.unit_of_measurement ?? "", p = Be(o ?? r, e, String(f)), m = Re(this.previous.get(t), i), h = m === "increase" ? "▲" : m === "decrease" ? "▼" : "";
		i !== void 0 && this.previous.set(t, i), m && this.changeVersion.set(t, (this.changeVersion.get(t) ?? 0) + 1);
		let g = e.animation.state !== "off", _ = e.animation.mode ?? "change", ee = g && (_ === "change" || _ === "both"), v = g && (_ === "pulse" || _ === "both"), y = [
			"up",
			"down",
			"up-reverse",
			"down-reverse"
		].includes(e.direction), b = [
			"left",
			"down",
			"right-reverse",
			"up-reverse"
		].includes(e.direction), x = F`<span class="minmax">${e.min} / ${e.max}${f ? ` ${f}` : ""}</span>`, S = u ? F`<ha-icon .icon=${String(u)} aria-hidden="true"></ha-icon>` : L, C = h ? F`<span
          class="indicator"
          aria-label=${X(this.hass?.locale?.language ?? this.hass?.language, h === "▲" ? "Increasing" : "Decreasing")}
          >${h}</span
        >` : L, w = q({
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
		return F`
      <bar-card-card
        class=${`${y ? "vertical" : "horizontal"} ${b ? "reverse" : ""} ${ee ? "motion-change" : ""}`}
        style=${w}
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
          ${e.positions.icon === "outside" ? S : L}
          ${e.positions.name === "outside" ? F`<span class="name">${d}</span>` : L}
        </div>
        <bar-card-background
          role="progressbar"
          aria-label=${String(d)}
          aria-valuemin=${String(e.min)}
          aria-valuemax=${String(e.max)}
          aria-valuenow=${i === void 0 ? L : String(Math.max(e.min, Math.min(e.max, i)))}
          aria-valuetext=${p}
        >
          <bar-card-backgroundbar></bar-card-backgroundbar>
          <bar-card-currentbar class=${v ? "animated" : ""}></bar-card-currentbar>
          ${m && ee ? Ne(`${t}-${this.changeVersion.get(t)}`, F`<bar-card-change></bar-card-change>`) : L}
          ${c === void 0 ? L : F`<bar-card-markerbar></bar-card-markerbar>`}
          <bar-card-contentbar>
            ${e.positions.icon === "inside" ? S : L}
            ${e.positions.name === "inside" ? F`<span class="name">${d}</span>` : L}
            ${e.positions.minmax === "inside" ? x : L}
            ${e.positions.value === "inside" ? F`<span class="value">${p}</span>` : L}
            ${e.positions.indicator === "inside" ? C : L}
          </bar-card-contentbar>
        </bar-card-background>
        <div class="outside trailing">
          ${e.positions.indicator === "outside" ? C : L}
          ${e.positions.minmax === "outside" ? x : L}
          ${e.positions.value === "outside" ? F`<span class="value">${p}</span>` : L}
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
Z([G({ attribute: !1 })], $.prototype, "hass", void 0), Z([K()], $.prototype, "config", void 0), $ = Z([Se("bar-card-next")], $), window.customCards = window.customCards || [], window.customCards.some((e) => e.type === "bar-card-next") || window.customCards.push({
	type: "bar-card-next",
	name: "Bar Card Next",
	description: "Modern, configurable bars for entity values",
	preview: !0,
	documentationURL: "https://github.com/Adrian-RDA/bar-card-next"
}), console.info(`BAR-CARD ${Ue}`);
//#endregion
export { $ as BarCard };
