var currencies = [
	{symbol: 'Ethereum+%28ETH%29', regex: /^0x[a-fA-F0-9]{40}/}, // Ethereum [Valid]
	{symbol: 'Bitcoin+%28BTC%29', regex: /^[13][a-km-zA-HJ-NP-Z1-9]{25,34}/}, // Bitcoin [Valid]
	{symbol: 'Bitcoin+%28BTC%29', regex: /^[a-z0-9]{42}$/}, // Bitcoin - bech32 - 42 chars
	{symbol: 'Cardano+%28ADA%29', regex: /^addr[a-z0-9]{54}$/}, // Cardano shelley / bech32 - 58 chars
	{symbol: 'Cardano+%28ADA%29', regex: /^addr[a-z0-9]{99}$/}, // Cardano shelley / bech32 - 103 chars
	{symbol: 'Cardano+%28ADA%29', regex: /^addr[0-9a-zA-Z]{99}$/}, // Cardano shelley / bech32 - 103 chars
	{symbol: 'Cardano+%28ADA%29', regex: /^addr[1-9A-HJ-NP-Za-km-z]{59}$/}, // Cardano Byron / base58 - 59 chars
	{symbol: 'Cardano+%28ADA%29', regex: /^addr[1-9A-HJ-NP-Za-km-z]{62}$/}, // Cardano Byron / base58 - 66 chars
	{symbol: 'Cardano+%28ADA%29', regex: /^addr[1-9A-HJ-NP-Za-km-z]{99}$/}, // Cardano Byron / base58 - 103 chars
	{symbol: 'Dogecoin+%28DOGE%29', regex: /^D{1}[5-9A-HJ-NP-U]{1}[1-9A-HJ-NP-Za-km-z]{32}/}, // Dogecoin [Valid]
	{symbol: 'Litecoin+%28LTC%29', regex: /^[LM3][a-km-zA-HJ-NP-Z1-9]{26,33}/}, // Litecoin [Valid]
	{symbol: 'Bitcoin+Cash+%28BCH%29', regex: /^[13][a-km-zA-HJ-NP-Z1-9]{33}$/}, // Bitcoin cash new [Valid]
	{symbol: 'Bitcoin+Cash+%28BCH%29', regex: /^((bitcoincash|bchreg|bchtest):)?(q|p)[a-z0-9]{41}/}, // Bitcoin cash legacy [Valid]
	{symbol: 'Monero+%28XMR%29', regex: /^4[0-9AB][1-9A-HJ-NP-Za-km-z]{93}/}, // Monero [Valid]
	{symbol: 'Dash+%28DASH%29', regex: /^X[1-9A-HJ-NP-Za-km-z]{33}/}, // Dash [Valid]
	{symbol: 'Ripple+%28XRP%29', regex: /^r[0-9a-zA-Z]{24,34}/}, // XRP [Valid]
	{symbol: 'Ripple+%28XRP%29', regex: /^r[0-9a-zA-Z]{33}/}, // XRP [Valid]
	// {symbol: 'Polkadot+%28DOT%29', regex: /^(?P<ss58>[\w\d ]+)?(?P<path>(//?[^/]+)*)$/}, // Polkadot
	// {symbol: 'Kusama+%28KSM%29', regex: /^1(?P<ss58>[\w\d ]+)?(?P<path>(//?[^/]+)*)$/}, // Kusama
	{symbol: 'Neo+%28NEO%29', regex: /^A[0-9a-zA-Z]{33}/} // Neo
]
$("body:first").find('*').contents().filter(function() {
	for (var i in currencies) {
		var currency = currencies[i].symbol;
		var regex = currencies[i].regex;
		if (this.nodeType == 3 && regex.test(this.nodeValue) && this.parentElement.tagName !== "A") {
			var address = this.nodeValue.match(regex)[0];
			var anchor = document.createElement('a');
			anchor.setAttribute('href', 'https://scanblocks.io/search/index?blockchain=' + currency + '&address=' + this.nodeValue.match(regex)[0]); 
			anchor.setAttribute('class', 'sbHighlight'); 
			anchor.setAttribute('target', '_blank'); 
			anchor.appendChild(document.createTextNode(this.nodeValue.match(regex)[0]));
			if(this.nextSibling)
				this.parentElement.insertBefore(anchor, this.nextSibling);
			else
				this.parentElement.appendChild(anchor);
			this.nodeValue = this.nodeValue.replace(regex, '');
		}
	}
});