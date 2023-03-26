import { Injectable } from '@angular/core';
import { WebRequestService } from './web-request.service';

@Injectable({
  providedIn: 'root'
})
export class PegawaiService {


    constructor(private webReqService: WebRequestService) { }

    getPegawai() {
        return this.webReqService.get('pegawai');
    }

    updateStatus(id:any, status: string) {
        // We want to send a web request to update a list
        return this.webReqService.patch(`users/${id}`, { status });
      }

      createPegawai(pegawai: any) {
        // We want to send a web request to create a list
        return this.webReqService.post('pegawai', pegawai);
      }
    
      updatePegawai(id: string, pegawai: any) {
        // We want to send a web request to update a list
        return this.webReqService.patch(`pegawai/${id}`, pegawai );
      }
  
      deletePegawai(id: string) {
        return this.webReqService.delete(`pegawai/${id}`);
      }
    

}
