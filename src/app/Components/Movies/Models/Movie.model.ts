export class Movie { // Detailed Properties
  public imdb?: string;
  public homepage?: string;
  public runtime?: number;
  public revenue?: number;
  public status?: string;
  public price?: number;
  public studios?= new Array<{ id?: number, name?: string, origin?: string }>();
  public trailers?= new Array<{ type?: string, title?: string, link?: string }>();

  constructor( // Base Properties
    public id?: number,
    public title?: string,
    public language?: string,
    public genres?: string[],
    public voteCount?: number,
    public voteAverage?: number,
    public releaseDate?: string,
    public overview?: string,
    public poster?: string,
    public backdrops?: string[]
  ) {
    // Initializing Local Data
    this.price = Number((Math.floor(Math.random() * Number((this.voteCount / 1000).toFixed(2))) + (this.voteAverage + 0.09)).toFixed(2));
  } // Constructor

  public getDate(): Date {
    return new Date(this.releaseDate);
  }
  public getYear(): number {
    return this.getDate().getFullYear();
  }
  public getShortText(trim?: number): string {
    if (this.overview) {
      if (trim) {
        return this.overview.slice(0, trim) + '..';
      }
      else {
        return this.overview.slice(0, 500) + '..';
      }
    }
  }
  public getRateStars() : number[] {
    var rateList = [];
    for (let index = 1; index <= 5 ; index++) {
      
      if (parseInt((this.voteAverage / 2).toFixed()) >= index)
      {
        rateList.push(index);
      }
      else { rateList.push(0); }
    }
    return rateList;
  }
}