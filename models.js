//MODELS
export class loginModel{
    constructor(name, mail, pass){
        this.name=name;
        this.mail=mail;
        this.pass=pass;
    }
}
//helloworld
export class testModel{
    constructor(date, correct, total){
        this.date_test=date;
        this.correct_questions=correct;
        this.total_questions=total;
    }
}

export class questionModel{
    constructor(word, sol, opt2, opt3, opt4){
        this.word=word;
        this.sol=sol;
        this.opts=[sol, opt2, opt3, opt4];
        this.opts.sort();
    }
}

export class grammarModel{
    constructor(topic, link, topicLevel){
        this.topic=topic;
        this.link=link;
        this.topicLevel=topicLevel;
    }
}

export class wordModel{
    constructor(mail, word, translation){
        this.mail = mail;
        this.word=word;
        this.translation=translation;
    }
}