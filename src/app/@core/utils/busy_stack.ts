import { BehaviorSubject } from 'rxjs';

export class BusyStack
{
	// indicação de ocupado
	public busy = new BehaviorSubject<number>(0);

	public push()
	{
		this.busy.next(this.busy.value + 1);
	}

	public pop()
	{
		let busyVal = this.busy.value;
		busyVal--;

		if (busyVal < 0)
		{
			busyVal = 0;
		}

		this.busy.next(busyVal);
	}
}
