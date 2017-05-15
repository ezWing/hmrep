function(context, args){ //target=""
	var c = ["red","orange","yellow","lime","green","cyan","blue","purple"];
	var res = "";
	var msgs =""
	for (var i=0; i<8; i++) {
		if (i<4) {
			res = args.target.call ({c002:c[i], c002_complement:c[i+4]})
			msgs= msgs + " ][ call for " + c[i] + " and " + c[i+4] + " give: " + res
		} else {
			res = args.target.call ({c002:c[i], c002_complement:c[i-4]})
			msgs= msgs + " ][ call for " + c[i] + " and " + c[i-4] + " give: " + res
		}
		
		if (res.substr(0, 13) === "LOCK_UNLOCKED") {
			break;
		}
	}
	
	return { ok:true, msg:msgs };
}