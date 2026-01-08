---
title: チャレンジクラブLT会を開催しました（2026年1月）
description: "1月に開催したチャレンジクラブのLT会の開催報告です。PoCからプロダクトへの育て方、個人アドベントカレンダー、AWSエージェント検証、3Dプリント、VR空間LTなど、多様なチャレンジが共有されました。"
layout: base.njk
date: 2026-01-07
permalink: "/posts/lt-2026-01/"
tags: [ニュース, LT会, 活動報告]
thumbnail: "/images/common/ChallengeClubLT.png"
image: "/images/common/ChallengeClubLT.png"
ogImage: "/images/common/ChallengeClubLT.png"
ogAlt: "チャレンジクラブLT会の開催報告"
---

# チャレンジクラブ LT会を開催しました（2026年1月）

[年末年始チャレンジしたことLT（Lightning Talk）](https://challenge-club.connpass.com/event/375881/) を開催しました。  
年始早々の開催でしたが、今回も「まずやってみた」「試行錯誤の途中経過」を気軽に持ち寄る、チャレンジクラブらしい時間になりました。

## オープニング

司会hidetakeさんより簡単に趣旨説明とタイムテーブルの共有からスタート。  
初参加の方も交えつつ、アイスブレークでは、冬休みに食べたもの、新年の抱負、最近の仕事など共有しながら、
「完成度よりもプロセス重視」でいこうという空気をあらためて共有しました。

## PoCがプロダクトに育つ話（Lambigさん）

最初の登壇は Lambig さん。  
基盤システム開発のPoCを、どのようにプロダクトレベルへ育てていったかという実践的な共有でした。

印象的だったポイントは以下です。

- 型安全を前提にした設計で、初期から破綻しにくい構造を作った  
- LLMを活用し、コードレビューを並列化する仕組みを構築  
- 機械的に検出しづらい「ルール」や「文化」を、レビューガイドラインとして分解  
- ガイドラインをワークダウンファイルに落とし込み、タスクツールで運用

PoCを「作って終わり」にせず、運用や文化のレイヤーまで含めて設計していく視点が印象的な発表でした。

<div style="margin: 2rem 0; text-align: center;">
  <iframe
    src="https://docs.google.com/presentation/d/1u77YtuXM9xLRiqjUTrUgok3XAMzh2aNqdvMPEUjVqoQ/embed?start=false&loop=false&delayms=3000"
    frameborder="0"
    allowfullscreen="true"
    style="
      width: 100%;
      max-width: 860px;
      aspect-ratio: 560 / 315;
      border: 0;
      border-radius: 6px;
      box-shadow: rgba(0, 0, 0, 0.2) 0px 5px 40px;
    ">
  </iframe>
</div>

## ひとりアドベントカレンダーにチャレンジしてみた！（ツカジーさん）

続いては ツカジー（otsuka）さん。  
2025年に取り組んだ「ひとりアドベントカレンダー」の振り返りです。

- 毎日AIアプリを作り、25日間連続でアウトプット  
- 初めての個人アドベントカレンダーを完走  
- 継続することで、知識と発信の両方が蓄積された  
- 次の年も同様の挑戦を続けたい

参加者からは「毎日作るのがすごい」「継続の仕組みを知りたい」といった声もあり、挑戦のハードルを下げるヒントが詰まった発表でした。

<div style="margin: 2rem 0; text-align: center;">
  <iframe
    class="speakerdeck-iframe"
    frameborder="0"
    src="https://speakerdeck.com/player/d73f9ed0b896493db5fd241fbe4a03fd"
    title="I tried making a solo advent calendar!"
    allowfullscreen="true"
    style="
      border: 0;
      background: rgba(0, 0, 0, 0.1);
      margin: 0;
      padding: 0;
      border-radius: 6px;
      box-shadow: rgba(0, 0, 0, 0.2) 0px 5px 40px;
      width: 100%;
      max-width: 860px;
      display: inline-block;
      aspect-ratio: 560 / 315;
    ">
  </iframe>
</div>

## AWSのFrontier Agentについて詳しくなりたい！（shuさん）

3人目は shu さん。  
年末年始の個人チャレンジとして取り組んだ、AWS Frontier Agent（特にDevOpsエージェント）の検証報告です。

- DevOpsエージェントを使ったテストシナリオの実行  
- EC2の認証情報インシデントを題材にした調査  
- ログをもとに原因を特定できたプロセスの共有  
- 「エージェントが何をどこまでやってくれるのか」の整理

新しい仕組みを実際に触って確かめる姿勢が伝わり、参加者からも関心の高いテーマとなりました。

<div style="margin: 2rem 0; text-align: center;">
  <iframe
    class="docswell-embed"
    src="https://www.docswell.com/s/shu/5EY22N-2026-01-07-012142/1"
    frameborder="0"
    allowfullscreen="true"
    style="
      width: 100%;
      max-width: 860px;
      aspect-ratio: 560 / 315;
      border: 0;
      border-radius: 6px;
      box-shadow: rgba(0, 0, 0, 0.2) 0px 5px 40px;
    ">
  </iframe>
</div>


## 3Dプリントはじめました！（hide_take）

続いては hide_take さん。  
3Dプリントを始めてみた実験報告です。

- 3Dプリンターを手頃な価格で購入  
- 暗号用ホイールなどの試作品を作成  
- 部活メンバーと協力して基盤やローターを設計  
- 展示会でのアウトプットや、失敗談（メントスコーラ挑戦）も共有

「とりあえず買ってみる」「作ってみて詰まる」というリアルな話が、会場の笑いと共感を誘っていました。

<div style="margin: 2rem 0; text-align: center;">
  <iframe
    class="speakerdeck-iframe"
    frameborder="0"
    src="https://speakerdeck.com/player/8982d109518f46a0a139451155de0038"
    title="2026_01_07_３DプリントはじめましたLT.pdf"
    allowfullscreen="true"
    style="
      border: 0px;
      background: padding-box padding-box rgba(0, 0, 0, 0.1);
      margin: 0px;
      padding: 0px;
      border-radius: 6px;
      box-shadow: rgba(0, 0, 0, 0.2) 0px 5px 40px;
      width: 100%;
      max-width: 860px;
      display: inline-block;
      aspect-ratio: 560 / 315;
    ">
  </iframe>
</div>

## VR空間でLT会を開催してみた！（とも）

最後の登壇は とも さん。  
VR空間でLT会を開催した経験についての共有でした。

- Unityで開発したVRワールド  
- Quest、iOS、PCなど複数プラットフォーム対応  
- プレゼン用ディスプレイ、レーザーポインター、マイク機能の実装  
- VR空間ならではの交流体験

「LT会そのものを実験する」という試みで、今後のイベントの可能性を感じさせる発表でした。

<div style="margin: 2rem 0; text-align: center;">
  <iframe
    src="https://docs.google.com/presentation/d/1_mYMAOI4Gu4C-hyc3S9wVoLJFU8cb9ME9lF_k7jcWzA/embed?start=false&loop=false&delayms=3000"
    frameborder="0"
    allowfullscreen="true"
    style="
      width: 100%;
      max-width: 860px;
      aspect-ratio: 560 / 315;
      border: 0;
      border-radius: 6px;
      box-shadow: rgba(0, 0, 0, 0.2) 0px 5px 40px;
    ">
  </iframe>
</div>


## クロージング・まとめ

今回のLT会も、

- PoCからプロダクトへ育てる話  
- 個人チャレンジの継続  
- 新しい技術の検証  
- ハードウェア・VRといった異なる領域の挑戦  

と、テーマはバラバラながらも「まずチャレンジしてみる！」という共通点がありました。

完成度よりも途中経過を共有することで、次のチャレンジにつながる。  
そんなチャレンジクラブらしさをあらためて感じる回だったと思います。

次回のLT会も、準備しすぎず、雑談の延長での参加を歓迎しています。  
気になる方はぜひ、次回もお気軽にご参加ください。
