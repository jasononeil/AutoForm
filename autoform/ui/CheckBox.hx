package autoform.ui;

import dtx.DOMCollection;
using Detox;

class CheckBox<T> extends autoform.AbstractField<T>
{
	public function new(field:FieldInfo)
	{
		// create a div
		super ("<div></div>");
		this.addClass("af-field-container").addClass(field.id);
		this.setInnerHTML("<div><input /><label></label></div>");

		// set up the label and field to be linked, appropriate id
		this.find("div").addClass("checkbox");
		this.find("input").setAttr("type","checkbox").setAttr("id",field.fullID);
		this.find("label").setText(field.title).setAttr("for",field.fullID);

		// If there is a description, add it
		trace (field.description);
		if (field.description != "")
		{
			this.prepend("p".create().setText(field.description));
		}
	}
}