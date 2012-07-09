package autoform.ui;

import dtx.DOMCollection;
using Detox;

class Button extends dtx.Widget
{
	var type(default,setType):ButtonType;

	public function new(?text:String = "Button", ?isSubmit:Bool = false, ?type:ButtonType = null)
	{
		super("<button />");

		this.addClass("btn");
		this.setText(text);

		if (isSubmit)
		{
			this.setAttr("type", "submit");
			if (type == null) { type = ButtonType.Primary; }
		}

		if (type != null)
		{
			this.type = type;
		}
	}

	private function setType(t:ButtonType)
	{
		this.removeClass(getClassForType(type));
		this.addClass(getClassForType(t));
		return t;
	}

	private function getClassForType(inType:ButtonType)
	{
		var cls:String = "";
		//SWITCH seems the most sensible here, but it's generating
		//weird javascript that fails at runtime... not online at the
		//moment so can't check it out.
		// cls = switch (inType)
		// {
		// 	case Default: "";
		// 	case Primary: "btn-primary";
		// 	case Info: "btn-info";
		// 	case Success: "btn-success";
		// 	case Warning: "btn-warning";
		// 	case Danger: "btn-danger";
		// 	case Inverse: "btn-inverse";
		// }
		
		if (inType == ButtonType.Default) { cls = ""; }
		if (inType == ButtonType.Primary) { cls = "btn-primary"; }
		if (inType == ButtonType.Info) { cls = "btn-info"; }
		if (inType == ButtonType.Success) { cls = "btn-success"; }
		if (inType == ButtonType.Warning) { cls = "btn-warning"; }
		if (inType == ButtonType.Danger) { cls = "btn-danger"; }
		if (inType == ButtonType.Inverse) { cls = "btn-inverse"; }
		
		return cls;
	}


}

enum ButtonType
{
	Default;
	Primary;
	Info;
	Success;
	Warning;
	Danger;
	Inverse;
}