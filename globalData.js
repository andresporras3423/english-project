export var globalData = 
{
    userMail:"",
    activeColor: function(correct, questions){
                if(correct/questions<=0.8){
                    var red=Math.round((correct/questions)*255/0.8);
                    return 'rgb(255,'+red+',0)';
                }
                else{
                    var green=255-Math.round(((correct/questions)-0.8)*255/0.2);
                    return 'rgb('+green+',255,0)';
                }
            },
    urlVideo:"",
    numberVideo:0
};