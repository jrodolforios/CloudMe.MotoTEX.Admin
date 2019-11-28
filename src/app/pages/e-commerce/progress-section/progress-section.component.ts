import { Component, OnDestroy } from '@angular/core';
import { ProgressInfo, StatsProgressBarData } from '../../../@core/data/stats-progress-bar';
import { takeWhile } from 'rxjs/operators';
import { CorridaService } from '../../../../api/to_de_taxi/services';

@Component({
  selector: 'ngx-progress-section',
  styleUrls: ['./progress-section.component.scss'],
  templateUrl: './progress-section.component.html',
})
export class ECommerceProgressSectionComponent implements OnDestroy {

  private alive = true;
  public corridasHoje: number = 0;
  public corridasOntem: number = 0;
  public corriasEsteMes: number = 0;

  progressInfoData: ProgressInfo[];

  constructor(private corridaService: CorridaService) {
    var date = new Date();
    var firstDay = new Date(date.getFullYear(), date.getMonth(), 1);
    this.corridaService.ApiV1CorridaRecuperarApartirDeDataByDataPost(firstDay.toISOString()).toPromise().then(x => {
      if (x.success) {
        this.corriasEsteMes = x.data.length;

        x.data.forEach(y => {
          var dataHoje: Date = new Date();
          dataHoje.setHours(0,0,0,0);
          
          var dataOntem: Date = new Date(new Date().getTime() - (1000 * 60 * 60 * 24));
          dataOntem.setHours(0,0,0,0);

          var dataVerificar: Date = new Date(y.inicio);
          dataVerificar.setHours(0,0,0,0);
          
          if (dataVerificar.toDateString() === dataHoje.toDateString())
            this.corridasHoje++
          else if (dataVerificar.toDateString() === dataOntem.toDateString())
            this.corridasOntem++
        });
      }
    });

  }

  ngOnDestroy() {
  }
}
