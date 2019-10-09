import { Component } from '@angular/core';

@Component({
  selector: 'ngx-footer',
  styleUrls: ['./footer.component.scss'],
  template: `
    <span class="created-by">Criado por <b><a href="http://www.cloudme.com.br" target="_blank">CloudMe Solutions</a></b>&nbsp;` + (new Date()).getFullYear() + `</span>
  `,
})
export class FooterComponent {
}
