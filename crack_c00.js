function(context, args){ //target=""
	var c = ["red","orange","yellow","lime","green","cyan","blue","purple"];
	var ret = "";
	
	for (var i=0; i<8; i++) {
		if (i<4) {
			ret = args.target.call({c001:c[i], color_digit:c[i].length, c002:c[i], c002_complement:c[i+4]})
		} else {
			ret = args.target.call({c001:c[i], color_digit:c[i].length, c002:c[i], c002_complement:c[i-4]})
		}
		
		if (ret.substr(0,13) === "LOCK_UNLOCKED") {
			break;
		}
	}
	
	return { ok:true, msg:ret };
}