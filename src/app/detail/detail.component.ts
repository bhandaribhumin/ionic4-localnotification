import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
@Component({
  selector: 'app-detail',
  templateUrl: './detail.component.html',
  styleUrls: ['./detail.component.scss'],
})
export class DetailComponent implements OnInit {

  data: any;

  constructor(private route: ActivatedRoute, private router: Router) {
    this.route.queryParams.subscribe(params => {
      console.log('requestPermission', JSON.stringify(params.notificationData));
      if (params && params.data) {
        this.data = JSON.parse(params.notificationData);
      }
    });
  }

  ngOnInit() { }

}
