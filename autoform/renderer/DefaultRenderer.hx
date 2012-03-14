package autoform.renderer;
using domtools.Tools;
import autoform.ui.TextField;
import autoform.ui.HiddenField;

class DefaultRenderer extends autoform.AbstractRenderer
{
	// AutoForm creates a new Renderer, then calls "run()" on it
	public function new(form:autoform.AutoForm<Dynamic>)
	{
		super(form);

		// Set the displays for this renderer
		displays.set("text",autoform.ui.TextField);
		displays.set("textarea",autoform.ui.TextArea);
		displays.set("hidden",autoform.ui.HiddenField);
		displays.set("checkbox",autoform.ui.CheckBox);
	}

	// AutoForm calls this to render.  
	override public function run(fields:Array<FieldInfo>)
	{
		for (field in fields)
		{
			var thisClass = String;
			var element:domtools.AbstractCustomElement;
			var display = autoform.AbstractRenderer.guessDisplay(field);
			
			// If "display" is null it's because we specifically don't
			// want to display it, for example, if it is a function
			if (display != null)
			{
				var classOfFieldUI = displays.exists(display) ? displays.get(display) : displays.get("text");
				element = Type.createInstance(classOfFieldUI, [field]);

				element.appendTo(form);
			}
			
		}
	}


}