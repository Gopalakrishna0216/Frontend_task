import { Component } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { Observable } from 'rxjs';
import { map, startWith } from 'rxjs/operators';
import { __values } from 'tslib';
import { MatOptionSelectionChange } from '@angular/material/core';
import { ServiceLcService } from '../service-lc.service';
@Component({
  selector: 'app-lctabs',
  templateUrl: './lctabs.component.html',
  styleUrls: ['./lctabs.component.scss']
})
export class LctabsComponent {
  constructor(public Lcservice: ServiceLcService, public fb: FormBuilder) {
    this.GeneralForm = new FormGroup({
      Customername: new FormControl(),
      CustomerStatus: new FormControl(''),
      knownLanguages: new FormControl('')
    })
    this.AddressForm = new FormGroup({
      Country: new FormControl(''),
      States: new FormControl(''),
      City: new FormControl(''),
    })
  }
  GeneralForm: FormGroup;
  AddressForm: FormGroup;

  // Formcontrol for country,state,city
  Country = new FormControl('', [Validators.required])
  States = new FormControl('')
  City = new FormControl('')
  Customername = new FormControl()
  knownLanguages = new FormControl('')
  CustomerStatus = new FormControl('')


  Countries: string[] = ['India', 'Usa'];

  CountryStateCitymapping: any = {
    India: {
      states: ['Tamilnadu', 'Karnataka'],
      cities: {
        Tamilnadu: ['Chennai', 'Erode', 'Coimbatore'],
        Karnataka: ['Bangalore', 'Mysore', 'Mangalore'],
      },
    },
    Usa: {
      states: ['California', 'Texas'],
      cities: {
        California: ['Sanfranssico', 'Losangles'],
        Texas: ['Houseton', 'Dallas'],
      },
    },
  };

  //  options for filtered datas

  filteredCountries: Observable<string[]> = new Observable();
  filteredStates: Observable<string[]> = new Observable();
  filteredCities: Observable<string[]> = new Observable();

  states: string[] = [];
  cities: string[] = [];

  LanguagesList: string[] = ['English', 'Tamil', 'Kannada', 'Telugu'];
  options: string[] = ['One', 'Two', 'Three'];
  filteredOptions: Observable<string[]> = new Observable();
  //filterStatus: Observable<string[]>;

  Submit() {
    if (this.GeneralForm.valid && this.AddressForm.valid) {
      const genralDetails = this.GeneralForm.value;
      const addressDetails = this.AddressForm.value;

      const combinedpayload = {
        genralDetails,
        addressDetails
      }



      this.Lcservice.crudpost2(combinedpayload.genralDetails).subscribe((res) => {
        console.log("General details sent", res);
      }
        //   (err)=>{
        //  console.error("Error sending details",err);

        //   }

      )
      this.Lcservice.crudpost1(combinedpayload.addressDetails).subscribe((res1) => {
        console.log("address details sent", res1);
        error: (err: any) => {
          console.error("Error is occured", err)
          alert(`Error occured :${err.message || err}`)
        }

      },
      )





    }
    else (this.GeneralForm.invalid && this.AddressForm.invalid);
    {
      alert("Form is invalid")


    }
  }
   
  

  ngOnInit() {
    this.GeneralForm = this.fb.group({
      'Customername': ['', Validators.required],
      'CustomerStatus': ['', Validators.required],
      'knownLanguages': [[]]
    })

    this.AddressForm = this.fb.group({

      'Country': ['', Validators.required],
      'States': ['', Validators.required],
      'City': ['', Validators.required]
    })


    this.filteredOptions = this.Customername.valueChanges.pipe(
      startWith(''),
      map((value) => this._filter(value || ''))
    );




    this.filteredCountries = this.AddressForm.get('Country')!.valueChanges.pipe(
      startWith(''),
      map((value) => this._filterCountries(value || ''))
    )

    // filtered states for auto complete
    this.filteredStates = this.AddressForm.get('States')!.valueChanges.pipe(
      startWith(''),
      map((value) => this._filterStates(value || ''))
    );

    // filtered cities for auto complete
    this.filteredCities = this.AddressForm.get('City')!.valueChanges.pipe(
      startWith(''),
      map((value) => this._filterCities(value || ''))
    );

    // when country changes update state and reset cities/state fields

    // this.countryControl.valueChanges.subscribe((selectedCountry) => {
    //   if (selectedCountry) {
    //     this.OnCountrySelected(selectedCountry);
    //   }
    // });
    this.AddressForm.get('Country')!.valueChanges.subscribe((selectedCountry) => {
      if (selectedCountry) {
        this.OnCountrySelected(selectedCountry)
      }
    })
  }
  OnCountrySelected(Country: string) {
    const CountryData = this.CountryStateCitymapping[Country];
    //this.states = CountryData.states;
    // this.stateControl.reset();
    // this.cityControl.reset();
    if (!CountryData) {
      this.states = []
      this.cities = []
      //this.stateControl.reset()
      // this.cityControl.reset()
      this.AddressForm.get('States')?.reset();
      this.AddressForm.get('City')?.reset();

    }
    else {
      this.states = CountryData.states || []
      this.AddressForm.get('States')?.reset();
    }

  }
  OnStateSelected(event: MatOptionSelectionChange) {
    console.log(event)
    if (event.isUserInput) {
      const selectedCountry = this.AddressForm.get('Country')?.value;
      if (selectedCountry) {
        const stateselected = event.source.value;
        // const selectedCountry = this.countryControl.value
        const countryData = this.CountryStateCitymapping[selectedCountry];
        if (countryData) {
          this.cities = countryData.cities[stateselected] || [];
          this.AddressForm.get('City')?.reset();
        }
      }
    }
  }


  private _filter(value: string): string[] {
    const filterValue = value.toLowerCase();

    return this.options.filter((option) =>
      option.toLowerCase().includes(filterValue)
    );
  }



  // Function to filter countries
  private _filterCountries(value: string): string[] {
    const filterValue = value.toLowerCase();
    return this.Countries.filter((country) =>
      country.toLowerCase().includes(filterValue)
    );
  }

  // Function to filter states based on the selected country
  private _filterStates(value: string): string[] {
    const filterValue = value.toLowerCase();
    return this.states ? this.states.filter((states) =>
      states.toLowerCase().includes(filterValue)
    ) : [];
  }

  // Function to filter cities based on the selected state
  private _filterCities(value: string): string[] {
    const filterValue = value.toLowerCase();
    return this.cities ? this.cities.filter((city) =>
      city.toLowerCase().includes(filterValue)
    ) : [];
  }

}
