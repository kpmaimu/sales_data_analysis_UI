import { Injectable } from '@angular/core';

@Injectable()
export class SharingService{
    private data:any = undefined;
    private reportsData:any = undefined;

    setData(data:any){
        this.data = data;
    }

    getData():any{
        return this.data;
    }

    setReportsData(data:any){
        this.reportsData = data;
    }
    getReportsData():any{
        return this.reportsData;
    }
}
