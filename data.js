

//DATA
export class loginData{
    constructor(){
        this.doLogin =  function(lm){
            return new Promise(resolve => {
                 var obj = {mail:lm.mail, pass:lm.pass};
            $.ajax({
                crossDomain: true,
                url:"index.php", 
                type: "post", 
               data: {postmethod: "doLogin", postparams: JSON.stringify(obj)},
                success:function(result){
                resolve(result);
               }
             });
                
            
                 });
            
        };
        this.doSignUp =  function(lm){
            return new Promise(resolve => {
                 var obj = {mail:lm.mail, pass:lm.pass, name: lm.name};
            $.ajax({
                crossDomain: true,
                url:"index.php", 
                type: "post", 
               data: {postmethod: "doSignUp", postparams: JSON.stringify(obj)},
                success:function(result){
                resolve(result);
               }
             });
                
            
                 });
            
        };
    }
}

export class historyData{
    constructor(){
        this.getTests =  function(mail){
            return new Promise(resolve => {
                 var obj = {mail:mail};
            $.ajax({
                crossDomain: true,
                url:"index.php", 
                type: "post", 
               data: {postmethod: "getTests", postparams: JSON.stringify(obj)},
                success:function(result){
                resolve(result);
               }
             });
                
            
                 });
            
        };
    }
}

export class videoData{
    constructor(){
        this.getCurrentVideo =  function(mail){
            return new Promise(resolve => {
                 var obj = {mail:mail};
            $.ajax({
                crossDomain: true,
                url:"index.php", 
                type: "post", 
               data: {postmethod: "getCurrentVideo", postparams: JSON.stringify(obj)},
                success:function(result){
                resolve(result);
               }
             });
                
            
                 });
            
        };
        this.changeVideo =  function(mail, sum){
            return new Promise(resolve => {
                 var obj = {mail:mail, sum:sum};
            $.ajax({
                crossDomain: true,
                url:"index.php", 
                type: "post", 
               data: {postmethod: "changeVideo", postparams: JSON.stringify(obj)},
                success:function(result){
                resolve(result);
               }
             });
                
            
                 });
            
        };
    }
}

export class questionData{
    constructor(){
        this.nextWord =  function(ml){
            return new Promise(resolve => {
                 var obj = {mail:ml};
            $.ajax({
                crossDomain: true,
                url:"index.php", 
                type: "post", 
               data: {postmethod: "nextWord", postparams: JSON.stringify(obj)},
                success:function(result){
                resolve(result);
               }
             });
                
            
                 });
            
        };
        
        this.saveTest =  function(mail, correct, total){
            return new Promise(resolve => {
                 var obj = {mail:mail, correct: correct, total:total};
            $.ajax({
                crossDomain: true,
                url:"index.php", 
                type: "post", 
               data: {postmethod: "saveTest", postparams: JSON.stringify(obj)},
                success:function(result){
                resolve(result);
               }
             });
                
            
                 });
            
        };
    }
}

export class listData{
    constructor(){
        this.getList =  function(mail){
            return new Promise(resolve => {
                 var obj = {mail:mail};
            $.ajax({
                crossDomain: true,
                url:"index.php", 
                type: "post", 
               data: {postmethod: "getList", postparams: JSON.stringify(obj)},
                success:function(result){
                resolve(result);
               }
             });
                 });
        };
        this.saveList =  function(mail, completeList){
            return new Promise(resolve => {
                 var obj = {mail: mail, completeList:completeList};
            $.ajax({
                crossDomain: true,
                url:"index.php", 
                type: "post", 
               data: {postmethod: "saveList", postparams: JSON.stringify(obj)},
                success:function(result){
                resolve(result);
               }
             });
                 });
        };

        this.getRepeated =  function(listWords, mail){
            return new Promise(resolve => {
                 var obj = {listWords:listWords, mail: mail};
            $.ajax({
                crossDomain: true,
                url:"index.php", 
                type: "post", 
               data: {postmethod: "getRepeated", postparams: JSON.stringify(obj)},
                success:function(result){
                resolve(result);
               }
             });
                 });
        };
    }
}

export class grammarData{
    constructor(){
        this.createTopic =  function(gm){
            return new Promise(resolve => {
                 var obj = {topic:gm.topic, link: gm.link, topicLevel:gm.topicLevel};
            $.ajax({
                crossDomain: true,
                url:"index.php", 
                type: "post", 
               data: {postmethod: "createTopic", postparams: JSON.stringify(obj)},
                success:function(result){
                resolve(result);
               }
             });
                 });
            
        };
        
        this.updateTopic =  function(gm){
            return new Promise(resolve => {
                 var obj = {topic:gm.topic, link: gm.link, topicLevel:gm.topicLevel};
            $.ajax({
                crossDomain: true,
                url:"index.php", 
                type: "post", 
               data: {postmethod: "updateTopic", postparams: JSON.stringify(obj)},
                success:function(result){
                resolve(result);
               }
             });
                
            
                 });
            
        };
        
        this.getTopics =  function(ch){
            return new Promise(resolve => {
                 var obj = {checked: ch};
            $.ajax({
                crossDomain: true,
                url:"index.php", 
                type: "post", 
               data: {postmethod: "getTopics", postparams: JSON.stringify(obj)},
                success:function(result){
                resolve(result);
               }
             });
                 });
            
        };
        
        this.searchTopics =  function(topic, link, tSearch, topicLevel){
            return new Promise(resolve => {
                 var obj = {topic: topic, link: link, tSearch: tSearch, topicLevel:topicLevel};
            $.ajax({
                crossDomain: true,
                url:"index.php", 
                type: "post", 
               data: {postmethod: "searchTopics", postparams: JSON.stringify(obj)},
                success:function(result){
                resolve(result);
               }
             });
                 });
        };

        this.randomTopics =  function(quantity, listLevel){
            return new Promise(resolve => {
                 var obj = {quantity: quantity, listLevel: JSON.stringify(listLevel)};
            $.ajax({
                crossDomain: true,
                url:"index.php", 
                type: "post", 
               data: {postmethod: "randomTopics", postparams: JSON.stringify(obj)},
                success:function(result){
                resolve(result);
               }
             });
                 });
        };
        
        this.deleteTopic =  function(gm){
            return new Promise(resolve => {
                 var obj = {topic:gm.topic};
            $.ajax({
                crossDomain: true,
                url:"index.php", 
                type: "post", 
               data: {postmethod: "deleteTopic", postparams: JSON.stringify(obj)},
                success:function(result){
                resolve(result);
               }
             });
                 });
        };
    }
}

export class wordData{
    constructor(){
        this.createWord =  function(wm){
            return new Promise(resolve => {
                 var obj = {mail:wm.mail, word:wm.word, translation: wm.translation};
            $.ajax({
                crossDomain: true,
                url:"index.php", 
                type: "post", 
               data: {postmethod: "createWord", postparams: JSON.stringify(obj)},
                success:function(result){
                resolve(result);
               }
             });
                
            
                 });
            
        };
        
        this.updateWord =  function(wm){
            return new Promise(resolve => {
                 var obj = {mail:wm.mail, word:wm.word, translation: wm.translation};
            $.ajax({
                crossDomain: true,
                url:"index.php", 
                type: "post", 
               data: {postmethod: "updateWord", postparams: JSON.stringify(obj)},
                success:function(result){
                resolve(result);
               }
             });
                
            
                 });
            
        };
        
        this.getWords =  function(wm, ch){
            return new Promise(resolve => {
                 var obj = {mail:wm.mail, checked: ch};
            $.ajax({
                crossDomain: true,
                url:"index.php", 
                type: "post", 
               data: {postmethod: "getWords", postparams: JSON.stringify(obj)},
                success:function(result){
                resolve(result);
               }
             });
                
            
                 });
            
        };
        
        this.searchWords =  function(mail, word, translation, tSearch){
            return new Promise(resolve => {
                 var obj = {mail:mail, word: word, translation: translation, tSearch: tSearch};
            $.ajax({
                crossDomain: true,
                url:"index.php", 
                type: "post", 
               data: {postmethod: "searchWords", postparams: JSON.stringify(obj)},
                success:function(result){
                resolve(result);
               }
             });
                
            
                 });
            
        };
        
        this.deleteWord =  function(wm){
            return new Promise(resolve => {
                 var obj = {mail:wm.mail, word:wm.word};
            $.ajax({
                crossDomain: true,
                url:"index.php", 
                type: "post", 
               data: {postmethod: "deleteWord", postparams: JSON.stringify(obj)},
                success:function(result){
                resolve(result);
               }
             });
                
            
                 });
            
        };
    }
}