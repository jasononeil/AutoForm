package autoform;

import domtools.Query;
import js.w3c.level3.Core;
import autoform.renderer.DefaultRenderer;
import autoform.AbstractField;
using domtools.Tools;

class AutoForm<T> extends domtools.AbstractCustomElement
{
	static var formIDIncrement = 0;
	public var formID:String;
	public var classval(default,null) : Class<T>;
	var rtti:Node;
	var meta:Dynamic;
	var fieldsInfo:Array<FieldInfo>;
	public var fields:Hash<AbstractField<Dynamic>>;
	
	/** Generates an empty form to match the Class <T>.  You must pass the type as the constructor, similar to SPOD managers. */
	public function new( c : Class<T>, ?formID:String = null )
	{
		super ("form");

		// If formID isn't set, set one by using auto-increment "af-{int}"
		if (formID == null)
		{
			formIDIncrement = formIDIncrement + 1;
			formID = "af-" + formIDIncrement;
		}
		this.formID = formID;

		this.fieldsInfo = new Array();
		this.fields = new Hash();

		classval = c;
		var rttiString : String = untyped c.__rtti;
        var rtti = Xml.parse(rttiString).firstElement();
		meta = haxe.rtti.Meta.getFields(c);

        // trace (rtti.toString());

        var fieldsXml = rtti.elements();

        for (field in fieldsXml)
        {
        	if (field.nodeName != "implements")
        	{
        		// trace (field);
        		fieldsInfo.push(new FieldInfo(field, rtti, meta, formID));
        	}
        	
        }

        var renderer = new DefaultRenderer(this);
        renderer.run(fieldsInfo);
	}

	/** Fills the form fields with values from an object of the correct type. */
	public function populateForm(object:T)
	{
		for (fieldName in fields.keys())
		{

			var field = this.fields.get(fieldName);
			var value = Reflect.field(object, fieldName);
			field.set(value);
		}
	}

	/** Read the form and create an object of the right type that matches the form values. */
	public function readForm(?originalObject:T = null):T
	{
		var object:T;

		// are we creating a new object or updating an existing?
		//TODO: make this check somehow... If 'id' field exists?
		var isNewObject:Bool = true;

		if (originalObject == null)
			object = Type.createInstance(classval, []);
			//object = Type.createEmptyInstance(classval);
		else
			object = originalObject;
		
		// Go through each field in the form
		for (fieldName in this.fields.keys())
		{
			var field = this.fields.get(fieldName);
			var value = field.get();
			Reflect.setField(object, fieldName, value);
		}

		return object;
	}

	///////////////////////////////////////////////
	// Functions that affect the form
	//  - set fieldsets
	//  - set order
	//  - 
	///////////////////////////////////////////////
	

}

