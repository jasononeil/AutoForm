package autoform;

/** For your UI classes, extend this AbstractField.  Keep the Type Parameter there, as autoform will use it.  

For example:
    var tf = new TextField<String>();
    tf.get(); // will be String
    tf.set("Jason"); // Will only accept a string

*/
class AbstractField<T> extends dtx.Widget
{
	public function new(html:String)
	{
		super(html);
	}

	public function get():T
	{
		throw "Abstract Method";
		return null;
	}

	public function set(object:T)
	{
		throw "Abstract Method";
	}
}