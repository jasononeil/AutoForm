package demo;

import autoform.AutoForm;
import demo.MySampleModel;

class Main
{
	public static function main()
	{
		haxe.Log.trace = haxe.Firebug.trace;
		js.Lib.window.onload = run;
	}

	public static function run(e:Dynamic)
	{
		var form:AutoForm<MySampleModel> = new AutoForm(MySampleModel);

		CommonJS.getHtmlDocument().body.appendChild(form.getNode());
	}
}