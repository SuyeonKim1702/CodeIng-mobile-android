export class lectureCard {
    lectureName: string;
    lectureIdx: number;
    siteName: string;
    thumbUrl: string;
    price: string;
    rating: number;


    constructor(lectureIdx: number, lectureName: string, siteName: string, thumbUrl: string, price:string, rating:number ){
        this.lectureName = lectureName;
        this.lectureIdx = lectureIdx;
        this.siteName = siteName;
        this.thumbUrl = thumbUrl;
        this.price = price;
        this.rating = rating;
    }


}
