"use strict";


// 表示したい時間と各ボタンの要素(id)を取得。
const time = document.getElementById('time');
const startButton = document.getElementById('start');
const stopButton = document.getElementById('stop');
const resetButton = document.getElementById('reset');

// スタートボタン押下時のタイムスタンプを格納。
let startTime;

// 過去の経過時間を格納。
let elapsedTime = 0;

// setTimeoutを呼び出すと、戻り値としてタイマー識別子が返される。
// このタイマー識別子をclearTimeoutへ渡す事で、関数の実行をキャンセルする。
let timeoutID;


// カウント時間を表示させる関数
function displayTime () {
  // 現在のカウント時間を取得。
  // 経過時間を加算しないと過去の経過時間が保持されず、毎回スタートボタンを押下するたびに表示時間が0になってしまう。
  const currentTime = new Date(Date.now() - startTime + elapsedTime);

  // 取得したタイムスタンプを時、分、秒、ミリ秒に変換。
  // 取得した協定世界時間の時刻と日本標準時の時刻は９時間ずれているため、getHours()で取得した時から-9時間する。
  const hr = String(currentTime.getHours()-9).padStart(2, '0');
  const min = String(currentTime.getMinutes()).padStart(2, '0');
  const sec = String(currentTime.getSeconds()).padStart(2, '0');
  const ms = String(currentTime.getMilliseconds()).padStart(3, '0');

  // デフォルトの値'00:00:00.000'を上記で取得した時間に上書き。
  time.textContent = `${hr}:${min}:${sec}.${ms}`;

  // 関数の呼び出し、関数を実行するまでの待ち時間をミリ秒で指定。
  timeoutID = setTimeout (() => {
    displayTime ();
  },10);
}


// スタートボタンクリックイベント。
startButton.addEventListener('click', () => {
  // 各ボタンの活性/非活性。
  startButton.disabled = true;
  stopButton.disabled = false;
  resetButton.disabled = true;

  // スタートボタン押下時のタイムスタンプを取得。
  startTime = Date.now();

  // カウント時間を表示するための関数呼び出し。
  displayTime();
})


// ストップボタンクリックイベント。
stopButton.addEventListener('click', () => {
  // 各ボタンの活性/非活性。
  startButton.disabled = false;
  stopButton.disabled = true;
  resetButton.disabled = false;

  // タイマーを停止する。
  // setTimeoutによる関数の実行をキャンセルする。
  clearTimeout(timeoutID);

  // カウント時間を保持させる。
  // 2回目以降の計測時に過去の経過時間が加算される。
  elapsedTime += (Date.now() - startTime);
  console.log(elapsedTime);
})


// リセットボタンクリックイベント。
reset.addEventListener('click', () => {
  // 各ボタンの活性/非活性。
  startButton.disabled = false;
  stopButton.disabled = true;
  resetButton.disabled = true;

  // 表示しているカウント時間をデフォルトの'00:00:00.000'に戻す。
  time.textContent = '00:00:00.000';
  // 停止時間を0にリセット。
  elapsedTime = 0;
})