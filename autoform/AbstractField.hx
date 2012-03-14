package autoform;

/** For your UI classes, extend this AbstractField.  Keep the Type Parameter there, as autoform will use it.  

For example:
    var tf = new TextField<String>();
    tf.get(); // will be String
    tf.set("Jason"); // Will only accept a string

*/
class AbstractField<T> extends domtools.AbstractCustomElement
{
	public function new(name:String)
	{
		super(name);
	}

	public function get():T
	{
		// abstract method
		return null;
	}

	public function set(object:T)
	{
		// abstract method
	}
}