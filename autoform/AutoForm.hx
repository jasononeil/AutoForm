package autoform;
import sys.db.SpodInfos;

class AutoForm<T>
{
	var classval : Class<T>;
	var table_infos : SpodInfos;
	var table_name : String;
	var table_fields : List<String>;
	var table_keys : Array<String>;
	
	/** Generates an empty form to match the Class <T>.  You must pass the type as the constructor, similar to SPOD managers. */
	public function new( c : Class<T> ) 
	{
		classval = c;
		var m : Array<Dynamic> = haxe.rtti.Meta.getType(classval).rtti;
		if( m == null ) throw "Missing @rtti for class " + Type.getClassName(classval);
		table_infos = haxe.Unserializer.run(m[0]);
		table_name = table_infos.name;
		table_keys = table_infos.key;
		table_fields = new List();
		for( f in table_infos.fields )
		{
			table_fields.add(f.name);
			trace (f);
		}
		
	}

	/** Fills the form fields with values from an object of the correct type. */
	public function populateForm(object:T)
	{
		
	}

	/** Read the form and create an object of the right type that matches the form values. */
	public function readForm():T
	{
		var object = Type.createEmptyInstance(classval);
		return object;
	}

	///////////////////////////////////////////////
	// Functions that affect the form
	//  - set fieldsets
	//  - set order
	//  - 
	///////////////////////////////////////////////
	

}