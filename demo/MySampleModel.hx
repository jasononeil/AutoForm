package demo;

class MySampleModel implements haxe.rtti.Infos
{
	@autoform({
		required: true,
		title: "Database ID",
		display: "hidden"
	}) public var id:Int;

	@autoform({
		title: "Your name"
	}) public var name:String;

	@autoform({
		title: "Your email address",
		description: "We promise not to send you spam!  We use your email only to help you restore your password."
	}) public var email:Null<String>;

	@autoform({
		display: "textarea",
		description: "This will not affect your application, it is merely for statistical purposes."
	}) public var description:String;
	
	public var nicknames:Array<String>;
	
	public var state:State;

	@autoform({
		title: "Are you pretty cool?"
	}) public var isCool:Bool;
	
	public var birthday:Date;
}

enum State {
	wa;
	sa;
	nt;
	qld;
	nsw;
	act;
	vic;
	tas;
}
