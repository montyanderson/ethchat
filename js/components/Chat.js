Moon.component("chat", {
	template: `<div class="row chat">
		<div class="col-xs-12">
			<ol>
				<li m-for="message in messages">
					<p><strong>{{message.sender}}</strong>: {{message.text}}</p>
				</li>

				<li m-for="message in pending" class="pending">
					<p><strong>{{message.sender}}</strong>: {{message.text}}</p>
				</li>
			</ol>
		</div>

		<div class="col-xs-12">
			<div class="row">
				<div class="col-xs-9 col-lg-10">
					<input m-model="text" m-on:keyup.13="sendMessage">
				</div>

				<div class="col-xs-3 col-lg-2">
					<button m-on:click="sendMessage">Send</button>
				</div>
			</div>
		</div>
	</div>`,
	data: () => ({
		messages: [],
		pending: [],
		lastIndex: 0,
		text: ""
	}),
	methods: {
		async pullMessages() {
			const options = { from: await eth.coinbase() };
			const messages = [];

			const total = +(await contract.getMessages(options))[0];

			for(let i = Math.max(total - 100, 0); i < total; i++) {
				const res = await contract.getMessage(i, options);

				messages[i] = {
					sender: res[0],
					text: res[1]
				};

				this.set("lastIndex", i);
			}

			this.set("messages", messages);
		},
		async sendMessage() {
			const text = this.get("text");
			this.set("text", "");

			await contract.pushMessage(text, {
				from: await eth.coinbase()
			});

			const pendingMessage = {
				index: this.get("lastIndex"),
				sender: await eth.coinbase(),
				text
			};

			this.set("pending", [
				...this.get("pending"),
				pendingMessage
			]);
		}
	},
	hooks: {
		async mounted() {
			while(true) {
				await this.$data.pullMessages();
				await (new Promise(r => setTimeout(r, 5000)));
			}
		}
	}
});
