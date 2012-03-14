$estr = function() { return js.Boot.__string_rec(this,''); }
if(typeof demo=='undefined') demo = {}
demo.Main = function() { }
demo.Main.__name__ = ["demo","Main"];
demo.Main.main = function() {
	haxe.Log.trace = haxe.Firebug.trace;
	js.Lib.window.onload = demo.Main.run;
}
demo.Main.run = function(e) {
	var form = new autoform.AutoForm(demo.MySampleModel);
	CommonJS.getHtmlDocument().body.appendChild(form.collection[0]);
}
demo.Main.prototype.__class__ = demo.Main;
List = function(p) {
	if( p === $_ ) return;
	this.length = 0;
}
List.__name__ = ["List"];
List.prototype.h = null;
List.prototype.q = null;
List.prototype.length = null;
List.prototype.add = function(item) {
	var x = [item];
	if(this.h == null) this.h = x; else this.q[1] = x;
	this.q = x;
	this.length++;
}
List.prototype.push = function(item) {
	var x = [item,this.h];
	this.h = x;
	if(this.q == null) this.q = x;
	this.length++;
}
List.prototype.first = function() {
	return this.h == null?null:this.h[0];
}
List.prototype.last = function() {
	return this.q == null?null:this.q[0];
}
List.prototype.pop = function() {
	if(this.h == null) return null;
	var x = this.h[0];
	this.h = this.h[1];
	if(this.h == null) this.q = null;
	this.length--;
	return x;
}
List.prototype.isEmpty = function() {
	return this.h == null;
}
List.prototype.clear = function() {
	this.h = null;
	this.q = null;
	this.length = 0;
}
List.prototype.remove = function(v) {
	var prev = null;
	var l = this.h;
	while(l != null) {
		if(l[0] == v) {
			if(prev == null) this.h = l[1]; else prev[1] = l[1];
			if(this.q == l) this.q = prev;
			this.length--;
			return true;
		}
		prev = l;
		l = l[1];
	}
	return false;
}
List.prototype.iterator = function() {
	return { h : this.h, hasNext : function() {
		return this.h != null;
	}, next : function() {
		if(this.h == null) return null;
		var x = this.h[0];
		this.h = this.h[1];
		return x;
	}};
}
List.prototype.toString = function() {
	var s = new StringBuf();
	var first = true;
	var l = this.h;
	s.b[s.b.length] = "{" == null?"null":"{";
	while(l != null) {
		if(first) first = false; else s.b[s.b.length] = ", " == null?"null":", ";
		s.add(Std.string(l[0]));
		l = l[1];
	}
	s.b[s.b.length] = "}" == null?"null":"}";
	return s.b.join("");
}
List.prototype.join = function(sep) {
	var s = new StringBuf();
	var first = true;
	var l = this.h;
	while(l != null) {
		if(first) first = false; else s.b[s.b.length] = sep == null?"null":sep;
		s.add(l[0]);
		l = l[1];
	}
	return s.b.join("");
}
List.prototype.filter = function(f) {
	var l2 = new List();
	var l = this.h;
	while(l != null) {
		var v = l[0];
		l = l[1];
		if(f(v)) l2.add(v);
	}
	return l2;
}
List.prototype.map = function(f) {
	var b = new List();
	var l = this.h;
	while(l != null) {
		var v = l[0];
		l = l[1];
		b.add(f(v));
	}
	return b;
}
List.prototype.__class__ = List;
if(typeof domtools=='undefined') domtools = {}
domtools.Query = function(selector,node,collection) {
	if( selector === $_ ) return;
	if(selector == null) selector = "";
	this.collection = new Array();
	if(node != null) {
		this.collection.push(node);
		this;
	} else if(collection != null) this.addCollection(collection); else if(selector != "") {
		var nodeList = CommonJS.getAll(selector);
		this.addNodeList(nodeList);
	}
}
domtools.Query.__name__ = ["domtools","Query"];
domtools.Query.document = null;
domtools.Query.window = null;
domtools.Query.create = function(name) {
	return document.createElement(name);
}
domtools.Query.get_window = function() {
	return window;
}
domtools.Query.get_document = function() {
	return document;
}
domtools.Query.prototype.collection = null;
domtools.Query.prototype.length = null;
domtools.Query.prototype.iterator = function() {
	return this.collection.iterator();
}
domtools.Query.prototype.getNode = function(i) {
	if(i == null) i = 0;
	return this.collection[i];
}
domtools.Query.prototype.eq = function(i) {
	if(i == null) i = 0;
	return new domtools.Query(null,this.collection[i]);
}
domtools.Query.prototype.first = function() {
	return new domtools.Query(null,this.collection[0]);
}
domtools.Query.prototype.last = function() {
	return new domtools.Query(null,this.collection[this.collection.length - 1]);
}
domtools.Query.prototype.add = function(node) {
	return (function($this) {
		var $r;
		$this.collection.push(node);
		$r = $this;
		return $r;
	}(this));
}
domtools.Query.prototype.addCollection = function(collection) {
	var $it0 = collection.iterator();
	while( $it0.hasNext() ) {
		var node = $it0.next();
		this.collection.push(node);
	}
	return this;
}
domtools.Query.prototype.addNodeList = function(nodeList,elementsOnly) {
	if(elementsOnly == null) elementsOnly = true;
	var _g1 = 0, _g = nodeList.length;
	while(_g1 < _g) {
		var i = _g1++;
		var node = nodeList.item(i);
		if(elementsOnly == false || domtools.ElementManipulation.isElement(node)) {
			this.collection.push(node);
			this;
		}
	}
	return this;
}
domtools.Query.prototype.removeFromCollection = function(node) {
	return (function($this) {
		var $r;
		$this.collection.remove(node);
		$r = $this;
		return $r;
	}(this));
}
domtools.Query.prototype.each = function(f) {
	return (function($this) {
		var $r;
		Lambda.iter($this.collection,f);
		$r = $this;
		return $r;
	}(this));
}
domtools.Query.prototype.filter = function(fn) {
	return new domtools.Query(null,null,Lambda.filter(this.collection,fn));
}
domtools.Query.prototype.clone = function() {
	var q = new domtools.Query();
	var $it0 = this.collection.iterator();
	while( $it0.hasNext() ) {
		var node = $it0.next();
		{
			q.collection.push(node.cloneNode(true));
			q;
		}
	}
	return q;
}
domtools.Query.prototype.get_length = function() {
	return this.collection.length;
}
domtools.Query.prototype.__class__ = domtools.Query;
domtools.AbstractCustomElement = function(name) {
	if( name === $_ ) return;
	domtools.Query.call(this);
	var elm = document.createElement(name);
	{
		this.collection.push(elm);
		this;
	}
}
domtools.AbstractCustomElement.__name__ = ["domtools","AbstractCustomElement"];
domtools.AbstractCustomElement.__super__ = domtools.Query;
for(var k in domtools.Query.prototype ) domtools.AbstractCustomElement.prototype[k] = domtools.Query.prototype[k];
domtools.AbstractCustomElement.prototype.__class__ = domtools.AbstractCustomElement;
if(typeof autoform=='undefined') autoform = {}
autoform.AbstractField = function(name) {
	if( name === $_ ) return;
	domtools.AbstractCustomElement.call(this,name);
}
autoform.AbstractField.__name__ = ["autoform","AbstractField"];
autoform.AbstractField.__super__ = domtools.AbstractCustomElement;
for(var k in domtools.AbstractCustomElement.prototype ) autoform.AbstractField.prototype[k] = domtools.AbstractCustomElement.prototype[k];
autoform.AbstractField.prototype.get = function() {
	return null;
}
autoform.AbstractField.prototype.set = function(object) {
}
autoform.AbstractField.prototype.__class__ = autoform.AbstractField;
if(!autoform.ui) autoform.ui = {}
autoform.ui.TextField = function(field) {
	if( field === $_ ) return;
	autoform.AbstractField.call(this,"div");
	domtools.QueryElementManipulation.addClass(domtools.QueryElementManipulation.addClass(this,"af-field-container"),field.id);
	domtools.QueryElementManipulation.setInnerHTML(this,"<label></label><input />");
	domtools.QueryElementManipulation.setAttr(domtools.QueryElementManipulation.setAttr(domtools.QueryElementManipulation.setAttr(domtools.QueryTraversing.find(this,"input"),"type","text"),"id",field.fullID),"placeholder",field.placeholder);
	domtools.QueryElementManipulation.setAttr(domtools.QueryElementManipulation.setText(domtools.QueryTraversing.find(this,"label"),field.title),"for",field.fullID);
	if(field.description != "") domtools.QueryDOMManipulation.append(domtools.QueryTraversing.find(this,"label"),domtools.ElementManipulation.setText(document.createElement("p"),field.description));
}
autoform.ui.TextField.__name__ = ["autoform","ui","TextField"];
autoform.ui.TextField.__super__ = autoform.AbstractField;
for(var k in autoform.AbstractField.prototype ) autoform.ui.TextField.prototype[k] = autoform.AbstractField.prototype[k];
autoform.ui.TextField.prototype.__class__ = autoform.ui.TextField;
Reflect = function() { }
Reflect.__name__ = ["Reflect"];
Reflect.hasField = function(o,field) {
	if(o.hasOwnProperty != null) return o.hasOwnProperty(field);
	var arr = Reflect.fields(o);
	var $it0 = arr.iterator();
	while( $it0.hasNext() ) {
		var t = $it0.next();
		if(t == field) return true;
	}
	return false;
}
Reflect.field = function(o,field) {
	var v = null;
	try {
		v = o[field];
	} catch( e ) {
	}
	return v;
}
Reflect.setField = function(o,field,value) {
	o[field] = value;
}
Reflect.callMethod = function(o,func,args) {
	return func.apply(o,args);
}
Reflect.fields = function(o) {
	if(o == null) return new Array();
	var a = new Array();
	if(o.hasOwnProperty) {
		for(var i in o) if( o.hasOwnProperty(i) ) a.push(i);
	} else {
		var t;
		try {
			t = o.__proto__;
		} catch( e ) {
			t = null;
		}
		if(t != null) o.__proto__ = null;
		for(var i in o) if( i != "__proto__" ) a.push(i);
		if(t != null) o.__proto__ = t;
	}
	return a;
}
Reflect.isFunction = function(f) {
	return typeof(f) == "function" && f.__name__ == null;
}
Reflect.compare = function(a,b) {
	return a == b?0:a > b?1:-1;
}
Reflect.compareMethods = function(f1,f2) {
	if(f1 == f2) return true;
	if(!Reflect.isFunction(f1) || !Reflect.isFunction(f2)) return false;
	return f1.scope == f2.scope && f1.method == f2.method && f1.method != null;
}
Reflect.isObject = function(v) {
	if(v == null) return false;
	var t = typeof(v);
	return t == "string" || t == "object" && !v.__enum__ || t == "function" && v.__name__ != null;
}
Reflect.deleteField = function(o,f) {
	if(!Reflect.hasField(o,f)) return false;
	delete(o[f]);
	return true;
}
Reflect.copy = function(o) {
	var o2 = { };
	var _g = 0, _g1 = Reflect.fields(o);
	while(_g < _g1.length) {
		var f = _g1[_g];
		++_g;
		o2[f] = Reflect.field(o,f);
	}
	return o2;
}
Reflect.makeVarArgs = function(f) {
	return function() {
		var a = new Array();
		var _g1 = 0, _g = arguments.length;
		while(_g1 < _g) {
			var i = _g1++;
			a.push(arguments[i]);
		}
		return f(a);
	};
}
Reflect.prototype.__class__ = Reflect;
autoform.AbstractRenderer = function(form) {
	if( form === $_ ) return;
	this.displays = new Hash();
	this.form = form;
}
autoform.AbstractRenderer.__name__ = ["autoform","AbstractRenderer"];
autoform.AbstractRenderer.guessDisplay = function(field) {
	var display;
	if(field.display != "") display = field.display; else display = (function($this) {
		var $r;
		switch(field.type) {
		case "String":
			$r = "text";
			break;
		case "Int":
			$r = "number/int";
			break;
		case "Float":
			$r = "number/float";
			break;
		case "Date":
			$r = "date";
			break;
		case "Bool":
			$r = "checkbox";
			break;
		case "Array<Bool>":
			$r = "checkbox";
			break;
		default:
			$r = (function($this) {
				var $r;
				haxe.Log.trace("Is this a function: " + field,{ fileName : "AbstractRenderer.hx", lineNumber : 53, className : "autoform.AbstractRenderer", methodName : "guessDisplay"});
				$r = "text";
				return $r;
			}($this));
		}
		return $r;
	}(this));
	return display;
}
autoform.AbstractRenderer.prototype.form = null;
autoform.AbstractRenderer.prototype.displays = null;
autoform.AbstractRenderer.prototype.run = function(fields) {
}
autoform.AbstractRenderer.prototype.__class__ = autoform.AbstractRenderer;
IntIter = function(min,max) {
	if( min === $_ ) return;
	this.min = min;
	this.max = max;
}
IntIter.__name__ = ["IntIter"];
IntIter.prototype.min = null;
IntIter.prototype.max = null;
IntIter.prototype.hasNext = function() {
	return this.min < this.max;
}
IntIter.prototype.next = function() {
	return this.min++;
}
IntIter.prototype.__class__ = IntIter;
autoform.FieldInfo = function(field,rtti,meta,formID_in) {
	if( field === $_ ) return;
	this.id = "";
	this.title = "";
	this.type = "null";
	this.required = false;
	this.description = "";
	this.help = "";
	this.placeholder = "";
	this.validDescription = "";
	this.validatorString = "";
	this.validator = null;
	this.display = "";
	this.displayOptions = { };
	this.formID = formID_in;
	this.formPrefix = this.formID + "-";
	this.id = field.getNodeName();
	this.title = this.id;
	this.fullID = this.formID + "-" + this.id;
	if(field.firstChild() != null) {
		var firstChild = field;
		var pathsFound = 0;
		do {
			firstChild = firstChild.firstChild();
			var path = firstChild.get("path");
			this.type = pathsFound == 0?path:this.type + "<" + path;
			pathsFound++;
		} while(firstChild.firstChild() != null);
		while(pathsFound > 1) {
			this.type = this.type + ">";
			pathsFound--;
		}
	}
	if(Reflect.hasField(meta,this.id)) {
		var fieldMeta = Reflect.field(meta,this.id);
		if(Reflect.hasField(fieldMeta,"autoform")) {
			var autoform = fieldMeta.autoform[0];
			if(Reflect.hasField(autoform,"title")) this.title = Reflect.field(autoform,"title");
			if(Reflect.hasField(autoform,"required")) this.required = Reflect.field(autoform,"required");
			if(Reflect.hasField(autoform,"description")) this.description = Reflect.field(autoform,"description");
			if(Reflect.hasField(autoform,"help")) this.help = Reflect.field(autoform,"help");
			if(Reflect.hasField(autoform,"placeholder")) this.placeholder = Reflect.field(autoform,"placeholder");
			if(Reflect.hasField(autoform,"validatorString")) this.validatorString = Reflect.field(autoform,"validatorString");
			this.validator = this.createValidatorFunction(this.validatorString);
			if(Reflect.hasField(autoform,"display")) this.display = Reflect.field(autoform,"display");
			if(Reflect.hasField(autoform,"displayOptions")) this.displayOptions = Reflect.field(autoform,"displayOptions");
		}
	}
}
autoform.FieldInfo.__name__ = ["autoform","FieldInfo"];
autoform.FieldInfo.prototype.id = null;
autoform.FieldInfo.prototype.title = null;
autoform.FieldInfo.prototype.type = null;
autoform.FieldInfo.prototype.required = null;
autoform.FieldInfo.prototype.description = null;
autoform.FieldInfo.prototype.help = null;
autoform.FieldInfo.prototype.placeholder = null;
autoform.FieldInfo.prototype.validDescription = null;
autoform.FieldInfo.prototype.validatorString = null;
autoform.FieldInfo.prototype.validator = null;
autoform.FieldInfo.prototype.display = null;
autoform.FieldInfo.prototype.displayOptions = null;
autoform.FieldInfo.prototype.formID = null;
autoform.FieldInfo.prototype.formPrefix = null;
autoform.FieldInfo.prototype.fullID = null;
autoform.FieldInfo.prototype.createValidatorFunction = function(validatorString) {
	var fn = null;
	return fn;
}
autoform.FieldInfo.prototype.__class__ = autoform.FieldInfo;
ValueType = { __ename__ : ["ValueType"], __constructs__ : ["TNull","TInt","TFloat","TBool","TObject","TFunction","TClass","TEnum","TUnknown"] }
ValueType.TNull = ["TNull",0];
ValueType.TNull.toString = $estr;
ValueType.TNull.__enum__ = ValueType;
ValueType.TInt = ["TInt",1];
ValueType.TInt.toString = $estr;
ValueType.TInt.__enum__ = ValueType;
ValueType.TFloat = ["TFloat",2];
ValueType.TFloat.toString = $estr;
ValueType.TFloat.__enum__ = ValueType;
ValueType.TBool = ["TBool",3];
ValueType.TBool.toString = $estr;
ValueType.TBool.__enum__ = ValueType;
ValueType.TObject = ["TObject",4];
ValueType.TObject.toString = $estr;
ValueType.TObject.__enum__ = ValueType;
ValueType.TFunction = ["TFunction",5];
ValueType.TFunction.toString = $estr;
ValueType.TFunction.__enum__ = ValueType;
ValueType.TClass = function(c) { var $x = ["TClass",6,c]; $x.__enum__ = ValueType; $x.toString = $estr; return $x; }
ValueType.TEnum = function(e) { var $x = ["TEnum",7,e]; $x.__enum__ = ValueType; $x.toString = $estr; return $x; }
ValueType.TUnknown = ["TUnknown",8];
ValueType.TUnknown.toString = $estr;
ValueType.TUnknown.__enum__ = ValueType;
Type = function() { }
Type.__name__ = ["Type"];
Type.getClass = function(o) {
	if(o == null) return null;
	if(o.__enum__ != null) return null;
	return o.__class__;
}
Type.getEnum = function(o) {
	if(o == null) return null;
	return o.__enum__;
}
Type.getSuperClass = function(c) {
	return c.__super__;
}
Type.getClassName = function(c) {
	var a = c.__name__;
	return a.join(".");
}
Type.getEnumName = function(e) {
	var a = e.__ename__;
	return a.join(".");
}
Type.resolveClass = function(name) {
	var cl;
	try {
		cl = eval(name);
	} catch( e ) {
		cl = null;
	}
	if(cl == null || cl.__name__ == null) return null;
	return cl;
}
Type.resolveEnum = function(name) {
	var e;
	try {
		e = eval(name);
	} catch( err ) {
		e = null;
	}
	if(e == null || e.__ename__ == null) return null;
	return e;
}
Type.createInstance = function(cl,args) {
	if(args.length <= 3) return new cl(args[0],args[1],args[2]);
	if(args.length > 8) throw "Too many arguments";
	return new cl(args[0],args[1],args[2],args[3],args[4],args[5],args[6],args[7]);
}
Type.createEmptyInstance = function(cl) {
	return new cl($_);
}
Type.createEnum = function(e,constr,params) {
	var f = Reflect.field(e,constr);
	if(f == null) throw "No such constructor " + constr;
	if(Reflect.isFunction(f)) {
		if(params == null) throw "Constructor " + constr + " need parameters";
		return f.apply(e,params);
	}
	if(params != null && params.length != 0) throw "Constructor " + constr + " does not need parameters";
	return f;
}
Type.createEnumIndex = function(e,index,params) {
	var c = e.__constructs__[index];
	if(c == null) throw index + " is not a valid enum constructor index";
	return Type.createEnum(e,c,params);
}
Type.getInstanceFields = function(c) {
	var a = Reflect.fields(c.prototype);
	a.remove("__class__");
	return a;
}
Type.getClassFields = function(c) {
	var a = Reflect.fields(c);
	a.remove("__name__");
	a.remove("__interfaces__");
	a.remove("__super__");
	a.remove("prototype");
	return a;
}
Type.getEnumConstructs = function(e) {
	var a = e.__constructs__;
	return a.copy();
}
Type["typeof"] = function(v) {
	switch(typeof(v)) {
	case "boolean":
		return ValueType.TBool;
	case "string":
		return ValueType.TClass(String);
	case "number":
		if(Math.ceil(v) == v % 2147483648.0) return ValueType.TInt;
		return ValueType.TFloat;
	case "object":
		if(v == null) return ValueType.TNull;
		var e = v.__enum__;
		if(e != null) return ValueType.TEnum(e);
		var c = v.__class__;
		if(c != null) return ValueType.TClass(c);
		return ValueType.TObject;
	case "function":
		if(v.__name__ != null) return ValueType.TObject;
		return ValueType.TFunction;
	case "undefined":
		return ValueType.TNull;
	default:
		return ValueType.TUnknown;
	}
}
Type.enumEq = function(a,b) {
	if(a == b) return true;
	try {
		if(a[0] != b[0]) return false;
		var _g1 = 2, _g = a.length;
		while(_g1 < _g) {
			var i = _g1++;
			if(!Type.enumEq(a[i],b[i])) return false;
		}
		var e = a.__enum__;
		if(e != b.__enum__ || e == null) return false;
	} catch( e ) {
		return false;
	}
	return true;
}
Type.enumConstructor = function(e) {
	return e[0];
}
Type.enumParameters = function(e) {
	return e.slice(2);
}
Type.enumIndex = function(e) {
	return e[1];
}
Type.prototype.__class__ = Type;
if(typeof js=='undefined') js = {}
js.Boot = function() { }
js.Boot.__name__ = ["js","Boot"];
js.Boot.__unhtml = function(s) {
	return s.split("&").join("&amp;").split("<").join("&lt;").split(">").join("&gt;");
}
js.Boot.__trace = function(v,i) {
	var msg = i != null?i.fileName + ":" + i.lineNumber + ": ":"";
	msg += js.Boot.__unhtml(js.Boot.__string_rec(v,"")) + "<br/>";
	var d = document.getElementById("haxe:trace");
	if(d == null) alert("No haxe:trace element defined\n" + msg); else d.innerHTML += msg;
}
js.Boot.__clear_trace = function() {
	var d = document.getElementById("haxe:trace");
	if(d != null) d.innerHTML = "";
}
js.Boot.__closure = function(o,f) {
	var m = o[f];
	if(m == null) return null;
	var f1 = function() {
		return m.apply(o,arguments);
	};
	f1.scope = o;
	f1.method = m;
	return f1;
}
js.Boot.__string_rec = function(o,s) {
	if(o == null) return "null";
	if(s.length >= 5) return "<...>";
	var t = typeof(o);
	if(t == "function" && (o.__name__ != null || o.__ename__ != null)) t = "object";
	switch(t) {
	case "object":
		if(o instanceof Array) {
			if(o.__enum__ != null) {
				if(o.length == 2) return o[0];
				var str = o[0] + "(";
				s += "\t";
				var _g1 = 2, _g = o.length;
				while(_g1 < _g) {
					var i = _g1++;
					if(i != 2) str += "," + js.Boot.__string_rec(o[i],s); else str += js.Boot.__string_rec(o[i],s);
				}
				return str + ")";
			}
			var l = o.length;
			var i;
			var str = "[";
			s += "\t";
			var _g = 0;
			while(_g < l) {
				var i1 = _g++;
				str += (i1 > 0?",":"") + js.Boot.__string_rec(o[i1],s);
			}
			str += "]";
			return str;
		}
		var tostr;
		try {
			tostr = o.toString;
		} catch( e ) {
			return "???";
		}
		if(tostr != null && tostr != Object.toString) {
			var s2 = o.toString();
			if(s2 != "[object Object]") return s2;
		}
		var k = null;
		var str = "{\n";
		s += "\t";
		var hasp = o.hasOwnProperty != null;
		for( var k in o ) { ;
		if(hasp && !o.hasOwnProperty(k)) {
			continue;
		}
		if(k == "prototype" || k == "__class__" || k == "__super__" || k == "__interfaces__") {
			continue;
		}
		if(str.length != 2) str += ", \n";
		str += s + k + " : " + js.Boot.__string_rec(o[k],s);
		}
		s = s.substring(1);
		str += "\n" + s + "}";
		return str;
	case "function":
		return "<function>";
	case "string":
		return o;
	default:
		return String(o);
	}
}
js.Boot.__interfLoop = function(cc,cl) {
	if(cc == null) return false;
	if(cc == cl) return true;
	var intf = cc.__interfaces__;
	if(intf != null) {
		var _g1 = 0, _g = intf.length;
		while(_g1 < _g) {
			var i = _g1++;
			var i1 = intf[i];
			if(i1 == cl || js.Boot.__interfLoop(i1,cl)) return true;
		}
	}
	return js.Boot.__interfLoop(cc.__super__,cl);
}
js.Boot.__instanceof = function(o,cl) {
	try {
		if(o instanceof cl) {
			if(cl == Array) return o.__enum__ == null;
			return true;
		}
		if(js.Boot.__interfLoop(o.__class__,cl)) return true;
	} catch( e ) {
		if(cl == null) return false;
	}
	switch(cl) {
	case Int:
		return Math.ceil(o%2147483648.0) === o;
	case Float:
		return typeof(o) == "number";
	case Bool:
		return o === true || o === false;
	case String:
		return typeof(o) == "string";
	case Dynamic:
		return true;
	default:
		if(o == null) return false;
		return o.__enum__ == cl || cl == Class && o.__name__ != null || cl == Enum && o.__ename__ != null;
	}
}
js.Boot.__init = function() {
	js.Lib.isIE = typeof document!='undefined' && document.all != null && typeof window!='undefined' && window.opera == null;
	js.Lib.isOpera = typeof window!='undefined' && window.opera != null;
	Array.prototype.copy = Array.prototype.slice;
	Array.prototype.insert = function(i,x) {
		this.splice(i,0,x);
	};
	Array.prototype.remove = Array.prototype.indexOf?function(obj) {
		var idx = this.indexOf(obj);
		if(idx == -1) return false;
		this.splice(idx,1);
		return true;
	}:function(obj) {
		var i = 0;
		var l = this.length;
		while(i < l) {
			if(this[i] == obj) {
				this.splice(i,1);
				return true;
			}
			i++;
		}
		return false;
	};
	Array.prototype.iterator = function() {
		return { cur : 0, arr : this, hasNext : function() {
			return this.cur < this.arr.length;
		}, next : function() {
			return this.arr[this.cur++];
		}};
	};
	if(String.prototype.cca == null) String.prototype.cca = String.prototype.charCodeAt;
	String.prototype.charCodeAt = function(i) {
		var x = this.cca(i);
		if(x != x) return null;
		return x;
	};
	var oldsub = String.prototype.substr;
	String.prototype.substr = function(pos,len) {
		if(pos != null && pos != 0 && len != null && len < 0) return "";
		if(len == null) len = this.length;
		if(pos < 0) {
			pos = this.length + pos;
			if(pos < 0) pos = 0;
		} else if(len < 0) len = this.length + len - pos;
		return oldsub.apply(this,[pos,len]);
	};
	$closure = js.Boot.__closure;
}
js.Boot.prototype.__class__ = js.Boot;
if(typeof haxe=='undefined') haxe = {}
haxe.Firebug = function() { }
haxe.Firebug.__name__ = ["haxe","Firebug"];
haxe.Firebug.detect = function() {
	try {
		return console != null && console.error != null;
	} catch( e ) {
		return false;
	}
}
haxe.Firebug.redirectTraces = function() {
	haxe.Log.trace = haxe.Firebug.trace;
	js.Lib.setErrorHandler(haxe.Firebug.onError);
}
haxe.Firebug.onError = function(err,stack) {
	var buf = err + "\n";
	var _g = 0;
	while(_g < stack.length) {
		var s = stack[_g];
		++_g;
		buf += "Called from " + s + "\n";
	}
	haxe.Firebug.trace(buf,null);
	return true;
}
haxe.Firebug.trace = function(v,inf) {
	var type = inf != null && inf.customParams != null?inf.customParams[0]:null;
	if(type != "warn" && type != "info" && type != "debug" && type != "error") type = inf == null?"error":"log";
	console[type]((inf == null?"":inf.fileName + ":" + inf.lineNumber + " : ") + Std.string(v));
}
haxe.Firebug.prototype.__class__ = haxe.Firebug;
EReg = function(r,opt) {
	if( r === $_ ) return;
	opt = opt.split("u").join("");
	this.r = new RegExp(r,opt);
}
EReg.__name__ = ["EReg"];
EReg.prototype.r = null;
EReg.prototype.match = function(s) {
	this.r.m = this.r.exec(s);
	this.r.s = s;
	this.r.l = RegExp.leftContext;
	this.r.r = RegExp.rightContext;
	return this.r.m != null;
}
EReg.prototype.matched = function(n) {
	return this.r.m != null && n >= 0 && n < this.r.m.length?this.r.m[n]:(function($this) {
		var $r;
		throw "EReg::matched";
		return $r;
	}(this));
}
EReg.prototype.matchedLeft = function() {
	if(this.r.m == null) throw "No string matched";
	if(this.r.l == null) return this.r.s.substr(0,this.r.m.index);
	return this.r.l;
}
EReg.prototype.matchedRight = function() {
	if(this.r.m == null) throw "No string matched";
	if(this.r.r == null) {
		var sz = this.r.m.index + this.r.m[0].length;
		return this.r.s.substr(sz,this.r.s.length - sz);
	}
	return this.r.r;
}
EReg.prototype.matchedPos = function() {
	if(this.r.m == null) throw "No string matched";
	return { pos : this.r.m.index, len : this.r.m[0].length};
}
EReg.prototype.split = function(s) {
	var d = "#__delim__#";
	return s.replace(this.r,d).split(d);
}
EReg.prototype.replace = function(s,by) {
	return s.replace(this.r,by);
}
EReg.prototype.customReplace = function(s,f) {
	var buf = new StringBuf();
	while(true) {
		if(!this.match(s)) break;
		buf.add(this.matchedLeft());
		buf.add(f(this));
		s = this.matchedRight();
	}
	buf.b[buf.b.length] = s == null?"null":s;
	return buf.b.join("");
}
EReg.prototype.__class__ = EReg;
Xml = function(p) {
}
Xml.__name__ = ["Xml"];
Xml.Element = null;
Xml.PCData = null;
Xml.CData = null;
Xml.Comment = null;
Xml.DocType = null;
Xml.Prolog = null;
Xml.Document = null;
Xml.parse = function(str) {
	var rules = [Xml.enode,Xml.epcdata,Xml.eend,Xml.ecdata,Xml.edoctype,Xml.ecomment,Xml.eprolog];
	var nrules = rules.length;
	var current = Xml.createDocument();
	var stack = new List();
	while(str.length > 0) {
		var i = 0;
		try {
			while(i < nrules) {
				var r = rules[i];
				if(r.match(str)) {
					switch(i) {
					case 0:
						var x = Xml.createElement(r.matched(1));
						current.addChild(x);
						str = r.matchedRight();
						while(Xml.eattribute.match(str)) {
							x.set(Xml.eattribute.matched(1),Xml.eattribute.matched(3));
							str = Xml.eattribute.matchedRight();
						}
						if(!Xml.eclose.match(str)) {
							i = nrules;
							throw "__break__";
						}
						if(Xml.eclose.matched(1) == ">") {
							stack.push(current);
							current = x;
						}
						str = Xml.eclose.matchedRight();
						break;
					case 1:
						var x = Xml.createPCData(r.matched(0));
						current.addChild(x);
						str = r.matchedRight();
						break;
					case 2:
						if(current._children != null && current._children.length == 0) {
							var e = Xml.createPCData("");
							current.addChild(e);
						}
						if(r.matched(1) != current._nodeName || stack.isEmpty()) {
							i = nrules;
							throw "__break__";
						}
						current = stack.pop();
						str = r.matchedRight();
						break;
					case 3:
						str = r.matchedRight();
						if(!Xml.ecdata_end.match(str)) throw "End of CDATA section not found";
						var x = Xml.createCData(Xml.ecdata_end.matchedLeft());
						current.addChild(x);
						str = Xml.ecdata_end.matchedRight();
						break;
					case 4:
						var pos = 0;
						var count = 0;
						var old = str;
						try {
							while(true) {
								if(!Xml.edoctype_elt.match(str)) throw "End of DOCTYPE section not found";
								var p = Xml.edoctype_elt.matchedPos();
								pos += p.pos + p.len;
								str = Xml.edoctype_elt.matchedRight();
								switch(Xml.edoctype_elt.matched(0)) {
								case "[":
									count++;
									break;
								case "]":
									count--;
									if(count < 0) throw "Invalid ] found in DOCTYPE declaration";
									break;
								default:
									if(count == 0) throw "__break__";
								}
							}
						} catch( e ) { if( e != "__break__" ) throw e; }
						var x = Xml.createDocType(old.substr(10,pos - 11));
						current.addChild(x);
						break;
					case 5:
						if(!Xml.ecomment_end.match(str)) throw "Unclosed Comment";
						var p = Xml.ecomment_end.matchedPos();
						var x = Xml.createComment(str.substr(4,p.pos + p.len - 7));
						current.addChild(x);
						str = Xml.ecomment_end.matchedRight();
						break;
					case 6:
						var prolog = r.matched(0);
						var x = Xml.createProlog(prolog.substr(2,prolog.length - 4));
						current.addChild(x);
						str = r.matchedRight();
						break;
					}
					throw "__break__";
				}
				i += 1;
			}
		} catch( e ) { if( e != "__break__" ) throw e; }
		if(i == nrules) {
			if(str.length > 10) throw "Xml parse error : Unexpected " + str.substr(0,10) + "..."; else throw "Xml parse error : Unexpected " + str;
		}
	}
	if(!stack.isEmpty()) throw "Xml parse error : Unclosed " + stack.last().getNodeName();
	return current;
}
Xml.createElement = function(name) {
	var r = new Xml();
	r.nodeType = Xml.Element;
	r._children = new Array();
	r._attributes = new Hash();
	r.setNodeName(name);
	return r;
}
Xml.createPCData = function(data) {
	var r = new Xml();
	r.nodeType = Xml.PCData;
	r.setNodeValue(data);
	return r;
}
Xml.createCData = function(data) {
	var r = new Xml();
	r.nodeType = Xml.CData;
	r.setNodeValue(data);
	return r;
}
Xml.createComment = function(data) {
	var r = new Xml();
	r.nodeType = Xml.Comment;
	r.setNodeValue(data);
	return r;
}
Xml.createDocType = function(data) {
	var r = new Xml();
	r.nodeType = Xml.DocType;
	r.setNodeValue(data);
	return r;
}
Xml.createProlog = function(data) {
	var r = new Xml();
	r.nodeType = Xml.Prolog;
	r.setNodeValue(data);
	return r;
}
Xml.createDocument = function() {
	var r = new Xml();
	r.nodeType = Xml.Document;
	r._children = new Array();
	return r;
}
Xml.prototype.nodeType = null;
Xml.prototype.nodeName = null;
Xml.prototype.nodeValue = null;
Xml.prototype.parent = null;
Xml.prototype._nodeName = null;
Xml.prototype._nodeValue = null;
Xml.prototype._attributes = null;
Xml.prototype._children = null;
Xml.prototype._parent = null;
Xml.prototype.getNodeName = function() {
	if(this.nodeType != Xml.Element) throw "bad nodeType";
	return this._nodeName;
}
Xml.prototype.setNodeName = function(n) {
	if(this.nodeType != Xml.Element) throw "bad nodeType";
	return this._nodeName = n;
}
Xml.prototype.getNodeValue = function() {
	if(this.nodeType == Xml.Element || this.nodeType == Xml.Document) throw "bad nodeType";
	return this._nodeValue;
}
Xml.prototype.setNodeValue = function(v) {
	if(this.nodeType == Xml.Element || this.nodeType == Xml.Document) throw "bad nodeType";
	return this._nodeValue = v;
}
Xml.prototype.getParent = function() {
	return this._parent;
}
Xml.prototype.get = function(att) {
	if(this.nodeType != Xml.Element) throw "bad nodeType";
	return this._attributes.get(att);
}
Xml.prototype.set = function(att,value) {
	if(this.nodeType != Xml.Element) throw "bad nodeType";
	this._attributes.set(att,value);
}
Xml.prototype.remove = function(att) {
	if(this.nodeType != Xml.Element) throw "bad nodeType";
	this._attributes.remove(att);
}
Xml.prototype.exists = function(att) {
	if(this.nodeType != Xml.Element) throw "bad nodeType";
	return this._attributes.exists(att);
}
Xml.prototype.attributes = function() {
	if(this.nodeType != Xml.Element) throw "bad nodeType";
	return this._attributes.keys();
}
Xml.prototype.iterator = function() {
	if(this._children == null) throw "bad nodetype";
	return { cur : 0, x : this._children, hasNext : function() {
		return this.cur < this.x.length;
	}, next : function() {
		return this.x[this.cur++];
	}};
}
Xml.prototype.elements = function() {
	if(this._children == null) throw "bad nodetype";
	return { cur : 0, x : this._children, hasNext : function() {
		var k = this.cur;
		var l = this.x.length;
		while(k < l) {
			if(this.x[k].nodeType == Xml.Element) break;
			k += 1;
		}
		this.cur = k;
		return k < l;
	}, next : function() {
		var k = this.cur;
		var l = this.x.length;
		while(k < l) {
			var n = this.x[k];
			k += 1;
			if(n.nodeType == Xml.Element) {
				this.cur = k;
				return n;
			}
		}
		return null;
	}};
}
Xml.prototype.elementsNamed = function(name) {
	if(this._children == null) throw "bad nodetype";
	return { cur : 0, x : this._children, hasNext : function() {
		var k = this.cur;
		var l = this.x.length;
		while(k < l) {
			var n = this.x[k];
			if(n.nodeType == Xml.Element && n._nodeName == name) break;
			k++;
		}
		this.cur = k;
		return k < l;
	}, next : function() {
		var k = this.cur;
		var l = this.x.length;
		while(k < l) {
			var n = this.x[k];
			k++;
			if(n.nodeType == Xml.Element && n._nodeName == name) {
				this.cur = k;
				return n;
			}
		}
		return null;
	}};
}
Xml.prototype.firstChild = function() {
	if(this._children == null) throw "bad nodetype";
	return this._children[0];
}
Xml.prototype.firstElement = function() {
	if(this._children == null) throw "bad nodetype";
	var cur = 0;
	var l = this._children.length;
	while(cur < l) {
		var n = this._children[cur];
		if(n.nodeType == Xml.Element) return n;
		cur++;
	}
	return null;
}
Xml.prototype.addChild = function(x) {
	if(this._children == null) throw "bad nodetype";
	if(x._parent != null) x._parent._children.remove(x);
	x._parent = this;
	this._children.push(x);
}
Xml.prototype.removeChild = function(x) {
	if(this._children == null) throw "bad nodetype";
	var b = this._children.remove(x);
	if(b) x._parent = null;
	return b;
}
Xml.prototype.insertChild = function(x,pos) {
	if(this._children == null) throw "bad nodetype";
	if(x._parent != null) x._parent._children.remove(x);
	x._parent = this;
	this._children.insert(pos,x);
}
Xml.prototype.toString = function() {
	if(this.nodeType == Xml.PCData) return this._nodeValue;
	if(this.nodeType == Xml.CData) return "<![CDATA[" + this._nodeValue + "]]>";
	if(this.nodeType == Xml.Comment) return "<!--" + this._nodeValue + "-->";
	if(this.nodeType == Xml.DocType) return "<!DOCTYPE " + this._nodeValue + ">";
	if(this.nodeType == Xml.Prolog) return "<?" + this._nodeValue + "?>";
	var s = new StringBuf();
	if(this.nodeType == Xml.Element) {
		s.b[s.b.length] = "<" == null?"null":"<";
		s.add(this._nodeName);
		var $it0 = this._attributes.keys();
		while( $it0.hasNext() ) {
			var k = $it0.next();
			s.b[s.b.length] = " " == null?"null":" ";
			s.b[s.b.length] = k == null?"null":k;
			s.b[s.b.length] = "=\"" == null?"null":"=\"";
			s.add(this._attributes.get(k));
			s.b[s.b.length] = "\"" == null?"null":"\"";
		}
		if(this._children.length == 0) {
			s.b[s.b.length] = "/>" == null?"null":"/>";
			return s.b.join("");
		}
		s.b[s.b.length] = ">" == null?"null":">";
	}
	var $it1 = this.iterator();
	while( $it1.hasNext() ) {
		var x = $it1.next();
		s.add(x.toString());
	}
	if(this.nodeType == Xml.Element) {
		s.b[s.b.length] = "</" == null?"null":"</";
		s.add(this._nodeName);
		s.b[s.b.length] = ">" == null?"null":">";
	}
	return s.b.join("");
}
Xml.prototype.__class__ = Xml;
if(!haxe.rtti) haxe.rtti = {}
haxe.rtti.Infos = function() { }
haxe.rtti.Infos.__name__ = ["haxe","rtti","Infos"];
haxe.rtti.Infos.prototype.__class__ = haxe.rtti.Infos;
domtools.Tools = function(p) {
}
domtools.Tools.__name__ = ["domtools","Tools"];
domtools.Tools.prototype.__class__ = domtools.Tools;
domtools.ElementManipulation = function() { }
domtools.ElementManipulation.__name__ = ["domtools","ElementManipulation"];
domtools.ElementManipulation.isElement = function(node) {
	return node.nodeType == domtools.ElementManipulation.NodeTypeElement;
}
domtools.ElementManipulation.attr = function(elm,attName) {
	var ret = "";
	if(domtools.ElementManipulation.isElement(elm)) {
		var element = elm;
		ret = element.getAttribute(attName);
		if(ret == null) ret = "";
	}
	return ret;
}
domtools.ElementManipulation.setAttr = function(elm,attName,attValue) {
	if(elm.nodeType == domtools.ElementManipulation.NodeTypeElement) {
		var element = elm;
		element.setAttribute(attName,attValue);
	}
	return elm;
}
domtools.ElementManipulation.removeAttr = function(elm,attName) {
	if(elm.nodeType == domtools.ElementManipulation.NodeTypeElement) {
		var element = elm;
		element.removeAttribute(attName);
	}
	return elm;
}
domtools.ElementManipulation.hasClass = function(elm,className) {
	return (" " + domtools.ElementManipulation.attr(elm,"class") + " ").indexOf(" " + className + " ") > -1;
}
domtools.ElementManipulation.addClass = function(elm,className) {
	if(domtools.ElementManipulation.hasClass(elm,className) == false) {
		var oldClassName = domtools.ElementManipulation.attr(elm,"class");
		var newClassName = oldClassName == ""?className:oldClassName + " " + className;
		domtools.ElementManipulation.setAttr(elm,"class",newClassName);
	}
	return elm;
}
domtools.ElementManipulation.removeClass = function(elm,className) {
	var classes = domtools.ElementManipulation.attr(elm,"class").split(" ");
	classes.remove(className);
	var newClassValue = classes.join(" ");
	domtools.ElementManipulation.setAttr(elm,"class",newClassValue);
	return elm;
}
domtools.ElementManipulation.toggleClass = function(elm,className) {
	if(domtools.ElementManipulation.hasClass(elm,className)) domtools.ElementManipulation.removeClass(elm,className); else domtools.ElementManipulation.addClass(elm,className);
	return elm;
}
domtools.ElementManipulation.tagName = function(elm) {
	return elm.nodeName.toLowerCase();
}
domtools.ElementManipulation.val = function(elm) {
	return domtools.ElementManipulation.attr(elm,"value");
}
domtools.ElementManipulation.text = function(elm) {
	return elm.textContent;
}
domtools.ElementManipulation.setText = function(elm,text) {
	return (function($this) {
		var $r;
		elm.textContent = text;
		$r = elm;
		return $r;
	}(this));
}
domtools.ElementManipulation.innerHTML = function(elm) {
	var ret = "";
	switch(elm.nodeType) {
	case domtools.ElementManipulation.NodeTypeElement:
		var element = elm;
		ret = element.innerHTML;
		break;
	default:
		ret = elm.textContent;
	}
	return ret;
}
domtools.ElementManipulation.setInnerHTML = function(elm,html) {
	switch(elm.nodeType) {
	case domtools.ElementManipulation.NodeTypeElement:
		var element = elm;
		element.innerHTML = html;
		break;
	default:
		elm.textContent = html;
	}
	return elm;
}
domtools.ElementManipulation.clone = function(elm,deep) {
	if(deep == null) deep = true;
	return elm.cloneNode(deep);
}
domtools.ElementManipulation.prototype.__class__ = domtools.ElementManipulation;
domtools.QueryElementManipulation = function() { }
domtools.QueryElementManipulation.__name__ = ["domtools","QueryElementManipulation"];
domtools.QueryElementManipulation.attr = function(query,attName) {
	return query.collection.length > 0?domtools.ElementManipulation.attr(query.collection[0],attName):"";
}
domtools.QueryElementManipulation.setAttr = function(query,attName,attValue) {
	var $it0 = query.collection.iterator();
	while( $it0.hasNext() ) {
		var node = $it0.next();
		domtools.ElementManipulation.setAttr(node,attName,attValue);
	}
	return query;
}
domtools.QueryElementManipulation.removeAttr = function(query,attName) {
	var $it0 = query.collection.iterator();
	while( $it0.hasNext() ) {
		var node = $it0.next();
		domtools.ElementManipulation.removeAttr(node,attName);
	}
	return query;
}
domtools.QueryElementManipulation.hasClass = function(query,className) {
	return query.collection.length > 0?domtools.ElementManipulation.hasClass(query.collection[0],className):false;
}
domtools.QueryElementManipulation.addClass = function(query,className) {
	var $it0 = query.collection.iterator();
	while( $it0.hasNext() ) {
		var node = $it0.next();
		domtools.ElementManipulation.addClass(node,className);
	}
	return query;
}
domtools.QueryElementManipulation.removeClass = function(query,className) {
	var $it0 = query.collection.iterator();
	while( $it0.hasNext() ) {
		var node = $it0.next();
		domtools.ElementManipulation.removeClass(node,className);
	}
	return query;
}
domtools.QueryElementManipulation.toggleClass = function(query,className) {
	var $it0 = query.collection.iterator();
	while( $it0.hasNext() ) {
		var node = $it0.next();
		domtools.ElementManipulation.toggleClass(node,className);
	}
	return query;
}
domtools.QueryElementManipulation.tagName = function(query) {
	return query.collection.length > 0?query.collection[0].nodeName.toLowerCase():"";
}
domtools.QueryElementManipulation.tagNames = function(query) {
	var names = new Array();
	var $it0 = query.collection.iterator();
	while( $it0.hasNext() ) {
		var node = $it0.next();
		names.push(node.nodeName.toLowerCase());
	}
	return names;
}
domtools.QueryElementManipulation.val = function(query) {
	return query.collection.length > 0?domtools.ElementManipulation.attr(query.collection[0],"value"):"";
}
domtools.QueryElementManipulation.text = function(query) {
	var text = "";
	var $it0 = query.collection.iterator();
	while( $it0.hasNext() ) {
		var node = $it0.next();
		text = text + node.textContent;
	}
	return text;
}
domtools.QueryElementManipulation.setText = function(query,text) {
	var $it0 = query.collection.iterator();
	while( $it0.hasNext() ) {
		var node = $it0.next();
		{
			node.textContent = text;
			node;
		}
	}
	return query;
}
domtools.QueryElementManipulation.innerHTML = function(query) {
	var ret = "";
	var $it0 = query.collection.iterator();
	while( $it0.hasNext() ) {
		var node = $it0.next();
		ret += domtools.ElementManipulation.innerHTML(node);
	}
	return ret;
}
domtools.QueryElementManipulation.setInnerHTML = function(query,html) {
	var $it0 = query.collection.iterator();
	while( $it0.hasNext() ) {
		var node = $it0.next();
		domtools.ElementManipulation.setInnerHTML(node,html);
	}
	return query;
}
domtools.QueryElementManipulation.clone = function(query,deep) {
	if(deep == null) deep = true;
	var newQuery = new domtools.Query();
	var $it0 = query.collection.iterator();
	while( $it0.hasNext() ) {
		var node = $it0.next();
		{
			newQuery.collection.push(node.cloneNode(true));
			newQuery;
		}
	}
	return newQuery;
}
domtools.QueryElementManipulation.prototype.__class__ = domtools.QueryElementManipulation;
domtools.DOMManipulation = function() { }
domtools.DOMManipulation.__name__ = ["domtools","DOMManipulation"];
domtools.DOMManipulation.append = function(parent,childNode,childCollection) {
	if(childNode != null) parent.appendChild(childNode); else if(childCollection != null) {
		var $it0 = childCollection.collection.iterator();
		while( $it0.hasNext() ) {
			var child = $it0.next();
			parent.appendChild(child);
		}
	}
	return parent;
}
domtools.DOMManipulation.prepend = function(parent,newChildNode,newChildCollection) {
	if(newChildNode != null) domtools.DOMManipulation.insertThisBefore(newChildNode,parent.firstChild); else if(newChildCollection != null) domtools.QueryDOMManipulation.insertThisBefore(newChildCollection,parent.firstChild);
	return parent;
}
domtools.DOMManipulation.appendTo = function(child,parentNode,parentCollection) {
	if(parentNode != null) domtools.DOMManipulation.append(parentNode,child); else if(parentCollection != null) domtools.QueryDOMManipulation.append(parentCollection,child);
	return child;
}
domtools.DOMManipulation.prependTo = function(child,parentNode,parentCollection) {
	return domtools.DOMManipulation.insertThisBefore(child,parentNode.firstChild,parentCollection);
}
domtools.DOMManipulation.insertThisBefore = function(content,targetNode,targetCollection) {
	if(targetNode != null) targetNode.parentNode.insertBefore(content,targetNode); else if(targetCollection != null) {
		var firstChildUsed = false;
		var $it0 = targetCollection.collection.iterator();
		while( $it0.hasNext() ) {
			var target = $it0.next();
			var childToInsert;
			if(firstChildUsed) {
				childToInsert = content;
				firstChildUsed = true;
			} else childToInsert = content.cloneNode(true);
			target.parentNode.insertBefore(childToInsert,target);
		}
	}
	return content;
}
domtools.DOMManipulation.insertThisAfter = function(content,targetNode,targetCollection) {
	return domtools.DOMManipulation.insertThisBefore(content,targetNode.nextSibling,targetCollection);
}
domtools.DOMManipulation.beforeThisInsert = function(target,contentNode,contentQuery) {
	if(contentNode != null) domtools.DOMManipulation.insertThisBefore(contentNode,target); else if(contentQuery != null) domtools.QueryDOMManipulation.insertThisBefore(contentQuery,target);
	return target;
}
domtools.DOMManipulation.afterThisInsert = function(target,contentNode,contentQuery) {
	if(contentNode != null) domtools.DOMManipulation.insertThisBefore(contentNode,target.nextSibling,null); else if(contentQuery != null) domtools.QueryDOMManipulation.insertThisBefore(contentQuery,target.nextSibling,domtools.QueryTraversing.next(null));
	return target;
}
domtools.DOMManipulation.remove = function(childToRemove) {
	childToRemove.parentNode.removeChild(childToRemove);
	return childToRemove;
}
domtools.DOMManipulation.empty = function(container) {
	while(container.hasChildNodes()) container.removeChild(container.firstChild);
	return container;
}
domtools.DOMManipulation.prototype.__class__ = domtools.DOMManipulation;
domtools.QueryDOMManipulation = function() { }
domtools.QueryDOMManipulation.__name__ = ["domtools","QueryDOMManipulation"];
domtools.QueryDOMManipulation.append = function(parentCollection,childNode,childCollection) {
	var firstChildUsed = true;
	var $it0 = parentCollection.collection.iterator();
	while( $it0.hasNext() ) {
		var parent = $it0.next();
		childNode = firstChildUsed || childNode == null?childNode:childNode.cloneNode(true);
		childCollection = firstChildUsed || childCollection == null?childCollection:childCollection.clone();
		domtools.DOMManipulation.append(parent,childNode,childCollection);
		firstChildUsed = false;
	}
	return parentCollection;
}
domtools.QueryDOMManipulation.prepend = function(parentCollection,childNode,childCollection) {
	var firstChildUsed = false;
	var $it0 = parentCollection.collection.iterator();
	while( $it0.hasNext() ) {
		var parent = $it0.next();
		childNode = firstChildUsed || childNode == null?childNode:childNode.cloneNode(true);
		childCollection = firstChildUsed || childCollection == null?childCollection:childCollection.clone();
		domtools.DOMManipulation.prepend(parent,childNode,childCollection);
		firstChildUsed = true;
	}
	return parentCollection;
}
domtools.QueryDOMManipulation.appendTo = function(children,parentNode,parentCollection) {
	if(parentNode != null) domtools.DOMManipulation.append(parentNode,null,children); else if(parentCollection != null) domtools.QueryDOMManipulation.append(parentCollection,null,children);
	return children;
}
domtools.QueryDOMManipulation.prependTo = function(children,parentNode,parentCollection) {
	return domtools.QueryDOMManipulation.insertThisBefore(children,parentNode.firstChild,domtools.QueryTraversing.firstChildren(parentCollection));
}
domtools.QueryDOMManipulation.insertThisBefore = function(content,targetNode,targetCollection) {
	if(targetNode != null) {
		var $it0 = content.collection.iterator();
		while( $it0.hasNext() ) {
			var childToAdd = $it0.next();
			domtools.DOMManipulation.insertThisBefore(childToAdd,targetNode);
		}
	} else if(targetCollection != null) {
		var firstChildUsed = false;
		var childCollection = content;
		var $it1 = targetCollection.collection.iterator();
		while( $it1.hasNext() ) {
			var target = $it1.next();
			childCollection = firstChildUsed?childCollection:childCollection.clone();
			domtools.QueryDOMManipulation.insertThisBefore(childCollection,target);
			firstChildUsed = true;
		}
	}
	return content;
}
domtools.QueryDOMManipulation.insertThisAfter = function(content,targetNode,targetCollection) {
	return domtools.QueryDOMManipulation.insertThisBefore(content,targetNode.nextSibling,domtools.QueryTraversing.next(targetCollection));
}
domtools.QueryDOMManipulation.beforeThisInsert = function(target,contentNode,contentCollection) {
	if(contentNode != null) domtools.DOMManipulation.insertThisBefore(contentNode,null,target); else if(contentCollection != null) domtools.QueryDOMManipulation.insertThisBefore(contentCollection,null,target);
	return target;
}
domtools.QueryDOMManipulation.afterThisInsert = function(target,contentNode,contentCollection) {
	if(contentNode != null) domtools.DOMManipulation.insertThisBefore(contentNode,null.nextSibling,target); else if(contentCollection != null) domtools.QueryDOMManipulation.insertThisBefore(contentCollection,null.nextSibling,domtools.QueryTraversing.next(target));
	return target;
}
domtools.QueryDOMManipulation.remove = function(nodesToRemove) {
	var $it0 = nodesToRemove.collection.iterator();
	while( $it0.hasNext() ) {
		var node = $it0.next();
		domtools.DOMManipulation.remove(node);
	}
	return nodesToRemove;
}
domtools.QueryDOMManipulation.empty = function(containers) {
	var $it0 = containers.collection.iterator();
	while( $it0.hasNext() ) {
		var container = $it0.next();
		while(container.hasChildNodes()) container.removeChild(container.firstChild);
	}
	return containers;
}
domtools.QueryDOMManipulation.prototype.__class__ = domtools.QueryDOMManipulation;
domtools.Traversing = function() { }
domtools.Traversing.__name__ = ["domtools","Traversing"];
domtools.Traversing.children = function(node,elementsOnly) {
	if(elementsOnly == null) elementsOnly = true;
	var children = new domtools.Query();
	if(domtools.ElementManipulation.isElement(node)) children.addNodeList(node.childNodes,elementsOnly);
	return children;
}
domtools.Traversing.firstChildren = function(node,elementsOnly) {
	if(elementsOnly == null) elementsOnly = true;
	var firstChild = null;
	if(domtools.ElementManipulation.isElement(node)) {
		var e = node.firstChild;
		while(elementsOnly == true && e != null && domtools.ElementManipulation.isElement(e) == false) e = e.nextSibling;
		if(e != null) firstChild = e;
	}
	return firstChild;
}
domtools.Traversing.lastChildren = function(node,elementsOnly) {
	if(elementsOnly == null) elementsOnly = true;
	var lastChild = null;
	if(domtools.ElementManipulation.isElement(node)) {
		var e = node.lastChild;
		while(elementsOnly == true && e != null && domtools.ElementManipulation.isElement(e) == false) e = e.previousSibling;
		if(e != null) lastChild = e;
	}
	return lastChild;
}
domtools.Traversing.parent = function(node) {
	return node.parentNode != null?node.parentNode:null;
}
domtools.Traversing.ancestors = function(node) {
	var ancestors = new domtools.Query();
	{
		ancestors.collection.push(domtools.Traversing.parent(node));
		ancestors;
	}
	if(ancestors.collection.length > 0) ancestors.addCollection(domtools.QueryTraversing.parent(ancestors));
	return ancestors;
}
domtools.Traversing.next = function(node) {
	return node.nextSibling != null?node.nextSibling:null;
}
domtools.Traversing.prev = function(node) {
	return node.previousSibling != null?node.previousSibling:null;
}
domtools.Traversing.find = function(node,selector) {
	var newQuery = new domtools.Query();
	if(domtools.ElementManipulation.isElement(node)) {
		var element = node;
		newQuery.addNodeList(element.querySelectorAll(selector));
	}
	return newQuery;
}
domtools.Traversing.prototype.__class__ = domtools.Traversing;
domtools.QueryTraversing = function() { }
domtools.QueryTraversing.__name__ = ["domtools","QueryTraversing"];
domtools.QueryTraversing.children = function(query,elementsOnly) {
	if(elementsOnly == null) elementsOnly = true;
	var children = new domtools.Query();
	var $it0 = query.collection.iterator();
	while( $it0.hasNext() ) {
		var node = $it0.next();
		if(domtools.ElementManipulation.isElement(node)) children.addNodeList(node.childNodes,elementsOnly);
	}
	return children;
}
domtools.QueryTraversing.firstChildren = function(query,elementsOnly) {
	if(elementsOnly == null) elementsOnly = true;
	var children = new domtools.Query();
	var $it0 = query.collection.iterator();
	while( $it0.hasNext() ) {
		var node = $it0.next();
		if(domtools.ElementManipulation.isElement(node)) {
			var e = node.firstChild;
			while(elementsOnly == true && e != null && domtools.ElementManipulation.isElement(e) == false) e = e.nextSibling;
			if(e != null) {
				children.collection.push(e);
				children;
			}
		}
	}
	return children;
}
domtools.QueryTraversing.lastChildren = function(query,elementsOnly) {
	if(elementsOnly == null) elementsOnly = true;
	var children = new domtools.Query();
	var $it0 = query.collection.iterator();
	while( $it0.hasNext() ) {
		var node = $it0.next();
		if(domtools.ElementManipulation.isElement(node)) {
			var e = node.lastChild;
			while(elementsOnly == true && e != null && domtools.ElementManipulation.isElement(e) == false) e = e.previousSibling;
			if(e != null) {
				children.collection.push(e);
				children;
			}
		}
	}
	return children;
}
domtools.QueryTraversing.parent = function(query) {
	var parents = new domtools.Query();
	var $it0 = query.collection.iterator();
	while( $it0.hasNext() ) {
		var node = $it0.next();
		if(node.parentNode != null) {
			parents.collection.push(node.parentNode);
			parents;
		}
	}
	return parents;
}
domtools.QueryTraversing.ancestors = function(query) {
	var ancestors = domtools.QueryTraversing.parent(query);
	if(ancestors.collection.length > 0) ancestors.addCollection(domtools.QueryTraversing.parent(ancestors));
	return ancestors;
}
domtools.QueryTraversing.next = function(query) {
	var siblings = new domtools.Query();
	var $it0 = query.collection.iterator();
	while( $it0.hasNext() ) {
		var node = $it0.next();
		var sibling = node.nextSibling;
		if(sibling != null) {
			siblings.collection.push(sibling);
			siblings;
		}
	}
	return siblings;
}
domtools.QueryTraversing.prev = function(query) {
	var siblings = new domtools.Query();
	var $it0 = query.collection.iterator();
	while( $it0.hasNext() ) {
		var node = $it0.next();
		var sibling = node.previousSibling;
		if(sibling != null) {
			siblings.collection.push(sibling);
			siblings;
		}
	}
	return siblings;
}
domtools.QueryTraversing.find = function(query,selector) {
	var newQuery = new domtools.Query();
	var $it0 = query.collection.iterator();
	while( $it0.hasNext() ) {
		var node = $it0.next();
		if(domtools.ElementManipulation.isElement(node)) {
			var element = node;
			newQuery.addNodeList(element.querySelectorAll(selector));
		}
	}
	return newQuery;
}
domtools.QueryTraversing.prototype.__class__ = domtools.QueryTraversing;
domtools.Style = function() { }
domtools.Style.__name__ = ["domtools","Style"];
domtools.Style.getComputedStyle = function(node) {
	var style = null;
	if(domtools.ElementManipulation.isElement(node)) {
	}
	return style;
}
domtools.Style.css = function(node,property) {
	domtools.Style.getComputedStyle(node).getPropertyValue("property");
}
domtools.Style.setCSS = function(node,property,value) {
	if(domtools.ElementManipulation.isElement(node)) {
		var style = node.style;
		style[property] = value;
	}
}
domtools.Style.innerWidth = function(node) {
	var style = domtools.Style.getComputedStyle(node);
	if(style != null) {
	}
	return 0;
}
domtools.Style.prototype.__class__ = domtools.Style;
domtools.QueryStyle = function() { }
domtools.QueryStyle.__name__ = ["domtools","QueryStyle"];
domtools.QueryStyle.setCSS = function(collection,property,value) {
	var $it0 = collection.collection.iterator();
	while( $it0.hasNext() ) {
		var node = $it0.next();
		domtools.Style.setCSS(node,property,value);
	}
}
domtools.QueryStyle.prototype.__class__ = domtools.QueryStyle;
domtools.EventManagement = function() { }
domtools.EventManagement.__name__ = ["domtools","EventManagement"];
domtools.EventManagement.triggerHandler = function(target,event) {
	return target;
}
domtools.EventManagement.on = function(target,eventType,listener) {
	var elm = target;
	elm.addEventListener(eventType,listener,false);
	return target;
}
domtools.EventManagement.off = function(target,eventType,listener) {
	var elm = target;
	elm.removeEventListener(eventType,listener,false);
	return target;
}
domtools.EventManagement.one = function(target,eventType,listener) {
	var fn = null;
	fn = function(e) {
		listener(e);
		target.removeEventListener(eventType,fn,false);
	};
	target.addEventListener(eventType,fn,false);
	return target;
}
domtools.EventManagement.mousedown = function(target,listener) {
	return domtools.EventManagement.on(target,"mousedown",listener);
}
domtools.EventManagement.mouseenter = function(target,listener) {
	return domtools.EventManagement.on(target,"mouseover",listener);
}
domtools.EventManagement.mouseleave = function(target,listener) {
	return domtools.EventManagement.on(target,"mouseout",listener);
}
domtools.EventManagement.mousemove = function(target,listener) {
	return domtools.EventManagement.on(target,"mousemove",listener);
}
domtools.EventManagement.mouseout = function(target,listener) {
	return domtools.EventManagement.on(target,"mouseout",listener);
}
domtools.EventManagement.mouseover = function(target,listener) {
	return domtools.EventManagement.on(target,"mouseover",listener);
}
domtools.EventManagement.mouseup = function(target,listener) {
	return domtools.EventManagement.on(target,"mouseup",listener);
}
domtools.EventManagement.keydown = function(target,listener) {
	return domtools.EventManagement.on(target,"keydown",listener);
}
domtools.EventManagement.keypress = function(target,listener) {
	return domtools.EventManagement.on(target,"keypress",listener);
}
domtools.EventManagement.keyup = function(target,listener) {
	return domtools.EventManagement.on(target,"keyup",listener);
}
domtools.EventManagement.hover = function(target,listener1,listener2) {
	domtools.EventManagement.on(target,"mouseover",listener1);
	if(listener2 == null) domtools.EventManagement.on(target,"mouseout",listener1); else domtools.EventManagement.on(target,"mouseout",listener2);
	return target;
}
domtools.EventManagement.submit = function(target,listener) {
	return domtools.EventManagement.on(target,"submit",listener);
}
domtools.EventManagement.toggleClick = function(target,listenerFirstClick,listenerSecondClick) {
	var fn1 = null;
	var fn2 = null;
	fn1 = function(e) {
		listenerFirstClick(e);
		target.removeEventListener("click",fn1,false);
		target.addEventListener("click",fn2,false);
	};
	fn2 = function(e) {
		listenerSecondClick(e);
		target.removeEventListener("click",fn2,false);
		target.addEventListener("click",fn1,false);
	};
	target.addEventListener("click",fn1,false);
	return target;
}
domtools.EventManagement.blur = function(target,listener) {
	return domtools.EventManagement.on(target,"blur",listener);
}
domtools.EventManagement.change = function(target,listener) {
	return domtools.EventManagement.on(target,"change",listener);
}
domtools.EventManagement.click = function(target,listener) {
	return domtools.EventManagement.on(target,"click",listener);
}
domtools.EventManagement.dblclick = function(target,listener) {
	return domtools.EventManagement.on(target,"dblclick",listener);
}
domtools.EventManagement.focus = function(target,listener) {
	return domtools.EventManagement.on(target,"focus",listener);
}
domtools.EventManagement.focusIn = function(target,listener) {
	return domtools.EventManagement.on(target,"focusIn",listener);
}
domtools.EventManagement.focusOut = function(target,listener) {
	return domtools.EventManagement.on(target,"focusOut",listener);
}
domtools.EventManagement.resize = function(target,listener) {
	return domtools.EventManagement.on(target,"resize",listener);
}
domtools.EventManagement.scroll = function(target,listener) {
	return domtools.EventManagement.on(target,"scroll",listener);
}
domtools.EventManagement.select = function(target,listener) {
	return domtools.EventManagement.on(target,"select",listener);
}
domtools.EventManagement.load = function(target,listener) {
	return domtools.EventManagement.on(target,"load",listener);
}
domtools.EventManagement.unload = function(target,listener) {
	return domtools.EventManagement.on(target,"unload",listener);
}
domtools.EventManagement.error = function(target,listener) {
	return domtools.EventManagement.on(target,"error",listener);
}
domtools.EventManagement.ready = function(target,listener) {
	return domtools.EventManagement.on(target,"ready",listener);
}
domtools.EventManagement.prototype.__class__ = domtools.EventManagement;
domtools.QueryEventManagement = function() { }
domtools.QueryEventManagement.__name__ = ["domtools","QueryEventManagement"];
domtools.QueryEventManagement.on = function(targetCollection,eventType,listener) {
	var $it0 = targetCollection.collection.iterator();
	while( $it0.hasNext() ) {
		var target = $it0.next();
		domtools.EventManagement.on(target,eventType,listener);
	}
	return targetCollection;
}
domtools.QueryEventManagement.off = function(targetCollection,eventType,listener) {
	var $it0 = targetCollection.collection.iterator();
	while( $it0.hasNext() ) {
		var target = $it0.next();
		domtools.EventManagement.off(target,eventType,listener);
	}
	return targetCollection;
}
domtools.QueryEventManagement.one = function(targetCollection,eventType,listener) {
	var $it0 = targetCollection.collection.iterator();
	while( $it0.hasNext() ) {
		var target = $it0.next();
		domtools.EventManagement.one(target,eventType,listener);
	}
	return targetCollection;
}
domtools.QueryEventManagement.mousedown = function(target,listener) {
	return domtools.QueryEventManagement.on(target,"mousedown",listener);
}
domtools.QueryEventManagement.mouseenter = function(target,listener) {
	return domtools.QueryEventManagement.on(target,"mouseenter",listener);
}
domtools.QueryEventManagement.mouseleave = function(target,listener) {
	return domtools.QueryEventManagement.on(target,"mouseleave",listener);
}
domtools.QueryEventManagement.mousemove = function(target,listener) {
	return domtools.QueryEventManagement.on(target,"mousemove",listener);
}
domtools.QueryEventManagement.mouseout = function(target,listener) {
	return domtools.QueryEventManagement.on(target,"mouseout",listener);
}
domtools.QueryEventManagement.mouseover = function(target,listener) {
	return domtools.QueryEventManagement.on(target,"mouseover",listener);
}
domtools.QueryEventManagement.mouseup = function(target,listener) {
	return domtools.QueryEventManagement.on(target,"mouseup",listener);
}
domtools.QueryEventManagement.keydown = function(target,listener) {
	return domtools.QueryEventManagement.on(target,"keydown",listener);
}
domtools.QueryEventManagement.keypress = function(target,listener) {
	return domtools.QueryEventManagement.on(target,"keypress",listener);
}
domtools.QueryEventManagement.keyup = function(target,listener) {
	return domtools.QueryEventManagement.on(target,"keyup",listener);
}
domtools.QueryEventManagement.hover = function(targetCollection,listener1,listener2) {
	var $it0 = targetCollection.collection.iterator();
	while( $it0.hasNext() ) {
		var node = $it0.next();
		domtools.EventManagement.hover(node,listener1,listener2);
	}
	return targetCollection;
}
domtools.QueryEventManagement.submit = function(target,listener) {
	return domtools.QueryEventManagement.on(target,"submit",listener);
}
domtools.QueryEventManagement.toggleClick = function(targetCollection,listenerFirstClick,listenerSecondClick) {
	var $it0 = targetCollection.collection.iterator();
	while( $it0.hasNext() ) {
		var target = $it0.next();
		domtools.EventManagement.toggleClick(target,listenerFirstClick,listenerSecondClick);
	}
	return targetCollection;
}
domtools.QueryEventManagement.blur = function(target,listener) {
	return domtools.QueryEventManagement.on(target,"blur",listener);
}
domtools.QueryEventManagement.change = function(target,listener) {
	return domtools.QueryEventManagement.on(target,"change",listener);
}
domtools.QueryEventManagement.click = function(target,listener) {
	return domtools.QueryEventManagement.on(target,"click",listener);
}
domtools.QueryEventManagement.dblclick = function(target,listener) {
	return domtools.QueryEventManagement.on(target,"dblclick",listener);
}
domtools.QueryEventManagement.focus = function(target,listener) {
	return domtools.QueryEventManagement.on(target,"focus",listener);
}
domtools.QueryEventManagement.focusIn = function(target,listener) {
	return domtools.QueryEventManagement.on(target,"focusIn",listener);
}
domtools.QueryEventManagement.focusOut = function(target,listener) {
	return domtools.QueryEventManagement.on(target,"focusOut",listener);
}
domtools.QueryEventManagement.resize = function(target,listener) {
	return domtools.QueryEventManagement.on(target,"resize",listener);
}
domtools.QueryEventManagement.scroll = function(target,listener) {
	return domtools.QueryEventManagement.on(target,"scroll",listener);
}
domtools.QueryEventManagement.select = function(target,listener) {
	return domtools.QueryEventManagement.on(target,"select",listener);
}
domtools.QueryEventManagement.load = function(target,listener) {
	return domtools.QueryEventManagement.on(target,"load",listener);
}
domtools.QueryEventManagement.unload = function(target,listener) {
	return domtools.QueryEventManagement.on(target,"unload",listener);
}
domtools.QueryEventManagement.error = function(target,listener) {
	return domtools.QueryEventManagement.on(target,"error",listener);
}
domtools.QueryEventManagement.ready = function(target,listener) {
	return domtools.QueryEventManagement.on(target,"ready",listener);
}
domtools.QueryEventManagement.prototype.__class__ = domtools.QueryEventManagement;
StringBuf = function(p) {
	if( p === $_ ) return;
	this.b = new Array();
}
StringBuf.__name__ = ["StringBuf"];
StringBuf.prototype.add = function(x) {
	this.b[this.b.length] = x == null?"null":x;
}
StringBuf.prototype.addSub = function(s,pos,len) {
	this.b[this.b.length] = s.substr(pos,len);
}
StringBuf.prototype.addChar = function(c) {
	this.b[this.b.length] = String.fromCharCode(c);
}
StringBuf.prototype.toString = function() {
	return this.b.join("");
}
StringBuf.prototype.b = null;
StringBuf.prototype.__class__ = StringBuf;
CommonJS = function() { }
CommonJS.__name__ = ["CommonJS"];
CommonJS.getWindow = function() {
	var window = window;
	return window;
}
CommonJS.getHtmlDocument = function() {
	var htmlDocument = document;
	return htmlDocument;
}
CommonJS.newElement = function(elementType,htmlElement) {
	var htmlDocument = CommonJS.getHtmlDocument();
	if(htmlElement == null) htmlElement = htmlDocument.body;
	return htmlElement.createElement(elementType);
}
CommonJS.get = function(domSelection) {
	var htmlDocument = CommonJS.getHtmlDocument();
	return htmlDocument.body.querySelector(domSelection);
}
CommonJS.getAll = function(domSelection) {
	var htmlDocument = CommonJS.getHtmlDocument();
	return htmlDocument.body.querySelectorAll(domSelection);
}
CommonJS.stopEventPropergation = function(event) {
	if(event.stopPropagation != null) event.stopPropagation(); else if(event.cancelBubble != null) event.cancelBubble = true;
	if(event.preventDefault != null) event.preventDefault(); else if(event.returnValue != null) event.returnValue = false;
}
CommonJS.addEventListener = function(domSelection,eventType,eventHandler,useCapture) {
	if(useCapture == null) useCapture = true;
	var nodeList = CommonJS.getAll(domSelection);
	var _g1 = 0, _g = nodeList.length;
	while(_g1 < _g) {
		var i = _g1++;
		var element = nodeList[i];
		element.addEventListener(eventType,eventHandler,useCapture);
	}
}
CommonJS.removeEventListener = function(domSelection,eventType,eventHandler,useCapture) {
	if(useCapture == null) useCapture = true;
	var nodeList = CommonJS.getAll(domSelection);
	var _g1 = 0, _g = nodeList.length;
	while(_g1 < _g) {
		var i = _g1++;
		var element = nodeList[i];
		element.removeEventListener(eventType,eventHandler,useCapture);
	}
}
CommonJS.getComputedStyle = function(element,style) {
	var computedStyle;
	var htmlDocument = CommonJS.getHtmlDocument();
	if(element.currentStyle != null) computedStyle = element.currentStyle; else computedStyle = htmlDocument.defaultView.getComputedStyle(element,null);
	return computedStyle.getPropertyValue(style);
}
CommonJS.setStyle = function(domSelection,cssStyle,value) {
	var nodeList = CommonJS.getAll(domSelection);
	var _g1 = 0, _g = nodeList.length;
	while(_g1 < _g) {
		var i = _g1++;
		var element = nodeList[i];
		element.style[cssStyle] = value;
	}
}
CommonJS.prototype.__class__ = CommonJS;
demo.MySampleModel = function() { }
demo.MySampleModel.__name__ = ["demo","MySampleModel"];
demo.MySampleModel.prototype.id = null;
demo.MySampleModel.prototype.name = null;
demo.MySampleModel.prototype.email = null;
demo.MySampleModel.prototype.description = null;
demo.MySampleModel.prototype.nicknames = null;
demo.MySampleModel.prototype.state = null;
demo.MySampleModel.prototype.isCool = null;
demo.MySampleModel.prototype.birthday = null;
demo.MySampleModel.prototype.__class__ = demo.MySampleModel;
demo.MySampleModel.__interfaces__ = [haxe.rtti.Infos];
demo.State = { __ename__ : ["demo","State"], __constructs__ : ["wa","sa","nt","qld","nsw","act","vic","tas"] }
demo.State.wa = ["wa",0];
demo.State.wa.toString = $estr;
demo.State.wa.__enum__ = demo.State;
demo.State.sa = ["sa",1];
demo.State.sa.toString = $estr;
demo.State.sa.__enum__ = demo.State;
demo.State.nt = ["nt",2];
demo.State.nt.toString = $estr;
demo.State.nt.__enum__ = demo.State;
demo.State.qld = ["qld",3];
demo.State.qld.toString = $estr;
demo.State.qld.__enum__ = demo.State;
demo.State.nsw = ["nsw",4];
demo.State.nsw.toString = $estr;
demo.State.nsw.__enum__ = demo.State;
demo.State.act = ["act",5];
demo.State.act.toString = $estr;
demo.State.act.__enum__ = demo.State;
demo.State.vic = ["vic",6];
demo.State.vic.toString = $estr;
demo.State.vic.__enum__ = demo.State;
demo.State.tas = ["tas",7];
demo.State.tas.toString = $estr;
demo.State.tas.__enum__ = demo.State;
Lambda = function() { }
Lambda.__name__ = ["Lambda"];
Lambda.array = function(it) {
	var a = new Array();
	var $it0 = it.iterator();
	while( $it0.hasNext() ) {
		var i = $it0.next();
		a.push(i);
	}
	return a;
}
Lambda.list = function(it) {
	var l = new List();
	var $it0 = it.iterator();
	while( $it0.hasNext() ) {
		var i = $it0.next();
		l.add(i);
	}
	return l;
}
Lambda.map = function(it,f) {
	var l = new List();
	var $it0 = it.iterator();
	while( $it0.hasNext() ) {
		var x = $it0.next();
		l.add(f(x));
	}
	return l;
}
Lambda.mapi = function(it,f) {
	var l = new List();
	var i = 0;
	var $it0 = it.iterator();
	while( $it0.hasNext() ) {
		var x = $it0.next();
		l.add(f(i++,x));
	}
	return l;
}
Lambda.has = function(it,elt,cmp) {
	if(cmp == null) {
		var $it0 = it.iterator();
		while( $it0.hasNext() ) {
			var x = $it0.next();
			if(x == elt) return true;
		}
	} else {
		var $it1 = it.iterator();
		while( $it1.hasNext() ) {
			var x = $it1.next();
			if(cmp(x,elt)) return true;
		}
	}
	return false;
}
Lambda.exists = function(it,f) {
	var $it0 = it.iterator();
	while( $it0.hasNext() ) {
		var x = $it0.next();
		if(f(x)) return true;
	}
	return false;
}
Lambda.foreach = function(it,f) {
	var $it0 = it.iterator();
	while( $it0.hasNext() ) {
		var x = $it0.next();
		if(!f(x)) return false;
	}
	return true;
}
Lambda.iter = function(it,f) {
	var $it0 = it.iterator();
	while( $it0.hasNext() ) {
		var x = $it0.next();
		f(x);
	}
}
Lambda.filter = function(it,f) {
	var l = new List();
	var $it0 = it.iterator();
	while( $it0.hasNext() ) {
		var x = $it0.next();
		if(f(x)) l.add(x);
	}
	return l;
}
Lambda.fold = function(it,f,first) {
	var $it0 = it.iterator();
	while( $it0.hasNext() ) {
		var x = $it0.next();
		first = f(x,first);
	}
	return first;
}
Lambda.count = function(it,pred) {
	var n = 0;
	if(pred == null) {
		var $it0 = it.iterator();
		while( $it0.hasNext() ) {
			var _ = $it0.next();
			n++;
		}
	} else {
		var $it1 = it.iterator();
		while( $it1.hasNext() ) {
			var x = $it1.next();
			if(pred(x)) n++;
		}
	}
	return n;
}
Lambda.empty = function(it) {
	return !it.iterator().hasNext();
}
Lambda.indexOf = function(it,v) {
	var i = 0;
	var $it0 = it.iterator();
	while( $it0.hasNext() ) {
		var v2 = $it0.next();
		if(v == v2) return i;
		i++;
	}
	return -1;
}
Lambda.concat = function(a,b) {
	var l = new List();
	var $it0 = a.iterator();
	while( $it0.hasNext() ) {
		var x = $it0.next();
		l.add(x);
	}
	var $it1 = b.iterator();
	while( $it1.hasNext() ) {
		var x = $it1.next();
		l.add(x);
	}
	return l;
}
Lambda.prototype.__class__ = Lambda;
autoform.ui.TextArea = function(field) {
	if( field === $_ ) return;
	autoform.AbstractField.call(this,"div");
	domtools.QueryElementManipulation.addClass(domtools.QueryElementManipulation.addClass(this,"af-field-container"),field.id);
	domtools.QueryElementManipulation.setInnerHTML(this,"<label></label><textarea />");
	domtools.QueryElementManipulation.setAttr(domtools.QueryElementManipulation.addClass(domtools.QueryElementManipulation.setAttr(domtools.QueryTraversing.find(this,"textarea"),"id",field.fullID),".input"),"placeholder",field.placeholder);
	domtools.QueryElementManipulation.setAttr(domtools.QueryElementManipulation.setText(domtools.QueryTraversing.find(this,"label"),field.title),"for",field.fullID);
	if(field.description != "") domtools.QueryDOMManipulation.append(domtools.QueryTraversing.find(this,"label"),domtools.ElementManipulation.setText(document.createElement("p"),field.description));
}
autoform.ui.TextArea.__name__ = ["autoform","ui","TextArea"];
autoform.ui.TextArea.__super__ = autoform.AbstractField;
for(var k in autoform.AbstractField.prototype ) autoform.ui.TextArea.prototype[k] = autoform.AbstractField.prototype[k];
autoform.ui.TextArea.prototype.__class__ = autoform.ui.TextArea;
haxe.rtti.Meta = function() { }
haxe.rtti.Meta.__name__ = ["haxe","rtti","Meta"];
haxe.rtti.Meta.getType = function(t) {
	var meta = t.__meta__;
	return meta == null || meta.obj == null?{ }:meta.obj;
}
haxe.rtti.Meta.getStatics = function(t) {
	var meta = t.__meta__;
	return meta == null || meta.statics == null?{ }:meta.statics;
}
haxe.rtti.Meta.getFields = function(t) {
	var meta = t.__meta__;
	return meta == null || meta.fields == null?{ }:meta.fields;
}
haxe.rtti.Meta.prototype.__class__ = haxe.rtti.Meta;
autoform.AutoForm = function(c,formID) {
	if( c === $_ ) return;
	domtools.AbstractCustomElement.call(this,"form");
	if(formID == null) {
		autoform.AutoForm.formIDIncrement = autoform.AutoForm.formIDIncrement + 1;
		formID = "af-" + autoform.AutoForm.formIDIncrement;
	}
	this.fields = new Array();
	this.classval = c;
	var rttiString = c.__rtti;
	var rtti = Xml.parse(rttiString).firstElement();
	this.meta = haxe.rtti.Meta.getFields(c);
	var fieldsXml = rtti.elements();
	while( fieldsXml.hasNext() ) {
		var field = fieldsXml.next();
		if(field.getNodeName() != "implements") this.fields.push(new autoform.FieldInfo(field,rtti,this.meta,formID));
	}
	var renderer = new autoform.renderer.DefaultRenderer(this);
	renderer.run(this.fields);
}
autoform.AutoForm.__name__ = ["autoform","AutoForm"];
autoform.AutoForm.__super__ = domtools.AbstractCustomElement;
for(var k in domtools.AbstractCustomElement.prototype ) autoform.AutoForm.prototype[k] = domtools.AbstractCustomElement.prototype[k];
autoform.AutoForm.prototype.classval = null;
autoform.AutoForm.prototype.rtti = null;
autoform.AutoForm.prototype.meta = null;
autoform.AutoForm.prototype.fields = null;
autoform.AutoForm.prototype.populateForm = function(object) {
}
autoform.AutoForm.prototype.readForm = function() {
	var object = Type.createEmptyInstance(this.classval);
	return object;
}
autoform.AutoForm.prototype.__class__ = autoform.AutoForm;
autoform.ui.CheckBox = function(field) {
	if( field === $_ ) return;
	autoform.AbstractField.call(this,"div");
	domtools.QueryElementManipulation.addClass(domtools.QueryElementManipulation.addClass(this,"af-field-container"),field.id);
	domtools.QueryElementManipulation.setInnerHTML(this,"<div><input /><label></label></div>");
	domtools.QueryElementManipulation.addClass(domtools.QueryTraversing.find(this,"div"),"checkbox");
	domtools.QueryElementManipulation.setAttr(domtools.QueryElementManipulation.setAttr(domtools.QueryTraversing.find(this,"input"),"type","checkbox"),"id",field.fullID);
	domtools.QueryElementManipulation.setAttr(domtools.QueryElementManipulation.setText(domtools.QueryTraversing.find(this,"label"),field.title),"for",field.fullID);
	haxe.Log.trace(field.description,{ fileName : "CheckBox.hx", lineNumber : 21, className : "autoform.ui.CheckBox", methodName : "new"});
	if(field.description != "") {
		haxe.Log.trace("hey?",{ fileName : "CheckBox.hx", lineNumber : 24, className : "autoform.ui.CheckBox", methodName : "new"});
		domtools.QueryDOMManipulation.prepend(this,domtools.ElementManipulation.setText(document.createElement("p"),field.description));
	}
}
autoform.ui.CheckBox.__name__ = ["autoform","ui","CheckBox"];
autoform.ui.CheckBox.__super__ = autoform.AbstractField;
for(var k in autoform.AbstractField.prototype ) autoform.ui.CheckBox.prototype[k] = autoform.AbstractField.prototype[k];
autoform.ui.CheckBox.prototype.__class__ = autoform.ui.CheckBox;
autoform.ui.HiddenField = function(field) {
	if( field === $_ ) return;
	autoform.AbstractField.call(this,"div");
	domtools.QueryElementManipulation.addClass(domtools.QueryElementManipulation.setInnerHTML(this,"<input />"),field.id);
	domtools.QueryElementManipulation.setAttr(domtools.QueryElementManipulation.setAttr(domtools.QueryTraversing.find(this,"input"),"type","hidden"),"id",field.fullID);
}
autoform.ui.HiddenField.__name__ = ["autoform","ui","HiddenField"];
autoform.ui.HiddenField.__super__ = autoform.AbstractField;
for(var k in autoform.AbstractField.prototype ) autoform.ui.HiddenField.prototype[k] = autoform.AbstractField.prototype[k];
autoform.ui.HiddenField.prototype.__class__ = autoform.ui.HiddenField;
haxe.Log = function() { }
haxe.Log.__name__ = ["haxe","Log"];
haxe.Log.trace = function(v,infos) {
	js.Boot.__trace(v,infos);
}
haxe.Log.clear = function() {
	js.Boot.__clear_trace();
}
haxe.Log.prototype.__class__ = haxe.Log;
Hash = function(p) {
	if( p === $_ ) return;
	this.h = {}
	if(this.h.__proto__ != null) {
		this.h.__proto__ = null;
		delete(this.h.__proto__);
	}
}
Hash.__name__ = ["Hash"];
Hash.prototype.h = null;
Hash.prototype.set = function(key,value) {
	this.h["$" + key] = value;
}
Hash.prototype.get = function(key) {
	return this.h["$" + key];
}
Hash.prototype.exists = function(key) {
	try {
		key = "$" + key;
		return this.hasOwnProperty.call(this.h,key);
	} catch( e ) {
		for(var i in this.h) if( i == key ) return true;
		return false;
	}
}
Hash.prototype.remove = function(key) {
	if(!this.exists(key)) return false;
	delete(this.h["$" + key]);
	return true;
}
Hash.prototype.keys = function() {
	var a = new Array();
	for(var i in this.h) a.push(i.substr(1));
	return a.iterator();
}
Hash.prototype.iterator = function() {
	return { ref : this.h, it : this.keys(), hasNext : function() {
		return this.it.hasNext();
	}, next : function() {
		var i = this.it.next();
		return this.ref["$" + i];
	}};
}
Hash.prototype.toString = function() {
	var s = new StringBuf();
	s.b[s.b.length] = "{" == null?"null":"{";
	var it = this.keys();
	while( it.hasNext() ) {
		var i = it.next();
		s.b[s.b.length] = i == null?"null":i;
		s.b[s.b.length] = " => " == null?"null":" => ";
		s.add(Std.string(this.get(i)));
		if(it.hasNext()) s.b[s.b.length] = ", " == null?"null":", ";
	}
	s.b[s.b.length] = "}" == null?"null":"}";
	return s.b.join("");
}
Hash.prototype.__class__ = Hash;
Std = function() { }
Std.__name__ = ["Std"];
Std["is"] = function(v,t) {
	return js.Boot.__instanceof(v,t);
}
Std.string = function(s) {
	return js.Boot.__string_rec(s,"");
}
Std["int"] = function(x) {
	if(x < 0) return Math.ceil(x);
	return Math.floor(x);
}
Std.parseInt = function(x) {
	var v = parseInt(x,10);
	if(v == 0 && x.charCodeAt(1) == 120) v = parseInt(x);
	if(isNaN(v)) return null;
	return v;
}
Std.parseFloat = function(x) {
	return parseFloat(x);
}
Std.random = function(x) {
	return Math.floor(Math.random() * x);
}
Std.prototype.__class__ = Std;
if(!autoform.renderer) autoform.renderer = {}
autoform.renderer.DefaultRenderer = function(form) {
	if( form === $_ ) return;
	autoform.AbstractRenderer.call(this,form);
	this.displays.set("text",autoform.ui.TextField);
	this.displays.set("textarea",autoform.ui.TextArea);
	this.displays.set("hidden",autoform.ui.HiddenField);
	this.displays.set("checkbox",autoform.ui.CheckBox);
}
autoform.renderer.DefaultRenderer.__name__ = ["autoform","renderer","DefaultRenderer"];
autoform.renderer.DefaultRenderer.__super__ = autoform.AbstractRenderer;
for(var k in autoform.AbstractRenderer.prototype ) autoform.renderer.DefaultRenderer.prototype[k] = autoform.AbstractRenderer.prototype[k];
autoform.renderer.DefaultRenderer.prototype.run = function(fields) {
	var _g = 0;
	while(_g < fields.length) {
		var field = fields[_g];
		++_g;
		var thisClass = String;
		var element;
		var display = autoform.AbstractRenderer.guessDisplay(field);
		var classOfFieldUI = this.displays.exists(display)?this.displays.get(display):this.displays.get("text");
		element = Type.createInstance(classOfFieldUI,[field]);
		domtools.QueryDOMManipulation.appendTo(element,null,this.form);
	}
}
autoform.renderer.DefaultRenderer.prototype.__class__ = autoform.renderer.DefaultRenderer;
js.Lib = function() { }
js.Lib.__name__ = ["js","Lib"];
js.Lib.isIE = null;
js.Lib.isOpera = null;
js.Lib.document = null;
js.Lib.window = null;
js.Lib.alert = function(v) {
	alert(js.Boot.__string_rec(v,""));
}
js.Lib.eval = function(code) {
	return eval(code);
}
js.Lib.setErrorHandler = function(f) {
	js.Lib.onerror = f;
}
js.Lib.prototype.__class__ = js.Lib;
StringTools = function() { }
StringTools.__name__ = ["StringTools"];
StringTools.urlEncode = function(s) {
	return encodeURIComponent(s);
}
StringTools.urlDecode = function(s) {
	return decodeURIComponent(s.split("+").join(" "));
}
StringTools.htmlEscape = function(s) {
	return s.split("&").join("&amp;").split("<").join("&lt;").split(">").join("&gt;");
}
StringTools.htmlUnescape = function(s) {
	return s.split("&gt;").join(">").split("&lt;").join("<").split("&amp;").join("&");
}
StringTools.startsWith = function(s,start) {
	return s.length >= start.length && s.substr(0,start.length) == start;
}
StringTools.endsWith = function(s,end) {
	var elen = end.length;
	var slen = s.length;
	return slen >= elen && s.substr(slen - elen,elen) == end;
}
StringTools.isSpace = function(s,pos) {
	var c = s.charCodeAt(pos);
	return c >= 9 && c <= 13 || c == 32;
}
StringTools.ltrim = function(s) {
	var l = s.length;
	var r = 0;
	while(r < l && StringTools.isSpace(s,r)) r++;
	if(r > 0) return s.substr(r,l - r); else return s;
}
StringTools.rtrim = function(s) {
	var l = s.length;
	var r = 0;
	while(r < l && StringTools.isSpace(s,l - r - 1)) r++;
	if(r > 0) return s.substr(0,l - r); else return s;
}
StringTools.trim = function(s) {
	return StringTools.ltrim(StringTools.rtrim(s));
}
StringTools.rpad = function(s,c,l) {
	var sl = s.length;
	var cl = c.length;
	while(sl < l) if(l - sl < cl) {
		s += c.substr(0,l - sl);
		sl = l;
	} else {
		s += c;
		sl += cl;
	}
	return s;
}
StringTools.lpad = function(s,c,l) {
	var ns = "";
	var sl = s.length;
	if(sl >= l) return s;
	var cl = c.length;
	while(sl < l) if(l - sl < cl) {
		ns += c.substr(0,l - sl);
		sl = l;
	} else {
		ns += c;
		sl += cl;
	}
	return ns + s;
}
StringTools.replace = function(s,sub,by) {
	return s.split(sub).join(by);
}
StringTools.hex = function(n,digits) {
	var s = "";
	var hexChars = "0123456789ABCDEF";
	do {
		s = hexChars.charAt(n & 15) + s;
		n >>>= 4;
	} while(n > 0);
	if(digits != null) while(s.length < digits) s = "0" + s;
	return s;
}
StringTools.fastCodeAt = function(s,index) {
	return s.cca(index);
}
StringTools.isEOF = function(c) {
	return c != c;
}
StringTools.prototype.__class__ = StringTools;
$_ = {}
js.Boot.__res = {}
js.Boot.__init();
{
	Object.prototype.iterator = function() {
      var o = this.instanceKeys();
      var y = this;
      return {
        cur : 0,
        arr : o,
        hasNext: function() { return this.cur < this.arr.length; },
        next: function() { return y[this.arr[this.cur++]]; }
      };
    }
	Object.prototype.instanceKeys = function(proto) {
      var keys = [];
      proto = !proto;
      for(var i in this) {
        if(proto && Object.prototype[i]) continue;
        keys.push(i);
      }
      return keys;
    }
}
{
	Math.__name__ = ["Math"];
	Math.NaN = Number["NaN"];
	Math.NEGATIVE_INFINITY = Number["NEGATIVE_INFINITY"];
	Math.POSITIVE_INFINITY = Number["POSITIVE_INFINITY"];
	Math.isFinite = function(i) {
		return isFinite(i);
	};
	Math.isNaN = function(i) {
		return isNaN(i);
	};
}
{
	Xml.Element = "element";
	Xml.PCData = "pcdata";
	Xml.CData = "cdata";
	Xml.Comment = "comment";
	Xml.DocType = "doctype";
	Xml.Prolog = "prolog";
	Xml.Document = "document";
}
{
	String.prototype.__class__ = String;
	String.__name__ = ["String"];
	Array.prototype.__class__ = Array;
	Array.__name__ = ["Array"];
	Int = { __name__ : ["Int"]};
	Dynamic = { __name__ : ["Dynamic"]};
	Float = Number;
	Float.__name__ = ["Float"];
	Bool = { __ename__ : ["Bool"]};
	Class = { __name__ : ["Class"]};
	Enum = { };
	Void = { __ename__ : ["Void"]};
}
{
	js.Lib.document = document;
	js.Lib.window = window;
	onerror = function(msg,url,line) {
		var f = js.Lib.onerror;
		if( f == null )
			return false;
		return f(msg,[url+":"+line]);
	}
}
{
	var d = Date;
	d.now = function() {
		return new Date();
	};
	d.fromTime = function(t) {
		var d1 = new Date();
		d1["setTime"](t);
		return d1;
	};
	d.fromString = function(s) {
		switch(s.length) {
		case 8:
			var k = s.split(":");
			var d1 = new Date();
			d1["setTime"](0);
			d1["setUTCHours"](k[0]);
			d1["setUTCMinutes"](k[1]);
			d1["setUTCSeconds"](k[2]);
			return d1;
		case 10:
			var k = s.split("-");
			return new Date(k[0],k[1] - 1,k[2],0,0,0);
		case 19:
			var k = s.split(" ");
			var y = k[0].split("-");
			var t = k[1].split(":");
			return new Date(y[0],y[1] - 1,y[2],t[0],t[1],t[2]);
		default:
			throw "Invalid date format : " + s;
		}
	};
	d.prototype["toString"] = function() {
		var date = this;
		var m = date.getMonth() + 1;
		var d1 = date.getDate();
		var h = date.getHours();
		var mi = date.getMinutes();
		var s = date.getSeconds();
		return date.getFullYear() + "-" + (m < 10?"0" + m:"" + m) + "-" + (d1 < 10?"0" + d1:"" + d1) + " " + (h < 10?"0" + h:"" + h) + ":" + (mi < 10?"0" + mi:"" + mi) + ":" + (s < 10?"0" + s:"" + s);
	};
	d.prototype.__class__ = d;
	d.__name__ = ["Date"];
}
Xml.enode = new EReg("^<([a-zA-Z0-9:_-]+)","");
Xml.ecdata = new EReg("^<!\\[CDATA\\[","i");
Xml.edoctype = new EReg("^<!DOCTYPE ","i");
Xml.eend = new EReg("^</([a-zA-Z0-9:_-]+)>","");
Xml.epcdata = new EReg("^[^<]+","");
Xml.ecomment = new EReg("^<!--","");
Xml.eprolog = new EReg("^<\\?[^\\?]+\\?>","");
Xml.eattribute = new EReg("^\\s*([a-zA-Z0-9:_-]+)\\s*=\\s*([\"'])([^\\2]*?)\\2","");
Xml.eclose = new EReg("^[ \r\n\t]*(>|(/>))","");
Xml.ecdata_end = new EReg("\\]\\]>","");
Xml.edoctype_elt = new EReg("[\\[|\\]>]","");
Xml.ecomment_end = new EReg("-->","");
domtools.ElementManipulation.NodeTypeElement = 1;
domtools.ElementManipulation.NodeTypeAttribute = 2;
domtools.ElementManipulation.NodeTypeText = 3;
demo.MySampleModel.__meta__ = { fields : { id : { autoform : [{ required : true, title : "Database ID", display : "hidden"}]}, name : { autoform : [{ title : "Your name"}]}, email : { autoform : [{ title : "Your email address", description : "We promise not to send you spam!  We use your email only to help you restore your password."}]}, description : { autoform : [{ display : "textarea", description : "This will not affect your application, it is merely for statistical purposes."}]}, isCool : { autoform : [{ title : "Are you pretty cool?"}]}}};
demo.MySampleModel.__rtti = "<class path=\"demo.MySampleModel\" params=\"\">\n\t<implements path=\"haxe.rtti.Infos\"/>\n\t<id public=\"1\"><c path=\"Int\"/></id>\n\t<name public=\"1\"><c path=\"String\"/></name>\n\t<email public=\"1\"><t path=\"Null\"><c path=\"String\"/></t></email>\n\t<description public=\"1\"><c path=\"String\"/></description>\n\t<nicknames public=\"1\"><c path=\"Array\"><c path=\"String\"/></c></nicknames>\n\t<state public=\"1\"><e path=\"demo.State\"/></state>\n\t<isCool public=\"1\"><e path=\"Bool\"/></isCool>\n\t<birthday public=\"1\"><c path=\"Date\"/></birthday>\n</class>";
autoform.AutoForm.formIDIncrement = 0;
js.Lib.onerror = null;
demo.Main.main()