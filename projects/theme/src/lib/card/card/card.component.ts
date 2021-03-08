import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'kt-card',
  templateUrl: './card.component.html',
  styleUrls: ['./card.component.css'],
})
export class CardComponent implements OnInit {
  constructor() {}

  ngOnInit(): void {}

  @Input()
  status: string;
}
