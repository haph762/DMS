import { Injectable } from "@angular/core";

@Injectable({
  providedIn: 'root'
})

export class HelperService {

  transferFunctionList(list: any) {
    var newList = list?.map((f: any) => {
      var viewFunction = {
        id: f.id,
        description: f.description,
        title: f.title,
        status: f.status,
      }

      var childs = [];
      childs.push(viewFunction);
      childs = childs.concat(f.childs);
      return {
        id: `-${f.id}`,
        description: "Tất cả",
        title: f.title,
        status: f.status,
        childs: childs,
        root: true
      }

    });

    return newList;
  }

  formatVNDPrice(price: any) {
    var priceFormated = price.toLocaleString('en-EN');
    return priceFormated;
  }

  getStorage(key:any) {
    var values = localStorage.getItem(key) ?? "";
    if (values) {
      return values;
    } else {
      return null;
    }
  }

  setStorage(key: any, values: any) {
    localStorage.setItem(key, values);
  }

}
