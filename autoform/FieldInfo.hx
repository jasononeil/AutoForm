package autoform;

import js.w3c.level3.Core;
import domtools.Query;
using domtools.Tools;
using Reflect;

class FieldInfo 
{
	/** The short name, alpha-numeric only */ public var id:String;
	/** The human readable name */ public var title:String;
	public var type:String;
	
	public var required:Bool;
	public var description:String;
	public var help:String;

	public var validDescription:String;
	public var validatorString:String;
	public var validator:Dynamic->Bool;

	public var display:String;
	public var displayOptions:Dynamic;

	public var formID:String;
	public var formPrefix:String;
	public var fullID:String;

	public function new(field:Xml, rtti:Xml, meta:Dynamic, formID_in:String)
	{
		// Safe defaults
		id = "";
		title = "";
		type = "null";
		required = false;
		description = "";
		help = "";
		validDescription = "";
		validatorString = "";
		validator = null;
		display = "";
		displayOptions = {};
		formID = formID_in;
		formPrefix = formID + "-";

		// Extract the name
		id = field.nodeName;
		// Use it as the default "title" (human readable name) - this will be used if no title is specified in metadata
		title = id;
		fullID = formID + "-" + id;

		// Extract the type data
		// 	<c> Class
		//  <t> Typedef
		//  <e> Enum
		//  <t path="Iterable"><c path="String"></c></t> = Iterable<String>
		if (field.firstChild() != null)
		{
			var firstChild = field;
			var pathsFound = 0;
			do {
				firstChild = firstChild.firstChild();
				var path = firstChild.get("path");
				type = (pathsFound == 0) ? path : type + "<" + path;
				pathsFound++;
			} while (firstChild.firstChild() != null);
			while (pathsFound > 1)
			{
				type = type + ">";
				pathsFound--;
			}

		}

		// Extract the metadata
		if (meta.hasField(id))
    	{
    		var fieldMeta = Reflect.field(meta,id);
    		if (Reflect.hasField(fieldMeta,"autoform"))
    		{
    			// Get the autoform object from meta
    			var autoform:Dynamic = cast fieldMeta.autoform[0];

    			// Extract the human readable name
    			if (Reflect.hasField(autoform,"title")) { title = autoform.field("title"); }

    			// Extract whether this is required
    			if (Reflect.hasField(autoform,"required")) { required = autoform.field("required"); }

    			// Extract the description
    			if (Reflect.hasField(autoform,"description")) { description = autoform.field("description"); }
    			
    			// Extract the help
    			if (Reflect.hasField(autoform,"help")) { help = autoform.field("help"); }
    			
    			// Extract the validatorString
    			if (Reflect.hasField(autoform,"validatorString")) { validatorString = autoform.field("validatorString"); }
    			
    			// Create the validator function
    			validator = createValidatorFunction(validatorString);

    			// Extract the display type
    			if (Reflect.hasField(autoform,"display")) { display = autoform.field("display"); }
    			
    			// Extract the display options
    			if (Reflect.hasField(autoform,"displayOptions")) { displayOptions = autoform.field("displayOptions"); }
    		}
    	}
	}

	private function createValidatorFunction(validatorString:String)
	{
		var fn:Dynamic->Bool = null;

		return fn;
	}
}
