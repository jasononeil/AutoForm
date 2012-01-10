$estr = function() { return js.Boot.__string_rec(this,''); }
if(typeof sys=='undefined') sys = {}
if(!sys.db) sys.db = {}
sys.db.Object = function(p) {
}
sys.db.Object.__name__ = ["sys","db","Object"];
sys.db.Object.prototype._locked = null;
sys.db.Object.prototype._manager = null;
sys.db.Object.prototype.insert = function() {
	this._manager.doInsert(this);
}
sys.db.Object.prototype.update = function() {
	this._manager.doUpdate(this);
}
sys.db.Object.prototype.lock = function() {
	this._manager.doLock(this);
}
sys.db.Object.prototype["delete"] = function() {
	this._manager.doDelete(this);
}
sys.db.Object.prototype.toString = function() {
	return this._manager.objectToString(this);
}
sys.db.Object.prototype.__class__ = sys.db.Object;
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
if(typeof demo=='undefined') demo = {}
demo.Main = function() { }
demo.Main.__name__ = ["demo","Main"];
demo.Main.main = function() {
	var form = new autoform.AutoForm(demo.MySampleModel);
}
demo.Main.prototype.__class__ = demo.Main;
if(typeof haxe=='undefined') haxe = {}
haxe.Log = function() { }
haxe.Log.__name__ = ["haxe","Log"];
haxe.Log.trace = function(v,infos) {
	js.Boot.__trace(v,infos);
}
haxe.Log.clear = function() {
	js.Boot.__clear_trace();
}
haxe.Log.prototype.__class__ = haxe.Log;
sys.db.ResultSet = function() { }
sys.db.ResultSet.__name__ = ["sys","db","ResultSet"];
sys.db.ResultSet.prototype.length = null;
sys.db.ResultSet.prototype.nfields = null;
sys.db.ResultSet.prototype.hasNext = null;
sys.db.ResultSet.prototype.next = null;
sys.db.ResultSet.prototype.results = null;
sys.db.ResultSet.prototype.getResult = null;
sys.db.ResultSet.prototype.getIntResult = null;
sys.db.ResultSet.prototype.getFloatResult = null;
sys.db.ResultSet.prototype.getFieldsNames = null;
sys.db.ResultSet.prototype.__class__ = sys.db.ResultSet;
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
	s.b[s.b.length] = "{";
	var it = this.keys();
	while( it.hasNext() ) {
		var i = it.next();
		s.b[s.b.length] = i == null?"null":i;
		s.b[s.b.length] = " => ";
		s.add(Std.string(this.get(i)));
		if(it.hasNext()) s.b[s.b.length] = ", ";
	}
	s.b[s.b.length] = "}";
	return s.b.join("");
}
Hash.prototype.__class__ = Hash;
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
	s.b[s.b.length] = "{";
	while(l != null) {
		if(first) first = false; else s.b[s.b.length] = ", ";
		s.add(Std.string(l[0]));
		l = l[1];
	}
	s.b[s.b.length] = "}";
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
sys.db.Manager = function(classval) {
	if( classval === $_ ) return;
	var m = haxe.rtti.Meta.getType(classval).rtti;
	if(m == null) throw "Missing @rtti for class " + Type.getClassName(classval);
	this.table_infos = haxe.Unserializer.run(m[0]);
	this.table_name = this.quoteField(this.table_infos.name);
	this.table_keys = this.table_infos.key;
	this.table_fields = new List();
	var _g = 0, _g1 = this.table_infos.fields;
	while(_g < _g1.length) {
		var f = _g1[_g];
		++_g;
		this.table_fields.add(f.name);
	}
	this.class_proto = classval;
}
sys.db.Manager.__name__ = ["sys","db","Manager"];
sys.db.Manager.cnx = null;
sys.db.Manager.lockMode = null;
sys.db.Manager.setConnection = function(c) {
	sys.db.Manager.cnx = c;
	sys.db.Manager.lockMode = c != null && c.dbName() == "MySQL"?" FOR UPDATE":"";
	return c;
}
sys.db.Manager.initialize = function() {
	var l = sys.db.Manager.init_list;
	sys.db.Manager.init_list = new List();
	var $it0 = l.iterator();
	while( $it0.hasNext() ) {
		var m = $it0.next();
		var _g = 0, _g1 = m.table_infos.relations;
		while(_g < _g1.length) {
			var r = _g1[_g];
			++_g;
			m.initRelation(r);
		}
	}
}
sys.db.Manager.cleanup = function() {
	sys.db.Manager.object_cache = new Hash();
}
sys.db.Manager.quoteAny = function(v) {
	var s = new StringBuf();
	sys.db.Manager.cnx.addValue(s,v);
	return s.b.join("");
}
sys.db.Manager.quoteList = function(v,it) {
	var b = new StringBuf();
	var first = true;
	if(it != null) {
		var $it0 = it.iterator();
		while( $it0.hasNext() ) {
			var v1 = $it0.next();
			if(first) first = false; else b.b[b.b.length] = String.fromCharCode(44);
			sys.db.Manager.cnx.addValue(b,v1);
		}
	}
	if(first) return "FALSE";
	return v + " IN (" + b.b.join("") + ")";
}
sys.db.Manager.prototype.table_infos = null;
sys.db.Manager.prototype.table_name = null;
sys.db.Manager.prototype.table_fields = null;
sys.db.Manager.prototype.table_keys = null;
sys.db.Manager.prototype.class_proto = null;
sys.db.Manager.prototype.all = function(lock) {
	return this.unsafeObjects("SELECT * FROM " + this.table_name,lock);
}
sys.db.Manager.prototype.get = null;
sys.db.Manager.prototype.select = null;
sys.db.Manager.prototype.search = null;
sys.db.Manager.prototype.count = null;
sys.db.Manager.prototype["delete"] = null;
sys.db.Manager.prototype.dynamicSearch = function(x,lock) {
	var s = new StringBuf();
	s.b[s.b.length] = "SELECT * FROM ";
	s.add(this.table_name);
	s.b[s.b.length] = " WHERE ";
	this.addCondition(s,x);
	return this.unsafeObjects(s.b.join(""),lock);
}
sys.db.Manager.prototype.quote = function(s) {
	return this.getCnx().quote(s);
}
sys.db.Manager.prototype.doInsert = function(x) {
	this.unmake(x);
	var s = new StringBuf();
	var fields = new List();
	var values = new List();
	var pos = 0;
	var $it0 = this.table_fields.iterator();
	while( $it0.hasNext() ) {
		var f = $it0.next();
		var v = Reflect.field(x,f);
		if(v != null) {
			fields.add(this.quoteField(f));
			values.add(v);
		} else {
			var inf = this.table_infos.fields[pos];
			if(!inf.isNull) {
				switch( (inf.t)[1] ) {
				case 3:
				case 24:
				case 1:
				case 6:
				case 7:
				case 23:
				case 5:
					x[f] = 0;
					break;
				case 8:
					x[f] = false;
					break;
				case 13:
				case 15:
				case 9:
				case 14:
				case 21:
					x[f] = "";
					break;
				case 16:
				case 22:
				case 17:
				case 19:
				case 18:
					x[f] = haxe.io.Bytes.alloc(0);
					break;
				case 10:
				case 11:
				case 12:
					break;
				case 0:
				case 2:
				case 4:
				case 26:
				case 25:
				case 20:
					break;
				}
			}
		}
		pos++;
	}
	s.b[s.b.length] = "INSERT INTO ";
	s.add(this.table_name);
	s.b[s.b.length] = " (";
	s.add(fields.join(","));
	s.b[s.b.length] = ") VALUES (";
	var first = true;
	var $it1 = values.iterator();
	while( $it1.hasNext() ) {
		var v = $it1.next();
		if(first) first = false; else s.b[s.b.length] = ", ";
		this.getCnx().addValue(s,v);
	}
	s.b[s.b.length] = ")";
	this.unsafeExecute(s.b.join(""));
	x._lock = true;
	if(this.table_keys.length == 1 && Reflect.field(x,this.table_keys[0]) == null) x[this.table_keys[0]] = this.getCnx().lastInsertId();
	this.addToCache(x);
}
sys.db.Manager.prototype.doUpdate = function(x) {
	if(!x._lock) throw "Cannot update a not locked object";
	this.unmake(x);
	var s = new StringBuf();
	s.b[s.b.length] = "UPDATE ";
	s.add(this.table_name);
	s.b[s.b.length] = " SET ";
	var cache = Reflect.field(x,"__cache__");
	var mod = false;
	var $it0 = this.table_fields.iterator();
	while( $it0.hasNext() ) {
		var f = $it0.next();
		var v = Reflect.field(x,f);
		var vc = Reflect.field(cache,f);
		if(v != vc) {
			if(mod) s.b[s.b.length] = ", "; else mod = true;
			s.add(this.quoteField(f));
			s.b[s.b.length] = " = ";
			this.getCnx().addValue(s,v);
			cache[f] = v;
		}
	}
	if(!mod) return;
	s.b[s.b.length] = " WHERE ";
	this.addKeys(s,x);
	this.unsafeExecute(s.b.join(""));
}
sys.db.Manager.prototype.doDelete = function(x) {
	var s = new StringBuf();
	s.b[s.b.length] = "DELETE FROM ";
	s.add(this.table_name);
	s.b[s.b.length] = " WHERE ";
	this.addKeys(s,x);
	this.unsafeExecute(s.b.join(""));
	this.removeFromCache(x);
}
sys.db.Manager.prototype.doLock = function(i) {
	if(i._lock) return;
	var s = new StringBuf();
	s.b[s.b.length] = "SELECT * FROM ";
	s.add(this.table_name);
	s.b[s.b.length] = " WHERE ";
	this.addKeys(s,i);
	this.unsafeObject(s.b.join(""),true);
}
sys.db.Manager.prototype.objectToString = function(it) {
	var s = new StringBuf();
	s.add(this.table_name);
	if(this.table_keys.length == 1) {
		s.b[s.b.length] = "#";
		s.add(Reflect.field(it,this.table_keys[0]));
	} else {
		s.b[s.b.length] = "(";
		var first = true;
		var _g = 0, _g1 = this.table_keys;
		while(_g < _g1.length) {
			var f = _g1[_g];
			++_g;
			if(first) first = false; else s.b[s.b.length] = ",";
			s.add(this.quoteField(f));
			s.b[s.b.length] = ":";
			s.add(Reflect.field(it,f));
		}
		s.b[s.b.length] = ")";
	}
	return s.b.join("");
}
sys.db.Manager.prototype.cacheObject = function(x,lock) {
	var o = Type.createEmptyInstance(this.class_proto);
	var _g = 0, _g1 = Reflect.fields(x);
	while(_g < _g1.length) {
		var f = _g1[_g];
		++_g;
		o[f] = Reflect.field(x,f);
	}
	o._manager = this;
	o["__cache__"] = x;
	this.addToCache(o);
	o._lock = lock;
	return o;
}
sys.db.Manager.prototype.make = function(x) {
}
sys.db.Manager.prototype.unmake = function(x) {
}
sys.db.Manager.prototype.quoteField = function(f) {
	return sys.db.Manager.KEYWORDS.exists(f.toLowerCase())?"`" + f + "`":f;
}
sys.db.Manager.prototype.addKeys = function(s,x) {
	var first = true;
	var _g = 0, _g1 = this.table_keys;
	while(_g < _g1.length) {
		var k = _g1[_g];
		++_g;
		if(first) first = false; else s.b[s.b.length] = " AND ";
		s.add(this.quoteField(k));
		s.b[s.b.length] = " = ";
		var f = Reflect.field(x,k);
		if(f == null) throw "Missing key " + k;
		this.getCnx().addValue(s,f);
	}
}
sys.db.Manager.prototype.unsafeExecute = function(sql) {
	return this.getCnx().request(sql);
}
sys.db.Manager.prototype.unsafeObject = function(sql,lock) {
	if(lock != false) {
		lock = true;
		sql += this.getLockMode();
	}
	var r = this.unsafeExecute(sql).next();
	if(r == null) return null;
	var c = this.getFromCache(r,lock);
	if(c != null) return c;
	r = this.cacheObject(r,lock);
	this.make(r);
	return r;
}
sys.db.Manager.prototype.unsafeObjects = function(sql,lock) {
	if(lock != false) {
		lock = true;
		sql += this.getLockMode();
	}
	var l = this.unsafeExecute(sql).results();
	var l2 = new List();
	var $it0 = l.iterator();
	while( $it0.hasNext() ) {
		var x = $it0.next();
		var c = this.getFromCache(x,lock);
		if(c != null) l2.add(c); else {
			x = this.cacheObject(x,lock);
			this.make(x);
			l2.add(x);
		}
	}
	return l2;
}
sys.db.Manager.prototype.unsafeCount = function(sql) {
	return this.unsafeExecute(sql).getIntResult(0);
}
sys.db.Manager.prototype.unsafeDelete = function(sql) {
	this.unsafeExecute(sql);
}
sys.db.Manager.prototype.unsafeGet = function(id,lock) {
	if(lock == null) lock = true;
	if(this.table_keys.length != 1) throw "Invalid number of keys";
	if(id == null) return null;
	var x = this.getFromCacheKey(Std.string(id) + this.table_name);
	if(x != null && (!lock || x._lock)) return x;
	var s = new StringBuf();
	s.b[s.b.length] = "SELECT * FROM ";
	s.add(this.table_name);
	s.b[s.b.length] = " WHERE ";
	s.add(this.quoteField(this.table_keys[0]));
	s.b[s.b.length] = " = ";
	this.getCnx().addValue(s,id);
	return this.unsafeObject(s.b.join(""),lock);
}
sys.db.Manager.prototype.unsafeGetWithKeys = function(keys,lock) {
	if(lock == null) lock = true;
	var x = this.getFromCacheKey(this.makeCacheKey(keys));
	if(x != null && (!lock || x._lock)) return x;
	var s = new StringBuf();
	s.b[s.b.length] = "SELECT * FROM ";
	s.add(this.table_name);
	s.b[s.b.length] = " WHERE ";
	this.addKeys(s,keys);
	return this.unsafeObject(s.b.join(""),lock);
}
sys.db.Manager.prototype.unsafeGetId = function(o) {
	return o == null?null:Reflect.field(o,this.table_keys[0]);
}
sys.db.Manager.prototype.addCondition = function(s,x) {
	var first = true;
	if(x != null) {
		var _g = 0, _g1 = Reflect.fields(x);
		while(_g < _g1.length) {
			var f = _g1[_g];
			++_g;
			if(first) first = false; else s.b[s.b.length] = " AND ";
			s.add(this.quoteField(f));
			var d = Reflect.field(x,f);
			if(d == null) s.b[s.b.length] = " IS NULL"; else {
				s.b[s.b.length] = " = ";
				this.getCnx().addValue(s,d);
			}
		}
	}
	if(first) s.b[s.b.length] = "1";
}
sys.db.Manager.prototype.dbClass = function() {
	return this.class_proto;
}
sys.db.Manager.prototype.dbInfos = function() {
	return this.table_infos;
}
sys.db.Manager.prototype.getCnx = function() {
	return sys.db.Manager.cnx;
}
sys.db.Manager.prototype.getLockMode = function() {
	return sys.db.Manager.lockMode;
}
sys.db.Manager.prototype.initRelation = function(r) {
	var spod = Type.resolveClass(r.type);
	if(spod == null) throw "Missing spod type " + r.type;
	var manager = spod.manager;
	var hprop = "__" + r.prop;
	var hkey = r.key;
	var lock = r.lock;
	if(manager == null || manager.table_keys == null) throw "Invalid manager for relation " + this.table_name + ":" + r.prop;
	if(manager.table_keys.length != 1) throw "Relation " + r.prop + "(" + r.key + ") on a multiple key table";
	this.class_proto.prototype["get_" + r.prop] = function() {
		var othis = this;
		var f = Reflect.field(othis,hprop);
		if(f != null) return f;
		var id = Reflect.field(othis,hkey);
		if(id == null) return null;
		f = manager.unsafeGet(id,lock);
		if(f == null && id != null && !lock) f = manager.unsafeGet(id,true);
		othis[hprop] = f;
		return f;
	};
	this.class_proto.prototype["set_" + r.prop] = function(f) {
		var othis = this;
		othis[hprop] = f;
		othis[hkey] = Reflect.field(f,manager.table_keys[0]);
		return f;
	};
}
sys.db.Manager.prototype.__get = function(x,prop,key,lock) {
	var v = Reflect.field(x,prop);
	if(v != null) return v.value;
	var x1 = this.unsafeGet(Reflect.field(x,key),lock);
	x1[prop] = { value : x1};
	return x1;
}
sys.db.Manager.prototype.__set = function(x,prop,key,v) {
	x[prop] = { value : v};
	if(v == null) x[key] = null; else x[key] = Reflect.field(v,this.table_keys[0]);
}
sys.db.Manager.prototype.makeCacheKey = function(x) {
	if(this.table_keys.length == 1) {
		var k = Reflect.field(x,this.table_keys[0]);
		if(k == null) throw "Missing key " + this.table_keys[0];
		return Std.string(k) + this.table_name;
	}
	var s = new StringBuf();
	var _g = 0, _g1 = this.table_keys;
	while(_g < _g1.length) {
		var k = _g1[_g];
		++_g;
		var v = Reflect.field(x,k);
		if(k == null) throw "Missing key " + k;
		s.b[s.b.length] = v == null?"null":v;
		s.b[s.b.length] = "#";
	}
	s.add(this.table_name);
	return s.b.join("");
}
sys.db.Manager.prototype.addToCache = function(x) {
	sys.db.Manager.object_cache.set(this.makeCacheKey(x),x);
}
sys.db.Manager.prototype.removeFromCache = function(x) {
	sys.db.Manager.object_cache.remove(this.makeCacheKey(x));
}
sys.db.Manager.prototype.getFromCacheKey = function(key) {
	return sys.db.Manager.object_cache.get(key);
}
sys.db.Manager.prototype.getFromCache = function(x,lock) {
	var c = sys.db.Manager.object_cache.get(this.makeCacheKey(x));
	if(c != null && lock && !c._lock) {
		var _g = 0, _g1 = Reflect.fields(c);
		while(_g < _g1.length) {
			var f = _g1[_g];
			++_g;
			Reflect.deleteField(c,f);
		}
		var _g = 0, _g1 = Reflect.fields(x);
		while(_g < _g1.length) {
			var f = _g1[_g];
			++_g;
			c[f] = Reflect.field(x,f);
		}
		c._lock = true;
		c["__cache__"] = x;
		this.make(c);
	}
	return c;
}
sys.db.Manager.prototype.__class__ = sys.db.Manager;
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
sys.db.SpodType = { __ename__ : ["sys","db","SpodType"], __constructs__ : ["DId","DInt","DUId","DUInt","DBigId","DBigInt","DSingle","DFloat","DBool","DString","DDate","DDateTime","DTimeStamp","DTinyText","DSmallText","DText","DSmallBinary","DLongBinary","DBinary","DBytes","DEncoded","DSerialized","DNekoSerialized","DFlags","DTinyInt","DInterval","DNull"] }
sys.db.SpodType.DId = ["DId",0];
sys.db.SpodType.DId.toString = $estr;
sys.db.SpodType.DId.__enum__ = sys.db.SpodType;
sys.db.SpodType.DInt = ["DInt",1];
sys.db.SpodType.DInt.toString = $estr;
sys.db.SpodType.DInt.__enum__ = sys.db.SpodType;
sys.db.SpodType.DUId = ["DUId",2];
sys.db.SpodType.DUId.toString = $estr;
sys.db.SpodType.DUId.__enum__ = sys.db.SpodType;
sys.db.SpodType.DUInt = ["DUInt",3];
sys.db.SpodType.DUInt.toString = $estr;
sys.db.SpodType.DUInt.__enum__ = sys.db.SpodType;
sys.db.SpodType.DBigId = ["DBigId",4];
sys.db.SpodType.DBigId.toString = $estr;
sys.db.SpodType.DBigId.__enum__ = sys.db.SpodType;
sys.db.SpodType.DBigInt = ["DBigInt",5];
sys.db.SpodType.DBigInt.toString = $estr;
sys.db.SpodType.DBigInt.__enum__ = sys.db.SpodType;
sys.db.SpodType.DSingle = ["DSingle",6];
sys.db.SpodType.DSingle.toString = $estr;
sys.db.SpodType.DSingle.__enum__ = sys.db.SpodType;
sys.db.SpodType.DFloat = ["DFloat",7];
sys.db.SpodType.DFloat.toString = $estr;
sys.db.SpodType.DFloat.__enum__ = sys.db.SpodType;
sys.db.SpodType.DBool = ["DBool",8];
sys.db.SpodType.DBool.toString = $estr;
sys.db.SpodType.DBool.__enum__ = sys.db.SpodType;
sys.db.SpodType.DString = function(n) { var $x = ["DString",9,n]; $x.__enum__ = sys.db.SpodType; $x.toString = $estr; return $x; }
sys.db.SpodType.DDate = ["DDate",10];
sys.db.SpodType.DDate.toString = $estr;
sys.db.SpodType.DDate.__enum__ = sys.db.SpodType;
sys.db.SpodType.DDateTime = ["DDateTime",11];
sys.db.SpodType.DDateTime.toString = $estr;
sys.db.SpodType.DDateTime.__enum__ = sys.db.SpodType;
sys.db.SpodType.DTimeStamp = ["DTimeStamp",12];
sys.db.SpodType.DTimeStamp.toString = $estr;
sys.db.SpodType.DTimeStamp.__enum__ = sys.db.SpodType;
sys.db.SpodType.DTinyText = ["DTinyText",13];
sys.db.SpodType.DTinyText.toString = $estr;
sys.db.SpodType.DTinyText.__enum__ = sys.db.SpodType;
sys.db.SpodType.DSmallText = ["DSmallText",14];
sys.db.SpodType.DSmallText.toString = $estr;
sys.db.SpodType.DSmallText.__enum__ = sys.db.SpodType;
sys.db.SpodType.DText = ["DText",15];
sys.db.SpodType.DText.toString = $estr;
sys.db.SpodType.DText.__enum__ = sys.db.SpodType;
sys.db.SpodType.DSmallBinary = ["DSmallBinary",16];
sys.db.SpodType.DSmallBinary.toString = $estr;
sys.db.SpodType.DSmallBinary.__enum__ = sys.db.SpodType;
sys.db.SpodType.DLongBinary = ["DLongBinary",17];
sys.db.SpodType.DLongBinary.toString = $estr;
sys.db.SpodType.DLongBinary.__enum__ = sys.db.SpodType;
sys.db.SpodType.DBinary = ["DBinary",18];
sys.db.SpodType.DBinary.toString = $estr;
sys.db.SpodType.DBinary.__enum__ = sys.db.SpodType;
sys.db.SpodType.DBytes = function(n) { var $x = ["DBytes",19,n]; $x.__enum__ = sys.db.SpodType; $x.toString = $estr; return $x; }
sys.db.SpodType.DEncoded = ["DEncoded",20];
sys.db.SpodType.DEncoded.toString = $estr;
sys.db.SpodType.DEncoded.__enum__ = sys.db.SpodType;
sys.db.SpodType.DSerialized = ["DSerialized",21];
sys.db.SpodType.DSerialized.toString = $estr;
sys.db.SpodType.DSerialized.__enum__ = sys.db.SpodType;
sys.db.SpodType.DNekoSerialized = ["DNekoSerialized",22];
sys.db.SpodType.DNekoSerialized.toString = $estr;
sys.db.SpodType.DNekoSerialized.__enum__ = sys.db.SpodType;
sys.db.SpodType.DFlags = function(flags) { var $x = ["DFlags",23,flags]; $x.__enum__ = sys.db.SpodType; $x.toString = $estr; return $x; }
sys.db.SpodType.DTinyInt = ["DTinyInt",24];
sys.db.SpodType.DTinyInt.toString = $estr;
sys.db.SpodType.DTinyInt.__enum__ = sys.db.SpodType;
sys.db.SpodType.DInterval = ["DInterval",25];
sys.db.SpodType.DInterval.toString = $estr;
sys.db.SpodType.DInterval.__enum__ = sys.db.SpodType;
sys.db.SpodType.DNull = ["DNull",26];
sys.db.SpodType.DNull.toString = $estr;
sys.db.SpodType.DNull.__enum__ = sys.db.SpodType;
demo.MySampleModel = function(p) {
	if( p === $_ ) return;
	sys.db.Object.call(this);
}
demo.MySampleModel.__name__ = ["demo","MySampleModel"];
demo.MySampleModel.__super__ = sys.db.Object;
for(var k in sys.db.Object.prototype ) demo.MySampleModel.prototype[k] = sys.db.Object.prototype[k];
demo.MySampleModel.prototype.id = null;
demo.MySampleModel.prototype.name = null;
demo.MySampleModel.prototype.email = null;
demo.MySampleModel.prototype.birthday = null;
demo.MySampleModel.prototype.__class__ = demo.MySampleModel;
if(!haxe.io) haxe.io = {}
haxe.io.Bytes = function(length,b) {
	if( length === $_ ) return;
	this.length = length;
	this.b = b;
}
haxe.io.Bytes.__name__ = ["haxe","io","Bytes"];
haxe.io.Bytes.alloc = function(length) {
	var a = new Array();
	var _g = 0;
	while(_g < length) {
		var i = _g++;
		a.push(0);
	}
	return new haxe.io.Bytes(length,a);
}
haxe.io.Bytes.ofString = function(s) {
	var a = new Array();
	var _g1 = 0, _g = s.length;
	while(_g1 < _g) {
		var i = _g1++;
		var c = s.cca(i);
		if(c <= 127) a.push(c); else if(c <= 2047) {
			a.push(192 | c >> 6);
			a.push(128 | c & 63);
		} else if(c <= 65535) {
			a.push(224 | c >> 12);
			a.push(128 | c >> 6 & 63);
			a.push(128 | c & 63);
		} else {
			a.push(240 | c >> 18);
			a.push(128 | c >> 12 & 63);
			a.push(128 | c >> 6 & 63);
			a.push(128 | c & 63);
		}
	}
	return new haxe.io.Bytes(a.length,a);
}
haxe.io.Bytes.ofData = function(b) {
	return new haxe.io.Bytes(b.length,b);
}
haxe.io.Bytes.prototype.length = null;
haxe.io.Bytes.prototype.b = null;
haxe.io.Bytes.prototype.get = function(pos) {
	return this.b[pos];
}
haxe.io.Bytes.prototype.set = function(pos,v) {
	this.b[pos] = v & 255;
}
haxe.io.Bytes.prototype.blit = function(pos,src,srcpos,len) {
	if(pos < 0 || srcpos < 0 || len < 0 || pos + len > this.length || srcpos + len > src.length) throw haxe.io.Error.OutsideBounds;
	var b1 = this.b;
	var b2 = src.b;
	if(b1 == b2 && pos > srcpos) {
		var i = len;
		while(i > 0) {
			i--;
			b1[i + pos] = b2[i + srcpos];
		}
		return;
	}
	var _g = 0;
	while(_g < len) {
		var i = _g++;
		b1[i + pos] = b2[i + srcpos];
	}
}
haxe.io.Bytes.prototype.sub = function(pos,len) {
	if(pos < 0 || len < 0 || pos + len > this.length) throw haxe.io.Error.OutsideBounds;
	return new haxe.io.Bytes(len,this.b.slice(pos,pos + len));
}
haxe.io.Bytes.prototype.compare = function(other) {
	var b1 = this.b;
	var b2 = other.b;
	var len = this.length < other.length?this.length:other.length;
	var _g = 0;
	while(_g < len) {
		var i = _g++;
		if(b1[i] != b2[i]) return b1[i] - b2[i];
	}
	return this.length - other.length;
}
haxe.io.Bytes.prototype.readString = function(pos,len) {
	if(pos < 0 || len < 0 || pos + len > this.length) throw haxe.io.Error.OutsideBounds;
	var s = "";
	var b = this.b;
	var fcc = String.fromCharCode;
	var i = pos;
	var max = pos + len;
	while(i < max) {
		var c = b[i++];
		if(c < 128) {
			if(c == 0) break;
			s += fcc(c);
		} else if(c < 224) s += fcc((c & 63) << 6 | b[i++] & 127); else if(c < 240) {
			var c2 = b[i++];
			s += fcc((c & 31) << 12 | (c2 & 127) << 6 | b[i++] & 127);
		} else {
			var c2 = b[i++];
			var c3 = b[i++];
			s += fcc((c & 15) << 18 | (c2 & 127) << 12 | c3 << 6 & 127 | b[i++] & 127);
		}
	}
	return s;
}
haxe.io.Bytes.prototype.toString = function() {
	return this.readString(0,this.length);
}
haxe.io.Bytes.prototype.toHex = function() {
	var s = new StringBuf();
	var chars = [];
	var str = "0123456789abcdef";
	var _g1 = 0, _g = str.length;
	while(_g1 < _g) {
		var i = _g1++;
		chars.push(str.charCodeAt(i));
	}
	var _g1 = 0, _g = this.length;
	while(_g1 < _g) {
		var i = _g1++;
		var c = this.b[i];
		s.b[s.b.length] = String.fromCharCode(chars[c >> 4]);
		s.b[s.b.length] = String.fromCharCode(chars[c & 15]);
	}
	return s.b.join("");
}
haxe.io.Bytes.prototype.getData = function() {
	return this.b;
}
haxe.io.Bytes.prototype.__class__ = haxe.io.Bytes;
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
sys.db.Connection = function() { }
sys.db.Connection.__name__ = ["sys","db","Connection"];
sys.db.Connection.prototype.request = null;
sys.db.Connection.prototype.close = null;
sys.db.Connection.prototype.escape = null;
sys.db.Connection.prototype.quote = null;
sys.db.Connection.prototype.addValue = null;
sys.db.Connection.prototype.lastInsertId = null;
sys.db.Connection.prototype.dbName = null;
sys.db.Connection.prototype.startTransaction = null;
sys.db.Connection.prototype.commit = null;
sys.db.Connection.prototype.rollback = null;
sys.db.Connection.prototype.__class__ = sys.db.Connection;
haxe.io.Error = { __ename__ : ["haxe","io","Error"], __constructs__ : ["Blocked","Overflow","OutsideBounds","Custom"] }
haxe.io.Error.Blocked = ["Blocked",0];
haxe.io.Error.Blocked.toString = $estr;
haxe.io.Error.Blocked.__enum__ = haxe.io.Error;
haxe.io.Error.Overflow = ["Overflow",1];
haxe.io.Error.Overflow.toString = $estr;
haxe.io.Error.Overflow.__enum__ = haxe.io.Error;
haxe.io.Error.OutsideBounds = ["OutsideBounds",2];
haxe.io.Error.OutsideBounds.toString = $estr;
haxe.io.Error.OutsideBounds.__enum__ = haxe.io.Error;
haxe.io.Error.Custom = function(e) { var $x = ["Custom",3,e]; $x.__enum__ = haxe.io.Error; $x.toString = $estr; return $x; }
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
Type.allEnums = function(e) {
	var all = [];
	var cst = e.__constructs__;
	var _g = 0;
	while(_g < cst.length) {
		var c = cst[_g];
		++_g;
		var v = Reflect.field(e,c);
		if(!Reflect.isFunction(v)) all.push(v);
	}
	return all;
}
Type.prototype.__class__ = Type;
haxe.Unserializer = function(buf) {
	if( buf === $_ ) return;
	this.buf = buf;
	this.length = buf.length;
	this.pos = 0;
	this.scache = new Array();
	this.cache = new Array();
	var r = haxe.Unserializer.DEFAULT_RESOLVER;
	if(r == null) {
		r = Type;
		haxe.Unserializer.DEFAULT_RESOLVER = r;
	}
	this.setResolver(r);
}
haxe.Unserializer.__name__ = ["haxe","Unserializer"];
haxe.Unserializer.initCodes = function() {
	var codes = new Array();
	var _g1 = 0, _g = haxe.Unserializer.BASE64.length;
	while(_g1 < _g) {
		var i = _g1++;
		codes[haxe.Unserializer.BASE64.cca(i)] = i;
	}
	return codes;
}
haxe.Unserializer.run = function(v) {
	return new haxe.Unserializer(v).unserialize();
}
haxe.Unserializer.prototype.buf = null;
haxe.Unserializer.prototype.pos = null;
haxe.Unserializer.prototype.length = null;
haxe.Unserializer.prototype.cache = null;
haxe.Unserializer.prototype.scache = null;
haxe.Unserializer.prototype.resolver = null;
haxe.Unserializer.prototype.setResolver = function(r) {
	if(r == null) this.resolver = { resolveClass : function(_) {
		return null;
	}, resolveEnum : function(_) {
		return null;
	}}; else this.resolver = r;
}
haxe.Unserializer.prototype.getResolver = function() {
	return this.resolver;
}
haxe.Unserializer.prototype.get = function(p) {
	return this.buf.cca(p);
}
haxe.Unserializer.prototype.readDigits = function() {
	var k = 0;
	var s = false;
	var fpos = this.pos;
	while(true) {
		var c = this.buf.cca(this.pos);
		if(c != c) break;
		if(c == 45) {
			if(this.pos != fpos) break;
			s = true;
			this.pos++;
			continue;
		}
		if(c < 48 || c > 57) break;
		k = k * 10 + (c - 48);
		this.pos++;
	}
	if(s) k *= -1;
	return k;
}
haxe.Unserializer.prototype.unserializeObject = function(o) {
	while(true) {
		if(this.pos >= this.length) throw "Invalid object";
		if(this.buf.cca(this.pos) == 103) break;
		var k = this.unserialize();
		if(!Std["is"](k,String)) throw "Invalid object key";
		var v = this.unserialize();
		o[k] = v;
	}
	this.pos++;
}
haxe.Unserializer.prototype.unserializeEnum = function(edecl,tag) {
	var constr = Reflect.field(edecl,tag);
	if(constr == null) throw "Unknown enum tag " + Type.getEnumName(edecl) + "." + tag;
	if(this.buf.cca(this.pos++) != 58) throw "Invalid enum format";
	var nargs = this.readDigits();
	if(nargs == 0) {
		this.cache.push(constr);
		return constr;
	}
	var args = new Array();
	while(nargs > 0) {
		args.push(this.unserialize());
		nargs -= 1;
	}
	var e = constr.apply(edecl,args);
	this.cache.push(e);
	return e;
}
haxe.Unserializer.prototype.unserialize = function() {
	switch(this.buf.cca(this.pos++)) {
	case 110:
		return null;
	case 116:
		return true;
	case 102:
		return false;
	case 122:
		return 0;
	case 105:
		return this.readDigits();
	case 100:
		var p1 = this.pos;
		while(true) {
			var c = this.buf.cca(this.pos);
			if(c >= 43 && c < 58 || c == 101 || c == 69) this.pos++; else break;
		}
		return Std.parseFloat(this.buf.substr(p1,this.pos - p1));
	case 121:
		var len = this.readDigits();
		if(this.buf.cca(this.pos++) != 58 || this.length - this.pos < len) throw "Invalid string length";
		var s = this.buf.substr(this.pos,len);
		this.pos += len;
		s = StringTools.urlDecode(s);
		this.scache.push(s);
		return s;
	case 107:
		return Math.NaN;
	case 109:
		return Math.NEGATIVE_INFINITY;
	case 112:
		return Math.POSITIVE_INFINITY;
	case 97:
		var buf = this.buf;
		var a = new Array();
		this.cache.push(a);
		while(true) {
			var c = this.buf.cca(this.pos);
			if(c == 104) {
				this.pos++;
				break;
			}
			if(c == 117) {
				this.pos++;
				var n = this.readDigits();
				a[a.length + n - 1] = null;
			} else a.push(this.unserialize());
		}
		return a;
	case 111:
		var o = { };
		this.cache.push(o);
		this.unserializeObject(o);
		return o;
	case 114:
		var n = this.readDigits();
		if(n < 0 || n >= this.cache.length) throw "Invalid reference";
		return this.cache[n];
	case 82:
		var n = this.readDigits();
		if(n < 0 || n >= this.scache.length) throw "Invalid string reference";
		return this.scache[n];
	case 120:
		throw this.unserialize();
		break;
	case 99:
		var name = this.unserialize();
		var cl = this.resolver.resolveClass(name);
		if(cl == null) throw "Class not found " + name;
		var o = Type.createEmptyInstance(cl);
		this.cache.push(o);
		this.unserializeObject(o);
		return o;
	case 119:
		var name = this.unserialize();
		var edecl = this.resolver.resolveEnum(name);
		if(edecl == null) throw "Enum not found " + name;
		return this.unserializeEnum(edecl,this.unserialize());
	case 106:
		var name = this.unserialize();
		var edecl = this.resolver.resolveEnum(name);
		if(edecl == null) throw "Enum not found " + name;
		this.pos++;
		var index = this.readDigits();
		var tag = Type.getEnumConstructs(edecl)[index];
		if(tag == null) throw "Unknown enum index " + name + "@" + index;
		return this.unserializeEnum(edecl,tag);
	case 108:
		var l = new List();
		this.cache.push(l);
		var buf = this.buf;
		while(this.buf.cca(this.pos) != 104) l.add(this.unserialize());
		this.pos++;
		return l;
	case 98:
		var h = new Hash();
		this.cache.push(h);
		var buf = this.buf;
		while(this.buf.cca(this.pos) != 104) {
			var s = this.unserialize();
			h.set(s,this.unserialize());
		}
		this.pos++;
		return h;
	case 113:
		var h = new IntHash();
		this.cache.push(h);
		var buf = this.buf;
		var c = this.buf.cca(this.pos++);
		while(c == 58) {
			var i = this.readDigits();
			h.set(i,this.unserialize());
			c = this.buf.cca(this.pos++);
		}
		if(c != 104) throw "Invalid IntHash format";
		return h;
	case 118:
		var d = Date.fromString(this.buf.substr(this.pos,19));
		this.cache.push(d);
		this.pos += 19;
		return d;
	case 115:
		var len = this.readDigits();
		var buf = this.buf;
		if(this.buf.cca(this.pos++) != 58 || this.length - this.pos < len) throw "Invalid bytes length";
		var codes = haxe.Unserializer.CODES;
		if(codes == null) {
			codes = haxe.Unserializer.initCodes();
			haxe.Unserializer.CODES = codes;
		}
		var i = this.pos;
		var rest = len & 3;
		var size = (len >> 2) * 3 + (rest >= 2?rest - 1:0);
		var max = i + (len - rest);
		var bytes = haxe.io.Bytes.alloc(size);
		var bpos = 0;
		while(i < max) {
			var c1 = codes[buf.cca(i++)];
			var c2 = codes[buf.cca(i++)];
			bytes.b[bpos++] = (c1 << 2 | c2 >> 4) & 255;
			var c3 = codes[buf.cca(i++)];
			bytes.b[bpos++] = (c2 << 4 | c3 >> 2) & 255;
			var c4 = codes[buf.cca(i++)];
			bytes.b[bpos++] = (c3 << 6 | c4) & 255;
		}
		if(rest >= 2) {
			var c1 = codes[buf.cca(i++)];
			var c2 = codes[buf.cca(i++)];
			bytes.b[bpos++] = (c1 << 2 | c2 >> 4) & 255;
			if(rest == 3) {
				var c3 = codes[buf.cca(i++)];
				bytes.b[bpos++] = (c2 << 4 | c3 >> 2) & 255;
			}
		}
		this.pos += len;
		this.cache.push(bytes);
		return bytes;
	case 67:
		var name = this.unserialize();
		var cl = this.resolver.resolveClass(name);
		if(cl == null) throw "Class not found " + name;
		var o = Type.createEmptyInstance(cl);
		this.cache.push(o);
		o.hxUnserialize(this);
		if(this.buf.cca(this.pos++) != 103) throw "Invalid custom data";
		return o;
	default:
	}
	this.pos--;
	throw "Invalid char " + this.buf.charAt(this.pos) + " at position " + this.pos;
}
haxe.Unserializer.prototype.__class__ = haxe.Unserializer;
if(typeof js=='undefined') js = {}
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
IntHash = function(p) {
	if( p === $_ ) return;
	this.h = {}
	if(this.h.__proto__ != null) {
		this.h.__proto__ = null;
		delete(this.h.__proto__);
	}
}
IntHash.__name__ = ["IntHash"];
IntHash.prototype.h = null;
IntHash.prototype.set = function(key,value) {
	this.h[key] = value;
}
IntHash.prototype.get = function(key) {
	return this.h[key];
}
IntHash.prototype.exists = function(key) {
	return this.h[key] != null;
}
IntHash.prototype.remove = function(key) {
	if(this.h[key] == null) return false;
	delete(this.h[key]);
	return true;
}
IntHash.prototype.keys = function() {
	var a = new Array();
	for( x in this.h ) a.push(x);
	return a.iterator();
}
IntHash.prototype.iterator = function() {
	return { ref : this.h, it : this.keys(), hasNext : function() {
		return this.it.hasNext();
	}, next : function() {
		var i = this.it.next();
		return this.ref[i];
	}};
}
IntHash.prototype.toString = function() {
	var s = new StringBuf();
	s.b[s.b.length] = "{";
	var it = this.keys();
	while( it.hasNext() ) {
		var i = it.next();
		s.b[s.b.length] = i == null?"null":i;
		s.b[s.b.length] = " => ";
		s.add(Std.string(this.get(i)));
		if(it.hasNext()) s.b[s.b.length] = ", ";
	}
	s.b[s.b.length] = "}";
	return s.b.join("");
}
IntHash.prototype.__class__ = IntHash;
if(!haxe.rtti) haxe.rtti = {}
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
if(typeof autoform=='undefined') autoform = {}
autoform.AutoForm = function(c) {
	if( c === $_ ) return;
	this.classval = c;
	var m = haxe.rtti.Meta.getType(this.classval).rtti;
	if(m == null) throw "Missing @rtti for class " + Type.getClassName(this.classval);
	this.table_infos = haxe.Unserializer.run(m[0]);
	this.table_name = this.table_infos.name;
	this.table_keys = this.table_infos.key;
	this.table_fields = new List();
	var _g = 0, _g1 = this.table_infos.fields;
	while(_g < _g1.length) {
		var f = _g1[_g];
		++_g;
		this.table_fields.add(f.name);
		haxe.Log.trace(f,{ fileName : "AutoForm.hx", lineNumber : 25, className : "autoform.AutoForm", methodName : "new"});
	}
}
autoform.AutoForm.__name__ = ["autoform","AutoForm"];
autoform.AutoForm.prototype.classval = null;
autoform.AutoForm.prototype.table_infos = null;
autoform.AutoForm.prototype.table_name = null;
autoform.AutoForm.prototype.table_fields = null;
autoform.AutoForm.prototype.table_keys = null;
autoform.AutoForm.prototype.populateForm = function(object) {
}
autoform.AutoForm.prototype.readForm = function() {
	var object = Type.createEmptyInstance(this.classval);
	return object;
}
autoform.AutoForm.prototype.__class__ = autoform.AutoForm;
$_ = {}
js.Boot.__res = {}
js.Boot.__init();
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
	js.Lib.document = document;
	js.Lib.window = window;
	onerror = function(msg,url,line) {
		var f = js.Lib.onerror;
		if( f == null )
			return false;
		return f(msg,[url+":"+line]);
	}
}
sys.db.Manager.cache_field = "__cache__";
sys.db.Manager.object_cache = new Hash();
sys.db.Manager.init_list = new List();
sys.db.Manager.KEYWORDS = (function($this) {
	var $r;
	var h = new Hash();
	{
		var _g = 0, _g1 = "ADD|ALL|ALTER|ANALYZE|AND|AS|ASC|ASENSITIVE|BEFORE|BETWEEN|BIGINT|BINARY|BLOB|BOTH|BY|CALL|CASCADE|CASE|CHANGE|CHAR|CHARACTER|CHECK|COLLATE|COLUMN|CONDITION|CONSTRAINT|CONTINUE|CONVERT|CREATE|CROSS|CURRENT_DATE|CURRENT_TIME|CURRENT_TIMESTAMP|CURRENT_USER|CURSOR|DATABASE|DATABASES|DAY_HOUR|DAY_MICROSECOND|DAY_MINUTE|DAY_SECOND|DEC|DECIMAL|DECLARE|DEFAULT|DELAYED|DELETE|DESC|DESCRIBE|DETERMINISTIC|DISTINCT|DISTINCTROW|DIV|DOUBLE|DROP|DUAL|EACH|ELSE|ELSEIF|ENCLOSED|ESCAPED|EXISTS|EXIT|EXPLAIN|FALSE|FETCH|FLOAT|FLOAT4|FLOAT8|FOR|FORCE|FOREIGN|FROM|FULLTEXT|GRANT|GROUP|HAVING|HIGH_PRIORITY|HOUR_MICROSECOND|HOUR_MINUTE|HOUR_SECOND|IF|IGNORE|IN|INDEX|INFILE|INNER|INOUT|INSENSITIVE|INSERT|INT|INT1|INT2|INT3|INT4|INT8|INTEGER|INTERVAL|INTO|IS|ITERATE|JOIN|KEY|KEYS|KILL|LEADING|LEAVE|LEFT|LIKE|LIMIT|LINES|LOAD|LOCALTIME|LOCALTIMESTAMP|LOCK|LONG|LONGBLOB|LONGTEXT|LOOP|LOW_PRIORITY|MATCH|MEDIUMBLOB|MEDIUMINT|MEDIUMTEXT|MIDDLEINT|MINUTE_MICROSECOND|MINUTE_SECOND|MOD|MODIFIES|NATURAL|NOT|NO_WRITE_TO_BINLOG|NULL|NUMERIC|ON|OPTIMIZE|OPTION|OPTIONALLY|OR|ORDER|OUT|OUTER|OUTFILE|PRECISION|PRIMARY|PROCEDURE|PURGE|READ|READS|REAL|REFERENCES|REGEXP|RELEASE|RENAME|REPEAT|REPLACE|REQUIRE|RESTRICT|RETURN|REVOKE|RIGHT|RLIKE|SCHEMA|SCHEMAS|SECOND_MICROSECOND|SELECT|SENSITIVE|SEPARATOR|SET|SHOW|SMALLINT|SONAME|SPATIAL|SPECIFIC|SQL|SQLEXCEPTION|SQLSTATE|SQLWARNING|SQL_BIG_RESULT|SQL_CALC_FOUND_ROWS|SQL_SMALL_RESULT|SSL|STARTING|STRAIGHT_JOIN|TABLE|TERMINATED|THEN|TINYBLOB|TINYINT|TINYTEXT|TO|TRAILING|TRIGGER|TRUE|UNDO|UNION|UNIQUE|UNLOCK|UNSIGNED|UPDATE|USAGE|USE|USING|UTC_DATE|UTC_TIME|UTC_TIMESTAMP|VALUES|VARBINARY|VARCHAR|VARCHARACTER|VARYING|WHEN|WHERE|WHILE|WITH|WRITE|XOR|YEAR_MONTH|ZEROFILL|ASENSITIVE|CALL|CONDITION|CONNECTION|CONTINUE|CURSOR|DECLARE|DETERMINISTIC|EACH|ELSEIF|EXIT|FETCH|GOTO|INOUT|INSENSITIVE|ITERATE|LABEL|LEAVE|LOOP|MODIFIES|OUT|READS|RELEASE|REPEAT|RETURN|SCHEMA|SCHEMAS|SENSITIVE|SPECIFIC|SQL|SQLEXCEPTION|SQLSTATE|SQLWARNING|TRIGGER|UNDO|UPGRADE|WHILE".split("|");
		while(_g < _g1.length) {
			var k = _g1[_g];
			++_g;
			h.set(k.toLowerCase(),true);
		}
	}
	$r = h;
	return $r;
}(this));
demo.MySampleModel.__meta__ = { obj : { rtti : ["oy9:relationsahy3:keyay2:idhy4:namey13:MySampleModely6:fieldsaoy1:tjy15:sys.db.SpodType:1:0R3R2y6:isNullfgoR6jR7:15:0R3R3R8fgoR6r7R3y5:emailR8fgoR6jR7:11:0R3y8:birthdayR8fghy7:hfieldsbR10r9R2r4R9r8R3r6hy7:indexesahg"]}};
demo.MySampleModel.manager = new sys.db.Manager(demo.MySampleModel);
haxe.Unserializer.DEFAULT_RESOLVER = Type;
haxe.Unserializer.BASE64 = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789%:";
haxe.Unserializer.CODES = null;
js.Lib.onerror = null;
demo.Main.main()