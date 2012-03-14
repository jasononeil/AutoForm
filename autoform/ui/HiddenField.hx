package autoform.ui;

import domtools.Query;
using domtools.Tools;

class HiddenField<T> extends autoform.AbstractField<T>
{
	public function new(field:FieldInfo)
	{
		// create a div
		super ("div");
		this.setInnerHTML("<input />").addClass(field.id);

		// set up the hidden field, with appropriate ID and class
		this.find("input").setAttr("type","hidden").setAttr("id",field.fullID);
		
	}
}