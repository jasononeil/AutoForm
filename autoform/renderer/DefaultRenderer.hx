package autoform.renderer;
using domtools.Tools;
import autoform.ui.TextField;
import autoform.ui.HiddenField;
import autoform.ui.Button;
import autoform.AbstractField;

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
	override public function run(fieldsInfo:Array<FieldInfo>)
	{
		for (field in fieldsInfo)
		{
			var thisClass = String;
			var element:AbstractField<Dynamic>;
			var display = autoform.AbstractRenderer.guessDisplay(field);
			
			// If "display" is null it's because we specifically don't
			// want to display it, for example, if it is a function
			if (display != null)
			{
				var classOfFieldUI = displays.exists(display) ? displays.get(display) : displays.get("text");
				element = Type.createInstance(classOfFieldUI, [field]);

				element.appendTo(form);
				form.fields.set(field.id, element);
			}
		}

		// add buttons
		var buttonGroup = domtools.Query.create("div").addClass("form-actions");
		var submit = new Button("Save", true);
		var cancel = new Button("Cancel", ButtonType.Default);

		buttonGroup.append(submit).append(cancel);
		buttonGroup.appendTo(form);
	}


}