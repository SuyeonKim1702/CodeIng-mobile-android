export class Qna {
    qnaIdx: number;
    qnaTitle: string;
    qnaDes: string;
    likesCount: number;
    createdAt: string;


    constructor(qnaIdx: number, qnaTitle: string, qnaDes: string, likesCount: number, createdAt:string){
        this.qnaIdx = qnaIdx;
        this.qnaTitle = qnaTitle;
        this.qnaDes = qnaDes;
        this.likesCount = likesCount;
        this.createdAt = createdAt;
    }


}
