import { Component, OnInit } from '@angular/core';
import { HttpClient } from "@angular/common/http";
// import {Observable} from "rxjs/Observable";



@Component({
  selector: 'app-buttons',
  templateUrl: './buttons.component.html',
  styleUrls: ['./buttons.component.scss']
})

export class ButtonsComponent implements OnInit {

  file_list = [];
  submitted = false;

  constructor(private http: HttpClient) { }

  ngOnInit() {
  }

  fileEvent(fileInput) {
    this.file_list = fileInput.target.files;
  }

  setSubmitted() {
    // console.log(this.file_list);
    this.submitForm();
    this.submitted = true;
  }

  unsetSubmitted() {
    this.submitted = false;
  }

  submitForm() {
    let formData: FormData = new FormData();
    for (let i = 0; i < this.file_list.length; i++) {
      formData.append('file_' + i, this.file_list[i]);
    }
    console.log("Files:");
    console.log(formData);
    let url = "http://localhost:5000/submit-form"
    this.http.post(url, formData).subscribe(data => {
      console.log(data);
    });
  }

}
