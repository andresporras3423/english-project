import {globalData} from './globalData.js';
import {loginController, testController, historyController, videoController, listController, grammarController, wordController} from './controllers.js'

//VIEWS
//var appView = new Vue(
 //   {
   //     el:'#app'
    //}
    //);
    


var loginView = Vue.component('login-component',(
    {
        name:'login-component',
        created: function(){
            this.currentView=true;
            
            
        },
        watch:{
            currentView(){
                if(this.currentView){
                    this.lController = new loginController();
                }
            }
        },
        data:function(){
            return {
                mail:"",
                name: "",
            pass:"",
            passConfirm: "",
            currentView:null,
            lController:null,
            message: "",
            visibleMessage:false,
            colorClass:["redClass","yellowClass","greenClass"],
            colorOpt:0,
            loginTab: 0,
            loginDecorator: 'loginDecorator'
            }
        },
        methods:{
            login: async function(){
                if(this.loginTab==0){
                    var result = await this.lController.doLogin(this.mail,this.pass);
                    if(result=="1"){
                        globalData.userMail=this.mail;
                        this.$eventBus.$emit('loginFalse', false);
                    }
                    else{
                        this.message="invalid login";
                        this.visibleMessage=true;
                        this.colorOpt=0;
                    }
                }
               else{
                if (this.pass!=this.passConfirm){
                    this.message="password and password confirmation are not equal";
                    this.visibleMessage=true;
                    this.colorOpt=0;
                }
                else{
                    var result = await this.lController.doSignUp(this.mail,this.pass, this.name);
                if(result=="1"){
                    globalData.userMail=this.mail;
                    this.$eventBus.$emit('loginFalse', false);
                }
                else{
                    this.message="invalid sign up";
                    this.visibleMessage=true;
                    this.colorOpt=0;
                }
                }
               }
                console.log("click in login");
            },
            updateLink(index){
                this.loginTab = index;
                this.mail="";
                this.pass="";
                this.passConfirm= "";
            }
        }
    }
));

var navBarView = Vue.component('navbar-component',(
    {
        name:'barnav-component',
        created: async function(){
            this.currentView=true;
            this.vController = new videoController();
            var video = await this.vController.getCurrentVideo(globalData.userMail);
             globalData.urlVideo = video.url_video;
            globalData.numberVideo = video.number_video;
            
        },
        watch:{
            currentView(){
                
            }
        },
        data:function(){
            return {
               currentView:null,
                gFactory:null,
                currentTab:0,
                linkBackColor:'linkBackColor',
                vController: null
            }
        },
        methods:{
            exit:function(){
                this.$eventBus.$emit('loginFalse', true);
            },
            newTab:function(n){
                this.currentTab=n;
            },
            reloadVideoComponent: async function(){
                this.currentTab=-1;
                await new Promise(resolve => setTimeout(resolve, 100));
                this.currentTab=3;
            },
            isAdmin:function(){
                if(globalData.userMail=="oscarporras02@gmail.com" || globalData.userMail=='jenny'){
                    return true;
                }
                return false;
            }
        }
    }
));

var testView = Vue.component('test-component',(
    {
        name:'test-component',
        created: async function(){
            this.tController = new testController();
            await this.nextWord();
        },
        watch:{
        },
        data:function(){
            return {
                nQuestions:100,
                nQuestion:0,
                tController: null,
                currentQuestion:null,
                checked:-2,
                correct:0,
                arrow:0,
                currentMessage:"",
                colorClass:["redBackColor","yellowBackColor","greenBackColor", ""],
                nColor:1,
            }
        },
  mounted () {
  document.addEventListener("keyup", this.keyEvent);
  },
        methods:{
            nextWord: async function(){
                
                if(this.checked!=-1){
                    this.checked=-1;
                    this.currentQuestion = await this.tController.nextWord(globalData.userMail); 
                   if(this.nQuestion==this.nQuestions){
                    await this.tController.saveTest(globalData.userMail, this.correct, this.nQuestions);
                    window.alert("You get a score of "+this.correct+" of "+this.nQuestion);
                    this.cleanExam();
                }
                this.nQuestion++;
                this.currentMessage="";
                this.nColor = 3;
                }
                else{
                 this.currentMessage="please choose an option";
                 this.nColor = 1;
                }
                
            },
            updateSol: function(index){
               if(this.checked==-1){
                    this.checked=index;
                    this.correct = this.correct+(this.currentQuestion.opts[index]==this.currentQuestion.sol?1:0);
                }
            },
            colorOpt: function(index){
                var classes=[];
                if(this.checked!=-1){
                   if(this.currentQuestion.opts[index]==this.currentQuestion.sol){
                       
                    classes.push("greenBackColor");
                }
                else if(this.currentQuestion.opts[index]!=this.currentQuestion.sol && this.checked==index){
                    classes.push("redBackColor");
                } 
                }
                classes.push(index==this.arrow?"borderClass":"");
                return classes;
            },
            cleanExam:  function(){
                this.nQuestion=0;
                this.correct=0;
            },
            reloadExam: async function(){
                this.cleanExam();
                this.nQuestion=1;
                await this.nextWord();
            },
            keyEvent: function(event){
                if((event.keyCode==38 || event.keyCode==87) && this.arrow!=0){
                    this.arrow--;
                }
                else if((event.keyCode==40 || event.keyCode==83) && this.arrow!=3){
                    this.arrow++;
                }
                else if(event.keyCode==13){
                    this.updateSol(this.arrow);
                    this.colorOpt(this.arrow);
                }
                else if(event.keyCode==39 || event.keyCode==68){
                    this.nextWord();
                }
            },
            activeColor: function(){
                return globalData.activeColor(this.correct, this.nQuestion);
            }
            
        }
    }
));

var historyView = Vue.component('history-component',(
    {
        name:'history-component',
        created: async function(){
            this.hController = new historyController();
            var info = await this.hController.getTests(globalData.userMail);
            this.listTests = info.list;
            this.totalTests = info.size;
            this.totalCorrects = info.totalCorrects;
            this.totalQuestions = info.totalQuestions;
        },
        watch:{
        },
        data:function(){
            return {
                listTests:[],
                currentPage:0,
                hController:null,
                totalTests:0,
                totalCorrects:0,
                totalQuestions:0
            }
        },
        methods:{
            goFirst: function(){
                this.currentPage=0;
            },
            goNext: function(){
                if(this.currentPage<(this.listTests.length-1)){
                    this.currentPage++;
                }
            },
            goBack: function(){
                if(this.currentPage>0){
                    this.currentPage--;
                }
            },
            goLast: function(){
                this.currentPage=this.listTests.length-1;
            }
            ,
            colorOpt: function(correct, total){
                if((correct/total)>0.9){
                       
                    return "greenBackColor";
                }
                else if((correct/total)>0.7){
                    return "yellowBackColor";
                }
                else{
                    return "redBackColor";
                } 
            },
            activeColor: function(correct, questions){
                return globalData.activeColor(correct, questions);
            }
        }
    }
));

var videoView = Vue.component('video-component',(
    {
        name:'video-component',
        created: async function(){
            this.vController = new videoController();
            this.currentView=true;
            this.updateVideo();
        },
        watch:{
        },
        data:function(){
            return {
                url:globalData.urlVideo,
                number:globalData.numberVideo,
                currentView:null,
                vController:null,
                
            }
        },
        methods:{
            changeVideo: async function(sum){
                var videoData = await this.vController.changeVideo(globalData.userMail,sum);
                globalData.urlVideo=videoData.url_video;
                globalData.numberVideo=videoData.number_video;
                this.$parent.reloadVideoComponent();
            },
            updateVideo: async function(){
                await new Promise(resolve => setTimeout(resolve, 1000));
               var vid = document.getElementById("myVideo");
                vid.playbackRate = 2.0;

            }
        }
    }
));


var phrasesView = Vue.component('phrases-component',(
    {
        name:'phrases-component',
        created: async function(){
            this.vController = new videoController();
            this.currentView=true;
            this.updateVideo();
        },
        watch:{
        },
        data:function(){
            return {
                url:globalData.urlVideo,
                number:globalData.numberVideo,
                currentView:null,
                vController:null,
                
            }
        },
        methods:{
            changeVideo: async function(sum){
                var videoData = await this.vController.changeVideo(globalData.userMail,sum);
                globalData.urlVideo=videoData.url_video;
                globalData.numberVideo=videoData.number_video;
                this.$parent.reloadVideoComponent();
            },
            updateVideo: async function(){
                await new Promise(resolve => setTimeout(resolve, 1000));
               var vid = document.getElementById("myVideo");
                vid.playbackRate = 2.0;

            }
        }
    }
));

var listView = Vue.component('list-component',(
    {
        name:'list-component',
        created: async function(){
            this.lController = new listController();
           await this.getList();
        },
        watch:{
            completeList: function(newValue, oldValue){
                if(newValue!=oldValue && newValue!=undefined && newValue!=null){
                    
                    this.saveList();
                }
            }
        },
        data:function(){
            return{
           completeList:"",
           lController: null,
           htmlList:"",
           size:0,
           showRepeated:false,
           countRepeated:0
            }
            
        },
        methods:{
            getList: async function(){
                this.completeList = await this.lController.getList(globalData.userMail); 
                  
           },
           saveList: function(){
            this.lController.saveList(globalData.userMail, this.completeList);
       },
       getRepeated: async function(){
           if(!this.showRepeated){
            var tempList = this.completeList.split(/\r?\n/);
            this.htmlList= await this.lController.getRepeated(tempList, globalData.userMail);
            this.countRepeated = (this.htmlList).filter(word=> word.repeated==1).length;
            this.showRepeated = true;
           }
           else{
            this.showRepeated = false;
           }
        
   },
   delRepeated: async function(){
    var tempList = this.completeList.split(/\r?\n/);
    this.completeList = (await this.lController.getRepeated(tempList, globalData.userMail)).filter( word => word.repeated==0).map(word=>word.word).join("\n");

    this.showRepeated = false;
}
        }
    }
));

var grammarView = Vue.component('grammar-component',(
    {
        name:'grammar-component',
        created: async function(){
            this.gController = new grammarController();
           await this.getData();
           this.$refs.topic.focus();
        },
        watch:{
        },
        data:function(){
            return{
            listTopics:[],
            completeList:[],
            link:"",
            topic: "",
            disabled: false,
            editing: -1,
            currentView:null,
            gController: null,
            currentItem:0,
            size:0,
            messageData:"",
            colorClass:["redBackColor","yellowBackColor","greenBackColor", ""],
            colorOpt:3,
            checked:0,
            tSearch:0,
            quantity:1,
            topicLevel:-1,
            listLevel: [{index:3, name:"B1", clicked:false},{index:4, name:"B2", clicked:false},{index:5, name:"C1", clicked:false}]
            }
            
        },
        methods:{
            createTopic: async function(){
                if( this.topic=='' || this.link=='' || this.topicLevel==-1){
                    this.messageData="please, complete all the form";
                        this.colorOpt=1;
                }
                else if(this.editing==-1){
                    var result = await this.gController.createTopic(this.topic,this.link, this.topicLevel);
                    if(result=="1"){
                        this.messageData="topic successfully saved";
                        this.colorOpt=2;
                    }
                    else if(result==""){
                        this.messageData="topic had been already saved";
                        this.colorOpt=1;
                    }
                    else{
                        this.messageData="a problem happened";
                        this.colorOpt=0;
                    }
                    await this.getData();
                }
                else{
                    var result = await this.gController.updateTopic(this.topic,this.link, this.topicLevel);
                    if(result=="1"){
                        this.messageData="word successfully updated";
                        this.colorOpt=2;
                    }
                    else{
                        this.messageData="a problem happened";
                        this.colorOpt=0;
                    }
                    await this.getData();
                }
                this.clearData();
                this.$refs.topic.focus();
            },
            readTopic: function(index){
                this.completeForm(this.listTopics[this.currentItem][index].topic, this.listTopics[this.currentItem][index].link, this.listTopics[this.currentItem][index].topicLevel);
                this.disabled=true;
            },
            updateTopic: function(index){
                this.completeForm(this.listTopics[this.currentItem][index].topic, this.listTopics[this.currentItem][index].link, this.listTopics[this.currentItem][index].topicLevel);
                this.editing=index;
            },
            deleteTopic: async function(index){
                var r = confirm("do you really want to delete this topic?");
                if (r == true) {
                    var result = await this.gController.deleteTopic(this.listTopics[this.currentItem][index].topic);
                if(result=="1"){
                        this.messageData="word successfully deleted";
                        this.colorOpt=2;
                    }
                    else{
                        this.messageData="a problem happened";
                        this.colorOpt=0;
                    }
                await this.getData();
                this.clearData();
                } 
            },
            completeForm: function(nTopic, nLink, nTopicLevel){
                this.topic=nTopic;
                this.link=nLink;
                this.topicLevel=nTopicLevel;
                this.disabled=false;
                this.editing=-1;
            },
            clearData: function(){
                this.completeForm("","", -1);
            },
            goFirst: function(){
                this.currentItem=0;
            },
            goNext: function(){
                if(this.currentItem<(this.completeList.length-1)){
                    this.currentItem++;
                }
            },
            goBack: function(){
                if(this.currentItem>0){
                    this.currentItem--;
                }
            },
            goLast: function(){
                this.currentItem=this.completeList.length-1;
            },
            getData: async function(){
                 var data = await this.gController.getTopics(this.checked); 
                 this.completeList = data.list;
                 this.size=data.size;
                this.listTopics= this.completeList;
                this.currentItem=0;
            },
            changeSort: function(ch){
                this.checked=ch;
                this.getData();
            },
            searchTopics: async function(){
                var data = await this.gController.searchTopics(this.topic,this.link, this.tSearch, this.topicLevel);
                this.completeList = data.list;
                 this.size=data.size;
                this.listTopics= this.completeList;
                this.currentItem=0;
            },
            randomTopics: async function(){
                var data = await this.gController.randomTopics(this.quantity, this.listLevel);
                this.completeList = data.list;
                 this.size=data.size;
                this.listTopics= this.completeList;
                this.currentItem=0;
            },
            updateListRandom: function(i){
                this.listLevel[i].clicked = !this.listLevel[i].clicked;
            }
        }
    }
));


var dictionaryView = Vue.component('dictionary-component',(
    {
        name:'dictionary-component',
        created: async function(){
            this.wController = new wordController();
           await this.getData();
           this.$refs.word.focus();
        },
        watch:{
        },
        data:function(){
            return{
            listWords:[],
            completeList:[],
            translation:"",
            word: "",
            disabled: false,
            editing: -1,
            currentView:null,
            wController: null,
            currentItem:0,
            size:0,
            messageData:"",
            colorClass:["redBackColor","yellowBackColor","greenBackColor", ""],
            colorOpt:3,
            checked:0,
            tSearch:0
            }
            
        },
        methods:{
            createWord: async function(){
                if( this.word==0 || this.translation==0){
                    this.messageData="please, complete all the form";
                        this.colorOpt=1;
                }
                else if(this.editing==-1){
                    var result = await this.wController.createWord(globalData.userMail, this.word,this.translation);
                    if(result=="1"){
                        this.messageData="word successfully saved";
                        this.colorOpt=2;
                    }
                    else if(result==""){
                        this.messageData="word had been already saved";
                        this.colorOpt=1;
                    }
                    else{
                        this.messageData="a problem happened";
                        this.colorOpt=0;
                    }
                    await this.getData();
                }
                else{
                    var result = await this.wController.updateWord(globalData.userMail, this.word,this.translation);
                    if(result=="1"){
                        this.messageData="word successfully updated";
                        this.colorOpt=2;
                    }
                    else{
                        this.messageData="a problem happened";
                        this.colorOpt=0;
                    }
                    await this.getData();
                }
                this.clearData();
                this.$refs.word.focus();
            },
            readWord: function(index){
                this.completeForm(this.listWords[this.currentItem][index].word, this.listWords[this.currentItem][index].translation);
                this.disabled=true;
            },
            updateWord: function(index){
                this.completeForm(this.listWords[this.currentItem][index].word, this.listWords[this.currentItem][index].translation);
                this.editing=index;
            },
            deleteWord: async function(index){
                var r = confirm("do you really want to delete this word?");
                if (r == true) {
                    var result = await this.wController.deleteWord(globalData.userMail, this.listWords[this.currentItem][index].word);
                if(result=="1"){
                        this.messageData="word successfully deleted";
                        this.colorOpt=2;
                    }
                    else{
                        this.messageData="a problem happened";
                        this.colorOpt=0;
                    }
                await this.getData();
                this.clearData();
                }
                
            },
            completeForm: function(nWord, nTranslation){
                this.word=nWord;
                this.translation=nTranslation;
                this.disabled=false;
                this.editing=-1;
            },
            clearData: function(){
                this.completeForm("","");
            },
            goFirst: function(){
                this.currentItem=0;
            },
            goNext: function(){
                if(this.currentItem<(this.completeList.length-1)){
                    this.currentItem++;
                }
            },
            goBack: function(){
                if(this.currentItem>0){
                    this.currentItem--;
                }
            },
            goLast: function(){
                this.currentItem=this.completeList.length-1;
            },
            getData: async function(){
                 var data = await this.wController.getWords(globalData.userMail, this.checked); 
                 this.completeList = data.list;
                 this.size=data.size;
                this.listWords= this.completeList;
                this.currentItem=0;
            },
            changeSort: function(ch){
                this.checked=ch;
                this.getData();
            },
            searchWords: async function(){
                var data = await this.wController.searchWords(globalData.userMail, this.word,this.translation, this.tSearch);
                this.completeList = data.list;
                 this.size=data.size;
                this.listWords= this.completeList;
                this.currentItem=0;
            }
        }
    }
));

Vue.prototype.$eventBus = new Vue();

var app = new Vue({
      el: '#app',
      created: function(){
        this.$eventBus.$on('loginFalse', (nValue) => {
            this.showLogin=nValue;
});  
      },
      data:{
          showLogin:true
      }
    });
//USEFUL LINKS
//https://vuejsdevelopers.com/2017/03/24/vue-js-component-templates/ different ways to add a component