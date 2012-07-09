package autoform;

import js.w3c.level3.Core;
import dtx.DOMCollection;
using Detox;
using Reflect;

class FieldInfo 
{
	/** The short name, alpha-numeric only */ public var id:String;
	/** The human readable name */ public var title:String;
	public var type:String;
	
	public var required:Bool;
	public var description:String;
	public var help:String;
	public var placeholder:String;

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
		placeholder = "";
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
		//  <f a="param1:param2">[<c> or <e> or <t>] for params</f>
		//  <t path="Iterable"><c path="String"></c></t> = Iterable<String>
		if (field.firstChild() != null)
		{
			var firstChild = field;
			var isMethod = firstChild.exists("set") && firstChild.get("set") == "method";
			if (isMethod)
			{
				// for now just detect this as method.
				// later we could possibly steal the types...
				// or even check if this is a validator
				type = "function";
			}
			else
			{
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
				

		}

		// Extract the metadata
    	var fieldMeta = Reflect.field(meta,id);
		if (fieldMeta != null)
    	{
    		if (Reflect.field(fieldMeta,"autoform") != null)
    		{
    			// Get the autoform object from meta
    			var autoform:Dynamic = cast fieldMeta.autoform[0];

    			// Extract the human readable name
    			title = autoform.field("title");
    			if (title == null) title = "";

    			// Extract whether this is required
    			required = autoform.field("required");
    			if (required == null) required = false;

    			// Extract the description
    			description = autoform.field("description");
    			if (description == null) description = "";
    			
    			// Extract the help
    			help = autoform.field("help");
    			if (help == null) help = "";
    			
    			// Extract the placeholder
    			placeholder = autoform.field("placeholder");
    			if (placeholder == null) placeholder = "";
    			
    			// Extract the validatorString
    			validatorString = autoform.field("validatorString");
    			if (validatorString == null) validatorString = "";
    			
    			// Create the validator function
    			validator = createValidatorFunction(validatorString);

    			// Extract the display type
    			display = autoform.field("display");
    			if (display == null) display = "";
    			
    			// Extract the display options
    			displayOptions = autoform.field("displayOptions");
    			if (displayOptions == null) displayOptions = "";
    		}
    	}
	}

	private function createValidatorFunction(validatorString:String)
	{
		var fn:Dynamic->Bool = null;

		return fn;
	}
}
