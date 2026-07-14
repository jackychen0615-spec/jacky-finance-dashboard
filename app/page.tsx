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
const cash = 16357;
const debt = 413346;
const income = 33104;
const living = 12500;
const discretionary = 2000;
const loanPayment = 6851;
const medicalInstallment = 2081;
const monthlySurplus = income - living - discretionary - loanPayment - medicalInstallment;
const cryptoValue = 81897;
const policyAccountValue = 8921;

const crypto = [
  { code: "FET", value: 31140, share: 38.0, color: "#273457" },
  { code: "ETH", value: 27810, share: 34.0, color: "#627eea" },
  { code: "XRP", value: 14270, share: 17.4, color: "#101820" },
  { code: "BNB", value: 5280, share: 6.4, color: "#f3ba2f" },
  { code: "preSPCX／其他", value: 3397, share: 4.2, color: "#9b77b9" },
];

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

function FinanceIsland() {
  const reserveProgress = Math.min(100, cash / 60000 * 100);

  return (
    <article className="finance-island" aria-label="Jacky 財務島總覽">
      <div className="island-topline">
        <div><span>JACKY&apos;S FINANCE MAP</span><h2>我的財務島</h2></div>
        <b><i /> 資料更新於 2026/07/14</b>
      </div>

      <div className="island-canvas">
        <div className="island-orbit orbit-one" />
        <div className="island-orbit orbit-two" />

        <div className="island-land">
          <div className="island-center">
            <span>目前已知淨值</span>
            <strong>－NT${money.format(debt - stockValue - cryptoValue - policyAccountValue - cash)}</strong>
            <small>風險資產充足，現金安全墊仍是首要任務</small>
          </div>

          <a className="island-zone reserve-zone" href="#monthly-plan">
            <i aria-hidden="true">⌂</i><span>安全基地</span><b>NT${money.format(cash)}</b><small>目標 6 萬</small>
          </a>
          <a className="island-zone etf-zone" href="#portfolio">
            <i aria-hidden="true">↗</i><span>ETF 花園</span><b>NT${money.format(stockValue)}</b><small>成長＋現金流</small>
          </a>
          <a className="island-zone crypto-zone" href="#cashflow">
            <i aria-hidden="true">◆</i><span>加密礦區</span><b>NT${money.format(cryptoValue)}</b><small>暫停加碼</small>
          </a>
          <a className="island-zone debt-zone" href="#cashflow">
            <i aria-hidden="true">≋</i><span>負債橋梁</span><b>NT${money.format(debt)}</b><small>年利率約 6%</small>
          </a>
          <a className="island-zone business-zone" href="#business">
            <i aria-hidden="true">✦</i><span>數位商業區</span><b>4 項計畫</b><small>驗證現金流中</small>
          </a>
        </div>
      </div>

      <div className="island-progress">
        <div><span>第一階段｜緊急預備金</span><b>{reserveProgress.toFixed(1)}%</b></div>
        <div className="island-progress-track"><i style={{ width: `${reserveProgress}%` }} /></div>
        <p>距離 NT$60,000 還差 <strong>NT${money.format(60000 - cash)}</strong>，達標前暫緩新增 ETF 與貸款投資。</p>
      </div>
    </article>
  );
}

export default function Home() {
  const [monthly, setMonthly] = useState(monthlySurplus);
  const [annualReturn, setAnnualReturn] = useState(8);
  const [activeFaq, setActiveFaq] = useState<number | null>(0);
  const [premiumConfirmed, setPremiumConfirmed] = useState(false);

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
          <a href="#business">數位事業</a>
          <a href="#insurance">保單</a>
          <a href="#plan">10年計畫</a>
        </nav>
        <div className="profile"><span>J</span><b>Jacky</b></div>
      </header>

      <div className="page-shell" id="top">
        <section className="hero" id="overview">
          <div className="hero-copy">
            <div className="eyebrow"><span /> MY FINANCIAL CONTROL CENTER</div>
            <h1>把每一筆錢，<br />放到對的位置。</h1>
            <p>一座看得懂、能行動的個人財務島。先守住現金安全墊，再讓投資與數位事業成為長期成長引擎。</p>
            <div className="hero-actions">
              <button onClick={() => scrollTo("actions")}>查看行動計畫 <span>→</span></button>
              <button className="secondary" onClick={() => scrollTo("simulator")}>模擬10年目標</button>
            </div>
          </div>

          <FinanceIsland />
        </section>

        <section className="metrics six" aria-label="財務摘要">
          <MetricCard tone="teal" icon="↗" label="股票資產" value={`NT$${money.format(stockValue)}`} note="投入成本 NT$168,263" />
          <MetricCard tone="purple" icon="₿" label="加密貨幣" value={`約 NT$${money.format(cryptoValue)}`} note="占股票＋加密資產 24.7%" />
          <MetricCard tone="teal" icon="▣" label="最近紀錄預備金" value={`約 NT$${money.format(cash)}`} note="第一階段目標 NT$60,000" />
          <MetricCard tone="red" icon="▤" label="信貸餘額" value={`NT$${money.format(debt)}`} note="原始貸款 NT$470,000" />
          <MetricCard tone="orange" icon="◇" label="保單帳戶價值" value={`NT$${money.format(policyAccountValue)}`} note="不一定等於解約可領金額" />
          <MetricCard tone="teal" icon="◫" label="每月初估可分配" value={`約 NT$${money.format(monthlySurplus)}`} note="已扣生活、娛樂、信貸與醫療險分期" />
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
                ["醫療險分期", medicalInstallment, "#f4a340"],
                ["帳面結餘", monthlySurplus, "#12b8a6"],
              ].map(([label, value, color]) => (
                <div className="flow-row" key={String(label)}>
                  <div><span>{label}</span><strong>NT${money.format(Number(value))}</strong></div>
                  <div className="bar"><i style={{ width: `${Number(value) / income * 100}%`, background: String(color) }} /></div>
                </div>
              ))}
            </div>
            <div className="unknown-note"><b>已知資料</b><span>醫療險每月2,081元；畫面推定為12期中的第7期，剩餘期數仍待信用卡確認。</span></div>
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

        <section className="section-grid asset-grid">
          <article className="panel crypto-panel">
            <div className="section-heading"><div><span>CRYPTO ASSETS</span><h2>加密貨幣配置</h2></div><b className="status red">目前偏高</b></div>
            <div className="crypto-total"><div><span>估計總價值</span><strong>約 NT$81,897</strong></div><div><span>占股票＋加密資產</span><strong>24.7%</strong></div></div>
            <div className="crypto-bar" aria-label="加密貨幣比例">
              {crypto.map((item) => <i key={item.code} style={{ width: `${item.share}%`, background: item.color }} title={`${item.code} ${item.share}%`} />)}
            </div>
            <div className="crypto-list">
              {crypto.map((item) => <div key={item.code}><i style={{ background: item.color }} /><b>{item.code}</b><span>約 NT${money.format(item.value)}</span><em>{item.share}%</em></div>)}
            </div>
            <div className="crypto-advice"><b>目前策略：暫停加碼</b><span>不開合約、不質押借款，先讓加密貨幣占比隨現金與核心ETF增加而降至10%～15%。</span></div>
          </article>

          <article className="panel allocation-panel">
            <div className="section-heading"><div><span>TOTAL ASSET MIX</span><h2>完整資產結構</h2></div></div>
            <div className="asset-total"><span>已知資產合計</span><strong>約 NT${money.format(stockValue + cryptoValue + policyAccountValue + cash)}</strong><small>扣除信貸後，已知淨值約－NT${money.format(debt - stockValue - cryptoValue - policyAccountValue - cash)}</small></div>
            <div className="mix-list">
              {[
                ["台股ETF", stockValue, 71.6, "#2f6bff"],
                ["加密貨幣", cryptoValue, 23.4, "#7b61ff"],
                ["保單帳戶價值", policyAccountValue, 2.6, "#f4a340"],
                ["最近紀錄預備金", cash, 4.6, "#12b8a6"],
              ].map(([label, value, pct, color]) => <div key={String(label)}><div><i style={{ background: String(color) }} /><span>{label}</span><b>NT${money.format(Number(value))}</b></div><div className="mix-bar"><i style={{ width: `${pct}%`, background: String(color) }} /></div><em>{pct}%</em></div>)}
            </div>
            <div className="stress-card"><span>核心問題</span><strong>風險資產很多，立即可用現金仍不足</strong><small>股票與加密貨幣合計超過33萬元；最近紀錄預備金約16,357元，仍須持續確認實際帳戶餘額。</small></div>
          </article>
        </section>

        <section className="account-section" id="accounts">
          <div className="section-heading"><div><span>ACCOUNT SYSTEM</span><h2>銀行帳戶分工｜已開始執行</h2></div><b className="status green">分流規則已確立</b></div>
          <div className="account-grid">
            {[
              ["國泰", "薪轉入口", "薪水入帳後依預算分流，不作長期囤款"],
              ["中信帳戶 1", "生活費＋保費信用卡", "每月轉入生活預算與醫療險卡費"],
              ["中信帳戶 2", "緊急預備金", "不綁消費、不投資；第一階段目標 NT$60,000"],
              ["台新", "其他消費信用卡", "Kling AI、Cloudflare、交通與娛樂支出"],
              ["遠東", "加密貨幣出入金", "只做加密貨幣轉換台幣，不列入預備金"],
              ["永豐", "台股投資", "ETF買進、配息與證券交割"],
              ["王道", "信貸還款", "專款保留每期信貸扣款，不混用生活支出"],
            ].map(([bank, role, rule]) => <article key={bank}><b>{bank}</b><strong>{role}</strong><span>{rule}</span></article>)}
          </div>
          <div className="start-checklist"><b>本月啟動順序</b><span>① 先保留本月生活費與未出帳支出　② 繳清醫療險卡費2,081元　③ 王道備妥信貸扣款　④ 月底剩餘才轉入中信帳戶2</span></div>
        </section>

        <section className="business-section" id="business">
          <div className="business-head">
            <div><span>DIGITAL BUSINESS CASHFLOW</span><h2>網域投資與數位事業</h2><p>兩個網站都以建立現金流為目的；先分開記錄成本與收入，再判斷是否值得擴大投入。</p></div>
            <b>驗證現金流中</b>
          </div>
          <div className="business-grid">
            <article className="business-card">
              <div className="business-title"><div><span>內容／工具網站</span><h3>gulicalc.com</h3></div><b className="status yellow">廣告審核中</b></div>
              <p>透過 iChannels 與 Google Ads 建立廣告及導購現金流；Google Ads 尚未審核成功。</p>
              <a href="https://gulicalc.com/" target="_blank" rel="noreferrer">開啟網站 ↗</a>
              <div className="business-numbers"><div><span>累積收入</span><b>待記錄</b></div><div><span>累積成本</span><b>待記錄</b></div><div><span>目前淨現金流</span><b>待驗證</b></div></div>
              <div className="next-step"><b>下一步</b><span>完成廣告審核、記錄每月流量與實際入帳收入。</span></div>
            </article>
            <article className="business-card">
              <div className="business-title"><div><span>數位商品網站</span><h3>nanaseoul77.com</h3></div><b className="status yellow">市場驗證中</b></div>
              <p>販售簡單圖片取得數位商品收入，重點是驗證是否有人願意付費，以及單張圖片的實際淨利。</p>
              <a href="https://nanaseoul77.com/" target="_blank" rel="noreferrer">開啟網站 ↗</a>
              <div className="business-numbers"><div><span>累積收入</span><b>待記錄</b></div><div><span>累積成本</span><b>待記錄</b></div><div><span>目前淨現金流</span><b>待驗證</b></div></div>
              <div className="next-step"><b>下一步</b><span>記錄圖片數量、成交件數、售價與平台／金流費用。</span></div>
            </article>
          </div>
          <div className="business-rule"><strong>數位事業記帳規則</strong><span>網站淨現金流＝廣告與圖片收入－Kling AI－Cloudflare－網域－金流及其他網站成本</span><em>起步期每月成本上限：NT$1,500</em></div>
        </section>

        <section className="insurance-section" id="insurance">
          <div className="insurance-head">
            <div><span>INSURANCE REVIEW</span><h2>三商美邦投資型保單</h2><p>口頭通知業務停繳，不等於公司系統已完成停繳手續。</p></div>
            <b>待書面確認</b>
          </div>
          <div className="insurance-grid">
            <article className="policy-card">
              <div className="policy-title"><div><span>金世紀優利變額萬能終身壽險 A型</span><strong>系統顯示：繳費中</strong></div><i>!</i></div>
              <div className="policy-data">
                <div><span>基本保額</span><b>NT$1,250,000</b></div>
                <div><span>年繳保費</span><b>NT$36,000</b></div>
                <div><span>帳戶價值</span><b>NT$8,921</b></div>
                <div><span>累積報酬率</span><b className="red-text">－12.15%</b></div>
                <div><span>契約生效日</span><b>2024/11/30</b></div>
                <div><span>畫面下次應繳日</span><b>2026/11/30</b></div>
              </div>
              <p>帳戶價值會繼續負擔保險成本與管理費，也不一定等於現在解約可領回的金額。</p>
            </article>
            <article className="confirm-card">
              <h3>請向業務或客服取得書面確認</h3>
              <ol>
                <li><i>1</i><span>每年36,000元定期保費是否已正式停繳？</span></li>
                <li><i>2</i><span>銀行自動轉帳授權是否已取消？</span></li>
                <li><i>3</i><span>2026/11/30是否還會自動扣款？</span></li>
                <li><i>4</i><span>停繳後每月扣多少保險及管理費？</span></li>
                <li><i>5</i><span>8,921元預估可維持保障到何時？</span></li>
                <li><i>6</i><span>今天解約實際可以領回多少？</span></li>
              </ol>
            </article>
          </div>
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

        <section className="monthly-plan-section" id="monthly-plan">
          <div className="plan-top">
            <div><span>MONTHLY INVESTMENT PLAN</span><h2>接下來每月怎麼分配</h2><p>先選擇保單狀態，網站會顯示對應的可執行版本。</p></div>
            <div className="scenario-switch" role="group" aria-label="保單停繳狀態">
              <button className={!premiumConfirmed ? "active" : ""} onClick={() => setPremiumConfirmed(false)}>尚未書面確認</button>
              <button className={premiumConfirmed ? "active" : ""} onClick={() => setPremiumConfirmed(true)}>已確認不再扣款</button>
            </div>
          </div>

          {!premiumConfirmed ? (
            <div className="scenario-banner pending"><b>目前採保守版本</b><span>暫時每月預留3,000元保費，直到收到公司正式確認。</span></div>
          ) : (
            <div className="scenario-banner confirmed"><b>停繳確認版本</b><span>取消3,000元保費預留，優先補足緊急預備金。</span></div>
          )}

          <div className="stage-grid">
            <article className="stage-card featured">
              <div className="stage-label"><b>階段 1</b><span>現在開始</span></div>
              <h3>預備金先達到 NT$60,000</h3>
              <div className="budget-lines">
                {(!premiumConfirmed ? [
                  ["三商美邦保費預留", 3000, "orange"],
                  ["緊急預備金", 4000, "teal"],
                  ["ETF／加密貨幣", 0, "gray"],
                  ["每月緩衝", 753, "blue"],
                ] : [
                  ["緊急預備金", 6000, "teal"],
                  ["年度保險及稅費準備", 1000, "orange"],
                  ["009816 最低持續投入", 753, "blue"],
                  ["其他ETF／加密貨幣", 0, "gray"],
                ]).map(([label, amount, tone]) => <div key={String(label)}><span><i className={String(tone)} />{label}</span><b>NT${money.format(Number(amount))}</b></div>)}
              </div>
              <em>目標：先建立不必賣資產的第一層防線</em>
            </article>

            <article className="stage-card">
              <div className="stage-label"><b>階段 2</b><span>現金6萬～12萬</span></div>
              <h3>開始少量投資與還款</h3>
              <div className="budget-lines">
                <div><span><i className="teal" />緊急預備金</span><b>NT$3,500</b></div>
                <div><span><i className="red" />額外償還信貸</span><b>NT$2,000</b></div>
                <div><span><i className="blue" />ETF定期投入</span><b>NT$1,250</b></div>
                <div><span><i className="orange" />年度支出準備</span><b>NT$1,000</b></div>
              </div>
              <em>ETF 1,250元：009816 750・0056 150・00878 175・00919 175</em>
            </article>

            <article className="stage-card">
              <div className="stage-label"><b>階段 3</b><span>預備金達12萬</span></div>
              <h3>加速處理6%信貸</h3>
              <div className="budget-lines">
                <div><span><i className="red" />額外償還信貸</span><b>NT$4,500</b></div>
                <div><span><i className="blue" />ETF定期投入</span><b>NT$2,250</b></div>
                <div><span><i className="orange" />年度支出準備</span><b>NT$1,000</b></div>
                <div><span><i className="gray" />其他ETF／加密貨幣</span><b>NT$0</b></div>
              </div>
              <em>ETF 2,250元：009816 1,350・0056 200・00878 350・00919 350</em>
            </article>
          </div>

          <div className="etf-roadmap">
            <div><span>信貸結清後</span><h3>每月ETF投入提高至 NT$10,000</h3><p>009816作為成長核心；0056、00878、00919延續錯開配息的現金流層。</p></div>
            <div className="etf-targets">
              <div><b>009816</b><span>NT$6,000</span><em>成長核心 60%</em></div>
              <div><b>0056</b><span>NT$1,000</span><em>現金流層</em></div>
              <div><b>00878</b><span>NT$1,500</span><em>現金流層</em></div>
              <div><b>00919</b><span>NT$1,500</span><em>現金流層</em></div>
              <div><b>加密貨幣</b><span>NT$0</span><em>先降至10%～15%</em></div>
            </div>
          </div>
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
            <article><b>01</b><span>現在開始</span><h3>補足現金安全墊</h3><p>中信第二帳戶先達6萬元，再逐步完成13萬元緊急預備金。暫停新增貸款與質押。</p><em>執行中</em></article>
            <article><b>02</b><span>預備金完成後</span><h3>降低6%信貸</h3><p>每月真實結餘建議70%額外還本金、30%維持無槓桿投資；先確認保費與分期後再執行。</p><em>確定性節息</em></article>
            <article><b>03</b><span>1～4年</span><h3>提高可投入本金</h3><p>真正的槓桿是獵頭佣金、AI自動化服務與課程收入，目標先把月收入提升至6～10萬元。</p><em>核心成長引擎</em></article>
            <article><b>04</b><span>4～10年</span><h3>建立多元現金流</h3><p>金融資產提供20%～30%，其餘由課程、內容與系統化服務形成半被動收入。</p><em>目標：月收10萬</em></article>
          </div>
        </section>

        <section className="faq-section">
          <div><span>DECISION NOTES</span><h2>這份評估怎麼看？</h2></div>
          <div className="faqs">
            {[
              ["為什麼投資有獲利，仍要優先補預備金？", "因為帳面獲利不能直接取代緊急現金。最近紀錄預備金約16,357元，若收入中斷，仍可能被迫賣出ETF。"],
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

        <footer><div><b>Jacky 財務自由規劃儀表板</b><span>以你提供的資料製作，最後更新：2026/07/14</span></div><p>本頁為個人財務規劃與情境試算，不構成特定證券買賣建議。</p></footer>
      </div>
    </main>
  );
}
