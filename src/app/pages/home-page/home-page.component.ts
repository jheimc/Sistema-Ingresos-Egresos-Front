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
  actualYear:number;
  years:any[]=[]
  yearSelected:number;
  dataIncomes:any;
  dataExpenses:any;
  ROLE_USER_FINAL:boolean;
  permits:any;
  dataConfiguration:any;
  view: any[] = [1300,400];

  // options
  showXAxis: boolean = true;
  showYAxis: boolean = true;
  gradient: boolean = true;
  showLegend: boolean = true;
  showXAxisLabel: boolean = true;
  xAxisLabel: string = 'Mes';
  showYAxisLabel: boolean = true;
  yAxisLabel: string = 'Total';
  legendTitle: string = 'Valores';

  colorScheme = {
    domain: ['#3bd12e', '#198ae6', '#AAAAAA']
  };
  multi = [];
  constructor(
    private RequestService: RequestService
  ) { 
    this.loadDataConfigurations()
  }

  ngOnInit(): void {
    this.actualYear = new Date().getFullYear();
    this.yearSelected=this.actualYear;
    this.calculatorYears();
    this.loadDataUser();

    this.loadTotalsData();
    this.loadIncomesReport()
  }
  
  calculatorYears(){
    var year=this.actualYear
    while(year>=2010){
      this.years.push(year);
      year--;
    }
  }
  loadDataUser(){
    this.user=JSON.parse(localStorage.getItem("user"))
    this.permits=JSON.parse(localStorage.getItem("permits"))
    this.permits.map(p=>{
      if(p.authority=='ROLE_USER_FINAL'){
        this.ROLE_USER_FINAL=true;
      }
    })
  }
  loadTotalsData(){
    if(this.ROLE_USER_FINAL){
      this.RequestService.get('api/user/getIncomeAndExpenseTotal/'+this.user.idUser).subscribe(r=>{
      this.totalIncomes=r[0].total;
      this.totalExpenses=r[1].total;
      this.incomesAccounts=r[2].total;
      this.expensesAccounts=r[3].total;
    })
    }
    
  }

  resizeChart(width: any): void {
    this.view = [width, 320]
  }
  filterBy(option){
    this.yearSelected=option;
    this.loadIncomesReport()
  }
  loadIncomesReport(){
    if(this.ROLE_USER_FINAL){
      this.RequestService.get('api/income/incomesReport/'+this.user.idUser+'/'+this.yearSelected).subscribe(r=>{
        this.dataIncomes=r ; 
        var ingresos=this.convertDataSeries(this.dataIncomes,"Ingresos")
        
        this.RequestService.get('api/expense/expensesReport/'+this.user.idUser+'/'+this.yearSelected).subscribe(e=>{
          this.dataExpenses=e;
          var egresos=this.convertDataSeries(this.dataExpenses,"Egresos")
          this.makeDataChart(ingresos,egresos)
        })
        
        })
    }
    
  }
  convertDataSeries(data,name){
    var months=['Enero','Febrero','Marzo','Abril','Mayo','Junio','Julio','Agosto','Septiembre','Octubre','Noviembre','Diciembre']
    
    var dataConverted=[];
    data.map(income=>{
      var amount={}
      var account={}
      var total=0
      
      account=Object.assign(account,{accountName:income.accountName})
      for(var i=0;i<12;i++){
        total+=income.amount[i]
        amount[months[i]]=income.amount[i];
        account=Object.assign(account,amount);
      }
      account=Object.assign(account,{Totales:total})
      dataConverted.push(account)
    })
    var ingresos=[]
    for(var i=0;i<12;i++){
      var totalMonth=0;
      dataConverted.map(d=>{
        totalMonth+=d[months[i]]
      })
      var serie={name:name,value:totalMonth};
      ingresos.push(serie)
    }

    return ingresos
  }
  makeDataChart(incomes,expenses){
    var months=['Enero','Febrero','Marzo','Abril','Mayo','Junio','Julio','Agosto','Septiembre','Octubre','Noviembre','Diciembre']
    var dataChart=[]
    for(var i=0;i<12;i++){
      var itemChart={}
      var series=[]
      itemChart['name']=months[i];
      series.push(incomes[i]);
      series.push(expenses[i]);
      itemChart['series']=series;
      dataChart.push(itemChart)
    }
    this.multi=dataChart
  }
  loadDataConfigurations(){
    this.RequestService.get("api/setting/getSetting").subscribe(r=>{
    this.dataConfiguration=r
    })
  }
}
