 class winnerLoser{
    constructor(winner){
        this.winner= winner;
    }
    get loser(){
        if(this.winner%2==0)
            return parseInt(this.winner)+1
        else 
            return parseInt(this.winner)-1;
    }
}
module.exports=winnerLoser