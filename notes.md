NOTES
=====

1) Validation information should be kept entirely in the model.
     - valid ranges
     - human descriptions of valid content
     - function to validate
   Then it can be processed on both server and client.

2) Models should have functions for "next()" when applicable.  Would make it easy for the form.

3) 


Future
------

* It would be good to have this have an abstraction layer to work with other libraries (eg Cocktail / Reception, Ext/Sencha)

Bindable Elements
-----------------

Here's a plan to do something like agility / backbone....
(one question: how would we deal with sub objects: child.parent.name child.class.teacher etc)

class HtmlBind<T:Model> extends AbstractCustomElement
{
	static var tpl = "<li data-bind-text='name'>...</li>"; // replaces text content with the model variable "name".
	static var tpl2 = "<li data-bind-attr-id='objectID'>Object</li>"; // replaces the attribute "id" with the model variable "objectID".
	static var tpl3 = "<ul>
		<li data-bind-text='name'></li> // bind text to name, age, gender
		<li data-bind-text='age'></li>
		<li data-bind-text='gender'></li>
		<li><a data-bind-attr-href='url(id)'>Open</a></li> // use url() function from this class?  I dunno...
	</ul>"

	var o:Object;

	/** Create a new DOM element that is bound to a model */
	public function new(object:T, template:String, eventsToReadOn:List<{selector,event}>)
	{
		super(template); //  this will require making this super "parse" xml markup.  Let the sub-classes define the static templates there...
		
		o = object;
		
		// render the initial object
		render();

		// trigger events to update the model
		for (trigger in eventsToReadOn)
		{
			// when the elements in the selector trigger the selected event, read...
			this.find(trigger.selector).add(trigger.event, this.read());
		}

		// is there a way to check if the model has been changed?
		onModelChange(render());
	}

	public function render()
	{
		for (elm in this.descendents())
		{
			for (att in this.attributes())
			{
				switch (att)
					case data-text
						replace text with value (use reflection)
					case data-attr-*
						replace attribute with value (use reflection)
			}
		}
	}

	public function read()
	{
		for (elm in this.descendents())
		{
			for (att in this.attributes())
			{
				switch (att)
					case data-text
						set value from text
					case data-attr-*
						set value from attribute
			}
		}
	}
}