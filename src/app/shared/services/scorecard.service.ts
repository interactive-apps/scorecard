import { Injectable } from '@angular/core';
import {Observable} from "rxjs";
import {Http, Response} from "@angular/http";
import {Constants} from "../costants";
// Statics
import 'rxjs/add/observable/throw';

// Operators
import 'rxjs/add/operator/catch';
import 'rxjs/add/operator/debounceTime';
import 'rxjs/add/operator/distinctUntilChanged';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/switchMap';
import 'rxjs/add/operator/toPromise';

export interface ScoreCard {
  id : string;
  data: any;
}

@Injectable()
export class ScorecardService {

  _scorecards: ScoreCard[];
  private baseUrl: string;

  constructor(private http: Http, private costant: Constants) {
    this.baseUrl = this.costant.root_dir;
  }

  loadAll() {
    return this.http.get(this.baseUrl+"api/dataStore/scorecards")
      .map((response: Response) => response.json())
      .catch(this.handleError);
  }

  load(id: string ) {
    return this.http.get(`${this.baseUrl}/api/dataStore/scorecards/${id}`)
      .map((response: Response) => response.json())
      .catch(this.handleError);
  }

  // get all scorecards
  getAll(){
    this.loadAll().subscribe(
      scorecards => {
        for( let scorecard of scorecards ){
          this.load(scorecard).subscribe(
            scorecard_details => {
              this._scorecards.push({
                id: scorecard,
                data: scorecard_details
              })
            }
          )
        }
      }
    )
  }
  create(scorecard: ScoreCard) {

  }

  update(scorecard: ScoreCard) {

  }

  remove(scorecardId: string) {

  }

  private extractData(res: Response) {
    let body = res.json();
    return body.data || { };
  }

  private handleError (error: Response | any) {
    // In a real world app, we might use a remote logging infrastructure
    let errMsg: string;
    if (error instanceof Response) {
      const body = error.json() || '';
      const err = body.error || JSON.stringify(body);
      errMsg = `${error.status} - ${error.statusText || ''} ${err}`;
    } else {
      errMsg = error.message ? error.message : error.toString();
    }
    console.error(errMsg);
    return Observable.throw(errMsg);
  }

}
