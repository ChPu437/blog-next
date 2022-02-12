var quotes = [
	{
		"quote": "我觉得今天的题太水了罢！",
		"from": "AlanSP",
	},
	{
		"quote": "草为什么我的🐎显示不出来",
		"from": "AlanSP",
	},
	{
		"quote": "你↗会↘LCT吗？",
		"from": "AzusaCat",
	},
	{
		"quote": "贾队懂啥",
		"from": "AzusaCat",
	},
	{
		"quote": "我就是装菜！",
		"from": "AzusaCat",
	},
]

var now = 1;
var target = 1;

function get_random_quotation() {
	while (now == target) {
		target = Math.floor(Math.random() * quotes.length);
	}
	document.getElementById("quotation").innerHTML = quotes[target].quote;
	document.getElementById("from").innerHTML = quotes[target].from;
	now = target;
	return quotes[target].quote
}
