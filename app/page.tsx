"use client";

import { useMemo, useState } from "react";

const money = new Intl.NumberFormat("zh-TW", { maximumFractionDigits: 0 });

const portfolio = [
  { code: "0056", name: "元大高股息", value: 105048, cost: 67714, color: "#2f6bff" },
  { code: "00878", name: "國泰永續高股息", value: 72847, cost: 43051, color: "#12b8a6" },
  { code: "00919", name: "群益台灣精選高息", value: 41862, cost: 28504, color: "#7b61ff" },
  { code: "009816", name: "凱基台灣 TOP 50", value: 30390, cost: 28994, color: "#f4a340" },
];

const stockValue = 250147;
const cash = 8461;
const debt = 413346;
const income = 33104;
const living = 12500;
const discretionary = 6000;
const loanPayment = 6851;
const monthlySurplus = income - living - discretionary - loanPayment;

function futureValue(principal: number, monthly: number, annual: number, years: number) {
  const rate = Math.pow(1 + annual / 100, 1 / 12) - 1;
  const months = years * 12;
  if (!rate) return principal + monthly * months;
  return principal * Math.pow(1 + rate, months) + monthly * ((Math.pow(1 + rate, months) - 1) / rate);
}

function MetricCard({ tone, icon, label, value, note }: { tone: string; icon: string; label: string; value: string; note: string }) {
  return (
    <article className="metric-card">
      <div className={`metric-icon ${tone}`} aria-hidden="true">{icon}</div>
      <div>
        <p>{label}</p>
        <strong>{value}</strong>
        <span>{note}</span>
      </div>
    </article>
  );
}

export default function Home() {
  const [monthly, setMonthly] = useState(monthlySurplus);
  const [annualReturn, setAnnualReturn] = useState(8);
  const [activeFaq, setActiveFaq] = useState<number | null>(0);

  const projection = useMemo(() => futureValue(stockValue, monthly, annualReturn, 10), [monthly, annualReturn]);
  const passiveFour = projection * 0.04 / 12;
  const passiveSix = projection * 0.06 / 12;
  const targetCapital = 20000000;
  const progress = Math.min(100, projection / targetCapital * 100);

  const scrollTo = (id: string) => document.getElementById(id)?.scrollIntoView({ behavior: "smooth" });

  return (
    <main>
      <header className="site-header">
        <a className="brand" href="#top" aria-label="回到財務總覽">
          <span className="brand-mark"><i /><i /><i /></span>
          <span>Jacky <b>財務規劃</b></span>
        </a>
        <nav aria-label="主要導覽">
          <a href="#overview">總覽</a>
          <a href="#cashflow">現金流</a>
          <a href="#portfolio">投資配置</a>
          <a href="#plan">10年計畫</a>
        </nav>
        <div className="profile"><span>J</span><b>Jacky</b></div>
      </header>

      <div className="page-shell" id="top">
        <section className="hero" id="overview">
          <div className="hero-copy">
            <div className="eyebrow"><span /> 依 2026/07/11 資料更新</div>
            <h1>你的財務自由，<br />先從看懂現況開始。</h1>
            <p>把資產、負債與現金流放在同一張圖上，判斷現在該做的是增加槓桿，還是先建立安全墊。</p>
            <div className="hero-actions">
              <button onClick={() => scrollTo("actions")}>查看行動計畫 <span>→</span></button>
              <button className="secondary" onClick={() => scrollTo("simulator")}>模擬10年目標</button>
            </div>
          </div>

          <article className="health-card">
            <div className="health-title"><h2>財務健康分數</h2><span title="依現金安全墊、負債與投資狀況綜合評估">i</span></div>
            <div className="health-content">
              <div className="score-ring" aria-label="財務健康分數 42 分">
                <div><strong>42</strong><span>/100</span></div>
              </div>
              <div className="health-summary">
                <div className="warning"><b>!</b><strong>目前不適合新增貸款投資</strong></div>
                <p>投資成果良好，但現金只能支撐不到半個月；優先強化現金安全墊，再降低負債。</p>
                <ul>
                  <li className="bad"><i>↓</i><span>現金緩衝偏低</span><em>需加強</em></li>
                  <li className="bad"><i>↓</i><span>金融淨值為負</span><em>需注意</em></li>
                  <li className="good"><i>✓</i><span>投資持續獲利</span><em>保持紀律</em></li>
                </ul>
              </div>
            </div>
          </article>
        </section>

        <section className="metrics" aria-label="財務摘要">
          <MetricCard tone="teal" icon="↗" label="股票資產" value={`NT$${money.format(stockValue)}`} note="投入成本 NT$168,263" />
          <MetricCard tone="teal" icon="▣" label="現金" value={`NT$${money.format(cash)}`} note="僅約 0.44 個月安全墊" />
          <MetricCard tone="red" icon="▤" label="信貸餘額" value={`NT$${money.format(debt)}`} note="原始貸款 NT$470,000" />
          <MetricCard tone="teal" icon="◫" label="每月帳面結餘" value={`約 NT$${money.format(monthlySurplus)}`} note="尚未扣年度保費與分期" />
        </section>

        <section className="section-grid" id="cashflow">
          <article className="panel cashflow-panel">
            <div className="section-heading">
              <div><span>MONTHLY CASHFLOW</span><h2>每月現金流</h2></div>
              <b className="status yellow">有結餘，但緩衝不足</b>
            </div>
            <div className="cashflow-total"><span>平均實領收入</span><strong>NT${money.format(income)}</strong><small>收入每月大致相同</small></div>
            <div className="flow-bars">
              {[
                ["基本生活費", living, "#2f6bff"],
                ["非必要支出", discretionary, "#7b61ff"],
                ["信貸月繳", loanPayment, "#ef5b5b"],
                ["帳面結餘", monthlySurplus, "#12b8a6"],
              ].map(([label, value, color]) => (
                <div className="flow-row" key={String(label)}>
                  <div><span>{label}</span><strong>NT${money.format(Number(value))}</strong></div>
                  <div className="bar"><i style={{ width: `${Number(value) / income * 100}%`, background: String(color) }} /></div>
                </div>
              ))}
            </div>
            <div className="unknown-note"><b>待補資料</b><span>醫療險年度總額、信用卡分期金額與剩餘期數</span></div>
          </article>

          <article className="panel loan-panel">
            <div className="section-heading"><div><span>LOAN PROFILE</span><h2>信貸結構</h2></div><b className="status red">成本偏高</b></div>
            <div className="loan-balance"><span>剩餘本金</span><strong>NT$413,346</strong><small>約為原貸款的 87.9%</small></div>
            <div className="loan-grid">
              <div><span>原始期數</span><b>84期</b></div>
              <div><span>每月應繳</span><b>NT$6,851</b></div>
              <div><span>銀行利率指數</span><b>1.72%</b></div>
              <div><span>加碼年利率</span><b>4.28%</b></div>
              <div><span>合計年利率</span><b className="red-text">6.00%</b></div>
              <div><span>計息方式</span><b>按日計息</b></div>
            </div>
            <div className="interest-callout"><span>目前估計每日利息</span><strong>約 NT$68</strong><small>以現有本金×6%÷365估算，實際依銀行入帳為準</small></div>
          </article>
        </section>

        <section className="section-grid portfolio-grid" id="portfolio">
          <article className="panel portfolio-panel">
            <div className="section-heading"><div><span>PORTFOLIO</span><h2>ETF 投資配置</h2></div><b className="status green">累積獲利 +48.7%</b></div>
            <div className="portfolio-summary">
              <div className="donut" aria-label="投資組合圓餅圖"><div><strong>NT$250K</strong><span>目前市值</span></div></div>
              <div className="legend">
                {portfolio.map((item) => <div key={item.code}><i style={{ background: item.color }} /><span>{item.code}</span><b>{(item.value / stockValue * 100).toFixed(1)}%</b></div>)}
              </div>
            </div>
            <div className="holding-list">
              {portfolio.map((item) => (
                <div className="holding" key={item.code}>
                  <div><i style={{ background: item.color }} /><b>{item.code}</b><span>{item.name}</span></div>
                  <strong>NT${money.format(item.value)}</strong>
                  <em>+{((item.value - item.cost) / item.cost * 100).toFixed(1)}%</em>
                </div>
              ))}
            </div>
          </article>

          <article className="panel risk-panel">
            <div className="section-heading"><div><span>RISK CHECK</span><h2>配置風險</h2></div></div>
            <div className="risk-score"><div><strong>88%</strong><span>集中於高股息ETF</span></div><div className="risk-bar"><i /></div></div>
            <h3>看似四檔，實際風險高度重疊</h3>
            <p>0056、00878、00919 合計占87.9%，且四檔都是台灣股票資產。配息不等於額外報酬，未來加碼應優先考慮資產類別與市場分散。</p>
            <div className="stress-card">
              <span>市場下跌30%的壓力測試</span>
              <strong>股票市值約降至 NT$175,103</strong>
              <small>帳面縮水約 NT$75,044；信貸本金與月繳不會跟著下降。</small>
            </div>
          </article>
        </section>

        <section className="goal-section" id="plan">
          <div className="goal-header">
            <div><span>10-YEAR TARGET</span><h2>每月被動收入 NT$100,000</h2><p>目標不是挑到一檔神ETF，而是建立足以產生現金流的本金。</p></div>
            <div className="target-capital"><span>合理目標本金</span><strong>NT$20M～30M</strong><small>依年現金收益率4%～6%估算</small></div>
          </div>

          <div className="simulator" id="simulator">
            <div className="controls">
              <div className="sim-title"><h3>10年資產模擬器</h3><span>調整投入金額，查看目標差距</span></div>
              <label><div><span>每月投入</span><b>NT${money.format(monthly)}</b></div><input type="range" min="0" max="120000" step="1000" value={monthly} onChange={(e) => setMonthly(Number(e.target.value))} /></label>
              <label><div><span>假設年化總報酬</span><b>{annualReturn}%</b></div><input type="range" min="4" max="10" step="1" value={annualReturn} onChange={(e) => setAnnualReturn(Number(e.target.value))} /></label>
              <div className="assumption">起始投資本金 NT$250,147・期間10年・配息全數再投入</div>
            </div>
            <div className="projection-card">
              <span>10年後預估資產</span>
              <strong>NT${money.format(projection)}</strong>
              <div className="progress-label"><span>距離2,000萬元目標</span><b>{progress.toFixed(1)}%</b></div>
              <div className="goal-progress"><i style={{ width: `${progress}%` }} /></div>
              <div className="projection-grid">
                <div><span>4%現金流</span><b>約 NT${money.format(passiveFour)}/月</b></div>
                <div><span>6%現金流</span><b>約 NT${money.format(passiveSix)}/月</b></div>
              </div>
              <p>試算並非保證報酬，未計入稅費、通膨與配息變動。</p>
            </div>
          </div>

          <div className="reality-check">
            <div><span>目前路徑</span><strong>約 NT$1.94M</strong><small>每月投入7,753元、年化8%</small></div>
            <i>→</i>
            <div><span>要達2,000萬元</span><strong>每月約需投入 NT$108K</strong><small>代表核心任務是提升主動收入</small></div>
          </div>
        </section>

        <section className="action-section" id="actions">
          <div className="section-heading action-heading"><div><span>ACTION ROADMAP</span><h2>你的財務行動路線圖</h2><p>先避免被迫賣出，再提高本金累積速度。</p></div></div>
          <div className="timeline">
            <article><b>01</b><span>現在～10個月</span><h3>補足現金安全墊</h3><p>先把現金提高到6～8萬元，再逐步完成12萬元緊急預備金。暫停新增貸款與質押。</p><em>優先級：最高</em></article>
            <article><b>02</b><span>預備金完成後</span><h3>降低6%信貸</h3><p>每月真實結餘建議70%額外還本金、30%維持無槓桿投資；先確認保費與分期後再執行。</p><em>確定性節息</em></article>
            <article><b>03</b><span>1～4年</span><h3>提高可投入本金</h3><p>真正的槓桿是獵頭佣金、AI自動化服務與課程收入，目標先把月收入提升至6～10萬元。</p><em>核心成長引擎</em></article>
            <article><b>04</b><span>4～10年</span><h3>建立多元現金流</h3><p>金融資產提供20%～30%，其餘由課程、內容與系統化服務形成半被動收入。</p><em>目標：月收10萬</em></article>
          </div>
        </section>

        <section className="faq-section">
          <div><span>DECISION NOTES</span><h2>這份評估怎麼看？</h2></div>
          <div className="faqs">
            {[
              ["為什麼有8萬元獲利，健康分數仍只有42？", "因為帳面獲利不能支付突發支出。你的現金只有8,461元，收入若中斷一個月，就可能被迫賣出ETF。"],
              ["可以直接賣掉ETF還清貸款嗎？", "不建議在資料不完整時一次清空。較平衡的做法是先把部分獲利轉成6～8萬元現金，再確認年度保費與分期後決定提前還款幅度。"],
              ["什麼時候才適合貸款投資？", "至少要有9～12個月預備金、收入穩定、沒有6%以上高成本負債，而且市場下跌50%時仍不必賣出。"],
            ].map(([q, a], index) => (
              <button className={`faq ${activeFaq === index ? "open" : ""}`} key={q} onClick={() => setActiveFaq(activeFaq === index ? null : index)} aria-expanded={activeFaq === index}>
                <span><b>{q}</b><i>{activeFaq === index ? "−" : "+"}</i></span>
                <p>{a}</p>
              </button>
            ))}
          </div>
        </section>

        <footer><div><b>Jacky 財務自由規劃儀表板</b><span>以你提供的資料製作，最後更新：2026/07/11</span></div><p>本頁為個人財務規劃與情境試算，不構成特定證券買賣建議。</p></footer>
      </div>
    </main>
  );
}
