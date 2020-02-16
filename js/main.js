'use strict';

{
    class Panel {
        constructor(){
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
            if(currentNum === parseInt(this.el.textContent, 10)){
                this.el.classList.add('pressed');
                currentNum++;

                if(currentNum === 4){
                    clearTimeout(timeoutId);
                }
            }
        }
    }

    class Board { //パネルを管理
        constructor(){　//初期化
            this.panels = [];
            for(let i = 0; i < 4; i++){
                this.panels.push(new Panel());
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
            const nums = [0, 1, 2, 3]; //配置したい数字をnumの数を定義


            this.panels.forEach(panel => {
                const num = nums.splice(Math.floor(Math.random() * nums.length), 1)[0]; //1は一つ取り出したい時、ゼロをつけて取り出したい
                panel.activate(num);
            });
        }
    }

    function runTimer(){
        const timer = document.getElementById('timer'); //timer要素の取得
        timer.textContent = ((Date.now() - startTime) / 1000).toFixed(2); //現在の時刻からstartTime押したときの時間で秒なので1000で割る

        timeoutId = setTimeout(() => {
            runTimer();　//10秒後に呼び出す
        }, 10);
    }

    const board = new Board();

    let currentNum = 0; //初期値
    let startTime;　//始めるための初期値
    let timeoutId;　//止めるための初期値

    const btn = document.getElementById('btn'); //ボタン要素を取得
    btn.addEventListener('click', () => { 
        board.activate();　//呼び出す

        startTime = Date.now(); //現在時刻の保持
        runTimer();　//タイマーを走らせる
    });
}