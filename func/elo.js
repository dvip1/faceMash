 class elo{
    constructor (rating1, rating2, whoWins){
        this.rating1= rating1;
        this.rating2= rating2;
        this.whoWins= whoWins;
    }
    get probA(){
        return 1/(1+ 10**((this.rating2-this.rating1)/400));
    }
    get probB(){
        return 1- this.probA;
    }
    get winner(){
        return (this.whoWins)?'A':'B';
    }
    get newRatingA(){
        if(this.whoWins){
            this.rating1= this.rating1+ 32*(1-this.probA);
            this.rating2= this.rating2+ 32*(0-this.probB);
        }
        else{
            this.rating2= this.rating2+ 32*(1-this.probB);
            this.rating1= this.rating1+ 32*(0-this.probA);
        }
        return parseInt(this.rating1);
    }
    get newRatingB(){
        if(this.whoWins){
            this.rating1= this.rating1+ 32*(1-this.probA);
            this.rating2= this.rating2+ 32*(0-this.probB);
        }
        else{
            this.rating2= this.rating2+ 32*(1-this.probB);
            this.rating1= this.rating1+ 32*(0-this.probA);
        }
        return parseInt(this.rating2);
    }
}
module.exports=elo;