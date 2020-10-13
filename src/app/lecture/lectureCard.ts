export class lectureCard {
    lectureName: string;
    lectureIdx: number;
    siteName: string;
    thumbUrl: string;


    constructor(lectureIdx: number, lectureName: string, siteName: string, thumbUrl: string ){
        this.lectureName = lectureName;
        this.lectureIdx = lectureIdx;
        this.siteName = siteName;
        this.thumbUrl = thumbUrl;
    }


}
