---
title: 春にチャレンジしたいことLT会を開催しました（2026年3月）
description: "3月4日に開催したチャレンジクラブLT会の開催報告です。JJUG CCCプロポーザル挑戦、GNSS-LTE-M車両防犯システム、自宅生成AI環境、チャットだけでのアプリ開発など、多彩な発表が集まりました。"
layout: base.njk
date: 2026-03-04
permalink: "/posts/lt-2026-03/"
tags: [ニュース, LT会, 活動報告]
thumbnail: "/images/common/ChallengeClubLT.png"
image: "/images/common/ChallengeClubLT.png"
ogImage: "/images/common/ChallengeClubLT.png"
ogAlt: "春にチャレンジしたいことLT会の開催報告"
---

# 春にチャレンジしたいことLT会を開催しました（2026年3月）

3月4日（水）に、connpassイベント「春にチャレンジしたいことLT会」を開催しました。  
春に向けた挑戦テーマを持ち寄り、技術寄りの話からプロダクトづくりの話まで、幅広いLTが集まる回になりました。

- イベントページ：[春にチャレンジしたいことLT会](https://challenge-club.connpass.com/event/381031/)


## オープニング

hidetakeさんの進行でスタート。  
自己紹介とアイスブレイクを挟んで、春にやりたいことをゆるく共有してからLT本編に入りました。


## JJUG CCCにプロポーザルを書いてみた（Lambigさん）

最初の発表はLambigさん。  
[JJUG CCC 2026 Spring](https://sessionize.com/jjug-ccc-2026-spring/)のプロポーザル提出に挑戦した体験を共有してくれました。

- 締切を意識した短期間での準備
- プロポーザルを書く難しさと学び
- 発表テーマを具体化することで、本編の構成も整理できたこと

論文提出と似ている部分もありつつ、コミュニティへの貢献を意識した内容になっている点が印象的でした。

締切2日前から準備してやり切られたのは見事でした。Lambigさんは普段からLTや技術記事を継続的に発信されており、その積み重ねの強さを感じる発表でした。


## 非ITエンジニアのためのGNSS-LTE-Mを用いたオンライン車両防犯システム（ばやしぃすさん）

ばやしぃすさんからは、車両防犯システムのPoC報告。  
GNSSで取得した位置情報をクラウドに送信し、可視化までつなぐ実装の流れが紹介されました。

- 3人の生成AIを使って壁打ち
- マイコン、モデム、SIM、スマホ、3Dプリンタを組み合わせた実装
- データをDBに蓄積し、Amazon Location Serviceで表示
- セキュリティやモデム接続効率の改善が今後の課題

ハードからソフト、クラウドまでをつないだ総合的な実装で、実際に動かすところまで作り込まれていたのが素晴らしかったです。  
初めてのLTで緊張したと話されていましたが、それを感じさせない密度の高い内容でした。

<div style="margin: 2rem 0; text-align: center;">
  <iframe
    src="https://docs.google.com/presentation/d/1yU04c9lYhYXRqZSE1kpvQufsULZPSfhKguUNSG-u8YI/embed?start=false&loop=false&delayms=3000"
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

- 資料リンク: [非ITエンジニアのためのGNSS-LTE-Mを用いたオンライン車両防犯システム](https://docs.google.com/presentation/d/1yU04c9lYhYXRqZSE1kpvQufsULZPSfhKguUNSG-u8YI/edit?usp=drivesdk)

## 自宅での生成AI環境（ともさん）

ともさんは、自宅サーバーを活用した生成AI環境づくりを発表。  
セルフホスト基盤上でAIエージェントを動かし、既存サービスと接続して検証を続けている取り組みが共有されました。

- 自宅環境でのLLM推論基盤づくり
- AIエージェント連携によるコード解析や記憶実験
- 自動レビュー、モデル管理、評価系の開発

実運用に寄せた試行錯誤の話が多く、学びの多いセッションでした。
こちらも、普段から興味を持って取り組んでおられたことの積み上げと、そのつながりを強く感じる発表でした。

<div style="margin: 2rem 0; text-align: center;">
  <iframe
    src="https://docs.google.com/presentation/d/1-G11TiKuRBkTThsh2aXFVjydECaLw4_6tQoNG9PEEZk/embed?start=false&loop=false&delayms=3000"
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

- 資料リンク: [自宅での生成AI環境](https://docs.google.com/presentation/d/1-G11TiKuRBkTThsh2aXFVjydECaLw4_6tQoNG9PEEZk/edit?usp=drivesdk)

## チャットだけでアプリ開発（Heroさん）

Heroさんによるデモ形式で実施。  
対話だけでアプリを組み立てていく「Euthopia」の紹介がありました。  
発表しながらSaaSのLPサイトが出来上がっていく様子は圧巻でした。

- 要望をチャットで伝えると、AIが対話的にアプリを構築
- 短時間でプレビューまで到達できる開発体験
- 非エンジニアでも使いやすい設計

参加者からは、教育用途や業務改善での活用可能性について多くのコメントが出ました。  
Heroさんご自身も、エンジニア未経験の状態からその壁を下げるためにスタートアップで開発・営業に取り組まれており、熱い思いに共感と賞賛の声が集まりました。  

<div style="margin: 2rem 0; text-align: center;">
  <iframe
    src="https://sites.eureka-factory.com/s/euthopia-sales/"
    frameborder="0"
    allowfullscreen="true"
    style="
      width: 100%;
      max-width: 860px;
      aspect-ratio: 560 / 315;
      border: 0;
      border-radius: 6px;
      box-shadow: rgba(0, 0, 0, 0.2) 0px 5px 40px;
      background: #fff;
    ">
  </iframe>
</div>

- 資料リンク: [Euthopia 紹介ページ](https://sites.eureka-factory.com/s/euthopia-sales/)


## LT後の雑談

LT後は、AIアプリの普及や料金プラン設計、教育領域での展開、デプロイ方法などをテーマに雑談。  
初参加の方も交えて、実装観点と事業観点の両方から会話が広がりました。


## まとめ

今回のLT会は、

- 登壇への挑戦（プロポーザル作成）
- ハードウェア × クラウド連携
- 自宅生成AI環境の実験
- 対話型アプリ開発

と、チャレンジクラブらしい幅広いテーマがそろった回になりました。  
次回も、挑戦途中の話や試行錯誤の共有を歓迎しています。ぜひお気軽にご参加ください。
