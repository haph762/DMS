import { Injectable } from "@angular/core";
import { HttpClient, HttpParams } from "@angular/common/http";
import { Pagination } from "./pagination-utility";
import { KeyValuePair } from "./key-value-pair";

@Injectable({
  providedIn: "root",
})
export class FunctionUtility {
  /**
   *Hàm tiện ích
   */

  constructor(private http: HttpClient) { }

  /**
   *Trả ra ngày hiện tại, chỉ lấy năm tháng ngày: yyyy/MM/dd
   */
  getToDay() {
    const toDay =
      new Date().getFullYear().toString() +
      "/" +
      (new Date().getMonth() + 1).toString() +
      "/" +
      new Date().getDate().toString();
    return toDay;
  }

  /**
   *Trả ra ngày với tham số truyền vào là ngày muốn format, chỉ lấy năm tháng ngày: yyyy/MM/dd
   */
  getDateFormat(date: Date) {
    return (
      date.getFullYear() +
      "/" +
      (date.getMonth() + 1 < 10
        ? "0" + (date.getMonth() + 1)
        : date.getMonth() + 1) +
      "/" +
      (date.getDate() < 10 ? "0" + date.getDate() : date.getDate())
    );
  }

  getUTCDate(d?: Date) {
    let date = d ? d : new Date();
    return new Date(
      Date.UTC(
        date.getFullYear(),
        date.getMonth(),
        date.getDate(),
        date.getHours(),
        date.getMinutes(),
        date.getSeconds()
      )
    );
  }

  /**
   * Check 1 string có phải empty hoặc null hoặc undefined ko.
   */
  checkEmpty(str: any) {
    return !str || /^\s*$/.test(str);
  }

  /**
   * Kiểm tra số lượng phần ở trang hiện tại, nếu bằng 1 thì cho pageNumber lùi 1 trang
   * @param pagination
   */
  calculatePagination(pagination: Pagination) {
    // Kiểm tra trang hiện tại phải là trang cuối không và trang hiện tại không phải là trang 1
    if (
      pagination.pageNumber === pagination.totalPage &&
      pagination.pageNumber !== 1
    ) {
      // Lấy ra số lượng phần tử hiện tại của trang
      let currentItemQty =
        pagination.totalCount -
        (pagination.pageNumber - 1) * pagination.pageSize;

      // Nếu bằng 1 thì lùi 1 trang
      if (currentItemQty === 1) {
        pagination.pageNumber--;
      }
    }
  }

  /**
   * Thêm hoặc xóa class tác động vào id element trên DOM
   * * @param id
   * * @param className
   * * @param type => Value bằng true thì add class. Value bằng false thì xóa class
   */
  changeDomClassList(id: string, className: string, type: boolean) {
    type
      ? document.getElementById(id).classList.add(className)
      : document.getElementById(id).classList.remove(className);
  }

  /**
   * Append property FormData
   * If property type Date => Convert value to String
   * * @param formValue
   */
  ToFormData(formValue: any) {
    const formData = new FormData();
    for (const key of Object.keys(formValue)) {
      const value = formValue[key];
      if (value != null || value != undefined)
        formData.append(key, value);
    }
    return formData;
  }

  toFormDatas(obj: any, form?: FormData, namespace?: string) {
    let fd = form || new FormData();
    let formKey: string;
    for (var property in obj) {
      if (obj.hasOwnProperty(property)) {
        // namespaced key property
        if (!isNaN(property as any)) {
          // obj is an array
          formKey = namespace ? `${namespace}[${property}]` : property;
        } else {
          // obj is an object
          formKey = namespace ? `${namespace}.${property}` : property;
        }

        if (obj[property] instanceof Date) {
          // the property is a date, so convert it to a string
          fd.append(formKey, obj[property].toISOString());
        }
        // Đối tượng là Object và không phải là File
        else if (typeof obj[property] === 'object') {

          // the property is an object or an array, but not a File, use recursivity
          if (obj[property] != null && !(obj[property] instanceof File))
            this.toFormDatas(obj[property], fd, formKey);
          // là object và TypeOf là File
          else if (obj[property] != null)
            fd.append(formKey, obj[property]);
        }
        else {
          // the property is a string, number or a File object
          fd.append(formKey, obj[property]);
        }
      }
    }
    return fd;
  }


  objectToFormData(obj: any, rootName?: any, ignoreList?: any) {
    var formData = new FormData();

    function appendFormData(data: any, root: any) {
      if (!ignore(root)) {
        root = root || '';
        // Object has File
        if (data instanceof File) {
          formData.append(root, data);
        }
        // Object is Array
        else if (Array.isArray(data)) {
          for (var i = 0; i < data.length; i++) {
            appendFormData(data[i], root + '[' + i + ']');
          }
        }
        // Object is Object and has data
        else if (typeof data === 'object' && data) {
          for (var key in data) {
            if (data.hasOwnProperty(key)) {
              if (root === '') {
                appendFormData(data[key], key);
              } else {
                appendFormData(data[key], root + '.' + key);
              }
            }
          }
        }
        // all type
        else {
          if (data !== null && typeof data !== 'undefined') {
            formData.append(root, data);
          }
        }
      }
    }

    function ignore(root: any) {
      return Array.isArray(ignoreList)
        && ignoreList.some(function (x) { return x === root; });
    }

    appendFormData(obj, rootName);

    return formData;
  }


  buildFormData(formData: FormData, data: any, parentKey?: string) {
    if (data && typeof data === 'object' && !(data instanceof Date) && !(data instanceof File)) {
      Object.keys(data).forEach(key => {
        this.buildFormData(formData, data[key], parentKey ? `${parentKey}[${key}]` : key);
      });
    } else {
      const value = data == null ? '' : data;

      formData.append(parentKey, value);
    }
  }

  jsonToFormData(data: any) {
    const formData = new FormData();

    this.buildFormData(formData, data);

    return formData;
  }

  /**
   * Append property HttpParams
   * * @param formValue
   */
  ToParams(formValue: any) {
    let params = new HttpParams();
    for (const key of Object.keys(formValue)) {
      const value = formValue[key];
      if (value != null || value != undefined)
        params = params.append(key, value);
    }
    return params;
  }

  // Converting "String" to javascript "File Object"
  convertToFile(listFile: string[], urlFolder: string, file: File[]) {
    // ***Here is the code for converting "String" to "Base64".***
    listFile.forEach(element => {
      if (element !== '') {
        let url = urlFolder + element;
        const toDataURL = (url: any) => fetch(url)
          .then(response => response.blob())
          .then(blob => new Promise((resolve, reject) => {
            const reader = new FileReader();
            reader.onloadend = () => resolve(reader.result);
            reader.onerror = reject;
            reader.readAsDataURL(blob);
          }));

        // *** Calling both function ***
        toDataURL(url).then(dataUrl => {
          let fileData = dataURLtoFile(dataUrl, element);
          file.push(fileData);
        });

        // ***Here is code for converting "Base64" to javascript "File Object".***
        function dataURLtoFile(dataurl: any, filename: any) {
          let arr = dataurl.split(','), mime = arr[0].match(/:(.*?);/)[1],
            bstr = atob(arr[1]),
            n = bstr.length,
            u8arr = new Uint8Array(n);
          while (n--) {
            u8arr[n] = bstr.charCodeAt(n);
          }
          return new File([u8arr], filename, { type: mime });
        }
      }
    });
  }
  // End Converting "String" to javascript "File Object"



  /**
   * Lấy tất cả danh sách Tháng trong năm
   */
  getFullMonths(): KeyValuePair[] {
    let numbers = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12];
    return numbers.map(number => {
      return {
        key: number,
        value: number.toString().split('').length == 1 ? `Tháng 0${number}` : `Tháng ${number}`
      }
    })
  }

  separatorDotFileName(fileName: string): string {
    let maxLength = 35;
    let file = fileName.split(/\.(?=[^\.]+$)/);
    let arr = file[0].split('');
    return arr.length > maxLength ? `${arr.filter((x, i) => i <= maxLength).join('')}... .${file[1]}` : fileName;
  }

  separatorDot(value: string, maxLength?: number) {
    let defaultMaxLength = maxLength ?? 35;
    let arr = value.split('');
    return arr.length > defaultMaxLength ? `${arr.filter((x, i) => i <= maxLength).join('')}...` : value;
  }
}
