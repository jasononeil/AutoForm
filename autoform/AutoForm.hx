package autoform;

import domtools.Query;
import js.w3c.level3.Core;
import autoform.renderer.DefaultRenderer;
using domtools.Tools;

class AutoForm<T> extends domtools.AbstractCustomElement
{
	static var formIDIncrement = 0;
	var classval : Class<T>;
	var rtti:Node;
	var meta:Dynamic;
	var fields:Array<FieldInfo>;
	
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

		this.fields = new Array();

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
        		fields.push(new FieldInfo(field, rtti, meta, formID));
        	}
        	
        }

        var renderer = new DefaultRenderer(this);
        renderer.run(fields);
	}

	/** Fills the form fields with values from an object of the correct type. */
	public function populateForm(object:T)
	{
		
	}

	/** Read the form and create an object of the right type that matches the form values. */
	public function readForm():T
	{
		var object = Type.createEmptyInstance(classval);
		return object;
	}

	///////////////////////////////////////////////
	// Functions that affect the form
	//  - set fieldsets
	//  - set order
	//  - 
	///////////////////////////////////////////////
	

}

