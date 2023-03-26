import {Component, OnInit, ViewChild} from '@angular/core';
import {BreadcrumbService} from '../../app.breadcrumb.service';
import { Pegawai } from '../../demo/domain/pegawai';
import { Table } from 'primeng/table';
import { PegawaiService } from '../../demo/service/pegawai.service';

interface Status {
    name: string,
    value: string
}

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {

  formPegawai: any = {};
  pegawai: Pegawai[];
  jenisKelaminOptions: any[] = [
    { label: 'Laki-laki', value: 'Laki-laki' },
    { label: 'Perempuan', value: 'Perempuan' }
  ];
  statusPekerjaanOptions: any[] = [
    { label: 'Aktif', value: 'Aktif' },
    { label: 'Cuti', value: 'Cuti' },
    { label: 'Resign', value: 'Resign' }
  ];
  selectedPegawai: any;
  rowGroupMetadata: any;
  @ViewChild('dt') table: Table;
  load: any = 1;
  display: boolean = false;
  status: Status[];
  showEdit: boolean;
  constructor(private pegawaiService: PegawaiService , private breadcrumbService: BreadcrumbService) {
      this.breadcrumbService.setItems([
          {label: 'Dashboard', routerLink: ['/']}
      ]);
  }

  ngOnInit() {
      this.getPegawai();
  }

  getPegawai() {
    this.pegawaiService.getPegawai().subscribe((lists: any=[]) => {

      this.pegawai = lists;

      this.load = 1;
    },
    error => {
      this.load = 1;
      console.log(error);    
    })
  }

  findIndexById(id: any): number {
      let index = -1;
      for (let i = 0; i < this.pegawai.length; i++) {
          if (this.pegawai[i]._id === id) {
              index = i;
              break;
          }
      }

      return index;
  }

  showDialog() {
    this.formPegawai = {};
    this.showEdit = false;
    this.display = true;
  }

  showDialog2(pegawai: any) {
    this.formPegawai = pegawai;
    let dateStr = this.formPegawai.tanggal_lahir; // contoh tanggal yang diterima dari server
    let dateObj = new Date(Date.parse(dateStr)); // ubah format tanggal menjadi objek Date
    this.formPegawai.tanggal_lahir = dateObj.toLocaleDateString('id-ID'); // simpan tanggal dengan format lokal yang diinginkan (misalnya format Indonesia)
    this.showEdit = true;
    this.display = true;
  }

  savePegawai(pegawai : any) {
  this.pegawaiService.createPegawai(pegawai).subscribe((data: any) => {
    this.display = false;
    this.formPegawai = {};
    this.getPegawai();
  });
  }

  editPegawai(pegawai : any) {
  this.pegawaiService.updatePegawai(pegawai._id, pegawai).subscribe(() => {
    this.display = false;
    this.formPegawai = {};
    this.getPegawai();
  });
  }

  deletePegawai(pegawai:any) {
    let id = pegawai._id;
    this.pegawaiService.deletePegawai(id).subscribe((res: any) => {
      this.getPegawai();
      console.log(res);
    })
  }

}
