import { Component, OnInit, ViewChild } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { MatPaginator } from '@angular/material/paginator';
import { MatSnackBar } from '@angular/material/snack-bar';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { DgExpenseComponent } from 'src/app/dialogs/dg-expense/dg-expense.component';
import { DgMessageTransactionComponent } from 'src/app/dialogs/dg-message-transaction/dg-message-transaction.component';
import { RequestService } from 'src/app/services/request.service';

@Component({
  selector: 'app-expense-page',
  templateUrl: './expense-page.component.html',
  styleUrls: ['./expense-page.component.css']
})
export class ExpensePageComponent implements OnInit {

 
  constructor(
    public dialog: MatDialog, 
    private RequestService: RequestService,
    private snack:MatSnackBar,) { }
 
  usersResponse:any;
  user:any;
  idUser:any;
  userName:any;
  expenses:any;
  allExpenses:any;
  displayedColumns: string[] = [ 'idExpenseUser','date','month','concept','amount','comment','expenseAccount','actions'];
  dataSource =  new MatTableDataSource<any>([]);
  columnas=[
    {titulo:"N°" ,name: "idExpenseUser"},
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
    this.loadExpenseByUser();
    this.loadExpenseAccounts();
    this.searchFormInit();
  }
  loadDataUser(){
    this.user=JSON.parse(localStorage.getItem("user"))
  }
  loadExpenseAccounts(){
    this.RequestService.get('api/expense/allExpenses/'+this.user.idUser).subscribe(r=>{
      this.expenses=r;
    })
  }
  loadExpenseByUser(){
    this.RequestService.get('api/expenseUser/allExpesesByUser/'+this.user.idUser).subscribe(r=>{
      this.allExpenses=r;
      this.allExpenses.sort((a,b)=>{
        return(b.idExpenseUser-a.idExpenseUser)
      })
      this.dataSource.data=this.allExpenses;
      this.dataSource.paginator = this.paginator;
      this.dataSource.sort = this.sort;
      
      /* Filter predicate used for filtering table per different columns
      *  */
      this.dataSource.filterPredicate = this.getFilterPredicate();
    })
  }
  openExpense(){
    this.dialog.open(DgExpenseComponent,{
      width: '60%',
      data:{
        user:this.user,
        expensesList:this.expenses,
        transform:"register",
        allExpenses:this.allExpenses
      }
    }); 
  }
  openEditExpense(expense){
    this.dialog.open(DgExpenseComponent,{
      width: '60%',
      maxHeight:'95%',
      height:'95%',
      data:{
        user:this.user,
        expense:expense,
        expensesList:this.expenses,
        transform:'edit',
        allExpenses:this.allExpenses
      }
    });
  }
  deleteExpense(idExpenseUser){
    this.openMessage(idExpenseUser)
  }
  openMessage(idExpenseUser){
    this.dialog.open(DgMessageTransactionComponent,{
      width: '70%',
      data:{
        idExpenseUser:idExpenseUser,
        user:this.user,
        account:'expense'
      }
    });
  }
  searchFormInit() {
    this.searchForm = new FormGroup({
      account: new FormControl(''),
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
      const columnStatus = row.expenseAccount;
      const columnDelivery = row.expenseAccount === null ? '' : row.expenseAccount;
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
    const ds = '';
    this.dateOfOrder = (date === null || date === '') ? '' : date.toISOString().split('T')[0];
    this.account = as === null ? '' : as;
    this.delivery = ds === null ? '' : ds;

    // create string of our searching values and split if by '$'
    const filterValue = this.dateOfOrder + '$' + this.account + '$' + this.delivery;
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }
}
