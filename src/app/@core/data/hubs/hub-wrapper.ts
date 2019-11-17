import * as signalR from '@aspnet/signalr';

export class HubWrapper
{
	hubConnection: signalR.HubConnection = null;
	private intentionalTrackingStop = false;

	private _url = '';
	private _accessTokenFactory?(): string | Promise<string>;
	private _reconnection_timeout = 5000;

	constructor(url: string, accessTokenFactory?: () => string | Promise<string>, reconnection_timeout = 5000)
	{
		const self = this;
		self._url = url;
		self._accessTokenFactory = accessTokenFactory;
		self._reconnection_timeout = reconnection_timeout;

		self.hubConnection = new signalR.HubConnectionBuilder()
			.withUrl(self._url, { accessTokenFactory: self._accessTokenFactory })
			.build();

		Object.defineProperty(WebSocket, 'OPEN', { value: 1, });

		self.hubConnection.onclose(() =>
		{
			if (!self.intentionalTrackingStop)
			{
				self.reconnect();
			}
		});
	}

	connect(): Promise<void>
	{
		const self = this;
		self.intentionalTrackingStop = false;

		return new Promise(async (resolve, reject) =>
		{
			await self.hubConnection.start()
				.then(() =>
				{
					resolve();
				})
				.catch(err =>
				{
					reject(err);
					self.reconnect();
				});
		});
	}

	private reconnect()
	{
		const self = this;
		setTimeout(async () =>
		{
			await self.connect();
		},
		self._reconnection_timeout);
	}

	disconnect(): Promise<void>
	{
		const self = this;
		self.intentionalTrackingStop = true;

		return self.hubConnection.stop();
	}
}
