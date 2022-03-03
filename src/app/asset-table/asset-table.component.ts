import { KeyValue } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { Asset } from '../asset';
import { ASSETS } from '../asset-data';


export class SortedData {

  length: number = 0;
  members: Asset[] = [];

}

@Component({
  selector: 'app-asset-table',
  templateUrl: './asset-table.component.html',
  styleUrls: ['./asset-table.component.css']
})
export class AssetTableComponent implements OnInit {

  resultData: SortedData[] = [];

  isFound: boolean = false;

  constructor() { }

  data = ASSETS;

  displayedColumns: string[] = [
    "所有權人",
    "縣市",
    "鄉鎮市區",
    "段小段",
    "建物總筆數",
    "建物總面積(M2)",
    "建物總面積(坪)"
  ];

  ngOnInit(): void {

    this.sortOwner(this.data);
    let count = 0;  //count代表第幾組同個owner的索引
    this.resultData[count] = new SortedData();
    this.resultData[count].members.push(this.data[0]);  //先將第一個資料塞進第一組owner
    this.resultData[count].length++;

    for (let i = 1; i < this.data.length; i++) {

      if (this.data[i].owner == this.data[i - 1].owner) {

        this.resultData[count].members.push(this.data[i]);
        this.resultData[count].length++;

      }

      else {

        count++;  //遇到不同的owner名之後，開啟新一組owner的掃瞄
        this.resultData[count] = new SortedData();
        this.resultData[count].members.push(this.data[i]);
        this.resultData[count].length++;

      }

    }
    console.log(this.resultData);
  }




  keepOrder = (a: any, b: any) => {

    return a;

  }

  sortOwner(data: Asset[]) {

    data.sort((a, b) => a.owner.localeCompare(b.owner));

  }

}
