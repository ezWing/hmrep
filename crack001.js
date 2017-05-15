function(context, args){ //target=""
	var caller = context.caller;
	var lib = #s.scripts.lib();
	
	var c = ["red","orange","yellow","lime","green","cyan","blue","purple"];
	var ret = "";
	var success = false;
	
	for (var i=0; i<8; i++) {
		ret = args.target.call({c001:c[i], color_digit:c[i].length})
		
		if (ret.substr(0,13) === "LOCK_UNLOCKED") {
			success = true;
			break;
		}
	}
	
	return { ok:true, msg:ret };
}
