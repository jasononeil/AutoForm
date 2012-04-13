package autoform.ui;

import domtools.Query;
using DOMTools;

class HiddenField<T> extends autoform.AbstractField<T>
{
	public function new(field:FieldInfo)
	{
		// create a div
		super ("<div></div>");
		this.setInnerHTML("<input />").addClass(field.id);

		// set up the hidden field, with appropriate ID and class
		this.find("input").setAttr("type","hidden").setAttr("id",field.fullID);
		
	}

	override public function get():T
	{
		//TODO: this is always returning a string, not T...
		// have different classes for different types?
		// override just these two methods?
		return untyped this.find("input").val();
	}

	override public function set(o:T)
	{
		this.find("input").setVal(o);
	}
}