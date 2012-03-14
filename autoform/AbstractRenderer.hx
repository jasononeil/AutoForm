package autoform;

import autoform.FieldInfo;
import autoform.AutoForm;
import domtools.AbstractCustomElement;

class AbstractRenderer
{
	public var form:AutoForm<Dynamic>;
	public var displays:Hash<Class<AbstractCustomElement>>;

	public function new(form:AutoForm<Dynamic>)
	{
		displays = new Hash();
		this.form = form;
	}

	public function run(fields:Array<FieldInfo>)
	{
		
	}

	/** Given some field info, guess the display type and return that as a string */
	public static function guessDisplay(field:FieldInfo):String
	{
		var display:String;

		if (field.display != "")
		{
			// use the type set in metadata
			display = field.display;
		}
		else
		{
			// Guess by type
			display = switch (field.type)
			{
				case "String":
					// guess as text or textarea, or email / url
					"text";
				case "Int":
					"number/int";
				case "Float":
					"number/float";
				case "Date":
					"date";
				case "Bool":
					"checkbox";
				case "Array<Bool>":
					"checkbox";
				default:
					// sensible fallback / default
					trace ("Is this a function: " + field);
					"text";
				
			}
		}

		// return the value
		return display;
	}
}
