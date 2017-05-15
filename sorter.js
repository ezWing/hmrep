function(context, args){
	
	function Typ(A){
		var r = []
		var c = {bb:0,sc:0,sp:0,tl:0}
		for (let i in A){
			switch(A[i].type){
			case "bot_brain"	: c.bb++; break;
			case "script_space" : c.sp++; break;
			case "script"		: c.sc++; break;
			case "tool"			: c.tl++}
		}
		A.sort( function(a,b) {if(a.type<b.type){return 1} if(a.type>b.type){return -1} return 0} )
		r[0] = A.splice(0, c.tl)
		r[1] = A.splice(0, c.sp)
		r[2] = A.splice(0, c.sc)
		r[3] = A.splice(0, c.bb)
		r[4] = A
		for (let i in r){r[i].sort( function(a,b) {if(a.name>b.name){return 1} if(a.name<b.name){return -1} return 0})}
		r = r[0].concat(r[1].concat(r[2].concat(r[3].concat(r[4]) ) ) )
		return r
	}
	function Ti(A){
		var j = 0
		var r = []
		var c = {t3:0,t2:0}
		for (let i in A){
			c["t"+String(A[i].tier)]++
		}
		A.sort( function(a,b) {return b.tier-a.tier})
		r[0] = A.splice(0, c.t3)
		r[1] = A.splice(0, c.t2)
		r[2] = A
		for (let i in r){r[i] = Typ(r[i])}
		r = r[0].concat(r[1].concat(r[2]))
		return r
	}
	//1
	function Rare(A){
		var r = []
		var c = {r1:0, r2:0, r3:0, r4:0}
		for (let i in A){
			c["r"+A[i].rarity]++
		}
		A.sort(function(a,b){return b.rarity - a.rarity})
		r[0] = A.splice(0, c.r2);
		r[1] = A.splice(0, c.r1);
		r[2] = A;
		for (let i in r){r[i] = Ti(r[i])}
		r = r[0].concat(r[1].concat(r[2]))
		return r
	}
	
	//// Crud
	function frmt(a){
		var r = []
		let j = 0
		for (let i in a){
			r[j++] = i + " `"+a[i].rarity+a[i].name+"` | " +"`"+a[i].tier+"T"+a[i].tier+"`"
			r[j++] ="`jID"+ a[i].i+" ----- "+a[i].type+" -----`" 
		}
		
		return r
	}	
		
	function Upid(frm, too){
		let oper = {}
		if (frm < too){	oper.n = 1 ; oper.s = "+" }
		else if (frm > too){ oper.n = -1 ; oper.s= "-"} 
		else {return 0}
		let x
		for (let i = frm+oper.n; !(i==(too+oper.n)) ; i+=oper.n){
			
		}
		return B.get_log()
	}
	
	function showTable (tab) {
		var log = "\n"
		for (var i=0;i<tab.length;i++) {
			log = log + "[" + i + "] " + tab[i].name + " is " + tab[i].i + "\n"
		}
		return log
	}
	
	function searchNchange (fromNr, toNr, tab, log) {
		var found = false, i = 0
		while (i<tab.length && !found) {
			if (tab[i].i == toNr) {
				//log = log + "- tab[" + i + "].i = " + tab[i].i + " will be " + fromNr + "\n"
				//log = log + "- tab[" + toNr + "].i = " + tab[toNr].i + " will be " + toNr + "\n"
				tab[i].i = fromNr
				tab[toNr].i = toNr
				found = true
			}
			i++
		}
		return log
	}
	
	function swapPlaces (nr, tab, log) {
		var pFrom = tab[nr].i
		var res

		if (pFrom!=nr) {
			log = log + "- change from:" + pFrom + ", to: "  + nr + "\n"
			//comment below to not perform changes phisicaly
			//res = #s.sys.manage({reorder:{from:pFrom, to:nr}})
			log = searchNchange(pFrom, nr, tab, log)
			return log
		}
		return log
	}
	
	//------Main Loop---------
	var B = #s.scripts.lib();
	var t = #s.sys.upgrades({full:true})
	var z = Rare(t)
	t = #s.sys.upgrades()
	var modified = [] ; var perfect = [] ; var orders = []
	var log = ""
	
	for(let i in z){
		var fr = Number(z[i].Lastid); var to = Number(i);
		perfect.push(z[i])
		var q = {["from"]:fr,to:to}
		q = {reorder:q}
		orders.push(q.reorder)
	}
	
	log = log + "\n\nprzed zmiana nr=" + i + showTable (perfect)
	for (var i=0; i<perfect.length; i++) {
		//log = log + "\n\nprzed zmiana nr=" + i + showTable (perfect)
		log = swapPlaces (i, perfect, log)
	}
	log = log + "po zmianie nr=" + i + showTable (perfect)
	
	//var parset = frmt(t)
	//var parsedp = frmt(perfect)
	//var ret = {  original:parset , perfect:parsedp, pz:frmt(z) }
	return log
}