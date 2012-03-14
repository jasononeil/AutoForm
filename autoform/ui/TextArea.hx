package autoform.ui;

import domtools.Query;
using domtools.Tools;

class TextArea<T> extends autoform.AbstractField<T>
{
	public function new(field:FieldInfo)
	{
		// create a div
		super ("div");
		this.addClass("af-field-container").addClass(field.id);
		this.setInnerHTML("<label></label><textarea></textarea><span />");

		// set up the label and field to be linked, appropriate id
		this.find("textarea").setAttr("id",field.fullID).addClass(".input").setAttr("placeholder",field.placeholder);
		this.find("label").setText(field.title).setAttr("for",field.fullID);

		// If there is a description, add it
		if (field.description != "")
		{
			this.find("span").setText(field.description).addClass("help-inline");
		}
	}
}