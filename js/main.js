'use strict';

{
    class Panel {
        constructor(game){
            this.game = game;
            this.el = document.createElement('li');
            this.el.classList.add('pressed');
            this.el.addEventListener('click', () => { //イベントの設定
                this.check();
            });
        }
        getEl(){
            return this.el;
        }

        activate(num) {
            this.el.classList.remove('pressed');
            this.el.textContent = num;
        }

        check() {
            if(this.game.getCurrentNum() === parseInt(this.el.textContent, 10)){
                this.el.classList.add('pressed');
                this.game.addcurrentNum();

                if(this.game.getCurrentNum() === this.game.getLevel() ** 2){
                    clearTimeout(this.game.getTimeoutId());
                }
            }
        }
    }

    class Board { //パネルを管理
        constructor(game){　//初期化
            this.game = game;
            this.panels = [];
            for(let i = 0; i < this.game.getLevel() ** 2; i++){
                this.panels.push(new Panel(this.game));
            }
            this.setup();
        }

        setup(){
            const board = document.getElementById('board');　//要素を取得
            this.panels.forEach(panel => {　//パネルの数だけ要素を取得
                board.appendChild(panel.getEl()); //カプセル化
            })
        }

        activate(){
            const nums = []; //配置したい数字をnumの数を定義
            for(let i = 0; i < this.game.getLevel() ** 2; i++)[
                nums.push(i)
            ]


            this.panels.forEach(panel => {
                const num = nums.splice(Math.floor(Math.random() * nums.length), 1)[0]; //1は一つ取り出したい時、ゼロをつけて取り出したい
                panel.activate(num);
            });
        }
    }

    

    class Game {
        constructor(level) {
            this.level = level;
    this.board = new Board(this);

    this.currentNum = undefined; //初期値
    this.startTime = undefined;　//始めるための初期値
    this.timeoutId = undefined;　//止めるための初期値

    const btn = document.getElementById('btn'); //ボタン要素を取得
    btn.addEventListener('click', () => { 
        this.start();
    });
    this.setup();
        }

        setup(){
            const container = document.getElementById('container');
            const PANEL_WIDTH = 50;
            const BOARD_PADDING = 10;
            /* 50px * 2 + 10px * 2 */
            container.style.width = PANEL_WIDTH * this.level + BOARD_PADDING * 2 + 'px';
        }

        start(){
            if(typeof this.timeoutId !== 'undefined'){
                clearTimeout(this.timeoutId);
            }
    
            this.currentNum = 0;
            this.board.activate();　//呼び出す
    
            this.startTime = Date.now(); //現在時刻の保持
            this.runTimer();　//タイマーを走らせる
        }

        runTimer(){
            const timer = document.getElementById('timer'); //timer要素の取得
            timer.textContent = ((Date.now() - this.startTime) / 1000).toFixed(2); //現在の時刻からstartTime押したときの時間で秒なので1000で割る
    
            this.timeoutId = setTimeout(() => {
                this.runTimer();　//10秒後に呼び出す
            }, 10);
        }

        addcurrentNum(){
            this.currentNum++;
        }

        getCurrentNum(){
            return this.currentNum;
        }

        getTimeoutId(){
            return this.timeoutId;
        }

        getLevel(){
            return this.level;
        }
    }

    new Game(10);
}