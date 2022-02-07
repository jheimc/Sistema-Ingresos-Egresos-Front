import { Component, OnInit, ViewChild } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { MatPaginator } from '@angular/material/paginator';
import { MatSnackBar } from '@angular/material/snack-bar';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { DgCreateIncomeAccountComponent } from 'src/app/dialogs/dg-create-income-account/dg-create-income-account.component';
import { DgIncomeComponent } from 'src/app/dialogs/dg-income/dg-income.component';
import { DgMessageTransactionComponent } from 'src/app/dialogs/dg-message-transaction/dg-message-transaction.component';
import { RequestService } from 'src/app/services/request.service';

@Component({
  selector: 'app-income-page',
  templateUrl: './income-page.component.html',
  styleUrls: ['./income-page.component.css']
})
export class IncomePageComponent implements OnInit {

  constructor(
    public dialog: MatDialog, 
    private RequestService: RequestService,
    private snack:MatSnackBar,) { }
 
  user:any;
  idUser:any;
  userName:any;
  incomes:any;
  allIncomes:any;
  displayedColumns: string[] = [ 'idIncomeUser','date','month','concept','amount','comment','incomeAccount','actions'];
  dataSource =  new MatTableDataSource<any>([]);
  columnas=[
    {titulo:"N°" ,name: "idIncomeUser"},
    {titulo:"FECHA" ,name: "date"},
    {titulo:"MES",name:"month"},
    {titulo:"CONCEPTO",name:"concept"},

  ];
  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;
  
  public searchForm: FormGroup;
  public account = '';
  public delivery = '';
  public dateOfOrder = '';
  totalShippingCost=0;
  totalPrice=0;
  findData:boolean;

  ngOnInit(): void {
    this.loadDataUser();
    this.loadIncomesByUser();
    this.loadIncomeAccounts();
    this.searchFormInit();
  }
  loadDataUser(){
    this.user=JSON.parse(localStorage.getItem("user"))
  }
  loadIncomeAccounts(){
    this.RequestService.get('api/income/allIncomes/'+this.user.idUser).subscribe(r=>{
      this.incomes=r;
    })
  }
  loadIncomesByUser(){
    this.RequestService.get('api/incomeUser/allIncomesByUser/'+this.user.idUser).subscribe(r=>{
      this.allIncomes=r;
      this.allIncomes.sort((a,b)=>{
        return(b.idIncomeUser-a.idIncomeUser)
      })
      this.dataSource.data=this.allIncomes;
      this.dataSource.paginator = this.paginator;
      this.dataSource.sort = this.sort;
      
      /* Filter predicate used for filtering table per different columns
      *  */
      this.dataSource.filterPredicate = this.getFilterPredicate();
    })
  }
  openIncome(){
    this.dialog.open(DgIncomeComponent,{
      width: '60%',
      data:{
        user:this.user,
        incomesList:this.incomes,
        transform:"register"
      }
    }); 
  }
  openEditIncome(income){
    this.dialog.open(DgIncomeComponent,{
      width: '60%',
      data:{
        income:income,
        incomesList:this.incomes,
        transform:'edit',
      }
    });
  }
  deleteIncome(idIncomeUser){
    this.openMessage(idIncomeUser)
  }
  openMessage(idIncomeUser){
    this.dialog.open(DgMessageTransactionComponent,{
      width: '70%',
      data:{
        idIncomeUser:idIncomeUser,
        user:this.user,
        account:'income'
      }
    });
  }
  searchFormInit() {
    this.searchForm = new FormGroup({
      account: new FormControl(''),
      delivery: new FormControl(''),
      dateOfStart: new FormControl(''),
      dateOfEnd: new FormControl('')
    });
  }
  /* this method well be called for each row in table  */
  getFilterPredicate() {
    return (row: any, filters: string) => {
      const filterArray = filters.split('$');
      const dateOfStart = filterArray[0];
      const dateEnd=this.searchForm.get('dateOfEnd').value;
      const dateOfEnd = (dateEnd === null || dateEnd === '') ? '' : dateEnd.toISOString().split('T')[0];
      const account = filterArray[1];
      const delivery = filterArray[2];
      const matchFilter = [];
      // Fetch data from row
      let columnDateOfOrder = row.date;
      const columnStatus = row.incomeAccount;
      const columnDelivery = row.incomeAccount === null ? '' : row.incomeAccount;
      // verify fetching data by our searching values
      var customFilterDD;
      if(dateOfEnd=== ''){
        customFilterDD = columnDateOfOrder?.includes(dateOfStart);
      }else{
        
        if(columnDateOfOrder>= dateOfStart && columnDateOfOrder<= dateOfEnd){
          customFilterDD=true;
        }else{
          customFilterDD=false;
        }
      }
      
      const customFilterDS = columnStatus?.toLowerCase().includes(account);
      const customFilterAS = columnDelivery?.toLowerCase().includes(delivery);

      // push boolean values into array
      matchFilter.push(customFilterDD);
      matchFilter.push(customFilterDS);
      matchFilter.push(customFilterAS);
      if(matchFilter.every(Boolean)){
        this.findData=true;
      }
      // return true if all values in array is true
      // else return false
      return matchFilter.every(Boolean);
    };
  }

  applyFilter() {
    this.findData=false;
    const date = this.searchForm.get('dateOfStart').value;
    const as = this.searchForm.get('account').value;
    const ds = this.searchForm.get('delivery').value;
    this.dateOfOrder = (date === null || date === '') ? '' : date.toISOString().split('T')[0];
    this.account = as === null ? '' : as;
    this.delivery = ds === null ? '' : ds;

    // create string of our searching values and split if by '$'
    const filterValue = this.dateOfOrder + '$' + this.account + '$' + this.delivery;
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }
}
