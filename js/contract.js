const eth = new Eth(web3.currentProvider);

const Chat = eth.contract(
	[{"constant":true,"inputs":[],"name":"getMessages","outputs":[{"name":"","type":"uint256"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":true,"inputs":[{"name":"index","type":"uint256"}],"name":"getMessage","outputs":[{"name":"sender","type":"address"},{"name":"text","type":"string"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":false,"inputs":[{"name":"text","type":"string"}],"name":"pushMessage","outputs":[],"payable":false,"stateMutability":"nonpayable","type":"function"},{"inputs":[],"payable":false,"stateMutability":"nonpayable","type":"constructor"},{"anonymous":false,"inputs":[{"indexed":false,"name":"sender","type":"address"},{"indexed":false,"name":"text","type":"string"}],"name":"NewMessage","type":"event"}]
);

const contract = Chat.at("0x5B33942d310bed033cF39F8D9F37369EFC978973");
