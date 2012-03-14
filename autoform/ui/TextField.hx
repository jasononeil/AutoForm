package autoform.ui;

import domtools.Query;
using domtools.Tools;

class TextField<T> extends autoform.AbstractField<T>
{
	public function new(field:FieldInfo)
	{
		// create a div
		super ("div");
		this.addClass("af-field-container").addClass(field.id);
		this.setInnerHTML("<label></label><input />");

		// set up the label and field to be linked, appropriate id
		this.find("input").setAttr("type","text").setAttr("id",field.fullID).setAttr("placeholder",field.placeholder);
		this.find("label").setText(field.title).setAttr("for",field.fullID);

		// If there is a description, add it
		if (field.description != "")
		{
			this.find("label").append(Query.create("p").setText(field.description));
		}
	}
}