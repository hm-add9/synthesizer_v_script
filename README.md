
# Synthesizer V スクリプト集

Synthesizer Vのスクリプトを、元々は自分の便利用に作ってたのですが、せっかくなので公開します。

### 🎙️ f_vibrato.js - ノートごとのビブラート調整
最新の Synthesizer V だと、ノートごとにビブラート調整ができないので、作りました。  
選択したノートの各種ビブラート値を設定できます。
設定可能な内容は、Synthesizer V と同様です。（位相はまだ上手く設定できてないです．．．）

ダイアログ表示時に、設定中の値を初期値に表示するので、今は、複数ノートには設定できません。
（そのうち、複数ノート一括も対応？）

<img src="https://github.com/hm-add9/synthesizer_v_script/assets/127062996/22eb8101-6089-42e4-a5c7-5c2800bd33c3" width="400">

### 🎙️ f_vibrato_pichbend.js - ノートごとのビブラートをピッチベンドで作成
ノートごとのビブラート調整スクリプトでうまく設定できない場合の回避策で作りました。  
ビブラートをピッチベンドで作成します。
ビブラート設定自体はリセットされます。
元のピッチベンドは残ったままなので、一旦、削除してから本スクリプトを実行してください。

<img src="https://github.com/hm-add9/synthesizer_v_script/assets/127062996/adf74b83-e309-417c-8559-80ea09ec056b" width="400">

### 🎙️ f_up_moment.js - ノートの開始、または、終了でしゃくりあげる
ノート発音時、ノート終了時にそれぞれ、一瞬声を裏返させます。
ピッチベンドで再現しています。
開始、終了それぞれで独立して設定できます。効き具合をゼロにすると、何もしません。

<img src="https://github.com/hm-add9/synthesizer_v_script/assets/127062996/f7d51321-554a-4250-940a-755f650b4d23" width="400">

--

## ファイルダウンロード方法
* 個別にダウンロード
対象ファイルを右クリックして「名前をつけて保存」でダウンロードできます。

* まとめてダウンロード
右上の「<>Code」をクリック　→　「Download ZIP」でダウンロードできます。

---

## スクリプトの導入方法
こちらが参考になります。
https://synthesizer-v.fandom.com/ja/wiki/%E3%83%97%E3%83%A9%E3%82%B0%E3%82%A4%E3%83%B3%E3%83%BBTIPS%E9%9B%86#%E3%82%B9%E3%82%AF%E3%83%AA%E3%83%97%E3%83%88%E3%81%AE%E5%B0%8E%E5%85%A5%E6%96%B9%E6%B3%95

1. 上のメニューの「スクリプト」→「スクリプトフォルダを開く」をクリック
1. ダウンロードした ◯◯.lua/◯◯.jsを「scripts」フォルダの中にコピー
1. 上のメニューの「スクリプト」→「再スキャン」をクリック
1. 上のメニューの「スクリプト」に、追加したスクリプトが表示されます。

スクリプトごとに、キーボードショートカットを設定できるので、設定をおすすめします。
