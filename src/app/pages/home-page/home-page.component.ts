import { Component, OnInit } from '@angular/core';
import { RequestService } from 'src/app/services/request.service';

@Component({
  selector: 'app-home-page',
  templateUrl: './home-page.component.html',
  styleUrls: ['./home-page.component.css']
})
export class HomePageComponent implements OnInit {
  user:any;
  totalIncomes:any;
  totalExpenses:any;
  incomesAccounts:any;
  expensesAccounts:any;
  constructor(
    private RequestService: RequestService
  ) { }

  ngOnInit(): void {
    this.loadDataUser();
    this.loadTotalsData();
  }
  loadDataUser(){
    this.user=JSON.parse(localStorage.getItem("user"))
  }
  loadTotalsData(){
    this.RequestService.get('http://localhost:8080/api/user/getIncomeAndExpenseTotal/'+this.user.idUser).subscribe(r=>{
      this.totalIncomes=r[0].total;
      this.totalExpenses=r[1].total;
      this.incomesAccounts=r[2].total;
      this.expensesAccounts=r[3].total;
    })
  }
}
