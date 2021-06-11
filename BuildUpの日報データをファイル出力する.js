/**
 * 日々の取り組みを可視化する日報アプリ『BuildUp』の日報データをファイル出力するコードです。
 * 【使い方】
 * BuildUpの日報管理画面( https://app.build-up.info/reports )を開き、
 * 日報がある最新の月を表示したあと、デベロッパーツールを開いてコンソールにコードを貼り付けて実行してください。
 */

/** 待機時間(ミリ秒)※日報の読み込みが遅い時はこれを長めにしてください */
var WAITING_TIME = 3000;
/** 日報データを格納した配列 */
var reports = [];
/** インターバルID */
var interval;

/**
 * ページをスクロールします。
 */
function scrollPage() {
  interval = setInterval(function () {
    window.scroll(
      0,
      document.documentElement.scrollHeight -
        document.documentElement.clientHeight
    );
    // 「日報がありません」(選択された月に日報がないとき) または 「すべての日報を読み込みました」
    if (
      document.getElementsByClassName("infinite-status-prompt")[1].style
        .display !== "none" ||
      document.getElementsByClassName("infinite-status-prompt")[2].style
        .display !== "none"
    ) {
      loadComplete();
      clearInterval(interval);
    }
  }, 10);
}

/**
 * その月のすべての日報を読み込んだ後の処理です。
 */
function loadComplete() {
  // 表示されている年と月を出力
  console.log(
    document.getElementsByClassName("v-date-picker-header__value")[0].innerText
  );
  // 日報の数を出力
  console.log(
    "日報の数: " +
      (document.querySelectorAll('[class^="no_card_content_"]').length === 0
        ? document.getElementsByClassName(
            "v-card v-card--flat v-card--outlined v-sheet theme--light"
          ).length - 1
        : document.getElementsByClassName(
            "v-card v-card--flat v-card--outlined v-sheet theme--light"
          ).length)
  );
  // その月に日報がないとき
  if (
    document.getElementsByClassName("infinite-status-prompt")[1].style
      .display !== "none"
  ) {
    console.log("終了します。");
    console.log(reports);
    outputFile();
    return;
  }
  let result = readReports();
  reports = [...reports, ...result];

  // 前月に移動
  document
    .getElementsByClassName(
      "v-btn v-btn--flat v-btn--icon v-btn--round theme--light v-size--default"
    )[1]
    .click();

  setTimeout(() => {
    scrollPage();
  }, WAITING_TIME);
}

/**
 * 日報を読み取って配列に格納します。[
 * @returns 日報を格納した配列
 */
function readReports() {
  let reports = [];
  let i = 0;
  // 選択している日の日報があれば、最初の要素はスキップする
  if (document.querySelectorAll('[class^="no_card_content_"]').length === 0) {
    i = 1;
  }
  // 日報の数だけ繰り返す
  for (
    i;
    i <
    document.getElementsByClassName(
      "v-card v-card--flat v-card--outlined v-sheet theme--light"
    ).length;
    i++
  ) {
    let report_items = [];
    // 日報の内容の数だけ繰り返す
    for (
      let j = 0;
      j <
      document.getElementsByClassName(
        "v-card v-card--flat v-card--outlined v-sheet theme--light"
      )[i].childElementCount -
        3;
      j++
    ) {
      // 日報の子要素の項目を取得
      report_items = [
        ...report_items,
        {
          category: document
            .getElementsByClassName(
              "v-card v-card--flat v-card--outlined v-sheet theme--light"
            )
            [i].querySelectorAll(
              '[class^="v-list-item__title category_title_"]'
            )[j].innerText,
          content: document
            .getElementsByClassName(
              "v-card v-card--flat v-card--outlined v-sheet theme--light"
            )
            [i].querySelectorAll(
              '[class^="v-list-item__title content_title_"]'
            )[j].innerText,
          hour: parseInt(
            document
              .getElementsByClassName(
                "v-card v-card--flat v-card--outlined v-sheet theme--light"
              )
              [i].querySelectorAll(
                '[class^="v-list-item__title working_time_"]'
              )
              [j].innerText.split(":")[0]
          ),
          minute: parseInt(
            document
              .getElementsByClassName(
                "v-card v-card--flat v-card--outlined v-sheet theme--light"
              )
              [i].querySelectorAll(
                '[class^="v-list-item__title working_time_"]'
              )
              [j].innerText.split(":")[1]
          ),
        },
      ];
    }
    reports = [
      ...reports,
      {
        date: document
          .querySelectorAll('[class^="v-list-item__title report_date_"]')
          [i].innerText.replaceAll(".", "-")
          .trim(),
        content: document.querySelectorAll('[class^="report_content_"]')[i]
          .innerText,
        report_items: report_items,
      },
    ];
  }
  return reports;
}

/**
 * ファイルを出力します。
 */
function outputFile() {
  // HTMLのリンク要素を生成する
  const link = document.createElement("a");
  // リンク先にJSON形式の文字列データを置いておく
  link.href = "data:text/plain," + encodeURIComponent(JSON.stringify(reports));
  // 保存するJSONファイルの名前をリンクに設定する
  link.download =
    "build-up-reports" +
    new Date().toISOString().replace(/[^\d]/g, "").slice(0, 11) +
    ".json";
  // リンクをクリックさせる
  link.click();
  let text = "";
  for (let i = 0; i < reports.length; i++) {
    // 日付
    text += "🌟" + reports[i].date.replaceAll("-", ".") + "\n";
    text += "\n";
    text += "💡やったこと\n";
    let totalMinute = 0;
    for (let j = 0; j < reports[i].report_items.length; j++) {
      text +=
        "《" +
        reports[i].report_items[j].category +
        "》" +
        reports[i].report_items[j].content +
        "（" +
        reports[i].report_items[j].hour +
        "時間" +
        reports[i].report_items[j].minute +
        "分）\n";
      totalMinute +=
        reports[i].report_items[j].hour * 60 +
        reports[i].report_items[j].minute;
    }
    text += "\n";
    text +=
      "計: " +
      Math.floor(totalMinute / 60) +
      "時間" +
      (totalMinute % 60) +
      "分\n";
    text += "\n";
    text += "✍感想\n";
    text += reports[i].content + "\n";
    text += "\n";
    text += "\n";
  }
  // HTMLのリンク要素を生成する
  const textLink = document.createElement("a");
  // リンク先にJSON形式の文字列データを置いておく
  textLink.href = "data:text/plain," + encodeURIComponent(text);
  // 保存するJSONファイルの名前をリンクに設定する
  textLink.download =
    "build-up-reports" +
    new Date().toISOString().replace(/[^\d]/g, "").slice(0, 11) +
    ".txt";
  // リンクをクリックさせる
  textLink.click();
  console.log("ファイルを出力しました。");
}

scrollPage();
