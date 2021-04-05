import { Component, OnInit, Input } from '@angular/core';
import { DatePipe } from '@angular/common';
import { ActivatedRoute, Router } from '@angular/router';
import { Customer } from 'src/app/models/customer';
import { RentalDetailDto } from 'src/app/models/rentalDetailDto';
import { CustomerService } from 'src/app/services/customer.service';
import { RentalService } from 'src/app/services/rental.service';
import { ToastrService } from 'ngx-toastr';
import { Car } from 'src/app/models/car';
import { CarService } from 'src/app/services/car.service';
import { CarDetailDto } from 'src/app/models/carDetailDto';

@Component({
  selector: 'app-rental',
  templateUrl: './rental.component.html',
  styleUrls: ['./rental.component.css']
})
export class RentalComponent implements OnInit {

  rentals:RentalDetailDto[] = [];
  customers: Customer[] = [];
  cars:CarDetailDto[]=[];
  carId:number;

  customerId: number;
  dataLoaded = false;
  rentDate: Date;
  returnDate: Date;

  minDate: string | any;
  maxDate: string | null;
  maxMinDate: string | null;
  firstDateSelected: boolean = false;

  constructor(private rentalService:RentalService, private activatedRoute:ActivatedRoute,
    private customerService:CustomerService, private datePipe: DatePipe,
    private router: Router, private carService:CarService) { }

  ngOnInit(): void {
    this.activatedRoute.params.subscribe(params => {
      if(params["carId"]){
        this.carId = params["carId"];
        this.getCars(params["carId"]);
      }
    })
    this.getRentals();
    this.getCustomers();
  }

  getRentals() {
    this.rentalService.getRental().subscribe(response =>{
      this.rentals = response.data
      this.dataLoaded = true;
    })
  }

  getCustomers() {
    this.customerService.getCustomers().subscribe(response =>{
      this.customers = response.data
      this.dataLoaded = true;
    })
  }

  getCars(carId:number){
    this.carService.getCarDetailsById(carId).subscribe(response => {
      console.log(response.data)
      //this.cars = response.data;
    })
  }

  getRentMinDate() {
    this.minDate = this.datePipe.transform(new Date(), 'yyyy-MM-dd');
    return this.minDate;
  }

  getReturnMinDate() {
    if (this.rentDate != undefined) {
      let stringToDate = new Date(this.rentDate);
      let new_date = new Date();
      new_date.setDate(stringToDate.getDate() + 1);
      return new_date.toISOString().slice(0, 10);
    } else {
      return this.rentDate;
    }
  }
  getReturnMaxDate() {
    this.maxDate = this.datePipe.transform(
      new Date(new Date().setFullYear(new Date().getFullYear() + 1)),
      'yyyy-MM-dd'
    );
    return this.maxDate;
  }

  onChangeEvent(event: any) {
    this.minDate = event.target.value;
    this.firstDateSelected = true;
  }

  setCustomerId(customerId: string) {
    this.customerId = +customerId;
    console.log(this.customerId);
  }

}
