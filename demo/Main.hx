package demo;

import autoform.AutoForm;
import demo.MySampleModel;

class Main
{
	public static function main()
	{
		var form:AutoForm<MySampleModel> = new AutoForm(MySampleModel);
	}
}