import {loginModel, testModel, questionModel, grammarModel, wordModel} from './models.js';
import {loginData, historyData, videoData, questionData, listData, grammarData, wordData} from './data.js';

//CONTROLLERS
export class loginController{
    constructor(){
        this.lm = new loginModel("","","");
        this.ld = new loginData();
        this.doLogin =  async function(mail, pass){
             //return new Promise(resolve => {
                 this.lm.mail=mail;
            this.lm.pass=pass;
            return await this.ld.doLogin(this.lm);
            //return result;
           // resolve(result);
            //     });
            
        }

        this.doSignUp =  async function(mail, pass, name){
            //return new Promise(resolve => {
                this.lm.mail=mail;
                this.lm.pass=pass;
                this.lm.name=name;
                return await this.ld.doSignUp(this.lm);
       }
    }
}

export class testController{
    constructor(){
        //this.qm = new questionModel("","","");
        this.qd = new questionData();
        this.nextWord =  async function(ml){
             //return new Promise(resolve => {
                 
            var result =  await this.qd.nextWord(ml);
            var questionData = JSON.parse(result);
            var qm = new questionModel(questionData[0].word,questionData[0].translation,questionData[1].translation,questionData[2].translation,questionData[3].translation);
            return qm;
            //return result;
           // resolve(result);
            //     });
            
        };
        this.saveTest =  async function(mail, correct, total){
             //return new Promise(resolve => {
            var result = await this.qd.saveTest(mail, correct, total);
            return result;
            //return result;
           // resolve(result);
            //     });
            
        };
    }
}

export class historyController{
    constructor(){
        //this.qm = new questionModel("","","");
        this.hd = new historyData();
        this.getTests =  async function(mail){
             //return new Promise(resolve => {
            var result= await this.hd.getTests(mail);
            var completeList = JSON.parse(result); 
            var list=[];
                var lists=[];
                var totalCorrects=0;
                var totalQuestions=0;
                for(var i=0;i<completeList.length;i++){
                    totalCorrects+=Number(completeList[i].correct_questions);
                    totalQuestions+=Number(completeList[i].total_questions);
                    list.push(new testModel(completeList[i].date_test, completeList[i].correct_questions,completeList[i].total_questions));
                    if(list.length==10 || i==(completeList.length-1)){
                        lists.push(list);
                        list=[];
                    }
                }
                
                return {list: lists, size: completeList.length, totalCorrects: totalCorrects, totalQuestions: totalQuestions};
            //return result;
           // resolve(result);
            //     });
            
        };
    }
}

export class videoController{
    constructor(){
        //this.qm = new questionModel("","","");
        this.vd = new videoData();
        this.getCurrentVideo =  async function(mail){
             //return new Promise(resolve => {
            var result0= await this.vd.getCurrentVideo(mail);
                 var result = JSON.parse(result0);
                return result[0];
            //return result;
           // resolve(result);
            //     });
            
        };
        this.changeVideo =  async function(mail, sum){
             //return new Promise(resolve => {
            var result0= await this.vd.changeVideo(mail, sum);
                 var result = JSON.parse(result0);
                return result[0];
            //return result;
           // resolve(result);
            //     });
            
        };
    }
}

export class listController{
    constructor(){
        //this.qm = new questionModel("","","");
        this.ld = new listData();
        
        this.getList =  async function(mail){
            var result= await this.ld.getList(mail);
            var completeList = result; 
            return completeList;
       };
       this.saveList =  function(mail, completeList){
        var result= this.ld.saveList(mail, completeList);
   };
   this.getRepeated =  async function(listWords, mail){
   var result= await this.ld.getRepeated(listWords, mail);
   var completeList = JSON.parse(result);
       return completeList;
    };
    }
}

export class grammarController{
    constructor(){
        this.gm = new grammarModel("","");
        this.gd = new grammarData();
        this.createTopic =  async function(topic, link, topicLevel){
             //return new Promise(resolve => {
            this.gm.topic=topic;
            this.gm.link=link;
            this.gm.topicLevel=topicLevel;
            return await this.gd.createTopic(this.gm);
            //return result;
           // resolve(result);
            //     });
            
        };
        
        this.updateTopic =  async function(topic, link, topicLevel){
             //return new Promise(resolve => {
            this.gm.topic=topic;
            this.gm.link=link;
            this.gm.topicLevel=topicLevel;
            return await this.gd.updateTopic(this.gm);
            //return result;
           // resolve(result);
            //     });
        };
        
        this.getTopics =  async function(checked){
             //return new Promise(resolve => {
            var result= await this.gd.getTopics(checked);
            var completeList = JSON.parse(result); 
            var list=[];
                var lists=[];
                for(var i=0;i<completeList.length;i++){
                    list.push(completeList[i]);
                    if(list.length==10 || i==(completeList.length-1)){
                        lists.push(list);
                        list=[];
                    }
                }
                return {list: lists, size: completeList.length};
            //return result;
           // resolve(result);
            //     });
            
        };
        
        this.searchTopics =  async function(topic, link, tSearch, topicLevel){
            var result= await this.gd.searchTopics(topic, link, tSearch, topicLevel);
            var completeList = JSON.parse(result); 
            var list=[];
                var lists=[];
                for(var i=0;i<completeList.length;i++){
                    list.push(completeList[i]);
                    if(list.length==10 || i==(completeList.length-1)){
                        lists.push(list);
                        list=[];
                    }
                }
                return {list: lists, size: completeList.length};
        };

        this.randomTopics =  async function(quantity, listLevel){
            var result= await this.gd.randomTopics(quantity, listLevel);
            var completeList = JSON.parse(result); 
            var list=[];
                var lists=[];
                for(var i=0;i<completeList.length;i++){
                    list.push(completeList[i]);
                    if(list.length==10 || i==(completeList.length-1)){
                        lists.push(list);
                        list=[];
                    }
                }
                return {list: lists, size: completeList.length};
        };
        
        this.deleteTopic =  async function(topic){
                this.gm.topic=topic;
                return await this.gd.deleteTopic(this.gm);
                
        };
    }
}

export class wordController{
    constructor(){
        this.wm = new wordModel("","","");
        this.wd = new wordData();
        this.createWord =  async function(mail, word, translation){
             //return new Promise(resolve => {
                 this.wm.mail=mail;
            this.wm.word=word;
            this.wm.translation=translation;
            return await this.wd.createWord(this.wm);
            //return result;
           // resolve(result);
            //     });
            
        };
        
        this.updateWord =  async function(mail, word, translation){
             //return new Promise(resolve => {
                 this.wm.mail=mail;
            this.wm.word=word;
            this.wm.translation=translation;
            return await this.wd.updateWord(this.wm);
            //return result;
           // resolve(result);
            //     });
            
        };
        
        this.getWords =  async function(mail, checked){
             //return new Promise(resolve => {
                 this.wm.mail=mail;
            var result= await this.wd.getWords(this.wm, checked);
            var completeList = JSON.parse(result); 
            var list=[];
                var lists=[];
                for(var i=0;i<completeList.length;i++){
                    list.push(completeList[i]);
                    if(list.length==10 || i==(completeList.length-1)){
                        lists.push(list);
                        list=[];
                    }
                }
                return {list: lists, size: completeList.length};
            //return result;
           // resolve(result);
            //     });
            
        };
        
        this.searchWords =  async function(mail, word, translation, tSearch){
             //return new Promise(resolve => {
            var result= await this.wd.searchWords(mail, word, translation, tSearch);
            var completeList = JSON.parse(result); 
            var list=[];
                var lists=[];
                for(var i=0;i<completeList.length;i++){
                    list.push(completeList[i]);
                    if(list.length==10 || i==(completeList.length-1)){
                        lists.push(list);
                        list=[];
                    }
                }
                return {list: lists, size: completeList.length};
            //return result;
           // resolve(result);
            //     });
            
        };
        
        this.deleteWord =  async function(mail, word){
            this.wm.mail=mail;
            this.wm.word=word;
            return await this.wd.deleteWord(this.wm);
        };
    }
}