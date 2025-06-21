---
title: トップページ
layout: base.njk
permalink: /
---

<header style="background: url('./images/challenge-club-backpanel.png') center/cover no-repeat; color: white; text-align: center; padding: 4rem 1rem; font-weight: bold; position: relative;" id="top">
  <h1>技術チャレンジ部</h1>
  <p>探究とつながりで、未来をつくる。</p>
</header>
<section id="about">
  <h2>技術チャレンジ部とは？</h2>
  <p><strong>成長の場の相互提供</strong>をコンセプトとした、有志による技術コミュニティです。</p>
  <p>メーカー社員数名による小さな部活動として始まった取り組みは、今では社内外に広がり、300名を超える仲間が集うコミュニティへと成長しました。</p>
  <p>こんな人たちが集まっています：</p>
  <ul>
    <li>新しいことに挑戦してみたい</li>
    <li>技術をもっと深めたい</li>
    <li>刺激し合える仲間とつながりたい</li>
    <li>一人ではくじけそうでも、仲間となら走り続けられる</li>
  </ul>
  <p>そんな想いを持つメンバーが集まり、<strong>学び合い、刺激し合い、共に楽しむ──本気で遊ぶ技術者たちの「挑戦の場」</strong>です。</p>
</section>

<section id="activities">
  <h2>活動内容</h2>
  <div class="card-container">
    <a href="https://github.com/ChallengeClub/vr-meetups" target="_blank" class="card">
      <img src="images/vr.png" alt="VR活動">
      <div class="card-content">
        <h3>VR活動</h3>
        <p>定例会や体験会で、VRやメタバースに触れる活動を展開</p>
      </div>
    </a>
    <a href="{{ '/activities/programming_contest/' | url }}" target="_blank" class="card">
      <img src="images/programming.png" alt="プログラミングコンテスト">
      <div class="card-content">
        <h3>挑戦！プログラミングコンテスト</h3>
        <p>コンテスト挑戦を通じてスキルアップ</p>
      </div>
    </a>
    <a href="{{ '/activities/automotive_ai_challenge/' | url }}" target="_blank" class="card">
      <img src="images/ai.png" alt="自動運転AIチャレンジ">
      <div class="card-content">
        <h3>自動運転AIチャレンジ</h3>
        <p>実車や仮想環境での自動運転開発に挑戦</p>
      </div>
    </a>
    <a href="{{ '/activities/automotive_uxchallenge/' | url }}" target="_blank" class="card">
      <img src="images/ux.png" alt="自動運転UX創造チャレンジ">
      <div class="card-content">
        <h3>自動運転UX創造チャレンジ</h3>
        <p>UX視点で自動運転の未来像を提案</p>
      </div>
    </a>
    <a href="{{ '/activities/makerfaire/' | url }}" target="_blank" class="card">
      <img src="images/mft2024.png" alt="MakerFaireTokyo2024出展">
      <div class="card-content">
        <h3>MakerFaireTokyo2024出展</h3>
        <p>日本最大のメイカーイベントに出展</p>
      </div>
    </a>
    <a href="{{ '/activities/isucon/' | url }}" target="_blank" class="card">
      <img src="images/isucon.png" alt="ISUCON参加">
      <div class="card-content">
        <h3>ISUCON参加</h3>
        <p>限界に挑むWEB高速化バトルに参戦</p>
      </div>
    </a>
    <a href="https://bukkowathon.challenge-club.org/" target="_blank" class="card">
      <img src="images/bukkowathon.png" alt="5h Bukkowathon">
      <div class="card-content">
        <h3>5h Bukkowathon</h3>
        <p>５時間で「ぶっ壊す」「ハッカソン」を開催</p>
      </div>
    </a>
    <a href="{{ '/activities/ctf/' | url }}" target="_blank" class="card">
      <img src="images/ctf.png" alt="CTFコンテスト">
      <div class="card-content">
        <h3>CTFコンテスト</h3>
        <p>セキュリティの力試し！CTF大会に参加</p>
      </div>
    </a>
    <a href="https://challenge-club.connpass.com/" target="_blank" class="card">
      <img src="images/lt.png" alt="connpassのLT会">
      <div class="card-content">
        <h3>connpassのLT会</h3>
        <p>社外公開型の勉強会をconnpassで開催</p>
      </div>
    </a>
  </div>
</section>

<section id="contact">
  <h2>お問い合わせ</h2>
  <p style="text-align: center;">
    <a href="https://forms.office.com/Pages/ResponsePage.aspx?id=1vVjSGBHiUW-nEL4LgdXOZjcR3aRbtpEqTgZNLVVwCBUM1VIUTVaUFBMSlJCMElNTjhESk82N0YwWC4u" target="_blank" rel="noopener" style="display:inline-block;padding:0.5rem 1rem;background:var(--main-color);color:white;text-decoration:none;border-radius:4px;">お問い合わせはこちら</a>
  </p>

  <div class="footer-links">
    <p style="text-align: center;">Follow us:</p>
    <div class="qr-container">
      <div class="qr-block">
        <a href="https://challenge-club.connpass.com/" target="_blank">
          <img src="images/connpass-qr.png" alt="Connpass QR">
          <p><strong>Connpass</strong></p>
        </a>
      </div>
      <div class="qr-block">
        <a href="https://github.com/ChallengeClub" target="_blank">
          <img src="images/github-icon.png" alt="GitHub Icon">
          <p><strong>GitHub</strong></p>
        </a>
      </div>
      <div class="qr-block">
        <a href="https://www.youtube.com/@challenge_club4898" target="_blank">
          <img src="images/youtube-icon.png" alt="YouTube Icon">
          <p><strong>YouTube</strong></p>
        </a>
      </div>
      <div class="qr-block">
        <a href="mailto:contact@challenge-club.org">
          <img src="images/email-icon.png" alt="Email Icon">
          <p><strong>メール</strong></p>
        </a>
      </div>
    </div>
  </section>
</div>