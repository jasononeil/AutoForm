package autoform;

import autoform.FieldInfo;
import autoform.AutoForm;
import autoform.AbstractField;

class AbstractRenderer
{
	public var form:AutoForm<Dynamic>;
	public var displays:Hash<Class<AbstractField<Dynamic>>>;

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
				case "function":
				// do nothing
					null;
				default:
					// sensible fallback / default
					trace ("Is this a function: " + field.type);
					"text";
				
			}
		}

		// return the value
		return display;
	}
}
