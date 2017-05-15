function(context, args){

	var B = #s.scripts.lib()
	var t = #s.sys.upgrades({full:true})
	var tX = new Array(), tY = new Array(), log = ""
	//var tR
	var t = #s.sys.upgrades({full:true})
	var tSize = t.length
	for (var i = 0; i<tSize; i++) {
		t[i].n = i
	}
	
	return t
	
	tX.push ({n:0, r:1, t:"L"})
	tX.push ({n:1, r:1, t:"B"})
	tX.push ({n:2, r:2, t:"L"})
	tX.push ({n:3, r:1, t:"Ss"})
	tX.push ({n:4, r:1, t:"B"})
	
	tY.push ({n:2, r:2, t:"L"})
	tY.push ({n:4, r:1, t:"Ss"})
	tY.push ({n:1, r:1, t:"L"})
	tY.push ({n:0, r:1, t:"B"})
	tY.push ({n:3, r:1, t:"B"})
	
	function showTable (tab) {
		var log = "\n"
		for (var i=0;i<5;i++) {
			log = log + "tab[" + i + "].n = " + tab[i].n + "\n"
		}
		return log
	}
	
	function searchNchange (fromNr, toNr, tab, log) {
		for (var i=0;i<5;i++) {
			if (tab[i].n == toNr) {
				tab[i].n = fromNr
				tab[toNr].n = toNr
				return log
			}
		}
		return log
	}
	
	function swapPlaces (nr, tabY, log) {
		var pFrom = tabY[nr].n
		var res

		if (pFrom!=nr) {
			log = log + "- change from:" + pFrom + ", to: "  + nr + "\n"
			res = #s.sys.manage({reorder:{from:pFrom, to:nr}})
			log = searchNchange(pFrom, nr, tabY, log)
			return log
		}
		return log
	}
	
	//----- MAIN ------
	for (var i=0; i<5; i++) {
	//log = log + "\nprzed zmiana nr=" + i + showTable (tY)
		log = swapPlaces (i, tY, log)
	//log = log + "po zmianie nr=" + i + showTable (tY)
	}
	
	return log
}