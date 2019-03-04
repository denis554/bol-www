import { Injectable } from '@angular/core';
import * as Bluebird from 'bluebird';
import { HttpClient } from '@angular/common/http';


/**
 * An act of protest against the angular team choosing observables over promises for http requests.
 * An observable is an ongoing stream of data. Http requests are finite. Makes NO SENSE.
 */
@Injectable()
export class PromisedHttpService {

    constructor(private httpClient: HttpClient) {
    }

    get(url, config?: Object): Bluebird<any> {
        return new Bluebird((resolve, reject) => {
            return this.httpClient.get(url, config).toPromise().then((response) => {
                resolve(response);
            }).catch((err) => {
                reject(err);
            })
        })
    }

    post(url, body?, config?: Object): Bluebird<any> {
        return new Bluebird((resolve, reject) => {
            return this.httpClient.post(url, body, config).toPromise().then((response) => {
                resolve(response);
            }).catch((err) => {
                reject(err);
            })
        })
    }


    put(url, body?, config?: Object): Bluebird<any> {
        return new Bluebird((resolve, reject) => {
            return this.httpClient.put(url, body, config).toPromise().then((response) => {
                resolve(response);
            }).catch((err) => {
                reject(err);
            })
        })
    }
}
