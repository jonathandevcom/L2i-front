import { Component, OnInit } from '@angular/core';
import { OrderService } from 'src/app/services/order.service';

@Component({
  selector: 'app-admin-administration',
  templateUrl: './admin-administration.component.html',
  styleUrls: ['./admin-administration.component.css']
})
export class AdminAdministrationComponent implements OnInit {
  orderList: any[] = [];
  showDetails: boolean = false;
  detailItems: any[] = [];

  constructor(
    private os: OrderService
  ) { }

  ngOnInit(): void {
    this.os.getAllOrders().subscribe((res:any) => {
      this.orderList = res.result;
    });
  }

  showOrderDetails(order:any ): void {
    this.detailItems=order.lines
    this.showDetails = true;
  }

}
